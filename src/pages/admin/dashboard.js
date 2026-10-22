import { useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push('/admin/login');
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background-dark)', padding: '2rem', fontFamily: 'Fira Code, monospace' }}>
      <Head><title>Centro de Comando | Admin</title></Head>
      
      <div className="container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', paddingBottom: '1rem', borderBottom: '1px solid var(--primary-color)' }}>
          <div>
            <h1 className="neon-text">sys.admin()</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Acesso root concedido.</p>
          </div>
          <button onClick={handleLogout} className="btn-tech" style={{ borderColor: 'var(--error-color)', color: 'var(--error-color)' }}>Desconectar</button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <AdminCard title="Projetos" icon="fa-folder-open" link="/admin/projetos" desc="Upload de imagens, links do GitHub e deploy." />
          <AdminCard title="Certificados" icon="fa-certificate" link="/admin/gerenciar_certificados" desc="Upload de PDFs/Imagens e remoção de certificados." />
          <AdminCard title="Blog & Relatos" icon="fa-terminal" link="/admin/blog" desc="Adicionar experiências, hackathons e postagens." />
          <AdminCard title="Habilidades" icon="fa-code" link="/admin/habilidades" desc="Gerenciar barras de progresso e skills técnicas." />
          <AdminCard title="Estudos" icon="fa-graduation-cap" link="/admin/estudos" desc="Atualizar cursos em andamento e formações." />
          <AdminCard title="Interesses" icon="fa-star" link="/admin/interesses" desc="Gerenciar áreas de interesse e hobbies." />
        </div>
      </div>
    </div>
  );
}

const AdminCard = ({ title, icon, link, desc }) => (
  <Link href={link} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textDecoration: 'none' }}>
    <i className={`fas ${icon} neon-text`} style={{ fontSize: '2.5rem' }}></i>
    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem' }}>{title}</h2>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{desc}</p>
    <div style={{ marginTop: 'auto', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>Acessar Módulo &gt;</div>
  </Link>
);
