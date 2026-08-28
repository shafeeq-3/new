import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveLetter = ({ onNext }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  return (
    <motion.div
      className="chapter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        overflowY: isOpened ? 'auto' : 'hidden',
        overflowX: 'hidden'
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
          padding: '20px',
          paddingBottom: 'calc(20px + env(safe-area-inset-bottom))'
        }}>
          
          {!isOpened && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="elegant-text"
                style={{ marginBottom: '3rem' }}
              >
                Aap ke liye…
              </motion.div>

              {/* Envelope */}
              <motion.div
                className="floating-object"
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  width: 'clamp(200px, 50vw, 300px)',
                  height: 'clamp(140px, 35vw, 210px)',
                  cursor: 'pointer',
                  marginBottom: '2rem'
                }}
              >
                {/* Envelope body */}
                <motion.div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255, 250, 240, 0.3), rgba(255, 245, 230, 0.2))',
                    border: '2px solid rgba(255, 215, 0, 0.4)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Envelope flap lines */}
                  <svg
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none'
                    }}
                    viewBox="0 0 300 210"
                  >
                    <line x1="0" y1="0" x2="150" y2="80" stroke="rgba(255, 215, 0, 0.3)" strokeWidth="2" />
                    <line x1="300" y1="0" x2="150" y2="80" stroke="rgba(255, 215, 0, 0.3)" strokeWidth="2" />
                  </svg>

                  {/* Seal */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '25%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 'clamp(35px, 10vw, 50px)',
                      height: 'clamp(35px, 10vw, 50px)',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6), rgba(255, 145, 215, 0.4))',
                      border: '2px solid rgba(255, 215, 0, 0.8)',
                      boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                      fontFamily: 'Georgia, serif',
                      color: 'white'
                    }}
                  >
                    Q
                  </motion.div>
                </motion.div>

                {/* Glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    right: '-20px',
                    bottom: '-20px',
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2), transparent)',
                    borderRadius: '16px',
                    zIndex: -1,
                    pointerEvents: 'none'
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="elegant-text small"
                style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}
              >
                Isay kholain…
              </motion.div>
            </>
          )}

          {/* The Letter */}
          <AnimatePresence>
            {isOpened && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, type: 'spring' }}
                className="letter-paper"
                style={{
                  marginTop: '2rem',
                  marginBottom: 'calc(2rem + env(safe-area-inset-bottom))'
                }}
              >
                <div className="letter-content">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    Meri pyaari Qandeel,
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    Kuch alfaaz sirf likhne ke liye nahi hote, balki dil se mehsoos karne ke liye hote hain. Aaj main aap ko yeh batana chahta hoon ke aap mere liye kitne khaas hain.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  >
                    Duniya mein bohot log milte hain, lekin kuch log aise hote hain jin se mil kar lagta hai ke zindagi ki talash khatam ho gayi. Aap waise hi hain. Aap sirf khubsurat nahi hain — aap ki khoobsurti aap ke dil mein hai, aap ke ikhlaq mein hai, aur aap ke wujood mein hai.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  >
                    Aap ko kisi se compare karne ki zaroorat nahi, kyun ke aap jaisi koi nahi. Aap Shafeeq ki Qandeel hain, Shafeeq ki Jaan hain, Shafeeq ka Sukoon hain. Aap meri zindagi ki woh roshni hain jo andheray mein bhi chamakti rehti hai.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.8 }}
                  >
                    Main chahta hoon ke aap hamesha khush rahain, hamesha muskurati rahain, aur hamesha yeh mehsoos karain ke aap bohot qeemti hain. Aap ki khushi mere liye sab se bara tohfa hai.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                  >
                    Aap ko dekh kar, aap ki baatain sun kar, aur aap ke saath waqt guzaar kar zindagi ki asli qeemat samajh aati hai.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.3, duration: 0.8 }}
                    style={{ marginTop: '1.5rem' }}
                  >
                    Aap mere dil ki dhadkan hain, meri zindagi ka maqsad hain.
                  </motion.p>

                  <motion.div
                    className="letter-signature"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.6, duration: 0.8 }}
                  >
                    Hamesha aap ka,
                    <br />
                    Shafeeq ❤️
                  </motion.div>
                </div>

                <motion.button
                  className="romantic-button"
                  onClick={onNext}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', delay: 3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    marginTop: '2rem',
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 145, 215, 0.3))',
                    border: '2px solid rgba(139, 69, 19, 0.6)',
                    color: '#2c2c2c'
                  }}
                >
                  <span>Aagay</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
};

export default LoveLetter;
