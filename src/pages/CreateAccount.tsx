import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import wemakitLogo from '../assets/logo-wemakit.svg';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedPlan = params.get('plan') || 'basic';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    companyWebsite: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError || !data.user) {
        setError(signUpError?.message || 'Signup failed');
        return;
      }

      const { error: insertError } = await supabase.from('clients').insert({
        id: data.user.id,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: formData.companyName,
        website: formData.companyWebsite,
        auth_uid: data.user.id
      });

      if (insertError) {
        setError('Signup succeeded but failed to save profile.');
        return;
      }

      // ✅ Kalau sukses signup + insert, langsung arahkan ke Checkout!
      navigate('/checkout', {
        state: {
          userData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            companyName: formData.companyName,
            companyWebsite: formData.companyWebsite,
            role: formData.role,
            email: formData.email,
          },
          plan: selectedPlan,
        },
      });
    } catch (err: any) {
      console.error('Signup failed:', err);
      setError('Unexpected error occurred');
    }
  };

  const { price, features } = planDetails[selectedPlan.toLowerCase()] || planDetails.basic;

  return (
    <div style={styles.container}>
      <img src={wemakitLogo} alt="Wemakit" style={styles.logo} />

      <div style={styles.flowBar}>
        {['Create Account', 'Checkout', 'Success'].map((step, index) => {
          const isActive = index === 0;
          const isUpcoming = index > 0;
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
        <form onSubmit={handleSubmit} style={styles.form}>
          {Object.entries(formData).map(([field, value]) => (
            <div key={field} style={styles.inputGroup}>
              <label style={styles.label}>
                {field
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())
                  .replace(/\b\w/g, char => char.toUpperCase())}{' '}
                *
              </label>
              <input
                type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                name={field}
                value={value}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          ))}
          {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}
          <button type="submit" style={styles.submitBtn}>Register</button>
        </form>

        <div style={styles.verticalLine} />

        <div style={styles.planInfo}>
          <h3 style={styles.planTitle}>{selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan</h3>
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
  form: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '12px',
  },
  label: {
    fontWeight: 500,
    fontSize: '15px',
    marginBottom: '6px',
  },
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    width: '60%',
    minWidth: '250px',
  },
  submitBtn: {
    marginTop: '20px',
    padding: '14px 20px',
    fontSize: '16px',
    backgroundColor: '#FB810A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    width: '50%',
    minWidth: '220px',
  },
  verticalLine: {
    width: '1px',
    backgroundColor: '#e0e0e0',
    height: 'auto',
    alignSelf: 'stretch',
    marginTop: '20px',
    marginBottom: '20px',
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

export default CreateAccount;
