import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const candles = [
  { id: 0, label: 'Sukoon', x: '25%', delay: 0 },
  { id: 1, label: 'Mohabbat', x: '40%', delay: 0.1 },
  { id: 2, label: 'Khushi', x: '55%', delay: 0.2 },
  { id: 3, label: 'Zindagi', x: '70%', delay: 0.3 }
];

const InteractiveCake = ({ onNext }) => {
  const [litCandles, setLitCandles] = useState(new Set());
  const [allLit, setAllLit] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (litCandles.size === candles.length && !allLit) {
      setTimeout(() => {
        setShowBurst(true);
        setAllLit(true);
      }, 500);
    }
  }, [litCandles, allLit]);

  const lightCandle = (id) => {
    if (!litCandles.has(id)) {
      setLitCandles(new Set([...litCandles, id]));
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
        background: allLit
          ? 'radial-gradient(ellipse at center, rgba(100, 70, 50, 0.6) 0%, rgba(10, 10, 18, 1) 60%)'
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
          
          {!allLit && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="elegant-text small"
                style={{ marginBottom: '2rem' }}
              >
                Har shamaa ek khushi hai… inhen roshni dein
              </motion.div>

              {/* Skip button */}
              <motion.button
                className="romantic-button"
                onClick={() => {
                  const allCandles = new Set(candles.map(c => c.id));
                  setLitCandles(allCandles);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  marginBottom: '2rem',
                  background: 'rgba(255, 215, 0, 0.15)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  padding: '12px 30px',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                }}
              >
                <span>Sab shamayein jalayein</span>
              </motion.button>
            </>
          )}

          {/* Cake */}
          <div style={{
            position: 'relative',
            width: 'clamp(250px, 60vw, 350px)',
            height: 'clamp(300px, 70vw, 400px)',
            margin: '2rem 0'
          }}>
            {/* Candles */}
            <div style={{
              position: 'absolute',
              top: '5%',
              left: 0,
              right: 0,
              height: '30%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              zIndex: 10
            }}>
              {candles.map((candle) => {
                const isLit = litCandles.has(candle.id);
                return (
                  <motion.div
                    key={candle.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: candle.delay, duration: 0.5 }}
                    style={{
                      position: 'relative',
                      cursor: isLit ? 'default' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                    onClick={() => !isLit && lightCandle(candle.id)}
                    whileHover={!isLit ? { scale: 1.1 } : {}}
                    whileTap={!isLit ? { scale: 0.95 } : {}}
                  >
                    {/* Flame */}
                    <AnimatePresence>
                      {isLit && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            y: [0, -3, 0]
                          }}
                          transition={{
                            scale: { duration: 0.3 },
                            y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                          }}
                          style={{
                            width: '20px',
                            height: '25px',
                            position: 'relative'
                          }}
                        >
                          <svg viewBox="0 0 20 25" style={{ width: '100%', height: '100%' }}>
                            <defs>
                              <radialGradient id={`flameGrad${candle.id}`}>
                                <stop offset="0%" stopColor="#fff" />
                                <stop offset="40%" stopColor="#ffed4e" />
                                <stop offset="80%" stopColor="#ff9500" />
                                <stop offset="100%" stopColor="transparent" />
                              </radialGradient>
                            </defs>
                            <ellipse
                              cx="10"
                              cy="15"
                              rx="7"
                              ry="10"
                              fill={`url(#flameGrad${candle.id})`}
                              style={{
                                filter: 'blur(1px)'
                              }}
                            />
                            <ellipse
                              cx="10"
                              cy="15"
                              rx="4"
                              ry="7"
                              fill="#fff"
                              opacity="0.8"
                            />
                          </svg>
                          {/* Glow */}
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '40px',
                            height: '40px',
                            background: 'radial-gradient(circle, rgba(255, 200, 50, 0.4), transparent)',
                            borderRadius: '50%',
                            zIndex: -1,
                            animation: 'pulse 2s ease-in-out infinite'
                          }} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Candle stick */}
                    <div style={{
                      width: '12px',
                      height: 'clamp(40px, 10vw, 60px)',
                      background: isLit
                        ? 'linear-gradient(to bottom, #e8c4a0, #d4a574)'
                        : 'linear-gradient(to bottom, #b8b8b8, #8c8c8c)',
                      borderRadius: '6px 6px 2px 2px',
                      boxShadow: isLit
                        ? '0 0 15px rgba(255, 200, 100, 0.5)'
                        : 'none',
                      transition: 'all 0.3s ease'
                    }}>
                      {/* Wick */}
                      <div style={{
                        width: '2px',
                        height: '8px',
                        background: isLit ? '#2c2c2c' : '#666',
                        margin: '0 auto',
                        borderRadius: '1px'
                      }} />
                    </div>

                    {/* Label */}
                    <motion.div
                      animate={isLit ? {
                        color: ['#ffd700', '#ffed4e', '#ffd700']
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                      style={{
                        fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                        color: isLit ? '#ffd700' : 'rgba(255, 255, 255, 0.5)',
                        fontFamily: 'Georgia, serif',
                        textShadow: isLit ? '0 0 10px rgba(255, 215, 0, 0.6)' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {candle.label}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Cake layers */}
            <motion.div
              animate={allLit ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0
              }}
            >
              {/* Top layer */}
              <div style={{
                width: '100%',
                height: 'clamp(70px, 18vw, 100px)',
                background: 'linear-gradient(135deg, #ffb6d9, #ff91c7)',
                borderRadius: '15px 15px 0 0',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 -5px 20px rgba(255, 145, 215, 0.4)'
              }}>
                {/* Frosting decoration */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: `${i * 12.5}%`,
                      width: '15%',
                      height: '20px',
                      background: '#fff',
                      borderRadius: '0 0 50% 50%',
                      opacity: 0.6
                    }}
                  />
                ))}
              </div>

              {/* Middle layer */}
              <div style={{
                width: '110%',
                marginLeft: '-5%',
                height: 'clamp(80px, 20vw, 110px)',
                background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                position: 'relative',
                boxShadow: '0 5px 25px rgba(255, 215, 0, 0.4)'
              }}>
                {/* Stars decoration */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: allLit ? [0.4, 1, 0.4] : 0.4,
                      scale: allLit ? [1, 1.2, 1] : 1
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    style={{
                      position: 'absolute',
                      top: '30%',
                      left: `${15 + i * 14}%`,
                      fontSize: 'clamp(1rem, 3vw, 1.5rem)'
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>

              {/* Bottom layer */}
              <div style={{
                width: '120%',
                marginLeft: '-10%',
                height: 'clamp(90px, 22vw, 120px)',
                background: 'linear-gradient(135deg, #d4a574, #c2966d)',
                borderRadius: '0 0 20px 20px',
                boxShadow: '0 10px 30px rgba(194, 150, 109, 0.5)'
              }} />
            </motion.div>
          </div>

          {/* Burst effect */}
          <AnimatePresence>
            {showBurst && (
              <>
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: [0, 1, 0],
                      x: (Math.cos(i * 12 * Math.PI / 180) * 200),
                      y: (Math.sin(i * 12 * Math.PI / 180) * 200)
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '10px',
                      height: '10px',
                      background: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
                      borderRadius: '50%',
                      boxShadow: '0 0 10px currentColor',
                      pointerEvents: 'none'
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Message after all lit */}
          <AnimatePresence>
            {allLit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1 }}
                style={{ textAlign: 'center', marginTop: '2rem' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="elegant-text large"
                  style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}
                >
                  HAPPY BIRTHDAY
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="elegant-text large"
                  style={{ marginBottom: '1rem', fontSize: 'clamp(2.2rem, 8vw, 4rem)' }}
                >
                  QAANDEEL ❤️
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 1 }}
                  className="elegant-text"
                >
                  Shafeeq ki Jaan
                </motion.div>

                <motion.button
                  className="romantic-button safe-margin-bottom"
                  onClick={onNext}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', delay: 3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ marginTop: '2rem' }}
                >
                  <span>Aur bhi kuch baqi hai</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </motion.div>
  );
};

export default InteractiveCake;
