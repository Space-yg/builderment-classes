/**
 * @author Space.yg
 */

// Constants
export const BeltSpeeds = [150, 165, 180, 195, 210, 240, 270, 300, 330, 375, 420, 450, 480] as const
export const TunnelLengths = [4, 5, 6] as const
export const RoboticArmTiers = [0, 1, 2, 3, 4] as const

/** The options for the {@link Requirements} class */
export interface RequirementsOptions {
    /** The minimum belt speed of the build */
    minBeltSpeed: typeof BeltSpeeds[number]
    /** The maximum belt speed of the build */
    maxBeltSpeed: typeof BeltSpeeds[number]
    /** The minimum belt tunnel length of the build */
    tunnelLength: typeof TunnelLengths[number]
    /** The robotic arm tier of the build */
    roboticArmTier: typeof RoboticArmTiers[number]
}

function arrToString(arr: any[]) {
    var s = ""
    arr.forEach((element, i) => s += element + (i === arr.length - 1 ? "" : i === arr.length - 2 ? ", and " : " "))
    return s
}

/** Requirements of a build */
export class Requirements {
    /** The minimum belt speed of the build */
    minBeltSpeed: RequirementsOptions["minBeltSpeed"]
    /** The maximum belt speed of the build */
    maxBeltSpeed: RequirementsOptions["maxBeltSpeed"]
    /** The minimum belt tunnel length of the build */
    tunnelLength: RequirementsOptions["tunnelLength"]
    /** The robotic arm tier of the build */
    roboticArmTier: RequirementsOptions["roboticArmTier"]

    /**
     * Constructs a Requirements object
     * @param options The settings of the build
     */
    constructor(options: Partial<RequirementsOptions> = {}) {
        // minBeltSpeed
        if (typeof options.minBeltSpeed === "undefined") this.minBeltSpeed = BeltSpeeds[0]
        else if (BeltSpeeds.every(beltSpeed => options.minBeltSpeed !== beltSpeed)) throw new Error(`minBeltSpeed (${options.minBeltSpeed}) is not a valid belt speed. Valid numbers include the following: ${arrToString([...BeltSpeeds])}`)
        else this.minBeltSpeed = options.minBeltSpeed

        // maxBeltSpeed
        if (typeof options.maxBeltSpeed === "undefined") this.maxBeltSpeed = BeltSpeeds.at(-1)!
        else if (BeltSpeeds.every(beltSpeed => options.maxBeltSpeed !== beltSpeed)) throw new Error(`maxBeltSpeed (${options.maxBeltSpeed}) is not a valid belt speed. Valid numbers include the following: ${arrToString([...BeltSpeeds])}`)
        else this.maxBeltSpeed = options.maxBeltSpeed

        // minBeltSpeed > maxBeltSpeed
        if (this.minBeltSpeed > this.maxBeltSpeed) throw new Error(`minBeltSpeed (${this.minBeltSpeed}) cannot be greater than maxBeltSpeed (${this.maxBeltSpeed})`)

        // tunnelLength
        if (typeof options.tunnelLength === "undefined") this.tunnelLength = TunnelLengths[0]
        else if (TunnelLengths.every(length => options.tunnelLength !== length)) throw new Error(`tunnelLength (${options.tunnelLength}) is not a valid length. Valid numbers include the following: ${arrToString([...TunnelLengths])}`)
        else this.tunnelLength = options.tunnelLength

        // roboticArmTier
        if (typeof options.roboticArmTier === "undefined") this.roboticArmTier = RoboticArmTiers[0]
        else if (RoboticArmTiers.every(length => options.roboticArmTier !== length)) throw new Error(`roboticArmTier (${options.roboticArmTier}) is not a valid tier. Valid numbers include the following: ${arrToString([...RoboticArmTiers])}`)
        else this.roboticArmTier = options.roboticArmTier
    }
}