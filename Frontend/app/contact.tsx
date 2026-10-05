// ===============================================================
// contact.tsx — Email and WhatsApp with copy feedback.
// ===============================================================
'use client';
import { useState } from 'react';
import { Mail, Copy, Check, MessageCircle } from 'lucide-react';
const email = 'josiahewumi097@gmail.com';
export default function Contact() {
  const [status, setStatus] = useState('');
  async function copy() { try { await navigator.clipboard.writeText(email); setStatus('Email address copied.'); } catch { setStatus('Please select and copy the email address above.'); } }
  return <section className="contact-section" id="contact" aria-labelledby="contact-title"><div><h2 id="contact-title">Get in touch</h2><p>Want to discuss a job, a project, or a collaboration? Send me a message.</p><a className="email-address" href={'mailto:' + email}>{email}</a><p className="contact-number">WhatsApp: +234 701 565 1489</p></div><div><div className="contact-actions"><a className="button primary" href="https://wa.me/2347015651489" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />Message on WhatsApp</a><a className="button secondary" href={'mailto:' + email}><Mail size={18} aria-hidden="true" />Send an email</a><button className="copy-button" onClick={copy}>{status === 'Email address copied.' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}Copy email</button></div><p className="copy-status" role="status">{status || 'Email opens your email app.'}</p></div></section>;
}
