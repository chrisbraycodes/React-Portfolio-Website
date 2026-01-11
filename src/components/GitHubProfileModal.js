import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { FaTimes, FaGithub, FaUser, FaMapMarkerAlt, FaLink, FaBuilding, FaTwitter, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

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
  max-width: 900px;
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

const ProfileHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.linkHover};
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 2rem;
  color: ${({ theme }) => theme.linkHover};
  margin: 0 0 0.5rem 0;
`;

const ProfileUsername = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 0 0 1rem 0;
`;

const ProfileBio = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin: 1rem 0;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.bodySide};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.linkHover};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const ContributionGraph = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: ${({ theme }) => theme.bodySide};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const GraphTitle = styled.h4`
  color: ${({ theme }) => theme.text};
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
`;

const GraphImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const GraphIframe = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.body};
`;

const ReposSection = styled.div`
  margin: 2rem 0;
`;

const ReposTitle = styled.h4`
  color: ${({ theme }) => theme.text};
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
`;

const ReposGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const RepoCard = styled.div`
  background: ${({ theme }) => theme.bodySide};
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: ${({ theme }) => theme.linkHover};
  }
`;

const RepoName = styled.h5`
  color: ${({ theme }) => theme.linkHover};
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  word-break: break-word;
`;

const RepoDescription = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  opacity: 0.9;
  margin: 0.5rem 0;
  line-height: 1.4;
`;

const RepoMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
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

const GitHubProfileModal = ({ isOpen, onClose, username, theme }) => {
  const [profileData, setProfileData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && username) {
      fetchGitHubProfile(username);
    } else {
      // Reset state when modal closes
      setProfileData(null);
      setReposData([]);
      setLoading(true);
      setError(null);
    }
  }, [isOpen, username]);

  const fetchGitHubProfile = async (user) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch user profile
      const profileResponse = await fetch(`https://api.github.com/users/${user}`);
      
      if (!profileResponse.ok) {
        throw new Error(`GitHub API error: ${profileResponse.status}`);
      }
      
      const profile = await profileResponse.json();
      setProfileData(profile);
      
      // Fetch user repositories (top 6)
      const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`);
      
      if (reposResponse.ok) {
        const repos = await reposResponse.json();
        setReposData(repos);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching GitHub profile:', err);
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
    const url = profileData?.html_url || `https://github.com/${username}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Use GitHub's actual contribution graph with dates/months visible
  // Using github-contributions-api which shows dates corresponding to the green boxes
  const contributionGraphUrl = username 
    ? `https://github-contributions-api.deno.dev/${username}.svg`
    : null;

  if (!isOpen || !username) return null;

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
            GitHub Profile
          </ModalTitle>
          <CloseButton theme={theme} onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalContent theme={theme}>
          {loading && (
            <LoadingMessage theme={theme}>
              <p>Loading GitHub profile...</p>
            </LoadingMessage>
          )}
          
          {error && (
            <ErrorMessage theme={theme}>
              <ErrorTitle theme={theme}>Error Loading Profile</ErrorTitle>
              <p>{error}</p>
              <ActionButton theme={theme} onClick={handleOpenInNewTab}>
                <FaExternalLinkAlt />
                Open on GitHub
              </ActionButton>
            </ErrorMessage>
          )}
          
          {profileData && !loading && !error && (
            <>
              <ProfileHeader>
                <Avatar src={profileData.avatar_url} alt={profileData.name || username} theme={theme} />
                <ProfileInfo>
                  <ProfileName theme={theme}>{profileData.name || username}</ProfileName>
                  <ProfileUsername theme={theme}>@{profileData.login}</ProfileUsername>
                  {profileData.bio && (
                    <ProfileBio theme={theme}>{profileData.bio}</ProfileBio>
                  )}
                  <ProfileDetails>
                    {profileData.location && (
                      <DetailItem>
                        <FaMapMarkerAlt />
                        <span>{profileData.location}</span>
                      </DetailItem>
                    )}
                    {profileData.blog && (
                      <DetailItem>
                        <FaLink />
                        <a href={profileData.blog} target="_blank" rel="noopener noreferrer" style={{ color: theme.linkHover, textDecoration: 'none' }}>
                          {profileData.blog}
                        </a>
                      </DetailItem>
                    )}
                    {profileData.company && (
                      <DetailItem>
                        <FaBuilding />
                        <span>{profileData.company}</span>
                      </DetailItem>
                    )}
                    {profileData.twitter_username && (
                      <DetailItem>
                        <FaTwitter />
                        <a href={`https://twitter.com/${profileData.twitter_username}`} target="_blank" rel="noopener noreferrer" style={{ color: theme.linkHover, textDecoration: 'none' }}>
                          @{profileData.twitter_username}
                        </a>
                      </DetailItem>
                    )}
                  </ProfileDetails>
                </ProfileInfo>
              </ProfileHeader>

              <StatsContainer>
                <StatCard theme={theme}>
                  <StatValue theme={theme}>{profileData.public_repos || 0}</StatValue>
                  <StatLabel theme={theme}>Repositories</StatLabel>
                </StatCard>
                <StatCard theme={theme}>
                  <StatValue theme={theme}>{profileData.followers || 0}</StatValue>
                  <StatLabel theme={theme}>Followers</StatLabel>
                </StatCard>
                <StatCard theme={theme}>
                  <StatValue theme={theme}>{profileData.following || 0}</StatValue>
                  <StatLabel theme={theme}>Following</StatLabel>
                </StatCard>
              </StatsContainer>

              {contributionGraphUrl && (
                <ContributionGraph theme={theme}>
                  <GraphTitle theme={theme}>Contribution Activity</GraphTitle>
                  {/* Show GitHub's contribution graph with dates/months visible */}
                  {/* The SVG includes dates corresponding to the green boxes, with some dates omitted to fit */}
                  <GraphImage 
                    src={contributionGraphUrl} 
                    alt="GitHub contribution graph - shows your actual GitHub activity with dates"
                    style={{
                      width: '100%',
                      height: 'auto',
                      backgroundColor: theme.mode === 'dark' ? '#0d1117' : '#ffffff',
                      display: 'block'
                    }}
                    onError={(e) => {
                      console.error('Contribution graph image failed to load');
                      e.target.style.display = 'none';
                    }}
                  />
                </ContributionGraph>
              )}

              {reposData.length > 0 && (
                <ReposSection>
                  <ReposTitle theme={theme}>Recent Repositories</ReposTitle>
                  <ReposGrid>
                    {reposData.map((repo) => (
                      <RepoCard 
                        key={repo.id} 
                        theme={theme}
                        onClick={() => window.open(repo.html_url, '_blank', 'noopener,noreferrer')}
                      >
                        <RepoName theme={theme}>{repo.name}</RepoName>
                        {repo.description && (
                          <RepoDescription theme={theme}>{repo.description}</RepoDescription>
                        )}
                        <RepoMeta>
                          {repo.language && <span>{repo.language}</span>}
                          <span><FaStar /> {repo.stargazers_count || 0}</span>
                          <span><FaCodeBranch /> {repo.forks_count || 0}</span>
                        </RepoMeta>
                      </RepoCard>
                    ))}
                  </ReposGrid>
                </ReposSection>
              )}

              <ActionButton theme={theme} onClick={handleOpenInNewTab}>
                <FaGithub />
                View Full Profile on GitHub
              </ActionButton>
            </>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );

  return createPortal(modalContent, document.body);
};

export default GitHubProfileModal;

