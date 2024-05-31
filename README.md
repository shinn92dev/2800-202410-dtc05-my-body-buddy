<div align="center">
<a href="https://two800-202410-dtc05-my-body-buddy.onrender.com/", target="_blank"><img src="/public/images/logo/my_body_buddy_logo.png" width="200px" /></a>
</div>

# My Body Buddy

## 📖Project Description

Our project, DTC-5, is developing an innovative personal health and fitness application designed to help individuals who don’t know where to start to get in shape for their healthier life with personalized workout and diet plans suggested by AI.

## 🛠️Tech Stack

<div align="center">
    <img src="https://img.shields.io/badge/React-^18.3.1-61DAFB?logo=React"/>
    <img src="https://img.shields.io/badge/React_dom-^18.3.1-0088CC?logo=ReactOS"/>
    <img src="https://img.shields.io/badge/Next.js-^14.2.3-000000?logo=Next.js"/>
    <img src="https://img.shields.io/badge/Tailwind CSS-^3.4.1-06B6D4?logo=tailwindcss"/>
    <img src="https://img.shields.io/badge/TypeScript-^5.4.5-3178C6?logo=TypeScript"/>
    <img src="https://img.shields.io/badge/clerk/nextjs-%5E5.0.12-6C47FF?logo=clerk" />
    <img src="https://img.shields.io/badge/chart.js-%5E4.4.3-FF6384?logo=chartdotjs"/>
    <img src="https://img.shields.io/badge/mongodb-%5E6.6.2-47A248?logo=mongodb"/>
    <img src="https://img.shields.io/badge/openai-%5E4.47.1-412991?logo=openai"/>
</div>

## 🔧Project installation and execution requirements

**_ TEST PART NOT DONE YET!!_**

### What Does the Developer Need to Install?

**Ensure you have the following software installed:**

#### languages:

**JavaScript/TypeScript**(The project is primarily written in TypeScript)

#### IDEs:

**Visual Studio Code**: Recommended for its extensive support for JavaScript/TypeScript and a variety of useful extensions.

#### Database:

**MongoDB** (local or cloud instance)

#### Others

-   **Node.js** (v16 or higher recommended)
-   **npm** (comes with Node.js)
-   **Git**

### Which 3rd Party APIs and Frameworks Does the Developer Need to Download?

-   **Next.js**: React framework for server-side rendering.
-   **React**: JavaScript library for building user interfaces.
-   **@clerk/nextjs**: For authentication.
-   **axios**: For making HTTP requests.
-   **date-fns**: For date manipulation.
-   **mongoose**: For MongoDB object modeling.
-   **chart.js**: For rendering charts.
-   **sass**: For styling.
-   **OpenAI API**: For AI support in generating diet plans and workout menus.
-   For more APIs and Frameworks, check [package.json](./package.json) or execute the command below
    ````sh
    npm install```
    ````

### Do They Need Any API Keys?

-   **OpenAI API Key**: Required for accessing OpenAI services.
-   **MongoDB Connection String**: Required for connecting to the MongoDB database.
-   **Clerk API Keys**: Required for authentication services.

### In Which Order Should They Install Things? Does Installation Location Matter?

1. **Install Node.js and npm**

    - Download and install Node.js from [nodejs.org](https://nodejs.org/). This will also install npm.

2. **Install Git**

    - Download and install Git from [git-scm.com](https://git-scm.com/).

3. **Clone the Repository**

    ```sh
    git clone https://github.com/your-username/2800-202410-DTC05-MY-BODY-BUDDY.git
    cd 2800-202410-DTC05-MY-BODY-BUDDY
    ```

4. **Install MongoDB**

    - Follow the instructions on the [MongoDB website](https://docs.mongodb.com/manual/installation/) to install MongoDB locally or set up a cloud instance with MongoDB Atlas.

5. **Install Dependencies**

    ```sh
    npm install
    ```

    For a complete list of dependencies, please refer to the [`package.json`](./package.json) file in the root of the project.

6. **Run the Project**

    ```sh
    npm run dev
    ```

7. **Access the Application** Open your browser and go to `http://localhost:3000` or the port you choose.

### Detailed Configuration Instructions

