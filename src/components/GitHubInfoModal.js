import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { FaTimes, FaGithub, FaStar, FaCodeBranch, FaEye, FaExternalLinkAlt } from 'react-icons/fa';

// Animation for modal appearance
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.body};
  border-radius: 15px;
  border: 4px solid ${({ theme }) => theme.linkHover};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 2px ${({ theme }) => theme.linkHover}40;
  max-width: 600px;
  max-height: 90vh;
  width: 100%;
  position: relative;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.bodySide};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background: ${({ theme }) => theme.linkHover};
    color: ${({ theme }) => theme.body};
    transform: scale(1.1);
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const RepoHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const RepoName = styled.h3`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.linkHover};
  margin: 0 0 0.5rem 0;
  word-break: break-word;
`;

const RepoDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
  line-height: 1.6;
  margin: 0.5rem 0;
`;

const RepoStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme.bodySide};
  border-radius: 8px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
`;

const StatValue = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.linkHover};
`;

const RepoInfo = styled.div`
  margin: 1rem 0;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.linkHover};
  margin-right: 0.5rem;
`;

const LanguageTag = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.linkHover};
  color: ${({ theme }) => theme.body};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
  margin: 0.25rem 0.25rem 0.25rem 0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.linkHover};
  color: ${({ theme }) => theme.body};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
  }

  svg {
    font-size: 1.1rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.text};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.text};
`;

const ErrorTitle = styled.h3`
  color: ${({ theme }) => theme.linkHover};
  margin-bottom: 1rem;
`;

const GitHubInfoModal = ({ isOpen, onClose, githubUrl, theme }) => {
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && githubUrl) {
      fetchGitHubRepo(githubUrl);
    } else {
      // Reset state when modal closes
      setRepoData(null);
      setLoading(true);
      setError(null);
    }
  }, [isOpen, githubUrl]);

  const fetchGitHubRepo = async (url) => {
    try {
      setLoading(true);
      setError(null);
      
      // Extract owner/repo from URL
      const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        throw new Error('Invalid GitHub URL');
      }

      const [, owner, repo] = match;
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      setRepoData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching GitHub repo:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOpenInNewTab = () => {
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen || !githubUrl) return null;

  // Ensure document.body exists before creating portal
  if (typeof document === 'undefined' || !document.body) {
    return null;
  }

  const modalContent = (
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme} onClick={(e) => e.stopPropagation()}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>
            <FaGithub />
            GitHub Repository
          </ModalTitle>
          <CloseButton theme={theme} onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalContent theme={theme}>
          {loading && (
            <LoadingMessage theme={theme}>
              <p>Loading repository information...</p>
            </LoadingMessage>
          )}
          
          {error && (
            <ErrorMessage theme={theme}>
              <ErrorTitle theme={theme}>Error Loading Repository</ErrorTitle>
              <p>{error}</p>
              <ActionButton theme={theme} onClick={handleOpenInNewTab}>
                <FaExternalLinkAlt />
                Open on GitHub
              </ActionButton>
            </ErrorMessage>
          )}
          
          {repoData && !loading && !error && (
            <>
              <RepoHeader>
                <RepoName theme={theme}>{repoData.full_name}</RepoName>
                {repoData.description && (
                  <RepoDescription theme={theme}>{repoData.description}</RepoDescription>
                )}
              </RepoHeader>
              
              <RepoStats theme={theme}>
                <StatItem>
                  <FaStar />
                  <StatValue theme={theme}>{repoData.stargazers_count || 0}</StatValue>
                  <span>Stars</span>
                </StatItem>
                <StatItem>
                  <FaCodeBranch />
                  <StatValue theme={theme}>{repoData.forks_count || 0}</StatValue>
                  <span>Forks</span>
                </StatItem>
                <StatItem>
                  <FaEye />
                  <StatValue theme={theme}>{repoData.watchers_count || 0}</StatValue>
                  <span>Watchers</span>
                </StatItem>
              </RepoStats>
              
              <RepoInfo>
                {repoData.language && (
                  <div style={{ marginBottom: '1rem' }}>
                    <InfoLabel theme={theme}>Language:</InfoLabel>
                    <LanguageTag theme={theme}>{repoData.language}</LanguageTag>
                  </div>
                )}
                
                {repoData.topics && repoData.topics.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <InfoLabel theme={theme}>Topics:</InfoLabel>
                    {repoData.topics.map((topic, index) => (
                      <LanguageTag key={index} theme={theme}>{topic}</LanguageTag>
                    ))}
                  </div>
                )}
                
                <div style={{ marginBottom: '1rem' }}>
                  <InfoLabel theme={theme}>Created:</InfoLabel>
                  <span>{new Date(repoData.created_at).toLocaleDateString()}</span>
                </div>
                
                {repoData.updated_at && (
                  <div style={{ marginBottom: '1rem' }}>
                    <InfoLabel theme={theme}>Last Updated:</InfoLabel>
                    <span>{new Date(repoData.updated_at).toLocaleDateString()}</span>
                  </div>
                )}
                
                {repoData.homepage && (
                  <div style={{ marginBottom: '1rem' }}>
                    <InfoLabel theme={theme}>Homepage:</InfoLabel>
                    <a 
                      href={repoData.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: theme.linkHover, textDecoration: 'none' }}
                    >
                      {repoData.homepage}
                    </a>
                  </div>
                )}
              </RepoInfo>
              
              <ActionButton theme={theme} onClick={handleOpenInNewTab}>
                <FaGithub />
                View on GitHub
              </ActionButton>
            </>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );

  return createPortal(modalContent, document.body);
};

export default GitHubInfoModal;

