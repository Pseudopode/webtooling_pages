/* Translate interface nodes only. User inputs, filenames, and converted data are never translated. */
let language='en';try{const requested=new URLSearchParams(location.search).get('lang');language=requested==='fr'||requested==='en'?requested:localStorage.getItem('quicktiny-language')==='fr'?'fr':'en';}catch{}
const translatedNodes=new WeakMap(),translatedAttributes=new WeakMap();
function translateUI(source){
 if(language!=='fr')return source;const text=source.trim();let translated=FR_STRINGS[text];
 if(translated===undefined){
  const patterns=[
   [/^(\d[\d,\s]*) characters · (\d+) character types$/,m=>`${m[1]} caractères · ${m[2]} types de caractères`],
   [/^(\d[\d,\s]*) characters$/,m=>`${m[1]} caractères`],
   [/^(\d+) tools?$/,m=>`${m[1]} ${Number(m[1])===1?'outil':'outils'}`],
   [/^(\d+) lines removed$/,m=>`${m[1]} ${Number(m[1])===1?'ligne supprimée':'lignes supprimées'}`],
   [/^(\d+) images? selected$/,m=>`${m[1]} ${Number(m[1])===1?'image sélectionnée':'images sélectionnées'}`],
   [/^Processing image (\d+) of (\d+)…$/,m=>`Traitement de l’image ${m[1]} sur ${m[2]}…`],
   [/^Converting page (\d+) of (\d+)…$/,m=>`Conversion de la page ${m[1]} sur ${m[2]}…`],
   [/^(\d+) images? ready(?: · (\d+) failed)?$/,m=>`${m[1]} ${Number(m[1])===1?'image prête':'images prêtes'}${m[2]?' · '+m[2]+' en échec':''}`],
   [/^Image (\d+) · (Pages?) ([\d, ]+)$/,m=>`Image ${m[1]} · ${m[2]==='Pages'?'Pages':'Page'} ${m[3]}`],
   [/^(\d+) JPG files? ready · ([\d.]+) (KB|MB) maximum each$/,m=>`${m[1]} ${Number(m[1])===1?'JPG prêt':'JPG prêts'} · ${m[2].replace('.',',')} ${m[3]==='KB'?'ko':'Mo'} maximum par fichier`],
   [/^([\d.]+) (KB|MB)$/,m=>`${m[1].replace('.',',')} ${m[2]==='KB'?'ko':'Mo'}`],
   [/^(.+): (.+)$/,m=>FR_STRINGS[m[2]]?`${m[1]} : ${FR_STRINGS[m[2]]}`:null],
   [/^Could not create the ZIP: (.+)$/,m=>`Impossible de créer le ZIP : ${FR_STRINGS[m[1]]||m[1]}`],
   [/^Copy (.+)$/,m=>FR_STRINGS[m[1]]?'Copier '+FR_STRINGS[m[1]]:null],
   [/^(.*) — QuickTiny Tools$/,m=>`${FR_STRINGS[m[1]]||m[1]} — Outils QuickTiny`],
   [/^(.+) → (.+) · (\d+)% (smaller|larger) · (.+)$/,m=>`${m[1].replace('KB','ko').replace('MB','Mo')} → ${m[2].replace('KB','ko').replace('MB','Mo')} · ${m[3]} % ${m[4]==='smaller'?'de réduction':'plus volumineux'} · ${m[5]}`]
  ];for(const [pattern,convert] of patterns){const match=text.match(pattern);if(match){translated=convert(match);if(translated!==null)break;}}
 }
 return translated==null?source:source.replace(text,translated);
}
function ignored(element){return element?.closest('script,style,textarea,input,code,[data-no-i18n],#password,.file-info strong,.language-name,.language-short');}
let languageObserver;
function localize(){
 if(typeof document==='undefined'||!document?.documentElement)return;languageObserver?.disconnect();document.documentElement.lang=language;
 const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode())){if(ignored(node.parentElement)||!node.nodeValue.trim())continue;const current=node.nodeValue,old=translatedNodes.get(node);const source=old&&current===old.result?old.source:current;const result=translateUI(source);translatedNodes.set(node,{source,result});if(current!==result)node.nodeValue=result;}
 for(const element of document.querySelectorAll('[aria-label],[placeholder],[title],meta[name=description]')){
  if(ignored(element)&&!element.matches('input,textarea'))continue;
  let records=translatedAttributes.get(element);if(!records){records={};translatedAttributes.set(element,records);}
  for(const attr of ['aria-label','placeholder','title',...(element.matches('meta[name=description]')?['content']:[])]){if(!element.hasAttribute(attr))continue;const current=element.getAttribute(attr),old=records[attr],source=old&&old.result===current?old.source:current,result=translateUI(source);records[attr]={source,result};if(current!==result)element.setAttribute(attr,result);}
 }
 document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',button.dataset.language===language));
 for(const a of document.querySelectorAll('a[href]')){const href=a.getAttribute('href');if(!/^[a-z0-9-]+\.html(?:\?lang=(?:en|fr))?$/.test(href))continue;const target=href.split('?')[0]+'?lang='+language;if(href!==target)a.setAttribute('href',target);}
 languageObserver?.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title','content']});
}
function setLanguage(next){language=next==='fr'?'fr':'en';try{localStorage.setItem('quicktiny-language',language);}catch{}localize();document.dispatchEvent(new CustomEvent('quicktiny:language',{detail:language}));}
languageObserver=new MutationObserver(()=>localize());
window.addEventListener('pagehide',()=>languageObserver.disconnect());
window.addEventListener('pageshow',()=>localize());
document.querySelectorAll('[data-language]').forEach(button=>button.onclick=()=>setLanguage(button.dataset.language));localize();
