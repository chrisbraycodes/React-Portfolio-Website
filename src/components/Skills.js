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
  FaUsers,
  FaMobile,
  FaRobot
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
  SiGithub,
  SiReact,
  SiExpo,
  SiOpenai,
  SiNodedotjs,
  SiStyledcomponents
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
    border: 2px solid ${({ $active, theme }) => $active ? theme.linkHover : theme.border};
    background: ${({ $active, theme }) => $active ? theme.linkHover : 'transparent'};
    color: ${({ $active, theme }) => $active ? theme.body : theme.text};
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    animation: ${fadeInUp} 0.8s ease-out ${({ $index }) => $index * 0.1}s both;

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
    animation: ${fadeInUp} 0.8s ease-out ${({ $index }) => $index * 0.1}s both;

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
    margin: 0.5rem 0 0 0;
    opacity: 0.9;
`;

const ProjectsList = styled.div`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.border};
`;

const ProjectsLabel = styled.div`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin-bottom: 0.5rem;
    font-weight: 600;
`;

const ProjectLink = styled.a`
    display: inline-block;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.linkHover};
    text-decoration: none;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    padding: 0.2rem 0.5rem;
    background: ${({ theme }) => theme.bodySide};
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.linkHover};
        color: ${({ theme }) => theme.body};
        transform: translateY(-1px);
    }
