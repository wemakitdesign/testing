import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const WhoWeAre = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      title: 'Simple platform',
      description: 'Manage your request & communicate with your designer use our platform',
      img: '/images/features/feature-platform.png',
      img2x: '/images/features/feature-platform@2x.png',
    },
    {
      title: 'Fixed monthly rate',
      description: 'Unlimited requests & revisions, same price.',
      img: '/images/features/feature-pricing.png',
      img2x: '/images/features/feature-pricing@2x.png',
    },
    {
      title: 'Flexible & scalable',
      description: 'Easily manage your design queue with a Trello board.',
      img: '/images/features/feature-scalable.png',
      img2x: '/images/features/feature-scalable@2x.png',
    },
  ];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 40px', overflowX: 'hidden' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '120px' }}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerChildren}
          style={{ width: '100%', maxWidth: '800px', padding: '60px 5vw', borderRadius: '24px', backgroundColor: '#FFF5ED' }}
        >
          <motion.p
            style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', lineHeight: '1.6', textAlign: 'center', margin: 0, whiteSpace: 'pre-wrap' }}
          >
            <motion.span
              variants={textVariants}
              style={{ display: 'inline-block', color: '#FB810A', fontFamily: '"Behind The Nineties", sans-serif', fontStyle: 'italic' }}
            >
              Wemakit
            </motion.span>{' '}
            <motion.span variants={textVariants}>
              is an on-demand design agency based in Singapore. Unlike many others, it’s a truly designer-owned agency, backed by over 15 years of experience in the design industry. We turn your ideas into reality with{' '}
            </motion.span>
            <motion.span
              style={{ fontFamily: '"Behind The Nineties", sans-serif' }}
              variants={textVariants}
            >
              top-tier quality
            </motion.span>{' '}
            <motion.span variants={textVariants}>
              and an exceptionally{' '}
            </motion.span>
            <motion.span
              style={{ fontFamily: '"Behind The Nineties", sans-serif' }}
              variants={textVariants}
            >
              efficient
            </motion.span>{' '}
            <motion.span variants={textVariants}>
              turnaround time.
            </motion.span>
          </motion.p>
        </motion.div>

        <motion.div
          style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerChildren}
        >
          <motion.div variants={textVariants}>
            <motion.h3 style={{ fontSize: 'clamp(12px, 1vw, 14px)', textTransform: 'uppercase', textAlign: 'center', color: '#000' }}>
              BENEFITS
            </motion.h3>
          </motion.div>

          <motion.div variants={textVariants}>
            <motion.h2 style={{ fontSize: 'clamp(42px, 5vw, 61px)', textAlign: 'center', fontWeight: 500 }}>
              <motion.span variants={textVariants}>You won’t want</motion.span>
              <br />
              <motion.span
                style={{ fontStyle: 'italic', fontFamily: '"Behind The Nineties", sans-serif', color: '#FB810A' }}
                variants={textVariants}
              >
                anything
              </motion.span>
              <motion.span variants={textVariants}> else.</motion.span>
            </motion.h2>
          </motion.div>

          <motion.p
            style={{ maxWidth: '600px', textAlign: 'center', color: '#99948F', fontSize: 'clamp(16px, 1.8vw, 20px)' }}
            variants={textVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Say goodbye to unreliable freelancers and overpriced agencies—get top-quality design for a flat monthly fee
          </motion.p>
        </motion.div>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', maxWidth: '1200px', width: '100%' }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerChildren}
        >
          {features.map((feature, index) => (
  <motion.div
    key={index}
    initial="hidden"
    animate={isInView ? 'visible' : 'hidden'}
    variants={cardVariants}
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ duration: 0.4 }}
    style={{ textAlign: 'center', cursor: 'pointer' }} // tambahin cursor biar kerasa bisa dihover
  >
    <div
      style={{
        width: '200px',
        height: '200px',
        margin: '0 auto 32px',
        overflow: 'hidden',
        borderRadius: '4px 4px 90px 90px',
        backgroundColor: '#fff',
      }}
    >
      <img
        src={feature.img}
        srcSet={`${feature.img} 1x, ${feature.img2x} 2x`}
        alt={feature.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '20px' }}
        loading="lazy"
      />
    </div>
    <h3 style={{ fontSize: '22px', marginBottom: '16px', color: '#000' }}>{feature.title}</h3>
    <p style={{ fontSize: '14px', color: '#99948F', padding: '0 20px' }}>{feature.description}</p>
  </motion.div>
))}

        </motion.div>
      </div>
    </section>
  );
};
<motion.div
  whileHover={{ scale: 1.1 }}
  style={{
    width: 200,
    height: 200,
    background: 'orange',
    margin: '40px auto',
    borderRadius: '12px',
    cursor: 'pointer'
  }}
>
  Hover me
</motion.div>

export default WhoWeAre;
