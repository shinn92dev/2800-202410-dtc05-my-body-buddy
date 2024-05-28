"use client";

import React, { useState, useEffect } from "react";
import { format, addDays, subDays, startOfWeek, startOfMonth } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import CalendarPopup from "./CalendarPopup";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface TopCalendarProps {
    onDateSelect: (date: Date) => void;
}

const TopCalendar: React.FC<TopCalendarProps> = ({ onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [currentWeek, setCurrentWeek] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showCalendarPopup, setShowCalendarPopup] = useState<boolean>(false);

    const getWeekDates = (): Date[] => {
        return Array.from({ length: 7 }, (_, index) =>
            addDays(currentWeek, index)
        );
    };

    const currentMonth = format(startOfMonth(selectedDate), "MMMM yyyy");

    const handlePreviousWeek = (): void => {
        const previousWeekStart = subDays(currentWeek, 7);
        setCurrentWeek(previousWeekStart);
        setSelectedDate(previousWeekStart);
        onDateSelect(previousWeekStart);
    };

    const handleNextWeek = (): void => {
        const nextWeekStart = addDays(currentWeek, 7);
        setCurrentWeek(nextWeekStart);
        setSelectedDate(nextWeekStart);
        onDateSelect(nextWeekStart);
    };

    const handleDateClick = (date: Date): void => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    const handleDateSelect = (date: Date): void => {
        setSelectedDate(date);
        setCurrentWeek(startOfWeek(date, { weekStartsOn: 1 }));
        setShowCalendarPopup(false);
        onDateSelect(date);
    };

    useEffect(() => {
        setCurrentDate(currentWeek);
    }, [currentWeek]);

    return (
        <div className="bg-beige">
            <div className="flex flex-col items-center">
                <div className="text-base font-semibold text-gray-700 flex items-center">
                    {currentMonth}
                    <button
                        onClick={() => setShowCalendarPopup(!showCalendarPopup)}
                        className="ml-2 text-xl text-gray-600 hover:text-gray-800"
                    >
                        <FaCalendarAlt />
                    </button>
                </div>
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
                                    ${
                                        selectedDate.toDateString() ===
                                        date.toDateString()
                                            ? "bg-dark-blue text-white"
                                            : "bg-white text-gray-800 border border-gray-300"
                                    }`}
                                onClick={() => handleDateClick(date)}
                            >
                                <div className="text-sm sm:text-md lg:text-lg font-bold">
                                    {format(date, "d")}
                                </div>
                                <div className="text-xs sm:text-sm">
                                    {daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1]}
                                </div>
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
                {showCalendarPopup && (
                    <CalendarPopup
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                        onClose={() => setShowCalendarPopup(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default TopCalendar;
