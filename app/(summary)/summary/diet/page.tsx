import DietSummaryWrapper from "@/components/diet_summary/DietSummaryWrapper";
import authenticateUser from "@/app/_helper/authenticateUser";

export const metadata = {
    title: "Diet Summary",
};

export default async function DietSummary() {
    await authenticateUser();
    return (
        <div className="flex flex-col w-full">
            <DietSummaryWrapper />
        </div>
    );
}
