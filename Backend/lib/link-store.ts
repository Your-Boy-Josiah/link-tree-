// ===============================================================
// link-store.ts — Prepared D1 statements; seed only missing defaults.
// ===============================================================
import { env } from 'cloudflare:workers';
export type Link={id:string;title:string;url:string;description:string;public:number;clicks:number;position:number};
export const defaults=[
 ['linkedin','LinkedIn','https://www.linkedin.com/in/josiah-ewumi-319879334','Experience, ideas & professional connections',1],
 ['github','GitHub','https://github.com/Your-Boy-Josiah','Code, experiments & things I’m building',2],
 ['tiktok','TikTok','https://www.tiktok.com/@y_boy_josiah','Creative moments & a different side of me',3]
] as const;
export function database(){if(!env.DB)throw new Error('Database unavailable');return env.DB;}
export async function initializeLinks(){
 const db=database();
 await db.batch(defaults.map(([id,title,url,description,position])=>db.prepare('INSERT OR IGNORE INTO links(id,title,url,description,public,position) VALUES(?,?,?,?,1,?)').bind(id,title,url,description,position)));
}
export async function listLinks(owner=false){
 await initializeLinks();
 // Public responses deliberately exclude destination URLs and analytics.
 const result=await database().prepare(owner?'SELECT * FROM links ORDER BY position,id':'SELECT id,title,description FROM links WHERE public=1 ORDER BY position,id').all<Link>();
 return result.results;
}
