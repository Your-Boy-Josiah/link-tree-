// ===============================================================
// page.tsx — Josiah's introduction, public links, work, and education.
// ===============================================================
import Link from 'next/link';
import { listLinks } from '@backend/lib/link-store';
import { ArrowUpRight, Download, Code, Briefcase, Music2, Link as LinkIcon } from 'lucide-react';
import Contact from './contact';
import Projects from './projects';
import { ThemeToggle } from './theme';
export const dynamic = 'force-dynamic';
const cv = '/documents/josiah-ewumi-cv.pdf';
export default async function Home() {
  let links: Awaited<ReturnType<typeof listLinks>> = [];
  let unavailable = false;
  try { links = await listLinks(); } catch { unavailable = true; }
  return <main className="portfolio">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><Link className="wordmark" href="/">Josiah Ewumi<span>.</span></Link><nav aria-label="Main navigation"><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a><ThemeToggle /></nav></header>
    <section className="hero" id="main-content" aria-labelledby="profile-title">
      <div className="hero-copy"><p className="location">Lagos, Nigeria</p><h1 id="profile-title">Hi, I&apos;m Josiah.</h1><p className="hero-role">Mechanical Engineering graduate.<br />Project and program manager.<br />Software developer.</p><p className="hero-description">I build web applications, manage projects, and work on engineering systems. Here you&apos;ll find my work, experience, and ways to reach me.</p><div className="hero-actions"><a className="button primary" href={cv} target="_blank" rel="noopener">View my CV <ArrowUpRight size={17} aria-hidden="true" /></a><a className="text-action" href={cv} download="Josiah-Ewumi-CV.pdf"><Download size={17} aria-hidden="true" />Download PDF</a></div></div>
      <figure className="portrait-wrap"><div className="portrait" role="img" aria-label="Josiah Ewumi in his LASU graduation gown, cropped from his graduation photograph" /><figcaption>Josiah Ewumi · LASU graduate</figcaption></figure>
    </section>
    <section className="connections" id="connections" aria-labelledby="links-title"><h2 className="small-heading" id="links-title">Find me online</h2>{unavailable ? <p role="status">My social links aren&apos;t loading. You can still email or WhatsApp me below.</p> : links.length === 0 ? <p>I&apos;ll add my social links here soon.</p> : <div className="social-list">{links.map(link => { const Icon = link.id === 'linkedin' ? Briefcase : link.id === 'github' ? Code : link.id === 'tiktok' ? Music2 : LinkIcon; return <a className="social-link" href={'/go/' + link.id} key={link.id}><Icon size={20} aria-hidden="true" /><span>{link.title}</span><ArrowUpRight size={17} aria-hidden="true" /></a>; })}</div>}</section>
    <Projects />
    <section className="about-section" id="about" aria-labelledby="about-title"><div className="section-heading"><h2 id="about-title">A little about me</h2><p>Education and experience</p></div><div className="about-grid"><div><p>I studied Mechanical Engineering at Lagos State University and completed project management training through the Project 1500 LASU cohort. My work now spans engineering, software development, and leading project teams.</p><p>I&apos;ve worked on control systems at Ecotech, drone assembly and testing at Aerial Robotics, and property administration. I also create graphic designs and social media content.</p></div><dl className="education-list"><div><dt>B.Sc. Mechanical Engineering</dt><dd>Lagos State University · 2020–2025</dd></div><div><dt>Project management certification</dt><dd>Project 1500 LASU cohort · 2025</dd></div><div><dt>Backend web development</dt><dd>Tech Sphere Academy</dd></div></dl></div><details className="graduation"><summary>See my graduation photos</summary><div className="graduation-grid"><figure><img src="/images/graduation-group.webp" alt="Josiah in his graduation gown with loved ones" width="1400" height="1050" loading="lazy" /><figcaption>Graduation day with loved ones.</figcaption></figure><figure><img src="/images/graduation-celebration.webp" alt="A group celebrating Josiah's graduation at LASU" width="1400" height="1070" loading="lazy" /><figcaption>Celebrating at LASU.</figcaption></figure><figure><img src="/images/graduation-moment.webp" alt="Josiah in his graduation gown sharing a celebratory photo" width="960" height="1280" loading="lazy" /><figcaption>A photo from graduation day.</figcaption></figure></div></details></section>
    <Contact />
    <footer className="site-footer"><span>Josiah Ewumi</span><Link href="/admin">Manage links</Link></footer>
  </main>;
}

