import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../config/supabase';

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjetos = async () => {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .order('criado_em', { ascending: false });
      
      if (!error && data) setProjetos(data);
      setLoading(false);
    };
    fetchProjetos();
  }, []);

  return (
    <>
      <Head>
        <title>Projetos | Nicolas Almir</title>
      </Head>
      <Header />
      <main className="main-content container">
        <h1 className="neon-text" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>/projetos_em_producao</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem' }}>Soluções desenvolvidas, scripts e aplicações.</p>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--primary-color)' }}>A carregar arquivos do sistema...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {projetos.map(proj => (
              <div key={proj.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
                
                <div style={{ height: '220px', overflow: 'hidden', borderBottom: '1px solid var(--surface-border)' }}>
                  <img src={proj.url_imagem} alt={proj.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                </div>

                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>{proj.titulo}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6', flex: 1 }}>
                    {proj.descricao}
                  </p>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontFamily: 'Fira Code, monospace' }}>
                      &gt; tech_stack: [{proj.tecnologias}]
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                    {proj.link_github && (
                      <a href={proj.link_github} target="_blank" rel="noopener noreferrer" className="btn-tech" style={{ flex: 1, textAlign: 'center', padding: '10px' }}>
                        <i className="fab fa-github"></i> Source
                      </a>
                    )}
                    {proj.link_deploy && (
                      <a href={proj.link_deploy} target="_blank" rel="noopener noreferrer" className="btn-tech" style={{ flex: 1, textAlign: 'center', padding: '10px', backgroundColor: 'var(--primary-glow)' }}>
                        <i className="fas fa-external-link-alt"></i> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {projetos.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)' }}>Nenhum projeto registado no momento.</p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
