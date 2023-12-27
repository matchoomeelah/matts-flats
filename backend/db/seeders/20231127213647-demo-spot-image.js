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
        // url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7d283479-10ef-48d5-b8be-f8512bca4ae9/dde5b0z-8e757866-382e-4e9c-a501-9c08df8c8923.jpg/v1/fill/w_1280,h_544,q_75,strp/yoda_s_hut_by_blazer003_dde5b0z-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTQ0IiwicGF0aCI6IlwvZlwvN2QyODM0NzktMTBlZi00OGQ1LWI4YmUtZjg1MTJiY2E0YWU5XC9kZGU1YjB6LThlNzU3ODY2LTM4MmUtNGU5Yy1hNTAxLTljMDhkZjhjODkyMy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.f1-ktYtWSPMotpj5zzAZTkzCeoABSj1_DfIk-Dt_64Q',
        url: "https://drive.google.com/uc?export=view&id=/1cEB2FSHb3Mq7VbCy69elHT9OKka35Vdn/",
        preview: false
      },
      {
        spotId: 2,
        // url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/724868c7-958f-4b1c-a72e-7b8b0d731edd/d9mo6vd-aa9a1d79-89f0-4640-b6f2-93b7504a6308.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyNDg2OGM3LTk1OGYtNGIxYy1hNzJlLTdiOGIwZDczMWVkZFwvZDltbzZ2ZC1hYTlhMWQ3OS04OWYwLTQ2NDAtYjZmMi05M2I3NTA0YTYzMDgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.SwrnObORhbvvv4-OYoEsbauYPiewqvAyOs9yvcHnpSQ',
        url: "https://drive.google.com/uc?export=view&id=/15i8l4HRW34sRC4jUlY7YSAyemQ8Su2pc/",
        preview: false
      },
      // {
      //   spotId: 3,
      //   url: "https://qph.cf2.quoracdn.net/main-qimg-f1d6ea592cf3fc4b94e6bf784a6446c4-lq",
      //   preview: true
      // },
      // {
      //   spotId: 3,
      //   url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/960dae42-3dc3-465a-a2ac-8a3888cd78ce/de8pvwi-45cc0d84-2e52-4b78-b281-6d25f266b959.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 3,
      //   url: "https://assetsio.reedpopcdn.com/star-wars-battlefront-2s-han-solo-season-adds-jabbas-palace-1525882231097.jpg?width=1200&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
      //   preview: false
      // },
      // {
      //   spotId: 3,
      //   url: "https://images.squarespace-cdn.com/content/v1/545fbb2ee4b0a75b67efc889/1666896769704-4EDBLYQDNA5EVMIX4XA4/palace_lor_pic01a.JPG?format=1500w",
      //   preview: false
      // },
      // {
      //   spotId: 3,
      //   url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/960dae42-3dc3-465a-a2ac-8a3888cd78ce/de6iipr-4b1363c3-70f0-490b-9a95-eab5776ba0ee.jpg/v1/fill/w_1024,h_486,q_75,strp/jabba_palace_interior_deluxe_showing_end_wall_by_dazinbane_de6iipr-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDg2IiwicGF0aCI6IlwvZlwvOTYwZGFlNDItM2RjMy00NjVhLWEyYWMtOGEzODg4Y2Q3OGNlXC9kZTZpaXByLTRiMTM2M2MzLTcwZjAtNDkwYi05YTk1LWVhYjU3NzZiYTBlZS5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.VnjDdJRN0LdhQAL_kcqBWV7pgBPtDl3yxIDF25wsuNA",
      //   preview: false
      // },
      // {
      //   spotId: 10,
      //   url: "https://render.fineartamerica.com/images/rendered/default/poster/8/5/break/images-medium-5/cloud-city-cynthia-decker.jpg",
      //   preview: true
      // },
      // {
      //   spotId: 10,
      //   url: "https://images.squarespace-cdn.com/content/v1/5bba607e049079392fbe25ac/1539335354323-XQTXLBE1VL5WCX2A0IY5/bespin-1.jpg?format=2500w",
      //   preview: false
      // },
      // {
      //   spotId: 10,
      //   url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2020/02/Bespin-Feature-Image-1.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 10,
      //   url: "https://i.ebayimg.com/images/g/xfMAAOSwoQ9h2TWU/s-l1200.webp",
      //   preview: false
      // },
      // {
      //   spotId: 10,
      //   url: "https://img.freepik.com/premium-photo/realistic-interior-photograph-from-inside-star-wars-cloud-city-apartment-generative-ai_873793-191.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 5,
      //   url: 'https://images.csmonitor.com/csm/2013/11/1101-luke-skywalker-home-tunisia.jpg?alias=standard_900x600',
      //   preview: true
      // },
      // {
      //   spotId: 5,
      //   url: 'https://inhabitat.com/wp-content/blogs.dir/1/files/2012/07/save-lars-5.jpeg',
      //   preview: false
      // },
      // {
      //   spotId: 5,
      //   url: 'https://travel.spotcoolstuff.com/wp-content/uploads/2011/02/star-wars-hotel-m.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 5,
      //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0DvYftysclX2r6yezhW3khogOX_yDeqGMvNzHSwdpw&s',
      //   preview: false
      // },
      // {
      //   spotId: 5,
      //   url: 'https://i.pinimg.com/736x/cc/d3/83/ccd383ff052c910be451705ddf8f4c3e.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 6,
      //   url: 'https://lumiere-a.akamaihd.net/v1/images/image_a42df384.jpeg',
      //   preview: false
      // },
      // {
      //   spotId: 6,
      //   url: "https://lumiere-a.akamaihd.net/v1/images/image_f9e9cb5b.jpeg",
      //   preview: false
      // },
      // {
      //   spotId: 6,
      //   url: 'https://imgix.bustle.com/inverse/4e/14/75/f4/2e3b/4ec3/98e5/e2ab1004488f/inside-the-millennium-falcon-in-solo-a-star-wars-story.jpeg?w=1200&h=630&fit=crop&crop=faces&fm=jpg',
      //   preview: true
      // },
      // {
      //   spotId: 6,
      //   url: "https://media.king5.com/assets/KING/images/26968157-c282-4ef8-b5a8-722fb7c3d8a9/26968157-c282-4ef8-b5a8-722fb7c3d8a9_1140x641.png",
      //   preview: false
      // },
      // {
      //   spotId: 6,
      //   url: "https://i.pinimg.com/736x/d5/03/3c/d5033c0751774fdb05a1cdc2957f092c.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: "https://i.pinimg.com/1200x/0a/1f/66/0a1f66e27788885c833d3e8418847d34.jpg",
      //   preview: true
      // },
      // {
      //   spotId: 7,
      //   url: "https://i.pinimg.com/originals/0a/ae/85/0aae85f8674735a413d587259dd332d7.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: "https://www.renderhub.com/dazinbane/jedi-council-chamber-star-wars/jedi-council-chamber-star-wars-02.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: "https://media1.cgtrader.com/variants/TyvMJzUVX4YXWdYA4f7Dz5pG/e44aa6a6359827c9089792cde0c079681b83d3b5c3037cc0525c25607e54355b/cam02h.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: "https://preview.redd.it/5q11s8izdja11.jpg?width=1920&format=pjpg&auto=webp&s=026e6ea95f83869e52d0b4b5af77fd22a0a22acb",
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: "https://i.pinimg.com/originals/19/87/c7/1987c7091cc42c88418abe9a9707dc6a.jpg",
      //   preview: true
      // },
      // {
      //   spotId: 8,
      //   url: "https://www.tasbo.org/uploads/images/news/Spaceship.png",
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: "https://wallpapers.com/images/hd/zoom-video-background-1920-x-1080-wyl8ict6x8hhsstp.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: "https://info.hughesenv.com/hubfs/Imported_Blog_Media/death-star.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: "https://galacticfab.com/cdn/shop/products/1.jpg?v=1664564881",
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: "https://i.natgeofe.com/n/5aeb03fe-a20b-4812-a14e-c7a92ac03b91/lake-como-italy-2_16x9.jpg?w=1200",
      //   preview: true
      // },
      // {
      //   spotId: 9,
      //   url: "https://64.media.tumblr.com/94819733770a674a1ecc8dbd38d5bdd9/tumblr_oz7tuozWYG1sqzou6o1_1280.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: "https://www.villavarykino.com/wp-content/uploads/2016/08/Villa01.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: "https://i.natgeofe.com/n/0fd59470-7fcc-4a85-8cee-777f6cd63e94/lake-como-italy-1.jpg?w=1084.125&h=766.5",
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: "https://www.oyster.com/wp-content/uploads/sites/35/2020/03/160092-Post-Ranch-Inn127-1024x683.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 4,
      //   url: "https://img.atlasobscura.com/mZYyAHRgj8Vonz63RPi6ZQwkTfgCsvFJ0EJHIGY__O0/rs:fill:12000:12000/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL2Fzc2V0/cy85NTJjNzM2YjFj/ZWIwZmE1N2NfODAw/cHgtU2tlbGxpZ19N/aWNoYWVsXy1fY2Vt/ZXRlcnlfYW5kX2xh/cmdlX29yYXRvcnku/anBn.jpg",
      //   preview: true
      // },
      // {
      //   spotId: 4,
      //   url: "https://media-manager.starsinsider.com/gallery/400/na_60d5ec9314560.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 4,
      //   url: "https://www.home-designing.com/wp-content/uploads/2022/06/black-stone-feature-wall.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 4,
      //   url: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71rv4fM6l9L._AC_UF894,1000_QL80_.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 4,
      //   url: "https://pm1.aminoapps.com/6263/d2986c208da81364687ae2688b2e19a2a8f8ed3c_hq.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 11,
      //   url: "https://imagedelivery.net/9sCnq8t6WEGNay0RAQNdvQ/UUID-cl9e6j5n43983rtolft78w6ui/public",
      //   preview: true
      // },
      // {
      //   spotId: 11,
      //   url: "https://i.ebayimg.com/images/g/GYcAAOSwyxNhrtaS/s-l1600.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 11,
      //   url: "https://cdna.artstation.com/p/assets/covers/images/062/475/078/large/kevin-cefalo-kevin-cefalo-seq01-0113.jpg?1683216030",
      //   preview: false
      // },
      // {
      //   spotId: 11,
      //   url: "https://i.ytimg.com/vi/mTEc_6oSSjo/maxresdefault.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 11,
      //   url: "https://i.insider.com/5e346701ab49fd20826aa527?width=1000&format=jpeg&auto=webp",
      //   preview: false
      // },
      // {
      //   spotId: 12,
      //   url: "https://steamuserimages-a.akamaihd.net/ugc/1812144454068621639/E89E617F7B9B369A1B49D2031421C15CCECFE3C3/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
      //   preview: true
      // },
      // {
      //   spotId: 12,
      //   url: "https://img.freepik.com/premium-photo/flowing-lava-flow-with-glowing-fire_932514-2146.jpg?w=360",
      //   preview: false
      // },
      // {
      //   spotId: 12,
      //   url: "https://pbs.twimg.com/media/FEbspa8X0AAdQyo.jpg",
      //   preview: false
      // },
      // {
      //   spotId: 12,
      //   url: "https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1h14s1qkleap1419kpa17712h81g.png",
      //   preview: false
      // },
      // {
      //   spotId: 12,
      //   url: "https://preview.redd.it/how-much-time-does-darth-vader-spend-in-the-bacta-tank-v0-dropbm6not3a1.jpg?auto=webp&s=205830a358e7961b2e640083dce344f938d63b61",
      //   preview: false
      // }
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
