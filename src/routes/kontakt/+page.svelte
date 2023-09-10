<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import FormErrors from "$lib/Components/FormErrors.svelte";
    import type { ActionData } from "./$types";
    export let form: ActionData;
    $: successMessage = false;
    let toaster:HTMLDivElement;
</script>

<div class="wrapper">
    {#if successMessage}
        <div class="toast" bind:this={toaster}>
            <button class="close" on:mousedown={(e)=>toaster.style.display='none'}> <small>X</small></button>
            <p>Danke für Ihre Nachricht!</p>
        </div>
    {/if}
    <form
        method="Post"
        use:enhance={({ formElement, formData, action, cancel }) => {
            return async ({ result }) => {
                // `result` is an `ActionResult` object
                console.log("submit", result);
                if (result.type === 'success') {
                    await applyAction(result);
                    await invalidateAll();
                    if (result.data.success === true) {
                        // form.reset();
                        successMessage = true;
                        console.log("Danke für Ihre Nachricht!");
                    } else {
                        successMessage = false;
                        console.log("Mochs richtig du wixxa");
                    }
                }
            };
        }}
        action="?/submit"
    >
        <label for="fullName">Vor und Nachname</label>
        <input type="text" id="fullName" name="fullName" />
        <FormErrors {form} fieldName="Fullname" />

        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
        />
        <FormErrors {form} fieldName="Email" />

        <label for="textArea">Nachricht</label>
        <textarea name="message" id="message" rows="10" cols="30" />
        <FormErrors {form} fieldName="Message" />

        <button type="submit" value="Submit">Senden</button>
    </form>
</div>

<style lang="scss">
    form {
        width: 70%;
        position: relative;
        margin-inline: auto;
    }
    label {
        font-weight: 600;
    }
    .toast{
        display:block;
        width: 70%;
        margin-inline: auto;
        background-color: var(--surface-3);
        padding: 1rem 2rem;
        border-radius: .5rem;
        position: relative;
        .close{
            position: absolute;
            right: 0;
            top: 0;
            width:2rem;
            margin:.2rem;
            height: 2rem;
            background: var(--secondary);
            border:none;
            small{
                display: flex;
                flex-direction: center;
                align-items: center;
                height: 100%;
            }
        }
        /* color: whitesmoke; */
        p{
            color:var(--surface-2);

        }
        box-shadow: 0px 6px 15px -5px rgba(0, 0, 0, 0.25);

    }
    input[type="text"],
    input[type="email"],
    textarea {
        width: 100%; /* Full width */
        padding: 12px; /* Some padding */
        border: 1px solid #ccc; /* Gray border */
        border-radius: 4px; /* Rounded borders */
        box-sizing: border-box; /* Make sure that padding and width stays in place */
        margin-top: 6px; /* Add a top margin */
        margin-bottom: 16px; /* Bottom margin */
        resize: none;
    }
    button[type="submit"] {
        padding: 0.5rem 2rem;
        background-color: var(--surface-2);
        color: var(--surface-3);
        &:hover,
        &:focus,
        &:active {
            color: var(--surface-3);
        }
    }
    @media screen and (max-width: 768px) {
        form, .toast {
            width: 100%;
        }
    }
</style>
