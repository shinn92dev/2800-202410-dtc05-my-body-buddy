import { SignupFormSchema, FormState } from "@/config/definition";

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = await SignupFormSchema.safeParse({
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
        security_question: formData.get("security_question"),
        security_answer: formData.get("security_answer"),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
}
