import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Project from './Project';

// Animations
const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Removed unused slide animations

// Styled container for the projects section
const Section = styled.section`
    margin-bottom: 4rem;
    padding: 2rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    background: ${({ theme }) => theme.background};
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    word-wrap: break-word;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }

    h2 {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: ${({ theme }) => theme.text};
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
        text-align: center;
        animation: ${fadeInUp} 0.8s ease-out;
    }
`;

// Grid layout for displaying project cards (kept for potential future use)
// const ProjectsGrid = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//     gap: 1.5rem;
//     justify-items: center;
// `;

// Featured project section
const FeaturedSection = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

// Regular projects section
const RegularProjectsSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    justify-items: center;
`;

// Projects component displaying a list of projects
const Projects = () => {

    const featuredProject = {
        title: 'Unfinished Work - AI-First Project Partner',
        description: `🧠 AI-first productivity platform designed for creators, builders, and thinkers. Features 7 AI modes: Daily Coach, Project Critic, Research Assistant, Health Score, Risk Analysis, Timeline Prediction, and Priority Matrix. Includes AI visual generation with DALL-E 3 for project logos, banners, and mood boards. Built with React Native/Expo, Firebase backend, OpenAI API integration, and biometric authentication (Face ID/Touch ID). Multi-platform support with iOS app live, Android and web versions in development. Subscription model: Free (5 AI interactions/month), Pro ($14.99/month), Yearly ($139.99/year), Lifetime ($399.99).`,
        link: 'https://unfinished-work.com',
        imageSrc: '/unfinished-work-featured.png',
        buttonText: 'Visit Website',
        icon: FaExternalLinkAlt,
    };

    const regularProjects = [
        {
            title: 'Text Classification Pipeline (NLP, Flask, ML)',
            description: `End-to-end machine learning pipeline using Python, spaCy, and logistic regression to classify product reviews. 
            Built TF-IDF vectorizer, trained models, and deployed via Flask with 84% accuracy.`,
            link: 'https://github.com/chrisbraycodes/nlp-product-review-classifier',
            imageSrc: '/pipeline small.jpg',
            liveDemoLink: 'https://nbviewer.org/github/chrisbraycodes/nlp-product-review-classifier/blob/master/starter/starter.ipynb',
            liveDemoText: 'View Notebook',
        },
        {
            title: 'MyReads – Book Tracking App (React)',
            description: `Developed a React app for managing personal book collections using the Google Books API. 
            Focused on component optimization, search latency reduction, and persistent state via localStorage.`,
            link: 'https://github.com/chrisbraycodes/My-Reads',
            imageSrc: '/my reads small.jpg',
            liveDemoLink: 'https://my-reads-blush.vercel.app/',
        },
        {
            title: 'InfoRomantic – iOS Dating App (Swift + Firebase)',
            description: `Designed and developed a native iOS app for profile matching, using Firebase Auth, Firestore, and 
            dynamic layout features in Swift. Achieved 92% setup completion across 1,000+ simulations.`,
            link: 'https://github.com/chrisbraycodes/InfoRomantic-iOS-Dating-App-Using-Swift',
            imageSrc: '/infoRom small.jpg',
        },
        {
            title: 'chrisbraycodes.com – Portfolio Website',
            description: `Fully responsive portfolio site built using React and styled-components. 
            Features animations, theme toggling, and clean layout optimized for hiring managers.`,
            link: 'https://github.com/chrisbraycodes/React-Portfolio-Website',
            imageSrc: '/React Portfolio Small.jpg',
        },
    ];

    return (
        <Section id="projects">
            <h2>Projects</h2>
            <FeaturedSection>
                <Project
                    title={featuredProject.title}
                    description={featuredProject.description}
                    link={featuredProject.link}
                    imageSrc={featuredProject.imageSrc}
                    buttonText={featuredProject.buttonText}
                    icon={featuredProject.icon}
                    isFeatured={true}
                />
            </FeaturedSection>
            <RegularProjectsSection>
                {regularProjects.map((project, index) => (
                    <Project
                        key={index}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                        imageSrc={project.imageSrc}
                        buttonText={project.buttonText}
                        icon={project.icon}
                        liveDemoLink={project.liveDemoLink}
                        liveDemoText={project.liveDemoText}
                    />
                ))}
            </RegularProjectsSection>
        </Section>
    );
};

export { Projects };
