import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import StarsBackground from './components/StarsBackground';
import OpeningScene from './components/OpeningScene';
import NameReveal from './components/NameReveal';
import NoComparison from './components/NoComparison';
import HerHeart from './components/HerHeart';
import Sukoon from './components/Sukoon';
import MagicalGift from './components/MagicalGift';
import Mohabbat from './components/Mohabbat';
import LoveLetter from './components/LoveLetter';
import BirthdayReveal from './components/BirthdayReveal';
import FinalSurprise from './components/FinalSurprise';
import MusicButton from './components/MusicButton';

const CHAPTERS = [
  'opening',
  'name',
  'noComparison',
  'heart',
  'sukoon',
  'gift',
  'mohabbat',
  'letter',
  'birthday',
  'final'
];

function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isMidnight, setIsMidnight] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if it's August 28 midnight or after
    const checkTime = () => {
      const now = new Date();
      const targetDate = new Date(now.getFullYear(), 7, 28, 0, 0, 0); // August 28, midnight
      
      if (now >= targetDate) {
        setIsMidnight(true);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);

    // Preload assets
    setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const nextChapter = () => {
    if (currentChapter < CHAPTERS.length - 1) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const chapterKey = CHAPTERS[currentChapter];

  if (!isReady) {
    return (
      <div className="app" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a0a12' 
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid rgba(255, 215, 0, 0.3)',
            borderTop: '3px solid rgba(255, 215, 0, 0.8)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app">
      <StarsBackground />
      <MusicButton audioRef={audioRef} />
      
      {currentChapter > 0 && currentChapter < CHAPTERS.length - 1 && (
        <div className="progress-dots">
          {CHAPTERS.slice(1, -1).map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${currentChapter - 1 === index ? 'active' : ''}`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {chapterKey === 'opening' && (
          <OpeningScene key="opening" onNext={nextChapter} />
        )}
        {chapterKey === 'name' && (
          <NameReveal key="name" onNext={nextChapter} />
        )}
        {chapterKey === 'noComparison' && (
          <NoComparison key="noComparison" onNext={nextChapter} />
        )}
        {chapterKey === 'heart' && (
          <HerHeart key="heart" onNext={nextChapter} />
        )}
        {chapterKey === 'sukoon' && (
          <Sukoon key="sukoon" onNext={nextChapter} />
        )}
        {chapterKey === 'gift' && (
          <MagicalGift key="gift" onNext={nextChapter} />
        )}
        {chapterKey === 'mohabbat' && (
          <Mohabbat key="mohabbat" onNext={nextChapter} />
        )}
        {chapterKey === 'letter' && (
          <LoveLetter key="letter" onNext={nextChapter} />
        )}
        {chapterKey === 'birthday' && (
          <BirthdayReveal 
            key="birthday" 
            onNext={nextChapter} 
            isMidnight={isMidnight} 
          />
        )}
        {chapterKey === 'final' && (
          <FinalSurprise key="final" />
        )}
      </AnimatePresence>

      {/* Audio element - user can add their own audio file to /public/ambient.mp3 */}
      <audio ref={audioRef} loop>
        <source src="/ambient.mp3" type="audio/mpeg" />
      </audio>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
