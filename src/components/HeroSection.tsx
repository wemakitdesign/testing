import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fontStyles = `
  @font-face {
    font-family: 'Behind The Nineties';
    src: url('/fonts/BehindTheNinetiesItalic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
  }

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes floatY {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @media (max-width: 768px) {
    .hero-wrapper {
      flex-direction: column;
      gap: 40px;
    }
    .hero-heading {
      font-size: 48px !important;
      line-height: 56px !important;
      margin-bottom: 30px !important;
    }
    .hero-subheading {
      font-size: 16px !important;
    }
    .hero-card {
      width: 100% !important;
      max-width: 400px;
    }
    .floating-images img {
      width: 150px !important;
    }
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleSeePricing = () => {
    navigate("/", { state: { scrollToPricing: true } });
  };

  return (
    <div style={styles.container}>
      <style>{fontStyles}</style>
      <div className="hero-wrapper" style={styles.contentWrapper}>
        <div style={styles.textContent}>
          <h1 className="hero-heading" style={styles.heading}>
            Design<br />
            made easy for <span style={styles.italic}>everyone</span>
          </h1>
          <p className="hero-subheading" style={styles.subheading}>
            Stop and go whenever you want
          </p>
        </div>

        <div style={styles.imageCardWrapper}>
          <div className="hero-card" style={styles.imageCard}>
            <div style={styles.gradientBackground} />
            <div style={styles.cardContent}>
              <h2 style={styles.cardHeading}>Join</h2>
              <h1 style={styles.cardBrand}>wemakit</h1>
              <p style={styles.cardText}>All you need, in one subscription</p>
              <button
                style={{
                  ...styles.ctaButton,
                  ...(isHovered ? styles.ctaButtonHover : {}),
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleSeePricing}
              >
                See pricing
              </button>
            </div>
          </div>

          <div className="floating-images" style={styles.floatingImages}>
            <img
              src="/images/hero3.png"
              alt="Work 1"
              style={{
                ...styles.workImage,
                width: "250px",
                top: "-20px",
                right: "-40px",
                animationDelay: "0s",
              }}
            />
            <img
              src="/images/hero2.png"
              alt="Work 2"
              style={{
                ...styles.workImage,
                width: "200px",
                top: "140px",
                right: "50px",
                animationDelay: "0.5s",
              }}
            />
            <img
              src="/images/hero1.png"
              alt="Work 3"
              style={{
                ...styles.workImage,
                width: "250px",
                top: "0px",
                right: "220px",
                animationDelay: "1s",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: "25px",
    marginBottom: "100px",
  },
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    gap: "84px",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    position: "relative",
    flexWrap: "wrap",
  },
  textContent: {
    flex: 1,
    maxWidth: "483px",
  },
  heading: {
    color: "#000",
    fontSize: "82px",
    fontWeight: 500,
    lineHeight: "90px",
    marginBottom: "61px",
    textAlign: "left",
  },
  italic: {
    fontFamily: "'Behind The Nineties', sans-serif",
    fontStyle: "italic",
  },
  subheading: {
    color: "#99948F",
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: 400,
    textAlign: "left",
  },
  imageCardWrapper: {
    position: "relative",
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  imageCard: {
    position: "relative",
    height: "485px",
    width: "400px",
    borderRadius: "32px",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('/images/hero-gradient.png')",
    backgroundSize: "200% 200%",
    backgroundPosition: "0% 50%",
    backgroundRepeat: "no-repeat",
    animation: "gradientMove 10s ease infinite",
    zIndex: 1,
  },
  cardContent: {
    position: "relative",
    color: "#fff",
    maxWidth: "386px",
    textAlign: "left",
    zIndex: 2,
    padding: "0 30px 30px",
  },
  cardHeading: {
    fontSize: "60px",
    lineHeight: "60px",
    margin: 0,
  },
  cardBrand: {
    fontSize: "60px",
    lineHeight: "56px",
    fontWeight: 700,
    margin: "10px 0 20px",
  },
  cardText: {
    fontSize: "19px",
    lineHeight: "21px",
    marginBottom: "30px",
  },
  ctaButton: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "15px 40px",
    borderRadius: "10px",
    fontSize: "24px",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  ctaButtonHover: {
    backgroundColor: "#000",
    color: "#fff",
  },
  floatingImages: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 3,
  },
  workImage: {
    position: "absolute",
    height: "auto",
    borderRadius: "4px",
    animation: "floatY 6s ease-in-out infinite",
    transition: "transform 0.3s ease",
  },
};

export default HeroSection;
