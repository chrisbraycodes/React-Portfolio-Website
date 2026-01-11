import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import LiveDemoModal from './LiveDemoModal';
import GitHubInfoModal from './GitHubInfoModal';

const ProjectCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({ theme }) => theme.body};
    width: 250px;
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.border};
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
    color: ${({ theme }) => theme.text};
    margin: 0.5rem 0;
    text-align: center;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6); // Shadow for better readability
`;

const FeaturedProjectTitle = styled.h3`
    font-size: 2rem;
    color: ${({ theme }) => theme.text};
    margin: 0.5rem 0;
    text-align: center;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
    font-weight: bold;
`;

const ProjectDescription = styled.p`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    line-height: 1.5;
    text-align: center;
    margin-bottom: 1rem;
`;

const FeaturedProjectDescription = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
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
    color: ${({ theme }) => theme.body};
    background: ${({ theme }) => theme.linkHover};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    gap: 0.5rem;
    transition: background 0.3s ease, transform 0.2s ease-in-out;

    &:hover {
        background: ${({ theme }) => theme.text};
        color: ${({ theme }) => theme.body};
        transform: scale(1.1);
    }

    svg {
        font-size: 1rem;
    }
`;

const LanguagesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    justify-content: center;
`;

const LanguageTag = styled.span`
    background: ${({ theme }) => theme.linkHover};
    color: ${({ theme }) => theme.body};
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
`;

const Project = ({ title, description, link, imageSrc, buttonText = "View on GitHub", icon: Icon = FaGithub, liveDemoLink, liveDemoText = "Live Demo", isFeatured = false, languages = [], projectId }) => {
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const theme = useTheme();

    // Check if URL is a GitHub link
    const isGitHubLink = (url) => {
        return url && (url.includes('github.com') || url.includes('github.io'));
    };

    const openModal = (url) => {
        if (url) {
            console.log('Opening modal with URL:', url);
            setModalUrl(url);
            setIsDemoModalOpen(true);
        }
    };

    const openGitHubModal = (url) => {
        if (url) {
            setGithubUrl(url);
            setIsGitHubModalOpen(true);
        }
    };

    const handleLinkClick = (e, url) => {
        e.preventDefault();
        e.stopPropagation();
        // Debug logging
        console.log('Link clicked:', { url, isGitHub: isGitHubLink(url), title });
        // GitHub links open GitHub info modal, everything else opens iframe modal
        if (isGitHubLink(url)) {
            openGitHubModal(url);
        } else {
            openModal(url);
        }
    };

    if (isFeatured) {
        return (
            <FeaturedProjectCard id={projectId}>
                {imageSrc && <FeaturedProjectImage src={imageSrc} alt={`${title} thumbnail`} />}
                <FeaturedProjectTitle>{title}</FeaturedProjectTitle>
                <FeaturedProjectDescription>{description}</FeaturedProjectDescription>
                {languages && languages.length > 0 && (
                    <LanguagesList>
                        {languages.map((lang, index) => (
                            <LanguageTag key={index}>{lang}</LanguageTag>
                        ))}
                    </LanguagesList>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
                    {link && (
                        <ProjectLinkButton type="button" onClick={(e) => handleLinkClick(e, link)}>
                            <Icon />
                            {buttonText}
                        </ProjectLinkButton>
                    )}
                    {liveDemoLink && (
                        <ProjectLinkButton type="button" onClick={(e) => handleLinkClick(e, liveDemoLink)}>
                            <FaExternalLinkAlt />
                            {liveDemoText}
                        </ProjectLinkButton>
                    )}
                </div>
                <LiveDemoModal
                    isOpen={isDemoModalOpen}
                    onClose={() => {
                        setIsDemoModalOpen(false);
                        setModalUrl('');
                    }}
                    url={modalUrl}
                    title={title}
                    theme={theme}
                />
                <GitHubInfoModal
                    isOpen={isGitHubModalOpen}
                    onClose={() => {
                        setIsGitHubModalOpen(false);
                        setGithubUrl('');
                    }}
                    githubUrl={githubUrl}
                    theme={theme}
                />
            </FeaturedProjectCard>
        );
    }

    return (
        <>
            <ProjectCard id={projectId}>
                {imageSrc && <ProjectImage src={imageSrc} alt={`${title} thumbnail`} />}
                <ProjectTitle>{title}</ProjectTitle>
                <ProjectDescription>{description}</ProjectDescription>
                {languages && languages.length > 0 && (
                    <LanguagesList>
                        {languages.map((lang, index) => (
                            <LanguageTag key={index}>{lang}</LanguageTag>
                        ))}
                    </LanguagesList>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    {link && (
                        <ProjectLinkButton type="button" onClick={(e) => handleLinkClick(e, link)}>
                            <Icon />
                            {buttonText}
                        </ProjectLinkButton>
                    )}
                    {liveDemoLink && (
                        <ProjectLinkButton type="button" onClick={(e) => handleLinkClick(e, liveDemoLink)}>
                            <FaExternalLinkAlt />
                            {liveDemoText}
                        </ProjectLinkButton>
                    )}
                </div>
            </ProjectCard>
            <LiveDemoModal
                isOpen={isDemoModalOpen}
                onClose={() => {
                    setIsDemoModalOpen(false);
                    setModalUrl('');
                }}
                url={modalUrl}
                title={title}
                theme={theme}
            />
            <GitHubInfoModal
                isOpen={isGitHubModalOpen}
                onClose={() => {
                    setIsGitHubModalOpen(false);
                    setGithubUrl('');
                }}
                githubUrl={githubUrl}
                theme={theme}
            />
        </>
    );
};

export default Project;
