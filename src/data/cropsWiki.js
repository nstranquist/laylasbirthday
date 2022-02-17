// Import SVG
import { ReactComponent as CarrotSvg } from '../assets/crops/carrot.svg'
import { ReactComponent as BlueberrySvg } from '../assets/crops/blueberries.svg'
import { ReactComponent as StrawberrySvg } from '../assets/crops/strawberry.svg'
import { ReactComponent as CornSvg } from '../assets/crops/corn.svg'
import { ReactComponent as KaleSvg } from '../assets/crops/kale.svg'
import { ReactComponent as PotatoSvg } from '../assets/crops/potato.svg'
import { ReactComponent as EggSvg } from '../assets/crops/egg.svg'
import { ReactComponent as HeckberrySvg } from '../assets/crops/heckberry.svg'


/**
 * Need a place to store fun information about crops and stuff
 * - ex: Carrot Plot: 'grow lots of carrots to satisfy those bunnies!'
 * - xp: 50,
 * - time: 15 seconds
 * - gold: 25 (if doing gold?)
 * - clicks: 10 (# of clicks to harvest the crop)
 * - duration(?): (timer until crop finishes)
 */

export const crops = {
  carrot: {
    id: 'carrot', // or uuid from dynamo lol
    name: "Carrot",
    desc: "Since ancient times, this cruchy munchy attracts bunnies and boosts eyesight.",
    xp: 50,
    time: 15,
    gold: 25,
    SvgImage: CarrotSvg // relative path, or s3 path to the svg, or... react component?
  },
  potato: {
    id: 'potato',
    name: "Carrot",
    desc: "With 100+ types, the potato is most versatile. Often used to describe a block head and dehydrate you.",
    xp: 50,
    time: 15,
    gold: 25,
    SvgImage: PotatoSvg
  },
  kale: {
    id: "kale",
    name: "Kale",
    desc: "Mmm, a leaf tasting worse than bitter tea. Unless cooked of course, then it's fantastic.",
    xp: 50,
    time: 15,
    gold: 25,
    SvgImage: KaleSvg
  },
  egg: {
    id: "egg",
    name: "Egg",
    desc: "No one ever tell you have to grow eggs? Such a shame. Much simpler than using chickens...",
    xp: 100,
    time: 15,
    gold: 25,
    SvgImage: EggSvg
  },
  corn: {
    id: "corn",
    name: "Corn",
    desc: "Tall and useless. Not sure why we grow these things... Don't run into aliens roaming the fields.",
    xp: 5,
    time: 3,
    gold: 5,
    SvgImage: CornSvg
  },
  strawberry: {
    id: "strawberry",
    name: "Strawberry",
    desc: "Juicy, red, sweet, scrumptious, delectable, luscious, succulent little morsels!",
    xp: 80,
    time: 20,
    gold: 30,
    SvgImage: StrawberrySvg
  },
  blueberry: {
    id: "blueberry",
    name: "Blueberry",
    desc: "Almost as much to say about it as the strawberry. Some might argue it better, but it doesn't go with as many other things. I rest my case.",
    xp: 80,
    time: 20,
    gold: 30,
    SvgImage: BlueberrySvg
  },
  heckberry: {
    id: "heckberry",
    name: "Heckberry",
    desc: "Heck is this? After close evaluation, it seems this is the strange fruit of the mystery tree only found in labs! It is said to have unpredictable effects :O",
    xp: () => (Math.random()*200),
    time: () => (Math.random()*30),
    gold: 15,
    SvgImage: HeckberrySvg // Make it like a huckleberry or something.
  }
  // ...
}