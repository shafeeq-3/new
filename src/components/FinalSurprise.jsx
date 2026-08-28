import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FinalSurprise = () => {
  const [stage, setStage] = useState(0);
  const [flowerTouched, setFlowerTouched] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!flowerTouched) return;

    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 5500),
      setTimeout(() => setStage(4), 8000),
      setTimeout(() => setStage(5), 10500),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, [flowerTouched]);

  useEffect(() => {
    if (stage < 1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    let animationFrame;

    // Create stars that form from center
    const createStars = () => {
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        const distance = Math.random() * Math.min(canvas.width, canvas.height) * 0.8;
        
        stars.push({
          startX: canvas.width / 2,
          startY: canvas.height / 2,
          endX: canvas.width / 2 + Math.cos(angle) * distance,
          endY: canvas.height / 2 + Math.sin(angle) * distance,
          x: canvas.width / 2,
          y: canvas.height / 2,
          progress: 0,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.8 + 0.2,
          hue: Math.random() * 60 + 30
        });
      }
    };

    createStars();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        if (star.progress < 1) {
          star.progress = Math.min(1, star.progress + star.speed);
        }

        star.x = star.startX + (star.endX - star.startX) * star.progress;
        star.y = star.startY + (star.endY - star.startY) * star.progress;

        const currentOpacity = star.opacity * star.progress;

        // Glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 3
        );
        gradient.addColorStop(0, `hsla(${star.hue}, 100%, 70%, ${currentOpacity})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(${star.hue}, 100%, 80%, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [stage]);

  const handleFlowerClick = () => {
    if (!flowerTouched) {
      setFlowerTouched(true);
    }
  };

  return (
    <motion.div
      className="chapter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: stage >= 1
          ? 'radial-gradient(ellipse at center, rgba(40, 30, 50, 0.8) 0%, rgba(5, 5, 10, 1) 70%)'
          : 'radial-gradient(circle at center, rgba(26, 26, 46, 0.8) 0%, rgba(10, 10, 18, 1) 70%)'
      }}
    >
      {stage >= 1 && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />
      )}

      <div className="content-layer">
        <div style={{ 
          textAlign: 'center', 
          minHeight: '70vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '2rem',
          padding: '20px',
          position: 'relative',
          zIndex: 10
        }}>
          
          {!flowerTouched && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="elegant-text small"
                style={{ marginBottom: '2rem' }}
              >
                Yeh aakhri tohfa…
              </motion.div>

              {/* Magical Flower */}
              <motion.div
                onClick={handleFlowerClick}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  width: 'clamp(120px, 30vw, 180px)',
                  height: 'clamp(120px, 30vw, 180px)',
                  cursor: 'pointer',
                  marginBottom: '2rem'
                }}
              >
                <svg
                  viewBox="0 0 200 200"
                  style={{
                    width: '100%',
                    height: '100%',
                    filter: 'drop-shadow(0 0 20px rgba(255, 145, 215, 0.6))'
                  }}
                >
                  {/* Petals */}
                  {[...Array(8)].map((_, i) => (
                    <motion.ellipse
                      key={i}
                      cx="100"
                      cy="100"
                      rx="30"
                      ry="60"
                      fill={`hsl(${320 + i * 5}, 100%, 75%)`}
                      opacity="0.8"
                      transform={`rotate(${i * 45} 100 100) translate(0, -30)`}
                      animate={{
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}

                  {/* Center */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="25"
                    fill="url(#centerGradient)"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />

                  <defs>
                    <radialGradient id="centerGradient">
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="100%" stopColor="#ffed4e" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
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
                    width: '140%',
                    height: '140%',
                    background: 'radial-gradient(circle, rgba(255, 145, 215, 0.4), transparent)',
                    borderRadius: '50%',
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
                Phool ko chhuo…
              </motion.div>
            </>
          )}

          {/* Final messages */}
          {flowerTouched && stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="elegant-text small"
              style={{ 
                maxWidth: '90%',
                lineHeight: 2,
                marginBottom: '1.5rem'
              }}
            >
              Duniya mein bohot log khoobsurat honge…
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: 'spring' }}
              className="elegant-text"
              style={{ 
                fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
                marginBottom: '1.5rem'
              }}
            >
              Lekin meri duniya mein…
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: 'spring' }}
              className="elegant-text large"
              style={{ 
                fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                marginBottom: '1rem'
              }}
            >
              Qandeel sirf ek hai.
            </motion.div>
          )}

          {stage >= 5 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text"
                style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 2.3rem)',
                  marginBottom: '2rem'
                }}
              >
                Aur woh aap hain.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="elegant-text"
                style={{ 
                  fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
                  marginBottom: '3rem',
                  color: '#ffb3d9'
                }}
              >
                Hamesha. ❤️
              </motion.div>

              {/* Hidden Easter Egg - tap the heart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 2, delay: 2 }}
                style={{
                  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontStyle: 'italic',
                  marginTop: '3rem'
                }}
              >
                — Shafee ki Qandeel, Shafeeq ki Jaan, Shafeeq ka Sukoon —
              </motion.div>
            </>
          )}

        </div>
      </div>
    </motion.div>
  );
};

export default FinalSurprise;
