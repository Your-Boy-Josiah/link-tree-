// ===============================================================
// route.ts — Count allowed visits atomically before redirecting.
// ===============================================================
import { database, initializeLinks } from '@/lib/link-store';
import { isOwner, noStore } from '@/lib/owner';
import { linkId } from '@/lib/link-validation';
export const dynamic='force-dynamic';
// @desc Redirect to an allowed destination and increment its total.
// @route GET /go/:id
// @access Public links: anyone; private links: configured owner
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}){
 const id=linkId.safeParse((await params).id);
 if(!id.success)return new Response('Not found',{status:404,headers:noStore});
 try{
  await initializeLinks();
  const owner=await isOwner();
  const prefetch=request.headers.get('purpose')==='prefetch'||request.headers.get('sec-purpose')?.includes('prefetch');
  // Visibility is checked in the same statement as the increment so a
  // concurrent privacy change cannot leak a now-private destination.
  const row=await database().prepare(prefetch?
    'SELECT url FROM links WHERE id=? AND (public=1 OR ?=1)':
    'UPDATE links SET clicks=clicks+1 WHERE id=? AND (public=1 OR ?=1) RETURNING url').bind(id.data,Number(owner)).first<{url:string}>();
  if(!row)return new Response('Not found',{status:404,headers:noStore});
  return new Response(null,{status:302,headers:{...noStore,Location:row.url,'Referrer-Policy':'no-referrer'}});
 }catch{return new Response('This link is temporarily unavailable. Please try again.',{status:503,headers:noStore});}
}
// @desc Check a link without counting a visit.
// @route HEAD /go/:id
// @access Same visibility rules as GET
export async function HEAD(_request:Request,{params}:{params:Promise<{id:string}>}){
 const id=linkId.safeParse((await params).id);
 if(!id.success)return new Response(null,{status:404,headers:noStore});
 try{
  const row=await database().prepare('SELECT id FROM links WHERE id=? AND (public=1 OR ?=1)').bind(id.data,Number(await isOwner())).first();
  return new Response(null,{status:row?200:404,headers:noStore});
 }catch{return new Response(null,{status:503,headers:noStore});}
}
