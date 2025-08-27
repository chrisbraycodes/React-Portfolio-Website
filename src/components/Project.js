import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

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



const ProjectImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
    margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
    font-size: 1.2rem;
    color: theme.text;
    margin: 0.5rem 0;
    text-align: center;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6); // Shadow for better readability
`;

const ProjectDescription = styled.p`
    font-size: 0.9rem;
    color: theme.text;
    line-height: 1.5;
    text-align: center;
    margin-bottom: 1rem;
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

const Project = ({ title, description, link, imageSrc }) => {
    const openNewWindow = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            console.error('No link provided for this project.');
        }
    };

    return (
        <ProjectCard>
            {imageSrc && <ProjectImage src={imageSrc} alt={`${title} thumbnail`} />}
            <ProjectTitle>{title}</ProjectTitle>
            <ProjectDescription>{description}</ProjectDescription>
            {link && (
                <ProjectLinkButton onClick={() => openNewWindow(link)}>
                    <FaGithub />
                    View on GitHub
                </ProjectLinkButton>
            )}
        </ProjectCard>
    );
};

export default Project;
