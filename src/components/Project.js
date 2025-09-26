import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: theme.body;
    width: 250px;
    padding: 1rem;
    border: 1px solid theme.border;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    perspective: 1000px;
    transform-origin: center;

    &:hover {
        transform: rotateY(10deg) rotateX(5deg);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
`;

const FeaturedProjectCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, ${({ theme }) => theme.background} 0%, ${({ theme }) => theme.body} 100%);
    width: 100%;
    max-width: 600px;
    padding: 2rem;
    border: 2px solid ${({ theme }) => theme.linkHover};
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    position: relative;
    overflow: hidden;

    &::before {
        content: 'FEATURED';
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: ${({ theme }) => theme.linkHover};
        color: ${({ theme }) => theme.body};
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: bold;
        letter-spacing: 1px;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
    }
`;



const ProjectImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
    margin-bottom: 1rem;
`;

const FeaturedProjectImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProjectTitle = styled.h3`
    font-size: 1.2rem;
    color: theme.text;
    margin: 0.5rem 0;
    text-align: center;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6); // Shadow for better readability
`;

const FeaturedProjectTitle = styled.h3`
    font-size: 2rem;
    color: theme.text;
    margin: 0.5rem 0;
    text-align: center;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
    font-weight: bold;
`;

const ProjectDescription = styled.p`
    font-size: 0.9rem;
    color: theme.text;
    line-height: 1.5;
    text-align: center;
    margin-bottom: 1rem;
`;

const FeaturedProjectDescription = styled.p`
    font-size: 1.1rem;
    color: theme.text;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 1.5rem;
    max-width: 500px;
`;

const ProjectLinkButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: bold;
    color: theme.body;
    background: theme.linkHover;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    gap: 0.5rem;
    transition: background 0.3s ease, transform 0.2s ease-in-out;

    &:hover {
        background: theme.text;
        color: theme.body;
        transform: scale(1.1);
    }

    svg {
        font-size: 1rem;
    }
`;

const Project = ({ title, description, link, imageSrc, buttonText = "View on GitHub", icon: Icon = FaGithub, liveDemoLink, liveDemoText = "Live Demo", isFeatured = false }) => {
    const openNewWindow = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            console.error('No link provided for this project.');
        }
    };

    if (isFeatured) {
        return (
            <FeaturedProjectCard>
                {imageSrc && <FeaturedProjectImage src={imageSrc} alt={`${title} thumbnail`} />}
                <FeaturedProjectTitle>{title}</FeaturedProjectTitle>
                <FeaturedProjectDescription>{description}</FeaturedProjectDescription>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
                    {link && (
                        <ProjectLinkButton onClick={() => openNewWindow(link)}>
                            <Icon />
                            {buttonText}
                        </ProjectLinkButton>
                    )}
                    {liveDemoLink && (
                        <ProjectLinkButton onClick={() => openNewWindow(liveDemoLink)}>
                            <FaExternalLinkAlt />
                            {liveDemoText}
                        </ProjectLinkButton>
                    )}
                </div>
            </FeaturedProjectCard>
        );
    }

    return (
        <ProjectCard>
            {imageSrc && <ProjectImage src={imageSrc} alt={`${title} thumbnail`} />}
            <ProjectTitle>{title}</ProjectTitle>
            <ProjectDescription>{description}</ProjectDescription>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                {link && (
                    <ProjectLinkButton onClick={() => openNewWindow(link)}>
                        <Icon />
                        {buttonText}
                    </ProjectLinkButton>
                )}
                {liveDemoLink && (
                    <ProjectLinkButton onClick={() => openNewWindow(liveDemoLink)}>
                        <FaExternalLinkAlt />
                        {liveDemoText}
                    </ProjectLinkButton>
                )}
            </div>
        </ProjectCard>
    );
};

export default Project;
