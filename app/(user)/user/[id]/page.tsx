export const metadata = {
    title: "User",
};

export default function User({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div>
            <h1>This is My Body Buddy User ({id}) page</h1>
        </div>
    );
}
