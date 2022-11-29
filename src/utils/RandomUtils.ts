export default class RandomUtils {

    static getRandomNumber(minInclusive : number, maxExclusive : number) : number {
        return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive);
    }

    static getRandomBoolean() : boolean {
        return Math.random() < 0.5;
    }
}