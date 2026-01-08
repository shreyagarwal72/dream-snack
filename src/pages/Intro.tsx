import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Bookmark, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import images
import slide1 from '@/assets/intro-slide-1.jpg';
import slide2 from '@/assets/intro-slide-2.jpg';
import slide3 from '@/assets/intro-slide-3.jpg';
import slide4 from '@/assets/intro-slide-4.jpg';
import slide5 from '@/assets/intro-slide-5.jpg';
import logo from '@/assets/logo.png';

const data = [
  {
    place: 'Premium Beverages',
    title: 'MASALA',
    title2: 'CHAI',
    description: 'Experience the authentic taste of India with our handcrafted masala chai. Made with premium tea leaves, fresh spices, and traditional recipes passed down through generations.',
    image: slide1
  },
  {
    place: 'Street Food Delights',
    title: 'CRISPY',
    title2: 'SAMOSAS',
    description: 'Savor the crunch of perfectly fried samosas and pakoras. Our street food collection brings the vibrant flavors of Indian markets right to your doorstep.',
    image: slide2
  },
  {
    place: 'Premium Coffee',
    title: 'AROMATIC',
    title2: 'BREWS',
    description: 'From single-origin beans to expertly crafted blends, discover coffee that awakens your senses. Every cup tells a story of passion and precision.',
    image: slide3
  },
  {
    place: 'Traditional Sweets',
    title: 'FESTIVE',
    title2: 'DESSERTS',
    description: 'Indulge in the sweetness of traditional Indian desserts. From golden jalebis to melt-in-your-mouth gulab jamun, every bite is a celebration.',
    image: slide4
  },
  {
    place: 'Express Delivery',
    title: 'LIGHTNING',
    title2: 'FAST',
    description: 'Your cravings delivered at the speed of light. Our express delivery ensures your food arrives hot, fresh, and right on time.',
    image: slide5
  },
];

