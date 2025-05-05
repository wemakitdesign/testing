import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state || {};

  const downloadInvoice = () => {
    // Simulasi download invoice (bisa diganti dengan real download URL)
    const blob = new Blob(['This is your invoice'], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'invoice.txt';
    link.click();
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          style={styles.icon}
          initial={{ rotate: -20, y: -20 }}
          animate={{ rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          🎉
        </motion.div>
        <h1 style={styles.title}>Payment Successful</h1>
        <p style={styles.text}>
          You’ve successfully subscribed to the <strong>{plan?.charAt(0).toUpperCase() + plan?.slice(1)}</strong> plan.
        </p>

        <div style={styles.buttonGroup}>
  <button style={styles.primaryButton} onClick={() => navigate('/dashboard')}>
    Go to Dashboard
  </button>
  <button style={styles.secondaryButton} onClick={() => navigate('/')}>
    Go to Homepage
  </button>
  <button style={styles.secondaryButton} onClick={downloadInvoice}>
    Download Invoice
  </button>
</div>

      </motion.div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  card: {
    backgroundColor: '#f7f7f7',
    borderRadius: '16px',
    padding: '60px',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    fontFamily: '"San Francisco Display", sans-serif',
  },
  icon: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '16px',
  },
  text: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '32px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '20px',
  },
  primaryButton: {
    backgroundColor: '#FB810A',
    color: '#fff',
    border: 'none',
    padding: '14px 24px',
    fontSize: '16px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    border: '1px solid #FB810A',
    color: '#FB810A',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  },
};

export default Success;
