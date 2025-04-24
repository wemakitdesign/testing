import React, { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

interface PricingPlan {
  tier: string;
  price: string;
  description: string;
  features: string[];
  variant: 'light' | 'dark';
  recommended?: boolean;
}

const PricingSection: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll otomatis jika flag scrollToPricing dikirim dari halaman lain
  useEffect(() => {
    const state = location.state as { scrollToPricing?: boolean } | null;
    if (state?.scrollToPricing) {
      const el = document.getElementById('pricing-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const pricingPlans: PricingPlan[] = [
    {
      tier: 'Basic',
      price: '$399/m',
      description: 'One request at a time. Pause or cancel anytime.',
      features: [
        'One request at a time',
        'Average 48 hour delivery',
        'Unlimited brands',
        'Unlimited users',
        'Unlimited stock photos',
        'Pause or cancel anytime',
      ],
      variant: 'light',
    },
    {
      tier: 'Pro',
      price: '$799/m',
      description: 'Double request at a time. Pause or cancel anytime.',
      features: [
        'Two requests at a time',
        'Average 48 hour delivery',
        'Unlimited brands',
        'Unlimited users',
        'Unlimited stock photos',
        'Pause or cancel anytime',
      ],
      variant: 'dark',
      recommended: true,
    },
    {
      tier: 'Agency',
      price: 'Call for the price',
      description: 'Want to collaborate outside the package according to your need?',
      features: [
        'Unlimited users',
        'Unlimited stock photos',
        'Pause or cancel anytime',
        'Custom workflow solutions',
        'Dedicated support',
        'Enterprise-grade services',
      ],
      variant: 'light',
    },
  ];

  const handleSelectPlan = (tier: string) => {
    if (tier === 'Agency') {
      navigate('/book-a-call'); // ⬅️ route ke Book a Call
    } else {
      navigate(`/create-account?plan=${tier.toLowerCase()}`);
    }
  };
  

  return (
    <section id="pricing-section" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            <span style={styles.italic}>Subscription</span>
            <span style={styles.titleRegular}> plan</span>
          </h2>
          <p style={styles.subtitle}>Choose a plan that's fit for you.</p>
        </div>

        <div style={styles.pricingGrid}>
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.tier}
              className={`pricingCard ${plan.variant === 'dark' ? 'darkCard' : 'lightCard'} ${plan.recommended ? 'recommendedCard' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              style={styles.pricingCard}
            >
              <h3 style={styles.planTitle}>{plan.tier}</h3>
              <p style={styles.planDescription}>{plan.description}</p>
              <div style={styles.price}>{plan.price}</div>
              <div style={styles.features}>
                <p style={styles.featuresTitle}>What's included:</p>
                {plan.features.map(feature => (
                  <div key={feature} style={styles.featureItem}>
                    {feature}
                  </div>
                ))}
              </div>

              <div style={styles.buttonWrapper}>
                <button
                  onClick={() => handleSelectPlan(plan.tier)}
                  className={`cta-button ${plan.tier === 'Pro' ? 'filled' : 'outline'}`}
                  style={styles.ctaButton}
                >
                  {plan.tier === 'Agency' ? 'Book a call' : 'Get started'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Style constants (masih sama seperti sebelumnya)
const colors = {
  primary: '#000000',
  secondary: '#FFFFFF',
  accent: '#E7E8E9',
  darkBg: '#000000',
  textDark: '#000000',
  textLight: '#FFFFFF',
  grey: '#99948F',
};

const typography = {
  title: '58px',
  subtitle: '24px',
  price: '38px',
  body: '15px',
  small: '12px',
  button: '23px',
};

const spacing = {
  sectionPadding: '60px',
  cardPadding: '40px',
  gridGap: '30px',
  elementGap: '20px',
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: colors.secondary,
    padding: spacing.sectionPadding,
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '80px',
  },
  title: {
    fontSize: typography.title,
    marginBottom: '20px',
    fontFamily: '"San Francisco Display", sans-serif',
  },
  italic: {
    fontFamily: '"Behind The Nineties", sans-serif',
    fontStyle: 'italic',
    fontWeight: 400,
  },
  titleRegular: {
    fontWeight: 700,
  },
  subtitle: {
    fontSize: typography.subtitle,
    color: colors.textDark,
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: '"San Francisco Display", sans-serif',
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: spacing.gridGap,
    justifyContent: 'center',
  },
  pricingCard: {
    padding: spacing.cardPadding,
    borderRadius: '16px',
    transition: 'transform 0.3s ease',
  },
  planTitle: {
    fontSize: '31px',
    fontWeight: 700,
    marginBottom: '20px',
    fontFamily: '"San Francisco Display", sans-serif',
  },
  planDescription: {
    fontSize: typography.body,
    marginBottom: '40px',
    lineHeight: 1.5,
    fontFamily: '"San Francisco Display", sans-serif',
    color: colors.grey,
  },
  price: {
    fontSize: typography.price,
    fontWeight: 900,
    marginBottom: '40px',
    fontFamily: '"San Francisco Display", sans-serif',
  },
  features: {
    marginBottom: '40px',
  },
  featuresTitle: {
    fontSize: typography.body,
    marginBottom: '20px',
    fontWeight: 700,
    fontFamily: '"San Francisco Display", sans-serif',
  },
  featureItem: {
    fontSize: typography.body,
    lineHeight: '29px',
    marginBottom: '10px',
    fontFamily: '"San Francisco Display", sans-serif',
    color: colors.grey,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  ctaButton: {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    fontSize: typography.button,
    fontFamily: '"San Francisco Display", sans-serif',
    transition: 'all 0.3s ease',
  },
  filledButton: {
    backgroundColor: colors.primary,
    color: colors.textLight,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    border: `1px solid ${colors.accent}`,
    color: colors.grey,
  },
};

export default PricingSection;
