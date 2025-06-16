import React from 'react';
import styled from 'styled-components';
import { FaReact, FaJsSquare, FaCss3Alt, FaGitAlt, FaAccessibleIcon } from 'react-icons/fa';
import { SiRedux, SiTailwindcss, SiGraphql, SiTypescript, SiTestinglibrary } from 'react-icons/si';

// Container for the skills section
const SkillsContainer = styled.section`
    padding: 2rem 1rem;
    max-width: 800px;
     border: 1px solid ${({ theme }) => theme.border}; // Dynamic border color
    border-radius: 8px;
    margin: 0 auto;
    background: theme.body; // Matches current theme's body background

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

// Title styling
const Title = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: theme.text;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
`;

// Grid layout for skill cards
const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    justify-items: center;
    margin-top: 2rem;
`;

// Skill card with hover interaction
const SkillCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.bodySide}; // Matches light/dark mode sidebar
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }

    svg {
        font-size: 2.5rem;
        color: ${({ theme }) => theme.linkHover}; // Icon color based on theme
    }

    span {
        margin-top: 0.5rem;
        font-size: 1rem;
        color: ${({ theme }) => theme.text};
        font-weight: bold;
    }
`;

// Tooltip/modal for additional information
const Modal = styled.div`
    position: absolute;
    top: -120%; /* Positioned above the skill card */
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) =>
        theme.mode === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(0, 0, 0, 0.95)'};
    color: ${({ theme }) => theme.text};
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    z-index: 10;
    width: 250px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    ${SkillCard}:hover & {
        opacity: 1;
        visibility: visible;
    }

    p {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.5;
    }
`;

// Skills component with descriptions
const Skills = () => {
    const skills = [
        { icon: <FaReact />, name: 'React.js', description: 'Build dynamic user interfaces with React.' },
        { icon: <SiRedux />, name: 'Redux', description: 'Manage complex application state effectively.' },
        { icon: <FaJsSquare />, name: 'JavaScript', description: 'Create interactive and responsive web applications.' },
        { icon: <SiTypescript />, name: 'TypeScript', description: 'Ensure type safety and maintainable code.' },
        { icon: <FaCss3Alt />, name: 'CSS', description: 'Design visually appealing user interfaces.' },
        { icon: <SiTailwindcss />, name: 'TailwindCSS', description: 'Rapidly build custom designs.' },
        { icon: <FaGitAlt />, name: 'Git', description: 'Version control and team collaboration.' },
        { icon: <SiGraphql />, name: 'GraphQL', description: 'Fetch data efficiently with precise queries.' },
        { icon: <SiTestinglibrary />, name: 'Testing', description: 'Write tests to ensure application quality.' },
        { icon: <FaAccessibleIcon />, name: 'Accessibility', description: 'Create inclusive applications for all users.' },
    ];

    return (
        <SkillsContainer id="skills">
            <Title>My Skills</Title>
            <SkillsGrid>
                {skills.map((skill, index) => (
                    <SkillCard key={index}>
                        {skill.icon}
                        <span>{skill.name}</span>
                        <Modal>
                            <p>{skill.description}</p>
                        </Modal>
                    </SkillCard>
                ))}
            </SkillsGrid>
        </SkillsContainer>
    );
};

export default Skills;
