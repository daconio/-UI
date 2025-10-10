import React from 'react';

const CONFETTI_COUNT = 80;
const COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-gold)', '#ffffff'];

const Confetti: React.FC = () => {
    return (
        <>
            <div className="absolute inset-0 overflow-visible pointer-events-none z-10">
                {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
                    <div
                        key={i}
                        className="confetti-piece"
                        style={{
                            '--start-x': `${Math.random() * 100}%`,
                            '--end-y': `${Math.random() * 800 + 400}px`, // Fall distance
                            '--rotation': `${Math.random() * 360 - 180}deg`,
                            '--scale': `${Math.random() * 0.5 + 0.5}`,
                            '--bg-color': COLORS[Math.floor(Math.random() * COLORS.length)],
                            animationDelay: `${Math.random() * 1}s`,
                            animationDuration: `${Math.random() * 2 + 2}s`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
            <style>{`
                .confetti-piece {
                    position: absolute;
                    top: -20px;
                    left: var(--start-x);
                    width: 8px;
                    height: 16px;
                    background-color: var(--bg-color);
                    opacity: 0;
                    transform: scale(var(--scale)) rotate(0deg);
                    animation-name: fall-and-fade;
                    animation-timing-function: cubic-bezier(.17,.67,.83,.67);
                    animation-fill-mode: forwards;
                }

                @keyframes fall-and-fade {
                    0% {
                        transform: translateY(-20px) scale(var(--scale)) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(var(--end-y)) scale(var(--scale)) rotate(var(--rotation));
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    );
};

export default Confetti;
