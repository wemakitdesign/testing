import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface LabelItem {
  label: string;
  x: number;
  y: number;
  bg: string;
  color: string;
  border?: boolean;
  rotate?: number;
  center?: boolean;
}

export default function WhatWeDesign() {
  const items: LabelItem[] = [
    { label: 'Slide decks', x: 199, y: 50, bg: '#7B9CEF', color: 'black' },
    { label: 'Print design', x: 446, y: 157, bg: '#363636', color: 'white', border: true },
    { label: 'Brand guides', x: 595, y: 126, bg: '#F09AEB', color: 'black', border: true },
    { label: 'Logos', x: 624, y: 198, bg: '#FB810A', color: '#363636', rotate: -12 },
    { label: 'Web design', x: 163, y: 160, bg: '#FFDB01', color: 'black', border: true, rotate: 7 },
    { label: 'UI/UX design', x: 774, y: 235, bg: '#363636', color: 'white', border: true },
    { label: 'Social media', x: 787, y: 63, bg: '#6BD5D4', color: 'black' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{
        width: 1100,
        padding: 60,
        background: '#363636',
        borderRadius: 19,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        position: 'relative'
      }}>
        <div style={{ position: 'relative', height: 330 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 40,
              left: '5%',
              transform: 'translateX(-50%)',
              maxWidth: 900,
              color: 'white',
              fontSize: 100,
              fontWeight: 800,
              textAlign: 'center',
              lineHeight: '1.1',
              fontFamily: 'San Francisco Text'
            }}
          >
            One destination<br />for all your needs.
          </motion.h2>

          {items.map((item, idx) => {
            const style: CSSProperties = {
              position: 'absolute',
              left: item.x,
              top: item.y,
              transform: `rotate(${item.rotate ?? 0}deg)` + (item.center ? ' translateX(-50%)' : ''),
              background: item.bg,
              borderRadius: 1000,
              padding: '8px 17px',
              border: item.border ? '1px solid #E0D4D8' : 'none',
              color: item.color,
              fontSize: 14,
              fontFamily: 'San Francisco Text',
              fontWeight: 600,
              lineHeight: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap'
            };

            return (
              <motion.div
                key={idx}
                whileHover={{
                  scale: 1.1,
                  rotate: (item.rotate ?? 0) + 2,
                  boxShadow: '0px 4px 20px rgba(255, 255, 255, 0.2)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={style}
              >
                {item.label}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
