import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Manager from './manager';
export const dynamic='force-dynamic';
type Link={id:string;title:string;url:string;description:string;public:boolean;clicks:number;position:number};
export default async function Admin(){const jar=await cookies();const token=jar.get('josiah_admin')?.value;if(!token)redirect('/admin/login');try{const base=process.env.BACKEND_URL;if(!base)throw new Error('Backend not configured');const response=await fetch(new URL('/api/links',base),{headers:{cookie:`josiah_admin=${token}`},cache:'no-store'});if(response.status===401)redirect('/admin/login');if(!response.ok)throw new Error('Links unavailable');const data=await response.json() as {links:Link[]};return <Manager initialLinks={data.links}/>;}catch(error){if(error&&typeof error==='object'&&'digest'in error)throw error;return <main className="admin"><h1>Links are unavailable</h1><p>Check the backend setup, then reload this page.</p><a href="/admin">Reload</a></main>}}
