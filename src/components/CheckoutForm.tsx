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
      <select
  name="country"
  value={form.country}
  onChange={handleChange}
  required
  style={{
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    appearance: 'none', // Supaya select lebih konsisten di semua browser
    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23999' d='M2 0L0 2h4L2 0zM0 3l2 2 2-2H0z'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'calc(100% - 0.75rem)',
    backgroundPositionY: 'center',
    backgroundSize: '12px',
  }}
>
  {[
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Brazzaville)",
    "Congo (Kinshasa)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ].map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ))}
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
    backgroundColor: '#FB810A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

export default CheckoutForm;
