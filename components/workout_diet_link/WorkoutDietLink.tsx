import React from "react";

interface WorkoutDietLinkProps {
    workoutLink: string;
    dietLink: string;
    workoutText: string;
    dietText: string;
    workoutTextColor: string;
    dietTextColor: string;
}

const WorkoutDietLink: React.FC<WorkoutDietLinkProps> = ({
    workoutLink,
    dietLink,
    workoutText,
    dietText,
    workoutTextColor,
    dietTextColor,
}) => {
    return (
        <div className="flex justify-center space-x-4 mt-4">
            <a
                href={workoutLink}
                className={`text-center px-4 py-2 rounded hover:bg-gray-200 focus:outline-none ${workoutTextColor}`}
            >
                {workoutText}
            </a>
            <a
                href={dietLink}
                className={`text-center px-4 py-2 rounded hover:bg-gray-200 focus:outline-none ${dietTextColor}`}
            >
                {dietText}
            </a>
        </div>
    );
};

export default WorkoutDietLink;