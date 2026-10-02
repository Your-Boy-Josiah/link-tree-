// ===============================================================
// integration.mjs — Local-only security and persistence regression checks.
// ===============================================================
import assert from 'node:assert/strict';
const origin='http://127.0.0.1:5173';
const req=(path,options={})=>fetch(origin+path,{redirect:'manual',...options});
let response=await req('/');assert.equal(response.status,200);assert.match(await response.text(),/Josiah/);
assert.equal((await req('/api/links')).status,403);
assert.equal((await req('/api/links',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:'{}'})).status,403);
response=await req('/signin-with-chatgpt?return_to=/admin');
const cookie=response.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ');assert.ok(cookie);
const ownerHeaders={Cookie:cookie,Origin:origin,'Content-Type':'application/json'};
async function data(){const r=await req('/api/links',{headers:ownerHeaders});assert.equal(r.status,200);return (await r.json()).links;}
let links=await data();const original=links.find(l=>l.id==='github');
assert.equal((await req('/api/links?id=github',{method:'PATCH',headers:{...ownerHeaders,Origin:'https://evil.example'},body:'{"public":false}'})).status,403);
assert.equal((await req('/api/links',{method:'POST',headers:ownerHeaders,body:JSON.stringify({title:'Invalid',url:'javascript:alert(1)',description:'',public:true})})).status,400);
assert.equal((await req('/api/links',{method:'POST',headers:ownerHeaders,body:JSON.stringify({title:'Invalid',url:'https://example.com',description:'',public:true,clicks:999})})).status,400);
response=await req('/api/links?id=github',{method:'PATCH',headers:ownerHeaders,body:'{"public":false}'});assert.equal(response.status,200);
assert.equal((await req('/go/github')).status,404);
assert.equal((await req('/go/github',{method:'HEAD'})).status,404);
assert.ok(!(await (await req('/')).text()).includes('Code, experiments'));
response=await req('/go/github',{headers:ownerHeaders});assert.equal(response.status,302);assert.equal(response.headers.get('location'),original.url);
await req('/api/links?id=github',{method:'PATCH',headers:ownerHeaders,body:JSON.stringify({public:!!original.public})});
response=await req('/go/github');assert.equal(response.status,302);
const after=(await data()).find(l=>l.id==='github');assert.equal(after.clicks,original.clicks+2);
await req('/go/github',{method:'HEAD'});await req('/go/github',{headers:{purpose:'prefetch'}});
assert.equal((await data()).find(l=>l.id==='github').clicks,after.clicks);
assert.equal((await req('/go/missing')).status,404);
response=await req('/api/links',{method:'POST',headers:ownerHeaders,body:JSON.stringify({title:'Local test only',url:'https://example.com',description:'Disposable verification record',public:false})});assert.equal(response.status,201);
console.log('PASS: anonymous access, owner sign-in, CSRF, unsafe URLs, unknown fields, persistence, visibility, private redirects, exact click increments, HEAD/prefetch exclusions, and creation.');
