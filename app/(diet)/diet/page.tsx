import DietHomeWrapper from '@/components/diet_home/DietHomeWrapper';
import authenticateUser from '@/app/_helper/authenticateUser';

export const metadata = {
    title: "Diet Home",
};

export default async function DietHome() {
    authenticateUser();

    const tempFunc = (date: Date) => console.log();

    return (
        <div className="flex flex-col w-full">
            {/* <CalendarNavbar onDateSelect={tempFunc} /> */}
            <DietHomeWrapper />
        </div>
    );
}
