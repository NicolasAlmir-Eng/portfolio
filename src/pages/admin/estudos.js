import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function GerenciarEstudos() {
  const [estudos, setEstudos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchEstudos();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) router.push('/admin/login');
  };

  const fetchEstudos = async () => {
    const { data } = await supabase.from('estudos').select('*').order('criado_em', { ascending: false });
    if (data) setEstudos(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('estudos').insert([
      { titulo, instituicao, status }
    ]);

    if (!error) {
      setTitulo(''); setInstituicao(''); setStatus('');
      fetchEstudos();
    } else {
      alert('Erro: ' + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Deletar este registro de estudo?')) {
      await supabase.from('estudos').delete().eq('id', id);
      fetchEstudos();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Fira Code, monospace' }}>
      <Head><title>Módulo Estudos | Admin</title></Head>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="neon-text">Módulo: Estudos</h1>
        <Link href="/admin/dashboard" className="btn-tech">Voltar</Link>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <form onSubmit={handleAdd} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
          <input type="text" placeholder="Curso/Formação (ex: Engenharia)" value={titulo} onChange={(e) => setTitulo(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Instituição (ex: UFPA)" value={instituicao} onChange={(e) => setInstituicao(e.target.value)} required style={inputStyle} />
          <select value={status} onChange={(e) => setStatus(e.target.value)} required style={inputStyle}>
            <option value="" disabled>Status</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Trancado">Trancado</option>
          </select>
          <button type="submit" className="btn-tech" disabled={loading} style={{ gridColumn: '1 / -1', justifySelf: 'start' }}>
            {loading ? 'Processando...' : 'Adicionar Estudo'}
          </button>
        </form>
      </div>

      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Formações Registradas</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {estudos.map(estudo => (
            <div key={estudo.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'var(--primary-color)' }}>{estudo.titulo}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Instituição: {estudo.instituicao}</p>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Status: {estudo.status}</p>
              </div>
              <button onClick={() => handleDelete(estudo.id)} className="btn-tech" style={{ borderColor: '#cf6679', color: '#cf6679' }}>Deletar</button>
            </div>
          ))}
          {estudos.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>Nenhuma formação registrada.</p>}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { padding: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid var(--surface-border)', color: 'white', borderRadius: '4px', outline: 'none' };
