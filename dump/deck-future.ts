import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

export const slug = "future";

export const deck: Omit<GQL.Deck, "_id"> = {
  title: "Future Edition",
  short: "Future",
  editions: [
    { name: "chapter i", url: slug },
    {
      name: "chapter ii",
      url: slug + "2",
    },
  ],
  slug,
  info:
    "299 international artists, designers and studios were using playing card as a canvas to illustrate their vision of what the world will look like 100 years from now. Selected artworks formed two Future Edition decks.",
  image:
    "https://s3.amazonaws.com/img.playingarts.com/www/products/bundle-02.png",
  backgroundImage:
    "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_future-i_bg.jpg",
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
    edition: "chapter i",
    suit: "clubs",
    artist: "gian-wong",
    info:
      "A century from now, human life could be struggling with extinction after fully exhausting earth’s resources and neglecting its cry for help. The planet could simply not support life anymore. With this, humans will be left with only one solution: to evacuate and begin anew in another existing planet. The journey in finding a habitable home will be challenging but humans start to form a new appreciation for everything that exists beyond the earth’s atmosphere—and this time, mankind will vow to protect its new home.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-gian-wong.jpg",
    reversible: true,
  },
  {
    value: "2",
    edition: "chapter i",
    suit: "diamonds",
    artist: "diego-marmolejo",
    info:
      "My illustration is an ironic vision of the future of music. Musical instruments will become electronic instruments for playing music. And musicians will be more like computer scientists.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/diego-marmolejo.gif",
    reversible: true,
  },
  {
    value: "2",
    edition: "chapter i",
    suit: "hearts",
    artist: "olga-zalite",
    info:
      "In my image of 2120, the cult of individualism would have progressed to the point where people have little to no interest in forming couples or being in romantic relationships. They are stuck between their instinctive need for love and the desire to protect their personal space. Unwillingness to compromise followed by a lack of emotional intelligence might put family institutions at the edge of extinction.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/olga-zalite.jpg",
  },
  {
    value: "2",
    edition: "chapter i",
    suit: "spades",
    artist: "abraham-mast",
    info:
      "History repeats itself, but how much and at what frequencies? How far must we live our existence to run out of new flavors? It is almost paralyzing how we can see ourselves making the same mistake over and over again, yet in the moment we don't notice it. It is only a matter of time before someone trips on an existence banana and sets in motion a series of events leading to our demise. One thing is for certain: when cloaked figures appear, it is probably best to listen and heed their advice. If something ever takes the time to travel from a different time or dimension to give us advice, we are on the verge of a monumental decision.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-abraham-mast.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/2s-video-low.mp4",
  },
  {
    value: "3",
    edition: "chapter i",
    suit: "clubs",
    artist: "antoine-goulet",
    info:
      "I envisioned a future where gender is now irrelevant. Colors usually associated with 'typical' gender roles are used on the two front characters, while the third one is a mix of the two. The three characters also share the same genderless look and attributes. I wanted their composition to evoke the shape of a club.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/antoine-goulet.jpg",
  },
  {
    value: "3",
    edition: "chapter i",
    suit: "diamonds",
    artist: "el-diex",
    info:
      "2120 Entertainment business will put music into orbit. Space sounds, visuals and voices will rule the next century. In a hundred years, outerspace venues will give people new gathering places for sharing music and celebrate festivals. Aliens, robots and digital bands will get together to share sounds from other galaxies and performances from other dimensions.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/el-diex.jpg",
  },
  {
    value: "3",
    edition: "chapter i",
    suit: "hearts",
    artist: "mike-karolos",
    info:
      "'Refugee' The year is 2120. We are now forced to leave our home, planet Earth. No refugee wants to leave their home but that's necessary when it is the only way to survive. Earth is now a hostile environment due to human behavior. There are no more borders, we are all earthlings and refugees looking for a new place to call home. This is a possible scenario for the future. Maybe not in 100 years from now but it could come to that at some point unfortunately. My illustration has two meanings. One is about how we treat our planet and the second is regarding refugees. We could all be a refugee in the future so think twice before you judge.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mike-karolos.jpg",
  },
  {
    value: "3",
    edition: "chapter i",
    suit: "spades",
    artist: "angela-bardakjian",
    info:
      "Our lives today are unrecognizable from those a century ago. Who would have thought that we will be living 2020 in isolation. Yet we are lucky to be living in a century where all of us can connect with each other easily. The way we live, work, and play will change beyond our expectations in the upcoming 100 years. whether formed technically or naturally. It is going to be a significant world. This card creates that fine line and a contrast between the traditions and the future. It is about discovering the unknown with its organic, and dynamic flowing lines.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/angela-bardakjian.jpg",
  },
  {
    value: "4",
    edition: "chapter i",
    suit: "clubs",
    artist: "toma-studio",
    info:
      "Four of Clubs symbolise the foundation of Knowledge - the knowledge to be shared to educate and grow. Fours must be in command of every situation that arises. They are dealing with practical applications of knowledge, and they the power to glorify it. What awaits us in the future? As this year’s pandemic teaches us, it’s impossible for humans to predict what is going to happen, and the effects of our actions. Between pandemic, environment and economical crisis, and the huge battles for race and gender equality, 2020 may be seen as a turning point for mankind. And what about the future? We imagined that mankind - finally aware of its past - will reach a superior level of universal knowledge, and with that will be finally able to master the universe, and through a total understanding of life, love, nature and equality, bring balance to the world.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-toma-studio.jpg",
  },
  {
    value: "4",
    edition: "chapter i",
    suit: "diamonds",
    artist: "maria-kulinskaya",
    info:
      "When humanity disappears the world will change. Only robots will remain on the earth. They will start developing technologies and building civilization anew. Robots will enter into symbiosis with a peculiar post-apocalyptic nature. Therefore, my illustration depicts a robot that plays 8-bit games on old-fashioned computer.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/maria-kulinskaya.jpg",
  },
  {
    value: "4",
    edition: "chapter i",
    suit: "hearts",
    artist: "luis-pinto",
    info:
      "In the future humans learn that in order to evolve in a positive way they’ve to study a lot (even more) about the relationship between nature + technology as one to create a powerful impact on our planet. Thanks to this immense wisdom new generations are able to find sustainable-innovative solutions to coexist in this world as well as new scientific breakthroughs that will change the way we see, perceive and design our universe.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-luis-pinto.jpg",
  },
  {
    value: "4",
    edition: "chapter i",
    suit: "spades",
    artist: "manuel-kilger",
    info:
      "The idea of my illustration is an idealistic future world, where all existential problems of humanity are solved. A world where humans, nature and technology coexist peacefully and ecologically in perfect symbiosis.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-manuel-kilger.jpg",
  },
  {
    value: "5",
    edition: "chapter i",
    suit: "clubs",
    artist: "illustrescu",
    info:
      "Teleporting my imagination 100 years from now, I can see a fully developed society based on futuristic technologies. People are using more and more augmentations to stay updated and the crave for VR is tearing apart real society. Being dominated and governed by tech savy companies, the world as we know it today will not be the same, a new world will emerge.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/illustrescu.jpg",
    reversible: true,
  },
  {
    value: "5",
    edition: "chapter i",
    suit: "diamonds",
    artist: "amatita-studio",
    info:
      "Inspired by what we are living now, the idea is that perhaps in the future, masks will not only be used as an instrument to keep us safe, to protect ourselves and the others, but it will evolve into an high-tech fashion accessory. Like are smartphones, or smartwatches today. Especially those last ones, that proved already in many occasions how a beautiful iconic piece of tech it's not only that, but it's also something that can prevent, detect and saves many lives. We took inspiration from futuristic fashion and thought that masks will become socially accepted in the future. An instrument that doesn't just scream 'I'm contagious', but that will be seen as 'fun', and 'social'. We imagined that it could work by tracking the movement of our mouth, to replicate that on the screen of the mask, which if swiped, shows different type of lips or filters. This way a futuristic mask will not just work to keep us safe, which will always be its primary function, but while doing that it will work also to make us smile. Litterally.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/amatita-studio.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/5d-video-low.mp4",
  },
  {
    value: "5",
    edition: "chapter i",
    suit: "hearts",
    artist: "evgenia-makarova",
    info:
      "'Ambassadors from different countries are admitted to the residence of the king' — one of the values of the 5 hearts that I found. This metaphor can mean the need for humanity to accept distinct life forms as equal or even superior. What if in the future, artificial intelligence will develop the capacity for empathy and love? How will they see the difference in the level of consciousness between humanity, the animal and plant world, and themselves. And what will they feel about it? Perhaps the roles may change.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/evgenia-makarova.jpg",
  },
  {
    value: "5",
    edition: "chapter i",
    suit: "spades",
    artist: "antonio-uve",
    info:
      "The future will be tough if we keep treating the planet as we are, pollution will be an even bigger issue for us and a breeze of fresh air will be a luxury from the past. We tend to imagine the future in outer space but I think we will stuck here on Planet Earth wearing spacesuits for protection from air polluted, although with a touch of sophistication as I tried to illustrate here.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-antonio-uve.jpg",
  },
  {
    value: "6",
    edition: "chapter i",
    suit: "clubs",
    artist: "javier-perez",
    info:
      "In 100 years the wind energy will be normal as the electric light. It has become a key electricity generation resource for the transformation of the energetic model, cleaner and more sustainable.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-javier-perez.jpg",
  },
  {
    value: "6",
    edition: "chapter i",
    suit: "diamonds",
    artist: "andrea-bojkovska",
    info:
      "In 100 years, as technology takes over even more, an optimistic thought is that humans will finally focus more on environment care, self improvement and love. The technology will enable also the option to send our characters as clones to achieve some challenges, while we are focused on others. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andrea-bojkovska.jpg",
  },
  {
    value: "6",
    edition: "chapter i",
    suit: "hearts",
    artist: "ana-gomez-bernaus",
    info:
      "As a graphic designer and lettering artist the first concepts that came to my mind regarding this card are balance, harmony and symmetry. The number six is an even number and when combined with the heart as the amount of elements in a composition it quickly draws a balanced structure. Formally, the 6 resembles the link of a chain, and that made me think of the idea that we are all linked within 6 degrees of separation, therefore, it's a number that we currently use to describe connection, but we do it on the basis of distance. March 2020 will always be remembered as the time where we all had to stay away from each other, but it has also made evident the desire we all have to stay together. I have been video conferencing with friends and family more than ever. Based on this experience, I envision a future where technology allows us to get together over any distance to collaborate, inspire and support each other. I envision a future where we are all united by six steps of connection.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ana-gomez-bernaus.jpg",
  },
  {
    value: "6",
    edition: "chapter i",
    suit: "spades",
    artist: "adriana-garcia",
    info:
      "In the future trips to other dimensions will become a reality, this illustration tells a love story about two people who belong to parallel universes: one where technology grew to the point that almost led to the destruction of humanity and another dimension where Technology did not grow as much, but the level of human consciousness did. It is in our hands to decide which of the realities we want for the future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-adriana-garcia.jpg",
    reversible: true,
  },
  {
    value: "7",
    edition: "chapter i",
    suit: "clubs",
    artist: "pj-offner",
    info:
      "Its very obvious what the future would look like in 100 years. A world without technology or any form of economic structure. Humans are forced to become one with earth again. Snakes and humans fighting together for a better world.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-pj-offner.jpg",
    reversible: true,
  },
  {
    value: "7",
    edition: "chapter i",
    suit: "diamonds",
    artist: "ollie-hirst",
    info:
      "Historically, the seven of diamonds is a neutral card and associated with negotiation. When thinking about the future, my mind went straight to our relationship with the digital and how I fear we will eventually have to make a deal with ourselves, to stop the digital from taking over. Times like the ones we are currently living through show us the incredible power of technology, but with the rise of voice activation and self serving tech, we are at risk of being seduced and losing the human touch.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ollie-hirst.jpg",
    reversible: true,
  },
  {
    value: "7",
    edition: "chapter i",
    suit: "hearts",
    artist: "marc-urtasun",
    info:
      "My main concern for the future is about what will happen with our feelings or emotions. How will the robots, artificial intelligence, medical advances, or smart cities affect us as humans? How we gonna feel living with those changes? I used that concept for my piece and especially playing with the 7 Hearts card, which it has the most significant symbols for me: the red color and the heart. I created a kind of cloned hearts, with a “high tech” look but without losing the human feeling. Using only the color red representing the passion and love (the most important emotions) and also the blood color, which is literally our indicator of life. I like to be as abstract as possible in my work, using symbolic elements like the heart or the colors and giving to the people the chance to interpret the final meaning of the piece.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marc-urtasun.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/7-hearts_01.mp4",
  },
  {
    value: "7",
    edition: "chapter i",
    suit: "spades",
    artist: "fran-labuschagne",
    info: "The future will still be beating to the same rhythm.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-fran-labuschagne.jpg",
  },
  {
    value: "8",
    edition: "chapter i",
    suit: "clubs",
    artist: "ryan-coleman",
    info:
      "Corporation MEGACORP knows you're tired of the same stale bottled and recycled air. Breathe new life into your day with Flora® — the all-natural eco-approach to the oxygen generation. Featuring a sleek and efficient tank design as well as stylish Old Earth looking plants, you will have your own private oasis on the Space Train to the Cosmic Mines. Pre-order today to receive your complementary OxySpheres® to add even more 'freshness' to your breathing experience.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ryan-coleman.jpg",
  },
  {
    value: "8",
    edition: "chapter i",
    suit: "diamonds",
    artist: "long-vu",
    info:
      "It is said that cats symbolize fortune, power and good luck; they were also the original Internet stars. That is why these mystical creatures are purrrfect for the 8 of Diamonds, the fame and fortune card that represents powerful individuals. In the future, this cat overlord will continue to dominate the Internet, occupy our time, and collect billions of clicks while cashing in on partnerships with the tech giants. Beware of the bringers of fortune as they can also carry bad luck and hold many dark secrets.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/long-vu.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/8d-template-low.mp4",
  },
  {
    value: "8",
    edition: "chapter i",
    suit: "hearts",
    artist: "peter-cobo",
    info:
      "I've been a big fan of science fiction since I was a kid. Maybe in 100 years, technology will have advanced enough to colonize other planets. Inspired by authors like Bradbury, Huxley or Orwell, I imagine humanity being able to travel light-years away to discover new planets and, who knows, new intelligent life as well. Because, 'If it’s just us, seems like an awful waste of space'.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-peter-cobo.jpg",
  },
  {
    value: "8",
    edition: "chapter i",
    suit: "spades",
    artist: "noonmoon",
    info:
      "In the distant future, sea level may have risen so high that even New York’s famous Statue of Liberty’s head is barely above water.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/noonmoon.jpg",
  },
  {
    value: "9",
    edition: "chapter i",
    suit: "clubs",
    artist: "laimute-varkalaite",
    info:
      "Natural mental humanity — the name of my art work, which reveals a code of the idea. I hope that the world 100 years from now will be more natural and humanity will become wiser. Although many of us can not imagine the future without modern technologies and robotics, the situation nowadays makes me feel that the way of survival is humaneness and close connection with our environment. My work is a symbol of this idea: human's communication with human, keeping our surroundings green, clean and safe, finding more time for ourselves and living in harmony with nature. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-laimute-varkalaite.jpg",
    reversible: true,
  },
  {
    value: "9",
    edition: "chapter i",
    suit: "diamonds",
    artist: "mildeo",
    info:
      "Diamonds are worth a lot, but what will be the most precious thing in the future? I hope that in 100 years humans will see wild nature as precious emeralds and manage to preserve it for the future generations. I imagine that in 100 years as the climate change continues to worsen the conditions for people, the collective mindset will change. People will have to admit being just a piece of the ecosystems, not the owner of everything in order to continue live well.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mildeo.jpg",
    reversible: true,
  },
  {
    value: "9",
    edition: "chapter i",
    suit: "hearts",
    artist: "maria-fedoseeva",
    info:
      "'Please don't forget to recharge your mask and update your heart before you leave your underground shelter'. The topic of the new deck is the future. I decided to make a romantic illustration showing preparations before going to a date.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-maria-fedoseeva.jpg",
  },
  {
    value: "9",
    edition: "chapter i",
    suit: "spades",
    artist: "victor-vergara",
    info:
      "I imagine a positive and hopeful world, where technology is in charge of taking care of the nature and the nature takes advantage of the technology. I imagine a world in a sustainable balance in terms of time, color, beauty and completely aware of the interdependecy principle.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-victor-vergara.jpg",
  },
  {
    value: "10",
    edition: "chapter i",
    suit: "clubs",
    artist: "alex-pogrebniak",
    info:
      "People living in the rhythm of a progressive 21st century often remember events of the past, where everything seemed to be simple and clear. While creating this illustration, I was inspired by the ideas of retrofuturism. I'm sure that in the future there will be muscle cars, rock-and-roll and minutes for fun too. I would like to see the future with optimism.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/alex-pogrebniak.jpg",
  },
  {
    value: "10",
    edition: "chapter i",
    suit: "diamonds",
    artist: "xave",
    info:
      "The future is a projection of our imagination since the moment you are reading this, it becomes the Present. Otherwise Robots and space fields.",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/xave.jpg",
  },
  {
    value: "10",
    edition: "chapter i",
    suit: "hearts",
    artist: "ilyas-bentaleb",
    info:
      "As a huge fan of cyberpunk I wanted to express my current view of what's happening with the lockdown & traveling it to the future using biological engineered heart glowing underneath, creating a letter V that forms an X with the puddle's reflection which means 10 in roman numerals. As I see that it will be more challenging stuff in the future but the key is to support each other and seeking knowledge to be ahead of problems themselves.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ilyas-bentaleb.jpg",
  },
  {
    value: "10",
    edition: "chapter i",
    suit: "spades",
    artist: "muti",
    info:
      "Time travel has given the human race an opportunity to journey deeper into space than ever. The discovery on new planets has revealed many viable options for colonisation. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-muti.jpg",
  },
  {
    value: "jack",
    edition: "chapter i",
    suit: "clubs",
    artist: "andra-popovici",
    info:
      "In 2120 the face of humanity has changed. The overgrowing human population with an overconsumption based mindset has been the main catalyst for speeding up the sixth mass extinction, therefore darker consequences started to picture a grim future for the entire human species. The massive loss of wildlife and the high volume of deforestation of the Earth’s rainforests has brought unimaginable destruction transforming almost 40% of Earth's surface into a completely uninhabitable environment. A series of deadly viruses and epidemics, chained earthquakes and heavy tectonic plate movements followed by the great Krakatoa volcanic eruption in 2062, decimated the Earth’s population, putting the entire human civilization on the brink of extinction. The United Earth Consortium’s contingency plan to revitalize and maintain the life on Earth is deemed as a complete failure, being unable to provide sustainable and practical application of Lem’s theorem. At the same time, relocating on Mars was no longer a viable option due to the negative effects on the human body brought by prolonged exposure to solar radiation traveling through the Enselm Corridor, as it seems there is literally no escape. The entire fate of humanity lies now in the hands of a small group of rebel scientists that have managed to alter the genetic information of a carefully selected group of subjects, only four in the entire world. Rising from all the bad humanity has caused thus far, these individuals will be genetically modified in order to be able to access a higher level of intelligence, unimaginable by any standards up to this point. Each of the four individuals (Clubs, Spades, Heart, and Diamonds) has unique and specific abilities that allow them to find viable solutions to restore nature and wildlife and to elevate the entire civilization to new unimaginable heights in technology. The tradeoff for this superpower is that their lifespan was dramatically reduced by 12 years, making them known as the group of Sacrificial Twelve. With these abilities, the plans, the ideas, and the pure knowledge that resulted were astonishing, elevating the entire civilization to new unimaginable heights in technology. As a result, all efforts were redirected into the conservation and preservation of the little that was still left. With the help of super-evolved science and technology, robotic insects, and lab-made miniature creatures, the year 2120 became a solid target of reversing the negative effects. Meat consumption has been legally banned throughout the entire remaining population and conserving Earth’s resources became the new paradigm of human civilization. Planet Earth is reborn, humanity has a permanent shift into mentality focusing on conservation and respecting Earth's resources and the sixth mass extinction is successfully reversed.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andra-popovici.jpg",
  },
  {
    value: "jack",
    edition: "chapter i",
    suit: "diamonds",
    artist: "charlie-davis",
    info:
      "Mankind has received smoke signals and felt the damage of climate change yet still is turning a blind eye. The other side depicts Jack the Astronaut in search of refuge in the outer reaches of space. Retaining the upside down duality was a nod to the traditional format and to help convey the concept of the present and the future. Visually I wanted this Jack of Diamonds to feel like a propulsion into the future and hopefully the reality isn’t as bleak as my concept!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/charlie-davis.jpg",
    reversible: true,
  },
  {
    value: "jack",
    edition: "chapter i",
    suit: "hearts",
    artist: "daniel-shubin",
    info:
      "We are developing very rapidly, new technologies and science are replacing centuries-old traditions. Asian countries are now setting the rhythm for the whole world, this is endless development. Along with progress, we are losing spirituality and all that was so important to us just 100 years ago. This is not to say that this is bad, it is part of evolution and just one more page from the book of humanity.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/daniel-shubin.jpg",
    reversible: true,
  },
  {
    value: "jack",
    edition: "chapter i",
    suit: "spades",
    artist: "zinkete",
    info:
      "For an instant, close your eyes, imagine that you are traveling to a future where life takes place in Cosmos. Everything is liquid, everything is changeable. You can be who you want to be and love (or not) whomever you want to. A place where there are no differences of any kind. There are no classifications of any kind. And there you are: feeling at peace with yourself because you no longer have to pretend anything that you are not: we are all the same, we are floating particles in space...",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-zinkete.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/js-zinkete.mp4",
  },
  {
    value: "queen",
    edition: "chapter i",
    suit: "clubs",
    artist: "aleksandra-marchocka",
    info:
      "It is 2020 and we are at a crossroads. The decisions we now make as individuals and as societies will define the world a hundred years later. It will not be easy to make good and wise decisions to save our world. Perhaps the future lies in a simpler and poorer life, but in harmony with life-giving nature. Or maybe the future will lead us to the brink of extinction and nature will live only in our memories.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-aleksandra-marchocka.jpg",
    reversible: true,
  },
  {
    value: "queen",
    edition: "chapter i",
    suit: "diamonds",
    artist: "anna-kuptsova",
    info:
      "My queen of Diamonds illustration reflects the future hundred years from now as I imagine it would be. People will discover new technologies, develop new devices and interfaces. This will all ultimately lead to changes in our own physiology. I imagine we would achieve a sort of human and machine blending. And while it will give as more advanced capabilities, it surely will affect our perception of life. My main concern is if we will still possess our current level of humanity. Or if the ongoing race for physical improvement will take away a part of our inner world and everything that makes us human. I guess time will tell.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/anna-kuptsova.jpg",
  },
  {
    value: "queen",
    edition: "chapter i",
    suit: "hearts",
    artist: "ruben-ireland",
    info:
      "THE QUEEN OF HEARTS 2120 - The Queen Of Hearts Watching over her biomechanical subjects, suffering the perpetual war between the beautiful irrationality of love and the inevitable psycopathy inherent in their AI. A battle she can neither escape inwardly as she wonders what it is that loves them. Her Self or her <c/god=given> Algorithm?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ruben-ireland.jpg",
  },
  {
    value: "queen",
    edition: "chapter i",
    suit: "spades",
    artist: "one-horse-town",
    info:
      "Given that I got a Queen I thought I'd reflect on what the ruling elite might look like in a distant (admittedly rather bleak) future. I've imagined them linked up to levitating life support chairs, permanently plugged into a VR feed in which they exist in some kind of exclusive reality, while also using it to follow major events and communicate with their subordinates. I wanted to work with the shape of the spade and have it reflect in my design as much as possible.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-one-horse-town.jpg",
  },
  {
    value: "king",
    edition: "chapter i",
    suit: "clubs",
    artist: "renaud-lavency",
    info:
      "I hope that in the future our leaders, our kings, will seek to discover our universe in harmony with nature and environment.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-renaud-lavency.jpg",
    reversible: true,
  },
  {
    value: "king",
    edition: "chapter i",
    suit: "diamonds",
    artist: "raul-gil",
    info:
      "Diamonds in the French deck were generally linked to the economy and monarchy of the Middle Ages, being the card of the King of Diamonds someone powerful, rich and influential, king of kings and the economy at the same time. Who could play both roles in the future? Absolute sovereign of the economic functioning of the world. Ruler of all the invisible mechanisms that govern our society. Perhaps an artificial intelligence, raised as a higher entity? Always vigilant, always present, nothing escapes its control from its octahedral cubicle.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/raul-gil.jpg",
  },
  {
    value: "king",
    edition: "chapter i",
    suit: "hearts",
    artist: "luna-buschinelli",
    info:
      "The image tells a story about a king that rules a kingdom inside his own head, as all of us do. For these endings he must find a balance between his heart and mind. The medieval castle is a critic against nowadays, as a suggestion that at the same time we are evolving on technology matters we are (many times) making the same old mistakes in history that our ancestors committed.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-luna-buschinelli.jpg",
  },
  {
    value: "king",
    edition: "chapter i",
    suit: "spades",
    artist: "marcelo-anache",
    info:
      "I imagine a future where countries will need to come together in order to continue existing. The Covid-19 pandemic showed us that we are more interconnected and dependent on each other than we ever imagined. A new world order will need to be created. Countries will still be independent, but there will be global rules focused on preserving the human race and the world itself. To regulate this, we would need someone endowed with both human wisdom and robotic efficiency. A perfect match. Someone who could have compassion and humanity while making decisions, but also be tireless, accurate and 100% connected with everything and everyone, just like a machine. Someone with a human face to cause greater empathy, with an also human brain connected to the best computers in the world, maximizing its capacity, in addition to being filled with life provided by nature. A supreme being. A King of the Future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marcelo-anache.jpg",
  },
  {
    value: "ace",
    edition: "chapter i",
    suit: "clubs",
    artist: "patrycja-krawczyk",
    info:
      "Unfortunately, I assume that it will take so long before people change their approach to the exploitation of the land. Undoubtedly, many very expensive space projects will be created in the next 100 years. Even today we hear about plans to build the construction of bases on the Moon or the mission to populate Mars. But what about our Mother Earth? The current impact of Covid19 and quarantine reminds us of how much we need a healthy environment and a green, open space. Our land and its nature are the most important, we have nothing without it. I see Ace ♣ Clubs as a symbol of the power of nature and its value. It is our true wealth and this is our future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/patrycja-krawczyk.jpg",
  },
  {
    value: "ace",
    edition: "chapter i",
    suit: "diamonds",
    artist: "sergey-serebrennikov",
    info:
      "I love Art Deco style and I can’t stop creating my artworks inspired by that times. I was thinking about the people of 1920th, what were they dreaming about, how did they imagine the world in 200 years, how would they look like? It seems to me that even cyborg-girl may be in style of Art Deco.  Style and fashion make circles during the lifetime. Modern is well forgotten old fashion. So in 100 years it can be Art Deco rebirth. I am glad to share with you my artwork. I was inspired by the movie poster 'Metropolis' of that times and by the robot from my favorite movie 'Star Wars'.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/sergey-serebrennikov.jpg",
  },
  {
    value: "ace",
    edition: "chapter i",
    suit: "hearts",
    artist: "iain-macarthur",
    info:
      "When I think of the distant future i imagine that technology has advanced to the point where it will be apart of us, augmented into us with nano chip implants and circuits integrated in our brains. These enhancements could be beneficial for those who are mentally or physically challenged, this could facilitate them with robotic limbs or treat brain diseases like Parkinson’s or epilepsy. It could even stretch further to even transferring the human consciousness into a machine, demising the risk of illnesses, diseases and prolong our lifespan.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/iain-macarthur.jpg",
  },
  {
    value: "ace",
    edition: "chapter i",
    suit: "spades",
    artist: "dima-krab",
    info:
      "When it comes to a question 'what will change in 100 years' people may imagine the objects lit and flying and humans became androids. I shift the focus to the fundamental things like communication which is the way of interaction and brings the achievements wanted. I believe that the phenomenon of communication will stay still. We all need cooperation with each other and the nature to reach any of results or bring any idea to life. So the answer to the question above is nothing will change essentially. We will still be looking for the new meanings and trying to be in touch with each other in different ways.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/dima-krab.jpg",
  },
  {
    value: "joker",
    edition: "chapter i",
    suit: "black",
    artist: "mitt-roshin",
    info:
      "I almost immediately came upon with this idea of a traditional for a card deck joker in the context of the future. In good old times Joker used to entertain a crowd on a square. But these days most of our entertainment take place online, in this digital reality, that is becoming even more real for us than everything that happens in the real life itself. So here is a joker form the future: not only he’s entertaining us, but also manipulating, monitoring, setting up the rules, influencing all our actions, wishes, and emotions. That’s how casually once a joker becomes a king.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mitt-roshin.jpg",
  },
  {
    value: "backside",
    edition: "chapter i",
    suit: "backside",
    artist: "sebastian-onufszak",
    info: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/retina/000.jpg?2",
  },
  {
    value: "joker",
    edition: "chapter i",
    suit: "black",
    artist: "adnan-ali",
    info:
      "Cast aside as a meaningless vessel, the joker has lost its influence as a purposeful asset. Treated as obscure and useless, it slowly died from the inside and rotted away. Ignored by the royalty and valued as nothing by the society, it suffered a fate it did not deserve. But times change and so does fate. The jokers will return one day, as an undead horde, to take back the reputation that was one theirs. The vessel that was once hollow now has a green spark. And the purpose that was once unknown, has now become vengeance!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/adnan-ali.jpg",
  },
  {
    value: "joker",
    edition: "chapter i",
    suit: "red",
    artist: "dani-blazquez",
    info:
      "As if it were a science fiction story, what if the figure of the joker had transcended the icon and had become a key character in the cities of a dystopian future? An outsider. A kind of cyborg that mixes the classic outfit of a court minstrel with the most advanced technology in robotics",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-dani-blazquez.jpg",
  },
  {
    value: "2",
    edition: "chapter ii",
    suit: "clubs",
    artist: "marcello-manchisi",
    info:
      "2120 will be a better time, I know it. Humanity will be much more advanced, so I guess there will be both nature and robots. But most important, future humans will be advanced because they'll program robots according to a universal rule: love is positive in all of its forms, so it should never be kept hidden to others. That's why all kids of the future, no matter if humans or robots, will be able to show their love without any hesitation, with simple and pure actions like giving flowers to someone else.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/marcello-manchisi.jpg?2",
  },
  {
    value: "2",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "tim-zhilin",
    info:
      "The work was during all these really unstable times, when it's hard to think about a 100 year perspective. But whether the 2120 will be intergalactically expeditionary or very self-isolated - there will always be a need for fun, games and parties! So even if the most of the technologies and realms would change, there will always last a pleasure to calmly stay at home and play cards with ones you like!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/tim-zhilin.jpg",
    reversible: true,
  },
  {
    value: "2",
    edition: "chapter ii",
    suit: "spades",
    artist: "knysh-ksenya",
    info:
      "2 Spades Idea - Maybe one day we will find a portal to the future and we will have a chance to reach out and meet with someone who was on the other side ... The idea of using such a portal excites and intrigues me. Would you take a chance?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/knysh-ksenya.jpg",
  },
  {
    value: "2",
    edition: "chapter ii",
    suit: "hearts",
    artist: "meave-stvdivm",
    info:
      "The Toltec and Aztec people had a word for the future or hereafter: Okachiwali. They also had a name for a condition they called Omeyolo: «two-hearts» or «two-hearted», meaning somebody in doubt, misleading, or with two conflicting intentions. For them, sacrifice and tearing the heart out was of supernatural significance: it was all about transformation and change, even if painful. Today, we women and men of the 21st century face a complicated, ambivalent future: we’re going forwards and backwards at the same time. Despite our technology and growing consciousness we’re still held back by obsolete ideas and not-so-wise behaviors. This card —the Two of Hearts, none the less— is a perfect metaphor for our troubled, hopeful times and the ominous, thrilling next 100 years.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-meave-stvdivm.jpg",
    reversible: true,
  },
  {
    value: "3",
    edition: "chapter ii",
    suit: "clubs",
    artist: "hamed-sarhadi",
    info:
      "I have no doubt that we are using the Earth. The oceans, jungles, trees, animals and the whole Eco-System have been damaged. Sooner or later, if we don’t make a difference in our major behaviors, we will lose it. In my point of view, we’ve built a massive and complex system but without roots in the future and the generous gifts from our mother earth will be trapped in our engine’s pipes. By this unkind way, we can’t look at the future, but the future will watch us from a higher perspective. I’ve tried to imagine that future, which we don’t criticize our approach with our world around us, in it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/hamed-sarhadi.jpg",
  },
  {
    value: "3",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "lidan-chen",
    info:
      "Many species will be extinct in 2120. There are no wild animals anymore. Only robot creatures remain. Although the robots are friendly, but they will never replace real creatures.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-lidan-chen.jpg",
  },
  {
    value: "3",
    edition: "chapter ii",
    suit: "spades",
    artist: "andrew-nedzvedsky",
    info:
      "Humanity as a kind have jumped enormously in the technical aspect within whole 20th century. We have developed different technologies and use them every day. 15 years ago cell phone was almost a miracle, unbelievable wonder of the technical age. Now we use cell phones of different kinds everyday and can't imagine our lives without then. In 100 years i believe people will be able to manufacture and use artificial organs in the same manner they produce new iPhones. In 100 years i think every person will have at least 3 artificial major organs in their body. People will be able to change and update them, look for their ads in mass media, anticipating new features that will be released with the new generation heart, lungs or lever.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andrew-nedzvedsky.jpg",
  },
  {
    value: "3",
    edition: "chapter ii",
    suit: "hearts",
    artist: "pau-del-toro",
    info:
      "The future has to be emotional if we want to keep being humans. I cannot imagine a society with no emotions and robotized as it seems we go.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-pau-del-toro.jpg",
  },
  {
    value: "4",
    edition: "chapter ii",
    suit: "clubs",
    artist: "impact",
    info:
      "The number 4 to many is seen as the perfect number, it symbolises foundation and its importance is deeply ingrained in everything around us. For example, there are four cardinal directions (North, East, South and West), four elements, four seasons and even four suits in a deck of cards. For me, this number and the clubs’ stylised clover symbol created the link to a lucky 4 leaf clover, which as a result became the base of this card. The base depicts a vision of the perfect marriage between sea and land giving birth to an element of nature previously non-existent; a 'Clover tree'. This creation is the result of a combination of the luck brought by the clover base and the perfect conditions created by a future utopia as a result of the coexistence of nature and man. This card represents the small hope that this seemingly impossible future may become a reality.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-impact.jpg",
  },
  {
    value: "4",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "oliver-santiago",
    info:
      "Four of Diamonds is inspired by the Future of Creativity. Creativity is rooted in a complex cognitive process equating a different level of development. Data may already have surpassed oil in value, and Artificial Intelligence might supersede human capabilities. But human creativity stems from a widespread network of brain areas that collectively produce works of art and innovation. With the absence or lack thereof, man-made machinery will not exist to date. Looking at the bigger picture, it is a significant driving force of progress. Without creativity, we expect a dismal forth coming. With it, like what this card is trying to convey, our world can flourish a hundred years more.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/oliver-santiago.jpg",
    reversible: true,
  },
  {
    value: "4",
    edition: "chapter ii",
    suit: "spades",
    artist: "silvan-borer",
    info:
      "I'm not sure how exactly the world will look like 100 years from now. But I'm sure it's still mother nature who stands above all. She's the source of all our inspirations.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/silvan-borer.jpg",
    reversible: true,
  },
  {
    value: "4",
    edition: "chapter ii",
    suit: "hearts",
    artist: "umberto-pezzini",
    info:
      "A higher rate of pandemics brought the whole humanity on its knees, but also brought it closer together. A world-truce was declared, scientific efforts where globally channeled to face this global crisis. Humanity rose from its ashes, united and at peace. Nanobiotechnologies advancements allowed the end of almost all severe diseases and considerably extended our life expectancy. After decades of growth, the friendly alien species of the Ulteriors revealed itself to us, considering us finally mature enough to join them in the common effort to explore the universe together. Cross cultural exchange gave birth to new artistic forms and even religions. In the illustration an icon of Saint T’naskor, or Saint Polydorus as we terrestrials prefer, 'the donor of hearts', protector of the adventurers and the explorers. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/umberto-pezzini.jpg",
  },
  {
    value: "5",
    edition: "chapter ii",
    suit: "clubs",
    artist: "pilar-vega",
    info:
      "I propose a greener, ecological and environmentally friendly next century, where, after a great extinction of the largest animals that currently inhabit the planet, the surviving fauna and flora allies to subsist, evolving in a thousand ways, compared to a humanity lost in a new civilization.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/pilar-vega.jpg",
  },
  {
    value: "5",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "stefano-ronchi",
    info:
      "Melancholy. Bad card, so they say. Always with those little 'thinghs' around, they whisper... It is dangerous for everyone to stand on the swing - You can't, you shouldn't. She was still there. Melancholy, 5th of Diamonds",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-stefano-ronchi.jpg",
  },
  {
    value: "5",
    edition: "chapter ii",
    suit: "spades",
    artist: "cohen-gum",
    info:
      "In the future virtual reality will have superseded actual reality in every way. People will no longer live out their lives in a physical sense. They will belong to the network. Their bodies will be like throw away junk, only their minds will remain. The human race loves to leave behind monuments. There will be huge data warehouses full of shrines as proof of their existence in the real world, even if their bodies are long gone. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-cohen-gum.jpg",
  },
  {
    value: "5",
    edition: "chapter ii",
    suit: "hearts",
    artist: "andreu-zaragoza",
    info:
      "I imagine a future world where technology has evolved to a point in which we put our lives in its hands and we mix with it, but nature keep claiming what belongs to her.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andreu-zaragoza.jpg",
    reversible: true,
  },
  {
    value: "6",
    edition: "chapter ii",
    suit: "clubs",
    artist: "nestor-ramos",
    info:
      "Year 2120. When I think of how we are going to live a hundred years from now, one of the first things that comes to my head is nature and our environment, will we be able to change our way to live in order to protect it and keep a more balanced and sustainable living or will we be rather keeping our customs and our existing progress at any cost? One of the other important aspects is how are we going to change our living spaces with a tendency of changing to smaller apartments due to population density and the increasing prices in big cities, how are we going to organize and how new architecture is going to impact into developing new solutions.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-nestor-ramos.jpg",
  },
  {
    value: "6",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "harry-decker",
    info:
      "In history, every movement has a counter-movement. In a future world, where we are constantly connected, there must be a place where we can disconnect from it all. The future, I imagine will be entirely dominated by globally connected technology and progress. We just need time away from technology—already today we seek digital detox and time to get away to a tropical vacation spot, even if it’s only for a couple of hours. The Tiki Bar is the traditional symbol for escapism—the perfect place that’s a simple counterbalance to the ever-evolving world—that provides the freedom to disconnect, let loose and relax mind and body. This Tiki Bar is the perfect embodiment of that concept, a creative playground where you can take a much-needed pause from all pressure and responsibility. The retro-futuristic A-frame is a symbol of both past and future—architecturally anchored in tradition and innovation—its timeless character reinforced through the reflection, remaining a safe harbor, even in 100 years. After all, while everything changes, some things must remain.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/harry-decker.jpg",
  },
  {
    value: "6",
    edition: "chapter ii",
    suit: "spades",
    artist: "cuong-bui-manh",
    info:
      "What will the world look like in 100 years? What will remain of our home if we don't change our ways? 70 percent of the earth's surface consists of water. Still we pollute the seas and extinguish species in the name of our own prosperity. My illustration shows our dire fate: In a world swallowed by the sea, the only place mankind has left is the waste it left in it's wake.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/cuong-bui-manh.jpg",
  },
  {
    value: "6",
    edition: "chapter ii",
    suit: "hearts",
    artist: "robin-martens",
    info:
      "Food has always been a corner stone of human society. Cave men who went hunting, suddenly became farmers and so the rise of the cities has begone. Another big revolution in the food industry are the start of food delivery services. But in the future these human services will be at risk. Even though the transportation abilities will advance, the human aspect will be threatened by the rise of competitor delivery drones.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-robin-martens.jpg",
  },
  {
    value: "7",
    edition: "chapter ii",
    suit: "clubs",
    artist: "chragi-frei",
    info:
      "With sea levels rising, coastal cities will have to look for creative solutions to provide living space. A way to avoid the dangers of the rising waters are floating houses. They’re built on a raft-like platform, with living quarters above and below the waterline. A greenhouse allows the residents grow food of their own, electricity is provided by a built in turbine powered by tidal forces. Go with the flow, as they say.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-chragi-frei.jpg",
  },
  {
    value: "7",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "simon-buijs",
    info:
      "A stack of 7 elements, some of them are valuable and some are not. A stack that will never topple even when it's upside down thanks to the magic number 7.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-simon-buijs.jpg",
  },
  {
    value: "7",
    edition: "chapter ii",
    suit: "spades",
    artist: "nouran-zedan",
    info:
      "I believe that 100 years from now, humans will have more interactions with AI and technology will evolve creating abilities that we have never experienced before. Humans being genetically modified with AI, will have the ability to live underwater and discover life in the depth of the ocean that could change the world forever.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/nouran-zedan.jpg",
  },
  {
    value: "7",
    edition: "chapter ii",
    suit: "hearts",
    artist: "jason-lyon",
    info:
      "I think even without research I knew this piece was going to be based on the theme of love. But with research, it’s said that the seven of hearts is the card of the ‘ideal’ love. To me the ideal love is an undying love, it’s a force the drives you to become greater. I think in the next 100 years, our imbalance love for nature and technology will leave us no choice but to desert earth and venture into space. And out there, where our body originally came from, we will create something new, something better, something ideal.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jason-lyon.jpg",
    reversible: true,
  },
  {
    value: "8",
    edition: "chapter ii",
    suit: "clubs",
    artist: "acrylic-pixie",
    info:
      "No matter where you are or who you are, you can have world at your fingertips without leaving your comfort zone. Work from home, play from home, order food, talk to your family and friends, see the world - it's all there, in the comfort of your bubble.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/acrylic-pixie.jpg",
  },
  {
    value: "8",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "jonas-devacht",
    info:
      "Our vision of the future has had countless different interpretations over the times, even as far back in the early 1950s. Right now in 2020, we’re facing a lot of problems we haven’t faced before such as environmental issues and new diseases. Some might even say the future doesn’t look as bright as it once was to the people back in the ’50s. Because of that, I wanted to bring back some of that retro craziness by illustrating what can be the beginning of an epic space battle. Who knows, in 100 years we might explore space and fight aliens with big plasma blasters… 🔫💥",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/jonas-devacht.jpg",
  },
  {
    value: "8",
    edition: "chapter ii",
    suit: "spades",
    artist: "lorenzo-fioranelli",
    info:
      "Up to now, one of the most known and daily problems is 'social distance'... not (only) depending on the actual pandemic, but rather due to distance in itself. For sure social networks are a good help but there's a limit which cannot be exceeded: skin contact. People and friends, loved ones, are far away and sometimes socials are not enough. I figure the future, maybe 100 years from now, in which with just a touch, a teleport pad perhaps, as easy as using an app, available to all, one can simply jump in a gateway, join us, and new places too.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/lorenzo-fioranelli.jpg",
  },
  {
    value: "8",
    edition: "chapter ii",
    suit: "hearts",
    artist: "miguel-bencomo",
    info:
      "LIVING IN THE AIR: In the not too distant future, humanity has felt the need to seek purer air and live above the clouds. The planet's contamination has reached extreme levels. The title of this work is practically a metaphor. existential related to a vital feeling and the search for new spaces to live.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/miguel-bencomo.jpg",
  },
  {
    value: "9",
    edition: "chapter ii",
    suit: "clubs",
    artist: "gianluca-natale",
    info:
      "The new century will be marked by the end for a new beginning. Environmental pollution will give way to a new rebirth and nature will take back what belongs to it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-gianluca-natale.jpg",
  },
  {
    value: "9",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "burak-cinar",
    info:
      "In the future, some of our descendants will land on untouched planets and engineer ecosystems to maintain our fragile bodies. An ecosystem that is hard to recover in the heavily damaged pale blue dot.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/burak-cinar.jpg",
  },
  {
    value: "9",
    edition: "chapter ii",
    suit: "spades",
    artist: "magnus-riise",
    info:
      "The world: One hundred years from now. The piece, titled «Utopia/Dystopia», shows how beautiful and magical our world can be when we take care of it and become one with it, whilst also painting a grim picture of where we’re currently headed, if we do not change our way of life. The spade symbolizes the cruelty, damage and the pollution we are causing. If this continues at today’s rate, the world, and us along with it, will drown in its filth. The hourglass symbolizes time running out. We cannot keep this up much longer without severe consequences. We must act fast and change our ways. Every moment counts. It's not the most positive divination of the future, but it is important to face reality and be aware of where we are heading. The leaves in the Utopia part of the hourglass, along with the big black spade, tallies a total of nine spades, and represent harmony with nature. The Dystopia part represents a scorched Earth, devoid of color and life, a layer of ashes and dust all that remains…",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/magnus-riise.jpg",
    reversible: true,
  },
  {
    value: "9",
    edition: "chapter ii",
    suit: "hearts",
    artist: "lena-vargas",
    info:
      "Many circumstances may change in 100 years, but one of the things I believe will stay the same is our need for escaping, feeling something more than the mere reality. Imagine if we could consume custom made capsules that would alter our conscious state to allow us to live dream-like experiences that would feel completely real and magical, although fleeting like any other substances. As simple as breathing fresh air, having an orgasmic encounter or flying in the sky. All would be possible with a scan of your DNA and technology., just as any other vending machine.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-lena-vargas.jpg",
  },
  {
    value: "10",
    edition: "chapter ii",
    suit: "clubs",
    artist: "sofia-berlina",
    info:
      "The future of new technologies, most part of which we can't even imagine right now, can be a bit scary sometimes, besides all the excitement, of course. This picture appeared in my mind one evening, probably inspired by my little son, peacefully sleeping after a rowdy day, and I decided to create a warm and cozy image of the future, no matter how weird it may turn up. After all, our future comes directly from our imagination, what can go wrong?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-sofia-berlina.jpg",
  },
  {
    value: "10",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "bernie-jezowski",
    info:
      "Since the appearance of ten mysterious Pyramids, the world has been in disarray. Silent they stood, yet they have brought wars, famine, floods, death and destruction... They birthed a plethora of theories, some innocent, some sinister, that have separated people. The Pyramids have been worshipped, studied, even nuked and still in silence they stood unscathed. The fact remained - anyone who came too close disappeared. Yet, as the time passed people’s insatiable need to know has started making way for peace, mending broken relationships. Nations working together to find out the truth about the Pyramids. Now, one person believes he found the answer. The Traveler has begun his journey to save the World...",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/bernie-jezowski.jpg",
  },
  {
    value: "10",
    edition: "chapter ii",
    suit: "spades",
    artist: "martina-filippella",
    info:
      "I've recently read an article on Wired where Stephen Hawking said that within 100 years we will need to find alternative planets to live in, due to climate change, lack of space, epidemics etc. Although this statement was probably meant in the most negative and alarming way it could be, I like to believe that in 100 years there will be plenty of undiscovered and hospitable planets and we will be given the opportunity to travel through space to choose our favorite home among many possibilities. A girl can dream.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/martina-filippella.jpg",
  },
  {
    value: "10",
    edition: "chapter ii",
    suit: "hearts",
    artist: "diana-dementeva",
    info:
      "Rick Wilson got a place in one of those big corporations, you never know what they produce, but you know for sure they watching everybody. Rick works here for a week but still doesn’t know the point of his job. He makes calculations, compiles statistics, adds thousands of names to the database… Good thing - now Rick got that interactive helmet, ‘eyes’ as his colleagues named it. He shouldn't speak with his colleges, though. Rick's 'eyes' wasn't the latest model, so he couldn't see through them. But that kind of 'blind eyes' is very helpful in organizing data. The job is nice. Okay, it's kind of boring. Of course, it would be great to be among the guys wearing their latest 'eyes' and looking through the walls and watching, watching, watching... 'We see you' - they say, repeating the informal slogan of their company. Anyway, you should do your job perfectly, otherwise, they will see you're cheating. Rick's department is on 42's floor. What is on other floors - Rick doesn't know, everything is top secret. Rick even can't take off his 'blind eyes' at work hours, he shouldn't see too much. Every step is recording. And you shouldn't ask questions. You should watch and make statistics here, in 2121.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/diana-dementeva.jpg",
  },
  {
    value: "jack",
    edition: "chapter ii",
    suit: "clubs",
    artist: "anna-ezer",
    info:
      "It was an ordinary morning in 2120, when the Cyber Reaper made his round. Robots, androids and various mechanisms blinked their sensors for the last time and peacefully went into virtual space under the wave of his scythe. Boring work, nothing portended change. But one tiny little thing didn’t want to leave. The reaper was intrigued, so what went wrong? Where did his deadly power go?.. That can't be it! For a long long time no one met a living creature on the planet.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-anna-ezer.jpg",
  },
  {
    value: "jack",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "ben-bauchau",
    info:
      "When I think of Future, I think of robots, and I simply like the idea that this card game depicts a robot that has some sort of ritualistic or ceremonial costume, like the usual card figures use to have.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ben-bauchau.jpg",
  },
  {
    value: "jack",
    edition: "chapter ii",
    suit: "spades",
    artist: "jade-sabado",
    info:
      "My illustration for the Jack of Spades symbolizes the card’s characteristics itself jumbled with what I envision. Within next 100 years, the ideal world would have had collapsed. Nature strikes back, and humanity barely survives. It's all thanks to the technology's rapid development-which becomes more and more advanced every generation. In the year 2120, what comes next? They will simply carry on. Most of the humanity will invest their time and resources in improving their current technology-robots, computers, AIs, gadgets as well as weapons to the greater extent. The technological evolution will become invaluable and extremely dangerous at the same time. Make one wrong move, and the mankind is doomed. It's a double edged sword. For now, let's just be responsible humans! ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/jade-sabado.jpg",
    reversible: true,
  },
  {
    value: "jack",
    edition: "chapter ii",
    suit: "hearts",
    artist: "jefferson-mesa",
    info:
      "For this illustration i was wondering how people will perceive love in 100 years from now, will be love as we know today?, ther wont be love? i was trying to figure it out how we could love or be loved in a world where technologic is in everywhere, a world where the  human race fight with technologies to not to get extinct. But in the end i guess the concept of love somehow will save humans from the extinction.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jefferson-mesa.jpg",
  },
  {
    value: "queen",
    edition: "chapter ii",
    suit: "clubs",
    artist: "kaloian-toshev",
    info:
      "I wanted to create a girl incorporated in the clubs symbol. I believe although Playing Arts is an art project, the design of the cards shouldn't compromise the game and the design should clearly communicate the card. That's how the idea of a girl with a big hat came up, where the hat could go outside of the clubs symbol. When I've sketched it I've noticed that it had this western/cowboy style and decide to go with it and see what happens. From there came the idea of her holding a card and smoking a cigar, like she's on a table playing some serious poker game somewhere in the wild west. Then I had to decide what card is she holding and went with King. After that I realised it could have been a Jack (kind of like the younger version of the King) and decide to draw it as well as a card on her hat. It's like she's flirting with both men. The style of the artwork is new experimental style I'm currently developing where I try to blend different visuals.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-kaloian-toshev.jpg",
  },
  {
    value: "queen",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "martin-grohs",
    info:
      "Today, 100 years from now, things will be different. The technology will be much further than it is now. People will have to face completely different challenges and devote themselves to completely new problems. But will people adapt to this? Or will they simply trust a powerful person without questioning, and will they thereby plunge themselves into the abyss? My queen is a queen, but does she really rule on her own? Or is she just a puppet of shadows? Shadows that no one sees or knows, but which in reality have the power and play us all off only each other - for their own provit. People tend to want to be blind. Not wanting to know the truth, because it‘s supposedly easier. And so many simply follow a queen who may make a good impression on the surface, but who herself is blind to the future. Who doesn‘t decide for herself which way she will go for us and ultimately only hangs in the threads of the shadows. So experience your future consciously and decide for yourself. Open your eyes and don‘t let them play with you.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-martin-grohs.jpg",
  },
  {
    value: "queen",
    edition: "chapter ii",
    suit: "spades",
    artist: "ale-de-la-torre",
    info:
      "In the future we will live in a planet covered almost entirely by water so we will have to take advantage of every single surface of land to preserve all kinds of plants while we develop the technology to build encapsulated nomadic cities that will travel under water, by flying and in outer space. A female deity will emerge to constantly remind us of mother earth and through her guidance we will learn to preserve life. We will create artificial wormholes to travel in our amphibian capsules from the bottom of the seas, directly into outer space in a constant search for life. We will have lost many species and a large part of the human population, but we’ll be more conscious and grateful for the generosity and the beauty of our planet Earth.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ale-de-la-torre.jpg",
    reversible: true,
  },
  {
    value: "queen",
    edition: "chapter ii",
    suit: "hearts",
    artist: "joaquin-rodriguez",
    info:
      "I’ve always been fascinated by the aesthetics surrounding the bionic future that apparently awaits mankind. I wanted to portrait a situation where the human side prevailed so I gave the main role to the heart necklace and gave it the subliminal appearance of having been extracted right out of the robot’s chest.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/joaquin-rodriguez.jpg",
  },
  {
    value: "king",
    edition: "chapter ii",
    suit: "clubs",
    artist: "juan-martin-diez",
    info:
      "In the post-apocalyptic future, the few surviving humans organize into clans fighting for the survival of the species. The environment has become toxic and while the earth heals itself, the vegetation and animals have mutated and in some inexplicable way the dinosaurs walk the earth again, interacting in an unthinkable way with human beings.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-juan-martin-diez.jpg",
    reversible: true,
  },
  {
    value: "king",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "aleksey-rico",
    info: "Everyone afraid changes. I'm afraid that nothing will change.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-aleksey-rico.jpg",
  },
  {
    value: "king",
    edition: "chapter ii",
    suit: "spades",
    artist: "mr-aramanada",
    info:
      "My work is an image of a Babaylan (Albularyo), a Filipino folk healer wearing a dress inspired by indigenous textile motifs while carrying a bowl adorned with traditional motifs. In the future, there will be a great interest in indigenous culture where people are rediscovering their ancestral roots as part of knowing their identity, both personal and collective,  in the context of heightened cultural fusion due to globalization. Indigenous knowledge (art, medicine, etc.), will be weaved in the contemporary context (art and design, music, etc.) to strengthen the sense of cultural identity of a person and the community as a whole.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/mr-aramanada.jpg",
  },
  {
    value: "king",
    edition: "chapter ii",
    suit: "hearts",
    artist: "zcape",
    info:
      "This King of Hearts is mixing the image of his traditional card value with the vision of his own future: a King with no kingdom… He’s the perfect icon of the humanity: king of nothing but sure to be the greatest… After humanity has collapsed on itself (in one hundred years, probably before), victim of its own greed and stupidity, he’s looking for a new place to parasitize, alone in the dark, lost in the cold space of his own mediocrity… just to repeat the same mistakes, again and again, foolishly convinced that his way of life is the only right one. Because human is just like that, wrong…",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/zcape.jpg",
  },
  {
    value: "ace",
    edition: "chapter ii",
    suit: "clubs",
    artist: "konstantin-shalev",
    info:
      "In my opinion, how the future will look in 100 years is completely in our hands, it will depend on the wisdom and decisiveness of our actions, I am sure that the balance of life will be maintained. The only thing that will remain unchanged is the simple and main principle of nature, predator and prey.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-konstantin-shalev.jpg",
  },
  {
    value: "ace",
    edition: "chapter ii",
    suit: "diamonds",
    artist: "alice-hoffmann",
    info:
      "In 100 years mankind will be able to reproduce every element, particle, structure and material that appears in nature and in the universe. The tree of life will have another meaning and appearance on our planet: human needs and planet goods, such as plants, flowers, ground, animals, clouds, etc. All these things will be reproduced by the push of a button in clone manufactures by artificial intelligence. An high and important task mirrored on the highest card: Ace Diamond.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-alice-hoffmann.jpg",
  },
  {
    value: "ace",
    edition: "chapter ii",
    suit: "spades",
    artist: "natalia-koniuszy",
    info:
      "For me in the future the history of humanity will come full circle. It will be only mother nature caring about what is left from earth.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-natalia-koniuszy.jpg",
  },
  {
    value: "ace",
    edition: "chapter ii",
    suit: "hearts",
    artist: "garavato",
    info:
      "We’re in 2020… The human race has been highly concentrating on the extreme power of empathy and uses it now to rule the world. Borders no longer exist, respect is the king concept and mutual aid is the new normal. We now coexist with extraterrestrial cultures, developing new forms of biotechnologies, more than ever connected to our own consciences, we’ll all team up for a better world, no matter the species, backgrounds or origins.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-garavato.jpg",
    reversible: true,
  },
  {
    value: "joker",
    edition: "chapter ii",
    suit: "red",
    artist: "valentina-brostean",
    info:
      "My joker is a contemporary interpretation of the classical one. Mysterious, wild, eccentric, playful - a character that you'll remember and that will affect you, visually strong as much as his role is! He's an element of luck made out of many pieces and layers that fit perfectly together. I have used all the classical elements of joker such as his recognizable smile, funny hat, makeup around the eyes and interpreted then (stylized them) in my own recognizable visual language!  I wanted to point mostly to the mystery of his character and through layers emphasize the diversity of roles he might have in the card game. I have Imagined this joker exactly as a character from the future. Based upon his classic features but in this totally contemporary, new context. Maybe in the future, we're all gonna change out physiology and become more robotic, layered, with artificial implemented pieces, a mix between the artificial inelegance and humans! Therefore I have left just a piece of the real skin (with human eyes just a bit robotized) on his face as basics and built the abstract elements upon it! I have placed him 'out of space' in this abstract space full of starts as maybe in this proper future we will be able to travel further in space, or maybe telepathically mind travel in different dimensions of conscience! My joker could do that :)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/valentina-brostean.jpg",
  },
  {
    value: "backside",
    edition: "chapter ii",
    suit: "backside",
    artist: "sebastian-onufszak",
    info: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/retina/000.jpg?2",
  },
  {
    value: "joker",
    edition: "chapter ii",
    suit: "black",
    artist: "ruben-antorveza",
    info:
      "The idea of this illustration is to visualize a future where there is a balance between species: animals, humans and the environment, where we are all one. and let's be aware that what happens to one affects us all. That is why this being that is half animal and half human fused in an ethereal space that simulates water or air, giving the sensation that it is floating in the air or submerged in water. Almost as if he were a medieval god.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ruben-antorveza.jpg",
  },
  {
    value: "joker",
    edition: "chapter ii",
    suit: "black",
    artist: "shangning-wang",
    info:
      "Black J.K Mona Lisa. Year‎: ‎R.50 (2120), Medium‎: Man made ‎Ink. Subject‎: ‎Black J.K Mona Lisa,  Artist‎: ‎Leoroboto Ai Vinci. The Robot Monalisa is a portrait painting by the earth artist Leoroboto Ai Vinci. He drew it on the last piece of man made paper. He tried to learn the human being's art and history before the Ai took over the earth.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/shangning-wang.jpg",
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards);
};

export default dump;
