import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';
for(const group of ['calculators','developer','design','media']){const output=execFileSync(process.execPath,['tests/extra/'+group+'/test.mjs'],{encoding:'utf8',maxBuffer:1024*1024});assert(output.includes(group.toUpperCase()+'_OK'));process.stdout.write(output);}
for(const test of ['tests/core.mjs','tests/pdf.mjs','tests/extra/media/raster.mjs','tests/extra/media/recognition.mjs','tests/extra/media/lifecycle.mjs']){const output=execFileSync(process.execPath,[test],{encoding:'utf8',maxBuffer:1024*1024});process.stdout.write(output);}
console.log('COMPLETE_CORE_OK: independent group algorithms, existing tools, PDF, native raster export, OCR, and real local speech recognition pass');
