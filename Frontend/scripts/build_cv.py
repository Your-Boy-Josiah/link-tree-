# ===============================================================
# build_cv.py — Source-grounded, two-page professional CV.
# ===============================================================
from pathlib import Path
import sys
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader
from xml.sax.saxutils import escape
root=Path(__file__).resolve().parents[1]
out=Path(sys.argv[1]) if len(sys.argv)>1 else root/'public'/'documents'/'josiah-ewumi-cv.pdf'
out.parent.mkdir(parents=True,exist_ok=True)
navy=HexColor('#101B30');gray=HexColor('#465269');blue=HexColor('#2456BA')
styles={
 'name':ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=28,leading=32,textColor=navy,spaceAfter=8),
 'role':ParagraphStyle('role',fontName='Helvetica',fontSize=11,leading=15,textColor=blue,spaceAfter=10),
 'contact':ParagraphStyle('contact',fontName='Helvetica',fontSize=9,leading=14,textColor=gray,spaceAfter=2),
 'section':ParagraphStyle('section',fontName='Helvetica-Bold',fontSize=10,leading=14,textColor=blue,spaceBefore=12,spaceAfter=7),
 'title':ParagraphStyle('title',fontName='Helvetica-Bold',fontSize=10.5,leading=14,textColor=navy,spaceAfter=3),
 'meta':ParagraphStyle('meta',fontName='Helvetica',fontSize=9.2,leading=12,textColor=gray,spaceAfter=4),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=9.5,leading=13,textColor=gray,spaceAfter=5),
 'bullet':ParagraphStyle('bullet',fontName='Helvetica',fontSize=9.5,leading=13,textColor=gray,leftIndent=11,firstLineIndent=-10,spaceAfter=4),
}
story=[]
def p(text,style='body'):return Paragraph(text,styles[style])
def section(title):story.append(p(title.upper(),'section'))
def job(title,company,bullets):
 items=[p(title,'title'),p(company,'meta')]+[p('- '+escape(x),'bullet') for x in bullets]+[Spacer(1,4)]
 story.append(KeepTogether(items))
def footer(canvas,doc):
 canvas.setStrokeColor(HexColor('#D6DEE2'));canvas.line(44,42,A4[0]-44,42)
 canvas.setFont('Helvetica',8);canvas.setFillColor(gray);canvas.drawString(44,28,'JOSIAH EWUMI');canvas.drawRightString(A4[0]-44,28,f'{doc.page} / 2')
