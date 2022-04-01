import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

export const slug = "future_ii";

export const deck: Omit<GQL.Deck, "_id"> = {
  title: "Future Edition II",
  short: "Future II",
  slug,
  info:
    "299 international artists, designers and studios were using playing card as a canvas to illustrate their vision of what the world will look like 100 years from now. Selected artworks formed two Future Edition decks.",
  image:
    "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_future02.jpg",
  backgroundImage:
    "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_future-ii_bg.jpg",
  properties: {
    size: "Poker, 88.9 × 63.5mm",
    inside: "52 Playing cards + 2 Jokers + Info card",
    material: "Bicycle® paper with Air-cushion finish",
  },
  description:
    "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
};

export const cards = [
  {
    value: "2",
    suit: "clubs",
    artist: "marcello-manchisi",
    info:
      "2120 will be a better time, I know it. Humanity will be much more advanced, so I guess there will be both nature and robots. But most important, future humans will be advanced because they'll program robots according to a universal rule: love is positive in all of its forms, so it should never be kept hidden to others. That's why all kids of the future, no matter if humans or robots, will be able to show their love without any hesitation, with simple and pure actions like giving flowers to someone else.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/marcello-manchisi.jpg?2",
    winner: true,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "tim-zhilin",
    info:
      "The work was during all these really unstable times, when it's hard to think about a 100 year perspective. But whether the 2120 will be intergalactically expeditionary or very self-isolated - there will always be a need for fun, games and parties! So even if the most of the technologies and realms would change, there will always last a pleasure to calmly stay at home and play cards with ones you like!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/tim-zhilin.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "2",
    suit: "spades",
    artist: "knysh-ksenya",
    info:
      "2 Spades Idea - Maybe one day we will find a portal to the future and we will have a chance to reach out and meet with someone who was on the other side ... The idea of using such a portal excites and intrigues me. Would you take a chance?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/knysh-ksenya.jpg",
    winner: true,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "meave-stvdivm",
    info:
      "The Toltec and Aztec people had a word for the future or hereafter: Okachiwali. They also had a name for a condition they called Omeyolo: «two-hearts» or «two-hearted», meaning somebody in doubt, misleading, or with two conflicting intentions. For them, sacrifice and tearing the heart out was of supernatural significance: it was all about transformation and change, even if painful. Today, we women and men of the 21st century face a complicated, ambivalent future: we’re going forwards and backwards at the same time. Despite our technology and growing consciousness we’re still held back by obsolete ideas and not-so-wise behaviors. This card —the Two of Hearts, none the less— is a perfect metaphor for our troubled, hopeful times and the ominous, thrilling next 100 years.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-meave-stvdivm.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "hamed-sarhadi",
    info:
      "I have no doubt that we are using the Earth. The oceans, jungles, trees, animals and the whole Eco-System have been damaged. Sooner or later, if we don’t make a difference in our major behaviors, we will lose it. In my point of view, we’ve built a massive and complex system but without roots in the future and the generous gifts from our mother earth will be trapped in our engine’s pipes. By this unkind way, we can’t look at the future, but the future will watch us from a higher perspective. I’ve tried to imagine that future, which we don’t criticize our approach with our world around us, in it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/hamed-sarhadi.jpg",
    winner: true,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "lidan-chen",
    info:
      "Many species will be extinct in 2120. There are no wild animals anymore. Only robot creatures remain. Although the robots are friendly, but they will never replace real creatures.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-lidan-chen.jpg",
    winner: true,
  },
  {
    value: "3",
    suit: "spades",
    artist: "andrew-nedzvedsky",
    info:
      "Humanity as a kind have jumped enormously in the technical aspect within whole 20th century. We have developed different technologies and use them every day. 15 years ago cell phone was almost a miracle, unbelievable wonder of the technical age. Now we use cell phones of different kinds everyday and can't imagine our lives without then. In 100 years i believe people will be able to manufacture and use artificial organs in the same manner they produce new iPhones. In 100 years i think every person will have at least 3 artificial major organs in their body. People will be able to change and update them, look for their ads in mass media, anticipating new features that will be released with the new generation heart, lungs or lever.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andrew-nedzvedsky.jpg",
    winner: true,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "pau-del-toro",
    info:
      "The future has to be emotional if we want to keep being humans. I cannot imagine a society with no emotions and robotized as it seems we go.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-pau-del-toro.jpg",
    winner: true,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "impact",
    info:
      "The number 4 to many is seen as the perfect number, it symbolises foundation and its importance is deeply ingrained in everything around us. For example, there are four cardinal directions (North, East, South and West), four elements, four seasons and even four suits in a deck of cards. For me, this number and the clubs’ stylised clover symbol created the link to a lucky 4 leaf clover, which as a result became the base of this card. The base depicts a vision of the perfect marriage between sea and land giving birth to an element of nature previously non-existent; a 'Clover tree'. This creation is the result of a combination of the luck brought by the clover base and the perfect conditions created by a future utopia as a result of the coexistence of nature and man. This card represents the small hope that this seemingly impossible future may become a reality.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-impact.jpg",
    winner: true,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "oliver-santiago",
    info:
      "Four of Diamonds is inspired by the Future of Creativity. Creativity is rooted in a complex cognitive process equating a different level of development. Data may already have surpassed oil in value, and Artificial Intelligence might supersede human capabilities. But human creativity stems from a widespread network of brain areas that collectively produce works of art and innovation. With the absence or lack thereof, man-made machinery will not exist to date. Looking at the bigger picture, it is a significant driving force of progress. Without creativity, we expect a dismal forth coming. With it, like what this card is trying to convey, our world can flourish a hundred years more.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/oliver-santiago.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "4",
    suit: "spades",
    artist: "silvan-borer",
    info:
      "I'm not sure how exactly the world will look like 100 years from now. But I'm sure it's still mother nature who stands above all. She's the source of all our inspirations.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/silvan-borer.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "umberto-pezzini",
    info:
      "A higher rate of pandemics brought the whole humanity on its knees, but also brought it closer together. A world-truce was declared, scientific efforts where globally channeled to face this global crisis. Humanity rose from its ashes, united and at peace. Nanobiotechnologies advancements allowed the end of almost all severe diseases and considerably extended our life expectancy. After decades of growth, the friendly alien species of the Ulteriors revealed itself to us, considering us finally mature enough to join them in the common effort to explore the universe together. Cross cultural exchange gave birth to new artistic forms and even religions. In the illustration an icon of Saint T’naskor, or Saint Polydorus as we terrestrials prefer, 'the donor of hearts', protector of the adventurers and the explorers. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/umberto-pezzini.jpg",
    winner: true,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "pilar-vega",
    info:
      "I propose a greener, ecological and environmentally friendly next century, where, after a great extinction of the largest animals that currently inhabit the planet, the surviving fauna and flora allies to subsist, evolving in a thousand ways, compared to a humanity lost in a new civilization.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/pilar-vega.jpg",
    winner: true,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "stefano-ronchi",
    info:
      "Melancholy. Bad card, so they say. Always with those little 'thinghs' around, they whisper... It is dangerous for everyone to stand on the swing - You can't, you shouldn't. She was still there. Melancholy, 5th of Diamonds",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-stefano-ronchi.jpg",
    winner: true,
  },
  {
    value: "5",
    suit: "spades",
    artist: "cohen-gum",
    info:
      "In the future virtual reality will have superseded actual reality in every way. People will no longer live out their lives in a physical sense. They will belong to the network. Their bodies will be like throw away junk, only their minds will remain. The human race loves to leave behind monuments. There will be huge data warehouses full of shrines as proof of their existence in the real world, even if their bodies are long gone. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-cohen-gum.jpg",
    winner: true,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "andreu-zaragoza",
    info:
      "I imagine a future world where technology has evolved to a point in which we put our lives in its hands and we mix with it, but nature keep claiming what belongs to her.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andreu-zaragoza.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "nestor-ramos",
    info:
      "Year 2120. When I think of how we are going to live a hundred years from now, one of the first things that comes to my head is nature and our environment, will we be able to change our way to live in order to protect it and keep a more balanced and sustainable living or will we be rather keeping our customs and our existing progress at any cost? One of the other important aspects is how are we going to change our living spaces with a tendency of changing to smaller apartments due to population density and the increasing prices in big cities, how are we going to organize and how new architecture is going to impact into developing new solutions.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-nestor-ramos.jpg",
    winner: true,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "harry-decker",
    info:
      "In history, every movement has a counter-movement. In a future world, where we are constantly connected, there must be a place where we can disconnect from it all. The future, I imagine will be entirely dominated by globally connected technology and progress. We just need time away from technology—already today we seek digital detox and time to get away to a tropical vacation spot, even if it’s only for a couple of hours. The Tiki Bar is the traditional symbol for escapism—the perfect place that’s a simple counterbalance to the ever-evolving world—that provides the freedom to disconnect, let loose and relax mind and body. This Tiki Bar is the perfect embodiment of that concept, a creative playground where you can take a much-needed pause from all pressure and responsibility. The retro-futuristic A-frame is a symbol of both past and future—architecturally anchored in tradition and innovation—its timeless character reinforced through the reflection, remaining a safe harbor, even in 100 years. After all, while everything changes, some things must remain.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/harry-decker.jpg",
    winner: true,
  },
  {
    value: "6",
    suit: "spades",
    artist: "cuong-bui-manh",
    info:
      "What will the world look like in 100 years? What will remain of our home if we don't change our ways? 70 percent of the earth's surface consists of water. Still we pollute the seas and extinguish species in the name of our own prosperity. My illustration shows our dire fate: In a world swallowed by the sea, the only place mankind has left is the waste it left in it's wake.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/cuong-bui-manh.jpg",
    winner: true,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "robin-martens",
    info:
      "Food has always been a corner stone of human society. Cave men who went hunting, suddenly became farmers and so the rise of the cities has begone. Another big revolution in the food industry are the start of food delivery services. But in the future these human services will be at risk. Even though the transportation abilities will advance, the human aspect will be threatened by the rise of competitor delivery drones.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-robin-martens.jpg",
    winner: true,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "chragi-frei",
    info:
      "With sea levels rising, coastal cities will have to look for creative solutions to provide living space. A way to avoid the dangers of the rising waters are floating houses. They’re built on a raft-like platform, with living quarters above and below the waterline. A greenhouse allows the residents grow food of their own, electricity is provided by a built in turbine powered by tidal forces. Go with the flow, as they say.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-chragi-frei.jpg",
    winner: true,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "simon-buijs",
    info:
      "A stack of 7 elements, some of them are valuable and some are not. A stack that will never topple even when it's upside down thanks to the magic number 7.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-simon-buijs.jpg",
    winner: true,
  },
  {
    value: "7",
    suit: "spades",
    artist: "nouran-zedan",
    info:
      "I believe that 100 years from now, humans will have more interactions with AI and technology will evolve creating abilities that we have never experienced before. Humans being genetically modified with AI, will have the ability to live underwater and discover life in the depth of the ocean that could change the world forever.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/nouran-zedan.jpg",
    winner: true,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "jason-lyon",
    info:
      "I think even without research I knew this piece was going to be based on the theme of love. But with research, it’s said that the seven of hearts is the card of the ‘ideal’ love. To me the ideal love is an undying love, it’s a force the drives you to become greater. I think in the next 100 years, our imbalance love for nature and technology will leave us no choice but to desert earth and venture into space. And out there, where our body originally came from, we will create something new, something better, something ideal.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jason-lyon.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "acrylic-pixie",
    info:
      "No matter where you are or who you are, you can have world at your fingertips without leaving your comfort zone. Work from home, play from home, order food, talk to your family and friends, see the world - it's all there, in the comfort of your bubble.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/acrylic-pixie.jpg",
    winner: true,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "jonas-devacht",
    info:
      "Our vision of the future has had countless different interpretations over the times, even as far back in the early 1950s. Right now in 2020, we’re facing a lot of problems we haven’t faced before such as environmental issues and new diseases. Some might even say the future doesn’t look as bright as it once was to the people back in the ’50s. Because of that, I wanted to bring back some of that retro craziness by illustrating what can be the beginning of an epic space battle. Who knows, in 100 years we might explore space and fight aliens with big plasma blasters… 🔫💥",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/jonas-devacht.jpg",
    winner: true,
  },
  {
    value: "8",
    suit: "spades",
    artist: "lorenzo-fioranelli",
    info:
      "Up to now, one of the most known and daily problems is 'social distance'... not (only) depending on the actual pandemic, but rather due to distance in itself. For sure social networks are a good help but there's a limit which cannot be exceeded: skin contact. People and friends, loved ones, are far away and sometimes socials are not enough. I figure the future, maybe 100 years from now, in which with just a touch, a teleport pad perhaps, as easy as using an app, available to all, one can simply jump in a gateway, join us, and new places too.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/lorenzo-fioranelli.jpg",
    winner: true,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "miguel-bencomo",
    info:
      "LIVING IN THE AIR: In the not too distant future, humanity has felt the need to seek purer air and live above the clouds. The planet's contamination has reached extreme levels. The title of this work is practically a metaphor. existential related to a vital feeling and the search for new spaces to live.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/miguel-bencomo.jpg",
    winner: true,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "gianluca-natale",
    info:
      "The new century will be marked by the end for a new beginning. Environmental pollution will give way to a new rebirth and nature will take back what belongs to it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-gianluca-natale.jpg",
    winner: true,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "burak-cinar",
    info:
      "In the future, some of our descendants will land on untouched planets and engineer ecosystems to maintain our fragile bodies. An ecosystem that is hard to recover in the heavily damaged pale blue dot.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/burak-cinar.jpg",
    winner: true,
  },
  {
    value: "9",
    suit: "spades",
    artist: "magnus-riise",
    info:
      "The world: One hundred years from now. The piece, titled «Utopia/Dystopia», shows how beautiful and magical our world can be when we take care of it and become one with it, whilst also painting a grim picture of where we’re currently headed, if we do not change our way of life. The spade symbolizes the cruelty, damage and the pollution we are causing. If this continues at today’s rate, the world, and us along with it, will drown in its filth. The hourglass symbolizes time running out. We cannot keep this up much longer without severe consequences. We must act fast and change our ways. Every moment counts. It's not the most positive divination of the future, but it is important to face reality and be aware of where we are heading. The leaves in the Utopia part of the hourglass, along with the big black spade, tallies a total of nine spades, and represent harmony with nature. The Dystopia part represents a scorched Earth, devoid of color and life, a layer of ashes and dust all that remains…",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/magnus-riise.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "lena-vargas",
    info:
      "Many circumstances may change in 100 years, but one of the things I believe will stay the same is our need for escaping, feeling something more than the mere reality. Imagine if we could consume custom made capsules that would alter our conscious state to allow us to live dream-like experiences that would feel completely real and magical, although fleeting like any other substances. As simple as breathing fresh air, having an orgasmic encounter or flying in the sky. All would be possible with a scan of your DNA and technology., just as any other vending machine.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-lena-vargas.jpg",
    winner: true,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "sofia-berlina",
    info:
      "The future of new technologies, most part of which we can't even imagine right now, can be a bit scary sometimes, besides all the excitement, of course. This picture appeared in my mind one evening, probably inspired by my little son, peacefully sleeping after a rowdy day, and I decided to create a warm and cozy image of the future, no matter how weird it may turn up. After all, our future comes directly from our imagination, what can go wrong?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-sofia-berlina.jpg",
    winner: true,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "bernie-jezowski",
    info:
      "Since the appearance of ten mysterious Pyramids, the world has been in disarray. Silent they stood, yet they have brought wars, famine, floods, death and destruction... They birthed a plethora of theories, some innocent, some sinister, that have separated people. The Pyramids have been worshipped, studied, even nuked and still in silence they stood unscathed. The fact remained - anyone who came too close disappeared. Yet, as the time passed people’s insatiable need to know has started making way for peace, mending broken relationships. Nations working together to find out the truth about the Pyramids. Now, one person believes he found the answer. The Traveler has begun his journey to save the World...",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/bernie-jezowski.jpg",
    winner: true,
  },
  {
    value: "10",
    suit: "spades",
    artist: "martina-filippella",
    info:
      "I've recently read an article on Wired where Stephen Hawking said that within 100 years we will need to find alternative planets to live in, due to climate change, lack of space, epidemics etc. Although this statement was probably meant in the most negative and alarming way it could be, I like to believe that in 100 years there will be plenty of undiscovered and hospitable planets and we will be given the opportunity to travel through space to choose our favorite home among many possibilities. A girl can dream.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/martina-filippella.jpg",
    winner: true,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "diana-dementeva",
    info:
      "Rick Wilson got a place in one of those big corporations, you never know what they produce, but you know for sure they watching everybody. Rick works here for a week but still doesn’t know the point of his job. He makes calculations, compiles statistics, adds thousands of names to the database… Good thing - now Rick got that interactive helmet, ‘eyes’ as his colleagues named it. He shouldn't speak with his colleges, though. Rick's 'eyes' wasn't the latest model, so he couldn't see through them. But that kind of 'blind eyes' is very helpful in organizing data. The job is nice. Okay, it's kind of boring. Of course, it would be great to be among the guys wearing their latest 'eyes' and looking through the walls and watching, watching, watching... 'We see you' - they say, repeating the informal slogan of their company. Anyway, you should do your job perfectly, otherwise, they will see you're cheating. Rick's department is on 42's floor. What is on other floors - Rick doesn't know, everything is top secret. Rick even can't take off his 'blind eyes' at work hours, he shouldn't see too much. Every step is recording. And you shouldn't ask questions. You should watch and make statistics here, in 2121.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/diana-dementeva.jpg",
    winner: true,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "anna-ezer",
    info:
      "It was an ordinary morning in 2120, when the Cyber Reaper made his round. Robots, androids and various mechanisms blinked their sensors for the last time and peacefully went into virtual space under the wave of his scythe. Boring work, nothing portended change. But one tiny little thing didn’t want to leave. The reaper was intrigued, so what went wrong? Where did his deadly power go?.. That can't be it! For a long long time no one met a living creature on the planet.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-anna-ezer.jpg",
    winner: true,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "ben-bauchau",
    info:
      "When I think of Future, I think of robots, and I simply like the idea that this card game depicts a robot that has some sort of ritualistic or ceremonial costume, like the usual card figures use to have.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ben-bauchau.jpg",
    winner: true,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "jade-sabado",
    info:
      "My illustration for the Jack of Spades symbolizes the card’s characteristics itself jumbled with what I envision. Within next 100 years, the ideal world would have had collapsed. Nature strikes back, and humanity barely survives. It's all thanks to the technology's rapid development-which becomes more and more advanced every generation. In the year 2120, what comes next? They will simply carry on. Most of the humanity will invest their time and resources in improving their current technology-robots, computers, AIs, gadgets as well as weapons to the greater extent. The technological evolution will become invaluable and extremely dangerous at the same time. Make one wrong move, and the mankind is doomed. It's a double edged sword. For now, let's just be responsible humans! ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/jade-sabado.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "jefferson-mesa",
    info:
      "For this illustration i was wondering how people will perceive love in 100 years from now, will be love as we know today?, ther wont be love? i was trying to figure it out how we could love or be loved in a world where technologic is in everywhere, a world where the  human race fight with technologies to not to get extinct. But in the end i guess the concept of love somehow will save humans from the extinction.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jefferson-mesa.jpg",
    winner: true,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "kaloian-toshev",
    info:
      "I wanted to create a girl incorporated in the clubs symbol. I believe although Playing Arts is an art project, the design of the cards shouldn't compromise the game and the design should clearly communicate the card. That's how the idea of a girl with a big hat came up, where the hat could go outside of the clubs symbol. When I've sketched it I've noticed that it had this western/cowboy style and decide to go with it and see what happens. From there came the idea of her holding a card and smoking a cigar, like she's on a table playing some serious poker game somewhere in the wild west. Then I had to decide what card is she holding and went with King. After that I realised it could have been a Jack (kind of like the younger version of the King) and decide to draw it as well as a card on her hat. It's like she's flirting with both men. The style of the artwork is new experimental style I'm currently developing where I try to blend different visuals.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-kaloian-toshev.jpg",
    winner: true,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "martin-grohs",
    info:
      "Today, 100 years from now, things will be different. The technology will be much further than it is now. People will have to face completely different challenges and devote themselves to completely new problems. But will people adapt to this? Or will they simply trust a powerful person without questioning, and will they thereby plunge themselves into the abyss? My queen is a queen, but does she really rule on her own? Or is she just a puppet of shadows? Shadows that no one sees or knows, but which in reality have the power and play us all off only each other - for their own provit. People tend to want to be blind. Not wanting to know the truth, because it‘s supposedly easier. And so many simply follow a queen who may make a good impression on the surface, but who herself is blind to the future. Who doesn‘t decide for herself which way she will go for us and ultimately only hangs in the threads of the shadows. So experience your future consciously and decide for yourself. Open your eyes and don‘t let them play with you.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-martin-grohs.jpg",
    winner: true,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "ale-de-la-torre",
    info:
      "In the future we will live in a planet covered almost entirely by water so we will have to take advantage of every single surface of land to preserve all kinds of plants while we develop the technology to build encapsulated nomadic cities that will travel under water, by flying and in outer space. A female deity will emerge to constantly remind us of mother earth and through her guidance we will learn to preserve life. We will create artificial wormholes to travel in our amphibian capsules from the bottom of the seas, directly into outer space in a constant search for life. We will have lost many species and a large part of the human population, but we’ll be more conscious and grateful for the generosity and the beauty of our planet Earth.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ale-de-la-torre.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "joaquin-rodriguez",
    info:
      "I’ve always been fascinated by the aesthetics surrounding the bionic future that apparently awaits mankind. I wanted to portrait a situation where the human side prevailed so I gave the main role to the heart necklace and gave it the subliminal appearance of having been extracted right out of the robot’s chest.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/joaquin-rodriguez.jpg",
    winner: true,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "juan-martin-diez",
    info:
      "In the post-apocalyptic future, the few surviving humans organize into clans fighting for the survival of the species. The environment has become toxic and while the earth heals itself, the vegetation and animals have mutated and in some inexplicable way the dinosaurs walk the earth again, interacting in an unthinkable way with human beings.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-juan-martin-diez.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "aleksey-rico",
    info: "Everyone afraid changes. I'm afraid that nothing will change.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-aleksey-rico.jpg",
    winner: true,
  },
  {
    value: "king",
    suit: "spades",
    artist: "mr-aramanada",
    info:
      "My work is an image of a Babaylan (Albularyo), a Filipino folk healer wearing a dress inspired by indigenous textile motifs while carrying a bowl adorned with traditional motifs. In the future, there will be a great interest in indigenous culture where people are rediscovering their ancestral roots as part of knowing their identity, both personal and collective,  in the context of heightened cultural fusion due to globalization. Indigenous knowledge (art, medicine, etc.), will be weaved in the contemporary context (art and design, music, etc.) to strengthen the sense of cultural identity of a person and the community as a whole.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/mr-aramanada.jpg",
    winner: true,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "zcape",
    info:
      "This King of Hearts is mixing the image of his traditional card value with the vision of his own future: a King with no kingdom… He’s the perfect icon of the humanity: king of nothing but sure to be the greatest… After humanity has collapsed on itself (in one hundred years, probably before), victim of its own greed and stupidity, he’s looking for a new place to parasitize, alone in the dark, lost in the cold space of his own mediocrity… just to repeat the same mistakes, again and again, foolishly convinced that his way of life is the only right one. Because human is just like that, wrong…",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/zcape.jpg",
    winner: true,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "konstantin-shalev",
    info:
      "In my opinion, how the future will look in 100 years is completely in our hands, it will depend on the wisdom and decisiveness of our actions, I am sure that the balance of life will be maintained. The only thing that will remain unchanged is the simple and main principle of nature, predator and prey.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-konstantin-shalev.jpg",
    winner: true,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "alice-hoffmann",
    info:
      "In 100 years mankind will be able to reproduce every element, particle, structure and material that appears in nature and in the universe. The tree of life will have another meaning and appearance on our planet: human needs and planet goods, such as plants, flowers, ground, animals, clouds, etc. All these things will be reproduced by the push of a button in clone manufactures by artificial intelligence. An high and important task mirrored on the highest card: Ace Diamond.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-alice-hoffmann.jpg",
    winner: true,
  },
  {
    value: "ace",
    suit: "spades",
    artist: "natalia-koniuszy",
    info:
      "For me in the future the history of humanity will come full circle. It will be only mother nature caring about what is left from earth.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-natalia-koniuszy.jpg",
    winner: true,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "garavato",
    info:
      "We’re in 2020… The human race has been highly concentrating on the extreme power of empathy and uses it now to rule the world. Borders no longer exist, respect is the king concept and mutual aid is the new normal. We now coexist with extraterrestrial cultures, developing new forms of biotechnologies, more than ever connected to our own consciences, we’ll all team up for a better world, no matter the species, backgrounds or origins.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-garavato.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "joker",
    suit: "red",
    artist: "valentina-brostean",
    info:
      "My joker is a contemporary interpretation of the classical one. Mysterious, wild, eccentric, playful - a character that you'll remember and that will affect you, visually strong as much as his role is! He's an element of luck made out of many pieces and layers that fit perfectly together. I have used all the classical elements of joker such as his recognizable smile, funny hat, makeup around the eyes and interpreted then (stylized them) in my own recognizable visual language!  I wanted to point mostly to the mystery of his character and through layers emphasize the diversity of roles he might have in the card game. I have Imagined this joker exactly as a character from the future. Based upon his classic features but in this totally contemporary, new context. Maybe in the future, we're all gonna change out physiology and become more robotic, layered, with artificial implemented pieces, a mix between the artificial inelegance and humans! Therefore I have left just a piece of the real skin (with human eyes just a bit robotized) on his face as basics and built the abstract elements upon it! I have placed him 'out of space' in this abstract space full of starts as maybe in this proper future we will be able to travel further in space, or maybe telepathically mind travel in different dimensions of conscience! My joker could do that :)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/valentina-brostean.jpg",
    winner: true,
  },
  {
    value: "backside",
    suit: "backside",
    artist: "sebastian-onufszak",
    info: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/retina/000.jpg?2",
    winner: true,
  },
  {
    value: "joker",
    suit: "black",
    artist: "ruben-antorveza",
    info:
      "The idea of this illustration is to visualize a future where there is a balance between species: animals, humans and the environment, where we are all one. and let's be aware that what happens to one affects us all. That is why this being that is half animal and half human fused in an ethereal space that simulates water or air, giving the sensation that it is floating in the air or submerged in water. Almost as if he were a medieval god.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ruben-antorveza.jpg",
    winner: true,
  },
  {
    value: "joker",
    suit: "black",
    artist: "shangning-wang",
    info:
      "Black J.K Mona Lisa. Year‎: ‎R.50 (2120), Medium‎: Man made ‎Ink. Subject‎: ‎Black J.K Mona Lisa,  Artist‎: ‎Leoroboto Ai Vinci. The Robot Monalisa is a portrait painting by the earth artist Leoroboto Ai Vinci. He drew it on the last piece of man made paper. He tried to learn the human being's art and history before the Ai took over the earth.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/shangning-wang.jpg",
    winner: true,
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards);
};

export default dump;
