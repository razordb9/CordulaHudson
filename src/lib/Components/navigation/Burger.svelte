<script lang="ts">
    import { createEventDispatcher } from "svelte";
    
    export let className="burger";
    export let position="right";

    let open = false;
    let dispatch = createEventDispatcher();
</script>

    <div class="burger-wrapper" 
        class:right={position==="right"} 
        class:left={position==="left"}
    >
        <div
            class="burger {className}"
            aria-label="toggle-burger-menu"
            role="button"
            tabindex="0"
            aria-live="polite"
            on:mousedown={(e) => {
                    open = !open;
                    dispatch("mousedown", {
                        event: e,
                        open: open
                    });
                }
            }
            class:toggle={open === true}
        >
            <li class="bar first" />
            <li class="bar second" />
            <li class="bar third" />
        </div>
    </div>


<style lang="scss">
  
    .burger-wrapper {
        :root{
            --primary: var(--main-color, #fff);
            --secondary: var(--accent-color, orange);
            --white: #fff;
        }
        min-height: 3rem;
        width: 60px;
        height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        transition: all 500ms ease-in-out;
        z-index: 999;
    }
    .left {
        position: absolute;
        left: 0px;
    }
    .right {
        position: absolute;
        right: 0px;
        top:0px;
    }
    .burger {
        width: 2.5rem;
        height: 1.9rem;
        border: 0.5px solid var(--primary, var(--main-color,#fff));
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0.25rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        box-sizing: border-box;
        align-items: start;
        background-color: transparent;
        border-radius: 0px;
        &:hover {
            border: 0.5px solid var(--secondary, var(--accent-color, orange));
            .bar {
                border: 1px solid var(--secondary, var(--accent-color, orange));
            }
        }
        transition: all 500ms ease-in-out;
    }
    .bar {
        width: 2rem;
        height: 1px;
        box-sizing: border-box;
        background-color: var(--primary, var(--main-color, #fff));
        list-style: none;
        transition: all 2s ease-in-out;
    }
    .first {
        transition: all 0.1s ease-in-out;
        width: 1.6rem;
    }
    .second {
        transition: all 0.2s ease-in-out;
        width: 2rem;
    }
    .third {
        transition: all 0.3s ease-in-out;
        width: 1.3rem;
    }
    .toggle {
        align-items: center;
        background: var(--white);
        border: 0.5px solid var(--secondary, var(--main-color, orange));
        .second, .second:hover {
            background: transparent;
            width: 0px;
            height: 0px;
            border: 0px solid transparent !important;
            transition: all .1s ease-in-out;
        }
        .first,
        .third {
            background: var(--secondary, var(--main-color, orange));
            position: absolute;
            transform: rotate(45deg);
            width: 1.4rem;
            height: 1px;
            border: 1px solid var(--secondary, var(--main-color, orange));
            transition: all 0.1s ease-in-out;
        }
        .third {
            transform: rotate(-45deg);
            transition: all 0.3s ease-in-out;
        }
    }
</style>