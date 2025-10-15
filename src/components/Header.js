import React, { useState } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaUserTie } from 'react-icons/fa';
import GlobalStyles from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from '../theme';
import ResumeModal from './ResumeModal';

// Animation for header background
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

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: radial-gradient(circle, #ffffff 10%, transparent 70%);
  background-size: 200% 200%;
  animation: ${fibonacciLight} 120s infinite ease-in-out;
  position: relative;
  width: 100%;  // Ensure the container uses full width


  @media (max-width: 768px) {
    flex-direction: row;  // Keep layout as row for mobile
    justify-content: space-between;  // Keep left and right alignment
    padding: 0.75rem 1rem;  // Reduce padding on mobile
    width: 100%;  // Make sure it's full width
    min-height: 60px;  // Ensure consistent height
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;  // Even smaller padding on very small screens
    min-height: 55px;  // Slightly smaller height
  }
`;









const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 2rem;  // Add space between logo and icons

  @media (max-width: 768px) {
    margin-right: 0;  // Remove right margin on mobile
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.bodySide};  // Dark background for the icon box
  padding: 0.5rem 1rem;  // Space around icons
  border-radius: 10px;  // Rounded corners
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  // Optional subtle shadow for depth
  margin-top: 0.5rem;  // Lower the box slightly for better alignment

  @media (max-width: 768px) {
    margin-top: 0;  // Remove margin-top on mobile
    padding: 0.5rem;  // Adjust padding for smaller screens
    gap: 0.5rem;  // Reduce gap on mobile
    flex-wrap: wrap;  // Allow wrapping on very small screens
  }

  @media (max-width: 480px) {
    gap: 0.25rem;  // Even smaller gap on very small screens
    padding: 0.25rem 0.5rem;  // Smaller padding
  }
`;

const IconLink = styled.a`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};  // Color of icons based on theme
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.linkHover};  // Change color on hover
  }
`;

const ThemeToggle = styled.button`
    background: ${({ theme }) => theme.bodySide};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
        background: ${({ theme }) => theme.linkHover};
        color: ${({ theme }) => theme.body};
    }

    @media (max-width: 768px) {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
    }

    @media (max-width: 480px) {
        padding: 0.3rem 0.6rem;
        font-size: 0.75rem;
    }
`;

const ResumeButton = styled.button`
    background: linear-gradient(135deg, ${({ theme }) => theme.bodySide} 0%, ${({ theme }) => theme.linkHover}20 100%);
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.linkHover};
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    white-space: nowrap;
    position: relative;
    font-weight: 500;

    &:hover {
        background: ${({ theme }) => theme.linkHover};
        color: ${({ theme }) => theme.body};
        transform: translateY(-1px);
    }

    &:hover::after {
        content: 'View Resume';
        position: absolute;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%);
        background: ${({ theme }) => theme.bodySide};
        color: ${({ theme }) => theme.text};
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        border: 1px solid ${({ theme }) => theme.border};
    }

    svg {
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
        gap: 0.3rem;
    }

    @media (max-width: 480px) {
        padding: 0.3rem 0.6rem;
        font-size: 0.75rem;
        gap: 0.25rem;
        
        span {
            display: none;  // Hide text on very small screens, show only icon
        }

        &:hover::after {
            content: 'Resume';
            font-size: 0.7rem;
            bottom: -30px;
        }
    }
`;

const HamburgerButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
`;

const Nav = styled.nav`
  position: absolute;
  top: 100%; /* Position just below the header */
  right: 0;
  background: ${({ theme }) => theme.bodySide};
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-20px); /* Hidden by default */
  opacity: 0; /* Hidden by default */
  transition: all 0.3s ease-in-out;

  &.active {
    transform: translateY(0); /* Drop down when active */
    opacity: 1; /* Fully visible when active */
  }

  a {
    display: block;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    margin: 0.5rem 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = ({ toggleTheme, isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <HeaderContainer>
      <IconContainer>
        <Logo>Chris Bray - Developer Portfolio</Logo>
        </IconContainer>
        <IconContainer>
          <IconLink href="https://github.com/chrisbraycodes" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </IconLink>
          <IconLink href="https://linkedin.com/in/chrisbraycodes" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </IconLink>
          <ResumeButton onClick={() => setResumeModalOpen(true)} title="View Resume">
            <FaUserTie />
            <span>Resume</span>
          </ResumeButton>
          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? 'Day Mode' : 'Night Mode'}
          </ThemeToggle>
          <HamburgerButton onClick={() => setMenuOpen((prev) => !prev)}>☰</HamburgerButton>
        </IconContainer>
        <Nav className={menuOpen ? 'active' : ''}>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </Nav>
      </HeaderContainer>
      <ResumeModal 
        isOpen={resumeModalOpen} 
        onClose={() => setResumeModalOpen(false)} 
        theme={currentTheme}
      />
    </ThemeProvider>
  );
};

export default Header;
