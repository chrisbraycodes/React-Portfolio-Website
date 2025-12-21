import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components'; // Import styled to fix the "no-undef" error

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: ${({ theme }) => theme.bodySide};
        color: ${({ theme }) => theme.text};
        font-family: 'Poppins', sans-serif;
        transition: background 0.3s ease, color 0.3s ease;
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${({ theme }) => theme.text};
    }

    button {
        cursor: pointer;
    }

    a {
        color: ${({ theme }) => theme.text};
        text-decoration: none;

        &:hover {
            color: ${({ theme }) => theme.linkHover};
        }
    }
`;

// SectionTitle styled component for reuse
export const SectionTitle = styled.h2`
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text}; // Text color adjusts with the theme
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6); // Subtle shadow for better readability
`;

export default GlobalStyles;
