// ===============================================================
// manager.tsx â€” Owner controls, persisted visibility, and feedback.
// ===============================================================
'use client';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { ThemeToggle } from '../theme';
import { Switch } from '@/components/ui/switch';
type Link={id:string;title:string;url:string;description:string;public:boolean|number;clicks:number;position:number};
const empty={title:'',url:'',description:'',public:false};
export default function Manager({initialLinks}:{initialLinks:Link[]}){
 const [links,setLinks]=useState(initialLinks),[draft,setDraft]=useState(empty),[editing,setEditing]=useState<string|null>(null),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');
 async function save(data:unknown,id?:string){
  setBusy(true);setError('');setMessage('');
  try{const response=await fetch('/api/links'+(id?'/'+encodeURIComponent(id):''),{method:id?'PATCH':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
   const result=await response.json() as {error?:string;links:Link[]};if(!response.ok)throw new Error(result.error||'Could not save.');setLinks(result.links);setMessage('Changes saved.');return true;
  }catch(e){setError(e instanceof Error?e.message:'Could not save. Please try again.');return false;}finally{setBusy(false);}
 }
 useEffect(()=>{
  const context=(document as Document & {modelContext?:{registerTool:(tool:unknown,options:unknown)=>unknown}}).modelContext;
  if(!context?.registerTool)return;const life=new AbortController();
  Promise.resolve(context.registerTool({name:'start_adding_link',title:'Start adding a link',description:'Focus the new-link form. Does not save or publish a link.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false},execute(input:unknown){if(!input||typeof input!=='object'||Object.keys(input).length)throw new Error('Expected an empty object.');setEditing(null);setDraft(empty);document.getElementById('link-title')?.focus();return {status:'form_open'};}},{signal:life.signal})).catch(()=>{});
  return ()=>life.abort();
 },[]);
 return <main className="admin"><div className="admin-top"><ThemeToggle/><NextLink href="/">View my website</NextLink><button onClick={async()=>{await fetch('/api/auth/logout',{method:'POST'});location.href='/admin/login';}}>Sign out</button></div><h1>Your links.</h1><p>Edit your links, choose which ones are public, and check their visit counts.</p><div className="panel"><div className="section-label"><h2>Links & activity</h2><span>{links.reduce((sum,l)=>sum+l.clicks,0)} TOTAL CLICKS</span></div><p className="small-note">Totals count visits through these links, including repeat visits. They are visible only to you.</p>{links.map(link=><div className="admin-row" key={link.id}><div className="detail"><strong><a href={'/go/'+link.id}>{link.title}</a></strong><small>{link.url}</small><div><button disabled={busy} onClick={()=>{setEditing(link.id);setDraft({title:link.title,url:link.url,description:link.description,public:!!link.public});document.getElementById('link-title')?.focus();}}>Edit link</button></div></div><span className="count">{link.clicks} clicks</span><label className="visibility"><Switch className="switch" aria-label={'Make '+link.title+' public'} checked={!!link.public} disabled={busy} onCheckedChange={value=>void save({public:value},link.id)}/>{link.public?'Public':'Private'}</label></div>)}</div><div role="status" aria-live="polite" className="status">{message}</div>{error&&<p role="alert" className="error">{error}</p>}<form className="panel" onSubmit={async e=>{e.preventDefault();if(await save(draft,editing||undefined)){setDraft(empty);setEditing(null);}}}><h2>{editing?'Edit link':'Add a link'}</h2><label className="field">Title<input id="link-title" required maxLength={60} value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} placeholder="Substack"/></label><label className="field">Web address<input type="url" required maxLength={2048} value={draft.url} onChange={e=>setDraft({...draft,url:e.target.value})} placeholder="https://your-publication.substack.com"/></label><label className="field">Short description<input maxLength={160} value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})} placeholder="What will people find here?"/></label><label className="visibility"><Switch className="switch" checked={draft.public} onCheckedChange={value=>setDraft({...draft,public:value})}/>Show on my public page</label><p className="small-note">Private links are accessible only to you after signing in.</p><div style={{display:'flex',gap:20,marginTop:20}}><button className="primary-button" disabled={busy}>{busy?'Savingâ€¦':editing?'Save changes':'Add link'}</button>{editing&&<button type="button" disabled={busy} onClick={()=>{setEditing(null);setDraft(empty);}}>Cancel edit</button>}</div></form></main>;
}

