import { headers } from "next/headers";
import { db } from "./db";

const listingAndReviews = db.listingAndReviews;

export async function connectionTest() {
    const data = await listingAndReviews.find({});
    console.log("Data from test.ts", data);
    return data;
}
