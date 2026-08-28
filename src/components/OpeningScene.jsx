import { useState } from 'react';
import { motion } from 'framer-motion';

const OpeningScene = ({ onNext }) => {
  const [stage, setStage] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const handleStart = () => {
    if (stage === 0) {
      setStage(1);
      setTimeout(() => setStage(2), 2500);
      setTimeout(() => setStage(3), 5000);
      setTimeout(() => setShowButton(true), 7500);
    } else if (showButton) {
      onNext();
    }
  };

  return (
    <motion.div
      className="chapter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: 'radial-gradient(circle at center, rgba(26, 26, 46, 0.8) 0%, rgba(10, 10, 18, 1) 70%)'
      }}
    >
      <div className="content-layer">
        <div style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
          
          {/* Initial glow point */}
          {stage === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 1), rgba(255, 215, 0, 0))',
                boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 215, 0, 0.4)',
                position: 'absolute',
              }}
            />
          )}

          {/* First text */}
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="elegant-text large"
              style={{ marginBottom: '1rem' }}
            >
              Qandeel…
            </motion.div>
          )}

          {/* Second text */}
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="elegant-text"
              style={{ marginBottom: '2rem' }}
            >
              Shafee ki Qandeel…
            </motion.div>
          )}

          {/* Magical portal/object */}
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              style={{ position: 'relative', margin: '3rem 0' }}
            >
              <motion.div
                className="floating-object"
                style={{
                  width: 'clamp(120px, 30vw, 180px)',
                  height: 'clamp(120px, 30vw, 180px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.4), rgba(255, 145, 215, 0.3), rgba(109, 213, 250, 0.2))',
                  border: '3px solid rgba(255, 215, 0, 0.5)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 60px rgba(255, 215, 0, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                  position: 'relative'
                }}
              >
                {/* Inner glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6), transparent)',
                  }}
                />

                {/* Orbiting particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 8 + i,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100%',
                      height: '100%',
                      transformOrigin: '0 0'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'rgba(255, 215, 0, 0.8)',
                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)'
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Mysterious text */}
          {stage >= 3 && !showButton && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="elegant-text small"
              style={{ 
                maxWidth: '90%',
                lineHeight: 1.8,
                marginTop: '1rem'
              }}
            >
              Aap ke liye kuch khaas banaya gaya hai…
            </motion.div>
          )}

          {/* Button */}
          {showButton && (
            <motion.button
              className="romantic-button safe-margin-bottom"
              onClick={handleStart}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Isay kholain?</span>
            </motion.button>
          )}

          {/* Initial touch prompt */}
          {stage === 0 && (
            <motion.button
              className="romantic-button"
              onClick={handleStart}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Shuru karein</span>
            </motion.button>
          )}

        </div>
      </div>
    </motion.div>
  );
};

export default OpeningScene;
