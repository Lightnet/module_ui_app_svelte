import GameObject from './GameObject';
//import BaseTypes from './BaseTypes';
import ThreeVector from './ThreeVector';
import Quaternion from './Quaternion';

export default class PhysicalObject3D extends GameObject {
    static get netScheme() {
        return Object.assign({
            position: { type: BaseTypes.TYPES.CLASSINSTANCE },
            quaternion: { type: BaseTypes.TYPES.CLASSINSTANCE },
            velocity: { type: BaseTypes.TYPES.CLASSINSTANCE },
            angularVelocity: { type: BaseTypes.TYPES.CLASSINSTANCE }
        }, super.netScheme);
    }

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        this.bendingIncrements = 0;

        // set default position, velocity and quaternion
        this.position = new ThreeVector(0, 0, 0);
        this.velocity = new ThreeVector(0, 0, 0);
        this.quaternion = new Quaternion(1, 0, 0, 0);
        this.angularVelocity = new ThreeVector(0, 0, 0);

        // use values if provided
        props = props || {};
        if (props.position) this.position.copy(props.position);
        if (props.velocity) this.velocity.copy(props.velocity);
        if (props.quaternion) this.quaternion.copy(props.quaternion);
        if (props.angularVelocity) this.angularVelocity.copy(props.angularVelocity);

        this.class = PhysicalObject3D;
    }

    toString() {
        let p = this.position.toString();
        let v = this.velocity.toString();
        let q = this.quaternion.toString();
        let a = this.angularVelocity.toString();
        return `phyObj[${this.id}] player${this.playerId} Pos${p} Vel${v} Dir${q} AVel${a}`;
    }

    bendingToString() {
        if (this.bendingOptions)
            return `bend=${this.bendingOptions.percent} deltaPos=${this.bendingPositionDelta} deltaVel=${this.bendingVelocityDelta} deltaQuat=${this.bendingQuaternionDelta}`;
        return 'no bending';
    }

    bendToCurrent(original, percent, worldSettings, isLocal, increments) {

        let bending = { increments, percent };
        // if the object has defined a bending multiples for this object, use them
        let positionBending = Object.assign({}, bending, this.bending.position);
        let velocityBending = Object.assign({}, bending, this.bending.velocity);

        // check for local object overrides to bendingTarget
        if (isLocal) {
            Object.assign(positionBending, this.bending.positionLocal);
            Object.assign(velocityBending, this.bending.velocityLocal);
        }

        // get the incremental delta position & velocity
        this.incrementScale = percent / increments;
        this.bendingPositionDelta = original.position.getBendingDelta(this.position, positionBending);
        this.bendingVelocityDelta = original.velocity.getBendingDelta(this.velocity, velocityBending);
        this.bendingAVDelta = new ThreeVector(0, 0, 0);

        // get the incremental quaternion rotation
        this.bendingQuaternionDelta = (new Quaternion()).copy(original.quaternion).conjugate();
        this.bendingQuaternionDelta.multiply(this.quaternion);

        let axisAngle = this.bendingQuaternionDelta.toAxisAngle();
        axisAngle.angle *= this.incrementScale;
        this.bendingQuaternionDelta.setFromAxisAngle(axisAngle.axis, axisAngle.angle);

        this.bendingTarget = (new this.constructor());
        this.bendingTarget.syncTo(this);

        this.position.copy(original.position);
        this.quaternion.copy(original.quaternion);
        this.angularVelocity.copy(original.angularVelocity);

        this.bendingIncrements = increments;
        this.bendingOptions = bending;

        this.refreshToPhysics();
    }

    syncTo(other, options) {

        super.syncTo(other);
        console.log("syncTo");

        this.position.copy(other.position);
        //this.quaternion.copy(other.quaternion);
        //this.angularVelocity.copy(other.angularVelocity);

        //if (!options || !options.keepVelocity) {
            //this.velocity.copy(other.velocity);
        //}

        if (this.physicsObj)
            this.refreshToPhysics();
    }

    // update position, quaternion, and velocity from new physical state.
    refreshFromPhysics() {
        this.position.copy(this.physicsObj.position);
        //this.quaternion.copy(this.physicsObj.quaternion);
        //this.velocity.copy(this.physicsObj.velocity);
        //this.angularVelocity.copy(this.physicsObj.angularVelocity);
    }

    // update position, quaternion, and velocity from new game state.
    refreshToPhysics() {
        this.physicsObj.position.copy(this.position);
        //this.physicsObj.quaternion.copy(this.quaternion);
        //this.physicsObj.velocity.copy(this.velocity);
        //this.physicsObj.angularVelocity.copy(this.angularVelocity);
    }

    // apply one increment of bending
    applyIncrementalBending(stepDesc) {
        if (this.bendingIncrements === 0)
            return;

        if (stepDesc && stepDesc.dt) {
            const timeFactor = stepDesc.dt / (1000 / 60);
            // TODO: use clone() below.  it's cleaner
            const posDelta = (new ThreeVector()).copy(this.bendingPositionDelta).multiplyScalar(timeFactor);
            const avDelta = (new ThreeVector()).copy(this.bendingAVDelta).multiplyScalar(timeFactor);
            this.position.add(posDelta);
            this.angularVelocity.add(avDelta);

            // one approach to orientation bending is slerp:
            this.quaternion.slerp(this.bendingTarget.quaternion, this.incrementScale * timeFactor * 0.8);
        } else {
            this.position.add(this.bendingPositionDelta);
            this.angularVelocity.add(this.bendingAVDelta);
            this.quaternion.slerp(this.bendingTarget.quaternion, this.incrementScale);
        }

        // alternative: fixed delta-quaternion correction
        // TODO: adjust quaternion bending to dt timefactor precision
        // this.quaternion.multiply(this.bendingQuaternionDelta);
        this.bendingIncrements--;
    }

    // interpolate implementation
    interpolate(nextObj, percent) {

        // slerp to target position
        this.position.lerp(nextObj.position, percent);
        //this.quaternion.slerp(nextObj.quaternion, percent);
    }

}