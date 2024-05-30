"use client";

import React, { useState, useEffect } from "react";

type CircleBarProps = {
    title: string;
    subtitle?: string;
    percent: number;
};

const CircleBar: React.FC<CircleBarProps> = ({ title, subtitle, percent }) => {
    const [clickCount, setClickCount] = useState(0);
    const [isFlashing, setIsFlashing] = useState(false);

    useEffect(() => {
        if (clickCount === 3 && percent >= 100) {
            setIsFlashing(true);
            setTimeout(() => {
                setIsFlashing(false);
            }, 1500);
            setClickCount(0);
        }
    }, [clickCount, percent]);

    const handleClick = () => {
        setClickCount((prevCount) => prevCount + 1);
        setTimeout(() => {
            setClickCount(0);
        }, 500);
    };

    // Calculate stroke-dasharray for the SVG circle
    const radius = 70; // radius of the circle
    const circumference = 2 * Math.PI * radius; // circumference of the circle
    const percentDecimal = percent ? percent / 100 : 0;
    const strokeDasharray = `${circumference * percentDecimal} ${circumference}`;

    return (
        <div className="flex items-center justify-center relative w-40 h-40" onClick={handleClick} style={{ userSelect: 'none' }}>
            <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
                <circle
                    className="text-gray-300"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
                <circle
                    className="text-dark-blue"
                    strokeWidth="10"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                    strokeDasharray={strokeDasharray}
                />
            </svg>
            <div className="flex flex-col items-center">
                <span className={`text-2xl font-bold ${isFlashing ? 'animate-flash' : ''}`}>{title}</span>
                {subtitle && <span className="text-sm">{subtitle}</span>}
            </div>
        </div>
    );
};

export default CircleBar;
