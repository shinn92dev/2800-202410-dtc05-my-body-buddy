export const metadata = {
    title: "Goal Edit",
};

export default function UserGoalEdit({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div>
            <h1>This is My Body Buddy User ({id}) Goal Edit page</h1>
        </div>
    );
}
