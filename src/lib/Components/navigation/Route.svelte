<script lang="ts">
    import { dev } from '$app/environment';
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';
    import type { Route} from './types'
    export let route:Route ={}
    export let className = "";
    let isFocused = false;
    let dispatch = createEventDispatcher();

    const createDispatcher = (e:Event, name:string)=>{
        dispatch(name, {
            event: e,
            route: route
        })
    }
</script>


{#if route.visible === true || route.visible === undefined}
    <a class="{className}"
        href={route.path}
        target="{route.target}"
        class:activeRoute={$page.url.pathname === route.path}
        on:focus={(e) => isFocused = true}
        on:blur={(e) => isFocused = false}
        on:mousedown={(e) =>createDispatcher(e,'mousedown')}
        on:mouseup={(e) => createDispatcher(e,'mouseup')}    
        >
        {#if route.name === undefined}
             <slot><!-- optional fallback --></slot>
        {:else}
            {route.name}
        {/if}
    </a>
{/if}
<style lang="scss">
    a {
        text-decoration: none;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color:var(--color, white);
        background: var(--background, transparent);
        width:var(--width, 100%);
        height: var(--height, 100%);
    }
    
    a:hover{
        color:var(--color-hover, white);
        background: var(--background-hover, #b81ec6ad);
    }
    .activeRoute {
        color:var(--color-active, white);
        background: var(--background-active, #b81ec6ad);
    }
    @media screen and (max-width:768px){
        a{
            height: 100%;
            border-radius: 0;
            background: transparent;
        }
    }
</style>