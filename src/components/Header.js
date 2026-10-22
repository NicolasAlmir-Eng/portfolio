import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Habilidades', path: '/habilidades' },
    { name: 'Estudos', path: '/estudos' },
    { name: 'Certificados', path: '/certificados' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, width: '100%',
      backgroundColor: 'var(--surface-dark)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--surface-border)', zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '1px' }}>
          <span className="neon-text">&lt;</span>Nicolas Almir<span className="neon-text">/&gt;</span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="nav-desktop">
          {links.map((link) => (
            <Link key={link.path} href={link.path} style={{
              fontWeight: '500', transition: 'color 0.3s', paddingBottom: '5px',
              color: router.pathname === link.path ? 'var(--primary-color)' : 'var(--text-primary)',
              borderBottom: router.pathname === link.path ? '2px solid var(--primary-color)' : 'none'
            }}>
              {link.name}
            </Link>
          ))}
          
          <button onClick={toggleTheme} className="btn-tech" style={{ padding: '8px 12px', borderRadius: '50%' }} title="Alternar Tema">
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </nav>

        {/* Controles Mobile */}
        <div className="nav-mobile-btn">
          <button onClick={toggleTheme} className="btn-tech" style={{ padding: '6px 10px', borderRadius: '50%' }}>
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.5rem', cursor: 'pointer' }}>
            <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileOpen && (
        <nav className="glass-panel" style={{ position: 'absolute', top: '80px', left: '20px', right: '20px', display: 'flex', flexDirection: 'column' }}>
          {links.map((link) => (
            <Link key={link.path} href={link.path} style={{
              display: 'block', padding: '15px 20px', 
              color: router.pathname === link.path ? 'var(--primary-color)' : 'var(--text-primary)'
            }} onClick={() => setMobileOpen(false)}>
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
