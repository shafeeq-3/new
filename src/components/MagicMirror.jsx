import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagicMirror = ({ onNext }) => {
  const [touched, setTouched] = useState(false);
  const [stage, setStage] = useState(0);

  const handleTouch = () => {
    if (!touched) {
      setTouched(true);
      setTimeout(() => setStage(1), 1500);
      setTimeout(() => setStage(2), 4000);
      setTimeout(() => setStage(3), 6500);
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
        background: touched
          ? 'radial-gradient(ellipse at center, rgba(60, 50, 80, 0.7) 0%, rgba(10, 10, 18, 1) 70%)'
          : 'radial-gradient(circle at center, rgba(30, 25, 45, 0.8) 0%, rgba(10, 10, 18, 1) 70%)'
      }}
    >
      <div className="content-layer">
        <div style={{ 
          textAlign: 'center', 
          minHeight: '70vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '20px'
        }}>
          
          {!touched && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="elegant-text small"
              style={{ marginBottom: '2rem' }}
            >
              Ek jadui aaina…
            </motion.div>
          )}

          {/* Magic Mirror */}
          <motion.div
            onClick={handleTouch}
            whileHover={!touched ? { scale: 1.05 } : {}}
            whileTap={!touched ? { scale: 0.98 } : {}}
            animate={touched ? {
              boxShadow: [
                '0 0 30px rgba(255, 215, 0, 0.4)',
                '0 0 60px rgba(255, 215, 0, 0.7)',
                '0 0 30px rgba(255, 215, 0, 0.4)'
              ]
            } : {}}
            transition={touched ? {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            } : {}}
            style={{
              position: 'relative',
              width: 'clamp(250px, 60vw, 350px)',
              height: 'clamp(350px, 70vw, 450px)',
              background: touched
                ? 'linear-gradient(135deg, rgba(100, 80, 120, 0.4), rgba(80, 60, 100, 0.3))'
                : 'linear-gradient(135deg, rgba(40, 30, 60, 0.6), rgba(30, 20, 50, 0.5))',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              border: `3px solid ${touched ? 'rgba(255, 215, 0, 0.6)' : 'rgba(150, 150, 150, 0.4)'}`,
              backdropFilter: 'blur(10px)',
              cursor: !touched ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              transition: 'all 0.5s ease',
              margin: '2rem 0'
            }}
          >
            {/* Mirror frame decoration */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              border: `2px solid ${touched ? 'rgba(255, 215, 0, 0.3)' : 'transparent'}`,
              pointerEvents: 'none'
            }} />

            {/* Mirror reflection surface */}
            <div style={{
              width: '85%',
              height: '85%',
              background: touched
                ? 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1), transparent 70%)'
                : 'radial-gradient(ellipse at center, rgba(100, 100, 100, 0.2), transparent 70%)',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px',
              transition: 'all 0.5s ease'
            }}>
              
              <AnimatePresence>
                {!touched && (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="elegant-text small"
                    style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                  >
                    Isay chhuo…
                  </motion.div>
                )}

                {touched && stage === 1 && (
                  <motion.div
                    key="text1"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 1.5 }}
                    className="elegant-text small"
                    style={{
                      maxWidth: '90%',
                      lineHeight: 1.8,
                      textAlign: 'center'
                    }}
                  >
                    Is duniya ki khoobsurti dekhni ho…
                  </motion.div>
                )}

                {stage === 2 && (
                  <motion.div
                    key="text2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 1.5 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1.5rem'
                    }}
                  >
                    <div className="elegant-text small" style={{ maxWidth: '90%', lineHeight: 1.8, textAlign: 'center' }}>
                      Is duniya ki khoobsurti dekhni ho…
                    </div>
                    <div className="elegant-text small" style={{ maxWidth: '90%', lineHeight: 1.8, textAlign: 'center' }}>
                      toh sheeshe mein bhi ek naam kaafi hai.
                    </div>
                  </motion.div>
                )}

                {stage >= 3 && (
                  <motion.div
                    key="final"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, type: 'spring' }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1.5rem',
                      width: '100%'
                    }}
                  >
                    <div className="elegant-text small" style={{ maxWidth: '90%', lineHeight: 1.8, textAlign: 'center' }}>
                      Is duniya ki khoobsurti dekhni ho…
                    </div>
                    <div className="elegant-text small" style={{ maxWidth: '90%', lineHeight: 1.8, textAlign: 'center' }}>
                      toh sheeshe mein bhi ek naam kaafi hai.
                    </div>
                    <div
                      className="elegant-text large"
                      style={{
                        marginTop: '1rem',
                        fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                        background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      QAANDEEL
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sparkles around mirror when active */}
              {touched && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: 360
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: 'easeInOut'
                      }}
                      style={{
                        position: 'absolute',
                        top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 40}%`,
                        left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 40}%`,
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)'
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </motion.div>

          {/* Next button */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.button
                className="romantic-button safe-margin-bottom"
                onClick={onNext}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ marginTop: '2rem' }}
              >
                <span>Aagay chalain</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Skip button */}
          {touched && stage < 3 && (
            <motion.button
              className="romantic-button"
              onClick={() => setStage(3)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: '2rem',
                background: 'rgba(255, 215, 0, 0.15)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                padding: '12px 30px',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
              }}
            >
              <span>Skip karein</span>
            </motion.button>
          )}

        </div>
      </div>
    </motion.div>
  );
};

export default MagicMirror;
