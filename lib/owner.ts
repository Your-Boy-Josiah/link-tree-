// ===============================================================
// owner.ts — Enforce owner identity independently of UI visibility.
// ===============================================================
import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { matchesOwner } from './link-validation';
export async function isOwner(){
 const user=await getChatGPTUser();
 return matchesOwner(user?.email,env.OWNER_EMAIL);
}
export function rejectCrossOrigin(request:Request){
 const origin=request.headers.get('origin');
 return !origin||origin!==new URL(request.url).origin;
}
export const noStore={'Cache-Control':'private, no-store'};
