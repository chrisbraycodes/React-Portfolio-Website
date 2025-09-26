import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FaReact,
  FaJsSquare,
  FaCss3Alt,
  FaGitAlt,
  FaAccessibleIcon,
  FaPython,
  FaCode,
  FaBrain,
  FaServer,
  FaUsers
} from 'react-icons/fa';
import {
  SiRedux,
  SiTailwindcss,
  SiGraphql,
  SiTypescript,
  SiTestinglibrary,
  SiPandas,
  SiScikitlearn,
  SiPytorch,
  SiFlask,
  SiFirebase,
  SiPostman,
  SiGithub
} from 'react-icons/si';

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

// Removed unused slideInLeft animation

const progressFill = keyframes`
    from {
        width: 0%;
    }
    to {
        width: var(--progress-width);
    }
`;

const pulse = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
`;

// Container for the skills section
const SkillsContainer = styled.section`
    margin-bottom: 4rem;
    padding: 2rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
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

// Title styling moved to SkillsContainer

// Category tabs
const CategoryTabs = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

const Tab = styled.button`
    padding: 0.75rem 1.5rem;
    border: 2px solid ${({ active, theme }) => active ? theme.linkHover : theme.border};
    background: ${({ active, theme }) => active ? theme.linkHover : 'transparent'};
    color: ${({ active, theme }) => active ? theme.body : theme.text};
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    animation: ${fadeInUp} 0.8s ease-out ${({ index }) => index * 0.1}s both;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

// Skills grid with animation
const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
`;

// Enhanced skill card with progress bar
const SkillCard = styled.div`
    background: ${({ theme }) => theme.bodySide};
    color: ${({ theme }) => theme.text};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease, background 0.3s ease, color 0.3s ease;
    position: relative;
    overflow: hidden;
    animation: ${fadeInUp} 0.8s ease-out ${({ index }) => index * 0.1}s both;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }
`;

const SkillHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const SkillIcon = styled.div`
    svg {
        font-size: 2.5rem;
        color: ${({ theme }) => theme.linkHover};
        animation: ${pulse} 2s infinite;
    }
`;

const SkillInfo = styled.div`
    flex: 1;
    text-align: left;
`;

const SkillName = styled.h3`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text};
    margin: 0 0 0.25rem 0;
    font-weight: bold;
`;

const SkillLevel = styled.span`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
`;

const ProgressContainer = styled.div`
    width: 100%;
    height: 8px;
    background: ${({ theme }) => theme.border};
    border-radius: 4px;
    overflow: hidden;
    margin-top: 0.5rem;
`;

const ProgressBar = styled.div`
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    width: ${({ width }) => width}%;
    animation: ${progressFill} 2s ease-out 0.5s both;
    --progress-width: ${({ width }) => width}%;
`;

const SkillDescription = styled.p`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    line-height: 1.5;
    margin: 0;
    opacity: 0.9;
`;

