// ===============================================================
// page.tsx — Owner-only link management and analytics.
// ===============================================================
import { getChatGPTUser, chatGPTSignInPath } from '../chatgpt-auth';
import { isOwner } from '@/lib/owner';
import { listLinks } from '@/lib/link-store';
import Manager from './manager';
export const dynamic='force-dynamic';
export default async function Admin(){
 const user=await getChatGPTUser();
 if(!user)return <main className="admin"><a href="/">Josiah Ewumi / Links</a><h1>Your links, your space.</h1><p>Sign in to manage visibility and view your click totals.</p><a className="primary-button" href={chatGPTSignInPath('/admin')} target="_top">Sign in with ChatGPT</a></main>;
 if(!await isOwner())return <main className="admin"><h1>Owner access only</h1><p>This account does not have access to manage these links.</p><a href="/signout-with-chatgpt?return_to=/admin" target="_top">Sign out and switch account</a></main>;
 try{return <Manager initialLinks={await listLinks(true)}/>;}
 catch{return <main className="admin"><h1>Links are unavailable</h1><p>We couldn’t load your links. Please reload to try again.</p><a href="/admin">Reload</a></main>;}
}
