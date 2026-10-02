// ===============================================================
// contact.tsx — Direct email access with a usable clipboard fallback.
// ===============================================================
'use client';
import { useState } from 'react';
import { Mail, Copy, Check, MessageCircle } from 'lucide-react';
const email='josiahewumi097@gmail.com';
export default function Contact(){
 const [status,setStatus]=useState('');
 async function copy(){try{await navigator.clipboard.writeText(email);setStatus('Email address copied.');}catch{setStatus('Select and copy the email address below.');}}
 return <section className="contact-card" id="contact" aria-labelledby="contact-title"><div className="card-heading"><span className="icon-tile"><Mail size={22} aria-hidden="true"/></span><span className="eyebrow">LET’S CONNECT</span></div><h2 id="contact-title">Have something in mind?</h2><p>For opportunities, collaborations, or a conversation about what you’re building.</p><a className="email-address" href={'mailto:'+email}>{email}</a><div className="contact-actions"><a className="button button-whatsapp" href="https://wa.me/2347015651489" target="_blank" rel="noopener noreferrer" aria-label="Chat with Josiah on WhatsApp, opens in a new tab"><MessageCircle size={18} aria-hidden="true"/>WhatsApp me</a><a className="button button-light" href={'mailto:'+email+'?subject=Let%E2%80%99s%20connect'}><Mail size={18} aria-hidden="true"/>Email me</a><button className="copy-button" onClick={copy} aria-label="Copy email address">{status==='Email address copied.'?<Check size={18}/>:<Copy size={18}/>}Copy email</button></div><span className="whatsapp-number">WhatsApp: +234 701 565 1489</span><span className="copy-status" role="status">{status||'Opens your email app. Prefer another app? Copy my address.'}</span></section>;
}
