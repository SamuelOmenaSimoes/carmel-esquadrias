import test from 'node:test';
import assert from 'node:assert/strict';
import {quoteSchema,imageMatches} from '../lib/quote.ts';
const valid={product:'Janelas',quantity:'1',measurements:'',workType:'Reforma',location:'Mogi',deadline:'3 meses',name:'Cliente',email:'cliente@example.com',phone:'11999999999',notes:'',consent:'on',website:''};
test('aceita consulta completa e normaliza quantidade',()=>assert.equal(quoteSchema.parse(valid).quantity,1));
for(const patch of [{consent:''},{website:'spam'},{email:'invalido'},{quantity:0},{quantity:1001},{phone:'abc'}])test(`rejeita campo inválido: ${Object.keys(patch)[0]}=${Object.values(patch)[0]}`,()=>assert.equal(quoteSchema.safeParse({...valid,...patch}).success,false));
test('rejeita SVG renomeado como JPEG e MIME incompatível',()=>{assert.equal(imageMatches(new TextEncoder().encode('<svg/>'),'image/jpeg'),false);assert.equal(imageMatches(new Uint8Array([255,216,255]),'image/png'),false)});
test('reconhece assinaturas JPEG, PNG e WebP',()=>{assert(imageMatches(new Uint8Array([255,216,255]),'image/jpeg'));assert(imageMatches(new Uint8Array([137,80,78,71,13,10,26,10]),'image/png'));assert(imageMatches(new TextEncoder().encode('RIFF0000WEBP'),'image/webp'))});
