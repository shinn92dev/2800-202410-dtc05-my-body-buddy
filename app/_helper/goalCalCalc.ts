import {
  formData,
  setFormData,
} from "@/components/user_profile/UserProfileEditWrapper";

// couldn't get formData from UserProfileEditWrapper.tsx
// should be updated

export const goalCalCalc = () => {
  let goalCal = 0;

  const goalPeriod = formData.goalDay - new Date().getDate();
  const dailyCal = 2000; // need set so that get from age
  const femaleBmr =
    10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;
  const maleBmr =
    10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;

  if (formData.weight > formData.goalWeight) {
    // decrease weight = work out

    if (formData.gender === "Female") {
      goalCal =
        (formData.goalWeight * 7700) / (dailyCal * goalPeriod) -
        (femaleBmr * goalPeriod) / goalPeriod;
    } else if (formData.gender === "Male") {
      goalCal =
        (formData.goalWeight * 7700) / (dailyCal * goalPeriod) -
        (maleBmr * goalPeriod) / goalPeriod;
    }
  } else if (formData.weight < formData.goalWeight) {
    // increase weight = eat more

    if (formData.gender === "Female") {
      goalCal =
        (formData.goalWeight * 7700) / (dailyCal * goalPeriod) -
        (femaleBmr * goalPeriod) / goalPeriod;
    } else if (formData.gender === "Male") {
      goalCal =
        (formData.goalWeight * 7700) / (dailyCal * goalPeriod) -
        (maleBmr * goalPeriod) / goalPeriod;
    }
  }

  setFormData((prevData) => ({
    ...prevData,
    goalCal: Math.round(goalCal), // rounding to avoid decimals
  }));
};
