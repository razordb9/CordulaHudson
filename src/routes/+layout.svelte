<script lang="ts">
    import '../app.css';
    import '$lib/css/pico.min.css';
	import Navigation from '$lib/components/Navigation.svelte';
    
    
</script>
<div class="app">
    <Navigation></Navigation>
    <main>
        <slot>
            
        </slot>
    </main>
</div>
<style lang="scss">

</style>