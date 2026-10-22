import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

export default function GerenciarCertificados() {
  const [certificados, setCertificados] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [emissor, setEmissor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [dataConclusao, setDataConclusao] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchCertificados();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) router.push('/admin/login');
  };

  const fetchCertificados = async () => {
    const { data } = await supabase.from('certificados').select('*').order('criado_em', { ascending: false });
    if (data) setCertificados(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!arquivo) return alert('Selecione um arquivo PDF ou Imagem');
    setLoading(true);

    const isPdf = arquivo.type === 'application/pdf';
    const tipoArquivo = isPdf ? 'pdf' : 'png';
    const fileExt = arquivo.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `certificados/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, arquivo);
    
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      await supabase.from('certificados').insert([{ titulo, emissor, categoria, tipo_arquivo: tipoArquivo, url_arquivo: publicUrl, data_conclusao: dataConclusao }]);
      setTitulo(''); setEmissor(''); setCategoria(''); setArquivo(null); setDataConclusao('');
      document.getElementById('fileInput').value = '';
      fetchCertificados();
    } else {
      alert('Erro: ' + uploadError.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id, urlArquivo) => {
    if (confirm('ATENÇÃO: Deletar este certificado permanentemente?')) {
      const fileName = urlArquivo.split('/').pop();
      await supabase.storage.from('portfolio-assets').remove([`certificados/${fileName}`]);
      await supabase.from('certificados').delete().eq('id', id);
      fetchCertificados();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Fira Code, monospace' }}>
      <Head><title>Módulo Certificados | Admin</title></Head>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="neon-text">Módulo: Certificados</h1>
        <Link href="/admin/dashboard" className="btn-tech">Voltar</Link>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <form onSubmit={handleUpload} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
          <input type="text" placeholder="Título do Certificado" value={titulo} onChange={(e) => setTitulo(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Emissor (Ex: UFPA)" value={emissor} onChange={(e) => setEmissor(e.target.value)} required style={inputStyle} />
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required style={inputStyle}>
            <option value="" disabled>Selecione a Categoria</option>
            <option value="programming">Programação</option>
            <option value="ai">IA</option>
            <option value="web">Web</option>
            <option value="hardware">Hardware</option>
            <option value="data">Dados</option>
            <option value="business">Business</option>
          </select>
          <input type="date" value={dataConclusao} onChange={(e) => setDataConclusao(e.target.value)} required style={inputStyle} />
          <input id="fileInput" type="file" accept="application/pdf, image/png, image/jpeg" onChange={(e) => setArquivo(e.target.files[0])} required style={{ ...inputStyle, gridColumn: '1 / -1' }} />
          <button type="submit" className="btn-tech" disabled={loading} style={{ gridColumn: '1 / -1', justifySelf: 'start' }}>
            {loading ? 'Processando...' : 'Fazer Upload'}
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {certificados.map(cert => (
          <div key={cert.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Preview Area */}
            <div style={{ height: '200px', backgroundColor: '#111', position: 'relative' }}>
              {cert.tipo_arquivo === 'pdf' ? (
                <iframe src={`${cert.url_arquivo}#toolbar=0`} style={{ width: '100%', height: '100%', border: 'none' }} title={cert.titulo} />
              ) : (
                <img src={cert.url_arquivo} alt={cert.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h3 style={{ color: 'var(--primary-color)' }}>{cert.titulo}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{cert.emissor}</p>
              
              <button onClick={() => handleDelete(cert.id, cert.url_arquivo)} className="btn-tech" style={{ marginTop: 'auto', borderColor: '#cf6679', color: '#cf6679', width: '100%' }}>
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
