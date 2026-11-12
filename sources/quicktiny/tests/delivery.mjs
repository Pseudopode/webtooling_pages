import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';import {tools} from '../src/catalog.mjs';import {resolve} from 'node:path';
const names=['index.html',...tools.map(t=>t.slug+'.html')];const result=JSON.parse(execFileSync('python3',['-c',`import zipfile,sys,hashlib,json,pathlib
with zipfile.ZipFile(sys.argv[1]) as z:
 assert z.testzip() is None
 html=[n for n in z.namelist() if n.endswith('.html')]
 for name in html: assert z.read(name)==pathlib.Path('dist',name).read_bytes()
 assert 'README.txt' in z.namelist()
 print(json.dumps(html))`,resolve('../quicktiny-standalone-tools.zip')],{encoding:'utf8'}));assert.deepEqual(result.sort(),names.sort());console.log('DELIVERY_OK: archive contains every standalone page and opening instructions');