export default function Intro() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loopRef = useRef<NodeJS.Timeout | null>(null);
  const detailsEvenRef = useRef(true);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const promises = data.map(({ image }) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image;
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };
    loadImages();
  }, []);

  // Initialize audio
  useEffect(() => {
    // Using a royalty-free ambient sound URL
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const initializeAnimation = useCallback(() => {
    if (!containerRef.current || !imagesLoaded) return;

    const { innerHeight: height, innerWidth: width } = window;
    const isMobile = width < 768;
    const offsetTop = isMobile ? height - 280 : height - 430;
    const offsetLeft = isMobile ? 20 : width - 830;
    const cardWidth = isMobile ? 100 : 200;
    const cardHeight = isMobile ? 150 : 300;
    const gap = isMobile ? 20 : 40;

    // Set up initial positions
    data.forEach((_, index) => {
      const card = document.getElementById(`card${index}`);
      const cardContent = document.getElementById(`card-content-${index}`);
      
      if (index === 0) {
        gsap.set(card, {
          x: 0,
          y: 0,
          width: width,
          height: height,
          zIndex: 20,
          borderRadius: 0,
        });
        gsap.set(cardContent, { x: 0, y: 0, opacity: 0 });
      } else {
        gsap.set(card, {
          x: offsetLeft + (index - 1) * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
        });
        gsap.set(cardContent, {
          x: offsetLeft + (index - 1) * (cardWidth + gap),
          y: offsetTop + cardHeight - 100,
          zIndex: 40,
        });
      }
    });

    // Animate in
    gsap.set('#pagination', { y: 200, opacity: 0 });
    gsap.set('#intro-nav', { y: -100, opacity: 0 });
    gsap.set('#details-even', { opacity: 0, x: -200 });
    gsap.set('#details-odd', { opacity: 0 });
    gsap.set('.indicator-bar', { x: -width });
    gsap.set('.intro-cover', { x: 0 });

    // Start animation sequence
    gsap.to('.intro-cover', {
      x: width + 400,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsReady(true);
        startLoop();
      },
    });

    gsap.to('#pagination', { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' });
    gsap.to('#intro-nav', { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' });
    gsap.to('#details-even', { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' });
  }, [imagesLoaded]);

  const animateStep = useCallback(() => {
    const { innerHeight: height, innerWidth: width } = window;
    const isMobile = width < 768;
    const offsetTop = isMobile ? height - 280 : height - 430;
    const offsetLeft = isMobile ? 20 : width - 830;
    const cardWidth = isMobile ? 100 : 200;
    const cardHeight = isMobile ? 150 : 300;
    const gap = isMobile ? 20 : 40;

    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % data.length;
      
      detailsEvenRef.current = !detailsEvenRef.current;
      const detailsActive = detailsEvenRef.current ? '#details-even' : '#details-odd';
      const detailsInactive = detailsEvenRef.current ? '#details-odd' : '#details-even';

      // Update text content
      const activePlace = document.querySelector(`${detailsActive} .text`);
      const activeTitle1 = document.querySelector(`${detailsActive} .title-1`);
      const activeTitle2 = document.querySelector(`${detailsActive} .title-2`);
      const activeDesc = document.querySelector(`${detailsActive} .desc`);

      if (activePlace) activePlace.textContent = data[nextIndex].place;
      if (activeTitle1) activeTitle1.textContent = data[nextIndex].title;
      if (activeTitle2) activeTitle2.textContent = data[nextIndex].title2;
      if (activeDesc) activeDesc.textContent = data[nextIndex].description;

      // Animate details
      gsap.set(detailsActive, { zIndex: 22 });
      gsap.to(detailsActive, { opacity: 1, duration: 0.4, delay: 0.4, ease: 'power2.out' });
      gsap.to(`${detailsActive} .text`, { y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' });
      gsap.to(`${detailsActive} .title-1`, { y: 0, duration: 0.7, delay: 0.15, ease: 'power2.out' });
      gsap.to(`${detailsActive} .title-2`, { y: 0, duration: 0.7, delay: 0.15, ease: 'power2.out' });
      gsap.to(`${detailsActive} .desc`, { y: 0, duration: 0.4, delay: 0.3, ease: 'power2.out' });
      gsap.to(`${detailsActive} .cta`, { y: 0, duration: 0.4, delay: 0.35, ease: 'power2.out' });
      gsap.set(detailsInactive, { zIndex: 12 });

      // Card animations
      const prevCard = document.getElementById(`card${prev}`);
      const nextCard = document.getElementById(`card${nextIndex}`);

      gsap.set(prevCard, { zIndex: 10 });
      gsap.set(nextCard, { zIndex: 20 });
      gsap.to(prevCard, { scale: 1.5, duration: 0.8, ease: 'power2.out' });

      gsap.to(nextCard, {
        x: 0,
        y: 0,
        width: width,
        height: height,
        borderRadius: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          // Reset previous card
          const xNew = offsetLeft + (data.length - 2) * (cardWidth + gap);
          gsap.set(prevCard, {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
            scale: 1,
          });

          gsap.set(detailsInactive, { opacity: 0 });
          gsap.set(`${detailsInactive} .text`, { y: 100 });
          gsap.set(`${detailsInactive} .title-1`, { y: 100 });
          gsap.set(`${detailsInactive} .title-2`, { y: 100 });
          gsap.set(`${detailsInactive} .desc`, { y: 50 });
          gsap.set(`${detailsInactive} .cta`, { y: 60 });
        },
      });

      // Animate other cards
      data.forEach((_, i) => {
        if (i !== nextIndex && i !== prev) {
          const card = document.getElementById(`card${i}`);
          let cardPosition = i - nextIndex - 1;
          if (cardPosition < 0) cardPosition += data.length;
          const xNew = offsetLeft + cardPosition * (cardWidth + gap);
          
          gsap.set(card, { zIndex: 30 });
          gsap.to(card, {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.1 * (cardPosition + 1),
          });
        }
      });

      // Update progress
      gsap.to('.progress-foreground', {
        width: `${((nextIndex + 1) / data.length) * 100}%`,
        duration: 0.8,
        ease: 'power2.out',
      });

      return nextIndex;
    });
  }, []);

  const startLoop = useCallback(() => {
    if (loopRef.current) clearTimeout(loopRef.current);
    
    const runLoop = async () => {
      const { innerWidth: width } = window;
      
      // Animate indicator
      await gsap.to('.indicator-bar', { x: 0, duration: 2, ease: 'power2.inOut' });
      await gsap.to('.indicator-bar', { x: width, duration: 0.8, delay: 0.3, ease: 'power2.inOut' });
      gsap.set('.indicator-bar', { x: -width });
      
      animateStep();
      loopRef.current = setTimeout(runLoop, 500);
    };
    
    runLoop();
  }, [animateStep]);

  useEffect(() => {
    if (imagesLoaded) {
      setTimeout(initializeAnimation, 100);
    }
    return () => {
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  }, [imagesLoaded, initializeAnimation]);

  const handleSkip = () => {
    if (loopRef.current) clearTimeout(loopRef.current);
    if (audioRef.current) audioRef.current.pause();
    navigate('/');
  };

  const handleDiscover = () => {
    if (loopRef.current) clearTimeout(loopRef.current);
    if (audioRef.current) audioRef.current.pause();
    navigate('/menu');
  };

  const handlePrev = () => {
    if (loopRef.current) clearTimeout(loopRef.current);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    startLoop();
  };

  const handleNext = () => {
    if (loopRef.current) clearTimeout(loopRef.current);
    animateStep();
    setTimeout(startLoop, 1000);
  };

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/80 font-medium">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-neutral-900 text-white overflow-hidden font-sans"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Progress indicator bar */}
      <div className="indicator-bar fixed left-0 right-0 top-0 h-1.5 z-[60] bg-amber-500" />

      {/* Navigation */}
      <nav 
        id="intro-nav"
        className="fixed left-0 top-0 right-0 z-50 flex items-center justify-between px-4 md:px-9 py-5"
      >
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Chaiiwala" className="h-8 w-auto" />
          <span className="text-sm md:text-base font-semibold uppercase tracking-wide hidden sm:block">
            Chaiiwala Express
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={toggleSound}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <Button 
            variant="outline" 
            onClick={handleSkip}
            className="text-white border-white/50 bg-transparent hover:bg-white/10 text-xs md:text-sm"
          >
            Skip Intro
          </Button>
        </div>
      </nav>

      {/* Cards container */}
      <div id="demo">
        {data.map((item, index) => (
          <div key={index}>
            <div
              id={`card${index}`}
              className="card absolute left-0 top-0 bg-center bg-cover"
              style={{ 
                backgroundImage: `url(${item.image})`,
                boxShadow: '6px 6px 10px 2px rgba(0, 0, 0, 0.6)',
              }}
            />
            <div
              id={`card-content-${index}`}
              className="card-content absolute left-0 top-0 text-white/90 pl-4"
            >
              <div className="w-8 h-1 bg-white/90 rounded-full" />
              <div className="mt-1.5 text-xs md:text-sm font-medium">{item.place}</div>
              <div className="font-semibold text-lg md:text-xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {item.title}
              </div>
              <div className="font-semibold text-lg md:text-xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {item.title2}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details - Even */}
      <div id="details-even" className="absolute top-[120px] md:top-[240px] left-4 md:left-[60px] z-[22]">
        <div className="h-12 overflow-hidden">
          <div className="text relative pt-4 text-base md:text-xl before:absolute before:top-0 before:left-0 before:w-8 before:h-1 before:bg-white before:rounded-full">
            {data[0].place}
          </div>
        </div>
        <div className="title-box mt-0.5 h-16 md:h-24 overflow-hidden">
          <div 
            className="title-1 font-semibold text-4xl md:text-7xl"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {data[0].title}
          </div>
        </div>
        <div className="title-box mt-0.5 h-16 md:h-24 overflow-hidden">
          <div 
            className="title-2 font-semibold text-4xl md:text-7xl"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {data[0].title2}
          </div>
        </div>
        <div className="desc mt-4 w-[90vw] md:w-[500px] text-sm md:text-base text-white/80">
          {data[0].description}
        </div>
        <div className="cta mt-6 flex items-center gap-4">
          <button className="w-9 h-9 rounded-full bg-amber-500 text-white grid place-items-center hover:bg-amber-600 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
          <Button 
            onClick={handleDiscover}
            variant="outline"
            className="h-9 px-6 rounded-full border-white bg-transparent text-white text-xs uppercase hover:bg-white hover:text-neutral-900 transition-colors"
          >
            Explore Menu
          </Button>
        </div>
      </div>

      {/* Details - Odd */}
      <div id="details-odd" className="absolute top-[120px] md:top-[240px] left-4 md:left-[60px] z-[12]">
        <div className="h-12 overflow-hidden">
          <div className="text relative pt-4 text-base md:text-xl before:absolute before:top-0 before:left-0 before:w-8 before:h-1 before:bg-white before:rounded-full">
            {data[0].place}
          </div>
        </div>
        <div className="title-box mt-0.5 h-16 md:h-24 overflow-hidden">
          <div 
            className="title-1 font-semibold text-4xl md:text-7xl"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {data[0].title}
          </div>
        </div>
        <div className="title-box mt-0.5 h-16 md:h-24 overflow-hidden">
          <div 
            className="title-2 font-semibold text-4xl md:text-7xl"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {data[0].title2}
          </div>
        </div>
        <div className="desc mt-4 w-[90vw] md:w-[500px] text-sm md:text-base text-white/80">
          {data[0].description}
        </div>
        <div className="cta mt-6 flex items-center gap-4">
          <button className="w-9 h-9 rounded-full bg-amber-500 text-white grid place-items-center hover:bg-amber-600 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
          <Button 
            onClick={handleDiscover}
            variant="outline"
            className="h-9 px-6 rounded-full border-white bg-transparent text-white text-xs uppercase hover:bg-white hover:text-neutral-900 transition-colors"
          >
            Explore Menu
          </Button>
        </div>
      </div>

      {/* Pagination */}
      <div 
        id="pagination"
        className="absolute bottom-8 md:bottom-auto md:top-[calc(100vh-100px)] left-4 md:left-auto md:right-8 flex items-center gap-4 md:gap-6 z-[60]"
      >
        <button 
          onClick={handlePrev}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 grid place-items-center hover:border-white/60 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white/60" />
        </button>
        <button 
          onClick={handleNext}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 grid place-items-center hover:border-white/60 transition-colors"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/60" />
        </button>
        
        {/* Progress bar */}
        <div className="hidden md:flex items-center w-[300px] lg:w-[500px]">
          <div className="w-full h-0.5 bg-white/20 relative">
            <div 
              className="progress-foreground h-full bg-amber-500 transition-all duration-800"
              style={{ width: `${((currentIndex + 1) / data.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Slide number */}
        <div className="w-12 h-12 grid place-items-center text-2xl md:text-3xl font-bold">
          {currentIndex + 1}
        </div>
      </div>

      {/* Cover for initial animation */}
      <div className="intro-cover absolute inset-0 bg-white z-[100]" />

      {/* Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600&display=swap" 
        rel="stylesheet" 
      />
    </div>
  );
}
