export const metadata = {
    title: "Workout Goal Edit",
};

export default function UserWorkoutGoalEdit({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    return (
        <div>
            <h1 className="text-2xl font-bold p-2 m-2">
                This is My Body Buddy User ({id}) Workout Goal Edit page
            </h1>
        </div>
    );
}
