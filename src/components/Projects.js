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

// Helper function to convert project title to ID
const getProjectId = (title) => {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

// Projects component displaying a list of projects
const Projects = () => {

    const featuredProject = {
        title: 'Unfinished-Work - AI-First Project Partner',
        description: `🚀 AI-first productivity platform designed for creators, builders, and thinkers who want a daily AI collaborator, not just a task manager.

• Built comprehensive AI system with 10+ modes: AI Chat with conversation memory and project awareness, Daily Coach, Project Critic, Research Assistant, Progress Analyst, Health Scores, Risk Assessment, Timeline Predictions, Priority Matrix, AI Text Rewriting, and AI Visual Generation

• Implemented AI Cost Optimization achieving 90%+ reduction in operational costs through smart model selection (GPT-4o, GPT-4o-mini, GPT-3.5-turbo), 24-hour response caching (30-40% cost reduction), optimized prompts (60% shorter), and intelligent throttling

• Created DALL-E 3 integration for AI visual generation including project logos, banners, thumbnails, and mood boards with multiple artistic styles and custom prompts

• Built cross-platform solution using React Native/Expo with TypeScript, deployed on iOS with seamless sync across mobile and web platforms

• Implemented Firebase backend with Firestore database, Authentication, Cloud Functions, and Storage with biometric security (Face ID/Touch ID), local encryption, and real-time collaboration

• Created token-based subscription system with Apple StoreKit integration supporting free (100 tokens/month), Pro ($9.99/month, $99.99/year), Pro+ ($19.99/month, $199.99/year), and Ultra ($39.99/month, $399.99/year) tiers with token packages

• Built social features for user discovery, project sharing, and community engagement with comprehensive usage analytics dashboard, cost savings visualization, and responsive UI/UX with dark/light theme support

• Developed AI Chat with project creation capability - users can create projects directly through natural language conversations with context awareness and conversation memory`,
        link: 'https://unfinished-work.com',
        imageSrc: '/unfinished-work-featured.png',
        buttonText: 'Visit Website',
        icon: FaExternalLinkAlt,
        languages: ['React Native', 'Expo', 'TypeScript', 'JavaScript', 'Firebase', 'Firestore', 'OpenAI API', 'DALL-E 3', 'Apple StoreKit', 'Cloud Functions'],
    };

    const regularProjects = [
        {
            title: 'MyReads – Book Tracking App',
            description: `A modern bookshelf app that lets users search for books, organize them into shelves, and persist selections. Features Google Books API integration, Firebase authentication, user accounts, book details pages, and fully responsive design.`,
            link: 'https://github.com/chrisbraycodes/My-Reads',
            imageSrc: '/my reads small.jpg',
            liveDemoLink: 'https://my-reads-blush.vercel.app/user/Sa5k2YkdBeboba7xhp2tToix22O2',
            liveDemoText: 'Live Demo',
            languages: ['React', 'JavaScript', 'CSS', 'Firebase', 'Firestore', 'Google Books API', 'React Router'],
        },
        {
            title: 'Rick and Morty Character Explorer',
            description: `A comprehensive character exploration tool featuring character search, random character discovery, episodes display, location details, status filters, and an animated space background. Built using the Rick and Morty API.`,
            link: 'https://github.com/chrisbraycodes/RIck-and-Morty-Fetch-Web-API-Char-Gen',
            imageSrc: '/rick-and-morty-small.jpg', // TODO: Add Rick and Morty project image (space laser gun theme)
            liveDemoLink: 'https://rickandmortyapishowcaase.vercel.app/',
            liveDemoText: 'Live Demo',
            languages: ['HTML', 'CSS', 'JavaScript', 'Web API'],
        },
        {
            title: 'Text Classification Pipeline (NLP, Flask, ML)',
            description: `End-to-end machine learning pipeline using Python, spaCy, and logistic regression to classify product reviews. 
            Built TF-IDF vectorizer, trained models, and deployed via Flask with 84% accuracy.`,
            link: 'https://github.com/chrisbraycodes/nlp-product-review-classifier',
            imageSrc: '/pipeline small.jpg',
            liveDemoLink: 'https://nbviewer.org/github/chrisbraycodes/nlp-product-review-classifier/blob/master/starter/starter.ipynb',
            liveDemoText: 'View Notebook',
            languages: ['Python', 'Flask', 'spaCy', 'scikit-learn', 'NLP', 'Machine Learning'],
        },
        {
            title: 'InfoRomantic – iOS Dating App',
            description: `Designed and developed a native iOS app for profile matching, using Firebase Auth, Firestore, and 
            dynamic layout features in Swift. Achieved 92% setup completion across 1,000+ simulations.`,
            link: 'https://github.com/chrisbraycodes/InfoRomantic-iOS-Dating-App-Using-Swift',
            imageSrc: '/infoRom small.jpg',
            languages: ['Swift', 'iOS', 'Firebase', 'Firestore', 'UIKit'],
        },
        {
            title: 'chrisbraycodes.com – Portfolio Website',
            description: `Fully responsive portfolio site built using React and styled-components. 
            Features animations, theme toggling, and clean layout optimized for hiring managers.`,
            link: 'https://github.com/chrisbraycodes/React-Portfolio-Website',
            imageSrc: '/React Portfolio Small.jpg',
            languages: ['React', 'JavaScript', 'TypeScript', 'Styled Components', 'CSS'],
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
                    languages={featuredProject.languages}
                    projectId={getProjectId(featuredProject.title)}
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
                        languages={project.languages}
                        projectId={getProjectId(project.title)}
                    />
                ))}
            </RegularProjectsSection>
        </Section>
    );
};

export { Projects };