1. **Configure Environment Variables**

    - Create a

        ```
        .env.local
        ```

        file in the root of the project and add the following environment variables:

        ```env
        OPENAI_API_KEY=your_openai_api_key
        MONGODB_URI=your_mongodb_connection_string
        MONGODB_USERNAME=your_mongodb_username
        MONGODB_PASSWORD=your_mongodb_password
        NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
        CLERK_API_KEY=your_clerk_api_key
        NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
        NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
        ```

2. **Set Up Clerk**

    - Follow the instructions on Clerk's website to set up Clerk for authentication. Ensure your environment variables are correctly configured.

3. **Run the Development Server**

    ```sh
    npm run dev
    ```

4. **Access the Application**

    - Open your browser and go to `http://localhost:3000` to see the application in action.9. Include a link to the testing plan you have completed so the new developer can see your testing history and maybe contribute to a minor bugfix!

**Include a link to the testing plan you have completed so the new developer can see your testing history and maybe contribute to a minor bugfix!**

**_In a separate plaintext file called passwords.txt that has NOT been added to your repo, provide us with any admin/user/server login IDs and passwords. Don’t add this to your repo, especially if your repo is public! Upload this plaintext file to the 05d Dropbox in D2L._**

## 💡Product usage and features

Follow the steps to enjoy our app:

1. Sign up or log in.
2. After logged in, the profile edit page will automatically pop up.
3. Fill out all fields and click **Save**.
4. Click **Set Target** button to enter your goal weight and date.
5. Click **Submit** to save your profile information.
6. Click **Home** button on the footer navigation bar to look around summary of your diet page and work out page.
7. Click **Workout** button below the calendar to see summary of your work out page.
8. Click a specific **date** on the top calendar to see the summary of that date.
9. Click **Profile** on the right top to edit your profile info.
10. Click **Diet** button on the footer navigation bar to see your diet plan.
11. Click **Ask AI for Menu** to get a suggestion upon your preferences.
12. After click the Ask AI button, select your preference of serving numbers, ingredients to include, and other preferences.
13. Click **Generate menu** to get a suggestion.
14. Click **+** button at each Breakfast, Lunch, Dinner, Snacks part to add your own meal menu manually.
15. Fill out your own meal information.
16. Click **Add Selected Meals** and if adding meals is completed, click **Save Meals**.
17. Click **Work out** button on the footer navigation bar to see your work out plan.
18. Click **Ask AI for Generate Workout** to get a suggestion upon your personal goal.
19. Click **+** button at the Achieved part to add your own work out plan manually.
20. Select work out category and enter the information of the work out you have done.
21. Click **Add to Draft** and if adding work out is completed, click **Save Workout**.
22. Click **Sign out** button to sign out from your current account at the **Profile** menu on the right top.

## 🔎Credits, References, and Licenses

### Credits

