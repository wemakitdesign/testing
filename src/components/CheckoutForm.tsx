import React, { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

interface Props {
  onSuccess: () => void;
}

const CheckoutForm: React.FC<Props> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Di real app: kirim ke backend & proses dengan Stripe
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: 'auto' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>Checkout</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 2 }}>
          <label>Card number *</label>
          <div style={styles.input}><CardNumberElement /></div>
        </div>
        <div style={{ flex: 1 }}>
          <label>Expiry date *</label>
          <div style={styles.input}><CardExpiryElement /></div>
        </div>
        <div style={{ flex: 1 }}>
          <label>CVV *</label>
          <div style={styles.input}><CardCvcElement /></div>
        </div>
      </div>

      <label>Cardholder name *</label>
      <input name="name" value={form.name} onChange={handleChange} style={styles.input} required />

      <label>Billing address *</label>
      <input name="address" value={form.address} onChange={handleChange} style={styles.input} required />

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>City *</label>
          <input name="city" value={form.city} onChange={handleChange} style={styles.input} required />
        </div>
        <div style={{ flex: 1 }}>
          <label>State</label>
          <input name="state" value={form.state} onChange={handleChange} style={styles.input} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Zip code *</label>
          <input name="zip" value={form.zip} onChange={handleChange} style={styles.input} required />
        </div>
      </div>

      <label>Country *</label>
      <select name="country" value={form.country} onChange={handleChange} style={styles.input}>
        <option>United States</option>
        <option>Indonesia</option>
        <option>Singapore</option>
        <option>Malaysia</option>
        {/* tambahkan negara lain jika perlu */}
      </select>

      <button type="submit" disabled={loading || !stripe} style={styles.button}>
        {loading ? 'Processing...' : 'Subscribe'}
      </button>

      <p style={{ fontSize: '12px', marginTop: '10px' }}>
        By clicking Subscribe you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
      </p>
    </form>
  );
};

const styles = {
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: '20px',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

export default CheckoutForm;
