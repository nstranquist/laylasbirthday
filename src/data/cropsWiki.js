// Import SVG
import { ReactComponent as CarrotSvg } from '../assets/crops/carrot.svg'


/**
 * Need a place to store fun information about crops and stuff
 * - ex: Carrot Plot: 'grow lots of carrots to satisfy those bunnies!'
 * - xp: 50,
 * - time: 15 seconds
 * - gold: 25 (if doing gold?)
 */

export const crops = {
  carrot: {
    id: 'carrot', // or uuid from dynamo lol
    name: "Carrot",
    desc: "This attracts bunnies and boosts eyesight",
    xp: 50,
    time: 15,
    gold: 25,
    SvgImage: CarrotSvg // relative path, or s3 path to the svg, or... react component?
  },
  // ...
}