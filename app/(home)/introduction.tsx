import React from "react";

const Introduction = () => {
    return (
        <div className="text-start">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                    <span className="text-black"></span>
                    No BODY BUDDY 
                    <br />
                    No Life
                </h1>
                <div className="p-4">
                    <ul className="list-disc ml-4 text-left bg-gray-100 bg-opacity-50 rounded p-6">
                        <li>Tailored workouts and diets to meet your unique needs.
                        </li>
                        <li>Jump into fitness, no matter your starting point.
                        </li>
                        <li>Personalized AI suggestions to revolutionize your fitness experience.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
