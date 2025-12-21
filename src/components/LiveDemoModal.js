import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

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

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const ErrorTitle = styled.h3`
  color: ${({ theme }) => theme.linkHover};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ErrorText = styled.p`
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const OpenInNewTabButton = styled.button`
  display: flex;
  align-items: center;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
  }

  svg {
    font-size: 1.1rem;
  }
`;

const LiveDemoModal = ({ isOpen, onClose, url, title, theme }) => {
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset error state when URL changes
    if (isOpen && url) {
      setIframeError(false);
      setLoading(true);
      
      // Check for known sites that block iframes
      const blockedDomains = ['unfinished-work.com', 'github.com'];
      const isBlockedDomain = blockedDomains.some(domain => url.includes(domain));
      
      if (isBlockedDomain) {
        // Immediately show error for known blocked sites
        setTimeout(() => {
          setIframeError(true);
          setLoading(false);
        }, 500);
        return;
      }
      
      // Set a timeout to detect if iframe fails to load (faster detection)
      const timeout = setTimeout(() => {
        // If still loading after 1.5 seconds, likely blocked
        if (loading) {
          setIframeError(true);
          setLoading(false);
        }
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [isOpen, url, loading]);

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

  const handleIframeError = () => {
    setIframeError(true);
    setLoading(false);
  };

  const handleIframeLoad = () => {
    setLoading(false);
    // Check if iframe actually loaded content or is blocked
    setTimeout(() => {
      try {
        const iframe = document.querySelector('iframe[title*="Live Demo"]');
        if (iframe && iframe.contentWindow) {
          // Try to access - will throw if blocked
          void iframe.contentWindow.location;
        }
      } catch (e) {
        // Cross-origin is normal, but if we can't access at all, might be blocked
        // For GitHub and other sites, this is expected and fine
      }
    }, 500);
  };

  const handleOpenInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!isOpen || !url) return null;

  // Ensure document.body exists before creating portal
  if (typeof document === 'undefined' || !document.body) {
    return null;
  }

  const modalContent = (
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme} onClick={(e) => e.stopPropagation()}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>{title || 'Live Demo'}</ModalTitle>
          <CloseButton theme={theme} onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <IframeContainer>
          {iframeError ? (
            <ErrorMessage theme={theme}>
              <ErrorTitle theme={theme}>Unable to Embed Site</ErrorTitle>
              <ErrorText theme={theme}>
                This website cannot be displayed in an embedded view due to security settings.
                <br />
                Click the button below to open it in a new tab instead.
              </ErrorText>
              <OpenInNewTabButton theme={theme} onClick={handleOpenInNewTab}>
                <FaExternalLinkAlt />
                Open in New Tab
              </OpenInNewTabButton>
            </ErrorMessage>
          ) : (
            <>
              {loading && (
                <ErrorMessage theme={theme}>
                  <ErrorText theme={theme}>Loading...</ErrorText>
                </ErrorMessage>
              )}
              <DemoIframe
                src={url}
                title={title || 'Live Demo'}
                allow="fullscreen"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                onError={handleIframeError}
                onLoad={handleIframeLoad}
                style={{ display: loading ? 'none' : 'block' }}
                onMouseEnter={() => {
                  // Try to detect blocking on interaction
                  setTimeout(() => {
                    try {
                      const iframe = document.querySelector('iframe[title*="Live Demo"]');
                      if (iframe && iframe.contentWindow) {
                        // This will throw if blocked
                        void iframe.contentWindow.location;
                      }
                    } catch (e) {
                      // Blocked - show error
                      if (!iframeError) {
                        setIframeError(true);
                        setLoading(false);
                      }
                    }
                  }, 100);
                }}
              />
            </>
          )}
        </IframeContainer>
      </ModalContainer>
    </ModalOverlay>
  );

  return createPortal(modalContent, document.body);
};

export default LiveDemoModal;

