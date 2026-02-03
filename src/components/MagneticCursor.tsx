import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGlass } from "@/contexts/GlassContext";

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const { glassEnabled } = useGlass();

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsTouchDevice(hasTouch || isSmallScreen);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);
    
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    // Continuous rotation animation
    const rotationTween = gsap.to(cursor, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (!isHovering) {
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0.15,
          ease: "power2.out"
        });
      }

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      isHovering = true;
      rotationTween.pause();

      gsap.to(cursor, {
        x: centerX,
        y: centerY,
        width: rect.width + 20,
        height: rect.height + 20,
        borderRadius: 12,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      });

      gsap.to(dot, {
        scale: 0,
        duration: 0.2
      });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      rotationTween.resume();

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        width: 30,
        height: 30,
        borderRadius: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      });

      gsap.to(dot, {
        scale: 1,
        duration: 0.2
      });
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    // Add listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);

    // Find and attach to magnetic elements
    const attachMagneticListeners = () => {
      const magneticElements = document.querySelectorAll("[data-magnetic]");
      magneticElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Initial attach
    attachMagneticListeners();

    // Re-attach on DOM changes (for dynamic content)
    const observer = new MutationObserver(attachMagneticListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Add cursor-none class to body
    document.body.classList.add("cursor-none");

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.classList.remove("cursor-none");
      observer.disconnect();
      rotationTween.kill();

      const magneticElements = document.querySelectorAll("[data-magnetic]");
      magneticElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice) return null;

  // Use theme-aware colors - primary brand color (warm brown/orange)
  const cursorColor = glassEnabled 
    ? "hsl(25 60% 35%)"  // --primary color
    : "hsl(25 60% 35%)";
  
  const dotColor = glassEnabled 
    ? "hsl(35 80% 50%)"  // --accent color
    : "hsl(35 80% 50%)";

  return (
    <>
      <div
        ref={cursorRef}
        id="magnetic-cursor"
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: 30,
          height: 30,
          transform: "translate(-50%, -50%)",
          background: `
            linear-gradient(to right, ${cursorColor} 0%, ${cursorColor} 8px, transparent 8px) top left,
            linear-gradient(to right, ${cursorColor} 0%, ${cursorColor} 8px, transparent 8px) bottom left,
            linear-gradient(to bottom, ${cursorColor} 0%, ${cursorColor} 8px, transparent 8px) top left,
            linear-gradient(to bottom, ${cursorColor} 0%, ${cursorColor} 8px, transparent 8px) top right,
            linear-gradient(to left, ${cursorColor} 0%, ${cursorColor} 8px, transparent 8px) top right,
            linear-gradient(to left, ${cursorColor} 0%, ${cursorColor} 8px, transparent 8px) bottom right,
            linear-gradient(to top, ${cursorColor} 0%, ${cursorColor} 8px, transparent 8px) bottom left,
            linear-gradient(to top, ${cursorColor} 0%, ${cursorColor} 8px, transparent 8px) bottom right
          `,
          backgroundSize: "8px 2px, 8px 2px, 2px 8px, 2px 8px, 8px 2px, 8px 2px, 2px 8px, 2px 8px",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div
        ref={dotRef}
        id="magnetic-cursor-dot"
        className={`fixed pointer-events-none z-[9999] w-[7px] h-[7px] rounded-full transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
          background: dotColor,
          boxShadow: `0 0 10px hsl(35 80% 50% / 0.5)`
        }}
      />
    </>
  );
};

export default MagneticCursor;
