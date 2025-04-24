import React, { FC, useRef, CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';

// Style constants
const colors = {
  white: '#FFFFFF',
};

const typography = {
  heading: '65px',
  subHeading: '56px',
  cardTitle: '24px',
  cardText: '16px',
};

const styles: Record<string, CSSProperties> = {
  section: {
    maxWidth: '1200px',
    margin: '100px auto 0',
    padding: '0 20px',
  },
  headingWrapper: {
    textAlign: 'center',
    marginBottom: '55px',
  },
  italicHeading: {
    fontFamily: "'Behind The Nineties', sans-serif",
    fontStyle: 'italic',
    fontSize: typography.heading,
    lineHeight: '65px',
    display: 'block',
  },
  subHeading: {
    fontFamily: 'Inter, sans-serif',
    fontSize: typography.subHeading,
    fontWeight: 500,
    lineHeight: '65px',
    display: 'block',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    flexWrap: 'wrap',
    padding: '20px',
  },
  card: {
    width: '352px',
    height: '440px',
    borderRadius: '32px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'transform 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  animatedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: '200% 200%',
    backgroundPosition: '0% 50%',
    backgroundRepeat: 'no-repeat',
    animation: 'cardGradientMove 10s ease infinite',
    zIndex: 1,
    pointerEvents: 'none',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '32px',
    color: colors.white,
    zIndex: 2,
  },
  cardTitle: {
    fontSize: typography.cardTitle,
    fontWeight: 500,
    marginBottom: '12px',
  },
  cardDescription: {
    fontSize: typography.cardText,
    fontWeight: 400,
    lineHeight: '20px',
    opacity: 0.8,
  },
};

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// WorkCard component
interface WorkCardProps {
  bgImage: string;
  gradientImage: string;
  title: string;
  description: string;
}

const WorkCard: FC<WorkCardProps> = ({ bgImage, gradientImage, title, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={cardInView ? 'visible' : 'hidden'}
      variants={itemVariants}
      style={styles.card}
    >
      <img src={bgImage} alt="" style={styles.cardImage} />
      <div
        style={{
          ...styles.animatedOverlay,
          backgroundImage: `url(${gradientImage})`,
        }}
      />
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardDescription}>{description}</p>
      </div>
    </motion.div>
  );
};

const HowWeWork: FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLDivElement>}
      style={styles.section}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <style>
        {`
          @keyframes cardGradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <motion.div variants={itemVariants} style={styles.headingWrapper}>
        <span style={styles.italicHeading}>The right way</span>
        <br />
        <span style={styles.subHeading}>to do design, from day one</span>
      </motion.div>

      <motion.div style={styles.cardsContainer} variants={containerVariants}>
        <WorkCard
          bgImage="/images/work-1.jpg"
          gradientImage="/images/work-1.jpg"
          title="1. Join Subscription"
          description="Subscribe and request unlimited designs."
        />
        <WorkCard
          bgImage="/images/work-2.jpg"
          gradientImage="/images/work-2.jpg"
          title="2. Create Request"
          description="Request any design, from digital to print."
        />
        <WorkCard
          bgImage="/images/work-3.jpg"
          gradientImage="/images/work-3.jpg"
          title="3. Delivered"
          description="Your design, ready in just two business days."
        />
      </motion.div>
    </motion.section>
  );
};

export default HowWeWork;
