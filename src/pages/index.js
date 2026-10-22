import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const fullText = "Desenvolvedor & Estudante de Eng. da Computação e Matemática.";
  
  useEffect(() => {
    let currentText = '';
    let index = 0;
    
    const interval = setInterval(() => {
      currentText += fullText[index];
      setText(currentText);
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Nicolas Almir | Eng. Computação & Matemática</title>
        <meta name="description" content="Portfólio de Nicolas Almir, Desenvolvedor e Estudante de Engenharia da Computação e Licenciatura em Matemática." />
        <meta property="og:title" content="Nicolas Almir | Portfólio Tech" />
        <meta property="og:description" content="Desenvolvedor, criador de soluções eficientes e apaixonado por tecnologia." />
        <meta property="og:image" content="/eu.png" />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <main className="main-content container">
        
        {/* HERO SECTION */}
        <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', margin: '4rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center', width: '100%' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <img 
                  src="/eu.png" 
                  alt="Nicolas Almir" 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '50%', 
                    border: '2px solid var(--primary-color)',
                    boxShadow: '0 0 20px var(--primary-glow)',
                    objectFit: 'cover',
                    flexShrink: 0
                  }} 
                />
                <div>
                  <h2 style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>sys.init()</h2>
                  <h1 style={{ fontSize: '3rem', lineHeight: '1.1' }}>
                    Olá, eu sou <br />
                    <span className="neon-text">Nicolas Almir</span>
                  </h1>
                </div>
              </div>

              <div style={{ minHeight: '80px', marginBottom: '2rem' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontFamily: 'Fira Code, monospace' }}>
                  <span className="neon-text">{'>'}</span> {text}<span className="typing-cursor"></span>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/projetos" className="btn-tech">Ver Projetos</Link>
                <Link href="https://github.com/NicolasAlmir-Eng" target="_blank" className="btn-tech" style={{ borderColor: 'var(--text-secondary)', color: 'var(--text-secondary)' }}>GitHub</Link>
              </div>
            </div>

            {/* Terminal Window Card */}
            <div className="glass-panel" style={{ padding: '0' }}>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderBottom: '1px solid var(--surface-border)', display: 'flex', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              </div>
              <div style={{ padding: '2rem', fontFamily: 'Fira Code, monospace', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <p><span className="neon-text">root@nicolas</span>:~$ cat info.txt</p>
                <p style={{ marginTop: '1rem', color: 'var(--text-primary)' }}>{'{'}</p>
                <p style={{ paddingLeft: '1.5rem' }}>"idade": 18,</p>
                <p style={{ paddingLeft: '1.5rem' }}>"localizacao": "Belém, PA",</p>
                <p style={{ paddingLeft: '1.5rem' }}>"formacao": "Engenharia da Computação & Licenciatura em Matemática - UFPA",</p>
                <p style={{ paddingLeft: '1.5rem' }}>"status": "Buscando conhecimento contínuo"</p>
                <p style={{ color: 'var(--text-primary)' }}>{'}'}</p>
                <p style={{ marginTop: '1rem' }}><span className="neon-text">root@nicolas</span>:~$ <span className="typing-cursor"></span></p>
              </div>
            </div>

          </div>
        </section>

        {/* HIGHLIGHTS SECTION */}
        <section style={{ margin: '6rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            
            <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <i className="fas fa-code neon-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}></i>
              <h3 style={{ marginBottom: '1rem' }}>Desenvolvimento</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Criação de soluções focadas em performance e código limpo.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <i className="fas fa-database neon-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}></i>
              <h3 style={{ marginBottom: '1rem' }}>Dados & Back-end</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Estruturação de bancos de dados e construção de lógicas sólidas.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <i className="fas fa-microchip neon-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}></i>
              <h3 style={{ marginBottom: '1rem' }}>Hardware & Maker</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Experiência com Arduino, robótica e eletrônica aplicada.</p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
