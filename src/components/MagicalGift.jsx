import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagicalGift = ({ onNext }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleOpen = () => {
    if (!isOpened) {
      setIsOpened(true);
      setTimeout(() => setShowMessage(true), 1500);
      setTimeout(() => setShowButton(true), 3500);
    }
  };

  return (
    <motion.div
      className="chapter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="content-layer">
        <div style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '20px' }}>
          
          {!isOpened && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="elegant-text small"
              style={{ marginBottom: '2rem' }}
            >
              Aap ke liye kuch khaas…
            </motion.div>
          )}

          {/* Gift Box */}
          <motion.div
            className="gift-box"
            onClick={handleOpen}
            style={{ 
              cursor: isOpened ? 'default' : 'pointer',
              position: 'relative',
              marginBottom: '2rem'
            }}
            whileHover={!isOpened ? { scale: 1.05, rotate: 5 } : {}}
            whileTap={!isOpened ? { scale: 0.95 } : {}}
          >
            {/* Gift Base */}
            <motion.div
              className="gift-base"
              animate={isOpened ? {
                opacity: 0,
                scale: 0.8,
                y: 20
              } : {}}
              transition={{ duration: 0.6 }}
            />

            {/* Gift Lid */}
            <motion.div
              className="gift-lid"
              animate={isOpened ? {
                y: -100,
                rotateX: -45,
                opacity: 0
              } : {}}
              transition={{ duration: 0.8, type: 'spring' }}
            />

            {/* Ribbon */}
            <motion.div
              className="gift-ribbon"
              animate={isOpened ? { opacity: 0 } : {}}
              transition={{ duration: 0.4 }}
            />

            {/* Bow */}
            <motion.div
              className="gift-bow"
              animate={isOpened ? {
                scale: 0,
                y: -100
              } : {
                scale: [1, 1.1, 1]
              }}
              transition={isOpened ? {
                duration: 0.6
              } : {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Particles when opened */}
            <AnimatePresence>
              {isOpened && (
                <>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 1,
                        scale: 0,
                        x: 0,
                        y: 0
                      }}
                      animate={{
                        opacity: 0,
                        scale: 1,
                        x: (Math.cos(i * 18 * Math.PI / 180) * 100),
                        y: (Math.sin(i * 18 * Math.PI / 180) * 100)
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: `hsl(${Math.random() * 60 + 340}, 100%, 70%)`,
                        boxShadow: '0 0 10px currentColor',
                        pointerEvents: 'none'
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {!isOpened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="elegant-text small"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}
            >
              Isay touch karein…
            </motion.div>
          )}

          {/* Message after opening */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, type: 'spring' }}
                style={{
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2), transparent)',
                  padding: '30px',
                  borderRadius: '20px',
                  border: '2px solid rgba(255, 215, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  maxWidth: '90%'
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="elegant-text"
                  style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', marginBottom: '1rem' }}
                >
                  Yeh sab aap ke liye
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="elegant-text small"
                >
                  Kyun ke aap iske laayaq hain
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

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
              <span>Chalain aagay</span>
            </motion.button>
          )}

        </div>
      </div>
    </motion.div>
  );
};

export default MagicalGift;
