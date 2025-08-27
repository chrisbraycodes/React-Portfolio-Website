import { About } from './About';
import { Projects } from './Projects';
import Skills from './Skills';
import styled from 'styled-components';
import Contact from './Contact';

// Styled Section Container for Consistency
const Section = styled.section`
    margin-bottom: 4rem;
    padding: 2rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    max-width: 1000px;
    margin: auto;
    word-wrap: break-word;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Styled Title for Sections
const SectionTitle = styled.h2`
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.mode === 'dark' ? '#ffffff' : theme.text};
`;

export { About, Contact, Projects, Skills, Section, SectionTitle };
