import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../config/supabase';

export default function Certificados() {
  const [certificados, setCertificados] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificados = async () => {
      const { data, error } = await supabase
        .from('certificados')
        .select('*')
        .order('data_conclusao', { ascending: false });
      
      if (!error && data) setCertificados(data);
      setLoading(false);
    };
    fetchCertificados();
  }, []);

  const certificadosFiltrados = filtroAtivo === 'all' 
    ? certificados 
    : certificados.filter(c => c.categoria === filtroAtivo);

  const FiltroBotao = ({ id, texto }) => (
    <button 
      onClick={() => setFiltroAtivo(id)}
      className="btn-tech"
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: filtroAtivo === id ? 'var(--primary-color)' : 'transparent',
        color: filtroAtivo === id ? 'var(--background-dark)' : 'var(--text-primary)',
        borderColor: filtroAtivo === id ? 'transparent' : 'var(--surface-border)',
        fontSize: '0.8rem',
        marginBottom: '1rem'
      }}
    >
      {texto}
    </button>
  );

  return (
    <>
      <Head>
        <title>Certificados | Nicolas Almir</title>
      </Head>
      <Header />
      <main className="main-content container">
        <h1 className="neon-text" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Módulo: Certificados</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>Documentação das minhas conquistas.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <FiltroBotao id="all" texto="Todos" />
          <FiltroBotao id="programming" texto="Programação" />
          <FiltroBotao id="ai" texto="IA" />
          <FiltroBotao id="web" texto="Web" />
          <FiltroBotao id="hardware" texto="Hardware" />
          <FiltroBotao id="data" texto="Dados" />
          <FiltroBotao id="business" texto="Business" />
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--primary-color)' }}>Carregando dados da Matrix...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {certificadosFiltrados.map(cert => (
              <div key={cert.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                
                <div style={{ height: '200px', backgroundColor: '#111', position: 'relative' }}>
                  {cert.tipo_arquivo === 'pdf' ? (
                    <iframe src={`${cert.url_arquivo}#toolbar=0`} style={{ width: '100%', height: '100%', border: 'none' }} title={cert.titulo} />
                  ) : (
                    <img src={cert.url_arquivo} alt={cert.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{cert.titulo}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{cert.emissor}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                    {cert.data_conclusao ? new Date(cert.data_conclusao).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : 'Data não informada'}
                  </p>
                  
                  <div style={{ marginTop: 'auto' }}>
                    <a href={cert.url_arquivo} target="_blank" rel="noopener noreferrer" className="btn-tech" style={{ width: '100%', textAlign: 'center' }}>
                      <i className="fas fa-external-link-alt"></i> Visualizar
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {certificadosFiltrados.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)' }}>Nenhum certificado encontrado nesta categoria.</p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
