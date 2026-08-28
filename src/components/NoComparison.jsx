import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NoComparison = ({ onNext }) => {
  const [stage, setStage] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 3500),
      setTimeout(() => setStage(3), 6000),
      setTimeout(() => setStage(4), 8500),
      setTimeout(() => setStage(5), 11000),
      setTimeout(() => setStage(6), 13500),
      setTimeout(() => setStage(7), 16000),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = Math.min(600, window.innerWidth - 40);
    const height = canvas.height = Math.min(600, window.innerHeight * 0.5);
    
    let lights = [];
    const lightCount = 50;

    // Create many lights
    for (let i = 0; i < lightCount; i++) {
      lights.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 2,
        opacity: Math.random() * 0.6 + 0.4,
        fadeOut: false,
        isSpecial: false
      });
    }

    // Make one special
    const specialIndex = Math.floor(Math.random() * lightCount);
    lights[specialIndex].isSpecial = true;

    let animationFrame;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      lights.forEach((light, index) => {
        // Stage 2: Start fading out non-special lights
        if (stage >= 2 && !light.isSpecial) {
          light.fadeOut = true;
        }

        // Fade out logic
        if (light.fadeOut) {
          light.opacity = Math.max(0, light.opacity - 0.01);
        }

        // Stage 3+: Brighten the special light
        if (stage >= 3 && light.isSpecial) {
          light.radius = Math.min(12, light.radius + 0.1);
          light.opacity = Math.min(1, light.opacity + 0.01);
        }

        // Draw light
        if (light.opacity > 0) {
          const gradient = ctx.createRadialGradient(
            light.x, light.y, 0,
            light.x, light.y, light.radius * 3
          );
          
          if (light.isSpecial) {
            gradient.addColorStop(0, `rgba(255, 215, 0, ${light.opacity})`);
            gradient.addColorStop(0.5, `rgba(255, 215, 0, ${light.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
          } else {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${light.opacity})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${light.opacity * 0.3})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(light.x, light.y, light.radius * 3, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = light.isSpecial 
            ? `rgba(255, 235, 150, ${light.opacity})`
            : `rgba(255, 255, 255, ${light.opacity})`;
          ctx.beginPath();
          ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [stage]);

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
          
          {/* Universe visualization */}
          <div style={{ margin: '2rem 0', position: 'relative' }}>
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                filter: 'blur(0.5px)'
              }}
            />
          </div>

          {/* Text reveals */}
          <div style={{ maxWidth: '90%', lineHeight: 1.9 }}>
            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text small"
                style={{ marginBottom: '1.5rem' }}
              >
                Duniya mein khoobsurti bohot hai…
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
                Lekin har khoobsurti ka muqabla nahi hota.
              </motion.div>
            )}

            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text small"
                style={{ marginBottom: '1.5rem' }}
              >
                Kuch log compare nahi kiye jaate…
              </motion.div>
            )}

            {stage >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text small"
                style={{ marginBottom: '2rem' }}
              >
                kyun ke un jaisa koi hota hi nahi.
              </motion.div>
            )}

            {stage >= 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, type: 'spring' }}
                className="elegant-text"
                style={{ 
                  fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
                  marginBottom: '1rem'
                }}
              >
                Aap.
              </motion.div>
            )}

            {stage >= 7 && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  className="elegant-text"
                  style={{ marginBottom: '2rem' }}
                >
                  Shafeeq ki Haseena.
                </motion.div>

                <motion.button
                  className="romantic-button safe-margin-bottom"
                  onClick={onNext}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Aur bhi kuch hai</span>
                </motion.button>
              </>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default NoComparison;
