// ===============================================================
// route.ts — Owner-only listing, creation, and validated edits.
// ===============================================================
import { isOwner, rejectCrossOrigin, noStore } from '@/lib/owner';
import { database, listLinks } from '@/lib/link-store';
import { createLink, updateLink, linkId } from '@/lib/link-validation';
export const dynamic='force-dynamic';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:noStore});
// @desc List private links and click totals.
// @route GET /api/links
// @access Private — configured owner
export async function GET(){
 if(!await isOwner())return json({error:'Owner access required.'},403);
 try{return json({links:await listLinks(true)});}catch{return json({error:'Links are temporarily unavailable.'},503);}
}
async function mutation(request:Request,update:boolean){
 if(!await isOwner())return json({error:'Owner access required.'},403);
 if(rejectCrossOrigin(request))return json({error:'Same-origin request required.'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return json({error:'JSON required.'},415);
 if(Number(request.headers.get('content-length')||0)>8192)return json({error:'Request too large.'},413);
 let body:unknown;
 try { const raw=await request.text();if(raw.length>8192)return json({error:'Request too large.'},413);body=JSON.parse(raw); }
 catch{return json({error:'Invalid JSON.'},400);}
 const parsed=(update?updateLink:createLink).safeParse(body);
 if(!parsed.success)return json({error:'Check the title, URL, description, and visibility.'},400);
 try{
  const data=parsed.data;
  if(update){
   const id=linkId.safeParse(new URL(request.url).searchParams.get('id'));
   if(!id.success)return json({error:'Invalid link ID.'},400);
   const fields=Object.entries(data);
   // Keys come only from the strict schema; values are bound separately.
   const result=await database().prepare('UPDATE links SET '+fields.map(([key])=>key+'=?').join(',')+' WHERE id=?').bind(...fields.map(([key,value])=>key==='public'?Number(value):value),id.data).run();
   if(!result.meta.changes)return json({error:'Link not found.'},404);
  }else{
   const full=createLink.parse(data);
   await database().prepare('INSERT INTO links(id,title,url,description,public) VALUES(?,?,?,?,?)').bind(crypto.randomUUID(),full.title,full.url,full.description,Number(full.public)).run();
  }
  return json({links:await listLinks(true)},update?200:201);
 }catch{return json({error:'Could not save the link. Your input has been kept; reload before retrying.'},503);}
}
// @desc Create a saved link.
// @route POST /api/links
// @access Private — configured owner, same-origin JSON
export async function POST(request:Request){return mutation(request,false);}
// @desc Edit a link or change its public visibility.
// @route PATCH /api/links?id=:id
// @access Private — configured owner, same-origin JSON
export async function PATCH(request:Request){return mutation(request,true);}
