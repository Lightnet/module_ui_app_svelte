import Serializable from './Serializable';

export default class ThreeVector extends Serializable {
    static get netScheme() {
        return {
            //x: { type: BaseTypes.TYPES.FLOAT32 },
            //y: { type: BaseTypes.TYPES.FLOAT32 },
            //z: { type: BaseTypes.TYPES.FLOAT32 }
        };
    }

    constructor(x, y, z) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    toString() {
        function round3(x) { return Math.round(x * 1000) / 1000; }
        return `[${round3(this.x)}, ${round3(this.y)}, ${round3(this.z)}]`;
    }

    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    normalize() {
        this.multiplyScalar(1 / this.length());
        return this;
    }

    copy(sourceObj) {
        this.x = sourceObj.x;
        this.y = sourceObj.y;
        this.z = sourceObj.z;
        return this;
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    clone() {
        return new ThreeVector(this.x, this.y, this.z);
    }

    lerp(target, p) {
        this.x += (target.x - this.x) * p;
        this.y += (target.y - this.y) * p;
        this.z += (target.z - this.z) * p;
        return this;
    }

    getBendingDelta(target, options) {
        let increment = target.clone();
        increment.subtract(this);
        increment.multiplyScalar(options.percent);

        // check for max case
        if ((options.max && increment.length() > options.max) ||
            (options.max && increment.length() < options.min)) {
            return new ThreeVector(0, 0, 0);
        }

        // divide into increments
        increment.multiplyScalar(1 / options.increments);

        return increment;
    }

}