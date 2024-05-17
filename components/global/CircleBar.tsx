"use client";

import React from "react";

type CircleBarProps = {
    title: string;
    subtitle?: string;
    percent: number;
};

const CircleBar: React.FC<CircleBarProps> = ({ title, subtitle, percent }) => {
    // Calculate stroke-dasharray for the SVG circle
    const radius = 70; // radius of the circle
    const circumference = 2 * Math.PI * radius; // circumference of the circle
    const strokeDasharray = `${circumference * (percent / 100)} ${circumference}`;

    return (
        <div className="flex items-center justify-center relative w-40 h-40">
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
                    className="text-black"
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
                <span className="text-2xl font-bold">{title}</span>
                {subtitle && <span className="text-sm">{subtitle}</span>}
            </div>
        </div>
    );
};

export default CircleBar;
