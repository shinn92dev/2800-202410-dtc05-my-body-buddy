// import { z } from "zod";
// const validateUserInformation = (
//     email,
//     username,
//     password,
//     securityQuestion,
//     securityAnswer
// ) => {
//     const validatedField = SignupFormSchema.safeParse({
//         email: email,
//         username: username,
//         password: password,
//         securityQuestion: securityQuestion,
//         securityAnswer: securityAnswer,
//     });
//     console.log(validatedField);
//     return validatedField;
// };

// const SignupFormSchema = z.object({
//     email: z.string().email({ message: "Please enter a valid email." }).trim(),
//     username: z
//         .string()
//         .min(2, { message: "Name must be at least 2 characters long." })
//         .trim(),
//     password: z
//         .string()
//         .min(8, { message: "Be at least 8 characters long" })
//         .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
//         .regex(/[0-9]/, { message: "Contain at least one number." })
//         .regex(/[^a-zA-Z0-9]/, {
//             message: "Contain at least one special character.",
//         }),
//     securityQuestion: z
//         .string()
//         .min(10, {
//             message: "Security question must be at least 10 characters long.",
//         })
//         .trim(),
//     securityAnswer: z
//         .string()
//         .min(5, {
//             message: "Security answer must be at least 5 characters long",
//         })
//         .trim(),
// });
// export default validateUserInformation;
