import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function GerenciarInteresses() {
  const [interesses, setInteresses] = useState([]);
  const [nome, setNome] = useState('');
  const [icone, setIcone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchInteresses();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) router.push('/admin/login');
  };

  const fetchInteresses = async () => {
    const { data } = await supabase.from('interesses').select('*').order('criado_em', { ascending: false });
    if (data) setInteresses(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('interesses').insert([{ nome, icone }]);

    if (!error) {
      setNome(''); setIcone('');
      fetchInteresses();
    } else {
      alert('Erro: ' + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Remover este interesse?')) {
      await supabase.from('interesses').delete().eq('id', id);
      fetchInteresses();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Fira Code, monospace' }}>
      <Head><title>Módulo Interesses | Admin</title></Head>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="neon-text">Módulo: Interesses</h1>
        <Link href="/admin/dashboard" className="btn-tech">Voltar</Link>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <form onSubmit={handleAdd} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
          <input type="text" placeholder="Nome (ex: Robótica)" value={nome} onChange={(e) => setNome(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Ícone FontAwesome (ex: fa-robot)" value={icone} onChange={(e) => setIcone(e.target.value)} required style={inputStyle} />
          <button type="submit" className="btn-tech" disabled={loading} style={{ gridColumn: '1 / -1', justifySelf: 'start' }}>
            {loading ? 'Processando...' : 'Adicionar Interesse'}
          </button>
        </form>
      </div>

      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Interesses Registrados</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {interesses.map(int => (
            <div key={int.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <i className={`fas ${int.icone} neon-text`} style={{ fontSize: '1.5rem' }}></i>
                <span style={{ color: 'var(--text-primary)' }}>{int.nome}</span>
              </div>
              <button onClick={() => handleDelete(int.id)} className="btn-tech" style={{ padding: '5px 10px', borderColor: '#cf6679', color: '#cf6679' }}>X</button>
            </div>
          ))}
          {interesses.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>Nenhum registro encontrado.</p>}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { padding: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid var(--surface-border)', color: 'white', borderRadius: '4px', outline: 'none' };
