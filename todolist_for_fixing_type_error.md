```json
📦 2800-202410-DTC05-MY-BODY-BUDDY
┣ 📂 app
┃ ┣ 📂 (authentication)
┃ ┃ ┣ 📂 login
┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┃ ┗ 📂 signup
┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┣ 📂 (diet)
┃ ┃ ┗ 📂 diet
┃ ┃ ┃ ┣ 📂 add-meals
┃ ┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┃ ┃ ┣ 📂 ai-support
┃ ┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┣ 📂 (home)
┃ ┃ ┣ 📜 button.tsx
┃ ┃ ┣ 📜 encourage.tsx
┃ ┃ ┣ 📜 logo.tsx
┃ ┃ ┗ 📜 page.tsx
┃ ┣ 📂 (profile)
┃ ┃ ┗ 📂 profile
┃ ┃ ┃ ┣ 📂 edit
┃ ┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┃ ┃ ┣ 📂 set-target
┃ ┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┣ 📂 (summary)
┃ ┃ ┗ 📂 summary
┃ ┃ ┃ ┣ 📂 diet
┃ ┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┃ ┃ ┗ 📂 workout
┃ ┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┣ 📂 (workout)
┃ ┃ ┗ 📂 workout
┃ ┃ ┃ ┣ 📂 adding
┃ ┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┃ ┃ ┣ 📂 ai-support
┃ ┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┃ ┃ ┗ 📜 page.tsx
┃ ┣ 📂 api
┃ ┃ ┣ 📂 add-meals
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 add-workout
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 delete-meal
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 get-meals
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 get-user-id
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 get-workout
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 login
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 logout
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 profile
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 signup
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 targets
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 update-achieved-status
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 update-workout-achievement
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 update-workout-to-alternative
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┣ 📂 user
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┃ ┗ 📂 workout-wrapper
┃ ┃ ┃ ┗ 📜 route.ts
┃ ┣ 📂 text
┃ ┃ ┗ 📜 page.tsx
┃ ┣ 📂 _helper
┃ ┃ ┣ 📜 authenticateUser.ts
┃ ┃ ┣ 📜 calorie.ts
┃ ┃ ┣ 📜 checkDuplicateUser.ts
┃ ┃ ┣ 📜 fetchAllUserEmailAndName.ts
┃ ┃ ┣ 📜 fetchMeals.ts
┃ ┃ ┣ 📜 fetchUserId.ts
┃ ┃ ┣ 📜 getCurrentUserInformation.ts
┃ ┃ ┣ 📜 getUserId.ts
┃ ┃ ┣ 📜 goalCalCalc.ts
┃ ┃ ┣ 📜 handleDate.ts
┃ ┃ ┣ 📜 saveNewUserToMongoDB.ts
┃ ┃ ┣ 📜 testUser.tsx
┃ ┃ ┣ 📜 users.ts
┃ ┃ ┣ 📜 validateSignupInput.ts
┃ ┃ ┗ 📜 workout.ts
┃ ┣ 📜 globals.css
┃ ┗ 📜 layout.tsx
┣ 📂 components
┃ ┣ 📂 diet_add_meals
┃ ┃ ┣ 📜 DietAddMealsWrapper.tsx
┃ ┃ ┣ 📜 MealForm.tsx
┃ ┃ ┗ 📜 MealList.tsx
┃ ┣ 📂 diet_ai_support
┃ ┃ ┣ 📜 DietAiSupportWrapper.tsx
┃ ┃ ┣ 📜 GeneratedMenu.scss
┃ ┃ ┣ 📜 GeneratedMenu.tsx
┃ ┃ ┣ 📜 PreferencesForm.tsx
┃ ┃ ┗ 📜 PreferencesSummary.tsx
┃ ┣ 📂 diet_home
┃ ┃ ┗ 📜 DietHomeWrapper.tsx
┃ ┣ 📂 diet_summary
┃ ┃ ┗ 📜 DietSummaryWrapper.tsx
┃ ┣ 📂 global
┃ ┃ ┣ 📂 icons
┃ ┃ ┃ ┣ 📜 GoogleIcon.tsx
┃ ┃ ┃ ┗ 📜 SignUpAndInIcon.tsx
┃ ┃ ┣ 📜 AddingTagBox.tsx
┃ ┃ ┣ 📜 AiLines.scss
┃ ┃ ┣ 📜 AiLines.tsx
┃ ┃ ┣ 📜 AskAiButton.tsx
┃ ┃ ┣ 📜 AverageCalorieBanner.tsx
┃ ┃ ┣ 📜 BarGraph.tsx
┃ ┃ ┣ 📜 Board.tsx
┃ ┃ ┣ 📜 BoardContent.tsx
┃ ┃ ┣ 📜 CalendarPopup.tsx
┃ ┃ ┣ 📜 CalorieDistributionChart.tsx
┃ ┃ ┣ 📜 CircleBar.tsx
┃ ┃ ┣ 📜 InputBox.tsx
┃ ┃ ┣ 📜 LoadingAnimation.scss
┃ ┃ ┣ 📜 LoadingAnimation.tsx
┃ ┃ ┣ 📜 Modal.tsx
┃ ┃ ┣ 📜 Navigation.tsx
┃ ┃ ┣ 📜 NavigationBeforeAuth.tsx
┃ ┃ ┣ 📜 NavigationFooter.tsx
┃ ┃ ┣ 📜 PolicyContent.tsx
┃ ┃ ┣ 📜 SearchWindow.tsx
┃ ┃ ┣ 📜 signOutButton.tsx
┃ ┃ ┣ 📜 TagsWithAddingField.tsx
┃ ┃ ┗ 📜 TopCalendar.tsx
┃ ┣ 📂 login
┃ ┃ ┣ 📜 LoginForm.tsx
┃ ┃ ┗ 📜 LoginWrapper.tsx
┃ ┣ 📂 profile
┃ ┃ ┣ 📜 Profile.tsx
┃ ┃ ┗ 📜 ProfileWrapper.tsx
┃ ┣ 📂 profile_edit
┃ ┃ ┗ 📜 ProfileEditWrapper.tsx
┃ ┣ 📂 profile_set_target
┃ ┃ ┣ 📜 SetTargetForm.tsx
┃ ┃ ┗ 📜 SetTargetWrapper.tsx
┃ ┣ 📂 signup
┃ ┃ ┣ 📜 SignupForm.tsx
┃ ┃ ┗ 📜 SignupWrapper.tsx
┃ ┣ 📂 summary_score_circle_bar
┃ ┃ ┗ 📜 ScoreCircleBarWrapper.tsx
┃ ┣ 📂 workout_adding
┃ ┃ ┗ 📜 WorkoutAddingWrapper.tsx
┃ ┣ 📂 workout_ai_support
┃ ┃ ┣ 📜 WorkoutAiSupportInput.scss
┃ ┃ ┣ 📜 WorkoutAiSupportInput.tsx
┃ ┃ ┗ 📜 WorkoutAiSupportWrapper.tsx
┃ ┣ 📂 workout_diet_link
┃ ┃ ┗ 📜 WorkoutDietLink.tsx
┃ ┣ 📂 workout_home
┃ ┃ ┣ 📜 WorkoutAchieved.tsx
┃ ┃ ┣ 📜 WorkoutHomeWrapper.tsx
┃ ┃ ┣ 📜 WorkoutMenuBoardContent.tsx
┃ ┃ ┣ 📜 WorkoutMenuForToday.tsx
┃ ┃ ┗ 📜 WorkoutProgress.tsx
┃ ┗ 📂 workout_summary
┃ ┃ ┗ 📜 WorkoutSummaryWrapper.tsx
┣ 📂 config
┃ ┣ 📜 db.ts
┃ ┗ 📜 types.ts
┣ 📂 lib
┃ ┗ 📜 openai.ts
┣ 📂 models
┃ ┣ 📜 Meal.ts
┃ ┣ 📜 Profile.ts
┃ ┣ 📜 Target.ts
```
