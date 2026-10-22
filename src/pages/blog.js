import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../config/supabase';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_experiencias')
        .select('*')
        .order('data_evento', { ascending: false });
      
      if (!error) setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Blog & Experiências | Nicolas Almir</title>
        
      </Head>

      <Header />

      <main className="main-content" style={{ minHeight: '80vh', paddingBottom: '4rem' }}>
        <h1 className="page-title" style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '2.5rem' }}>Blog & Experiências</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary-dark)', marginBottom: '3rem' }}>Eventos, hackathons e rotina de desenvolvimento.</p>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--primary-color)' }}>Carregando dados da Matrix...</p>
        ) : (
          <div style={{ display: 'grid', gap: '3rem' }}>
            {posts.map(post => (
              <article key={post.id} style={{ backgroundColor: 'var(--surface-dark)', borderRadius: '8px', padding: '2rem', border: '1px solid var(--secondary-color)' }}>
                <header style={{ borderBottom: '1px solid rgba(0, 255, 65, 0.2)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.5rem' }}>{post.titulo}</h2>
                  <div style={{ color: 'var(--primary-color)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="far fa-calendar-alt"></i>
                    {new Date(post.data_evento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                  </div>
                </header>
                
                <div style={{ color: '#E0E0E0', lineHeight: '1.8', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>
                  {post.conteudo}
                </div>

                {post.url_imagens && post.url_imagens.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                    {post.url_imagens.map((imgUrl, index) => (
                      <div key={index} style={{ height: '200px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--secondary-color)' }}>
                        <img src={imgUrl} alt={`Foto ${index + 1} de ${post.titulo}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
            
            {posts.length === 0 && (
              <p style={{ textAlign: 'center', color: '#a1a1a1' }}>Nenhuma postagem publicada ainda.</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
