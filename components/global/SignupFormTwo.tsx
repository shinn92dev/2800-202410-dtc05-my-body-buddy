// import { useRouter } from "next/navigation";
// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import InputBox from "./InputBox";
// import SignUpAndInIcon from "./icons/SignUpAndInIcon";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// interface NewUserDataTwo {}

// const schema = yup
//     .object({
//         password: yup.string().email().required(),
//         securityQuestion: yup.string().min(5).max(20).required(),
//         securityAnswer: yup.string().min(5).max(20).required(),
//     })
//     .required();

// export default function SignupFormTwo() {
//     const router = useRouter();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<NewUserDataTwo>({ resolver: yupResolver(schema) });
//     const onSubmit = async (data: NewUserDataTwo) => {
//         try {
//             if (localStorage.getItem("tempUserData")) {
//                 const tempUser = JSON.parse(
//                     localStorage.getItem("tempUserData")
//                 );
//             }
//             console.log(tempUser, data);
//             router.push("/signup/security");
//         } catch (error) {
//             console.log(errors);
//         }
//     };

//     return (
//         <form className="mx-auto max-w-xs" onSubmit={handleSubmit(onSubmit)}>
//             <InputBox
//                 labelText="Password"
//                 id="password"
//                 hidden={true}
//                 type="password"
//                 placeholder="Password"
//                 isTop={true}
//                 register={register}
//             />
//             <InputBox
//                 labelText="Security Question"
//                 id="security-question"
//                 hidden={true}
//                 type="text"
//                 placeholder="Your question"
//                 isTop={false}
//                 register={register}
//             />
//             <InputBox
//                 labelText="Security Answer"
//                 id="security-answer"
//                 hidden={true}
//                 type="text"
//                 placeholder="answer"
//                 isTop={false}
//                 register={register}
//             />

//             <button
//                 className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
//                 // onClick={goToNext}
//             >
//                 <SignUpAndInIcon width={6} />
//                 {/* <svg
//                                                 className={`w-6 h-6 -ml-2`}
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 strokeWidth="2"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             >
//                                                 <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                                                 <circle cx="8.5" cy="7" r="4" />
//                                                 <path d="M20 8v6M23 11h-6" />
//                                             </svg> */}
//                 <span className="ml-3">Sign Up</span>
//             </button>
//         </form>
//         // <form onSubmit={handleSubmit(onSubmit)}>
//         //     <input {...register("firstName", { required: true })} />
//         //     {errors.firstName && <span>This field is required</span>}

//         //     <input {...register("lastName")} />

//         //     <button type="submit">Submit</button>
//         // </form>
//     );
// }
