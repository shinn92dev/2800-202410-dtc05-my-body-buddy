export const handleDateSelect = (selectedDate: Date, setDate: (date: string) => void) => {
    // Convert selected date to UTC date to avoid timezone issues
    const utcDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
    
    // Set the date state as the selected date in the format YYYY-MM-DD
    setDate(utcDate.toISOString().split("T")[0]); 
};

export const calculateNumberOfDaysLeft = (selectedDate: Date): number => {
    // Set the date state as the selected date in the format YYYY-MM-DD
    const numberOfDaysLeft = Math.ceil((new Date(selectedDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return numberOfDaysLeft;
};