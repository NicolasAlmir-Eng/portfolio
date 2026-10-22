import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head><title>Erro 404 | Sistema não encontrado</title></Head>
      <Header />
      <main className="main-content container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', maxWidth: '600px', width: '100%' }}>
          <h1 className="neon-text" style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</h1>
          <h2 style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>ERRO_FATAL: Diretório não localizado.</h2>
          <p style={{ fontFamily: 'Fira Code, monospace', marginBottom: '3rem' }}>
            <span className="neon-text">root@nicolas</span>:~$ A página que você tentou acessar foi corrompida ou não existe na Matrix.
          </p>
          <Link href="/" className="btn-tech">&lt; Retornar_ao_Sistema /&gt;</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
