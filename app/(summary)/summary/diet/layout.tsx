// app/(summary)/summary/diet/layout.tsx
import { ReactNode } from 'react';
import { metadata } from './diet-metadata';

interface DietLayoutProps {
    children: ReactNode;
}

export default function DietLayout({ children }: DietLayoutProps) {
    return (
        <html>
            <head>
                <title>{metadata.title}</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
