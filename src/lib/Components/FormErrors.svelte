<script lang="ts">
    export let form: HTMLFormElement;
    export let fieldName: string;
</script>

{#if form?.zodErrors[fieldName]?._errors.length > 0}    
    {#each form?.zodErrors[fieldName]._errors as error}
        <small class="formErrors">{error}</small>  
    {/each}
{/if}

<style>
    .formErrors {
        /* height: 45px; */
        background-color: var(--surface-3);
        /* color: whitesmoke; */
        color:var(--surface-2);
        border-radius: 5px;
        padding: 0.5rem 1rem;
        display: block;
        white-space: nowrap;
        max-inline-size: 100%;
        width: 100%;
        font-size: .8rem;
        /* margin: 0; */
        /* margin-top: 2px; */
        margin-bottom: 1rem;
    }
</style>