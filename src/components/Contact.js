import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

// Section container with dynamic theming for layout and styling
const Section = styled(motion.section)`
    margin-bottom: 4rem;
    padding: 2rem;
    border: 1px solid them.border;
    border-radius: 8px;
    background: theme.background;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    word-wrap: break-word;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Form with responsive layout and dynamic theme-based styling
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input,
    textarea {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid theme.border;
        border-radius: 5px;
        font-size: 1rem;
        background: theme.body;
        color: theme.text;
    }

    button {
        padding: 0.8rem;
        font-size: 1rem;
        font-weight: bold;
        background: theme.linkHover;
        color: theme.body;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background: theme.text;
            color: theme.body;
        }
    }
`;

// Contact component with form submission functionality using EmailJS
const Contact = () => {
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                'service_98dg1ah', // EmailJS service ID
                'template_vbivgxt', // EmailJS template ID
                e.target,
                'waPehBttxq5phxUtm' // EmailJS user ID
            )
            .then(
                (result) => {
                    alert('Message Sent Successfully!');
                },
                (error) => {
                    alert('Failed to Send Message. Please try again.');
                }
            );
        e.target.reset();
    };

    return (
        <Section
            id="contact"
            initial="hidden" // Animation starts hidden
            whileInView="visible" // Becomes visible when scrolled into view
            viewport={{ once: true }} // Animation triggers only once
            variants={{
                hidden: { opacity: 0, y: 50 }, // Initial state: off-screen and invisible
                visible: { opacity: 1, y: 0 }, // Final state: on-screen and visible
            }}
            transition={{ duration: 0.5 }} // Smooth transition effect
        >
            <h2>Contact me at chris@chrisbraycodes.com below:</h2>
            <p>
                Have a project in mind or just want to say hi? Let’s connect and
                bring your ideas to life!
            </p>
            <Form onSubmit={sendEmail}>
                <input type="text" name="from_name" placeholder="Your Name" required />
                <input type="email" name="reply_to" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" rows="5" required />
                <button type="submit">Send Message</button>
            </Form>
        </Section>
    );
};

export default Contact;
