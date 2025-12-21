import React from 'react';
import { Analytics } from '@vercel/analytics/react';


const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <Analytics />
        </>
    );
};



export default RootLayout;
