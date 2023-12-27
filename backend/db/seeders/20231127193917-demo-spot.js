'use strict';

const { Spot } = require('../models');
const { Op } = require('sequelize');

// Set Schema and Table name on options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Spots";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: "1 Razor Crest Avenue",
      city: "Razor Crest",
      state: "Arvala-7",
      country: "Outer Rim",
      lat: 0,
      lng: 0,
      name: "Grogu's Galactic Retreat",
      description: "Mmm, welcome to Grogu's Galactic Retreat! Nestled among the stars, this cozy hideaway is perfect for those seeking an out-of-this-world adventure. Step into our snug space, where the Force is strong and the ambiance serene. From the adorable decor to the floating crib, every detail is crafted for comfort and cuteness. The views? Simply stellar! Whether you're gazing out at distant planets or enjoying a peaceful sunset, relaxation is guaranteed. Need a snack? Fear not, our kitchenette has all the space macarons and frog snacks you could dream of. So, pack your bags, book your stay, and experience the magic of Grogu's Galactic Retreat. May the cuteness be with you, always!",
      price: 300
    },
    {
      ownerId: 2,
      address: "1 Forest Way",
      city: "Deep Forest",
      state: "Dagobah",
      country: "Outer Rim",
      lat: 0,
      lng: 0,
      name: "Yoda's Tranquil Refuge",
      description: "Mmm, welcome, you are, to Yoda's Tranquil Refuge. Serene, this haven is, nestled within the verdant embrace of Dagobah's lush jungles. Humble, it may seem, but powerful, the Force is, within these walls. Step into this cozy dwelling, you must, where tranquility and harmony abound. Surrounded by nature's embrace, a sanctuary this is, for meditation and reflection. Glimpse the wisdom of ancient texts or wander the mystical pathways that lead to enlightenment. Fear not the size, for luminous beings are we, not this crude matter. Ready, are you, to embark on an awakening journey? Book your stay, you must, and experience the Force's embrace in Yoda's Tranquil Refuge.",
      price: 350,
    },
    {
      ownerId: 3,
      address: "78 Palace Avenue",
      city: "Dune Sea",
      state: "Tatooine",
      country: "Outer Rim",
      lat: 0,
      lng: 0,
      name: "Jabba's Palace Retreat",
      description: "Ah, greetings, esteemed travelers! Welcome to Jabba's Palace Retreat, a haven of indulgence for those seeking the ultimate in luxury and opulence. Nestled in the heart of Tatooine, this lavish spot offers spacious accommodations fit for royalty. Feast your eyes on the grandeur of Jabba's private chambers, adorned with exquisite decor that reflects the exquisite tastes of the Hutt cartel. Our culinary delights are second to none, with a team of renowned chefs ready to satisfy your every craving. The palace boasts an expansive entertainment area, perfect for hosting grand celebrations or simply basking in the pleasure of Jabba's hospitality. So, if you seek an unforgettable experience where indulgence knows no bounds, reserve your stay at Jabba's Palace Retreat. The galaxy's most decadent escape awaits you!",
      price: 2000,
    },
    {
      ownerId: 4,
      address: "22 Sky Blvd",
      city: "Cloud City",
      state: "Bespin",
      country: "Inner Rim",
      lat: 0,
      lng: 0,
      name: "Lando's Sky Escape",
      description: "Welcome to Lando's Sky Escape! Nestled high above the clouds on the stunning planet of Bespin, this luxurious retreat offers the pinnacle of sophisticated living. Step into the elegance of Cloud City, where every corner exudes charm and style. From the sleek corridors to the panoramic views of the cloud-covered landscape, indulge in opulence like never before. Our spacious suites boast the finest amenities, perfect for a smooth and lavish stay. Fancy a game of sabacc? Our entertainment district is the place to be. And don't forget our exclusive dining experiences—you'll savor flavors from across the galaxy. So, if you're ready for a stay that's as smooth as my charm, book your adventure at Lando's Sky City Escape. Trust me, it's a deal you won't want to miss!",
      price: 1050,
    },
    {
      ownerId: 5,
      address: "1 Desert Way",
      city: "Lars Farm",
      state: "Tatooine",
      country: "Outer Rim",
      lat: 0,
      lng: 0,
      name: "Tatooine Dream",
      description: "This sandy home is an absolute Tatooine Dream! My aunt and uncle raised me here, and I used to watch the double sunset every day. Old Ben Kenobi used to roam these parts too until I found out he was actually a Jedi and the EMPIRE decided to burn up my family LOLOL, life is CRAZY!! Don't worry though, I took care of them and I haven't had any incidents like that one since I've been the owner. Let me know if you want to SKYwalk a mile in my shoes!",
      price: 200,
    },
    {
      ownerId: 6,
      address: "120 Desert Lane",
      city: "Deep Desert",
      state: "Jakku",
      country: "Outer Rim",
      lat: 0,
      lng: 0,
      name: "Millennium Homestead",
      description: "Hey there, galaxy wanderers! Welcome aboard the Millennium Homestead! Sure, she may not look like much from the outside, but this place is full of surprises. Step into a slice of Corellian comfort, where every corner tells a tale of daring adventures and smuggler savvy. The cozy lounge is perfect for swapping stories or planning your next escapade. Need a good night's rest? The bedrooms are as snug as a tauntaun in a blizzard. And let's talk about the kitchen—enough space to cook up a feast fit for a Wookiee! Plus, the view from the cockpit? Well, let's just say it's a view that'll make your heart soar faster than a jump to lightspeed. So, buckle up, book your stay at the Millennium Homestead, and get ready for a stay that's full of surprises and a touch of that Solo swagger!",
      price: 249,
    },
    {
      ownerId: 7,
      address: "33 Temple Lane",
      city: "Galactic City",
      state: "Coruscant",
      country: "Inner Rim",
      lat: 0,
      lng: 0,
      name: "Jedi Sanctuary Retreat",
      description: "Welcome to the Jedi Sanctuary Retreat, a tranquil haven nestled amidst the serene landscapes of Tatooine. This humble abode, veiled in quiet seclusion, offers respite from the chaos of the galaxy. Step into a dwelling that embodies peace and wisdom, where the Force resonates in every corner. The living spaces, modest yet comforting, invite you to unwind and reflect. Wander the arid plains or find solace in the meditation garden, where the Force whispers its secrets to those who seek understanding. With a view of twin sunsets that paint the sky in hues of orange and gold, experience a sense of tranquility that transcends worlds. Book your stay at the Jedi Sanctuary Retreat and embrace the serenity that resides within these walls.",
      price: 300,
    },
    {
      ownerId: 8,
      address: "99 Space Place",
      city: "Upper Atmosphere",
      state: "Alderaan",
      country: "Core Worlds",
      lat: 0,
      lng: 0,
      name: "Death Star Bungalo",
      description: "Welcome to the Death Star, the ultimate destination for those seeking supremacy and galactic conquest. Towering in space, this technological marvel offers an experience like no other. Marvel at the sheer magnitude of power as you traverse its labyrinthine corridors and witness the awe-inspiring capabilities of this fully armed and operational battle station. Our luxurious accommodations cater to the elite, providing unparalleled views of distant stars and the vastness of space. Experience the grandeur of our state-of-the-art facilities, from the throne room to the command center, each exuding authority and command. For those ready to commandeer the galaxy and enforce their will, book your stay at the Death Star and embark on a journey towards ultimate control.",
      price: 500
    },
    {
      ownerId: 9,
      address: "101 Villa Way",
      city: "Varykino",
      state: "Naboo",
      country: "Trailing Sectors",
      lat: 0,
      lng: 0,
      name: "Vakyrino Villa",
      description: "Welcome to the Vakyrino Villa — a testament to opulence and serenity nestled within the breathtaking landscapes of Naboo. Behold the elegance and grace of this lavish estate, where every corner exudes luxury and tranquility. Surrounded by lush gardens and overlooking the serene Lake Country, this villa offers a retreat unlike any other. Step into the spacious and exquisitely designed rooms, where comfort meets sophistication. Our amenities cater to the most discerning guests, from the serene meditation rooms to the extravagant ballrooms perfect for hosting grand galactic soirées. Indulge in the finest cuisine prepared by our renowned chefs or simply bask in the splendor of the villa's stunning vistas. For those seeking an unparalleled getaway, reserve your stay at the Vakyrino Villa and immerse yourself in the pinnacle of Naboo's refined living.",
      price: 500
    },
    {
      ownerId: 5,
      address: "77 Island Place",
      city: "Northern Latitudes",
      state: "Ahch-To",
      country: "Trailing Sectors",
      lat: 0,
      lng: 0,
      name: "Jedi Hideaway",
      description:
      "Welcome to Jedi Island, where the Force flows through the very soil beneath your feet. Tucked away in the tranquil embrace of Ahch-To's rugged beauty, this secluded haven is steeped in the legacy of the Jedi Order. Picture yourself amidst ancient stone structures, remnants of a bygone era, where wisdom and contemplation intertwine. The mesmerizing vistas of crashing waves and towering cliffs create an ethereal backdrop for self-discovery and reflection. Our modest yet comfortable dwellings provide respite from the hustle of the galaxy, inviting you to delve into the teachings of the Force. Wander the mystical pathways, meditate by the ancient tree, or immerse yourself in the lore within the Jedi library. For those seeking enlightenment and a connection with the Force, a stay on Jedi Island promises an unforgettable journey of discovery and purpose.",
      price: 500
    }

   ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
        address: {
          [Op.in]: ["6168 Yeadon Way","123 Easy Street", "521 E 14th Street"]
        }
    });
  }
};
