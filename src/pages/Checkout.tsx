import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import wemakitLogo from '../assets/logo-wemakit.svg';

const stripePromise = loadStripe('pk_test_51RGFqgKgIJHd30PYaTbcI0PTqjteUcNUDqB51UK6PSonppZClRzoqGEfgwbi2OzhEm3U0gyPEpTA3veXw5xN0Ztm00S509exI4');

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [plan, setPlan] = useState<string>('basic');
  const [userData, setUserData] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (location.state && typeof location.state === 'object') {
      const typedState = location.state as { plan?: string; userData?: any };
      if (typedState.userData) {
        setUserData(typedState.userData);
        setPlan(typedState.plan || 'basic');
        setIsReady(true);
      } else {
        navigate('/create-account', { replace: true });
      }
    } else {
      navigate('/create-account', { replace: true });
    }
  }, [location.state, navigate]);

  if (!isReady) return null;

  const planDetails: Record<string, { price: string; features: string[] }> = {
    basic: {
      price: '$399/m',
      features: [
        'One request at a time',
        'Average 48 hour delivery',
        'Unlimited brands',
        'Unlimited users',
        'Unlimited stock photos',
        'Pause or cancel anytime',
      ],
    },
    pro: {
      price: '$799/m',
      features: [
        'Two requests at a time',
        'Average 48 hour delivery',
        'Unlimited brands',
        'Unlimited users',
        'Unlimited stock photos',
        'Pause or cancel anytime',
      ],
    },
  };

  const handleSuccess = () => {
    navigate('/success', { state: { userData, plan } });
  };

  const { price, features } = planDetails[plan.toLowerCase()] || planDetails.basic;

  return (
    <div style={styles.container}>
      <img src={wemakitLogo} alt="Wemakit" style={styles.logo} />

      <div style={styles.flowBar}>
        {['Create Account', 'Checkout', 'Success'].map((step, index) => {
          const isActive = index === 1;
          const isUpcoming = index > 1;
          return (
            <div
              key={step}
              style={{
                ...styles.flowStep,
                color: isActive ? '#FB810A' : isUpcoming ? '#aaa' : '#000',
              }}
            >
              {step}
              {index < 2 && <span style={styles.separator}>→</span>}
            </div>
          );
        })}
      </div>

      <div style={styles.flowDivider} />

      <div style={styles.contentRow}>
        <div style={styles.formWrapper}>
          <Elements stripe={stripePromise}>
            <CheckoutForm onSuccess={handleSuccess} />
          </Elements>
        </div>

        <div style={styles.verticalLine} />

        <div style={styles.planInfo}>
          <h3 style={styles.planTitle}>{plan.charAt(0).toUpperCase() + plan.slice(1)} Plan</h3>
          <ul style={styles.featureList}>
            {features.map((item, index) => (
              <li key={index} style={styles.featureItem}>• {item}</li>
            ))}
          </ul>
          <p style={styles.planPrice}>Billed Monthly: <strong>{price}</strong></p>
          <p
            style={styles.changePlan}
            onClick={() => navigate('/', { state: { scrollToPricing: true } })}
          >
            Change plan
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '40px 80px',
    fontFamily: 'San Francisco Display, sans-serif',
    background: '#fff',
    minHeight: '100vh',
  },
  logo: {
    height: '32px',
    marginBottom: '30px',
  },
  flowBar: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 500,
  },
  flowStep: {
    display: 'flex',
    alignItems: 'center',
  },
  separator: {
    margin: '0 10px',
    color: '#ccc',
  },
  flowDivider: {
    borderBottom: '1px solid #e0e0e0',
    marginTop: '16px',
    marginBottom: '40px',
  },
  contentRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '60px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  formWrapper: {
    flex: 3,
  },
  verticalLine: {
    width: '1px',
    backgroundColor: '#e0e0e0',
    minHeight: '500px',
  },
  planInfo: {
    flex: 2,
    paddingLeft: '40px',
  },
  planTitle: {
    fontSize: '22px',
    fontWeight: 700,
    marginBottom: '16px',
  },
  featureList: {
    padding: 0,
    listStyle: 'none',
    marginBottom: '16px',
  },
  featureItem: {
    fontSize: '15px',
    marginBottom: '10px',
    color: '#444',
  },
  planPrice: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '12px',
  },
  changePlan: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
  },
};

export default Checkout;
