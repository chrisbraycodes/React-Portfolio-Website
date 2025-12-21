import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from 'styled-components';
import GitHubProfileModal from './GitHubProfileModal';
import LinkedInProfileModal from './LinkedInProfileModal';

// Wandering light animation for the background
const fibonacciLight = keyframes`
    0% { background-position: 50% 50%; }
    8.1% { background-position: 30% 70%; }
    19.9% { background-position: 60% 30%; }
    33.7% { background-position: 20% 20%; }
    54.6% { background-position: 80% 80%; }
    67.4% { background-position: 40% 10%; }
    83.1% { background-position: 10% 40%; }
    100% { background-position: 50% 50%; }
`;

// Animation for pulsing effect on hover
const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
`;

// Footer container with dynamic animation and styling
const FooterContainer = styled.footer`
    padding: 2rem;
    text-align: center;
    background: radial-gradient(circle, #ffffff 10%, transparent 70%);
    background-size: 200% 200%;
    animation: ${fibonacciLight} 40s infinite ease-in-out;
    font-family: 'Poppins', sans-serif;
    color: #000;

    p, a {
        color: #000;
        text-shadow: 1px 1px 4px rgba(255, 255, 255, 0.8); // Enhance readability
    }
`;

// Styling for footer links
const FooterLink = styled.a`
    color: #000;
    text-decoration: none;
    font-size: 1.2rem;
    margin: 0 1rem;
    display: inline-block;
    transition: all 0.3s ease-in-out;
    text-shadow: 1px 1px 4px rgba(255, 255, 255, 0.8);
    cursor: pointer;

    &:hover {
        animation: ${pulse} 0.6s ease-in-out infinite; // Add pulse effect
        transform: scale(1.2);
        color: #333;
    }
`;

const FooterLinkButton = styled.button`
    color: #000;
    text-decoration: none;
    font-size: 1.2rem;
    margin: 0 1rem;
    display: inline-block;
    transition: all 0.3s ease-in-out;
    text-shadow: 1px 1px 4px rgba(255, 255, 255, 0.8);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
        animation: ${pulse} 0.6s ease-in-out infinite; // Add pulse effect
        transform: scale(1.2);
        color: #333;
    }
`;

// Styling for footer icons
const FooterIcon = styled.a`
    display: inline-block;
    margin: 0 1rem;
    font-size: 1.5rem;
    color: #000;
    text-shadow: 1px 1px 4px rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease-in-out;

    &:hover {
        animation: ${pulse} 0.6s ease-in-out infinite; // Add pulse effect
        transform: scale(1.2);
        color: #333;
    }
`;

const FooterIconButton = styled.button`
    display: inline-block;
    margin: 0 1rem;
    font-size: 1.5rem;
    color: #000;
    text-shadow: 1px 1px 4px rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease-in-out;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
        animation: ${pulse} 0.6s ease-in-out infinite; // Add pulse effect
        transform: scale(1.2);
        color: #333;
    }
`;

// Footer component with links and icons
const Footer = () => {
    const [githubModalOpen, setGithubModalOpen] = useState(false);
    const [linkedInModalOpen, setLinkedInModalOpen] = useState(false);
    const theme = useTheme();

    return (
        <>
            <FooterContainer>
                <p>
                    Built by Christopher Bray. Connect with me on{' '}
                    <FooterLinkButton onClick={() => setGithubModalOpen(true)}>
                        GitHub
                    </FooterLinkButton>{' '}
                    and{' '}
                    <FooterLinkButton onClick={() => setLinkedInModalOpen(true)}>
                        LinkedIn
                    </FooterLinkButton>
                    .
                </p>
                <FooterIconButton onClick={() => setGithubModalOpen(true)}>
                    <i className="fab fa-github"></i>
                </FooterIconButton>
                <FooterIconButton onClick={() => setLinkedInModalOpen(true)}>
                    <i className="fab fa-linkedin"></i>
                </FooterIconButton>
            </FooterContainer>
            <GitHubProfileModal
                isOpen={githubModalOpen}
                onClose={() => setGithubModalOpen(false)}
                username="chrisbraycodes"
                theme={theme}
            />
            <LinkedInProfileModal
                isOpen={linkedInModalOpen}
                onClose={() => setLinkedInModalOpen(false)}
                profileUrl="https://www.linkedin.com/in/chrisbraycodes/"
                theme={theme}
            />
        </>
    );
};

export default Footer;
