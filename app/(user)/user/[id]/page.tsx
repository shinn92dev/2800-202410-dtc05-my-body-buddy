"use client";

import { useState } from "react";

export default function User({ params }: { params: { id: string } }) {
  const { id } = params;

  // dummy data; TODO: fetch user data from db
  const [userData, setUserData] = useState({
    name: "Anthony Shin",
    age: 300,
    gender: "Male",
    height: 180,
    weight: 80,
    goalWight: 70,
    goalDday: "2024-12-31",
  });

  return (
    <div>
      <h1 className="text-2xl font-bold p-2 m-2">
        This is My Body Buddy User ({id}) page
      </h1>
      <div className="p-2 m-2 border rounded-md">
        <h2 className="font-bold text-2xl tracking-wide">Basic info</h2>
        <div>Name: {userData.name}</div>
        <div>Age: {userData.age}</div>
        <div>Gender: {userData.gender}</div>
        <div>Height: {userData.height} cm</div>
        <div>Weight: {userData.weight} kg</div>
      </div>

      <div className="p-2 m-2 border rounded-md">
        <h2 className="font-bold text-2xl tracking-wide">My Goal</h2>
        <div>
          🙌 Untill {userData.goalDday}, I will be {userData.goalWight} kg to be
          strong and healthy! 🙌
        </div>
      </div>
    </div>
  );
}
