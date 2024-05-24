import React from 'react';

type BarGraphProps = {
    label: string;
    value: number;
    maxValue: number;
};

const BarGraph: React.FC<BarGraphProps> = ({ label, value, maxValue }) => {
    const percentage = (value / maxValue) * 100;

    return (
        <div className="w-full mb-4 px-8">
            <div className="flex justify-between mb-1">
                <span className="font-semibold">{label}</span>
                <span className="font-semibold">{value}kcal</span>
            </div>
            <div className="w-full bg-gray-300 h-6 rounded">
                {value === 0 ? (
                    <div className="bg-gray-300 h-full rounded"></div>
                ) : (
                    <div className="bg-logo-pumpkin h-full rounded" style={{ width: `${percentage}%` }}></div>
                )}
            </div>
        </div>
    );
};

export default BarGraph;
