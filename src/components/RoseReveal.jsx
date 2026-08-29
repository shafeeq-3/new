import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const petals = [
  { id: 0, label: 'Jaan', angle: 0 },
  { id: 1, label: 'Sukoon', angle: 45 },
  { id: 2, label: 'Mohabbat', angle: 90 },
  { id: 3, label: 'Zindagi', angle: 135 },
  { id: 4, label: 'Haseena', angle: 180 },
  { id: 5, label: 'Baby', angle: 225 },
  { id: 6, label: 'Qandeel', angle: 270 },
  { id: 7, label: 'Khushi', angle: 315 }
];

const RoseReveal = ({ onNext }) => {
  const [touchedRose, setTouchedRose] = useState(false);
  const [openedPetals, setOpenedPetals] = useState([]);
  const [showCenter, setShowCenter] = useState(false);
  const [explode, setExplode] = useState(false);

  const handleRoseTouch = () => {
    if (!touchedRose) {
      setTouchedRose(true);
      // Open petals one by one
      petals.forEach((petal, index) => {
        setTimeout(() => {
          setOpenedPetals(prev => [...prev, petal.id]);
          if (index === petals.length - 1) {
            setTimeout(() => setShowCenter(true), 500);
            setTimeout(() => setExplode(true), 2000);
          }
        }, index * 400);
      });
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
        background: explode
          ? 'radial-gradient(ellipse at center, rgba(80, 40, 70, 0.8) 0%, rgba(10, 10, 18, 1) 70%)'
          : 'radial-gradient(circle at center, rgba(40, 30, 50, 0.7) 0%, rgba(10, 10, 18, 1) 70%)'
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
          
          {!touchedRose && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="elegant-text small"
              style={{ marginBottom: '2rem' }}
            >
              Ek phool hai… jo kuch kehna chahta hai
            </motion.div>
          )}

          {/* Rose Container */}
          <div style={{
            position: 'relative',
            width: 'clamp(200px, 50vw, 300px)',
            height: 'clamp(200px, 50vw, 300px)',
            margin: '2rem 0'
          }}>
            {/* Petals */}
            {petals.map((petal) => {
              const isOpened = openedPetals.includes(petal.id);
              const distance = isOpened ? 80 : 0;
              const x = Math.cos((petal.angle * Math.PI) / 180) * distance;
              const y = Math.sin((petal.angle * Math.PI) / 180) * distance;

              return (
                <motion.div
                  key={petal.id}
                  animate={{
                    x,
                    y,
                    rotate: isOpened ? petal.angle + 45 : petal.angle,
                    scale: isOpened ? 1.2 : 1
                  }}
                  transition={{
                    duration: 0.8,
                    type: 'spring',
                    stiffness: 100
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    transformOrigin: 'center'
                  }}
                >
                  <svg width="60" height="80" viewBox="0 0 60 80">
                    <ellipse
                      cx="30"
                      cy="40"
                      rx="20"
                      ry="35"
                      fill={`hsl(${320 + petal.id * 5}, 100%, 70%)`}
                      opacity="0.9"
                      style={{
                        filter: isOpened 
                          ? 'drop-shadow(0 0 15px rgba(255, 145, 215, 0.8))'
                          : 'drop-shadow(0 0 8px rgba(255, 145, 215, 0.5))'
                      }}
                    />
                  </svg>

                  {/* Label when opened */}
                  <AnimatePresence>
                    {isOpened && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                          color: '#fff',
                          fontFamily: 'Georgia, serif',
                          textShadow: '0 0 10px rgba(255, 145, 215, 0.8)',
                          whiteSpace: 'nowrap',
                          fontWeight: '500'
                        }}
                      >
                        {petal.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Center - clickable rose before opening */}
            {!touchedRose && (
              <motion.div
                onClick={handleRoseTouch}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'clamp(80px, 20vw, 120px)',
                  height: 'clamp(80px, 20vw, 120px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 145, 215, 0.6), rgba(255, 91, 177, 0.4))',
                  border: '3px solid rgba(255, 145, 215, 0.8)',
                  boxShadow: '0 0 30px rgba(255, 145, 215, 0.6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <path
                    d="M25,10 Q30,5 35,10 Q40,15 35,25 L25,40 L15,25 Q10,15 15,10 Q20,5 25,10"
                    fill="rgba(255, 145, 215, 0.8)"
                    stroke="#fff"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
            )}

            {/* Center message after all petals open */}
            <AnimatePresence>
              {showCenter && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, type: 'spring' }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    fontFamily: 'Georgia, serif',
                    color: '#ffd700',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
                    fontWeight: '300',
                    zIndex: 20
                  }}
                >
                  Meri
                </motion.div>
              )}
            </AnimatePresence>

            {/* Explosion particles */}
            <AnimatePresence>
              {explode && (
                <>
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: 0,
                        scale: 1,
                        x: (Math.cos(i * 12 * Math.PI / 180) * 150),
                        y: (Math.sin(i * 12 * Math.PI / 180) * 150)
                      }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '8px',
                        height: '8px',
                        background: `hsl(${Math.random() * 60 + 320}, 100%, 70%)`,
                        borderRadius: '50%',
                        boxShadow: '0 0 10px currentColor',
                        pointerEvents: 'none'
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Final message */}
          <AnimatePresence>
            {explode && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                style={{ textAlign: 'center', marginTop: '2rem' }}
              >
                <div className="elegant-text" style={{ marginBottom: '2rem' }}>
                  Har pankhuRi aap ki ek khoobsurti hai
                </div>

                <motion.button
                  className="romantic-button safe-margin-bottom"
                  onClick={onNext}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', delay: 1.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Aagay chalain</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip button for those who don't want to wait */}
          {touchedRose && !explode && (
            <motion.button
              className="romantic-button"
              onClick={() => setExplode(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
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

export default RoseReveal;
