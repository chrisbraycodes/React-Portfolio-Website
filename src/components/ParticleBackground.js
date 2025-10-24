import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Float animation for particles
const float = keyframes`
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
    }
`;

const twinkle = keyframes`
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.2);
    }
`;

// Background container
const BackgroundContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
`;

// Floating circle particle
const FloatingCircle = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background-image: url('/circle.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    animation: ${float} ${({ duration }) => duration}s linear infinite;
    left: ${({ left }) => left}%;
    animation-delay: ${({ delay }) => delay}s;
`;

const Twinkle = styled.div`
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: ${twinkle} 2s ease-in-out infinite;
    left: ${({ left }) => left}%;
    top: ${({ top }) => top}%;
    animation-delay: ${({ delay }) => delay}s;
`;

const ParticleBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const createParticle = () => {
            if (!containerRef.current) return;

            const colors = [
                'rgba(102, 126, 234, 0.6)',
                'rgba(118, 75, 162, 0.6)',
                'rgba(255, 255, 255, 0.4)',
                'rgba(102, 126, 234, 0.3)',
                'rgba(118, 75, 162, 0.3)'
            ];

            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 4 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

            containerRef.current.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 20000);
        };

        // Create particles periodically
        const interval = setInterval(createParticle, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <BackgroundContainer ref={containerRef}>
            {/* Floating circles */}
            {Array.from({ length: 5 }).map((_, i) => (
                <FloatingCircle
                    key={`circle-${i}`}
                    left={Math.random() * 100}
                    duration={Math.random() * 10 + 10}
                    delay={Math.random() * 5}
                />
            ))}
            {/* Static twinkles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <Twinkle
                    key={`twinkle-${i}`}
                    left={Math.random() * 100}
                    top={Math.random() * 100}
                    delay={Math.random() * 2}
                />
            ))}
        </BackgroundContainer>
    );
};

export default ParticleBackground;
