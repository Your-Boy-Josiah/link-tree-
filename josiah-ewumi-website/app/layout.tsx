// ===============================================================
// layout.tsx — Document metadata and shared styles.
// ===============================================================
import type { Metadata } from 'next';
import './globals.css';
import { SiteTheme } from './theme';
const title='Josiah Ewumi | Engineering, Product & Code';
const description='Get to know Josiah Ewumi: explore my work, download my CV, and connect with me directly.';
export const metadata: Metadata = {title,description,icons:{icon:'/favicon.svg'},openGraph:{title,description,type:'website'},twitter:{card:'summary',title,description}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" suppressHydrationWarning><body><SiteTheme>{children}</SiteTheme></body></html>}
