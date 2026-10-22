import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

export default function GerenciarBlog() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [arquivos, setArquivos] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) router.push('/admin/login');
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('blog_experiencias').select('*').order('criado_em', { ascending: false });
    if (!error) setPosts(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    let uploadedUrls = [];

    if (arquivos && arquivos.length > 0) {
      for (let i = 0; i < arquivos.length; i++) {
        const file = arquivos[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `blog/${fileName}`;

        const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file);
        
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
          uploadedUrls.push(publicUrl);
        }
      }
    }

    const { error: dbError } = await supabase.from('blog_experiencias').insert([
      { titulo, conteudo, data_evento: dataEvento, url_imagens: uploadedUrls }
    ]);

    setLoading(false);
    if (!dbError) {
      setTitulo(''); setConteudo(''); setDataEvento(''); setArquivos([]);
      fetchPosts();
      document.getElementById('fileInput').value = '';
    } else {
      alert('Erro ao salvar post: ' + dbError.message);
    }
  };

  const handleDelete = async (id, urlsImagens) => {
    if (confirm('Tem certeza que deseja deletar esta experiência?')) {
      if (urlsImagens && urlsImagens.length > 0) {
        const pathsToRemove = urlsImagens.map(url => `blog/${url.split('/').pop()}`);
        await supabase.storage.from('portfolio-assets').remove(pathsToRemove);
      }
      await supabase.from('blog_experiencias').delete().eq('id', id);
      fetchPosts();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Head><title>Gerenciar Blog | Admin</title></Head>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary-color)' }}>Gerenciar Blog & Experiências</h1>
        <Link href="/admin/dashboard" className="btn secondary">Voltar ao Dashboard</Link>
      </div>

      <div style={{ backgroundColor: 'var(--surface-dark)', padding: '2rem', borderRadius: '8px', marginBottom: '3rem', border: '1px solid var(--secondary-color)' }}>
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Título da Experiência (ex: Hackathon TJPA)" value={titulo} onChange={(e) => setTitulo(e.target.value)} required style={inputStyle} />
          <textarea placeholder="Conteúdo / Relato da experiência..." value={conteudo} onChange={(e) => setConteudo(e.target.value)} required style={{...inputStyle, height: '120px'}} />
          <input type="date" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} required style={inputStyle} />
          
          <label style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}>Fotos do Evento (Opcional, pode selecionar várias):</label>
          <input id="fileInput" type="file" accept="image/*" multiple onChange={(e) => setArquivos(e.target.files)} style={{ color: 'white' }} />
          
          <button type="submit" className="btn" disabled={loading} style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>{loading ? 'Publicando...' : 'Publicar Experiência'}</button>
        </form>
      </div>

      <div>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Postagens Cadastradas</h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {posts.map(post => (
            <div key={post.id} style={{ backgroundColor: 'var(--surface-dark)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--secondary-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{post.titulo}</h3>
                <p style={{ color: '#a1a1a1', fontSize: '0.9rem' }}>Data: {new Date(post.data_evento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} | {post.url_imagens?.length || 0} fotos anexadas</p>
              </div>
              <button onClick={() => handleDelete(post.id, post.url_imagens)} className="btn" style={{ borderColor: 'red', color: 'red' }}>Deletar</button>
            </div>
          ))}
          {posts.length === 0 && <p style={{ color: '#a1a1a1' }}>Nenhuma experiência registrada.</p>}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '0.8rem', backgroundColor: 'var(--background-dark)', border: '1px solid var(--secondary-color)', color: 'white', borderRadius: '4px' };
