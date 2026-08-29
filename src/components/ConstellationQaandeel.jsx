import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConstellationQaandeel = ({ onNext }) => {
  const [connectedStars, setConnectedStars] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);

  // Simple pattern for Q-A-N-D-E-E-L
  const constellationPattern = [
    // Q
    { x: 0.2, y: 0.3 }, { x: 0.3, y: 0.3 }, { x: 0.3, y: 0.5 }, { x: 0.2, y: 0.5 }, { x: 0.2, y: 0.3 },
    // A
    { x: 0.38, y: 0.5 }, { x: 0.43, y: 0.3 }, { x: 0.48, y: 0.5 },
    // Rest simplified
    { x: 0.55, y: 0.3 }, { x: 0.6, y: 0.4 }, { x: 0.65, y: 0.3 },
    { x: 0.72, y: 0.4 }, { x: 0.78, y: 0.5 }
  ];

  useEffect(() => {
    // Initialize stars
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width = Math.min(500, window.innerWidth - 40);
    const height = canvas.height = Math.min(500, window.innerHeight * 0.6);

    const starList = constellationPattern.map((point, index) => ({
      id: index,
      x: point.x * width,
      y: point.y * height,
      active: false,
      hintActive: false
    }));

    setStars(starList);
  }, []);

  useEffect(() => {
    if (connectedStars.length === constellationPattern.length) {
      setTimeout(() => setCompleted(true), 1500);
    }
  }, [connectedStars]);

  // Auto-complete after 10 seconds if user hasn't completed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!completed && connectedStars.length < constellationPattern.length) {
        setAutoComplete(true);
        // Auto-connect remaining stars
        const allStars = constellationPattern.map((_, i) => i);
        setConnectedStars(allStars);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [completed, connectedStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stars.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';

      for (let i = 0; i < connectedStars.length - 1; i++) {
        const star1 = stars[connectedStars[i]];
        const star2 = stars[connectedStars[i + 1]];
        
        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      // Draw stars
      stars.forEach((star, index) => {
        const isConnected = connectedStars.includes(index);
        const isNext = connectedStars.length === index;

        // Glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 15);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${isConnected ? 0.8 : isNext ? 0.6 : 0.3})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 15, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = isConnected ? '#ffd700' : isNext ? '#ffed4e' : 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, isConnected ? 5 : isNext ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();
  }, [stars, connectedStars]);

  const handleCanvasClick = (e) => {
    if (completed) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const nextStarIndex = connectedStars.length;
    if (nextStarIndex >= stars.length) return;

    const nextStar = stars[nextStarIndex];
    const distance = Math.sqrt(
      Math.pow(clickX - nextStar.x, 2) + Math.pow(clickY - nextStar.y, 2)
    );

    // Increased hit area for easier tapping
    if (distance < 35) {
      setConnectedStars([...connectedStars, nextStarIndex]);
    }
  };

  const handleSkip = () => {
    // Auto-complete all stars
    const allStars = constellationPattern.map((_, i) => i);
    setConnectedStars(allStars);
    setAutoComplete(true);
  };

  return (
    <motion.div
      className="chapter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: completed
          ? 'radial-gradient(ellipse at center, rgba(80, 50, 100, 0.8) 0%, rgba(10, 10, 18, 1) 70%)'
          : 'radial-gradient(circle at center, rgba(20, 20, 40, 0.9) 0%, rgba(5, 5, 15, 1) 70%)'
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
          
          {!completed && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="elegant-text small"
                style={{ marginBottom: '2rem', maxWidth: '90%' }}
              >
                Kuch sitaray aaj kisi ka naam likhna chahte hain…
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  color: 'rgba(255, 215, 0, 0.7)',
                  marginBottom: '1rem'
                }}
              >
                Sitaron ko tap karein sequence mein
              </motion.div>

              {/* Skip button */}
              <motion.button
                className="romantic-button"
                onClick={handleSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  marginBottom: '1rem',
                  padding: '12px 30px',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  background: 'rgba(255, 215, 0, 0.15)',
                  border: '1px solid rgba(255, 215, 0, 0.3)'
                }}
              >
                <span>Ya khud se ban jaye</span>
              </motion.button>
            </>
          )}

          {/* Canvas */}
          <motion.canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            style={{
              maxWidth: '100%',
              cursor: completed ? 'default' : 'pointer',
              touchAction: 'none'
            }}
            animate={completed ? {
              scale: [1, 1.05, 1]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Progress */}
          {!completed && connectedStars.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: '1rem',
                fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                color: 'rgba(255, 255, 255, 0.6)'
              }}
            >
              {connectedStars.length}/{stars.length} sitare judey hain
            </motion.div>
          )}

          {/* Completion */}
          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ marginTop: '2rem', textAlign: 'center' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  className="elegant-text large"
                  style={{ 
                    marginBottom: '1.5rem',
                    fontSize: 'clamp(2rem, 7vw, 3.5rem)'
                  }}
                >
                  QAANDEEL
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="elegant-text small"
                  style={{ marginBottom: '1.5rem' }}
                >
                  Sitaron ne aap ka naam likha hai asmaan par
                </motion.div>

                <motion.button
                  className="romantic-button safe-margin-bottom"
                  onClick={onNext}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ marginTop: '1rem' }}
                >
                  <span>Aagay chalain</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
};

export default ConstellationQaandeel;
