import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BirthdayReveal = ({ onNext, isMidnight }) => {
  const [stage, setStage] = useState(0);
  const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    // Calculate countdown if before midnight
    if (!isMidnight) {
      const updateCountdown = () => {
        const now = new Date();
        const targetDate = new Date(now.getFullYear(), 7, 28, 0, 0, 0); // August 28, midnight
        const diff = targetDate - now;

        if (diff > 0) {
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setCountdown({ minutes, seconds });
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    } else {
      // Start the reveal sequence
      const timers = [
        setTimeout(() => setStage(1), 1000),
        setTimeout(() => setStage(2), 3000),
        setTimeout(() => setStage(3), 5500),
        setTimeout(() => setStage(4), 8000),
      ];
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [isMidnight]);

  useEffect(() => {
    if (!isMidnight || stage < 2) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let flowers = [];
    let animationFrame;

    // Create floating flowers/petals
    for (let i = 0; i < 30; i++) {
      flowers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 1 + 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        hue: Math.random() * 60 + 320,
        opacity: Math.random() * 0.6 + 0.4
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flowers.forEach((flower) => {
        flower.y += flower.speed;
        flower.rotation += flower.rotationSpeed;

        if (flower.y > canvas.height + 50) {
          flower.y = -50;
          flower.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(flower.x, flower.y);
        ctx.rotate((flower.rotation * Math.PI) / 180);

        // Draw simple petal shape
        for (let i = 0; i < 5; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI * 2) / 5);
          
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, flower.size);
          gradient.addColorStop(0, `hsla(${flower.hue}, 100%, 70%, ${flower.opacity})`);
          gradient.addColorStop(1, `hsla(${flower.hue}, 100%, 50%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(0, -flower.size / 3, flower.size / 3, flower.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }

        // Center
        ctx.fillStyle = `hsla(45, 100%, 60%, ${flower.opacity})`;
        ctx.beginPath();
        ctx.arc(0, 0, flower.size / 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [isMidnight, stage]);

  if (!isMidnight) {
    return (
      <motion.div
        className="chapter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="content-layer">
          <div style={{ 
            textAlign: 'center', 
            minHeight: '70vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '2rem',
            padding: '20px'
          }}>
            <motion.div
              className="elegant-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Bas thori si der aur…
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                fontSize: 'clamp(2rem, 8vw, 4rem)',
                fontFamily: 'Georgia, serif',
                color: '#ffd700',
                textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                letterSpacing: '0.1em'
              }}
            >
              {String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
            </motion.div>

            <motion.div
              className="elegant-text small"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Kuch khaas hone wala hai…
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="chapter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: stage >= 2 
          ? 'radial-gradient(ellipse at center, rgba(80, 40, 70, 0.8) 0%, rgba(10, 10, 18, 1) 70%)'
          : 'radial-gradient(circle at center, rgba(26, 26, 46, 0.8) 0%, rgba(10, 10, 18, 1) 70%)'
      }}
    >
      {stage >= 2 && (
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
          
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: 'spring' }}
              className="elegant-text large"
              style={{
                fontSize: 'clamp(2rem, 8vw, 4rem)',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #ffd700, #ff91d7, #6dd5fa, #ffd700)',
                backgroundSize: '300% 300%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 3s ease infinite'
              }}
            >
              HAPPY BIRTHDAY
            </motion.div>
          )}

          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: 'spring', delay: 0.3 }}
              className="elegant-text large"
              style={{
                fontSize: 'clamp(2.5rem, 9vw, 4.5rem)',
                marginBottom: '1rem'
              }}
            >
              QANDEEL ❤️
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="elegant-text"
              style={{ marginBottom: '1rem' }}
            >
              Shafeeq ki Jaan
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="elegant-text small"
              style={{ 
                maxWidth: '90%',
                lineHeight: 1.9,
                marginBottom: '2rem'
              }}
            >
              Aap ki yeh nai zindagi khushiyon se bhari ho.
              <br />
              Aap ki muskurahat hamesha qayam rahe.
              <br />
              Aap ko woh sab mile jo aap ke dil ko sukoon de.
              <br />
              <br />
              Aap hamesha khush rahain, sehatmand rahain, aur aisi hi khoobsurat rahain.
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
              <span>Ek aakhri surprise</span>
            </motion.button>
          )}

        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default BirthdayReveal;
