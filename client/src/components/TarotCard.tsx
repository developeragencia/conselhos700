import React from "react";

interface TarotCardProps {
  card: {
    id: number;
    name: string;
    image: string;
    isRevealed: boolean;
    isSelected: boolean;
    isBackFacing: boolean;
  };
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  onClick, 
  className = "", 
  size = "md" 
}) => {
  const { name, image, isRevealed, isSelected, isBackFacing } = card;
  
  const sizeClasses = {
    sm: "w-20 h-32",
    md: "w-24 h-36",
    lg: "w-32 h-48" 
  };

  const getRotation = () => {
    if (isRevealed) {
      return "rotate-0";
    }
    return Math.floor(Math.random() * 10 - 5) + "deg";
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-md shadow-lg transition-transform tarot-card-hover cursor-pointer ${
        isSelected ? "transform -translate-y-8" : ""
      } ${className}`}
      style={{ transform: `rotate(${getRotation()})` }}
      onClick={onClick}
    >
      {isRevealed ? (
        <div className="w-full h-full rounded-md overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-primary border-2 border-accent rounded-md flex items-center justify-center">
          <div className="text-accent text-xs text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <div>Tarot</div>
          </div>
        </div>
      )}
    </div>
  );
};
