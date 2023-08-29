<script lang="ts">
    import '../app.css';
	import Naviation from '$lib/components/Naviation.svelte';
    
    
</script>
<div class="app">
    <Naviation></Naviation>
    <main>
        <slot>
            
        </slot>
    </main>
</div>
<style lang="scss">

</style>