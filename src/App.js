import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import { About, Projects, Contact } from './components/Sections';
import Skills from './components/Skills';
import ParticleBackground from './components/ParticleBackground';
import RootLayout from './components/Analytics.tsx';
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
    // Get theme from URL parameters or localStorage
    const getThemeFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const themeParam = urlParams.get('theme');
        if (themeParam === 'dark' || themeParam === 'light') {
            return themeParam === 'dark';
        }
        // Fallback to localStorage
        const savedMode = localStorage.getItem('isDarkMode');
        return savedMode === null ? true : savedMode === 'true';
    };

    const isDarkMode = getThemeFromURL();
    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    useEffect(() => {
        // Save current theme to localStorage
        localStorage.setItem('isDarkMode', isDarkMode);
        
        // Clean up URL parameters after theme is set
        const url = new URL(window.location);
        if (url.searchParams.has('theme')) {
            url.searchParams.delete('theme');
            window.history.replaceState({}, '', url.toString());
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        
        // Navigate to the same page with theme parameter
        const url = new URL(window.location);
        url.searchParams.set('theme', newTheme);
        window.location.href = url.toString();
    };

    return (
        <RootLayout>
            <ThemeProvider theme={currentTheme}>
                <GlobalStyles />
                <ParticleBackground />
                <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <main>
                    <SpeedInsights />
                    <About />
                    <Projects />
                    <Skills />
                    <Contact />
                </main>
                <Footer isDarkMode={isDarkMode} />
            </ThemeProvider>
        </RootLayout>
    );
};

export default App;
