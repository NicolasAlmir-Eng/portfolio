import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../config/supabase';

export default function Habilidades() {
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabilidades = async () => {
      const { data, error } = await supabase
        .from('habilidades')
        .select('*')
        .order('percentual', { ascending: false });
      
      if (!error && data) setHabilidades(data);
      setLoading(false);
    };
    fetchHabilidades();
  }, []);

  const tecnicas = habilidades.filter(h => h.categoria === 'tecnico');
  const comportamentais = habilidades.filter(h => h.categoria === 'comportamental');
  const outros = habilidades.filter(h => h.categoria === 'outros');

  return (
    <>
      <Head>
        <title>Habilidades | Nicolas Almir</title>
      </Head>
      <Header />
      <main className="main-content container">
        <h1 className="neon-text" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Minhas Habilidades</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>Competências extraídas do sistema central.</p>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--primary-color)' }}>Sincronizando com o núcleo...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              {/* Habilidades Técnicas */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>/tech_skills</h2>
                {tecnicas.length > 0 ? tecnicas.map(hab => (
                  <div key={hab.id} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold' }}>{hab.nome}</span>
                      <span style={{ color: 'var(--primary-color)' }}>{hab.percentual}%</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${hab.percentual}%`, height: '100%', backgroundColor: 'var(--primary-color)', transition: 'width 1s ease-in-out' }}></div>
                    </div>
                  </div>
                )) : <p style={{ color: 'var(--text-secondary)' }}>Sem dados.</p>}
              </div>

              {/* Habilidades Comportamentais */}
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>/soft_skills</h2>
                {comportamentais.length > 0 ? comportamentais.map(hab => (
                  <div key={hab.id} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold' }}>{hab.nome}</span>
                      <span style={{ color: 'var(--secondary-color)' }}>{hab.percentual}%</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${hab.percentual}%`, height: '100%', backgroundColor: 'var(--secondary-color)', transition: 'width 1s ease-in-out' }}></div>
                    </div>
                  </div>
                )) : <p style={{ color: 'var(--text-secondary)' }}>Sem dados.</p>}
              </div>
            </div>

            {/* Outros Interesses */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>/outros_interesses</h2>
              {outros.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                  {outros.map(hab => (
                    <div key={hab.id} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold' }}>{hab.nome}</span>
                        <span style={{ color: 'var(--text-primary)' }}>{hab.percentual}%</span>
                      </div>
                      <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${hab.percentual}%`, height: '100%', backgroundColor: 'var(--text-primary)', transition: 'width 1s ease-in-out' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p style={{ color: 'var(--text-secondary)' }}>Sem dados.</p>}
            </div>

          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
