import GameObject from './GameObject';

class DynamicObject extends GameObject {

    static get netScheme() {
        return Object.assign({
            //position: { type: BaseTypes.TYPES.CLASSINSTANCE },
            //width: { type: BaseTypes.TYPES.INT16 },
            //height: { type: BaseTypes.TYPES.INT16 },
            //isStatic: { type: BaseTypes.TYPES.UINT8 },
            //velocity: { type: BaseTypes.TYPES.CLASSINSTANCE },
            //angle: { type: BaseTypes.TYPES.FLOAT32 }
        }, super.netScheme);
    }

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);

    }

    // convenience getters
    //get x() { return this.position.x; }
    //get y() { return this.position.y; }

}