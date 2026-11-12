/* Local PDF parsing and JPEG sizing. Third-party code is bundled by build.mjs. */
const PdfImages = {
 async extract(bytes) {
  let doc;
  try { doc=await PDFLib.PDFDocument.load(bytes,{updateMetadata:false}); }
  catch(e){if(/encrypt|password/i.test(e.message))throw Error('This PDF is password-protected. Save an unlocked copy first.');throw Error('This file could not be read as a PDF. Try exporting the scan again.');}
  const {PDFName,PDFDict,PDFRawStream,PDFArray}=PDFLib,byStream=new Map();
  const name=s=>PDFName.of(s);
  function visit(resources,page,seen=new Set(),depth=0){
   if(!resources||depth>30||seen.has(resources))return;seen.add(resources);
   const objects=resources.lookupMaybe(name('XObject'),PDFDict);if(!objects)return;
   for(const [,ref] of objects.entries()){
    const stream=doc.context.lookup(ref);if(!(stream instanceof PDFRawStream))continue;
    const subtype=stream.dict.get(name('Subtype'))?.toString();
    if(subtype==='/Form'){visit(stream.dict.lookupMaybe(name('Resources'),PDFDict)||resources,page,seen,depth+1);continue;}
    if(subtype!=='/Image')continue;
    if(byStream.has(stream)){const image=byStream.get(stream);if(!image.pages.includes(page))image.pages.push(page);continue;}
    const filter=stream.dict.lookup(name('Filter'));const filters=filter instanceof PDFArray?filter.asArray().map(x=>doc.context.lookup(x).toString()):filter?[filter.toString()]:[];
    const dct=filters.indexOf('/DCTDecode');if(dct<0||dct!==filters.length-1)continue;
    let data=stream.getContents();
    if(dct>0){const dict=stream.dict.clone();dict.set(name('Filter'),doc.context.obj(filters.slice(0,dct).map(x=>name(x.slice(1)))));const parms=dict.lookup(name('DecodeParms'));if(parms instanceof PDFArray)dict.set(name('DecodeParms'),doc.context.obj(parms.asArray().slice(0,dct)));data=PDFLib.decodePDFRawStream(PDFRawStream.of(dict,data)).decode();}
    if(data[0]!==255||data[1]!==216)continue;
    const image={bytes:new Uint8Array(data),width:Number(stream.dict.lookup(name('Width'))?.toString()),height:Number(stream.dict.lookup(name('Height'))?.toString()),pages:[page]};byStream.set(stream,image);
   }
  }
  const pages=doc.getPages();pages.forEach((p,i)=>visit(p.node.Resources(),i+1));
  return {pageCount:pages.length,images:[...byStream.values()]};
 },
 maxBytes(value,unit){const n=Number(value),factor=unit==='MB'?1000000:unit==='KB'?1000:0;if(!factor||!Number.isFinite(n)||n<=0||n*factor<1000||n*factor>100000000)throw Error('Choose a maximum size between 1 KB and 100 MB.');return Math.floor(n*factor);},
 async fitJpeg(source,maxBytes,{original=null,makeCanvas=()=>document.createElement('canvas'),cancelled=()=>false}={}){
  if(!Number.isSafeInteger(maxBytes)||maxBytes<1000)throw Error('Choose a maximum size between 1 KB and 100 MB.');
  if(original&&original.size<=maxBytes)return {blob:original,width:source.width,height:source.height,original:true,quality:1};
  const canvas=makeCanvas(),ctx=canvas.getContext('2d');if(!ctx)throw Error('The browser could not create an image canvas.');
  // Never increase source dimensions. Limit working canvas area for large scans.
  let scale=Math.min(1,12000/source.width,12000/source.height,Math.sqrt(24000000/(source.width*source.height)));
  const encode=q=>new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('The browser could not encode this image.')),'image/jpeg',q));
  try{for(let attempt=0;attempt<35;attempt++){
   if(cancelled())throw Error('Conversion cancelled.');
   canvas.width=Math.max(1,Math.floor(source.width*scale));canvas.height=Math.max(1,Math.floor(source.height*scale));ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(source,0,0,canvas.width,canvas.height);
   let best=await encode(.95);let quality=.95;
   if(best.size<=maxBytes)return {blob:best,width:canvas.width,height:canvas.height,quality,original:false};
   const lowBlob=await encode(.35);
   if(lowBlob.size<=maxBytes){let lo=.35,hi=.95;best=lowBlob;quality=lo;for(let i=0;i<9;i++){if(cancelled())throw Error('Conversion cancelled.');const q=(lo+hi)/2,blob=await encode(q);if(blob.size<=maxBytes){lo=q;best=blob;quality=q;}else hi=q;}return {blob:best,width:canvas.width,height:canvas.height,quality,original:false};}
   // Also try very low quality once at the smallest useful raster size.
   if(canvas.width<=64||canvas.height<=64){const blob=await encode(.1);if(blob.size<=maxBytes)return {blob,width:canvas.width,height:canvas.height,quality:.1,original:false};}
   if(canvas.width===1&&canvas.height===1)break;
   scale*=Math.max(.2,Math.min(.8,Math.sqrt(maxBytes/lowBlob.size)*.9));
  }throw Error('The requested limit is too small for a valid JPG. Increase the maximum size.');}
  finally{canvas.width=canvas.height=1;}
 }
};
