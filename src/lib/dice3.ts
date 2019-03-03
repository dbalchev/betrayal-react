import { isUndefined } from "util";

export function* dice3Permutations(nDice: number) {
    for (var nZeros = 0; nZeros <= nDice; ++nZeros) {
        for (var nOnes = 0; nOnes + nZeros <= nDice; ++nOnes) {
            yield [nZeros, nOnes, nDice - nZeros - nOnes];
        }
    }
}

function factorial(n: number) {
    var result = 1
    for (var i = 1; i <= n; ++i) {
        result *= i
    }
    return result
}
const pow = Math.pow

export function dice3Probability(nZeros: number, nOnes: number, nTwos: number) {
    let n = nZeros + nOnes + nTwos;

    return factorial(n) / (factorial(nZeros) * factorial(nOnes) * factorial(nTwos) * pow(3, n))
}

function getOrDefault<K, V>(m: Map<K, V>, key:K, defaultValue:V): V {
    const mapValue = m.get(key);
    if (isUndefined(mapValue)) {
        return defaultValue;
    }
    return mapValue
}

export function dice3Distribution(n: number) {
    let result: Map<number, number> = new Map()
    for (var i = 0; i <= 2 * n; ++i) {
        result.set(i, 0.0)
    }
    for (let perm of dice3Permutations(n)) {
        let [nZeros, nOnes, nTwos] = perm
        let probability = dice3Probability(perm[0], perm[1], perm[2])
        let score = nOnes + 2 * nTwos
        result.set(score, getOrDefault(result, score, 0.0) + probability)
    }
    return result
}

export function addNumberToDistribution(distribution: Map<number, number>, x: number) {
    let result = new Map()
    for (let i of distribution.keys()) {
        result.set(i + x,  distribution.get(i))
    }
    return result
}

export class Multisum {
    constructor(
        public exclusive: number,
        public inclusive: number) {
    }
}

export class DistributionSummaryEntry {
    public preSum: Multisum
    public postSum: Multisum
    constructor(public n :number, preSumExclusive: number, current: number, postSumInclusive: number) {
        this.preSum = new Multisum(preSumExclusive, preSumExclusive + current)
        this.postSum = new Multisum(postSumInclusive - current, postSumInclusive)
    }
}

function sum(iterable: any) {
    var r = 0
    for (let x of iterable) {
        r += x
    }
    return r
}

export function makeDistributionSummary(distribution: Map<number, number>): DistributionSummaryEntry[] {
    var preSum = 0
    var postSum = sum(distribution.values())
    let entries = Array.from(distribution.entries())
    entries.sort((lh, rh) => {
        let x = lh[0]
        let y = rh[0]
        if (x < y) {
            return -1
        } else if (x > y) {
            return 1
        } else {
            return 0
        }
    })

    function* generator() {

        for (let [score, probability] of entries) {
            yield new DistributionSummaryEntry(score, preSum, probability, postSum)
            preSum += probability
            postSum -= probability
        }
    }

    return Array.from(generator());
}

export function subtractDistributions(leftDistribution: Map<number, number>, rightDistribution: Map<number, number>):Map<number, number> {
    let result: Map<number, number> = new Map()
    for (let [leftScore, leftProb] of leftDistribution.entries()) {
        for (let [rightScore, rightProb] of rightDistribution.entries()) {
            let cuScore = leftScore - rightScore
            let oldValue = getOrDefault(result, cuScore, 0.0)
            result.set(cuScore, oldValue + leftProb * rightProb)
        }
    }
    return result
}
