import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function GerenciarHabilidades() {
  const [habilidades, setHabilidades] = useState([]);
  const [nome, setNome] = useState('');
  const [percentual, setPercentual] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchHabilidades();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) router.push('/admin/login');
  };

  const fetchHabilidades = async () => {
    const { data } = await supabase.from('habilidades').select('*').order('criado_em', { ascending: false });
    if (data) setHabilidades(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('habilidades').insert([
      { nome, percentual: parseInt(percentual), categoria }
    ]);

    if (!error) {
      setNome(''); setPercentual(''); setCategoria('');
      fetchHabilidades();
    } else {
      alert('Erro: ' + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Deletar esta habilidade?')) {
      await supabase.from('habilidades').delete().eq('id', id);
      fetchHabilidades();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Fira Code, monospace' }}>
      <Head><title>Módulo Habilidades | Admin</title></Head>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="neon-text">Módulo: Habilidades</h1>
        <Link href="/admin/dashboard" className="btn-tech">Voltar</Link>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <form onSubmit={handleAdd} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
          <input type="text" placeholder="Nome da Habilidade (ex: Python)" value={nome} onChange={(e) => setNome(e.target.value)} required style={inputStyle} />
          <input type="number" placeholder="Percentual (0 a 100)" min="0" max="100" value={percentual} onChange={(e) => setPercentual(e.target.value)} required style={inputStyle} />
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required style={inputStyle}>
            <option value="" disabled>Selecione a Categoria</option>
            <option value="tecnico">Técnica (Programação/Ferramentas)</option>
            <option value="comportamental">Comportamental (Soft Skills)</option>
            <option value="outros">Outros Interesses</option>
          </select>
          <button type="submit" className="btn-tech" disabled={loading} style={{ gridColumn: '1 / -1', justifySelf: 'start' }}>
            {loading ? 'Processando...' : 'Adicionar Habilidade'}
          </button>
        </form>
      </div>

      <div>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Habilidades Cadastradas</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {habilidades.map(hab => (
            <div key={hab.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'var(--primary-color)' }}>{hab.nome}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Nível: {hab.percentual}% | Categoria: {hab.categoria}</p>
                
                {/* Visual ProgressBar */}
                <div style={{ width: '200px', height: '8px', background: 'rgba(255,255,255,0.1)', marginTop: '10px', borderRadius: '4px' }}>
                  <div style={{ width: `${hab.percentual}%`, height: '100%', background: 'var(--primary-color)', borderRadius: '4px' }}></div>
                </div>
              </div>
              <button onClick={() => handleDelete(hab.id)} className="btn-tech" style={{ borderColor: '#cf6679', color: '#cf6679' }}>Deletar</button>
            </div>
          ))}
          {habilidades.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>Nenhuma habilidade registrada.</p>}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { padding: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid var(--surface-border)', color: 'white', borderRadius: '4px', outline: 'none' };
