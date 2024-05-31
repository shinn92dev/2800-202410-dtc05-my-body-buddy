import DietAddItemsWrapper from "@/components/diet_add_meals/DietAddMealsWrapper";
import authenticateUser from "@/app/_helper/authenticateUser";

export const metadata = {
    title: "Diet Add Meals",
};

export default function DietAddItems() {
    authenticateUser();
    return (
        <DietAddItemsWrapper />
    );
}
