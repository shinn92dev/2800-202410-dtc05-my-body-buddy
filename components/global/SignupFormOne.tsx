// import { useRouter } from "next/navigation";
// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import InputBox from "./InputBox";
// import SignUpAndInIcon from "./icons/SignUpAndInIcon";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// interface NewUserDataOne {
//     email: string;
//     username: string;
//     password: string;
//     securityQuestion: string;
//     securityAnswer: string;
// }

// const schema = yup
//     .object({
//         email: yup.string().email().required(),
//         username: yup.string().min(5).max(20).required(),
//         password: yup.string().email().required(),
//         securityQuestion: yup.string().min(5).max(20).required(),
//         securityAnswer: yup.string().min(5).max(20).required(),
//     })
//     .required();

// export default function SignupFormOne() {
//     const router = useRouter();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<NewUserDataOne>({ resolver: yupResolver(schema) });
//     const onSubmit = async (data: NewUserDataOne) => {
//         try {
//             localStorage.setItem("tempUserData", JSON.stringify(data));
//             console.log(data);
//             router.push("/signup/security");
//         } catch (error) {
//             console.log(errors);
//         }
//     };

//     return (
//         <form className="mx-auto max-w-xs" onSubmit={handleSubmit(onSubmit)}>
//             <InputBox
//                 labelText="Email"
//                 id="email"
//                 hidden={true}
//                 type="email"
//                 placeholder="Email"
//                 isTop={true}
//                 register={register}
//             />
//             {errors.email && (
//                 <p className="text-red-700">{`⚠️${errors.email.message}`}</p>
//             )}
//             {/* Username */}
//             <InputBox
//                 labelText="Username"
//                 id="username"
//                 hidden={true}
//                 type="text"
//                 placeholder="Username"
//                 isTop={false}
//                 register={register}
//             />
//             {errors.username && (
//                 <p className="text-red-700">{`⚠️${errors.username.message}`}</p>
//             )}
//             <InputBox
//                 labelText="Password"
//                 id="password"
//                 hidden={true}
//                 type="password"
//                 placeholder="Password"
//                 isTop={false}
//                 register={register}
//             />
//             <InputBox
//                 labelText="Security Question"
//                 id="security-question"
//                 hidden={true}
//                 type="text"
//                 placeholder="Your security question"
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
//             <p className="mt-6 text-xs text-gray-600 text-center">
//                 I agree to abide by My Body Buddy&apos;s&nbsp;
//                 <button
//                     className="border-b border-gray-500 border-dotted"
//                     type="button"
//                     // onClick={handlePolicyClick}
//                 >
//                     Terms of Service and privacy Policy
//                 </button>
//             </p>
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
//                 <span className="ml-3">Go to Next Step</span>
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