// Skills component with enhanced features
const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    

    const skillCategories = {
        all: { name: 'All Skills', icon: <FaCode /> },
        frontend: { name: 'Frontend', icon: <FaCode /> },
        backend: { name: 'Backend', icon: <FaServer /> },
        ml: { name: 'ML/AI', icon: <FaBrain /> }
    };

    const skills = [
        // Frontend
        { 
            icon: <FaReact />, 
            name: 'React.js', 
            level: 'Expert',
            proficiency: 95,
            description: 'Building dynamic user interfaces with React hooks, context, and modern patterns.',
            category: 'frontend'
        },
        { 
            icon: <SiRedux />, 
            name: 'Redux', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Managing complex application state with Redux Toolkit and middleware.',
            category: 'frontend'
        },
        { 
            icon: <FaJsSquare />, 
            name: 'JavaScript', 
            level: 'Expert',
            proficiency: 95,
            description: 'ES6+, async programming, DOM manipulation, and modern JavaScript features.',
            category: 'frontend'
        },
        { 
            icon: <SiTypescript />, 
            name: 'TypeScript', 
            level: 'Advanced',
            proficiency: 80,
            description: 'Type safety, interfaces, generics, and building maintainable applications.',
            category: 'frontend'
        },
        { 
            icon: <FaCss3Alt />, 
            name: 'CSS', 
            level: 'Expert',
            proficiency: 90,
            description: 'Flexbox, Grid, animations, responsive design, and CSS-in-JS solutions.',
            category: 'frontend'
        },
        { 
            icon: <SiTailwindcss />, 
            name: 'TailwindCSS', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Utility-first CSS framework for rapid UI development.',
            category: 'frontend'
        },
        { 
            icon: <SiGraphql />, 
            name: 'GraphQL', 
            level: 'Intermediate',
            proficiency: 70,
            description: 'Efficient data fetching with precise queries and mutations.',
            category: 'frontend'
        },
        { 
            icon: <FaAccessibleIcon />, 
            name: 'Accessibility', 
            level: 'Advanced',
            proficiency: 80,
            description: 'WCAG guidelines, screen readers, and inclusive design practices.',
            category: 'frontend'
        },

        // Backend
        { 
            icon: <SiFlask />, 
            name: 'Flask', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Lightweight Python web framework for building scalable APIs.',
            category: 'backend'
        },
        { 
            icon: <SiFirebase />, 
            name: 'Firebase', 
            level: 'Advanced',
            proficiency: 80,
            description: 'Real-time database, authentication, and cloud hosting solutions.',
            category: 'backend'
        },
        { 
            icon: <FaGitAlt />, 
            name: 'Git', 
            level: 'Expert',
            proficiency: 90,
            description: 'Version control, branching strategies, and collaborative development.',
            category: 'backend'
        },
        { 
            icon: <SiGithub />, 
            name: 'GitHub', 
            level: 'Expert',
            proficiency: 90,
            description: 'Code hosting, CI/CD, project management, and open source collaboration.',
            category: 'backend'
        },
        { 
            icon: <SiPostman />, 
            name: 'Postman', 
            level: 'Advanced',
            proficiency: 85,
            description: 'API testing, documentation, and automated testing workflows.',
            category: 'backend'
        },
        { 
            icon: <SiTestinglibrary />, 
            name: 'Testing', 
            level: 'Advanced',
            proficiency: 80,
            description: 'Unit testing, integration testing, and test-driven development.',
            category: 'backend'
        },

        // ML/AI
        { 
            icon: <FaPython />, 
            name: 'Python', 
            level: 'Expert',
            proficiency: 95,
            description: 'Core language for ML, data analysis, and backend development.',
            category: 'ml'
        },
        { 
            icon: <SiPandas />, 
            name: 'Pandas', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Data manipulation and analysis with powerful DataFrame operations.',
            category: 'ml'
        },
        { 
            icon: <SiScikitlearn />, 
            name: 'Scikit-learn', 
            level: 'Advanced',
            proficiency: 80,
            description: 'Traditional machine learning algorithms and model evaluation.',
            category: 'ml'
        },
        { 
            icon: <SiPytorch />, 
            name: 'PyTorch', 
            level: 'Intermediate',
            proficiency: 70,
            description: 'Deep learning framework for neural networks and research.',
            category: 'ml'
        },

        // Project Management
        { 
            icon: <FaUsers />, 
            name: 'Scrum', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Agile project management methodology with sprint planning, daily standups, and retrospectives.',
            category: 'backend'
        },
    ];

    // Removed unused intersection observer

    const filteredSkills = activeCategory === 'all' 
        ? skills 
        : skills.filter(skill => skill.category === activeCategory);

    return (
        <SkillsContainer id="skills">
            <h2>My Skills</h2>
            
            <CategoryTabs>
                {Object.entries(skillCategories).map(([key, category], index) => (
                    <Tab
                        key={key}
                        active={activeCategory === key}
                        onClick={() => setActiveCategory(key)}
                        index={index}
                    >
                        {category.icon} {category.name}
                    </Tab>
                ))}
            </CategoryTabs>

            <SkillsGrid>
                {filteredSkills.map((skill, index) => (
                    <SkillCard key={index} index={index}>
                        <SkillHeader>
                            <SkillIcon>
                        {skill.icon}
                            </SkillIcon>
                            <SkillInfo>
                                <SkillName>{skill.name}</SkillName>
                                <SkillLevel>{skill.level} • {skill.proficiency}%</SkillLevel>
                            </SkillInfo>
                        </SkillHeader>
                        <ProgressContainer>
                            <ProgressBar width={skill.proficiency} />
                        </ProgressContainer>
                        <SkillDescription>{skill.description}</SkillDescription>
                    </SkillCard>
                ))}
            </SkillsGrid>
        </SkillsContainer>
    );
};

export default Skills;
