<script lang="ts">

    export let form: HTMLFormElement;
    export let fieldName: string;

</script>

{#if form?.zodErrors[fieldName]._errors.length > 0}    
    {#each form?.zodErrors[fieldName]._errors as error}
        <small class="formErrors">{error}</small>  
    {/each}
{/if}

<style>
    .formErrors {
        width: 100%;
        height: 45px;
        display: flex;
        background-color: red;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        color: whitesmoke;
        /* margin: 0; */
        margin-top: 2px;
    }
</style>