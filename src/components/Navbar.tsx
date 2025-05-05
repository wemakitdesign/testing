import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div style={styles.wrapper}>
      <div style={styles.innerContainer}>
        <header style={styles.header}>
          {/* Logo */}
          <div style={styles.logoContainer}>
            <img src="/images/logo.png" alt="Logo" style={styles.logoImage} />
          </div>

          {/* Right Side: Menu + Login */}
          {!isMobile && (
            <div style={styles.rightContainer}>
              <nav>
                <ul style={styles.navList}>
                  <li>
                    <a href="#our-work" style={styles.navLink}>Our Work</a>
                  </li>
                  <li>
                    <a href="#pricing-section" style={styles.navLink}>Pricing</a>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/book-a-call')}
                      style={{
                        ...styles.navLink,
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        cursor: 'pointer',
                        font: 'inherit'
                      }}
                    >
                      Book a Call
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Login button */}
              <button
                onClick={() => navigate('/login')}
                style={styles.loginButton}
              >
                Log in
              </button>
            </div>
          )}
        </header>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    padding: '1rem 1rem 0',
  },
  innerContainer: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: '#ffffff',
    border: '1px solid #00000020',
    borderRadius: '9999px',
    padding: '0.5rem 1.5rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    transform: 'translateX(-12px)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
  },
  logoImage: {
    height: '100%',
    width: 'auto',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: '#2d2d2d',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'opacity 0.2s ease-in-out',
  },
  loginButton: {
    backgroundColor: '#0e0e0e',
    color: '#ffffff',
    padding: '0.5rem 1.25rem',
    borderRadius: '9999px',
    fontWeight: 'bold',
    textDecoration: 'none',
    border: '1px solid transparent',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Navbar;
