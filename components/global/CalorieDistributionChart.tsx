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
    const remainingCalories = totalTargetCalories - totalCalories;

    const data: ChartData<'doughnut'> = {
        labels: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Remaining'],
        datasets: [
            {
                data: [
                    breakfastCalories,
                    lunchCalories,
                    dinnerCalories,
                    snackCalories,
                    remainingCalories > 0 ? remainingCalories : 0,
                ],
                backgroundColor: ['#525FE1', '#FFA41B', '#EE752F', '#F86F03', 'darkgray'],
                hoverBackgroundColor: ['#3B4CC0', '#FF8C00', '#CC5F23', '#D85D00', '#FFF6F4'],
                borderColor: '#FFF6F4',
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 80,
                right: 80,
                top: 20,
                bottom: 20,
            },
        },
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
                color: (context) => {
                    const dataset = context.dataset;
                    const backgroundColor = dataset.backgroundColor;
                    return Array.isArray(backgroundColor) ? backgroundColor[context.dataIndex] : backgroundColor;
                },
                font: {
                    weight: 'bold',
                    size: 12,
                },
                formatter: (value, context) => {
                    const label = context.chart.data.labels?.[context.dataIndex] || '';
                    return value > 0 ? label : '';
                },
                anchor: 'end',
                align: 'end',
                offset: 2,
                clip: false,
            },
        },
        cutout: '70%',
    };

    return (
        <div className="relative w-full h-64">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{totalCalories}kcal</span>
                <span className="text-lg">/ {totalTargetCalories}kcal</span>
            </div>
        </div>
    );
};

export default CalorieDistributionChart;
