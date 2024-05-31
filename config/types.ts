// Workout Related Types
export interface WorkoutDetail {
    name: string;
    calories: number;
    unit: string;
    quantity: number;
    achieved: boolean;
}

export interface Workout {
    date: Date;
    workoutDetail: WorkoutDetail[];
}

export interface WorkoutData {
    userId: string;
    workouts: Workout[];
}

export interface MealItem {
  name: string;
  quantity?: number;
  unit?: string;
  calories: number;
}

export interface DailyMeal {
  date: Date;
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
}

export interface Meal {
  userId: string;
  dailyMeals: DailyMeal[];
}