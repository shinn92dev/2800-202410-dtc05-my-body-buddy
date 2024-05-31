import React from 'react';

type BarGraphProps = {
    label: string;
    value: number;
    maxValue: number;
    targetValue?: number;
};

const BarGraph: React.FC<BarGraphProps> = ({ label, value, maxValue, targetValue }) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const targetPercentage = targetValue ? Math.min((targetValue / maxValue) * 100, 100) : null;
    const barColor = value > maxValue * 0.83 ? "bg-logo-pumpkin" : "bg-orange";

    return (
        <div className="w-full mb-4 px-8">
            <div className="flex justify-between mb-1">
                <span className="font-semibold">{label}</span>
                <span className="font-semibold">{value}kcal</span>
            </div>
            <div className="w-full bg-gray-300 h-6 rounded relative">
                {value === 0 ? (
                    <div className="bg-gray-300 h-full rounded"></div>
                ) : (
                    <div className={`${barColor} h-full rounded`} style={{ width: `${percentage}%` }}></div>
                )}
                {targetPercentage !== null && (
                    <div
                        className="absolute top-0 left-0 h-full border-r-4 border-dark-blue"
                        style={{ left: `${targetPercentage}%` }}
                    ></div>
                )}
            </div>
        </div>
    );
};

export default BarGraph;
