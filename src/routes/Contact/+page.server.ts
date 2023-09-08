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

  type hugo = {
    success: boolean,
    zodErrors: {}
  }

export const actions = {
    default: async ({request}) => {
        const formData = await request.formData();
        console.log(formData);
        
        let data:hugo = {
            success: false,
            zodErrors: []
        }

        const contact = {
            name: String(formData.get("fullName")),
            email: String(formData.get("email")),
            message: String(formData.get("message")),
        }

        const safeParse = formSchema.safeParse(contact);

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