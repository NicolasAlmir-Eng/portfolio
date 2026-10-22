export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--surface-border)', padding: '3rem 0', background: 'var(--background-dark)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div>
          <h3 className="neon-text" style={{ marginBottom: '1rem' }}>Nicolas Almir</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Desenvolvedor e estudante de Engenharia da Computaçãona UFPA e universitário de Licenciatura em Matemática .</p>
        </div>
        
        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Conexões</h3>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '1.5rem' }}>
            <a href="https://github.com/NicolasAlmir-Eng" target="_blank" rel="noreferrer" className="neon-text-hover" style={iconStyle}><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/nicolas-almir-92773527a" target="_blank" rel="noreferrer" className="neon-text-hover" style={iconStyle}><i className="fab fa-linkedin"></i></a>
            <a href="https://instagram.com/nick_snts_0" target="_blank" rel="noreferrer" className="neon-text-hover" style={iconStyle}><i className="fab fa-instagram"></i></a>
            <a href="mailto:nicolas.almir.br@gmail.com" className="neon-text-hover" style={iconStyle}><i className="fas fa-envelope"></i></a>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>Portfolio - Desenvolvido por Nicolas Almir</p>
      </div>
    </footer>
  );
}

const iconStyle = { color: 'var(--text-secondary)', transition: 'all 0.3s' };

if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `.neon-text-hover:hover { color: var(--primary-color) !important; text-shadow: 0 0 10px var(--primary-glow); transform: translateY(-3px); display: inline-block; }`;
  document.head.appendChild(style);
}
