import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import vm from 'node:vm';
import {tools} from '../src/catalog.mjs';
const files=(await readdir('dist')).filter(x=>x.endsWith('.html'));assert.equal(files.length,tools.length+1);
const check=html=>{assert(html.includes('color-scheme:light'));assert(html.includes('name="viewport"'));assert(!/<(?:script|link)[^>]+(?:src|href)="https?:/i.test(html));assert(!/<script[^>]+src=/i.test(html));const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);assert(scripts.length);for(const code of scripts)new vm.Script(code);const code=scripts.at(-1);assert(html.includes('aria-live="polite"'));assert(html.includes('--accent:#a54d2e'));assert(!html.includes('--green:'));assert(html.includes('data-language="fr"'));assert(html.includes('data-language="en"'));return code;};
assert.throws(()=>check('<html><script src="https://example.com/app.js"></script></html>'));
for(const name of files){const html=await readFile('dist/'+name,'utf8');check(html);for(const link of html.matchAll(/href="([a-z0-9-]+\.html)(?:\?lang=(?:en|fr))?"/g))assert(files.includes(link[1]),`Broken link ${link[1]}`);}
for(const tool of tools){const html=await readFile('dist/'+tool.slug+'.html','utf8');assert(html.includes(`<title>${tool.name} — QuickTiny Tools</title>`));assert(html.includes('id="tool"'));assert(html.includes(tool.description));}
console.log('STRUCTURE_OK: '+tools.length+' self-contained pages plus index');
