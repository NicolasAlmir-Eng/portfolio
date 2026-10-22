import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../config/supabase';

export default function Estudos() {
  const [estudos, setEstudos] = useState([]);
  const [interesses, setInteresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: dadosEstudos } = await supabase.from('estudos').select('*').order('criado_em', { ascending: false });
      const { data: dadosInteresses } = await supabase.from('interesses').select('*').order('criado_em', { ascending: false });
      
      if (dadosEstudos) setEstudos(dadosEstudos);
      if (dadosInteresses) setInteresses(dadosInteresses);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Concluído') return 'var(--primary-color)';
    if (status === 'Em andamento') return '#ffbd2e';
    return '#cf6679'; // Trancado/Cancelado
  };

  return (
    <>
      <Head>
        <title>Estudos & Interesses | Nicolas Almir</title>
      </Head>
      <Header />
      <main className="main-content container">
        <h1 className="neon-text" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Trajetória Acadêmica</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem' }}>Formações, cursos e áreas de interesse atuais.</p>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--primary-color)' }}>Sincronizando dados...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            
            {/* Seção de Estudos */}
            <section>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>/formacoes_e_cursos</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {estudos.length > 0 ? estudos.map(estudo => (
                  <div key={estudo.id} className="glass-panel" style={{ padding: '2rem', borderLeft: `4px solid ${getStatusColor(estudo.status)}` }}>
                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{estudo.titulo}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                      <i className="fas fa-university" style={{ marginRight: '8px' }}></i> {estudo.instituicao}
                    </p>
                    <span style={{ 
                      padding: '0.4rem 1rem', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      color: getStatusColor(estudo.status),
                      border: `1px solid ${getStatusColor(estudo.status)}`
                    }}>
                      {estudo.status}
                    </span>
                  </div>
                )) : <p style={{ color: 'var(--text-secondary)' }}>Nenhum registro acadêmico encontrado.</p>}
              </div>
            </section>

            {/* Seção de Interesses */}
            <section>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>/areas_de_interesse</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {interesses.length > 0 ? interesses.map(int => (
                  <div key={int.id} className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s' }}>
                    <i className={`fas ${int.icone || 'fa-star'} neon-text`} style={{ fontSize: '1.5rem' }}></i>
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{int.nome}</span>
                  </div>
                )) : <p style={{ color: 'var(--text-secondary)' }}>Nenhum interesse registrado.</p>}
              </div>
            </section>

          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
