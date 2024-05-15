export const metadata = {
    title: "Diet Goal Edit",
};

export default function UserDietGoalEdit({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    return (
        <div>
            <h1>This is My Body Buddy User ({id}) Diet Goal Edit page</h1>
        </div>
    );
}
