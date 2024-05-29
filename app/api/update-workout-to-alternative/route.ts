import { NextResponse } from "next/server";
import WorkoutModel from "@/models/Workout";
import { connectMongoDB } from "@/config/db";

export async function POST(req: any) {
    const data = await req.json();
    console.log(data);
    const { userId, date, selectedItems, newWorkout } = data.params;
    const deleteTargetWorkout = selectedItems.map((workout) => ({
        name: workout.name,
        calories: workout.calories,
        unit: workout.unit,
        quantity: workout.quantity,
    }));
    newWorkout.forEach((workout) => {
        workout.achieved = false;
    });
    console.log(newWorkout);
    console.log(deleteTargetWorkout, "DELETE TARGET WORKOUT");
    if (!userId || !date || !selectedItems || !newWorkout) {
        return NextResponse.json(
            { message: "Missing required parameters" },
            { status: 400 }
        );
    }
    const [year, month, day] = date.split("-").map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, day));
    console.log(dateObj);

    // Check if the user's data is found
    const targetUserWorkout = await WorkoutModel.findOne({
        userId,
    });

    if (!targetUserWorkout) {
        return NextResponse.json(
            { message: "User's workout not found" },
            { status: 404 }
        );
    }

    // Check if workout for selected date exists
    const workoutsForDate = targetUserWorkout.workouts.find(
        (workout) => workout.date.getTime() === dateObj.getTime()
    );

    if (!workoutsForDate) {
        return NextResponse.json(
            { message: "No workouts found for the given date" },
            { status: 404 }
        );
    }

    // Check if all target to delete workout exists
    const allItemsExist = deleteTargetWorkout.every((targetItem) =>
        workoutsForDate.workoutDetail.some(
            (detail) =>
                detail.name === targetItem.name &&
                detail.calories === targetItem.calories &&
                detail.unit === targetItem.unit &&
                detail.quantity === targetItem.quantity
        )
    );

    if (!allItemsExist) {
        return NextResponse.json(
            { message: "Some workout items do not exist in workoutDetail" },
            { status: 400 }
        );
    }
    try {
        const workoutIndex = targetUserWorkout.workouts.findIndex(
            (workout) => workout.date.getTime() === dateObj.getTime()
        );
        // Remove target workouts
        const deletedWorkout = await WorkoutModel.updateOne(
            {
                userId,
                [`workouts.${workoutIndex}.workoutDetail.name`]: {
                    $in: deleteTargetWorkout.map((item) => item.name),
                },
            },
            {
                $pull: {
                    [`workouts.${workoutIndex}.workoutDetail`]: {
                        $or: deleteTargetWorkout.map((workout) => ({
                            name: workout.name,
                            calories: workout.calories,
                            unit: workout.unit,
                            quantity: workout.quantity,
                        })),
                    },
                },
            },
            {
                arrayFilters: [
                    {
                        "detail.name": {
                            $in: deleteTargetWorkout.map((item) => item.name),
                        },
                    },
                ],
            }
        );
        const addedWorkout = await WorkoutModel.updateOne(
            {
                userId,
                [`workouts.${workoutIndex}._id`]: workoutsForDate._id,
            },
            {
                $push: {
                    [`workouts.${workoutIndex}.workoutDetail`]: {
                        $each: newWorkout,
                    },
                },
            }
        );

        console.log(deletedWorkout);
        console.log(addedWorkout);

        return NextResponse.json(
            { message: "Workout updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating workout:", error);
        return NextResponse.json(
            { message: "Failed to update workout" },
            { status: 500 }
        );
    }
    return NextResponse.json(
        {
            messege: "YEAH",
        },
        { status: 200 }
    );
}
