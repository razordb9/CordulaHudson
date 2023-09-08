import { z } from 'zod';
import type { Actions } from './$types';
const str = new RegExp(/^[^0-9]*$/);

const formSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().trim().email().min(1),
  textarea: z.string().trim().min(5)
});

export const actions = {
    default: async ({request}) => {
        const formData = await request.formData();
        // console.log(formData);
        
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
            const zodErrors:zodErrors = errors.map((error:any) => {
                return {
                  field: error.path[0],
                  message: error.message
                };
            });
            data.zodErrors = zodErrors;
        } else {
            data.success = true;
        }
        console.log(data);
        return data;
    }
  };