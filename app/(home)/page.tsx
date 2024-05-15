import { connectionTest } from "../_helper/test";

export const metadata = {
    title: "HOME",
};

export default function Home() {
    const fetchData = async () => {
        const data = await connectionTest();
        console.log("Data from Home", data);
    };
    fetchData();
    return (
        <div>
            <h1 className="text-2xl font-bold p-2 m-2">
                This is My Body Buddy Home page
            </h1>
        </div>
    );
}
