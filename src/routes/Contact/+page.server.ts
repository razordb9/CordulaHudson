import { z } from 'zod';
import type { Actions } from './$types';
const str = new RegExp(/^[^0-9]*$/);

const formSchema = z.object({
  Fullname: z.string({
    required_error: "Nachname ist ein Pflichtfeld",

    }).regex(str, "Mir eagl").min(6,{ message: "Geben Sie mindesten 6 Zeichen ein" }),
  Email: z.string().trim().email({ message: "Email Adresse ist ungültig"}),
  Message: z.string().trim().min(10, { message: "Geben sie mindestens 10 Zeichen ein"}).max(1024, {
    message: "Nachricht zu lange"
  })
});

// const validateFormData = (validationResponse:any) =>{
//     const response={
//         success:false,
//         error:{},
//     }
//     if (!validationResponse.success) {
//         const zodError = validationResponse.error.format();
//         // console.log("zodError", zodError)
//         response.error = zodError;
//     } else {
//         response.success = true;
//     }
//     return response;
// }

type hugo = {
    success: boolean,
    zodErrors: {}
}
export const actions = {
    submit: async ({request}) => {
        const formData = await request.formData();
        // console.log(formData);
        
        let data:hugo = {
            success: false,
            zodErrors: {}
        }

        const contact = {
            Fullname: String(formData.get("fullName")),
            Email: String(formData.get("email")),
            Message: String(formData.get("message")),
        }

        const safeParse = formSchema.safeParse(contact);
        console.log("safeparse", safeParse.error.format());

        if (!safeParse.success) {
            let errors = safeParse.error.issues;
            data.zodErrors = safeParse.error.format();
        } else {
            data.success = true;
        }
        console.log(data);
        return data;
    }
  };