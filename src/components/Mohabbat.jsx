import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Mohabbat = ({ onNext }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 3500),
      setTimeout(() => setStage(3), 6500),
      setTimeout(() => setStage(4), 9500),
      setTimeout(() => setStage(5), 12500),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="chapter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: 'radial-gradient(ellipse at center, rgba(60, 30, 50, 0.6) 0%, rgba(10, 10, 18, 1) 70%)',
      }}
    >
      <div className="content-layer">
        <div style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '20px' }}>
          
          {/* Animated heart symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: stage >= 1 ? 1 : 0,
              scale: stage >= 1 ? 1 : 0,
            }}
            transition={{ duration: 1.5, type: 'spring' }}
            style={{
              position: 'relative',
              width: 'clamp(80px, 20vw, 120px)',
              height: 'clamp(80px, 20vw, 120px)',
              marginBottom: '2rem'
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative'
              }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{
                  width: '100%',
                  height: '100%',
                  filter: 'drop-shadow(0 0 20px rgba(255, 145, 215, 0.6))'
                }}
              >
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff91d7" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ffd700" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff91d7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M50,85 C50,85 20,60 20,40 C20,28 28,20 38,20 C44,20 50,24 50,24 C50,24 56,20 62,20 C72,20 80,28 80,40 C80,60 50,85 50,85 Z"
                  fill="url(#heartGradient)"
                  stroke="rgba(255, 215, 0, 0.6)"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>

            {/* Radiating circles */}
            {stage >= 2 && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{
                      opacity: 0,
                      scale: 2.5
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: 'easeOut'
                    }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      height: '100%',
                      border: '2px solid rgba(255, 145, 215, 0.4)',
                      borderRadius: '50%',
                      pointerEvents: 'none'
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>

          {/* Text content */}
          <div style={{ maxWidth: '90%', lineHeight: 1.9 }}>
            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text"
                style={{ 
                  fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
                  marginBottom: '2rem',
                  color: '#ffb3d9'
                }}
              >
                Shafeeq ki Mohabbat
              </motion.div>
            )}

            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text small"
                style={{ marginBottom: '1.5rem' }}
              >
                Mohabbat sirf keh dene ka naam nahi…
              </motion.div>
            )}

            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text small"
                style={{ marginBottom: '1.5rem' }}
              >
                Kabhi kabhi mohabbat woh ehsaas hoti hai…
              </motion.div>
            )}

            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text small"
                style={{ marginBottom: '2rem' }}
              >
                jo kisi ek insaan ko poori duniya se alag bana deta hai.
                <br /><br />
                Aur woh insaan… aap hain.
              </motion.div>
            )}

            {stage >= 5 && (
              <motion.button
                className="romantic-button safe-margin-bottom"
                onClick={onNext}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Aap ke liye kuch likha hai</span>
              </motion.button>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Mohabbat;
