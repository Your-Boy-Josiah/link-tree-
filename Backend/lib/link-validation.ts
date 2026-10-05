// ===============================================================
// link-validation.ts — Shared strict validation for link mutations.
// ===============================================================
import { z } from 'zod';
export const safeUrl = z.string().trim().max(2048).url().refine(value=>{
 const url=new URL(value);
 return ['https:','http:'].includes(url.protocol)&&!url.username&&!url.password;
},'Use an http or https URL without embedded credentials.');
export const createLink=z.object({
 title:z.string().trim().min(1).max(60),
 url:safeUrl,
 description:z.string().trim().max(160),
 public:z.boolean()
}).strict();
export const updateLink=createLink.partial().refine(value=>Object.keys(value).length>0,'Provide a change.');
export const linkId=z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/);
export function matchesOwner(email:string|undefined,owner:string|undefined){
 return Boolean(email&&owner&&email.toLowerCase()===owner.toLowerCase());
}
