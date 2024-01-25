'use strict';

const { Review } = require('../models');
const { Op } = require('sequelize');

// Set Schema and Table name on options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Reviews"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: "Mmm, a stay on Arvala-7, an adventure it was! Remote and serene, the planet's beauty is, hmm. The hosts, gracious they were, providing guidance through the rugged terrain. Cozy accommodations, blending with nature they did, though, comfort could improve, it might. Access, challenging it may be, but a unique experience, it offered. The Jawas, delightful and full of surprises they were, adding a spark of joy to the stay. Sunset views, spectacular they were, painting the skies in hues of tranquility. For those seeking an offbeat journey, Arvala-7, consider you must.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: "I, Jabba the Hutt, had an interesting stay on Arvala-7. Remote and rugged, this planet provided a unique backdrop for a brief respite from the galaxy's chaos. The hosts, though small, were resourceful in guiding through the challenging terrain. Accommodations were a bit tight for my taste, being accustomed to larger spaces, but they blended well with the natural surroundings. Accessibility was a tad cumbersome for someone of my stature, yet the local Jawas were surprisingly helpful. The sunsets, a delightful spectacle, painted the desert in hues that even my palace on Tatooine couldn't match. Overall, an intriguing experience for those seeking an adventurous escape, though not quite suited for someone of my royal... err, sizable stature.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 4,
        review: "I must say, my stay at Yoda's Hut was far from what I expected. Firstly, the accommodations were severely lacking in the comforts one would expect from a galaxy-renowned Jedi Master. The hut itself felt cramped and outdated, with little to no luxury amenities—a far cry from Cloud City's lavish standards. The swampy surroundings were not only unpleasant but attracted a myriad of pesky creatures that disrupted any chance of relaxation. As for the host, Master Yoda's cryptic teachings and unconventional approach to hospitality left much to be desired. His odd diet of rootleaf stew wasn't exactly to my liking either. Overall, not recommended for anyone seeking a comfortable or refined retreat. Perhaps better suited for those with a penchant for ascetic living and a love for swamps.",
        stars: 2
      },
      {
        spotId: 2,
        userId: 5,
        review: "Staying at Yoda's Hut was an experience beyond words. Tucked away on the mystical planet of Dagobah, this humble abode holds more wisdom and serenity than meets the eye. The host, Master Yoda himself, welcomed me with open arms and an abundance of teachings. The accommodations were modest, yet they radiated with the Force, creating an ambiance of tranquility that seeped into every corner. The natural surroundings were awe-inspiring, from the mystical swamps to the ancient trees. However, be prepared for rustic living and occasional visits from curious creatures! Master Yoda's guidance and the hut's peaceful aura made it a place of profound learning and introspection. A must-visit for any Jedi or seeker of wisdom looking to commune with the Force.",
        stars: 5
      },
      {
        spotId: 4,
        userId: 4,
        review: "I recently stayed at Ahch-To and, let me tell you, it was quite an experience. The island itself is breathtakingly beautiful, with stunning vistas that could rival even the most picturesque spots in the galaxy. However, that's where the positives end. Accessibility to this remote location was a challenge, to say the least. The lack of modern amenities or even basic comforts left much to be desired. The host, Luke Skywalker, was, let's say, more preoccupied with mysterious teachings than catering to guests' needs. His secluded lifestyle and minimalist approach may suit some, but it wasn't what I had in mind for a relaxing retreat. Additionally, the persistent presence of those bizarre Porgs became more of a nuisance than a charming addition to the environment. Overall, a stunning location, but definitely not the ideal vacation spot for those accustomed to a more refined experience.",
        stars: 3
      },
      {
        spotId: 5,
        userId: 9,
        review: "This was such a dessert (notice how I didn't say desert?). Truly it was a sweet spot. Gotta love the stone, and I mean, living in a hole? Who could beat it",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: "I got sand in my slime.",
        stars: 1
      },
      {
        spotId: 5,
        userId: 4,
        review: "Annual Wookie Bash, can I get a HGHHGGGGHGGGHHGGHGGHHHGGHGHGHGGGGHGGHH. A pleasure and a treasure. But sup with those Jawas? I mean c'mon man. Go get your own trash. This trash is mine. Other than that, a real light in my life and I can't wait to be back next year.",
        stars: 5
      },
      {
        spotId: 6,
        userId: 4,
        review: "Staying aboard the Millennium Falcon was an adventure unlike any other! As a connoisseur of fine living, I must admit, the Falcon isn't your typical luxury suite. However, what it lacks in opulence, it more than makes up for in character and history. The ship, a relic of daring escapades and legendary tales, carries an undeniable charm that captivates the heart. Now, onto the quirks: the hyperdrive occasionally had its moments, and the accommodations were cozy, to put it mildly. Yet, those minor inconveniences were overshadowed by the exhilaration of traversing the galaxy in this iconic vessel. The cockpit's views were simply breathtaking, and the sense of camaraderie among the crew added a touch of warmth to the experience. In essence, the Millennium Falcon isn't for the faint of heart, but for those seeking a thrilling, storied adventure through the stars, it's an unforgettable ride!",
        stars: 4
      },
      {
        spotId: 6,
        userId: 1,
        review: "I stayed on Millennium Falcon, I did! Small, cozy, and full of buttons to press, it was. Views from cockpit, stars and stars, so pretty! Ship has history, yes, lots of stories. Accommodations snug, but that's okay, soft blanket made it good for naps. Crew nice, especially Chewbacca, big and fuzzy. Hyperdrive sometimes didn't work, but fun adventure it made! Ship noisy, lights flashing, but exciting! Had to be careful with buttons, though, ship didn't like it much. Overall, great adventure, lots of fun for little Jedi like me!",
        stars: 5
      },
      {
        spotId: 7,
        userId: 6,
        review:
        "Galactic City? Yeah, it was alright. Pretty big place with lots going on—almost too much, if you ask me. The skyline's impressive, sure, but the crowds and noise can get old real fast. The accommodations were decent, nothing fancy but did the job. Food options? Eh, nothing compared to what you'd find in the Outer Rim. The hosts were... well, let's just say they've got their own way of doing things. Overall, if you're into the whole 'city life' thing, it might be your cup of caf. Personally, I prefer the quiet of a good old-fashioned smuggling run. But hey, to each their own.",
        stars: 3
      },
      {
        spotId: 7,
        userId: 8,
        review: "I stayed in Galactic City, and what a disappointment it was. This so-called 'metropolis' lacked the grandeur and order I expect in an urban center. Chaos ruled the streets, and the constant noise and commotion were unbearable. The architecture was uninspiring, lacking the magnificence befitting the might of the Empire. The accommodations were subpar, to say the least—far from the imperial standards I demand. The constant presence of rebels and dissidents made security a constant concern. The hosts, the Imperial bureaucracy, were inefficient and failed to address my concerns. Overall, an abysmal experience that fell far below the standards of the Empire. Would not recommend for anyone seeking order and control.",
        stars: 1
      },
      {
        spotId: 8,
        userId: 7,
        review: "I stayed at the Death Star, and while it's certainly impressive in size and technological prowess, I found it to be rather, well, imposing. The accommodations were functional, but the overall aesthetic felt a bit cold and sterile. Accessibility was a challenge, as the sheer scale of the station made navigation quite the task. The security measures were, understandably, stringent, which didn't exactly contribute to a relaxing atmosphere. The hosts, the Imperial personnel, were, let's say, not the most accommodating, but I suppose that's part of the deal when staying in a battle station. In summary, an experience that's more about its magnitude than comfort, and not exactly my preferred vacation spot.",
        stars: 2
      },
      {
        spotId: 9,
        userId: 10,
        review: "Vakyrian Villa was an absolute dream! Nestled in the heart of Naboo's serene beauty, this villa surpassed all expectations. From the moment I arrived, the hosts welcomed me with genuine warmth and grace. The villa itself was a masterpiece of elegance, blending Naboo's rich cultural heritage with modern comforts flawlessly. The accommodations were spacious and luxurious, offering stunning views of the picturesque landscape. Every detail was meticulously curated, from the lush gardens to the exquisite décor, creating an ambiance of refined tranquility. The hosts' hospitality was exceptional, attending to every need with genuine care and attention. The dining experiences were exquisite, showcasing Naboo's delectable cuisine in its finest form. A stay at Vakyrian Villa is an immersive journey into elegance, sophistication, and the pure beauty of Naboo's charm. Highly recommended for a luxurious and unforgettable retreat.",
        stars: 5
      },
      {
        spotId: 11,
        userId: 6,
        review: "Alright, so here's the deal with the Hoth Rebel Base. It's cold, I mean really cold. But hey, it's Hoth, what did you expect? The accommodations, well, they're snug and functional, keeping you warm amidst all that ice and snow. The base itself? Impressive defense systems and all that, but it's not exactly a luxury resort. You'll get your share of adventures, from tauntaun rides to dodging Imperial walkers. The surrounding scenery? Majestic, in that freezing sort of way. But hey, if you're up for some Rebel spirit and don't mind a bit of frostbite, it's an experience you won't forget. Just make sure to pack your thermal gear!",
        stars: 4
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete(options, {
        spotId: {
          [Op.in]: [1, 2, 3]
        }
    });
  }
};
