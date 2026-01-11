import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { FaTimes, FaLinkedin, FaExternalLinkAlt, FaUser, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaEnvelope, FaAward, FaCode } from 'react-icons/fa';

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
  padding: 2rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const ProfileHeader = styled.div`
  margin-bottom: 2rem;
`;

const LinkedInIcon = styled.div`
  font-size: 4rem;
  color: #0077b5;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const ProfileName = styled.h3`
  font-size: 2rem;
  color: ${({ theme }) => theme.linkHover};
  margin: 0 0 0.5rem 0;
`;

const ProfileTitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
  margin: 0 0 1rem 0;
`;

const ProfileDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin: 1.5rem 0;
  opacity: 0.9;
`;

const InfoSection = styled.div`
  background: ${({ theme }) => theme.bodySide};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  border: 1px solid ${({ theme }) => theme.border};
`;

const InfoTitle = styled.h4`
  color: ${({ theme }) => theme.text};
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0.5rem 0;
  opacity: 0.9;
`;

const LocationText = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

const SkillTag = styled.span`
  background: ${({ theme }) => theme.bodySide};
  color: ${({ theme }) => theme.text};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
`;

const ExperienceItem = styled.div`
  text-align: left;
  margin: 1rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme.bodySide};
  border-radius: 8px;
  border-left: 3px solid #0077b5;
`;

const ExperienceTitle = styled.h5`
  color: ${({ theme }) => theme.linkHover};
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
`;

const ExperienceCompany = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  margin: 0.25rem 0;
  opacity: 0.9;
`;

const ExperienceDuration = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  margin: 0.25rem 0;
  opacity: 0.7;
  font-style: italic;
`;

const EducationList = styled.div`
  text-align: left;
  margin-top: 0.5rem;
`;

const EducationItem = styled.div`
  margin: 0.75rem 0;
  padding-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.border};
`;

const EducationSchool = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  margin: 0.25rem 0;
  font-weight: 500;
`;

const EducationDegree = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  margin: 0.25rem 0;
  opacity: 0.9;
`;

const EducationPeriod = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem;
  margin: 0.25rem 0;
  opacity: 0.7;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #0077b5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: #005885;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
  }

  svg {
    font-size: 1.1rem;
  }
`;

const NoteBox = styled.div`
  background: ${({ theme }) => theme.bodySide};
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.linkHover};
  margin-top: 1.5rem;
  text-align: left;
`;

const NoteText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 0;
  line-height: 1.5;
`;

const LinkedInProfileModal = ({ isOpen, onClose, profileUrl, theme }) => {
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
    window.open(profileUrl || 'https://www.linkedin.com/in/chrisbraycodes/', '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!isOpen) return null;

  // Ensure document.body exists before creating portal
  if (typeof document === 'undefined' || !document.body) {
    return null;
  }

  const modalContent = (
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme} onClick={(e) => e.stopPropagation()}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>
            <FaLinkedin />
            LinkedIn Profile
          </ModalTitle>
          <CloseButton theme={theme} onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalContent theme={theme}>
          <ProfileHeader>
            <LinkedInIcon>
              <FaLinkedin />
            </LinkedInIcon>
            <ProfileName theme={theme}>Chris Bray</ProfileName>
            <ProfileTitle theme={theme}>Software Engineer | React Native Developer | M.S. Software Engineering (In Progress)</ProfileTitle>
            <LocationText theme={theme}>
              <FaMapMarkerAlt />
              Petaluma, California, United States
            </LocationText>
            <ProfileDescription theme={theme}>
              Software Engineer with a solid foundation in full-stack development, React, Python, and machine learning. 
              Skilled in building web and mobile apps using React Native, Firebase, and Flask. Currently pursuing an M.S. 
              in Software Engineering at California State University, Fullerton.
            </ProfileDescription>
          </ProfileHeader>

          <InfoSection theme={theme}>
            <InfoTitle theme={theme}>
              <FaCode />
              Top Skills
            </InfoTitle>
            <SkillsList>
              <SkillTag theme={theme}>Artificial Intelligence (AI)</SkillTag>
              <SkillTag theme={theme}>React Native</SkillTag>
              <SkillTag theme={theme}>Full-Stack Development</SkillTag>
              <SkillTag theme={theme}>Firebase</SkillTag>
              <SkillTag theme={theme}>Python</SkillTag>
              <SkillTag theme={theme}>Machine Learning</SkillTag>
            </SkillsList>
          </InfoSection>

          <InfoSection theme={theme}>
            <InfoTitle theme={theme}>
              <FaBriefcase />
              Current Experience
            </InfoTitle>
            <ExperienceItem theme={theme}>
              <ExperienceTitle theme={theme}>Software Engineer / Founder</ExperienceTitle>
              <ExperienceCompany theme={theme}>Unfinished-Work</ExperienceCompany>
              <ExperienceDuration theme={theme}>April 2025 - Present (9 months) • Petaluma, CA</ExperienceDuration>
              <InfoText theme={theme} style={{ textAlign: 'left', marginTop: '0.5rem' }}>
                Full-Stack Mobile & Web Application | React Native, Firebase, OpenAI API
                <br />
                Developed AI-first productivity platform with conversational AI Chat, project creation, memory, and context awareness.
              </InfoText>
            </ExperienceItem>
          </InfoSection>

          <InfoSection theme={theme}>
            <InfoTitle theme={theme}>
              <FaGraduationCap />
              Education
            </InfoTitle>
            <EducationList>
              <EducationItem theme={theme}>
                <EducationSchool theme={theme}>California State University, Fullerton</EducationSchool>
                <EducationDegree theme={theme}>Master of Science - MS, Software Engineering</EducationDegree>
                <EducationPeriod theme={theme}>August 2025 - July 2027</EducationPeriod>
              </EducationItem>
              <EducationItem theme={theme}>
                <EducationSchool theme={theme}>California State University, Monterey Bay</EducationSchool>
                <EducationDegree theme={theme}>Bachelor of Science - BS, Computer Science</EducationDegree>
                <EducationPeriod theme={theme}>January 2021 - December 2023</EducationPeriod>
              </EducationItem>
              <EducationItem theme={theme}>
                <EducationSchool theme={theme}>Udacity</EducationSchool>
                <EducationDegree theme={theme}>Data Science Nanodegree, React Nanodegree</EducationDegree>
                <EducationPeriod theme={theme}>2024 - 2025</EducationPeriod>
              </EducationItem>
            </EducationList>
          </InfoSection>

          <InfoSection theme={theme}>
            <InfoTitle theme={theme}>
              <FaAward />
              Certifications
            </InfoTitle>
            <InfoText theme={theme} style={{ textAlign: 'left' }}>
              • Advance Your Cybersecurity Career
              <br />
              • OpenAI API: Agents
              <br />
              • Thriving as a Project Manager in the Age of AI
              <br />
              • B2B Networking: Making Connections Online and Offline
              <br />
              • Resume Makeover
            </InfoText>
          </InfoSection>

          <ActionButton onClick={handleOpenInNewTab}>
            <FaLinkedin />
            View Full Profile on LinkedIn
          </ActionButton>

          <NoteBox theme={theme}>
            <NoteText theme={theme}>
              <strong>Note:</strong> LinkedIn profiles cannot be embedded in iframes due to security restrictions. 
              Click the button above to view my complete profile, including detailed work history, recommendations, and network.
            </NoteText>
          </NoteBox>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );

  return createPortal(modalContent, document.body);
};

export default LinkedInProfileModal;

