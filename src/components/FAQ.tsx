import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqItems = [
    {
      question: "Is there a limit to how many requests I can have?",
      answer: "After subscribing, you can add as many design requests as you like. We’ll work on them one at a time, in the order you submit them.",
    },
    {
      question: "How fast will I receive my designs?",
      answer: "Two days is our average turnaround time. If your request is more complex, we’ll take the time needed to make it right.",
    },
    {
      question: "How does the pause feature work?",
      answer: "We understand your design needs may change from month to month. That’s why you can pause your subscription anytime. Billing works on a 31-day cycle. Use what you need, pause when you don’t — and come back with your remaining days still available.",
    },
    {
      question: "How do I request designs?",
      answer: "We have our own awesome platform where you can manage all your design requests. You can upload briefs, receive final files, and communicate directly with your designer and project manager — all in one place. We’ll walk you through how to use it once you subscribe. It’s simple and efficient!",
    },
    {
      question: "What if I don't like the design?",
      answer: "We won’t stop until you’re completely happy with the result.",
    },
    {
      question: "Is there any design work you don't cover?",
      answer: "At Wemakit, we currently don’t cover 3D modeling or full-scale animation projects. However, we’re happy to help with simple motion graphics like short GIFs. If you’re unsure whether your request fits, feel free to ask — we’re here to help.",
    },
    {
      question: "What if I only have a single request?",
      answer: "No worries — you can pause your subscription anytime and pick up where you left off when new design needs arise.",
    },
    {
      question: "Are there any refunds if I don't like the service?",
      answer: "We offer a 7-day window for refunds if things aren’t the right fit. That said, once a project is completed, we’re unable to provide a refund.",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <span style={styles.titlePart1}>Frequently Ask</span>
          <span style={styles.titlePart2}>Questions</span>
        </h1>
      </div>

      <div style={styles.faqContainer}>
        {faqItems.map((item, index) => (
          <div
            key={index}
            style={styles.faqItem}
            onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
          >
            <div style={styles.questionHeader}>
              <h3 style={styles.questionText}>{item.question}</h3>
              <div style={styles.toggleButton}>
                <ChevronDown
                  size={24}
                  color={colors.textDark}
                  style={{
                    transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>

            {expandedIndex === index && (
              <div style={styles.answerContent}>
                <p style={styles.answerText}>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Style constants
const colors = {
  primary: '#FF9416',
  secondary: '#B2B6C9',
  textDark: '#616161',
  background: '#FFFFFF',
  border: '#B2B6C9',
};

const typography = {
  title: {
    fontSize: '50px',
    lineHeight: '70px',
  },
  question: {
    fontSize: '23px',
    fontWeight: '600',
  },
  answer: {
    fontSize: '19px',
    lineHeight: '35px',
  },
};

const spacing = {
  containerPadding: '52px 193px',
  itemPadding: '31px 39px',
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '1040px', // atau 960 / 1000 px bebas
    margin: '0 auto',
    padding: spacing.containerPadding,
    background: colors.background,
    borderRadius: '18px',
  },
  
  header: {
    textAlign: 'center',
    marginBottom: '54px',
  },
  title: {
    ...typography.title,
    fontFamily: "'San Francisco Text', sans-serif",
    fontWeight: '700',
    textTransform: 'capitalize',  // Menyesuaikan dengan tipe yang diterima
  },
  titlePart1: {
    color: colors.secondary,
  },
  titlePart2: {
    color: colors.primary,
    fontFamily: "'Behind The Nineties', sans-serif",
    fontStyle: 'italic',
    fontWeight: '400',
    marginLeft: '8px',
  },
  faqContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '31px',
  },
  faqItem: {
    border: `2px solid ${colors.border}`,
    borderRadius: '8px',
    padding: spacing.itemPadding,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    ...typography.question,
    color: colors.textDark,
    fontFamily: "'San Francisco Display', sans-serif",
    margin: '0',
    flex: 1,
  },
  toggleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerContent: {
    marginTop: '20px',
  },
  answerText: {
    ...typography.answer,
    color: colors.textDark,
    fontFamily: "'San Francisco Text', sans-serif",
    fontWeight: '300',
    margin: '0',
  },
};

export default FAQSection;
