<script lang="ts">
    import { dev } from "$app/environment";
    import { createEventDispatcher } from "svelte";
    import Burger from "./Burger.svelte";

    export let hideOnScroll = false;
    export let sticky = false;
    export let shadow = true;
    export let className = "";

    $: scrollUp = true;
    $: scrollY = 0;
    $: showMenu = false;

    let prevScroll = -10;
    let innerHeight = 0;
    let innerWidth = 0;
    
    let dispatch = createEventDispatcher();

    $: if (scrollY) {
        scrollUp = prevScroll > scrollY ? true : false;
        prevScroll = scrollY;
        dispatch("scroll", {
            scrollY: scrollY,
            scrollUp: scrollUp,
        });
    }
    $: if (dev)
        console.log("scroll direction", scrollUp == true ? "up" : "down");
</script>

<svelte:window bind:scrollY bind:innerHeight bind:innerWidth />
<nav
    class="navigation {className}"
    class:hide-on-scroll={
        hideOnScroll === true &&
        scrollUp === false &&
        scrollY > innerHeight / 3 &&
        showMenu === false
        
    }
    class:sticky={sticky === true}
    class:box-shadow={
        shadow === true &&
        scrollY > 0
    }
>
    <div class="show-burger">
        <Burger on:mousedown={(e) => (showMenu = e.detail.open)} />
    </div>
    <ul class="menu-items" class:toggle-menu={showMenu === true}>
        <slot />
    </ul>
</nav>

<style>
    .navigation {
        height: auto;
        width: 100%;
        max-width: var(--content-width);
        margin-inline: auto;
        background-color: var(--nav-background);
        opacity: 1;
        transition: all 0.5s ease-in-out;
        position: relative;
    }
    .sticky {
        position: sticky;
        top: 0px;
    }
    .hide-on-scroll {
        opacity: 0;
        top: -100px;
        transition: all 0.5s ease-in-out;
    }
    .box-shadow {
        box-shadow: 0px 6px 15px -5px rgba(0, 0, 0, 0.25);
        /* box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
             rgba(0, 0, 0, 0.093) 0px 3px 7px -3px; */
    }
</style>
