import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTimes, FaDownload, FaEye } from 'react-icons/fa';

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
  background: rgba(0, 0, 0, 0.8);
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.bodySide};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 1.5rem;
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

  &:hover {
    background: ${({ theme }) => theme.linkHover};
    color: ${({ theme }) => theme.body};
    transform: scale(1.1);
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
  height: calc(90vh - 120px);
  overflow-y: auto;
`;

const PDFContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
`;

const PDFEmbed = styled.embed`
  width: 100%;
  height: 100%;
  border: none;
`;

const PDFIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.linkHover};
  color: ${({ theme }) => theme.body};
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.text};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 1.1rem;
  }
`;

const FallbackMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.text};
  text-align: center;
  padding: 2rem;

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.linkHover};
  }

  p {
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }
`;

const ResumeModal = ({ isOpen, onClose, theme }) => {
  const [pdfError, setPdfError] = useState(false);

  const handleDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Chris_Bray_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewInNewTab = () => {
    window.open('/resume.pdf', '_blank');
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme} onClick={(e) => e.stopPropagation()}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>Resume</ModalTitle>
          <CloseButton theme={theme} onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        
        <ModalContent>
          <PDFContainer theme={theme}>
            {!pdfError ? (
              <>
                <PDFEmbed
                  src="/resume.pdf#toolbar=1&navpanes=1&scrollbar=1"
                  type="application/pdf"
                  onError={() => setPdfError(true)}
                />
                <PDFIframe
                  src="/resume.pdf"
                  title="Resume PDF"
                  style={{ display: 'none' }}
                  onError={() => setPdfError(true)}
                />
              </>
            ) : (
              <FallbackMessage theme={theme}>
                <h3>PDF Preview Not Available</h3>
                <p>Your browser doesn't support PDF preview, but you can still download or view the resume.</p>
                <ActionButtons>
                  <ActionButton theme={theme} onClick={handleViewInNewTab}>
                    <FaEye />
                    View in New Tab
                  </ActionButton>
                  <ActionButton theme={theme} onClick={handleDownload}>
                    <FaDownload />
                    Download PDF
                  </ActionButton>
                </ActionButtons>
              </FallbackMessage>
            )}
          </PDFContainer>
          
          <ActionButtons>
            <ActionButton theme={theme} onClick={handleViewInNewTab}>
              <FaEye />
              View in New Tab
            </ActionButton>
            <ActionButton theme={theme} onClick={handleDownload}>
              <FaDownload />
              Download PDF
            </ActionButton>
          </ActionButtons>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ResumeModal;
