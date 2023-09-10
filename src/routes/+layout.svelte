<script lang="ts">
    // import '$lib/css/pico.min.css';
    import "open-props/normalize";
    import "open-props/buttons";
    import "open-props/animations";
    import "open-props/shadows";
    import "open-props/style";
    import "open-props/colors";
    import "../app.css";
    import Header from "$lib/Components/Header.svelte";
</script>

<div class="app">
    <Header></Header>
    <main>
        <slot />
    </main>
</div>
<style lang="scss">
    .app {
        width: 100%;
        main {
            width: 100%;
            max-width: var(--content-width);
            margin-inline: auto;
        }
    }
    :root::view-transition-old(active-page) {
        height: var(--height);
        // animation: 0.25s linear both shrink-x;
    }
    :root::view-transition-new(active-page) {
        height: var(--height);
        // animation: 0.25s 0.25s linear both grow-x;
    }
    ::view-transition-old(root),
    ::view-transition-new(root) {
        animation-duration: 3s;
    }
    @media screen and (max-width:768px){
       main {
            padding-inline: var(--side);
       }
    }
</style>