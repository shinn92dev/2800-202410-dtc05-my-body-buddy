// components/CalendarPopup.tsx

import React from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarPopupProps {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    onClose: () => void;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({ selectedDate, onDateSelect, onClose }) => {
    const handleDateChange: CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            onDateSelect(value);
        }
    };

    const handleTodayClick = () => {
        const today = new Date();
        onDateSelect(today);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <button onClick={onClose} className="mb-2 text-gray-500 hover:text-gray-800">
                    Close
                </button>
                <Calendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="react-calendar"
                />
                <div className="flex justify-center mt-2">
                    <button 
                        onClick={handleTodayClick} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarPopup;
