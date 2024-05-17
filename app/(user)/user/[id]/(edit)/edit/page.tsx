"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ObjectId } from "mongodb";
// import clientPromise from "util/mongodb";

export default function User({ params }: { params: { id: string } }) {
  const { id } = params;

  // dummy data; TODO: fetch user data from db
  // const [userData, setUserData] = useState({
  //   name: "Anthony",
  //   age: 300,
  //   gender: "Male",
  //   height: 180,
  //   weight: 80,
  //   goalWight: 70,
  //   goalDay: "2024-12-31",
  // });

  {
    /*
      interface userData {
      username: string
      age: number
      gender: string
      height: number
      weight: number
      goalWight: number
      goalDay: string
      }
      */
  }

  {
    /* 
  QUESTIONS:
1. username = id 
2. full name?
*/
  }

  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("users");

        // const user = await collection.findOne({ _id: new ObjectId(id) });
        const user = await collection.findOne({ username: "shinn92dev" }); // mock data

        if (user) {
          setUserData(user);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Fetching not possible:", error);
      }
    };

    fetchUserData();
  }, ["shinn92dev"]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  //   const response = await db
  //     .collection("users")
  //     .findOne({ _id: new ObjectId(id) });
  //   setUserData(response);
  // }

  return (
    <div className="justify-center">
      <h2 className="font-bold text-2xl tracking-wide text-center">
        My Profile
      </h2>
      <div
        id="basic-info"
        className="m-5 tracking-wide leading-8 font-semibold text-center justify-center"
      >
        👤
        <div>Name: {userData.name}</div>
        <div>Age: {userData.age}</div>
        <div>Gender: {userData.gender}</div>
        <div>Height: {userData.height} cm</div>
        <div>Weight: {userData.weight} kg</div>
        <br />
        🙌
        <div>Target Date: {userData.goalDay}</div>
        <div>Target Weight: {userData.goalWight} kg</div>
      </div>
      <div className="flex justify-center">
        <Link
          href={`/user/${userData.name}`}
          className="bg-dark-blue rounded-md px-3 py-2 text-beige"
        >
          Done
        </Link>
      </div>
    </div>
  );
}
