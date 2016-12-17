export module Utils {

    export function getRandom() {
        return Math.random();
    }

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    export function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    export function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}
