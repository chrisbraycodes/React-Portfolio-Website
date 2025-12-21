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

// Styled container for the tools section
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

    p {
        text-align: center;
        color: ${({ theme }) => theme.text};
        margin-bottom: 2rem;
        font-size: 1.1rem;
        opacity: 0.9;
    }
`;

// Grid layout for tools
const ToolsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    justify-items: center;
    animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

// Tool card with enhanced styling
const ToolCard = styled.div`
    background: ${({ theme }) => theme.body};
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid ${({ theme }) => theme.border};
    width: 100%;
    max-width: 400px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        border-color: ${({ theme }) => theme.linkHover};
    }

    &:hover::before {
        transform: scaleX(1);
    }
`;

const ToolIcon = styled.div`
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-align: center;
    display: block;
`;

const ToolTitle = styled.h3`
    font-size: 1.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin-bottom: 1rem;
    text-align: center;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
`;

const ToolDescription = styled.p`
    color: ${({ theme }) => theme.text};
    line-height: 1.7;
    margin-bottom: 1.5rem;
    text-align: left;
    opacity: 0.9;
`;

const ToolFeatures = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 1.5rem;
`;

const ToolTag = styled.span`
    display: inline-block;
    padding: 0.375rem 0.875rem;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.linkHover};
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid ${({ theme }) => theme.border};
    transition: all 0.3s ease;

    ${ToolCard}:hover & {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-color: transparent;
    }
`;

const ToolLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 5px;
    transition: all 0.3s ease;
    margin-top: 1.5rem;

    &:hover {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-color: transparent;
    }
`;

// Tools component
const Tools = () => {
    const tools = [
        {
            icon: '📚',
            title: 'Reads',
            description: 'An enhanced reading and notes management tool with robust features for organizing your reading list, tracking progress, and managing your personal library. Built with improved functionality and a better user experience.',
            tags: ['Enhanced', 'Robust', 'Improved'],
            link: 'https://github.com/chrisbraycodes/My-Reads',
        },
        {
            icon: '👽',
            title: 'Rick & Morty Character Generator',
            description: 'A comprehensive character exploration tool featuring enhanced character data including status, species, gender, origin, and location. Interactive character selection with detailed information display and responsive design for seamless exploration of the Rick and Morty universe.',
            tags: ['Enhanced Data', 'Interactive', 'Responsive'],
            link: 'https://github.com/chrisbraycodes/RIck-and-Morty-Fetch-Web-API-Char-Gen',
        },
    ];

    return (
        <Section id="tools">
            <h2>Additional Tools & Projects</h2>
            <p>Explore these robust tools built with enhanced features and improved functionality</p>
            <ToolsGrid>
                {tools.map((tool, index) => (
                    <ToolCard key={index}>
                        <ToolIcon>{tool.icon}</ToolIcon>
                        <ToolTitle>{tool.title}</ToolTitle>
                        <ToolDescription>{tool.description}</ToolDescription>
                        <ToolFeatures>
                            {tool.tags.map((tag, tagIndex) => (
                                <ToolTag key={tagIndex}>{tag}</ToolTag>
                            ))}
                        </ToolFeatures>
                        {tool.link && (
                            <div style={{ textAlign: 'center' }}>
                                <ToolLink
                                    href={tool.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaExternalLinkAlt />
                                    View on GitHub
                                </ToolLink>
                            </div>
                        )}
                    </ToolCard>
                ))}
            </ToolsGrid>
        </Section>
    );
};

export { Tools };

