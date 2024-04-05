/**
 * @author Space.yg
 */

import { RoboticArmTierDesign } from "../../classes/designs/RoboticArmTierDesign.js"
import { Requirements } from "../../classes/designs/Requirements.js"

// Lab Balancer 11x11
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 11, height: 11 }, symmetrical: true, price: { gold: 704 }, requirements: new Requirements(), blueprintId: "w6cpc0" })
// Universal Lab Balancer 13x13
new RoboticArmTierDesign({ name: "Universal", category: "Lab Balancer", size: { width: 13, height: 13 }, symmetrical: true, price: { gold: 2960 }, requirements: new Requirements({ roboticArmTier: 1 }), blueprintId: "d3yzjt" })
new RoboticArmTierDesign({ name: "Universal", category: "Lab Balancer", size: { width: 13, height: 13 }, symmetrical: true, price: { gold: 9360 }, requirements: new Requirements({ roboticArmTier: 2 }), blueprintId: "5rthf2" })
new RoboticArmTierDesign({ name: "Universal", category: "Lab Balancer", size: { width: 13, height: 13 }, symmetrical: true, price: { gold: 25360 }, requirements: new Requirements({ roboticArmTier: 3 }), blueprintId: "afsqzv" })
new RoboticArmTierDesign({ name: "Universal", category: "Lab Balancer", size: { width: 13, height: 13 }, symmetrical: true, price: { gold: 89360 }, requirements: new Requirements({ roboticArmTier: 4 }), blueprintId: "89dbq1" })
// Universal Lab Balancer 15x15
new RoboticArmTierDesign({ name: "Universal", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: true, price: { gold: 3088 }, requirements: new Requirements({ roboticArmTier: 1 }), blueprintId: "kf2w0l" })
new RoboticArmTierDesign({ name: "Universal", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: true, price: { gold: 9488 }, requirements: new Requirements({ roboticArmTier: 2 }), blueprintId: "x048p7" })
new RoboticArmTierDesign({ name: "Universal", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: true, price: { gold: 25488 }, requirements: new Requirements({ roboticArmTier: 3 }), blueprintId: "basszf" })
new RoboticArmTierDesign({ name: "Universal", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: true, price: { gold: 89488 }, requirements: new Requirements({ roboticArmTier: 4 }), blueprintId: "wtflbm" })
// Coal Lab Balancer 15x15
new RoboticArmTierDesign({ name: "Coal", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: false, price: { gold: 5116 }, requirements: new Requirements({ roboticArmTier: 1 }), blueprintId: "yxlya3" })
new RoboticArmTierDesign({ name: "Coal", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: false, price: { gold: 11516 }, requirements: new Requirements({ roboticArmTier: 2 }), blueprintId: "1chblt" })
new RoboticArmTierDesign({ name: "Coal", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: false, price: { gold: 27516 }, requirements: new Requirements({ roboticArmTier: 3 }), blueprintId: "xpy3j0" })
new RoboticArmTierDesign({ name: "Coal", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: false, price: { gold: 91516 }, requirements: new Requirements({ roboticArmTier: 4 }), blueprintId: "ya835f" })
// Nuclear Lab Balancer 15x15
new RoboticArmTierDesign({ name: "Nuclear", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: false, price: { gold: 503158 }, requirements: new Requirements({ roboticArmTier: 1 }), blueprintId: "2wd1yb" })
new RoboticArmTierDesign({ name: "Nuclear", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: false, price: { gold: 509558 }, requirements: new Requirements({ roboticArmTier: 2 }), blueprintId: "vqm4lf" })
new RoboticArmTierDesign({ name: "Nuclear", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: false, price: { gold: 525558 }, requirements: new Requirements({ roboticArmTier: 3 }), blueprintId: "ap21gs" })
new RoboticArmTierDesign({ name: "Nuclear", category: "Lab Balancer", size: { width: 15, height: 15 }, symmetrical: false, price: { gold: 589558 }, requirements: new Requirements({ roboticArmTier: 4 }), blueprintId: "cnzvmp" })
// Lab Balancer 19x19
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 19, height: 19 }, symmetrical: true, price: { gold: 35328 }, requirements: new Requirements({ roboticArmTier: 2, maxBeltSpeed: 165 }), blueprintId: "f3s325" })
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 19, height: 19 }, symmetrical: true, price: { gold: 99328 }, requirements: new Requirements({ roboticArmTier: 3, maxBeltSpeed: 330 }), blueprintId: "13m0ys" })
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 19, height: 19 }, symmetrical: true, price: { gold: 355328 }, requirements: new Requirements({ roboticArmTier: 4 }), blueprintId: "1xkq98" })
// Lab Balancer 17x17
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 17, height: 17 }, symmetrical: true, price: { gold: 89992 }, requirements: new Requirements({ roboticArmTier: 4, minBeltSpeed: 480, maxBeltSpeed: 480 }), blueprintId: "dkfjah" })
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 17, height: 17 }, symmetrical: true, price: { gold: 90016 }, requirements: new Requirements({ roboticArmTier: 4, minBeltSpeed: 450, maxBeltSpeed: 450 }), blueprintId: "tahr1y" })
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 17, height: 17 }, symmetrical: true, price: { gold: 89952 }, requirements: new Requirements({ roboticArmTier: 4, minBeltSpeed: 420, maxBeltSpeed: 420 }), blueprintId: "9az1tm" })
// Lab Balancer 21x21
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 21, height: 21 }, symmetrical: true, price: { gold: 10112 }, requirements: new Requirements({ roboticArmTier: 1, maxBeltSpeed: 175 }), blueprintId: "kmb48y" })
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 21, height: 21 }, symmetrical: true, price: { gold: 35712 }, requirements: new Requirements({ roboticArmTier: 2, maxBeltSpeed: 355 }), blueprintId: "0mnjlc" })
new RoboticArmTierDesign({ category: "Lab Balancer", size: { width: 21, height: 21 }, symmetrical: true, price: { gold: 99712 }, requirements: new Requirements({ roboticArmTier: 3 }), blueprintId: "md76lv" })