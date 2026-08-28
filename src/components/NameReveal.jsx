import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NameReveal = ({ onNext }) => {
  const [showName, setShowName] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowName(true), 500);
    setTimeout(() => setShowSubtitle(true), 2500);
    setTimeout(() => setShowMessage(true), 4500);
    setTimeout(() => setShowButton(true), 6500);
  }, []);

  const name = "QANDEEL";

  return (
    <motion.div
      className="chapter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="content-layer">
        <div style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
          
          {/* Animated name particles */}
          {showName && (
            <div style={{ position: 'relative', height: 'clamp(150px, 20vh, 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              {name.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    y: -100, 
                    scale: 0,
                    rotateX: -180
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotateX: 0
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    type: 'spring',
                    stiffness: 100
                  }}
                  style={{
                    display: 'inline-block',
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    fontWeight: '300',
                    letterSpacing: '0.1em',
                    background: 'linear-gradient(135deg, #ffd700, #ffed4e, #ffd700)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(255, 215, 0, 0.4)',
                    filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  {letter}
                </motion.span>
              ))}

              {/* Sparkle effects around name */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, (Math.cos(i * 30 * Math.PI / 180) * 80)],
                    y: [0, (Math.sin(i * 30 * Math.PI / 180) * 80)]
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.5 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'rgba(255, 215, 0, 0.8)',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                    top: '50%',
                    left: '50%',
                  }}
                />
              ))}
            </div>
          )}

          {/* Subtitle */}
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="elegant-text"
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                marginTop: '1rem'
              }}
            >
              Shafee ki Qandeel
            </motion.div>
          )}

          {/* Message */}
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="elegant-text small"
              style={{
                maxWidth: '85%',
                lineHeight: 1.9,
                marginTop: '1.5rem'
              }}
            >
              Yeh naam sirf aik lafz nahi…
              <br />
              <br />
              Yeh woh roshni hai jo Shafeeq ki zindagi mein chamak laati hai.
            </motion.div>
          )}

          {/* Next button */}
          {showButton && (
            <motion.button
              className="romantic-button safe-margin-bottom"
              onClick={onNext}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Aagay chalain</span>
            </motion.button>
          )}

        </div>
      </div>
    </motion.div>
  );
};

export default NameReveal;
