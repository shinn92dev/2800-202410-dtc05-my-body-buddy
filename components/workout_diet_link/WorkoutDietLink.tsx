import React from "react";

interface WorkoutDietLinkProps {
    workoutLink: string;
    dietLink: string;
    workoutText: string;
    dietText: string;
    workoutTextColor: string;
    dietTextColor: string;
    workoutUnderline: string;
    dietUnderline: string;
}

const WorkoutDietLink: React.FC<WorkoutDietLinkProps> = ({
    workoutLink,
    dietLink,
    workoutText,
    dietText,
    workoutTextColor,
    dietTextColor,
    workoutUnderline,
    dietUnderline,
}) => {
    return (
        <div className="flex justify-center space-x-4 mt-4 relative z-20">
            <a
                href={workoutLink}
                className={`text-center font-semibold px-4 py-2 rounded hover:bg-gray-200 focus:outline-none ${workoutTextColor} ${workoutUnderline}`}
            >
                {workoutText}
            </a>
            <a
                href={dietLink}
                className={`text-center font-semibold px-4 py-2 rounded hover:bg-gray-200 focus:outline-none ${dietTextColor} ${dietUnderline}`}
            >
                {dietText}
            </a>
        </div>
    );
};

export default WorkoutDietLink;

