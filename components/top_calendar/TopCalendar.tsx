"use client";

import React, { useState } from 'react';
import { format, addDays, startOfWeek, startOfMonth, getMonth, getYear } from 'date-fns';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Define the top calendar component as a React functional component
const TopCalendar: React.FC = () => {
    // Define the current week state and its setter
    const [currentWeek, setCurrentWeek] = useState<Date>(startOfWeek(new Date()));

    // Generate an array of dates for the current week
    const getWeekDates = (): Date[] => {
        return Array.from({ length: 7 }, (_, index) => addDays(currentWeek, index));
    };

    // Get the current month and year
    const currentMonth = format(startOfMonth(currentWeek), 'MMMM yyyy');

    // Move to the previous week
    const handlePreviousWeek = (): void => {
        const previousWeekLastDay = addDays(currentWeek, -1);
        setCurrentWeek(startOfWeek(previousWeekLastDay)); // Start of the previous week
        setSelectedDate(previousWeekLastDay); // Select the last day of the previous week
    };

    // Move to the next week
    const handleNextWeek = (): void => {
        const nextWeekFirstDay = addDays(currentWeek, 7);
        setCurrentWeek(startOfWeek(nextWeekFirstDay)); // Start of the next week
        setSelectedDate(nextWeekFirstDay); // Select the first day of the next week
    };

    // Define the selected date state and its setter
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <div className="bg-gray-200">
            <div className="flex flex-col items-center">
                <div className="text-base font-semibold text-gray-700">{currentMonth}</div>
                <div className="flex items-center justify-between w-full px-2 py-2">
                    <button
                        onClick={handlePreviousWeek}
                        className="text-xl font-bold text-gray-600 hover:text-gray-800"
                    >
                        &lt;
                    </button>
                    <div className="flex flex-grow justify-around">
                        {getWeekDates().map((date) => (
                            <div
                                key={date.toISOString()}
                                className={`flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full cursor-pointer
                                    ${selectedDate.toDateString() === date.toDateString()
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white text-gray-800 border border-gray-300'
                                    }`}
                                onClick={() => setSelectedDate(date)}
                            >
                                <div className="text-sm sm:text-md lg:text-lg font-bold">{format(date, 'd')}</div>
                                <div className="text-xs sm:text-sm">{daysOfWeek[date.getDay()].slice(0, 3)}</div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleNextWeek}
                        className="text-2xl font-bold text-gray-600 hover:text-gray-800"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopCalendar;