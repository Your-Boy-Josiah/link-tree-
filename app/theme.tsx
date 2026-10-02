// ===============================================================
// theme.tsx — Persisted blue/black theme and accessible mode control.
// ===============================================================
'use client';
import { ThemeProvider, useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
export function SiteTheme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} storageKey="josiah-theme" disableTransitionOnChange>{children}</ThemeProvider>;
}
export function ThemeToggle() {
  const { setTheme } = useTheme();
  // CSS selects the correct action before hydration, without a label flash.
  return <div className="theme-control">
    <button className="theme-toggle show-in-dark" onClick={() => setTheme('light')} aria-label="Switch to light mode" title="Switch to light mode"><Sun size={19} aria-hidden="true" /></button>
    <button className="theme-toggle show-in-light" onClick={() => setTheme('dark')} aria-label="Switch to dark mode" title="Switch to dark mode"><Moon size={19} aria-hidden="true" /></button>
  </div>;
}
