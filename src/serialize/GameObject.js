import Serializable from './Serializable';

export default class GameObject extends Serializable {

    static get netScheme() {
        return {
            //id: { type: BaseTypes.TYPES.INT32 },
            //playerId: { type: BaseTypes.TYPES.INT16 }
        };
    }

    constructor(gameEngine, options, props) {
        super();

        /**
         * The gameEngine this object will be used in
         * @member {GameEngine}
         */
        this.gameEngine = gameEngine;

        this.id = null;
        if (options && 'id' in options)
            this.id = options.id;
        else if (this.gameEngine)
            this.id = this.gameEngine.world.getNewId();

        /**
        * playerId of player who created this object
        * @member {Number}
        */
        this.playerId = (props && props.playerId) ? props.playerId : 0;

        this.components = {};
    }

    onAddToWorld(gameEngine) {}

    onRemoveFromWorld(gameEngine) {}

    toString() {
        return `game-object[${this.id}]`;
    }

    bendingToString() {
        return 'no bending';
    }

    saveState(other) {
        //this.savedCopy = (new this.constructor(this.gameEngine, { id: null }));
        //this.savedCopy.syncTo(other ? other : this);
    }

    get bending() {
        return {
            position: { percent: 1.0, min: 0.0 },
            velocity: { percent: 0.0, min: 0.0 },
            angularVelocity: { percent: 0.0 },
            angleLocal: { percent: 1.0 }
        };
    }

    bendToCurrentState(bending, worldSettings, isLocal, bendingIncrements) {
        //if (this.savedCopy) {
            //this.bendToCurrent(this.savedCopy, bending, worldSettings, isLocal, bendingIncrements);
        //}
        //this.savedCopy = null;
    }

    bendToCurrent(original, bending, worldSettings, isLocal, bendingIncrements) {

    }

    syncTo(other) {
        //super.syncTo(other);
        this.playerId = other.playerId;
    }

    refreshToPhysics() {}

    refreshFromPhysics() {}

    applyIncrementalBending() { }

    destroy() {}

    addComponent(componentInstance) {
        componentInstance.parentObject = this;
        this.components[componentInstance.constructor.name] = componentInstance;

        // a gameEngine might not exist if this class is instantiated by the serializer
        if (this.gameEngine) {
            this.gameEngine.emit('componentAdded', this, componentInstance);
        }
    }

    removeComponent(componentName) {
        // todo cleanup of the component ?
        delete this.components[componentName];

        // a gameEngine might not exist if this class is instantiated by the serializer
        if (this.gameEngine) {
            this.gameEngine.emit('componentRemoved', this, componentName);
        }
    }

    hasComponent(componentClass) {
        return componentClass.name in this.components;
    }

    getComponent(componentClass) {
        return this.components[componentClass.name];
    }

}