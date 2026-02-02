import { useRef, useState } from "react";
import gsap from "gsap";
import { useGlass } from "@/contexts/GlassContext";

interface TruckButtonProps {
  onOrderComplete: () => void;
  disabled?: boolean;
  buttonText?: string;
  successText?: string;
}

const TruckButton = ({ 
  onOrderComplete,
  disabled = false,
  buttonText = "Complete Order",
  successText = "Order Placed"
}: TruckButtonProps) => {
  const { glassEnabled } = useGlass();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;

    const box = button.querySelector('.box') as HTMLElement;
    const truck = button.querySelector('.truck') as HTMLElement;

    if (!isDone) {
      if (!isAnimating) {
        setIsAnimating(true);

        // Box appears and scales up
        gsap.to(button, {
          '--box-s': 1,
          '--box-o': 1,
          duration: 0.3,
          delay: 0.5
        });

        // Box moves to truck
        gsap.to(box, {
          x: 0,
          duration: 0.4,
          delay: 0.7
        });

        // Box door animation
        gsap.to(button, {
          '--hx': -5,
          '--bx': 50,
          duration: 0.18,
          delay: 0.92
        });

        // Box drops into place
        gsap.to(box, {
          y: 0,
          duration: 0.1,
          delay: 1.15
        });

        // Initialize truck position
        gsap.set(button, {
          '--truck-y': 0,
          '--truck-y-n': -26
        });

        // Truck bounces and drives
        gsap.to(button, {
          '--truck-y': 1,
          '--truck-y-n': -25,
          duration: 0.2,
          delay: 1.25,
          onComplete() {
            gsap.timeline({
              onComplete() {
                setIsDone(true);
                // Trigger order completion after animation
                setTimeout(() => {
                  onOrderComplete();
                }, 500);
              }
            }).to(truck, {
              x: 0,
              duration: 0.4
            }).to(truck, {
              x: 40,
              duration: 1
            }).to(truck, {
              x: 20,
              duration: 0.6
            }).to(truck, {
              x: 96,
              duration: 0.4
            });
            
            // Progress bar fills as truck moves
            gsap.to(button, {
              '--progress': 1,
              duration: 2.4,
              ease: "power2.in"
            });
          }
        });
      }
    } else {
      // Reset animation for another order
      setIsAnimating(false);
      setIsDone(false);
      gsap.set(truck, { x: 4 });
      gsap.set(button, {
        '--progress': 0,
        '--hx': 0,
        '--bx': 0,
        '--box-s': 0.5,
        '--box-o': 0,
        '--truck-y': 0,
        '--truck-y-n': -26
      });
      gsap.set(box, { x: -24, y: -6 });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`truck-button ${isAnimating ? 'animation' : ''} ${isDone ? 'done' : ''} ${glassEnabled ? 'glass-truck' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="default">{buttonText}</span>
      <span className="success">
        {successText}
        <svg viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      <div className="truck">
        <div className="wheel"></div>
        <div className="back"></div>
        <div className="front"></div>
        <div className="box"></div>
      </div>
    </button>
  );
};

export default TruckButton;