-   Team Members: Check our team member [here](#our-team-contact-information)

### References

-   **Documentation and Tutorials:**
    -   <a href="https://nextjs.org/docs" target="_blank">Next.js Documentation</a>
    -   <a href="https://legacy.reactjs.org/docs/getting-started.html" target="_blank">React Documentation</a>
    -   <a href="https://www.mongodb.com/docs/" target="_blank">MongoDB Documentation</a>
    -   <a href="https://mongoosejs.com/docs/" target="_blank">Mongoose Documentation</a>
    -   <a href="https://platform.openai.com/docs/overview" target="_blank">OpenAI API Documentation</a>
-   **Libraries and Tools:**
    -   Next.js: Framework for building server-rendered React applications.
    -   React: Library for building user interfaces.
    -   Mongoose: MongoDB object modeling tool.
    -   axios: HTTP client for making requests.
    -   date-fns: Library for manipulating dates.
    -   chart.js: Library for creating charts.
    -   Sass: CSS preprocessor for writing more maintainable styles.

### Licenses

-   **Project License**:
    -   This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
-   **Third-Party Licenses**:
    -   <a href="https://github.com/vercel/next.js/blob/canary/license.md" target="_blank">Next.js License</a>
    -   <a href="https://github.com/facebook/react/blob/main/LICENSE" target="_blank">React License</a>
    -   <a href="https://github.com/Automattic/mongoose/blob/master/LICENSE.md" target="_blank">Mongoose License</a>
    -   <a href="https://github.com/axios/axios/blob/master/LICENSE" target="_blank">axios License</a>
    -   <a href="https://github.com/date-fns/date-fns/blob/master/LICENSE" target="_blank">date-fns License</a>
    -   <a href="https://github.com/chartjs/Chart.js/blob/master/LICENSE.md" target="_blank">chart.js License</a>
    -   <a href="https://github.com/sass/sass/blob/main/LICENSE" target="_blank">Sass License</a>

## 🤖Usage of AI

### AI Utilization in App Development

-   **AI Used**: `Chat GPT`, `OpenAI's GPT API`
-   **Sample Data Creation**: We used AI to generate sample data sets for testing and development purposes, which helped simulate real user inputs and scenarios.
-   **Getting Hints for Errors**: When encountering coding errors or issues, we used AI to get hints and suggestions for debugging and resolving the problems more efficiently.
-   **Summarize Official Documentation**: We leveraged AI to summarize lengthy official documentation, making it easier to quickly grasp key points and integrate necessary features.

### AI for Data Set Creation and Cleaning

we used AI to create data sets, especially for testing the logic before connecting to the actual database. The AI generated sample data that closely mimicked real user data, allowing us to:

-   Validate our application's functionality.
-   Ensure it behaved as expected under various scenarios.
-   Identify and fix issues early in the development process.
-   Improve the overall quality of the app.

### Usage AI in MY Body Buddy

-   **Workout Creation**: The AI suggests workout routines based on user fitness goals and current fitness levels.
-   **Workout Alternative Suggestion**: The AI suggests alternative workouts if a user wants to change their current workout routine. This ensures users have variety and can avoid monotony in their fitness regimen.
-   **Diet Plan Advice**: The AI provides users with nutritional advice and tips based on their dietary habits, goals, and dietary preferences.

### AI Limitations we encountered

-   **Information Availability**: For certain APIs or libraries, there was a lack of comprehensive information, and even when information was available, it was sometimes outdated. To overcome this, we relied on community support, online forums, and continuous testing to ensure we were implementing the most effective solutions.
-   **Response Time**: The response time from the AI API was sometimes slower than expected, which affected the user experience. We addressed this by optimizing our request handling and providing users with loading indicators to improve perceived performance.
-   **Contextual Accuracy**: The AI occasionally produced results that were not entirely accurate or contextually relevant. To mitigate this, we fine-tuned our prompts and provided additional context to improve the quality of the AI responses. We also incorporated a feedback mechanism for users to report unsatisfactory results, which helped us refine our approach over time.

## 👨‍👩‍👦‍👦Our Team (Contact information)

### Team Name: DTC-5

### Team Members:

<table>
  <tbody>
    <tr>
      <td align="center" width="150px" width="130px">
      <a href="https://github.com/shinn92dev" target="_blank">
      <img src="/public/images/our_team/anthony.jpg" width="100px;" alt="Anthony photo"/><br /><sub><b>Product Owner: <br />Anthony Shin</b></sub></a><br /></td>
      <td>Hello everyone!👋 I'm Anthony Shin from South Korea🎎 living in Vancouver!🍁 Vancouver stole my heart with its endless hiking spots.⛺ Why don't you start your journey to a healthier lifestyle with My Body Buddy?! Need some workout plans, diet tips, or just a boost of motivation? I'll get you covered!👊 Need a hand with any projects? Don't hesitate to reach out! 🚀
</td>
    </tr>
    <tr>
      <td align="center" width="150px"><a href="https://github.com/eesope"><img src="/public/images/our_team/saeyoung.jpg" width="100px;" alt="Saeyoung photo"/><br /><sub><b>Developer: 
      <br />Saeyoung Park</b></sub></a><br /></td>
      <td>Hi👋 I am CST student at BCIT🧑🏻‍💻 To have energy to make fun toy projects, I'm swimming and weight training these days 🏊🏻 Let's get some advice from My Body Buddy and get healthy living tips! 🍱</td>
    </tr>
    <tr>
      <td align="center" width="150px"><a href="https://github.com/Momona-Wada"><img src="/public/images/our_team/momo.jpeg" width="100px" alt=""/><br /><sub><b>Developer: <br />Momona Wada</b></sub></a><br /></td>
      <td>Hi🙌I'm Momona from Japan, now living in Vancouver. Recently, I lost 5kg due to some stressful time... BUT now I'm ready to start a healthier journey☘️ Want to join with me My Body Buddy? Let's get fit and healthy together!</td>
    </tr>
    <tr>
      <td align="center" width="150px"><a href="https://github.com/TatsunoriMarumo"><img src="/public/images/our_team/tatsunori.jpg" width="100px" alt=""/><br /><sub><b>Developer: <br />Tatsunori Marumo</b></sub></a><br /></td>
      <td>Hi👋 I'm Tatsunori from Japan, currently living in Vancouver. I'm a CST student at BCIT 🧑🏻‍💻. When I'm not coding, I enjoy exploring Vancouver's natural beauty. I'm excited to be a part of the My Body Buddy project and look forward to creating impactful health and fitness solutions with my team! Feel free to reach out if you'd like to connect or collaborate 🚀</td>
    </tr>
    <tr>
      <td align="center" width="150px"><a href="https://github.com/yoshidont-mind"><img src="/public/images/our_team/tatsuya.png" width="100px" alt=""/><br /><sub><b>Developer: <br />Tatsuya Yoshida</b></sub></a><br /></td>
      <td>Hi, I'm Tatsuya Yoshida from Nara, Japan🍣. I am very interested in incorporating generative AI🧠 into applications, such as using OpenAI's API. I'm eager to create software that can help people. Stay tuned to see what we can achieve with this project!🥳
</td>
    </tr>
  </tbody>
</table>

## 📦File Contents of folder

```json
📦 2800-202410-DTC05-MY-BODY-BUDDY
 ┣ 📂app // main directory
 ┃ ┣ 📂(authentication)
 ┃ ┃ ┣ 📂forgot-password
 ┃ ┃ ┃ ┣ 📜ForgotPasswordWrapper.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂signup
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(diet)
 ┃ ┃ ┗ 📂diet
 ┃ ┃ ┣ 📂add-meals
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂ai-support
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(home)
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜encourage.tsx
 ┃ ┃ ┣ 📜logo.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(profile)
 ┃ ┃ ┗ 📂profile
 ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂set-target
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(summary)
 ┃ ┃ ┗ 📂summary
 ┃ ┃ ┣ 📂diet
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂workout
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(workout)
 ┃ ┃ ┗ 📂workout
 ┃ ┃ ┣ 📂adding
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂ai-support
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📂api // Directory for api routes
 ┃ ┃ ┣ 📂add-meals
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂add-workout
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂delete-meal
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂generate-alternative
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂generate-diet-plan
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂generate-workout-menu
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂get-meals
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂get-user-id
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂get-workout
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂logout
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂targets
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂update-workout-achievement
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂update-workout-to-alternative
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┗ 📜route.ts
 ┣ 📂_helper // Directory for helper functions
 ┃ ┣ 📜authenticateUser.ts
 ┃ ┣ 📜calorie.ts
 ┃ ┣ 📜fetchMeals.ts
 ┃ ┣ 📜fetchUserId.ts
 ┃ ┣ 📜handleDate.ts
 ┃ ┣ 📜saveNewUserToMongoDB.ts
 ┃ ┗ 📜workout.ts
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┣ 📂components // Directory for components
 ┃ ┣ 📂diet_add_meals
 ┃ ┃ ┣ 📜DietAddMealsWrapper.tsx
 ┃ ┃ ┣ 📜MealForm.tsx
 ┃ ┃ ┗ 📜MealList.tsx
 ┃ ┣ 📂diet_ai_support
 ┃ ┃ ┣ 📜DietAiSupportWrapper.tsx
 ┃ ┃ ┣ 📜GeneratedMenu.scss
 ┃ ┃ ┣ 📜GeneratedMenu.tsx
 ┃ ┃ ┣ 📜PreferencesForm.tsx
 ┃ ┃ ┗ 📜PreferencesSummary.tsx
 ┃ ┣ 📂diet_home
 ┃ ┃ ┗ 📜DietHomeWrapper.tsx
 ┃ ┣ 📂diet_summary
 ┃ ┃ ┗ 📜DietSummaryWrapper.tsx
 ┃ ┣ 📂global
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┃ ┣ 📜GoogleIcon.tsx
 ┃ ┃ ┃ ┗ 📜SignUpAndInIcon.tsx
 ┃ ┃ ┣ 📜AddingTagBox.tsx
 ┃ ┃ ┣ 📜AiLines.scss
 ┃ ┃ ┣ 📜AiLines.tsx
 ┃ ┃ ┣ 📜AskAiButton.tsx
 ┃ ┃ ┣ 📜AverageCalorieBanner.tsx
 ┃ ┃ ┣ 📜BarGraph.tsx
 ┃ ┃ ┣ 📜Board.tsx
 ┃ ┃ ┣ 📜BoardContent.tsx
 ┃ ┃ ┣ 📜CalendarPopup.tsx
 ┃ ┃ ┣ 📜CalorieDistributionChart.tsx
 ┃ ┃ ┣ 📜CircleBar.tsx
 ┃ ┃ ┣ 📜InputBox.tsx
 ┃ ┃ ┣ 📜LoadingAnimation.scss
 ┃ ┃ ┣ 📜LoadingAnimation.tsx
 ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┣ 📜Navigation.tsx
 ┃ ┃ ┣ 📜NavigationBeforeAuth.tsx
 ┃ ┃ ┣ 📜NavigationFooter.tsx
 ┃ ┃ ┣ 📜PolicyContent.tsx
 ┃ ┃ ┣ 📜SearchWindow.tsx
 ┃ ┃ ┣ 📜signOutButton.tsx
 ┃ ┃ ┣ 📜TagsWithAddingField.tsx
 ┃ ┃ ┗ 📜TopCalendar.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜LoginForm.tsx
 ┃ ┃ ┗ 📜LoginWrapper.tsx
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📜Profile.tsx
 ┃ ┃ ┗ 📜ProfileWrapper.tsx
 ┃ ┣ 📂profile_edit
 ┃ ┃ ┗ 📜ProfileEditWrapper.tsx
 ┃ ┣ 📂profile_set_target
 ┃ ┃ ┣ 📜SetTargetForm.tsx
 ┃ ┃ ┗ 📜SetTargetWrapper.tsx
 ┃ ┣ 📂signup
 ┃ ┃ ┣ 📜SignupForm.tsx
 ┃ ┃ ┗ 📜SignupWrapper.tsx
 ┃ ┣ 📂workout_adding
 ┃ ┃ ┗ 📜WorkoutAddingWrapper.tsx
 ┃ ┣ 📂workout_ai_support
 ┃ ┃ ┣ 📜WorkoutAiSupportInput.scss
 ┃ ┃ ┣ 📜WorkoutAiSupportInput.tsx
 ┃ ┃ ┗ 📜WorkoutAiSupportWrapper.tsx
 ┃ ┣ 📂workout_diet_link
 ┃ ┃ ┗ 📜WorkoutDietLink.tsx
 ┃ ┣ 📂workout_home
 ┃ ┃ ┣ 📜WorkoutAchieved.tsx
 ┃ ┃ ┣ 📜WorkoutHomeWrapper.tsx
 ┃ ┃ ┣ 📜WorkoutMenuBoardContent.tsx
 ┃ ┃ ┣ 📜WorkoutMenuForToday.tsx
 ┃ ┃ ┗ 📜WorkoutProgress.tsx
 ┃ ┗ 📂workout_summary
 ┃ ┃ ┗ 📜WorkoutSummaryWrapper.tsx
 ┣ 📂config // Directory for configuration file
 ┃ ┣ 📜db.ts
 ┃ ┣ 📜openai.ts
 ┃ ┗ 📜types.ts
 ┣ 📂models // Directory for MongoDB schema
 ┃ ┣ 📜Meal.ts
 ┃ ┣ 📜Profile.ts
 ┃ ┣ 📜Target.ts
 ┃ ┣ 📜User.ts
 ┃ ┣ 📜Workout.ts
```
