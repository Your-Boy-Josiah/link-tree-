// ===============================================================
// projects.tsx — Selected work grounded in Josiah's supplied CV.
// ===============================================================
import { Sun, Users, ArrowUpRight } from 'lucide-react';
export default function Projects() {
  return <section className="projects-section" id="projects" aria-labelledby="projects-title">
    <div className="projects-heading"><div><p className="eyebrow">FROM IDEAS TO ACTION</p><h2 id="projects-title">Selected projects<span>.</span></h2></div><p>A few ways I put engineering<br />and people-first thinking to work.</p></div>
    <div className="projects-grid">
      <article className="project-card"><div className="project-top"><span className="icon-tile"><Sun size={25} aria-hidden="true" /></span><span className="project-number">01 / ENGINEERING</span></div><p className="project-role">CO-LEAD ENGINEER</p><h3>12 kVA solar power installation</h3><p>Worked on a solar power system serving 10 student hostels, from design and procurement to mounting and electrical integration.</p><div className="project-tags"><span>Load calculations</span><span>Battery & inverter layouts</span></div><a href="/documents/josiah-ewumi-cv.pdf" target="_blank" rel="noopener" aria-label="Read about the solar power installation in my CV, PDF, opens in a new tab">Explore in my CV <ArrowUpRight size={17} aria-hidden="true" /></a></article>
      <article className="project-card"><div className="project-top"><span className="icon-tile"><Users size={25} aria-hidden="true" /></span><span className="project-number">02 / COMMUNITY</span></div><p className="project-role">CO-FOUNDER</p><h3>Project Management Circle</h3><p>Co-founded a campus initiative focused on mental-health and depression awareness, creating space for student support and conversation.</p><div className="project-tags"><span>Project coordination</span><span>Community support</span></div><a href="#contact">Talk to me about this <ArrowUpRight size={17} aria-hidden="true" /></a></article>
    </div>
  </section>;
}