story += [p('JOSIAH EWUMI','name'),p('Mechanical Engineering Graduate | Project &amp; Program Manager | Full Stack Software Developer','role'),p('Lagos, Nigeria  |  +234 701 565 1489  |  <link href="mailto:josiahewumi097@gmail.com">josiahewumi097@gmail.com</link>','contact'),p('<link href="https://www.linkedin.com/in/josiah-ewumi-319879334" color="#2456BA">LinkedIn: josiah-ewumi-319879334</link>  |  <link href="https://github.com/Your-Boy-Josiah" color="#2456BA">GitHub: Your-Boy-Josiah</link>','contact')]
section('Professional profile')
story.append(p('Mechanical Engineering graduate of Lagos State University, certified in project management and backend web development. Co-led a 12 kVA solar installation serving 10 student hostels and led a student mental-health programme at LASU. Builds web applications and manages software projects through task assignment, code review, and bug fixing. Open-minded and driven by a passion for learning and solving practical problems.'))
section('Professional experience')
job('Control Engineer Assistant &amp; Administrative Assistant','Ecotech Engineering &amp; Consulting Services Ltd, Nigeria | Jan 2026 - Mar 2026',[
'Interpreted piping and instrumentation diagrams (P&IDs) to support valve selection and system troubleshooting.',
'Coordinated engineering project documentation and supported improvements to administrative workflows.'])
job('Industrial Trainee','Aerial Robotics, Lekki, Nigeria | Oct 2023 - Feb 2024',[
'Assisted with drone hardware assembly, calibration, and embedded systems software.',
'Supported diagnostic testing and flight-readiness preparation for unmanned aerial vehicles.'])
job('Administrative Manager Assistant (Part-Time)','6/4 Properties, Ilupeju, Nigeria | Aug 2019 - Aug 2022',[
'Managed landlord-tenant communications, maintained leasing records, and coordinated property maintenance schedules.',
'Resolved structural inquiries and supported accurate administrative record-keeping.'])
job('Lead Engineer Assistant','EES Systems Nigeria Ltd, Ikorodu, Nigeria | Mar 2019 - Dec 2020',[
'Supported the installation, wiring, and maintenance of industrial and commercial electronic and sound systems.'])
section('Education')
story += [p('B.Sc. Mechanical Engineering','title'),p('Lagos State University (LASU), Ojo and Epe | Oct 2020 - Aug 2025','meta')]
section('Certifications & training')
story += [p('<b>Professional Certification in Project Management</b> - Project 1500 LASU Cohort Excos Program | Nov 2025 - Dec 2025','body'),p('<b>Professional Certification in Backend Web Development</b> - Tech Sphere Academy','body'),p('<b>OPL Academy</b> - Training graduate','body')]
story.append(PageBreak())
story += [p('JOSIAH EWUMI','title'),p('Selected projects, technical experience &amp; skills','meta')]
section('Selected projects')
job('12 kVA Solar Power Installation','Co-Lead Engineer',[
'Co-led design, procurement, mounting, and electrical integration of a solar power system serving 10 university student hostels.',
'Managed load calculations, battery bank layouts, and inverter configurations.'])
job('LASU Student Mental-Health Programme','Lead Project / Program Manager | Project Management Circle (PMC) Co-Founder',[
'Led a mental-health and depression-awareness programme for LASU students through PMC, focused on student support and access to counselling.'])
job('Personal Link-Tree Website','Software Developer',[
'Built a responsive personal website featuring a CV, portfolio projects, social links, email and WhatsApp contact, and dark/light themes.',
'Implemented a backend for social-link click tracking and owner-only management of public and private links.'])
job('Supermarket Management Program','Software Developer',[
'Visited stores and studied their daily operations to inform the application design.',
'Developed tools for product records, stock, sales, restocking, and reports.'])
job('Personal Finance Tracker','Lead Project Manager',[
'Assigned team tasks, reviewed code, and fixed most of the bugs during development.',
'Created the folder structure, set up branches, and added code comments to support team collaboration.'])
section('Additional experience')
job('Full Stack Software Developer','Apprentice &amp; Graduate Trainee | Tech Sphere Academy (TS Academy)',[
'Built web applications with frontend interfaces, server-side logic, APIs, and databases.'])
job('Graphic Design, Social Media &amp; Content Creation','Freelance &amp; Digital Media Practice',[
'Created posters, event flyers, and brand assets with Photoshop and Canva; developed content calendars and used audience analytics to inform engagement.'])
section('Skills & languages')
story += [p('<b>Engineering:</b> P&amp;IDs, control valves, solar installations, gas, electronic and sound systems.','body'),p('<b>Software &amp; digital:</b> React, Node.js, Python, REST APIs, MongoDB, relational databases, Photoshop, Canva, Google Workspace, Excel.','body'),p('<b>Delivery &amp; operations:</b> Project planning, resource allocation, risk management, Agile delivery, administration, team coordination.','body'),p('<b>Languages:</b> English (fluent), Yoruba (native), Japanese (learning).','body')]
doc=SimpleDocTemplate(str(out),pagesize=A4,rightMargin=44,leftMargin=44,topMargin=38,bottomMargin=54,title='Josiah Ewumi - Curriculum Vitae',author='Josiah Ewumi')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
r=PdfReader(out);assert len(r.pages)==2, f'Expected two pages, got {len(r.pages)}'
assert all(len(page.extract_text())>500 for page in r.pages)
print(f'Created verified two-page PDF: {out}')



