import React from 'react';

const images = [
  '/images/work1.webp',
  '/images/work2.webp',
  '/images/work3.webp',
  '/images/work4.webp',
  '/images/work5.webp',
  '/images/work6.webp',
  '/images/work7.webp',
  '/images/work8.webp',
  '/images/work9.webp',
  '/images/work10.webp',
];

const OurWorks = () => {
  return (
    <div
      style={{
        width: '100%',
        padding: '60px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: 60, fontWeight: 700, fontFamily: 'San Francisco Text, sans-serif', color: 'black' }}>
          Our <span style={{ fontFamily: 'Behind The Nineties', fontStyle: 'italic', fontWeight: 400 }}>works</span>
        </div>
      </div>

      {/* Scrolling Images */}
      <div style={{ width: '100%', maxWidth: 1200, overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            gap: 12,
            animation: 'scrollLeft 40s linear infinite',
            width: 'max-content',
          }}
        >
          {[...images, ...images].map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Work ${idx + 1}`}
              style={{
                width: 202,
                height: 244,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          ))}
        </div>
      </div>

      {/* Button */}
      <a
        href="https://www.behance.net/purvokator"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: 'black',
          borderRadius: 8,
          padding: '20px 40px',
          cursor: 'pointer',
          marginTop: 40,
          textDecoration: 'none',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 500,
            fontFamily: 'San Francisco Text, sans-serif',
            textAlign: 'center',
          }}
        >
          See our works
        </div>
      </a>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default OurWorks;
