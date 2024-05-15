export const metadata = {
    title: "Edit",
};

export default function UserEdit({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div>
            <h1>This is My Body Buddy User ({id}) Edit page</h1>
        </div>
    );
}
