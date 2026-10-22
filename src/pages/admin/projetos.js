import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

export default function GerenciarProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tecnologias, setTecnologias] = useState('');
  const [linkGithub, setLinkGithub] = useState('');
  const [linkDeploy, setLinkDeploy] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchProjetos();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) router.push('/admin/login');
  };

  const fetchProjetos = async () => {
    const { data } = await supabase.from('projetos').select('*').order('criado_em', { ascending: false });
    if (data) setProjetos(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!arquivo) return alert('Selecione uma imagem de capa para o projeto');
    setLoading(true);

    const fileExt = arquivo.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `projetos/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, arquivo);
    
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      
      await supabase.from('projetos').insert([{ 
        titulo, descricao, tecnologias, link_github: linkGithub, link_deploy: linkDeploy, url_imagem: publicUrl 
      }]);
      
      setTitulo(''); setDescricao(''); setTecnologias(''); setLinkGithub(''); setLinkDeploy(''); setArquivo(null);
      document.getElementById('fileInput').value = '';
      fetchProjetos();
    } else {
      alert('Erro: ' + uploadError.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id, urlImagem) => {
    if (confirm('Deletar este projeto permanentemente?')) {
      if (urlImagem) {
        const fileName = urlImagem.split('/').pop();
        await supabase.storage.from('portfolio-assets').remove([`projetos/${fileName}`]);
      }
      await supabase.from('projetos').delete().eq('id', id);
      fetchProjetos();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Fira Code, monospace' }}>
      <Head><title>Módulo Projetos | Admin</title></Head>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="neon-text">Módulo: Projetos</h1>
        <Link href="/admin/dashboard" className="btn-tech">Voltar</Link>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <form onSubmit={handleUpload} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
          <input type="text" placeholder="Título do Projeto" value={titulo} onChange={(e) => setTitulo(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Tecnologias (ex: Next.js, Python, Supabase)" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} required style={inputStyle} />
          <textarea placeholder="Descrição breve do projeto" value={descricao} onChange={(e) => setDescricao(e.target.value)} required style={{ ...inputStyle, gridColumn: '1 / -1', minHeight: '100px' }} />
          <input type="url" placeholder="Link do GitHub" value={linkGithub} onChange={(e) => setLinkGithub(e.target.value)} style={inputStyle} />
          <input type="url" placeholder="Link do Deploy (Opcional)" value={linkDeploy} onChange={(e) => setLinkDeploy(e.target.value)} style={inputStyle} />
          <input id="fileInput" type="file" accept="image/png, image/jpeg, image/webp" onChange={(e) => setArquivo(e.target.files[0])} required style={{ ...inputStyle, gridColumn: '1 / -1' }} />
          <button type="submit" className="btn-tech" disabled={loading} style={{ gridColumn: '1 / -1', justifySelf: 'start' }}>
            {loading ? 'Processando...' : 'Cadastrar Projeto'}
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {projetos.map(proj => (
          <div key={proj.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ height: '200px', backgroundColor: '#111', position: 'relative' }}>
              <img src={proj.url_imagem} alt={proj.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h3 style={{ color: 'var(--primary-color)' }}>{proj.titulo}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Tech: {proj.tecnologias}</p>
              <button onClick={() => handleDelete(proj.id, proj.url_imagem)} className="btn-tech" style={{ marginTop: 'auto', borderColor: '#cf6679', color: '#cf6679', width: '100%' }}>
                <i className="fas fa-trash"></i> Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { padding: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid var(--surface-border)', color: 'white', borderRadius: '4px', outline: 'none' };
