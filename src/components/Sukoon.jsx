import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Sukoon = ({ onNext }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 3500),
      setTimeout(() => setStage(3), 6000),
      setTimeout(() => setStage(4), 8500),
      setTimeout(() => setStage(5), 11000),
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
        background: 'radial-gradient(ellipse at top, rgba(30, 40, 70, 0.6) 0%, rgba(10, 10, 18, 1) 60%)',
      }}
    >
      <div className="content-layer">
        <div style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '20px' }}>
          
          {/* Moon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2, type: 'spring' }}
            className="moon"
            style={{ marginBottom: '2rem' }}
          >
            {/* Moon craters */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '35%',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'rgba(200, 180, 100, 0.3)',
              boxShadow: 'inset 2px 2px 8px rgba(0, 0, 0, 0.2)'
            }} />
            <div style={{
              position: 'absolute',
              top: '60%',
              left: '55%',
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              background: 'rgba(200, 180, 100, 0.2)',
              boxShadow: 'inset 1px 1px 6px rgba(0, 0, 0, 0.2)'
            }} />
          </motion.div>

          {/* Floating clouds */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -100 }}
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                x: ['-100%', '100vw']
              }}
              transition={{
                opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                x: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }
              }}
              style={{
                position: 'absolute',
                top: `${20 + i * 15}%`,
                width: 'clamp(80px, 20vw, 150px)',
                height: 'clamp(30px, 8vw, 50px)',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50px',
                filter: 'blur(10px)',
                zIndex: 1
              }}
            />
          ))}

          {/* Text content */}
          <div style={{ maxWidth: '90%', lineHeight: 1.9, position: 'relative', zIndex: 10 }}>
            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text"
                style={{ 
                  fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
                  marginBottom: '2rem',
                  color: '#e0d4ff'
                }}
              >
                Shafeeq ka Sukoon
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
                Duniya mein bohot si cheezen khushi deti hain…
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
                Lekin sukoon… har kisi se nahi milta.
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
                Aur aap mere liye woh sukoon hain…
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
                <span>Kuch aur bhi hai</span>
              </motion.button>
            )}
          </div>

          {/* Twinkling stars */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="star"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}

        </div>
      </div>
    </motion.div>
  );
};

export default Sukoon;
