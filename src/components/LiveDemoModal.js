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
      
      // Debug logging
      if (process.env.NODE_ENV === 'development') {
        console.log('LiveDemoModal URL:', url);
      }
      
      // Set a timeout to detect if iframe never loads (10 seconds)
      const timeoutId = setTimeout(() => {
        if (loading) {
          console.warn('Iframe loading timeout for:', url);
          // Don't automatically set error, as some sites take time to load
        }
      }, 10000);
      
      return () => clearTimeout(timeoutId);
    } else if (!isOpen) {
      // Reset states when modal closes
      setIframeError(false);
      setLoading(true);
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
    // Iframe loaded - hide loading indicator
    setLoading(false);
    
    // Check if iframe was redirected to a different domain
    try {
      const iframe = document.querySelector(`iframe[src="${url}"]`);
      if (iframe && iframe.contentWindow) {
        try {
          const iframeLocation = iframe.contentWindow.location.href;
          // Check if the iframe was redirected to chrisbraycodes.com or a different domain
          if (iframeLocation && !iframeLocation.includes(new URL(url).hostname)) {
            console.warn('Iframe was redirected:', iframeLocation);
            // Don't set error immediately, as some redirects might be expected
          }
        } catch (e) {
          // Cross-origin restrictions - this is normal for external sites
          // The iframe loaded, which is what matters
        }
      }
    } catch (e) {
      // Error checking iframe location - continue normally
    }
    
    setIframeError(false);
  };

  const handleOpenInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  // Debug logging
  useEffect(() => {
    if (isOpen && url) {
      console.log('LiveDemoModal opened with URL:', url);
      console.log('Expected domain:', new URL(url).hostname);
    }
  }, [isOpen, url]);

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
                key={url}
                src={url}
                title={title || 'Live Demo'}
                allow="fullscreen"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-modals allow-presentation"
                onError={handleIframeError}
                onLoad={handleIframeLoad}
                onLoadStart={() => {
                  // Reset error when iframe starts loading
                  setIframeError(false);
                }}
                style={{ 
                  display: 'block',
                  opacity: loading ? 0 : 1,
                  transition: 'opacity 0.3s ease'
                }}
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
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

