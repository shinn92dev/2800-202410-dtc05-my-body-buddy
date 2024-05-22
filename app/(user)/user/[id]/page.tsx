"use client";

import { useState } from "react";
import Link from "next/link";

export default function User({ params }: { params: { id: string } }) {
  const { id } = params;

  // dummy data; TODO: fetch user data from db
  const [userData, setUserData] = useState({
    name: "Domingo",
    age: 300,
    gender: "Male",
    height: 180,
    weight: 80,
    goalWight: 70,
    goalDay: "2024-12-31",
  });

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
      <div className="flex justify-center m-10">
        <Link
          href={`/user/${userData.name}/edit`}
          className="bg-dark-blue rounded-md px-3 py-2 text-beige"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