`;

// Skills component with enhanced features
const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    

    const skillCategories = {
        all: { name: 'All Skills', icon: <FaCode /> },
        frontend: { name: 'Frontend', icon: <FaCode /> },
        mobile: { name: 'Mobile', icon: <FaMobile /> },
        backend: { name: 'Backend', icon: <FaServer /> },
        ai: { name: 'AI Integration', icon: <FaRobot /> },
        ml: { name: 'ML/AI', icon: <FaBrain /> }
    };

    // Project mapping - maps skill names to project titles
    const projectMapping = {
        'React.js': ['MyReads – Book Tracking App', 'chrisbraycodes.com – Portfolio Website'],
        'React Native': ['Unfinished-Work - AI-First Project Partner'],
        'Expo': ['Unfinished-Work - AI-First Project Partner'],
        'TypeScript': ['chrisbraycodes.com – Portfolio Website', 'Unfinished-Work - AI-First Project Partner'],
        'JavaScript': ['MyReads – Book Tracking App', 'Rick and Morty Character Explorer', 'chrisbraycodes.com – Portfolio Website', 'Unfinished-Work - AI-First Project Partner'],
        'CSS': ['MyReads – Book Tracking App', 'Rick and Morty Character Explorer', 'chrisbraycodes.com – Portfolio Website'],
        'Node.js': ['Unfinished-Work - AI-First Project Partner', 'MyReads – Book Tracking App', 'chrisbraycodes.com – Portfolio Website'],
        'Firebase': ['Unfinished-Work - AI-First Project Partner', 'MyReads – Book Tracking App', 'InfoRomantic – iOS Dating App'],
        'Firestore': ['Unfinished-Work - AI-First Project Partner', 'MyReads – Book Tracking App', 'InfoRomantic – iOS Dating App'],
        'OpenAI API': ['Unfinished-Work - AI-First Project Partner'],
        'DALL-E 3': ['Unfinished-Work - AI-First Project Partner'],
        'Python': ['Text Classification Pipeline (NLP, Flask, ML)'],
        'Flask': ['Text Classification Pipeline (NLP, Flask, ML)'],
        'Styled Components': ['chrisbraycodes.com – Portfolio Website'],
        'HTML': ['Rick and Morty Character Explorer'],
        'Web API': ['Rick and Morty Character Explorer'],
        'Swift': ['InfoRomantic – iOS Dating App'],
        'iOS': ['InfoRomantic – iOS Dating App'],
        'Google Books API': ['MyReads – Book Tracking App'],
        'React Router': ['MyReads – Book Tracking App'],
        'spaCy': ['Text Classification Pipeline (NLP, Flask, ML)'],
        'scikit-learn': ['Text Classification Pipeline (NLP, Flask, ML)'],
        'Machine Learning': ['Text Classification Pipeline (NLP, Flask, ML)'],
        'NLP': ['Text Classification Pipeline (NLP, Flask, ML)'],
        'Apple StoreKit': ['Unfinished-Work - AI-First Project Partner'],
        'Cloud Functions': ['Unfinished-Work - AI-First Project Partner'],
        'Git': ['Unfinished-Work - AI-First Project Partner', 'MyReads – Book Tracking App', 'Rick and Morty Character Explorer', 'Text Classification Pipeline (NLP, Flask, ML)', 'InfoRomantic – iOS Dating App', 'chrisbraycodes.com – Portfolio Website'],
        'GitHub': ['Unfinished-Work - AI-First Project Partner', 'MyReads – Book Tracking App', 'Rick and Morty Character Explorer', 'Text Classification Pipeline (NLP, Flask, ML)', 'InfoRomantic – iOS Dating App', 'chrisbraycodes.com – Portfolio Website'],
    };

    const skills = [
        // Frontend
        { 
            icon: <FaReact />, 
            name: 'React.js', 
            level: 'Expert',
            proficiency: 95,
            description: 'Building dynamic user interfaces with React hooks, context, and modern patterns.',
            category: 'frontend',
            projects: projectMapping['React.js'] || []
        },
        { 
            icon: <SiReact />, 
            name: 'React Native', 
            level: 'Expert',
            proficiency: 90,
            description: 'Cross-platform mobile development with React Native, Expo, and native modules.',
            category: 'mobile',
            projects: projectMapping['React Native'] || []
        },
        { 
            icon: <SiExpo />, 
            name: 'Expo', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Rapid mobile app development with Expo SDK, OTA updates, and deployment.',
            category: 'mobile',
            projects: projectMapping['Expo'] || []
        },
        { 
            icon: <SiRedux />, 
            name: 'Redux', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Managing complex application state with Redux Toolkit and middleware.',
            category: 'frontend',
            projects: []
        },
        { 
            icon: <FaJsSquare />, 
            name: 'JavaScript', 
            level: 'Expert',
            proficiency: 95,
            description: 'ES6+, async programming, DOM manipulation, and modern JavaScript features.',
            category: 'frontend',
            projects: projectMapping['JavaScript'] || []
        },
        { 
            icon: <SiTypescript />, 
            name: 'TypeScript', 
            level: 'Advanced',
            proficiency: 80,
            description: 'Type safety, interfaces, generics, and building maintainable applications.',
            category: 'frontend',
            projects: projectMapping['TypeScript'] || []
        },
        { 
            icon: <FaCss3Alt />, 
            name: 'CSS', 
            level: 'Expert',
            proficiency: 90,
            description: 'Flexbox, Grid, animations, responsive design, and CSS-in-JS solutions.',
            category: 'frontend',
            projects: projectMapping['CSS'] || []
        },
        { 
            icon: <SiTailwindcss />, 
            name: 'TailwindCSS', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Utility-first CSS framework for rapid UI development.',
            category: 'frontend',
            projects: []
        },
        { 
            icon: <SiGraphql />, 
            name: 'GraphQL', 
            level: 'Intermediate',
            proficiency: 70,
            description: 'Efficient data fetching with precise queries and mutations.',
            category: 'frontend',
            projects: []
        },
        { 
            icon: <FaAccessibleIcon />, 
            name: 'Accessibility', 
            level: 'Advanced',
            proficiency: 80,
            description: 'WCAG guidelines, screen readers, and inclusive design practices.',
            category: 'frontend',
            projects: []
        },
        { 
            icon: <SiStyledcomponents />, 
            name: 'Styled Components', 
            level: 'Advanced',
            proficiency: 85,
            description: 'CSS-in-JS styling with component-based design and theme systems.',
            category: 'frontend',
            projects: projectMapping['Styled Components'] || []
        },

        // Backend
        { 
            icon: <SiNodedotjs />, 
            name: 'Node.js', 
            level: 'Advanced',
            proficiency: 80,
            description: 'Server-side JavaScript runtime for building scalable backend applications and development tooling.',
            category: 'backend',
            projects: projectMapping['Node.js'] || []
        },
        { 
            icon: <SiFlask />, 
            name: 'Flask', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Lightweight Python web framework for building scalable APIs.',
            category: 'backend',
            projects: projectMapping['Flask'] || []
        },
        { 
            icon: <SiFirebase />, 
            name: 'Firebase', 
            level: 'Advanced',
            proficiency: 80,
            description: 'Real-time database, authentication, and cloud hosting solutions.',
            category: 'backend',
            projects: projectMapping['Firebase'] || []
        },
        { 
            icon: <FaGitAlt />, 
            name: 'Git', 
            level: 'Expert',
            proficiency: 90,
            description: 'Version control, branching strategies, and collaborative development.',
            category: 'backend',
            projects: projectMapping['Git'] || []
        },
        { 
            icon: <SiGithub />, 
            name: 'GitHub', 
            level: 'Expert',
            proficiency: 90,
            description: 'Code hosting, CI/CD, project management, and open source collaboration.',
            category: 'backend',
            projects: projectMapping['GitHub'] || []
        },
        { 
            icon: <SiPostman />, 
            name: 'Postman', 
            level: 'Advanced',
            proficiency: 85,
            description: 'API testing, documentation, and automated testing workflows.',
            category: 'backend',
            projects: []
        },
        { 
            icon: <SiTestinglibrary />, 
            name: 'Testing', 
            level: 'Advanced',
            proficiency: 80,
            description: 'Unit testing, integration testing, and test-driven development.',
            category: 'backend',
            projects: []
        },

        // AI Integration
        { 
            icon: <SiOpenai />, 
            name: 'OpenAI API', 
            level: 'Expert',
            proficiency: 90,
            description: 'GPT-4o and DALL-E 3 integration for AI-powered applications and visual generation.',
            category: 'ai',
            projects: projectMapping['OpenAI API'] || []
        },

        // ML/AI
        { 
            icon: <FaPython />, 
            name: 'Python', 
            level: 'Expert',
            proficiency: 95,
            description: 'Core language for ML, data analysis, and backend development.',
            category: 'ml',
            projects: projectMapping['Python'] || []
        },
        { 
            icon: <SiPandas />, 
            name: 'Pandas', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Data manipulation and analysis with powerful DataFrame operations.',
            category: 'ml',
            projects: []
        },
        { 
            icon: <SiScikitlearn />, 
            name: 'Scikit-learn', 
            level: 'Advanced',
            proficiency: 80,
            description: 'Traditional machine learning algorithms and model evaluation.',
            category: 'ml',
            projects: projectMapping['scikit-learn'] || []
        },
        { 
            icon: <SiPytorch />, 
            name: 'PyTorch', 
            level: 'Intermediate',
            proficiency: 70,
            description: 'Deep learning framework for neural networks and research.',
            category: 'ml',
            projects: []
        },

        // Project Management
        { 
            icon: <FaUsers />, 
            name: 'Scrum', 
            level: 'Advanced',
            proficiency: 85,
            description: 'Agile project management methodology with sprint planning, daily standups, and retrospectives.',
            category: 'backend',
            projects: []
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
                        $active={activeCategory === key}
                        onClick={() => setActiveCategory(key)}
                        $index={index}
                    >
                        {category.icon} {category.name}
                    </Tab>
                ))}
            </CategoryTabs>

            <SkillsGrid>
                {filteredSkills.map((skill, index) => (
                    <SkillCard key={index} $index={index}>
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
                        {skill.projects && skill.projects.length > 0 && (
                            <ProjectsList>
                                <ProjectsLabel>Used in:</ProjectsLabel>
                                {skill.projects.map((project, pIndex) => {
                                    // Convert project title to ID (same logic as in Projects.js)
                                    const projectId = project.toLowerCase()
                                        .replace(/[^a-z0-9\s-]/g, '')
                                        .replace(/\s+/g, '-')
                                        .replace(/-+/g, '-')
                                        .trim();
                                    
                                    return (
                                        <ProjectLink 
                                            key={pIndex}
                                            href={`#${projectId}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const element = document.getElementById(projectId);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                } else {
                                                    // Fallback to projects section if ID not found
                                                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }}
                                        >
                                            {project}
                                        </ProjectLink>
                                    );
                                })}
                            </ProjectsList>
                        )}
                    </SkillCard>
                ))}
            </SkillsGrid>
        </SkillsContainer>
    );
};

export default Skills;
