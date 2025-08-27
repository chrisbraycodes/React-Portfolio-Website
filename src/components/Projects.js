import React from 'react';
import styled from 'styled-components';
import Project from './Project';

// Styled container for the projects section
const Section = styled.section`
    margin-bottom: 4rem;
    padding: 2rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.background};
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    word-wrap: break-word;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h2 {
           font-size: 2.5rem;
    margin-bottom: 1rem;
    color: theme.text;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
        text-align: center;
    }
`;

// Grid layout for displaying project cards
const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    justify-items: center;
`;

// Projects component displaying a list of projects
const Projects = () => {
    const projectList = [
        {
            title: 'Text Classification Pipeline (NLP, Flask, ML)',
            description: `End-to-end machine learning pipeline using Python, spaCy, and logistic regression to classify product reviews. 
            Built TF-IDF vectorizer, trained models, and deployed via Flask with 84% accuracy.`,
            link: 'https://github.com/chrisbraycodes/nlp-product-review-classifier',
            imageSrc: '/pipeline small.jpg',
        },
        {
            title: 'MyReads – Book Tracking App (React)',
            description: `Developed a React app for managing personal book collections using the Google Books API. 
            Focused on component optimization, search latency reduction, and persistent state via localStorage.`,
            link: 'https://github.com/chrisbraycodes/My-Reads',
            imageSrc: '/my reads small.jpg',
        },

        {
            title: 'InfoRomantic – iOS Dating App (Swift + Firebase)',
            description: `Designed and developed a native iOS app for profile matching, using Firebase Auth, Firestore, and 
            dynamic layout features in Swift. Achieved 92% setup completion across 1,000+ simulations.`,
            link: 'https://github.com/chrisbraycodes/InfoRomantic-iOS-Dating-App-Using-Swift',
            imageSrc: '/infoRom small.jpg',
        },
        {
            title: 'chrisbraycodes.com – Portfolio Website (React)',
            description: `Fully responsive portfolio site built using React and styled-components. 
            Features animations, theme toggling, and clean layout optimized for hiring managers.`,
            link: 'https://github.com/chrisbraycodes/React-Portfolio-Website',
            imageSrc: '/React Portfolio Small.jpg',
        },
        ];


    return (
        <Section id="projects">
            <h2>Projects</h2>
            <ProjectsGrid>
                {projectList.map((project, index) => (
                    <Project
                        key={index} // Unique key for each project card
                        title={project.title} // Project title
                        description={project.description} // Brief project description
                        link={project.link} // Link to the project's GitHub repository
                        imageSrc={project.imageSrc} // Thumbnail image for the project
                    />
                ))}
            </ProjectsGrid>
        </Section>
    );
};

export { Projects };
