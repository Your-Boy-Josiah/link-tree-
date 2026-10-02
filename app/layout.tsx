// ===============================================================
// layout.tsx — Document metadata and shared styles.
// ===============================================================
import type { Metadata } from 'next';
import './globals.css';
import { SiteTheme } from './theme';
const title='Josiah Ewumi | Projects, Experience & CV';
const description='Josiah Ewumi: Mechanical Engineering graduate, project and program manager, and software developer. See my projects, read my CV, and get in touch.';
export const metadata: Metadata = {title,description,icons:{icon:'/favicon.svg'},openGraph:{title,description,type:'website'},twitter:{card:'summary',title,description}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" suppressHydrationWarning><body><SiteTheme>{children}</SiteTheme></body></html>}
