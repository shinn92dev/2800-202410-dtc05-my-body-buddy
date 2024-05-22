import React from "react";

interface WorkoutDietLinkProps {
    workoutLink: string;
    dietLink: string;
    workoutText: string;
    dietText: string;
}

const WorkoutDietLink: React.FC<WorkoutDietLinkProps> = ({
    workoutLink,
    dietLink,
    workoutText,
    dietText,
}) => {
    return (
        <div className="flex justify-center space-x-4 mt-4">
            <a href={workoutLink} className="text-center px-4 py-2 rounded hover:bg-gray-200 focus:outline-none">
                {workoutText}
            </a>
            <a href={dietLink} className="text-center px-4 py-2 rounded hover:bg-gray-200 focus:outline-none text-gray-400">
                {dietText}
            </a>
        </div>
    );
};

export default WorkoutDietLink;