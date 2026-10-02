// ===============================================================
// projects.tsx — Work and experience from Josiah's CV and confirmations.
// ===============================================================
import { Sun, Users, Code, ShoppingCart, Wallet, ArrowUpRight } from 'lucide-react';

const projects = [
  { title: '12 kVA solar power installation', role: 'Co-lead engineer', category: 'Engineering', Icon: Sun,
    description: 'Co-led the design, procurement, mounting, and electrical integration of a solar power system serving 10 university student hostels.',
    tags: ['Load calculations', 'Battery & inverter layouts'], cv: true },
  { title: 'Student mental-health programme at LASU', role: 'Lead project / program manager', category: 'Community', Icon: Users,
    description: 'Led a mental-health and depression-awareness programme for students at Lagos State University through Project Management Circle (PMC), which I co-founded. The initiative focused on student support and access to counselling.',
    tags: ['Programme leadership', 'Student wellbeing'], cv: true },
  { title: 'Personal link-tree website', role: 'Full-stack project', category: 'Web development', Icon: Code,
    description: 'Built this personal website to bring my work, CV, and social links together. It combines a responsive interface with a backend that tracks social-link clicks and lets me manage public and private links.',
    tags: ['Frontend & backend', 'Click tracking', 'Owner dashboard'], cv: false },
  { title: 'Supermarket management program', role: 'Full-stack project', category: 'Software', Icon: ShoppingCart,
    description: 'Developed a full-stack supermarket management program, bringing together the user interface and backend as a practical business software project.',
    tags: ['Full-stack development', 'Business software'], cv: false },
  { title: 'Personal finance tracker', role: 'Project manager', category: 'Project delivery', Icon: Wallet,
    description: 'Managed a project to develop a personal finance tracker, applying project-management practice to a tool for organising personal finances.',
    tags: ['Project management', 'Finance software'], cv: false },
];

export default function Projects() {
  return <section className="projects-section" id="projects" aria-labelledby="projects-title">
    <div className="projects-heading"><div><p className="eyebrow">FROM IDEAS TO ACTION</p><h2 id="projects-title">Selected projects<span>.</span></h2></div><p>Engineering, software, and programmes<br />built around real needs.</p></div>
    <div className="projects-grid">{projects.map(({ title, role, category, Icon, description, tags, cv }, index) =>
      <article className="project-card" key={title}>
        <div className="project-top"><span className="icon-tile"><Icon size={25} aria-hidden="true" /></span><span className="project-number">0{index + 1} / {category.toUpperCase()}</span></div>
        <p className="project-role">{role.toUpperCase()}</p><h3>{title}</h3><p>{description}</p>
        <div className="project-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        {cv ? <a href="/documents/josiah-ewumi-cv.pdf" target="_blank" rel="noopener" aria-label={`Read about ${title} in my CV, PDF, opens in a new tab`}>Explore in my CV <ArrowUpRight size={17} aria-hidden="true" /></a> : <a href="#contact">Ask me about this project <ArrowUpRight size={17} aria-hidden="true" /></a>}
      </article>
    )}</div>
    <div className="experience-strip" aria-labelledby="experience-title"><h3 id="experience-title">More of what I bring</h3><div className="experience-grid">
      <p><strong>Engineering in practice</strong>Control-system support at Ecotech, plus drone assembly, calibration, and diagnostic testing during my Aerial Robotics placement.</p>
      <p><strong>Technical & creative range</strong>Python backend development, REST API integration, relational databases, prompt engineering, and graphic design with Photoshop and Canva.</p>
      <p><strong>People & operations</strong>Experience coordinating documentation, property maintenance schedules, stakeholder communications, and student-focused initiatives.</p>
    </div></div>
  </section>;
}
