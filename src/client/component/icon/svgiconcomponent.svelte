<script>
    export let url;
    //export let title;
    export let width = 20;
    export let height = 20;
</script>

<style>
    /*object{
        pointer-events: none;
    }*/
    svg{
        pointer-events: none;
        float:left;
    }
</style>

<svg with="{width}" height="{height}" viewBox="0 0 20 20">
    <image height="20" with="20" xlink:href="{url}"></image>
</svg>