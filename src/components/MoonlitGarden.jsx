import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Aap meri khushi hain",
  "Aap mere dil ka sukoon hain",
  "Aap meri sabse pyari Qandeel hain",
  "Aap ko kisi se compare karna mumkin nahi",
  "Aap bas… aap hain",
  "Aap Shafeeq ki Jaan hain",
  "Aap Shafeeq ki Mohabbat hain"
];

const Flower = ({ x, y, hue, message, onTouch, touched }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        cursor: 'pointer',
        zIndex: touched ? 20 : 10
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onTouch(message)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg
        width={touched ? "60" : "40"}
        height={touched ? "60" : "40"}
        viewBox="0 0 60 60"
        style={{
          filter: `drop-shadow(0 0 ${touched ? '15px' : '8px'} hsl(${hue}, 100%, 60%))`
        }}
      >
        {/* Petals */}
        {[...Array(touched ? 8 : 5)].map((_, i) => (
          <motion.ellipse
            key={i}
            cx="30"
            cy="30"
            rx={touched ? "12" : "8"}
            ry={touched ? "20" : "15"}
            fill={`hsl(${hue}, 100%, ${touched ? '75%' : '70%'})`}
            opacity={touched ? "0.9" : "0.7"}
            transform={`rotate(${i * (360 / (touched ? 8 : 5))} 30 30) translate(0, ${touched ? '-12' : '-8'})`}
            animate={touched ? {
              scale: [1, 1.1, 1],
              opacity: [0.9, 1, 0.9]
            } : isHovered ? {
              scale: [1, 1.05, 1]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
        
        {/* Center */}
        <motion.circle
          cx="30"
          cy="30"
          r={touched ? "8" : "6"}
          fill="#ffd700"
          animate={{
            scale: touched ? [1, 1.15, 1] : [1, 1.05, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        />

        {/* Glow center */}
        <circle
          cx="30"
          cy="30"
          r={touched ? "12" : "9"}
          fill="url(#glowGradient)"
          opacity="0.5"
        />

        <defs>
          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Particles when touched */}
      <AnimatePresence>
        {touched && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: (Math.cos(i * 45 * Math.PI / 180) * 40),
                  y: (Math.sin(i * 45 * Math.PI / 180) * 40)
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '6px',
                  height: '6px',
                  background: `hsl(${hue}, 100%, 70%)`,
                  borderRadius: '50%',
                  boxShadow: `0 0 8px hsl(${hue}, 100%, 70%)`,
                  pointerEvents: 'none'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MoonlitGarden = ({ onNext }) => {
  const [touchedFlowers, setTouchedFlowers] = useState(new Set());
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Fireflies animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = Math.min(600, window.innerWidth);
    canvas.height = Math.min(500, window.innerHeight * 0.6);

    let fireflies = [];
    for (let i = 0; i < 20; i++) {
      fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach((firefly) => {
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;
        firefly.pulsePhase += 0.05;

        if (firefly.x < 0 || firefly.x > canvas.width) firefly.vx *= -1;
        if (firefly.y < 0 || firefly.y > canvas.height) firefly.vy *= -1;

        const pulse = (Math.sin(firefly.pulsePhase) + 1) / 2;
        const currentOpacity = firefly.opacity * pulse;

        // Glow
        const gradient = ctx.createRadialGradient(
          firefly.x, firefly.y, 0,
          firefly.x, firefly.y, firefly.radius * 6
        );
        gradient.addColorStop(0, `rgba(255, 230, 100, ${currentOpacity})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255, 240, 150, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (touchedFlowers.size >= 5) {
      setTimeout(() => setShowButton(true), 2000);
    }
  }, [touchedFlowers]);

  const handleFlowerTouch = (message) => {
    const flowerIndex = messages.indexOf(message);
    if (!touchedFlowers.has(flowerIndex)) {
      setTouchedFlowers(new Set([...touchedFlowers, flowerIndex]));
      setCurrentMessage(message);
      setTimeout(() => setCurrentMessage(null), 3000);
    }
  };

  const flowerPositions = [
    { x: 20, y: 40, hue: 330 },
    { x: 75, y: 30, hue: 280 },
    { x: 45, y: 60, hue: 320 },
    { x: 65, y: 75, hue: 340 },
    { x: 30, y: 70, hue: 290 },
    { x: 80, y: 55, hue: 310 },
    { x: 15, y: 25, hue: 300 }
  ];

  return (
    <motion.div
      className="chapter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: 'linear-gradient(to bottom, rgba(10, 15, 35, 1) 0%, rgba(25, 20, 45, 1) 50%, rgba(15, 10, 25, 1) 100%)'
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
          
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="elegant-text"
            style={{ marginBottom: '1rem', zIndex: 100 }}
          >
            Chand Taaron Ki Baagh
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="elegant-text small"
            style={{ marginBottom: '2rem', zIndex: 100, fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}
          >
            Phoolon ko chhuo aur dekho kya kehte hain…
          </motion.div>

          {/* Garden Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            height: 'clamp(350px, 60vh, 500px)',
            margin: '1rem 0'
          }}>
            {/* Canvas for fireflies */}
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                maxWidth: '100%',
                pointerEvents: 'none',
                opacity: 0.8
              }}
            />

            {/* Moon */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                top: '5%',
                right: '10%',
                width: 'clamp(60px, 15vw, 90px)',
                height: 'clamp(60px, 15vw, 90px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #fff, #f0e68c)',
                boxShadow: '0 0 50px rgba(255, 255, 200, 0.6)',
                zIndex: 5
              }}
            />

            {/* Flowers */}
            {messages.map((message, index) => (
              <Flower
                key={index}
                x={flowerPositions[index].x}
                y={flowerPositions[index].y}
                hue={flowerPositions[index].hue}
                message={message}
                onTouch={handleFlowerTouch}
                touched={touchedFlowers.has(index)}
              />
            ))}
          </div>

          {/* Message display */}
          <AnimatePresence>
            {currentMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'radial-gradient(ellipse, rgba(255, 215, 0, 0.2), transparent)',
                  border: '2px solid rgba(255, 215, 0, 0.4)',
                  borderRadius: '20px',
                  padding: '20px 30px',
                  backdropFilter: 'blur(10px)',
                  maxWidth: '85%',
                  marginTop: '1rem',
                  zIndex: 100
                }}
              >
                <div className="elegant-text small" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.3rem)' }}>
                  {currentMessage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress indicator */}
          {touchedFlowers.size > 0 && touchedFlowers.size < 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: '1rem',
                fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                color: 'rgba(255, 255, 255, 0.6)',
                zIndex: 100
              }}
            >
              {touchedFlowers.size}/5 phool khile hain
            </motion.div>
          )}

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
              style={{ marginTop: '2rem', zIndex: 100 }}
            >
              <span>Aur bhi kuch hai</span>
            </motion.button>
          )}

        </div>
      </div>
    </motion.div>
  );
};

export default MoonlitGarden;
