<script>
    import { onMount, onDestroy } from 'svelte';
    //import { World, System, TagComponent } from "https://ecsy.io/build/ecsy.module.js";
    import { World, System, TagComponent } from 'ecsy';

    const NUM_ELEMENTS = 50;
    const SPEED_MULTIPLIER = 0.3;
    const SHAPE_SIZE = 50;
    const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;

    // Initialize canvas
    let canvas;// = document.querySelector("canvas");
    let canvasWidth;// = canvas.width = window.innerWidth;
    let canvasHeight;// = canvas.height = window.innerHeight;
    let ctx;// = canvas.getContext("2d");

    //----------------------
    // Components
    //----------------------

    // Velocity component
    class Velocity {
        constructor() {
            this.x = this.y = 0;
        }
    }

    // Position component
    class Position {
        constructor() {
            this.x = this.y = 0;
        }
    }

    // Shape component
    class Shape {
        constructor() {
            this.primitive = 'box';
        }
    }

    // Renderable component
    class Renderable extends TagComponent {}

    //----------------------
    // Systems
    //----------------------

    // MovableSystem
    class MovableSystem extends System {
        // This method will get called on every frame by default
        execute(delta, time) {
            // Iterate through all the entities on the query
            this.queries.moving.results.forEach(entity => {
                var velocity = entity.getComponent(Velocity);
                var position = entity.getMutableComponent(Position);
                position.x += velocity.x * delta;
                position.y += velocity.y * delta;

                if (position.x > canvasWidth + SHAPE_HALF_SIZE) position.x = - SHAPE_HALF_SIZE;
                if (position.x < - SHAPE_HALF_SIZE) position.x = canvasWidth + SHAPE_HALF_SIZE;
                if (position.y > canvasHeight + SHAPE_HALF_SIZE) position.y = - SHAPE_HALF_SIZE;
                if (position.y < - SHAPE_HALF_SIZE) position.y = canvasHeight + SHAPE_HALF_SIZE;
            });
        }
    }

    // Define a query of entities that have "Velocity" and "Position" components
    MovableSystem.queries = {
        moving: {
            components: [Velocity, Position]
        }
    }

    // RendererSystem
    class RendererSystem extends System {
        // This method will get called on every frame by default
        execute(delta, time) {

            ctx.fillStyle = "#d4d4d4";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Iterate through all the entities on the query
            this.queries.renderables.results.forEach(entity => {
                var shape = entity.getComponent(Shape);
                var position = entity.getComponent(Position);
                if (shape.primitive === 'box') {
                    this.drawBox(position);
                } else {
                    this.drawCircle(position);
                }
            });
        }

        drawCircle(position) {
            ctx.beginPath();
            ctx.arc(position.x, position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
            ctx.fillStyle= "#39c495";
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#0b845b";
            ctx.stroke();          
        }

        drawBox(position) {
            ctx.beginPath();
            ctx.rect(position.x - SHAPE_HALF_SIZE, position.y - SHAPE_HALF_SIZE, SHAPE_SIZE, SHAPE_SIZE);
            ctx.fillStyle= "#e2736e";
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#b74843";
            ctx.stroke();                      
        }
    }

    // Define a query of entities that have "Renderable" and "Shape" components
    RendererSystem.queries = {
        renderables: { components: [Renderable, Shape] }
    }

    // Create world and register the systems on it
    var world = new World();
        //world
        //.registerSystem(MovableSystem)
        //.registerSystem(RendererSystem);

    // Some helper functions when creating the components
    function getRandomVelocity() {
        return {
            x: SPEED_MULTIPLIER * (2 * Math.random() - 1), 
            y: SPEED_MULTIPLIER * (2 * Math.random() - 1)
        };
    }

    function getRandomPosition() {
        return { 
            x: Math.random() * canvasWidth, 
            y: Math.random() * canvasHeight
        };
    }

    function getRandomShape() {
        return {
            primitive: Math.random() >= 0.5 ? 'circle' : 'box'
        };
    }

    //for (let i = 0; i < NUM_ELEMENTS; i++) {
        //world
            //.createEntity()
            //.addComponent(Velocity, getRandomVelocity())
            //.addComponent(Shape, getRandomShape())
            //.addComponent(Position, getRandomPosition())
            //.addComponent(Renderable)        
    //}

    // Run!
    function run() {
        // Compute delta and elapsed time
        var time = performance.now();
        var delta = time - lastTime;

        // Run all the systems
        world.execute(delta, time);

        lastTime = time;
        requestAnimationFrame(run);
    }

    var lastTime = performance.now();
    
    onMount(function(){
        canvas = document.querySelector("canvas");
        canvasWidth = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = window.innerHeight;
        ctx = canvas.getContext("2d");

        world = new World();
        world
        .registerSystem(MovableSystem)
        .registerSystem(RendererSystem);


        for (let i = 0; i < NUM_ELEMENTS; i++) {
            world
                .createEntity()
                .addComponent(Velocity, getRandomVelocity())
                .addComponent(Shape, getRandomShape())
                .addComponent(Position, getRandomPosition())
                .addComponent(Renderable)        
        }

        run();
    });

    onDestroy(function(){

    });

</script>
<style>
    /*
    .topleft{
        position:fixed;
    }
    */
</style>
<canvas width="500" height="500"></canvas>
<!--
<canvas id="canvas" class="topleft"></canvas>
<div id="viewport" class="topleft" style="width:100%;height:100%;"></div>    
-->

