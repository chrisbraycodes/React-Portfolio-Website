import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Define a simple fade and scale animation
const fadeScaleAnimation = keyframes`
    0% { 
        transform: scale(0.3); 
        opacity: 0; 
    }
    50% { 
        transform: scale(1.1); 
        opacity: 0.8; 
    }
    100% { 
        transform: scale(1); 
        opacity: 1; 
    }
`;

// Styled component for the profile image
const ProfileImage = styled(motion.img)`
    display: block;
    margin: 1rem auto;
    width: 150px;
    height: 150px;
    border-radius: 50%; // Circular shape
    border: 3px solid ${({ theme }) => theme.border}; // Dynamic border based on theme
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
    animation: ${fadeScaleAnimation} 1.5s ease-out forwards; // Simple fade and scale animation
    transform-origin: center; // Ensure scaling happens from center
`;

// Main container for the About section
const AboutSection = styled(motion.section)`
    margin-bottom: 4rem;
    padding: 2rem;
    border: 1px solid ${({ theme }) => theme.border}; // Dynamic border color
    border-radius: 8px;
    background: theme.body; // Dynamic background based on theme
    color: theme.text; // Dynamic text color
    max-width: 800px;
    margin: auto;
    text-align: center;
    word-wrap: break-word;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
    transition: background 0.3s ease, color 0.3s ease; // Smooth theme transition
`;

// Title styling for the About section
const Title = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: theme.text; // Dynamic title color
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4); // Subtle shadow for better readability
`;

// Styled paragraph for better readability
const Paragraph = styled(motion.p)`
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 0 auto;
    max-width: 700px;
    color: ${({ theme }) => theme.text}; // Ensure text color is applied

    strong {
        color: ${({ theme }) => theme.linkHover}; // Highlighted text color
    }
`;

// About component
const About = () => (
    <AboutSection
        id="about"
        initial="hidden" // Initial animation state
        whileInView="visible" // Animation triggers when in view
        viewport={{ once: true }} // Trigger animation only once
        variants={{
            hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and translate down
            visible: { opacity: 1, y: 0 }, // Animate to full opacity and original position
        }}
        transition={{ duration: 0.5 }} // Smooth transition
    >
        <Title>About Me</Title>
        <ProfileImage src="/circleNice.png" alt="Christopher Bray's Profile Picture" />
        <Paragraph
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
>
             Hi! I'm Chris Bray, a versatile <strong>Software Engineer</strong> with a passion for building data-driven, user-focused applications. I specialize in <strong>React</strong>, <strong>Python</strong>, and <strong>machine learning</strong>, and have built everything from interactive web and mobile apps to <strong>NLP pipelines</strong> and <strong>recommendation systems</strong>. I thrive on turning complex ideas into scalable, intuitive solutions.
        </Paragraph>

    </AboutSection>
);

export { About };
