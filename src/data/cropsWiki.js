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
 * - could add cost if time...
 */

export const crops = {
  carrot: {
    id: 'carrot', // or uuid from dynamo lol
    name: "Carrot",
    desc: "Since ancient times, this cruchy munchy attracts bunnies and boosts eyesight.",
    code: 1,
    price: 0,
    xp: 15,
    time: 2,
    gold: 15,
    level: 1,
    SvgImage: CarrotSvg // relative path, or s3 path to the svg, or... react component?
  },
  // 2 carrots to get potato (30xp)
  potato: {
    id: 'potato',
    name: "Potato",
    desc: "With 100+ types, the potato is most versatile. Often used to describe a block head and dehydrate you.",
    code: 2,
    price: 20,
    xp: 25,
    time: 3,
    gold: 25,
    level: 3,
    SvgImage: PotatoSvg
  },
  // 2 potatos to get kale (75xp)
  kale: {
    id: "kale",
    name: "Kale",
    desc: "Mmm, a leaf tasting worse than bitter tea. Unless cooked of course, then it's fantastic.",
    code: 3,
    price: 40,
    xp: 50,
    time: 5,
    gold: 25,
    level: 5,
    SvgImage: KaleSvg
  },
  // 2 kale to get egg (175xp)
  egg: {
    id: "egg",
    name: "Egg",
    desc: "No one ever tell you to grow eggs? Such a shame. Much simpler than using chickens...",
    code: 4,
    price: 60,
    xp: 100,
    time: 8,
    gold: 45,
    level: 7,
    SvgImage: EggSvg
  },
  // 3 egg to get corn (475xp)
  corn: {
    id: "corn",
    name: "Corn",
    desc: "Tall and useless. Not sure why we grow these things... Don't run into aliens roaming the fields.",
    code: 5,
    price: 80,
    xp: 145,
    time: 13,
    gold: 90,
    level: 9,
    SvgImage: CornSvg
  },
  // 5 corn to get strawberry (1200xp)
  strawberry: {
    id: "strawberry",
    name: "Strawberry",
    desc: "Juicy, red, sweet, scrumptious, delectable, luscious, succulent little morsels!",
    code: 6,
    price: 100,
    xp: 180,
    time: 18,
    gold: 125,
    level: 11,
    SvgImage: StrawberrySvg
  },
  // 4 strawberry to get blueberry (1920xp)
  blueberry: {
    id: "blueberry",
    name: "Blueberry",
    desc: "Almost as much to say about it as the strawberry. Some might argue its better, but it doesn't go with as many other things. I rest my case.",
    code: 7,
    price: 140,
    xp: 245,
    time: 24,
    gold: 1000,
    level: 12,
    SvgImage: BlueberrySvg
  },
  // 5 blueberry to get heckberry (3145xp)
  heckberry: {
    id: "heckberry",
    name: "Heckberry",
    desc: "Heck is this? After close evaluation, it seems this is the strange fruit of the mystery tree only found in labs! It is said to have unpredictable effects :O",
    code: 8,
    price: 180,
    xp: 450, //(() => Math.floor(Math.random()*200 + 450))(),
    gold: 2250, //(() => Math.floor(Math.random()*500 + 2000))(),
    time: 34,
    level: 13,
    SvgImage: HeckberrySvg // Make it like a huckleberry or something.
  },
  // 


  // ...
  empty: {
    id: 'empty',
    name: 'Empty',
    desc: 'Empty!!!',
    code: 0,
    price: 0,
    xp: 0,
    time: 0,
    gold: 0,
    level: 0,
    SvgImage: <></>,
  },
}