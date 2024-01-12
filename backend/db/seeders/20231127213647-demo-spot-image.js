'use strict';

// Set Schema and Table name on options object
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "SpotImages"


const { SpotImage } = require('../models');
const { Op } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Seeding intial data
  async up (queryInterface, Sequelize) {
    SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://www.brickvault.toys/cdn/shop/products/sq_d0_1050x1050.png?v=1612216977",
        preview: true
      },
      {
        spotId: 1,
        url: "https://i.pinimg.com/originals/75/23/ce/7523ce5e4ffab595334174d6082232a7.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://thewestsidegazette.com/wp-content/uploads/2021/03/F-Picture-shows-the-inside-of-the-replica-of-the-Razor-Crest-spaceship-from-The-Mandalorian-spin-off-who-was-built-by-Ayaal-Fedorov-28-and-his-friends-in-Russia.-40just.ayaal-.-Real-Press.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.bobafettfanclub.com/tn/640x640/multimedia/galleries/albums/userpics/10001/boba-fett-s-ship-interior-illustration-by-ryan-church-1650782157.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2023/03/15211106/Mandalorian-Filming-Locations-1.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://lumiere-a.akamaihd.net/v1/images/yodas-hut_a3d1133d.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://blenderartists.org/uploads/default/original/4X/e/d/b/edb26267d15fbaae57dc354ae7c20bb1127ef601.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://lumiere-a.akamaihd.net/v1/images/Dagobah_890df592.jpeg",
        preview: false
      },
      {
        spotId: 2,
        // url: "https://drive.google.com/uc?id=1cEB2FSHb3Mq7VbCy69elHT9OKka35Vdn",
        url: "https://www.dropbox.com/scl/fi/50bduieuycitegj5rvqm4/yoda-hut-1.jpeg?rlkey=8t37pj8ju3cqlos1jbha8i7sd&raw=1",
        preview: false
      },
      {
        spotId: 2,
        // url: "https://drive.google.com/uc?id=15i8l4HRW34sRC4jUlY7YSAyemQ8Su2pc",
        url: "https://www.dropbox.com/scl/fi/osbgjz96tnhmw41vdhuzq/yoda-hut-2.png?rlkey=2cwpxnslvkbbdzzm1ot7o80w7&raw=1",
        preview: false
      },
      {
        spotId: 3,
        url: "https://qph.cf2.quoracdn.net/main-qimg-f1d6ea592cf3fc4b94e6bf784a6446c4-lq",
        preview: true
      },
      {
        spotId: 3,
        // url: "https://drive.google.com/uc?id=1S5CHKo1Qa-Y0AyA16s1h2MVdD07l7Y0D",
        url: "https://www.dropbox.com/scl/fi/y77077ksr71dt4xuumgxw/jabba-palace-2.jpeg?rlkey=qeo0mhkm9eykemgfh90or1xap&raw=1",
        preview: false
      },
      {
        spotId: 3,
        url: "https://assetsio.reedpopcdn.com/star-wars-battlefront-2s-han-solo-season-adds-jabbas-palace-1525882231097.jpg?width=1200&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.squarespace-cdn.com/content/v1/545fbb2ee4b0a75b67efc889/1666896769704-4EDBLYQDNA5EVMIX4XA4/palace_lor_pic01a.JPG?format=1500w",
        preview: false
      },
      {
        spotId: 3,
        // url: "https://drive.google.com/uc?id=1-7T_s3mF2-HZ-LIDyfDqeElrp9gOIr_l",
        url: "https://www.dropbox.com/scl/fi/pn2l2frqto02jnjs5fppb/jabba-palace-3.jpeg?rlkey=55kif17eq6do27yfgy1jcdcyq&raw=1",
        preview: false
      },
      {
        spotId: 10,
        url: "https://render.fineartamerica.com/images/rendered/default/poster/8/5/break/images-medium-5/cloud-city-cynthia-decker.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://images.squarespace-cdn.com/content/v1/5bba607e049079392fbe25ac/1539335354323-XQTXLBE1VL5WCX2A0IY5/bespin-1.jpg?format=2500w",
        preview: false
      },
      {
        spotId: 10,
        url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/02/Bespin-Feature-Image-1.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.ebayimg.com/images/g/xfMAAOSwoQ9h2TWU/s-l1200.webp",
        preview: false
      },
      {
        spotId: 10,
        url: "https://img.freepik.com/premium-photo/realistic-interior-photograph-from-inside-star-wars-cloud-city-apartment-generative-ai_873793-191.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.csmonitor.com/csm/2013/11/1101-luke-skywalker-home-tunisia.jpg?alias=standard_900x600',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://inhabitat.com/wp-content/blogs.dir/1/files/2012/07/save-lars-5.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://travel.spotcoolstuff.com/wp-content/uploads/2011/02/star-wars-hotel-m.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0DvYftysclX2r6yezhW3khogOX_yDeqGMvNzHSwdpw&s',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/736x/cc/d3/83/ccd383ff052c910be451705ddf8f4c3e.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://lumiere-a.akamaihd.net/v1/images/image_a42df384.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: "https://lumiere-a.akamaihd.net/v1/images/image_f9e9cb5b.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: 'https://imgix.bustle.com/inverse/4e/14/75/f4/2e3b/4ec3/98e5/e2ab1004488f/inside-the-millennium-falcon-in-solo-a-star-wars-story.jpeg?w=1200&h=630&fit=crop&crop=faces&fm=jpg',
        preview: true
      },
      {
        spotId: 6,
        url: "https://media.king5.com/assets/KING/images/26968157-c282-4ef8-b5a8-722fb7c3d8a9/26968157-c282-4ef8-b5a8-722fb7c3d8a9_1140x641.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.pinimg.com/736x/d5/03/3c/d5033c0751774fdb05a1cdc2957f092c.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://i.pinimg.com/1200x/0a/1f/66/0a1f66e27788885c833d3e8418847d34.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://i.pinimg.com/originals/0a/ae/85/0aae85f8674735a413d587259dd332d7.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://www.renderhub.com/dazinbane/jedi-council-chamber-star-wars/jedi-council-chamber-star-wars-02.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://media1.cgtrader.com/variants/TyvMJzUVX4YXWdYA4f7Dz5pG/e44aa6a6359827c9089792cde0c079681b83d3b5c3037cc0525c25607e54355b/cam02h.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://preview.redd.it/5q11s8izdja11.jpg?width=1920&format=pjpg&auto=webp&s=026e6ea95f83869e52d0b4b5af77fd22a0a22acb",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.pinimg.com/originals/19/87/c7/1987c7091cc42c88418abe9a9707dc6a.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://www.tasbo.org/uploads/images/news/Spaceship.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://wallpapers.com/images/hd/zoom-video-background-1920-x-1080-wyl8ict6x8hhsstp.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://info.hughesenv.com/hubfs/Imported_Blog_Media/death-star.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://galacticfab.com/cdn/shop/products/1.jpg?v=1664564881",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.natgeofe.com/n/5aeb03fe-a20b-4812-a14e-c7a92ac03b91/lake-como-italy-2_16x9.jpg?w=1200",
        preview: true
      },
      {
        spotId: 9,
        url: "https://64.media.tumblr.com/94819733770a674a1ecc8dbd38d5bdd9/tumblr_oz7tuozWYG1sqzou6o1_1280.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://www.villavarykino.com/wp-content/uploads/2016/08/Villa01.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.natgeofe.com/n/0fd59470-7fcc-4a85-8cee-777f6cd63e94/lake-como-italy-1.jpg?w=1084.125&h=766.5",
        preview: false
      },
      {
        spotId: 9,
        url: "https://www.oyster.com/wp-content/uploads/sites/35/2020/03/160092-Post-Ranch-Inn127-1024x683.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://www.dropbox.com/scl/fi/8etzhefpzk6pg0vqoybov/ahch-1.jpeg?rlkey=5qismjkfcu0u0rvplbeqg28ar&raw=1",
        preview: true
      },
      {
        spotId: 4,
        // url: "https://drive.google.com/uc?id=1zJVKjNMimEeRsTAFN4hvb0NuqZ9HyrMq",
        url: "https://www.dropbox.com/scl/fi/w7ywpft7imu6rhej7qghg/ahch-2.jpeg?rlkey=wgg3mkcn243zu493oe87jmkbb&raw=1",
        preview: false
      },
      {
        spotId: 4,
        // url: "https://drive.google.com/uc?id=1wEooAkJfVGBy3y1Ttle5MF2a_WrItjCn",
        url: "https://www.dropbox.com/scl/fi/minmbrx1c31q0cqd68rke/ahch-3.jpeg?rlkey=gh503kv89kyck8ibx4lswcwog&raw=1",
        preview: false
      },
      {
        spotId: 4,
        // url: "https://drive.google.com/uc?id=1yDJbKd2VFD1vwBZtlAEUCzoTEvxHxsQN",
        url: "https://www.dropbox.com/scl/fi/z1jtimb2lwxadf8kfat6y/ahch-4.jpg?rlkey=cz996k9zpzo70chegbv5qyebk&raw=1",
        preview: false
      },
      {
        spotId: 4,
        // url: 'https://drive.google.com/uc?id=1cftk3YlgBdyYc3_iiybikxIL3sqWF8HR',
        url: "https://www.dropbox.com/scl/fi/b577pcooin2hfa6fws2uu/ahch-5.jpeg?rlkey=ujbogmoncw2a274w7cfjsto11&raw=1",
        preview: false
      },
      {
        spotId: 11,
        url: "https://imagedelivery.net/9sCnq8t6WEGNay0RAQNdvQ/UUID-cl9e6j5n43983rtolft78w6ui/public",
        preview: true
      },
      {
        spotId: 11,
        url: "https://i.ebayimg.com/images/g/GYcAAOSwyxNhrtaS/s-l1600.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://cdna.artstation.com/p/assets/covers/images/062/475/078/large/kevin-cefalo-kevin-cefalo-seq01-0113.jpg?1683216030",
        preview: false
      },
      {
        spotId: 11,
        url: "https://i.ytimg.com/vi/mTEc_6oSSjo/maxresdefault.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://i.insider.com/5e346701ab49fd20826aa527?width=1000&format=jpeg&auto=webp",
        preview: false
      },
      {
        spotId: 12,
        url: "https://steamuserimages-a.akamaihd.net/ugc/1812144454068621639/E89E617F7B9B369A1B49D2031421C15CCECFE3C3/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        preview: true
      },
      {
        spotId: 12,
        url: "https://img.freepik.com/premium-photo/flowing-lava-flow-with-glowing-fire_932514-2146.jpg?w=360",
        preview: false
      },
      {
        spotId: 12,
        url: "https://pbs.twimg.com/media/FEbspa8X0AAdQyo.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1h14s1qkleap1419kpa17712h81g.png",
        preview: false
      },
      {
        spotId: 12,
        url: "https://preview.redd.it/how-much-time-does-darth-vader-spend-in-the-bacta-tank-v0-dropbm6not3a1.jpg?auto=webp&s=205830a358e7961b2e640083dce344f938d63b61",
        preview: false
      }
    ] ,{validate: true})
  },
  // Un-seeding the initial data
  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [1, 2, 3]
      }
    });
  }
};
