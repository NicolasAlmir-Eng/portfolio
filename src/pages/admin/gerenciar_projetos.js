import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function GerenciarProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tecnologias, setTecnologias] = useState('');
  const [linkGithub, setLinkGithub] = useState('');
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
    const { data, error } = await supabase.from('projetos').select('*').order('criado_em', { ascending: false });
    if (!error) setProjetos(data);
  };

  const handleAddProjeto = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const techsArray = tecnologias.split(',').map(tech => tech.trim());

    const { error } = await supabase.from('projetos').insert([
      { 
        titulo, 
        descricao, 
        tecnologias: techsArray, 
        link_github: linkGithub 
      }
    ]);

    setLoading(false);
    if (!error) {
      setTitulo(''); setDescricao(''); setTecnologias(''); setLinkGithub('');
      fetchProjetos();
    } else {
      alert('Erro ao salvar projeto: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      await supabase.from('projetos').delete().eq('id', id);
      fetchProjetos();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Head><title>Gerenciar Projetos | Admin</title></Head>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary-color)' }}>Gerenciar Projetos</h1>
        <Link href="/admin/dashboard" className="btn secondary">Voltar ao Dashboard</Link>
      </div>

      <div style={{ backgroundColor: 'var(--surface-dark)', padding: '2rem', borderRadius: '8px', marginBottom: '3rem', border: '1px solid var(--secondary-color)' }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Adicionar Novo Projeto</h2>
        <form onSubmit={handleAddProjeto} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Título do Projeto (ex: Extrator de Código)" value={titulo} onChange={(e) => setTitulo(e.target.value)} required style={inputStyle} />
          <textarea placeholder="O que este projeto faz?" value={descricao} onChange={(e) => setDescricao(e.target.value)} required style={{...inputStyle, height: '100px'}} />
          <input type="text" placeholder="Tecnologias (separadas por vírgula, ex: Python, Next.js, Supabase)" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} required style={inputStyle} />
          <input type="url" placeholder="Link do GitHub" value={linkGithub} onChange={(e) => setLinkGithub(e.target.value)} required style={inputStyle} />
          <button type="submit" className="btn" disabled={loading} style={{ alignSelf: 'flex-start' }}>{loading ? 'Salvando...' : 'Salvar Projeto'}</button>
        </form>
      </div>

      <div>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Projetos Cadastrados</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {projetos.map(proj => (
            <div key={proj.id} style={{ backgroundColor: 'var(--surface-dark)', padding: '1.5rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--secondary-color)' }}>
              <div>
                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{proj.titulo}</h3>
                <p style={{ color: '#a1a1a1', fontSize: '0.9rem' }}>{proj.tecnologias.join(', ')}</p>
              </div>
              <button onClick={() => handleDelete(proj.id)} className="btn" style={{ borderColor: 'red', color: 'red' }}>Deletar</button>
            </div>
          ))}
          {projetos.length === 0 && <p style={{ color: '#a1a1a1' }}>Nenhum projeto cadastrado ainda.</p>}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '0.8rem', backgroundColor: 'var(--background-dark)', border: '1px solid var(--secondary-color)', color: 'white', borderRadius: '4px' };
