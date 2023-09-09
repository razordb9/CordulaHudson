<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import FormErrors from "$lib/Components/FormErrors.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<div class="wrapper">
    <form method="Post" 
        use:enhance={({ formElement, formData, action, cancel }) => {
            return async ({ result }) => {
            // `result` is an `ActionResult` object
                if (result.type === 'success') {
                    await applyAction(result);
                }
            };
        }}
        action="?/submit"
    >
        <label for="fullName">Full name:</label>
        <input type="text" id="fullName" name="fullName"  />    
        <FormErrors {form} fieldName = "Fullname"/>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="example@email.com"  />
        <FormErrors {form} fieldName = "Email"/>

        <label for="textArea">Message:</label>
        <textarea name="message" id="message" rows="10" cols="30"  />
        <FormErrors {form} fieldName = "Message"/>
        
        <button type="submit" value="Submit">Submit</button>
    </form>    
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
</style>