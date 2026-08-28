import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HerHeart = ({ onNext }) => {
  const [stage, setStage] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1500),
      setTimeout(() => setStage(2), 4000),
      setTimeout(() => setStage(3), 7000),
      setTimeout(() => setStage(4), 10000),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = Math.min(400, window.innerWidth - 60);
    const height = canvas.height = Math.min(400, window.innerHeight * 0.4);

    let particles = [];
    let animationFrame;

    // Create heart shape particles
    const createHeartParticles = () => {
      particles = [];
      const particleCount = 80;
      
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        
        particles.push({
          baseX: width / 2 + x * 8,
          baseY: height / 2 + y * 8,
          x: width / 2 + x * 8,
          y: height / 2 + y * 8,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.5,
          hue: Math.random() * 30 + 340, // Pink to gold
          scattered: false
        });
      }
    };

    createHeartParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Stage 2: Heart becomes brighter
      const brightness = stage >= 2 ? 1 : 0.6;

      particles.forEach((particle) => {
        // Scatter particles when stage >= 2
        if (stage >= 2 && !particle.scattered) {
          particle.scattered = true;
          const angle = Math.random() * Math.PI * 2;
          const force = Math.random() * 3 + 2;
          particle.vx = Math.cos(angle) * force;
          particle.vy = Math.sin(angle) * force;
        }

        // Stage 3: Reform heart
        if (stage >= 3) {
          particle.x += (particle.baseX - particle.x) * 0.05;
          particle.y += (particle.baseY - particle.y) * 0.05;
        } else if (particle.scattered) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.98;
          particle.vy *= 0.98;
        }

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 4
        );
        
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity * brightness})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.4 * brightness})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, ${particle.opacity * brightness})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
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
      style={{
        background: stage >= 2 
          ? 'radial-gradient(circle at center, rgba(40, 30, 46, 0.9) 0%, rgba(10, 10, 18, 1) 70%)'
          : 'radial-gradient(circle at center, rgba(26, 26, 46, 0.8) 0%, rgba(10, 10, 18, 1) 70%)'
      }}
    >
      <div className="content-layer">
        <div style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '20px' }}>
          
          {/* Heart visualization */}
          <div style={{ margin: '2rem 0' }}>
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block'
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
                Aap ki khoobsurti sirf woh nahi jo aankhon ko nazar aati hai…
              </motion.div>
            )}

            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, type: 'spring' }}
                className="elegant-text"
                style={{ 
                  fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
                  marginBottom: '1.5rem',
                  color: '#ffb3d9'
                }}
              >
                Aap ka dil…
              </motion.div>
            )}

            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="elegant-text small"
                style={{ marginBottom: '2rem' }}
              >
                Aap ke dil ki khoobsurti hi woh cheez hai jo aap ko mere liye aur bhi khaas banati hai.
              </motion.div>
            )}

            {stage >= 4 && (
              <motion.button
                className="romantic-button safe-margin-bottom"
                onClick={onNext}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Aur sunain</span>
              </motion.button>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default HerHeart;
