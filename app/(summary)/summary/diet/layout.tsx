import { ReactNode } from 'react';
import Head from 'next/head'; 
import { metadata } from './diet-metadata';

interface DietLayoutProps {
    children: ReactNode;
}

export default function DietLayout({ children }: DietLayoutProps) {
    return (
        <div>
            <Head>
                <title>{metadata.title}</title>
            </Head>
            {children}
        </div>
    );
}

