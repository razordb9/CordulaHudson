<script lang="ts">
	import { TreePineIcon } from 'lucide-svelte';
    import Navigation from './navigation/Navigation.svelte';
    import "$lib/components/navigation/navigation.css";
    import Route from './navigation/Route.svelte';
</script>
<header>
    <Navigation on:scroll hideOnScroll={true} sticky={true}
        --nav-background="var(--surface-2)"
    >
        <li class="menu-item-logo">
            <a href="/">
                <TreePineIcon size="32" fill="#073B4C" color="#073B4C"></TreePineIcon>
                <h1>Vintage Weihnachtszauber</h1>
            </a>
        </li>
        <ul class="menu-item-group">
            <li class="menu-item" aria-label="menuitem" role="menuitem">
                <Route className="route"
                    route={{ path: "/ueber-mich", name: "Über mich", visible: true }}
                />
            </li>
            <li class="menu-item" aria-label="menuitem" role="menuitem">
                <Route className="route"
                    route={{ path: "/kugeln", name: "Kugeln", visible: true }}
                />
            </li>
            <li class="menu-item" aria-label="menuitem" role="menuitem">
                <Route className="route"
                    route={{ path: "/kontakt", name: "Kontakt", visible: true }}
                />
            </li>
        </ul>
    </Navigation>
</header>



<style lang="scss">
    header{
        background-color: var(--surface-2);
        width: 100%;
        margin-inline: auto;
        box-shadow: 0px 6px 15px -5px rgba(0, 0, 0, 0.25);
        h1{
            color:var(--text-2);
            font-size: 1.3rem;
            display: inline-block;
            white-space: nowrap;
            font-weight: 700;
            transition: all ease-in-out 0.25s;
        }
    }
    :global(.route) {
        --background-hover:var(--secondary-hover);
        --background-active:var(--surface-4) !important;
        --background:var(--primary);
        --height:2.5rem;
        --color:var(--text);
        --color-hover:#fff;
        --color-active:#fff;
        font-size: .9rem;
        border-radius: .5rem;
        padding-inline:1.5rem !important;
        transition: all ease-in-out 0.25s;
    }
    :global(.burger) {
        --primary:var(--text-2) !important;
        --secondary:var(--text-2) !important;
    }
    .menu-item{
        margin-inline: .5rem;
        font-weight: 600;
    }
    .menu-item-logo {
        a, a:hover, a:focus, a:active  a:visited{
            text-decoration-color:var(--text-2);
        }
    }
    @media screen and (max-width:768px){
       .menu-item-logo {
            padding-inline: var(--side);
       }
        header{
            h1{
                font-size: 1.2rem;
                display: inline-block;
                font-weight: 700;
            }
        }
    }
</style>