// // app/_helper/goalCalCalc.ts
// import { UserData } from "@/components/profile/Profile";

// export const goalCalCalc = (formData: UserData, setFormData: (value: React.SetStateAction<UserData>) => void) => {
//   let goalCal = 0;

//   const goalPeriod = (new Date(formData.goalDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
//   const dailyCal = 2000; // Adjust based on age, gender, etc.
//   const femaleBmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;
//   const maleBmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;

//   if (formData.weight > formData.goalWeight) {
//     // Decrease weight = work out
//     goalCal = formData.gender === "Female"
//       ? ((formData.goalWeight * 7700) / goalPeriod - femaleBmr)
//       : ((formData.goalWeight * 7700) / goalPeriod - maleBmr);
//   } else if (formData.weight < formData.goalWeight) {
//     // Increase weight = eat more
//     goalCal = formData.gender === "Female"
//       ? ((formData.goalWeight * 7700) / goalPeriod + femaleBmr)
//       : ((formData.goalWeight * 7700) / goalPeriod + maleBmr);
//   }

//   setFormData((prevData) => ({
//     ...prevData,
//     goalCal: Math.round(goalCal), // Rounding to avoid decimals
//   }));
// };
