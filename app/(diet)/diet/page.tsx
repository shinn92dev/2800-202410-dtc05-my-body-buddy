import DietHomeWrapper from "@/components/diet_home/DietHomeWrapper";
import CalendarNavbar from "@/components/top_calendar/TopCalendar";

export const metadata = {
    title: "Diet Home",
};

export default function DietHome() {
    return (
        <div className="flex flex-col w-full">
            <CalendarNavbar/>
            <DietHomeWrapper />
        </div>
    );
}