import React from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ tambahkan ini

const Footer = () => {
  const navigate = useNavigate(); // ⬅️ init hook untuk navigate

  return (
    <div style={{ background: 'black', color: 'white', padding: '50px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        
        {/* CTA Banner */}
        <div style={{
          background: '#FB810A',
          borderRadius: 8,
          padding: '40px 20px',
          textAlign: 'center',
          marginBottom: 64
        }}>
          <p style={{ fontSize: 30, fontWeight: 600, margin: 0, textAlign: 'center' }}>
            Hitting roadblocks in your pursuit of a design soulmate?
            <br />
            Let’s <span style={{ fontStyle: 'italic', fontFamily: 'Behind The Nineties' }}>Wemakit</span> solved it
          </p>

          <button
            onClick={() => navigate('/book-a-call')} // ⬅️ navigate ke halaman book-a-call
            style={{
              marginTop: 24,
              backgroundColor: 'white',
              color: '#6D758F',
              border: 'none',
              borderRadius: 7,
              padding: '12px 24px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Book a Call
          </button>
        </div>

        {/* Footer Links and Logo */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20
        }}>
          {/* Logo */}
          <img
            src="/images/LogoWhite.png"
            alt="Wemakit Logo"
            style={{ height: 40, objectFit: 'contain' }}
          />

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {['Pricing', 'Latest Project', 'Client Login', 'Contact'].map((link, index) => (
              <div key={index} style={{ color: '#6D758F', fontSize: 16 }}>
                {link}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          borderTop: '1px solid #E1E4ED',
          marginTop: 40,
          paddingTop: 24,
          fontSize: 16,
          color: '#B4B9C9',
          textAlign: 'center'
        }}>
          © 2024 wemakit | All Rights Reserved |{' '}
          <span style={{ color: '#6D758F', textDecoration: 'underline' }}>Terms and Conditions</span>{' '}
          | <span style={{ color: '#6D758F', textDecoration: 'underline' }}>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
