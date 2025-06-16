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
            title: 'Swift iOS Dating App - "Info Romantic"',
            description: `My work on an extensive dating app was not just about coding; 
            it was about understanding human connections and enhancing them through 
            technology. Integrating Firebase for real-time updates and developing 
            a dynamic matching algorithm were highlights of this project.`,
            link: 'https://github.com/chrisbraycodes/InfoRomantic-iOS-Dating-App-Using-Swift',
            imageSrc: '/infoRom small.jpg', // Image for the project card
        },
        {
            title: 'Portfolio Website using React',
            description: `This portfolio site showcases my coding journey and the projects 
            I’ve worked on. Built with React and styled-components, it's fully responsive and 
            features interactive elements.`,
            link: 'https://github.com/chrisbraycodes/React-Portfolio-Website.git',
            imageSrc: '/React Portfolio Small.jpg', // Image for the project card
        },
        {
            title: 'React Native, iOS/Android/web Instagram Clone "instaClone"',
            description: `The instaClone project was a personal challenge to
             master cross-platform development. Here, I not only developed but
              also managed the project from inception, learning the nuances of
               deploying applications across Android, iOS, and web platforms.`,
            link: 'https://github.com/chrisbraycodes/instaClone-Instagram-Clone-using-React-Native-',
            imageSrc: '/instaClone small.jpg', // Image for the project card
        },
        // Add more projects as needed
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
