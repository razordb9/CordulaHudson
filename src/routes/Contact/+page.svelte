<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import type { ActionResult } from "@sveltejs/kit";
    import type { ActionData } from "./$types";

    export let form: ActionData;
 
    console.log("xxxxxxxxxxxxxx", form?.zodErrors[0]);
</script>

<div class="wrapper">
    <form method="Post" 
        use:enhance={({ formElement, formData, action, cancel }) => {

            return async ({ result }) => {
            // `result` is an `ActionResult` object
                if (result.type === 'success') {
                    const data = result.data;
                    await applyAction(result);
                }
            };
        }}
        action="?/submit"
    >
<<<<<<< HEAD
<<<<<<< HEAD
        <label for="fullName">Full name:</label>
        <input type="text" id="fullName" name="fullName"  value="Thomas" required/>
        <FormErrors {form} fieldName = "Fullname"/>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="thomas.zaussnig@outlook.com"/>
        <FormErrors {form} fieldName = "Email"/>

        <label for="textArea">Message:</label>
        <textarea name="message" id="message" rows="10" cols="30"  value="This is just for testing purpose"/>
        <FormErrors {form} fieldName = "Message"/>

        <button type="submit" value="Submit">Submit</button>
=======
>>>>>>> parent of 90884b1 (added pico css, finished ZOD implementation)
=======
>>>>>>> parent of 90884b1 (added pico css, finished ZOD implementation)
        
        <label for="fullName">Full name:</label>
        <input type="text" id="fullName" name="fullName" required />    
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="example@email.com" required />
        
        <label for="textArea">Message:</label>
        <textarea name="message" id="message" rows="10" cols="30" required />
        
        <button type="submit" value="Submit">Submit</button>
    </form>    

    {#if form?.success == false}
        <ul class="zodErrors">
            {#each form?.zodErrors as error}
            
            <li>{error.field} - {error.message}</li>
        {/each}
        </ul>
        
    {/if}
</div>


<style lang="scss">
    .wrapper {
        margin: 100px 500px;
    }

    input[type=text], input[type=email], textarea {
        width: 100%; /* Full width */
        padding: 12px; /* Some padding */  
        border: 1px solid #ccc; /* Gray border */
        border-radius: 4px; /* Rounded borders */
        box-sizing: border-box; /* Make sure that padding and width stays in place */
        margin-top: 6px; /* Add a top margin */
        margin-bottom: 16px; /* Bottom margin */
        resize: none;
    }

    .zodErrors li {
        background-color: red;
        list-style-type: none;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 5px;
        color: white;
    }
</style>