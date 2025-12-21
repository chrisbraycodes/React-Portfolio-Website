import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTimes } from 'react-icons/fa';

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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  max-width: 95vw;
  max-height: 95vh;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.bodySide};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
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

const IframeContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.background};
`;

const DemoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`;

const LiveDemoModal = ({ isOpen, onClose, url, title, theme }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
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

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme} onClick={(e) => e.stopPropagation()}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>{title || 'Live Demo'}</ModalTitle>
          <CloseButton theme={theme} onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <IframeContainer>
          <DemoIframe
            src={url}
            title={title || 'Live Demo'}
            allow="fullscreen"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </IframeContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LiveDemoModal;

