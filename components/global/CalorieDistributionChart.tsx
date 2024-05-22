// components/CalorieDistributionChart.tsx

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    ChartOptions,
    ChartData,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface CalorieDistributionChartProps {
    breakfastCalories: number;
    lunchCalories: number;
    dinnerCalories: number;
    snackCalories: number;
    totalTargetCalories: number;
}

const CalorieDistributionChart: React.FC<CalorieDistributionChartProps> = ({
    breakfastCalories,
    lunchCalories,
    dinnerCalories,
    snackCalories,
    totalTargetCalories,
}) => {
    const totalCalories = breakfastCalories + lunchCalories + dinnerCalories + snackCalories;

    const data: ChartData<'doughnut'> = {
        labels: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
        datasets: [
            {
                data: [breakfastCalories, lunchCalories, dinnerCalories, snackCalories],
                backgroundColor: ['#525FE1', '#FFA41B', '#EE752F', '#F86F03'],
                hoverBackgroundColor: ['#3B4CC0', '#FF8C00', '#CC5F23', '#D85D00'],
                borderColor: '#FFF6F4',
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw} kcal`;
                    },
                },
            },
            datalabels: {
                color: '#FFF6F4',
                font: {
                    weight: 'bold',
                },
                formatter: (value, context) => {
                    return context.chart.data.labels?.[context.dataIndex] || '';
                },
            },
        },
        cutout: '70%',
    };

    return (
        <div className="relative w-64 h-64">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{totalCalories}kcal</span>
                <span className="text-lg">/ {totalTargetCalories}kcal</span>
            </div>
        </div>
    );
};

export default CalorieDistributionChart;
