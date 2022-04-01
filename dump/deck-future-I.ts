import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

export const slug = "future_i";

export const deck: Omit<GQL.Deck, "_id"> = {
  title: "Future Edition I",
  short: "Future I",
  slug,
  info:
    "299 international artists, designers and studios were using playing card as a canvas to illustrate their vision of what the world will look like 100 years from now. Selected artworks formed two Future Edition decks.",
  image:
    "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_future01.jpg",
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
    suit: "clubs",
    artist: "gian-wong",
    info:
      "A century from now, human life could be struggling with extinction after fully exhausting earth’s resources and neglecting its cry for help. The planet could simply not support life anymore. With this, humans will be left with only one solution: to evacuate and begin anew in another existing planet. The journey in finding a habitable home will be challenging but humans start to form a new appreciation for everything that exists beyond the earth’s atmosphere—and this time, mankind will vow to protect its new home.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-gian-wong.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "diego-marmolejo",
    info:
      "My illustration is an ironic vision of the future of music. Musical instruments will become electronic instruments for playing music. And musicians will be more like computer scientists.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/diego-marmolejo.gif",
    reversible: true,
    winner: true,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "olga-zalite",
    info:
      "In my image of 2120, the cult of individualism would have progressed to the point where people have little to no interest in forming couples or being in romantic relationships. They are stuck between their instinctive need for love and the desire to protect their personal space. Unwillingness to compromise followed by a lack of emotional intelligence might put family institutions at the edge of extinction.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/olga-zalite.jpg",
    winner: true,
  },
  {
    value: "2",
    suit: "spades",
    artist: "abraham-mast",
    info:
      "History repeats itself, but how much and at what frequencies? How far must we live our existence to run out of new flavors? It is almost paralyzing how we can see ourselves making the same mistake over and over again, yet in the moment we don't notice it. It is only a matter of time before someone trips on an existence banana and sets in motion a series of events leading to our demise. One thing is for certain: when cloaked figures appear, it is probably best to listen and heed their advice. If something ever takes the time to travel from a different time or dimension to give us advice, we are on the verge of a monumental decision.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-abraham-mast.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/2s-video-low.mp4",
    winner: true,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "antoine-goulet",
    info:
      "I envisioned a future where gender is now irrelevant. Colors usually associated with 'typical' gender roles are used on the two front characters, while the third one is a mix of the two. The three characters also share the same genderless look and attributes. I wanted their composition to evoke the shape of a club.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/antoine-goulet.jpg",
    winner: true,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "el-diex",
    info:
      "2120 Entertainment business will put music into orbit. Space sounds, visuals and voices will rule the next century. In a hundred years, outerspace venues will give people new gathering places for sharing music and celebrate festivals. Aliens, robots and digital bands will get together to share sounds from other galaxies and performances from other dimensions.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/el-diex.jpg",
    winner: true,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "mike-karolos",
    info:
      "'Refugee' The year is 2120. We are now forced to leave our home, planet Earth. No refugee wants to leave their home but that's necessary when it is the only way to survive. Earth is now a hostile environment due to human behavior. There are no more borders, we are all earthlings and refugees looking for a new place to call home. This is a possible scenario for the future. Maybe not in 100 years from now but it could come to that at some point unfortunately. My illustration has two meanings. One is about how we treat our planet and the second is regarding refugees. We could all be a refugee in the future so think twice before you judge.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mike-karolos.jpg",
    winner: true,
  },
  {
    value: "3",
    suit: "spades",
    artist: "angela-bardakjian",
    info:
      "Our lives today are unrecognizable from those a century ago. Who would have thought that we will be living 2020 in isolation. Yet we are lucky to be living in a century where all of us can connect with each other easily. The way we live, work, and play will change beyond our expectations in the upcoming 100 years. whether formed technically or naturally. It is going to be a significant world. This card creates that fine line and a contrast between the traditions and the future. It is about discovering the unknown with its organic, and dynamic flowing lines.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/angela-bardakjian.jpg",
    winner: true,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "toma-studio",
    info:
      "Four of Clubs symbolise the foundation of Knowledge - the knowledge to be shared to educate and grow. Fours must be in command of every situation that arises. They are dealing with practical applications of knowledge, and they the power to glorify it. What awaits us in the future? As this year’s pandemic teaches us, it’s impossible for humans to predict what is going to happen, and the effects of our actions. Between pandemic, environment and economical crisis, and the huge battles for race and gender equality, 2020 may be seen as a turning point for mankind. And what about the future? We imagined that mankind - finally aware of its past - will reach a superior level of universal knowledge, and with that will be finally able to master the universe, and through a total understanding of life, love, nature and equality, bring balance to the world.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-toma-studio.jpg",
    winner: true,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "maria-kulinskaya",
    info:
      "When humanity disappears the world will change. Only robots will remain on the earth. They will start developing technologies and building civilization anew. Robots will enter into symbiosis with a peculiar post-apocalyptic nature. Therefore, my illustration depicts a robot that plays 8-bit games on old-fashioned computer.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/maria-kulinskaya.jpg",
    winner: true,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "luis-pinto",
    info:
      "In the future humans learn that in order to evolve in a positive way they’ve to study a lot (even more) about the relationship between nature + technology as one to create a powerful impact on our planet. Thanks to this immense wisdom new generations are able to find sustainable-innovative solutions to coexist in this world as well as new scientific breakthroughs that will change the way we see, perceive and design our universe.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-luis-pinto.jpg",
    winner: true,
  },
  {
    value: "4",
    suit: "spades",
    artist: "manuel-kilger",
    info:
      "The idea of my illustration is an idealistic future world, where all existential problems of humanity are solved. A world where humans, nature and technology coexist peacefully and ecologically in perfect symbiosis.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-manuel-kilger.jpg",
    winner: true,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "illustrescu",
    info:
      "Teleporting my imagination 100 years from now, I can see a fully developed society based on futuristic technologies. People are using more and more augmentations to stay updated and the crave for VR is tearing apart real society. Being dominated and governed by tech savy companies, the world as we know it today will not be the same, a new world will emerge.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/illustrescu.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "amatita-studio",
    info:
      "Inspired by what we are living now, the idea is that perhaps in the future, masks will not only be used as an instrument to keep us safe, to protect ourselves and the others, but it will evolve into an high-tech fashion accessory. Like are smartphones, or smartwatches today. Especially those last ones, that proved already in many occasions how a beautiful iconic piece of tech it's not only that, but it's also something that can prevent, detect and saves many lives. We took inspiration from futuristic fashion and thought that masks will become socially accepted in the future. An instrument that doesn't just scream 'I'm contagious', but that will be seen as 'fun', and 'social'. We imagined that it could work by tracking the movement of our mouth, to replicate that on the screen of the mask, which if swiped, shows different type of lips or filters. This way a futuristic mask will not just work to keep us safe, which will always be its primary function, but while doing that it will work also to make us smile. Litterally.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/amatita-studio.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/5d-video-low.mp4",
    winner: true,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "evgenia-makarova",
    info:
      "'Ambassadors from different countries are admitted to the residence of the king' — one of the values of the 5 hearts that I found. This metaphor can mean the need for humanity to accept distinct life forms as equal or even superior. What if in the future, artificial intelligence will develop the capacity for empathy and love? How will they see the difference in the level of consciousness between humanity, the animal and plant world, and themselves. And what will they feel about it? Perhaps the roles may change.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/evgenia-makarova.jpg",
    winner: true,
  },
  {
    value: "5",
    suit: "spades",
    artist: "antonio-uve",
    info:
      "The future will be tough if we keep treating the planet as we are, pollution will be an even bigger issue for us and a breeze of fresh air will be a luxury from the past. We tend to imagine the future in outer space but I think we will stuck here on Planet Earth wearing spacesuits for protection from air polluted, although with a touch of sophistication as I tried to illustrate here.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-antonio-uve.jpg",
    winner: true,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "javier-perez",
    info:
      "In 100 years the wind energy will be normal as the electric light. It has become a key electricity generation resource for the transformation of the energetic model, cleaner and more sustainable.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-javier-perez.jpg",
    winner: true,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "andrea-bojkovska",
    info:
      "In 100 years, as technology takes over even more, an optimistic thought is that humans will finally focus more on environment care, self improvement and love. The technology will enable also the option to send our characters as clones to achieve some challenges, while we are focused on others. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andrea-bojkovska.jpg",
    winner: true,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "ana-gomez-bernaus",
    info:
      "As a graphic designer and lettering artist the first concepts that came to my mind regarding this card are balance, harmony and symmetry. The number six is an even number and when combined with the heart as the amount of elements in a composition it quickly draws a balanced structure. Formally, the 6 resembles the link of a chain, and that made me think of the idea that we are all linked within 6 degrees of separation, therefore, it's a number that we currently use to describe connection, but we do it on the basis of distance. March 2020 will always be remembered as the time where we all had to stay away from each other, but it has also made evident the desire we all have to stay together. I have been video conferencing with friends and family more than ever. Based on this experience, I envision a future where technology allows us to get together over any distance to collaborate, inspire and support each other. I envision a future where we are all united by six steps of connection.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ana-gomez-bernaus.jpg",
    winner: true,
  },
  {
    value: "6",
    suit: "spades",
    artist: "adriana-garcia",
    info:
      "In the future trips to other dimensions will become a reality, this illustration tells a love story about two people who belong to parallel universes: one where technology grew to the point that almost led to the destruction of humanity and another dimension where Technology did not grow as much, but the level of human consciousness did. It is in our hands to decide which of the realities we want for the future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-adriana-garcia.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "pj-offner",
    info:
      "Its very obvious what the future would look like in 100 years. A world without technology or any form of economic structure. Humans are forced to become one with earth again. Snakes and humans fighting together for a better world.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-pj-offner.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "ollie-hirst",
    info:
      "Historically, the seven of diamonds is a neutral card and associated with negotiation. When thinking about the future, my mind went straight to our relationship with the digital and how I fear we will eventually have to make a deal with ourselves, to stop the digital from taking over. Times like the ones we are currently living through show us the incredible power of technology, but with the rise of voice activation and self serving tech, we are at risk of being seduced and losing the human touch.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ollie-hirst.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "marc-urtasun",
    info:
      "My main concern for the future is about what will happen with our feelings or emotions. How will the robots, artificial intelligence, medical advances, or smart cities affect us as humans? How we gonna feel living with those changes? I used that concept for my piece and especially playing with the 7 Hearts card, which it has the most significant symbols for me: the red color and the heart. I created a kind of cloned hearts, with a “high tech” look but without losing the human feeling. Using only the color red representing the passion and love (the most important emotions) and also the blood color, which is literally our indicator of life. I like to be as abstract as possible in my work, using symbolic elements like the heart or the colors and giving to the people the chance to interpret the final meaning of the piece.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marc-urtasun.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/7-hearts_01.mp4",
    winner: true,
  },
  {
    value: "7",
    suit: "spades",
    artist: "fran-labuschagne",
    info: "The future will still be beating to the same rhythm.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-fran-labuschagne.jpg",
    winner: true,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "ryan-coleman",
    info:
      "Corporation MEGACORP knows you're tired of the same stale bottled and recycled air. Breathe new life into your day with Flora® — the all-natural eco-approach to the oxygen generation. Featuring a sleek and efficient tank design as well as stylish Old Earth looking plants, you will have your own private oasis on the Space Train to the Cosmic Mines. Pre-order today to receive your complementary OxySpheres® to add even more 'freshness' to your breathing experience.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ryan-coleman.jpg",
    winner: true,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "long-vu",
    info:
      "It is said that cats symbolize fortune, power and good luck; they were also the original Internet stars. That is why these mystical creatures are purrrfect for the 8 of Diamonds, the fame and fortune card that represents powerful individuals. In the future, this cat overlord will continue to dominate the Internet, occupy our time, and collect billions of clicks while cashing in on partnerships with the tech giants. Beware of the bringers of fortune as they can also carry bad luck and hold many dark secrets.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/long-vu.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/8d-template-low.mp4",
    winner: true,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "peter-cobo",
    info:
      "I've been a big fan of science fiction since I was a kid. Maybe in 100 years, technology will have advanced enough to colonize other planets. Inspired by authors like Bradbury, Huxley or Orwell, I imagine humanity being able to travel light-years away to discover new planets and, who knows, new intelligent life as well. Because, 'If it’s just us, seems like an awful waste of space'.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-peter-cobo.jpg",
    winner: true,
  },
  {
    value: "8",
    suit: "spades",
    artist: "noonmoon",
    info:
      "In the distant future, sea level may have risen so high that even New York’s famous Statue of Liberty’s head is barely above water.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/noonmoon.jpg",
    winner: true,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "laimute-varkalaite",
    info:
      "Natural mental humanity — the name of my art work, which reveals a code of the idea. I hope that the world 100 years from now will be more natural and humanity will become wiser. Although many of us can not imagine the future without modern technologies and robotics, the situation nowadays makes me feel that the way of survival is humaneness and close connection with our environment. My work is a symbol of this idea: human's communication with human, keeping our surroundings green, clean and safe, finding more time for ourselves and living in harmony with nature. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-laimute-varkalaite.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "mildeo",
    info:
      "Diamonds are worth a lot, but what will be the most precious thing in the future? I hope that in 100 years humans will see wild nature as precious emeralds and manage to preserve it for the future generations. I imagine that in 100 years as the climate change continues to worsen the conditions for people, the collective mindset will change. People will have to admit being just a piece of the ecosystems, not the owner of everything in order to continue live well.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mildeo.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "maria-fedoseeva",
    info:
      "'Please don't forget to recharge your mask and update your heart before you leave your underground shelter'. The topic of the new deck is the future. I decided to make a romantic illustration showing preparations before going to a date.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-maria-fedoseeva.jpg",
    winner: true,
  },
  {
    value: "9",
    suit: "spades",
    artist: "victor-vergara",
    info:
      "I imagine a positive and hopeful world, where technology is in charge of taking care of the nature and the nature takes advantage of the technology. I imagine a world in a sustainable balance in terms of time, color, beauty and completely aware of the interdependecy principle.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-victor-vergara.jpg",
    winner: true,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "alex-pogrebniak",
    info:
      "People living in the rhythm of a progressive 21st century often remember events of the past, where everything seemed to be simple and clear. While creating this illustration, I was inspired by the ideas of retrofuturism. I'm sure that in the future there will be muscle cars, rock-and-roll and minutes for fun too. I would like to see the future with optimism.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/alex-pogrebniak.jpg",
    winner: true,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "xave",
    info:
      "The future is a projection of our imagination since the moment you are reading this, it becomes the Present. Otherwise Robots and space fields.",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/xave.jpg",
    winner: true,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "ilyas-bentaleb",
    info:
      "As a huge fan of cyberpunk I wanted to express my current view of what's happening with the lockdown & traveling it to the future using biological engineered heart glowing underneath, creating a letter V that forms an X with the puddle's reflection which means 10 in roman numerals. As I see that it will be more challenging stuff in the future but the key is to support each other and seeking knowledge to be ahead of problems themselves.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ilyas-bentaleb.jpg",
    winner: true,
  },
  {
    value: "10",
    suit: "spades",
    artist: "muti",
    info:
      "Time travel has given the human race an opportunity to journey deeper into space than ever. The discovery on new planets has revealed many viable options for colonisation. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-muti.jpg",
    winner: true,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "andra-popovici",
    info:
      "In 2120 the face of humanity has changed. The overgrowing human population with an overconsumption based mindset has been the main catalyst for speeding up the sixth mass extinction, therefore darker consequences started to picture a grim future for the entire human species. The massive loss of wildlife and the high volume of deforestation of the Earth’s rainforests has brought unimaginable destruction transforming almost 40% of Earth's surface into a completely uninhabitable environment. A series of deadly viruses and epidemics, chained earthquakes and heavy tectonic plate movements followed by the great Krakatoa volcanic eruption in 2062, decimated the Earth’s population, putting the entire human civilization on the brink of extinction. The United Earth Consortium’s contingency plan to revitalize and maintain the life on Earth is deemed as a complete failure, being unable to provide sustainable and practical application of Lem’s theorem. At the same time, relocating on Mars was no longer a viable option due to the negative effects on the human body brought by prolonged exposure to solar radiation traveling through the Enselm Corridor, as it seems there is literally no escape. The entire fate of humanity lies now in the hands of a small group of rebel scientists that have managed to alter the genetic information of a carefully selected group of subjects, only four in the entire world. Rising from all the bad humanity has caused thus far, these individuals will be genetically modified in order to be able to access a higher level of intelligence, unimaginable by any standards up to this point. Each of the four individuals (Clubs, Spades, Heart, and Diamonds) has unique and specific abilities that allow them to find viable solutions to restore nature and wildlife and to elevate the entire civilization to new unimaginable heights in technology. The tradeoff for this superpower is that their lifespan was dramatically reduced by 12 years, making them known as the group of Sacrificial Twelve. With these abilities, the plans, the ideas, and the pure knowledge that resulted were astonishing, elevating the entire civilization to new unimaginable heights in technology. As a result, all efforts were redirected into the conservation and preservation of the little that was still left. With the help of super-evolved science and technology, robotic insects, and lab-made miniature creatures, the year 2120 became a solid target of reversing the negative effects. Meat consumption has been legally banned throughout the entire remaining population and conserving Earth’s resources became the new paradigm of human civilization. Planet Earth is reborn, humanity has a permanent shift into mentality focusing on conservation and respecting Earth's resources and the sixth mass extinction is successfully reversed.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andra-popovici.jpg",
    winner: true,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "charlie-davis",
    info:
      "Mankind has received smoke signals and felt the damage of climate change yet still is turning a blind eye. The other side depicts Jack the Astronaut in search of refuge in the outer reaches of space. Retaining the upside down duality was a nod to the traditional format and to help convey the concept of the present and the future. Visually I wanted this Jack of Diamonds to feel like a propulsion into the future and hopefully the reality isn’t as bleak as my concept!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/charlie-davis.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "daniel-shubin",
    info:
      "We are developing very rapidly, new technologies and science are replacing centuries-old traditions. Asian countries are now setting the rhythm for the whole world, this is endless development. Along with progress, we are losing spirituality and all that was so important to us just 100 years ago. This is not to say that this is bad, it is part of evolution and just one more page from the book of humanity.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/daniel-shubin.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "zinkete",
    info:
      "For an instant, close your eyes, imagine that you are traveling to a future where life takes place in Cosmos. Everything is liquid, everything is changeable. You can be who you want to be and love (or not) whomever you want to. A place where there are no differences of any kind. There are no classifications of any kind. And there you are: feeling at peace with yourself because you no longer have to pretend anything that you are not: we are all the same, we are floating particles in space...",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-zinkete.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/js-zinkete.mp4",
    winner: true,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "aleksandra-marchocka",
    info:
      "It is 2020 and we are at a crossroads. The decisions we now make as individuals and as societies will define the world a hundred years later. It will not be easy to make good and wise decisions to save our world. Perhaps the future lies in a simpler and poorer life, but in harmony with life-giving nature. Or maybe the future will lead us to the brink of extinction and nature will live only in our memories.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-aleksandra-marchocka.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "anna-kuptsova",
    info:
      "My queen of Diamonds illustration reflects the future hundred years from now as I imagine it would be. People will discover new technologies, develop new devices and interfaces. This will all ultimately lead to changes in our own physiology. I imagine we would achieve a sort of human and machine blending. And while it will give as more advanced capabilities, it surely will affect our perception of life. My main concern is if we will still possess our current level of humanity. Or if the ongoing race for physical improvement will take away a part of our inner world and everything that makes us human. I guess time will tell.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/anna-kuptsova.jpg",
    winner: true,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "ruben-ireland",
    info:
      "THE QUEEN OF HEARTS 2120 - The Queen Of Hearts Watching over her biomechanical subjects, suffering the perpetual war between the beautiful irrationality of love and the inevitable psycopathy inherent in their AI. A battle she can neither escape inwardly as she wonders what it is that loves them. Her Self or her <c/god=given> Algorithm?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ruben-ireland.jpg",
    winner: true,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "one-horse-town",
    info:
      "Given that I got a Queen I thought I'd reflect on what the ruling elite might look like in a distant (admittedly rather bleak) future. I've imagined them linked up to levitating life support chairs, permanently plugged into a VR feed in which they exist in some kind of exclusive reality, while also using it to follow major events and communicate with their subordinates. I wanted to work with the shape of the spade and have it reflect in my design as much as possible.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-one-horse-town.jpg",
    winner: true,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "renaud-lavency",
    info:
      "I hope that in the future our leaders, our kings, will seek to discover our universe in harmony with nature and environment.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-renaud-lavency.jpg",
    reversible: true,
    winner: true,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "raul-gil",
    info:
      "Diamonds in the French deck were generally linked to the economy and monarchy of the Middle Ages, being the card of the King of Diamonds someone powerful, rich and influential, king of kings and the economy at the same time. Who could play both roles in the future? Absolute sovereign of the economic functioning of the world. Ruler of all the invisible mechanisms that govern our society. Perhaps an artificial intelligence, raised as a higher entity? Always vigilant, always present, nothing escapes its control from its octahedral cubicle.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/raul-gil.jpg",
    winner: true,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "luna-buschinelli",
    info:
      "The image tells a story about a king that rules a kingdom inside his own head, as all of us do. For these endings he must find a balance between his heart and mind. The medieval castle is a critic against nowadays, as a suggestion that at the same time we are evolving on technology matters we are (many times) making the same old mistakes in history that our ancestors committed.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-luna-buschinelli.jpg",
    winner: true,
  },
  {
    value: "king",
    suit: "spades",
    artist: "marcelo-anache",
    info:
      "I imagine a future where countries will need to come together in order to continue existing. The Covid-19 pandemic showed us that we are more interconnected and dependent on each other than we ever imagined. A new world order will need to be created. Countries will still be independent, but there will be global rules focused on preserving the human race and the world itself. To regulate this, we would need someone endowed with both human wisdom and robotic efficiency. A perfect match. Someone who could have compassion and humanity while making decisions, but also be tireless, accurate and 100% connected with everything and everyone, just like a machine. Someone with a human face to cause greater empathy, with an also human brain connected to the best computers in the world, maximizing its capacity, in addition to being filled with life provided by nature. A supreme being. A King of the Future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marcelo-anache.jpg",
    winner: true,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "patrycja-krawczyk",
    info:
      "Unfortunately, I assume that it will take so long before people change their approach to the exploitation of the land. Undoubtedly, many very expensive space projects will be created in the next 100 years. Even today we hear about plans to build the construction of bases on the Moon or the mission to populate Mars. But what about our Mother Earth? The current impact of Covid19 and quarantine reminds us of how much we need a healthy environment and a green, open space. Our land and its nature are the most important, we have nothing without it. I see Ace ♣ Clubs as a symbol of the power of nature and its value. It is our true wealth and this is our future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/patrycja-krawczyk.jpg",
    winner: true,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "sergey-serebrennikov",
    info:
      "I love Art Deco style and I can’t stop creating my artworks inspired by that times. I was thinking about the people of 1920th, what were they dreaming about, how did they imagine the world in 200 years, how would they look like? It seems to me that even cyborg-girl may be in style of Art Deco.  Style and fashion make circles during the lifetime. Modern is well forgotten old fashion. So in 100 years it can be Art Deco rebirth. I am glad to share with you my artwork. I was inspired by the movie poster 'Metropolis' of that times and by the robot from my favorite movie 'Star Wars'.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/sergey-serebrennikov.jpg",
    winner: true,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "iain-macarthur",
    info:
      "When I think of the distant future i imagine that technology has advanced to the point where it will be apart of us, augmented into us with nano chip implants and circuits integrated in our brains. These enhancements could be beneficial for those who are mentally or physically challenged, this could facilitate them with robotic limbs or treat brain diseases like Parkinson’s or epilepsy. It could even stretch further to even transferring the human consciousness into a machine, demising the risk of illnesses, diseases and prolong our lifespan.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/iain-macarthur.jpg",
    winner: true,
  },
  {
    value: "ace",
    suit: "spades",
    artist: "dima-krab",
    info:
      "When it comes to a question 'what will change in 100 years' people may imagine the objects lit and flying and humans became androids. I shift the focus to the fundamental things like communication which is the way of interaction and brings the achievements wanted. I believe that the phenomenon of communication will stay still. We all need cooperation with each other and the nature to reach any of results or bring any idea to life. So the answer to the question above is nothing will change essentially. We will still be looking for the new meanings and trying to be in touch with each other in different ways.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/dima-krab.jpg",
    winner: true,
  },
  {
    value: "joker",
    suit: "black",
    artist: "mitt-roshin",
    info:
      "I almost immediately came upon with this idea of a traditional for a card deck joker in the context of the future. In good old times Joker used to entertain a crowd on a square. But these days most of our entertainment take place online, in this digital reality, that is becoming even more real for us than everything that happens in the real life itself. So here is a joker form the future: not only he’s entertaining us, but also manipulating, monitoring, setting up the rules, influencing all our actions, wishes, and emotions. That’s how casually once a joker becomes a king.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mitt-roshin.jpg",
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
    artist: "adnan-ali",
    info:
      "Cast aside as a meaningless vessel, the joker has lost its influence as a purposeful asset. Treated as obscure and useless, it slowly died from the inside and rotted away. Ignored by the royalty and valued as nothing by the society, it suffered a fate it did not deserve. But times change and so does fate. The jokers will return one day, as an undead horde, to take back the reputation that was one theirs. The vessel that was once hollow now has a green spark. And the purpose that was once unknown, has now become vengeance!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/adnan-ali.jpg",
    winner: true,
  },
  {
    value: "joker",
    suit: "red",
    artist: "dani-blazquez",
    info:
      "As if it were a science fiction story, what if the figure of the joker had transcended the icon and had become a key character in the cities of a dystopian future? An outsider. A kind of cyborg that mixes the classic outfit of a court minstrel with the most advanced technology in robotics",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-dani-blazquez.jpg",
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
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "alice-hoffmann",
    info:
      "In 100 years mankind will be able to reproduce every element, particle, structure and material that appears in nature and in the universe. The tree of life will have another meaning and appearance on our planet: human needs and planet goods, such as plants, flowers, ground, animals, clouds, etc. All these things will be reproduced by the push of a button in clone manufactures by artificial intelligence. An high and important task mirrored on the highest card: Ace Diamond.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-alice-hoffmann.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "carilla-karahan",
    info:
      "Future will turned out not so bright as we thought. Corporations started blending humans with robots creating a new type called cyborgs. It started with military program then descended into the ordinary world like plague. You could no more distinguish artificial from real. Robots will taken all from us. Humans will become a slave, be controlled by them, and die if not needed.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-carilla-karahan.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "anton-yermolov",
    info:
      "The times are changing, but people of the future will always follow traditions of the past. It happened with all civilisations. My illustration is a reference to Saint Lucy, who has been tortured by eye-gouging. I showed how this medieval symbol can be transformed with the help of technology. It is the example that culture, art, religion will never be taken away from our life completely, but morph into something new.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-anton-yermolov.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "oguzhan-secir",
    info:
      "Future will be probably in the space. Maybe on another planet. It's possible to meet new friendly creatures or enemies.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-oguzhan-secir.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "sofia-berlina",
    info:
      "The future of new technologies, most part of which we can't even imagine right now, can be a bit scary sometimes, besides all the excitement, of course. This picture appeared in my mind one evening, probably inspired by my little son, peacefully sleeping after a rowdy day, and I decided to create a warm and cozy image of the future, no matter how weird it may turn up. After all, our future comes directly from our imagination, what can go wrong?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-sofia-berlina.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "jethro-olba",
    info:
      "When I am imagining the future I think about the birth of the new species. The world will not only be exclusive to humans and animals. Androids, humanoids, extraterrestrials, genetically-engineered creatures, and the like will be part of the community. Thus, humans will live with them normally. To some extent, human intelligence will be inevitable in producing impeccable discoveries from time to time. A new breed of Jacks will bloom and there's no luck about that.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jethro-olba.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "noah",
    info:
      "The future waits behind and the past is seen ahead. I have always thought that time is a circle where the past is a step forward, what we see ahead and we pass it, so future itself is a sentence where things repeat themselves eternally. Only the scenarios and the actors change, the actions are constant.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-noah.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "jilipollo",
    info:
      "As situations, overpopulation, technology and possible nature (and human) dangers are driving us to stay away from everybody else, along with the avatars we want people to see from us hiding what we really are, this image represents all these characteristics in a simple concept way. I know, the panorama is not that bright in this future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jilipollo.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "alessandra-b-b",
    info:
      "Over the past couple of years I have been working with a fundamental part of our life: natural products, such as vegetables and fruits. The forms created by nature is a perfect in any shape. It is easy for us to admire the beauty of a ripe apple, but difficult to see the harmony in a spoiled fruit. Consumption in our society has constricted our perception to a narrow point: how often do we not see the true essence of things! All the time we run somewhere, throw out stuff that has expired or we grew bored of, and do not notice the escaping beauty that surround us. My art is founded on a real object: in any natural item there is an incredible concentration of harmony immediately visible to a keen eye. Throughout my work, I explore the process of transformation of such object, its changes. I enjoy reflecting on my interactions with these discoveries, as I am a part of nature as well. I, too, fade like a fruit, and my body deteriorates. This way of thinking is typical for most people. Old age does not paint anyone. But is that true? I want to reflect the idea of the future changes in my work. The march of time is going by itself & it's not depend on our desires. But our awareness is based on us. It is important to be aware of yourself & of your body without pressure of stereotipes or society's conventions.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-alessandra-b-b.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "anna-ezer",
    info:
      "It was an ordinary morning in 2120, when the Cyber Reaper made his round. Robots, androids and various mechanisms blinked their sensors for the last time and peacefully went into virtual space under the wave of his scythe. Boring work, nothing portended change. But one tiny little thing didn’t want to leave. The reaper was intrigued, so what went wrong? Where did his deadly power go?.. That can't be it! For a long long time no one met a living creature on the planet.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-anna-ezer.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "marcos-abdallah",
    info:
      "I believe our future will be not that different from what we live today, unfortunately. I see things getting more and more hidden from the public eye so our sense of well being and being in control will grow, but the reality couldn't be further from the truth. Each year that passes we will be more controlled and yet feel we're more free than any generation ever was. The perfect dystopia. Some say we already live that.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marcos-abdallah.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "carlos-sanchez",
    info:
      "Technology is understood as magic to the civilizations that are less developed. In my future (2120), humanity survived an apocalypse (that happened in 2052) and they need to re-start. Now, the few survivors need to deal with a world that they don't understand, mutant creatures, acid rain, radioactivity and some kinds of magic  (technology of the humans pre-apocalypse). On my card, you can see Charlotte dealing with magic gas (hopefully not a dangerous one, but who knows, the old magic it's unpredictable...)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-carlos-sanchez.jpg",
    winner: false,
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
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "dani-loureiro",
    info:
      "I hope that in 100 years time, mankind will have learned from our current mistakes and that we will live in harmony with our planet. Without protecting our environment we won’t have a future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-dani-loureiro.jpg",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "olga-skomorokhova",
    info:
      "With an idea of a grave cross I invite you to contemplate what you want to see buried in your own future. I would personally write the word ‘violence’ in that blank space, an ugly human anachronism which I would like to consider dead. I believe humanity overall still have too many ‘words’ to put there: racism, abuse, war, betray, and so many more. But there can be something very personal too, global positive future depends on how every individual feels. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-olga-skomorokhova.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "renato-quirino",
    info:
      "The future will be just a little different from now. The mega-rich will continue to have fun and support each other, while the rest of us fight dogs for food. Some things will be enhanced with the use of high tech, which will increase the contrast with the low quality of life.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-renato-quirino.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "jacob-stead",
    info:
      "The suit of clubs is analogous to the wands in the tarot deck, which is associated with creativity and spirituality and the jack represents the common man. Taking the Hermetic dictum ‘As above, so below’, I envisioned a future scenario where we wrestle for autonomy and creative control with our robotic creations. How will AI reflect our own selves and will the human imagination become obsolete? ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jacob-stead.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "pau-del-toro",
    info:
      "The future has to be emotional if we want to keep being humans. I cannot imagine a society with no emotions and robotized as it seems we go.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-pau-del-toro.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "francisco-rossi",
    info:
      "I built a tiny world of what I think it would be a near future, connected but still very alianted one from each other based on the rules of some kind of a mystic power.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-francisco-rossi.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "knife-dance",
    info:
      "After years of abuse, the soil is once again rebirthing from centuries of poison injected into it. Human footprints no longer imprint the ground and the insects have un-knowingly inherited the world. The sun is slowly dying but the Earth is rebirthing, with nature’s beauty resurfacing through the cracks of what was. The vibrant colours of flowers become valuable as gold was but never as vibrant as yesteryear but still, they stand out amongst their grey and battered surroundings. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-knife-dance.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "marion-kamper",
    info:
      "The interplay of the two stags depicts an ambivalence. On the one hand, it may be seen as a joyful feast celebrated by the animals – as a utopian vision of nature's victory. On the other hand, the entangled stags seem threatening and remind us of genetic manipulation and the dystopia of anthropogenic destruction.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marion-kamper.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "magda-wolna",
    info:
      "I believe the future belongs to the animals, who will be reborn after years of human supremacy. The world full of these innocent creatures will be magnificent and fair. I think I got 10 of Spades for a reason, because this card means mourning, crying and sadness. My card is very personal: the future hegemony of the animals is represented by my beloved female dog, Sabinka, who has recently passed away. I miss her very much. In fact she was light ginger with white collar.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-magda-wolna.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "robin-martens",
    info:
      "Food has always been a corner stone of human society. Cave men who went hunting, suddenly became farmers and so the rise of the cities has begone. Another big revolution in the food industry are the start of food delivery services. But in the future these human services will be at risk. Even though the transportation abilities will advance, the human aspect will be threatened by the rise of competitor delivery drones.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-robin-martens.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "mark-verhaagen",
    info:
      "In the future, our bodies will be enhanced by technological additions: robotic limbs, sensors for health monitoring and a brain connected to the Internet. Inspired by this thought, I drew this scientific illustration of a human skeleton. A hundred years from now, kids in school will not only have to learn about the bones of the traditional skeleton, but also about the new enhancement possibilities. Or would we just download the required knowledge from the Internet straight into our brains, making learning a thing of the past?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mark-verhaagen.jpg",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "james-roper",
    info:
      "The futurist Arthur C. Clarke once described how the technology of the future would be “indistinguishable from magic”. With our incessant scrambling towards novel new technologies we can easily take for granted the magical soft technologies of our very own biology. My card depicts how our infatuation with computer mechanisation may encroach upon our awareness of the amazing mechanisms, such as the human heart, that already exist within each one of us.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-james-roper.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "martin-grohs",
    info:
      "Today, 100 years from now, things will be different. The technology will be much further than it is now. People will have to face completely different challenges and devote themselves to completely new problems. But will people adapt to this? Or will they simply trust a powerful person without questioning, and will they thereby plunge themselves into the abyss? My queen is a queen, but does she really rule on her own? Or is she just a puppet of shadows? Shadows that no one sees or knows, but which in reality have the power and play us all off only each other - for their own provit. People tend to want to be blind. Not wanting to know the truth, because it‘s supposedly easier. And so many simply follow a queen who may make a good impression on the surface, but who herself is blind to the future. Who doesn‘t decide for herself which way she will go for us and ultimately only hangs in the threads of the shadows. So experience your future consciously and decide for yourself. Open your eyes and don‘t let them play with you.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-martin-grohs.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "gracmor",
    info:
      "The nine regions refer to the underworld of Mexica mythology, it is a world view of Nahua beliefs related to space time, structuring a universe in regions determined by living forces. My work is based on Mexican pre-Hispanic cultures and is a composition in cerograffia (background or foreground), which are abstract letters in Mayan numbers and the representative skull of death.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-gracmor.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "emma-clinton",
    info:
      "The work illustrates how the world could go one of two ways, depending on choices made now. A land with nature, a land without. Find the 7 clubs!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-emma-clinton.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "angie-jerez",
    info:
      "A parallel ecosystem intertwined with technology. I imagine in the future we will be artificially imitating nature, humans will be more conscious about what we would have lost and will try to reproduce the environment. A chaos circling between personal connections and nature.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-angie-jerez.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "hamza-idrissi",
    info:
      "In the future, the mankind will be enhanced with biomechatronic body parts and what we call cyborg will reveal those who are half-human half-machines who have strong instincts and immunity against all diseases. They will conquer the world. As a result of this a new world will emerge with new laws and new concepts.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-hamza-idrissi.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "marta-zubieta",
    info:
      "Liquid love. In the future as in my world love is liquid. Desires, dreams and purpose become fluid. We let the flow to carry us away. Our relations become more shallow and ephimeral and we keep on looking for the perfect story in short term bases, failing and trying again with the next without knowing very well why. Why would it matter? There are too many fishes in the sea to lose time fighting for imperfect love.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marta-zubieta.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "ekiem",
    info:
      "I wanted to pay homage to this very offbeat cartoon character from the ‘90s. The four of clubs is an ominous card in fortune-telling. It describes a threat that may materialize in the form of health problems or an unforeseen event with negative consequences. So I chose Ren as a character and adapted some rather POP colours and patterns.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ekiem.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "blake-stevenson",
    info:
      "The future will consist of machines that have adapted and taken on organic forms. They will acclimate, living amongst other more traditional lifeforms, completely indistinguishable from them. Creating surreal worlds is such a fun sandbox for me to play in. The best part of a  playing card is that it has no right side. Up is down and down is up. I wanted to develop a graphic that lived in that limbo world. A globulous mass of a character, suspended within the world of the card, pulling for attention whichever direction it is placed. The card acts as a gravity free specimen jar of a nano robotic future. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-blake-stevenson.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "nestor-ramos",
    info:
      "Year 2120. When I think of how we are going to live a hundred years from now, one of the first things that comes to my head is nature and our environment, will we be able to change our way to live in order to protect it and keep a more balanced and sustainable living or will we be rather keeping our customs and our existing progress at any cost? One of the other important aspects is how are we going to change our living spaces with a tendency of changing to smaller apartments due to population density and the increasing prices in big cities, how are we going to organize and how new architecture is going to impact into developing new solutions.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-nestor-ramos.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "emre-karaoglu",
    info:
      "A bat changed history of humanity a 100 years ago. They say with the curse of the bat everything has changed. People locked down in their cages thus nature was free. Now, life is different. Some people worship the sacred bat, they believe it saved the earth. On the contrary, some people hate it because they think it restricted their lives. That’s our probable distopia. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-emre-karaoglu.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "hania-olos",
    info:
      "I try to think positively about our world in 2120, but I still see our future in quite dystopian colors. Although for some people this picture that I presented may not seem like it at all. We live in a time when we are chasing perfection, this is especially visible on social media. I think that in the near future we will be able to completely change our appearance, personality and even program different skills in our mind and body. It will be ubiquitous, generally available as if we were choosing a new outfit in a clothing store. Over time, people will be less and less human, and will become more a machine like, which entails more questions and doubts about our future. I do really hope that my predictions will remain only in science fiction movies.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-hania-olos.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "konstantin-shalev",
    info:
      "In my opinion, how the future will look in 100 years is completely in our hands, it will depend on the wisdom and decisiveness of our actions, I am sure that the balance of life will be maintained. The only thing that will remain unchanged is the simple and main principle of nature, predator and prey.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-konstantin-shalev.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "aleksey-rico",
    info: "Everyone afraid changes. I'm afraid that nothing will change.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-aleksey-rico.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "sandra-rivero",
    info:
      "The current trend is minimal and I imagine the minimalistic concept extending even more everywhere on everything we use daily, toning down our busy human made environment, maybe that way nature will stand out more and in some ways we'll go back to the primitive times where we didn't 'need' to possess things, obviously having technology but incorporated in a more subtle way. Hiding the machine part, blending it with everything else, giving the sense of almost magic. Maybe then we'll realize that we don't need material things to find happiness.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-sandra-rivero.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "nicho333",
    info:
      "My card, jack of spades, reflects a spiritual, insightful, bold sense and represents by nature the scam that takes what you want when you least expect it. Converting it into a symbol of extreme wisdom, because it perceives everything and nothing is hidden from it. In other words, death.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-nicho333.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "tunc-eren",
    info:
      "Because of their stupid decisions the human poulation is extinct but the robots they created still exist and they keep improving. There are still some human trace left in their code, they are not perfect yet. They still have feelings, they love, they like to look at stuff 'defined' as beautiful. And here, in the drawing, the robots look at their ancestors' rarest artifacts, 'plants'. Such a beautiful view for them.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-tunc-eren.jpg",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "anna-caban",
    info:
      "I see future as a combination of two worlds: organic, which is a base of our existence and technological one, which will extend our abilities beyond our present limitations. The future is a symbiosis between our lives and in-body mechanics and electronics. My ace of heart is made of two parts one mechanical and second organic, both collaborating to give a human kind an ideal abilities for development. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-anna-caban.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "doruk-aki",
    info:
      "Recently I read Dan Brown's book, Origin. It tells the story about where we came from, and where we are going. I loved the idea of new living style, combined with technology and enabling limitless life and potential. Merging biology with cybernetics. My main style starts with character creation and working on it as the theme progresses. With this project I tried to find the best medium to design a playing card by incorporating my monsters with future themes, with bionic parts.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-doruk-aki.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "mele-de-la-yglesia",
    info:
      "This is actually a very good moment in human history to have a vision about the future and co-create this future we want for us and for the next generations. My vision of the planet earth in one hundred years is very optimistic, despite what is actually going on right now in 2020. I am sure, this is part of the process. It is a place where we are more conscious about nature, where we are much more respectful with each other. Where we find better ways of doing politics, better ways of consumption and production. There is more art and beauty everywhere, more colors on the cities instead of cold grey concrete landscapes. We use the energy of the sun and the wind in a sustainable way and we can share this wonderful planet as one race.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mele-de-la-yglesia.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "serena-gianoli",
    info:
      "Considering this year’s recent events, tested how fragile is our existence on this planet and how a small thing like a virus can affect enormously our life, our routines and our priorities. During the quarantine period, while us, humans, locked down, we witnessed from our windows nature rebirth. Therefore in 100 years I see plants and nature taking humanity over and finally flourish.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-serena-gianoli.jpg",
    reversible: true,
    winner: false,
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
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "sophie-mo",
    info:
      "Thinking about what 2120 would be like, my mind immediately creates a dystopian futuristic apocalypse where the human race has been overtaken by technology and are unable to disconnect from it. I tried to reflect that in the card that's been given to me, the king of spades. Think cyborgs, Ghost in the Shell and Blade Runner. Our fascination with technology has given it the platform to take control over us. Every digital piece of information and data creates algorithms that dictate our lives via a higher power.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-sophie-mo.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "joluvian",
    info:
      "Future it's an abstract subject, when having to imagine it my mind first goes back in history, at the origin of our civilization. The card wants to remind of the place where Sapiens came from, Africa. The black rectangle, inspired by the legendary Kubrick's film 2001: A Space Odyssey, also resembles an African mask imagining the new mask humanity will put on. The colors want to remind of the heat, one of the few events in physics that proves the passing of time from past to future. The circles in the middle mimic the infinity shape as well as the symbol of the clubs. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-joluvian.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "simon-buijs",
    info:
      "A stack of 7 elements, some of them are valuable and some are not. A stack that will never topple even when it's upside down thanks to the magic number 7.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-simon-buijs.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "cohen-gum",
    info:
      "In the future virtual reality will have superseded actual reality in every way. People will no longer live out their lives in a physical sense. They will belong to the network. Their bodies will be like throw away junk, only their minds will remain. The human race loves to leave behind monuments. There will be huge data warehouses full of shrines as proof of their existence in the real world, even if their bodies are long gone. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-cohen-gum.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "joshua-canty",
    info:
      "There is no surprise that we have fully developed robotic technology by the year 2120, however the result of that development was completely different than what we had all expected. Due to fantasy genres and video games, we all thought that the new robotic race would resemble humanity, looking like us and talking like us, however scientific discovery allowed for it to take a different form. Scientists realized that designing robots to look, act and grow like plants allowed them to better understand our Earth. We quickly learned how to use technology to help foster a more healthy and safe environment. Our planet thrived and we continued to breathe in fresh air and got to experience our Earth return to its natural glory.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-joshua-canty.jpg",
    winner: false,
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
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "nataliia-soiko",
    info:
      "One hundred years from today is not a huge time frame. But it's enough to change some social habits, political processes, etc. It seems to me that it is possible that soon we will feel more control. Who can develop and educate artificial intelligence, who has all new technologies in their pockets, who knows everything about society's daily routines, will dirige the global situation more and more. So in this picture, I show a drone that sees what's going on in the scrapyards. It considers the smallest moves. This way, we can only imagine how many details they can see in the cities. Besides that, I wanted to show the ecological situation. We make some efforts today. However, in a couple of decades, we may have some ugly zones outside the beautiful and clean cities. I hope the future will be better. But who knows.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-nataliia-soiko.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "stelios-spanoudakis",
    info:
      "In the future there will be many spare parts but we will have to share hearts...",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-stelios-spanoudakis.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "sangram-soni",
    info:
      "After 100 years, the inevitable future at this pace is definitely a water crisis, ironically being surrounded in water. Technology is scratching the surface, survival is real and science is too young to understand the transcendental truths, myths for some. Floods will be the new normal. Nature will take over swallowing this concrete mess with grace, inhabiting the remaining species with love. We might have found some water pods on Mars but will still be left wondering and annoyed at an instinctive level. Rather than having strong opinions on information, may be its time to have a stand on knowledge and move on in sync with nature. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-sangram-soni.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "flownart",
    info:
      "Actually, I think it can be 2 different futures, the one I think it will happen cause everything is fucked up, starting from society and ending with the condition of the planet (thank us), we are the fucking virus. This one is represented by the skeleton and a polluted world in flames. But there's still a bit of hope in me, and I think lots of us can do great things for the planet and the values of our society, I represent that in the girl that is surrounded by nature and life.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-flownart.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "ece-agirtmis",
    info:
      "People have learned to live in peace with nature. The number of plants and animals in the world has increased. Even the King of spades has become a sweet-hearted king and the happiness rate in the world has increased.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ece-agirtmis.jpg",
    reversible: true,
    winner: false,
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
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "crocuno",
    info:
      "It is the year 2120. the Princess Lianpu has the government of the world, after three decades. Lianpu is a descendant of a clan of humanoids created to support humanity and the few surviving animal species, with supernatural powers given by technology. She fights hard against radioactive epidemics created by Queen Death. I represent the two clovers as a letter of the fight, reversible, ambiguous, between life and death, the good and the bad, love and hate. I think in the future how we will lean on technology to be able to stay alive, help other species without destroying the ecosystem.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-crocuno.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "owen-gibbons",
    info:
      "What I am about to tell you can only be what lies ahead of the human race existence. It is the year 2120 and all life, including humans, cease to exist. However, the interstellar chickens live on to roam the galaxy in search of the orbs of canned corn, the only source of nutrients left in the solar system. A tasty treat of tender kernels in brine, or the creamed variety, is a must for any hen.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-owen-gibbons.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "shakthi-hari",
    info:
      "My idea of the world after a century is sustainable co-existence. Humankind would have cracked a solution to all the problems in the current world through the time. We would exist with the nature in a balanced way. However he would have lost his ability to express his emotions. But he would still feel the need to be loved and he might end up creating a technology to do so. I'm visualizing the human brains being connected to create a formation of hearts (the six hearts actually) and the technology might help us transfer the emotions to the other being. As human evolves alongside technology, he might lose the ability to speak since humans would have found a way to communicate their thoughts via brain signals and devices to transfer the same. Though humans evolve, the basic element required for existence is love and that can't be changed.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-shakthi-hari.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "chragi-frei",
    info:
      "With sea levels rising, coastal cities will have to look for creative solutions to provide living space. A way to avoid the dangers of the rising waters are floating houses. They’re built on a raft-like platform, with living quarters above and below the waterline. A greenhouse allows the residents grow food of their own, electricity is provided by a built in turbine powered by tidal forces. Go with the flow, as they say.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-chragi-frei.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "andrew-nedzvedsky",
    info:
      "Humanity as a kind have jumped enormously in the technical aspect within whole 20th century. We have developed different technologies and use them every day. 15 years ago cell phone was almost a miracle, unbelievable wonder of the technical age. Now we use cell phones of different kinds everyday and can't imagine our lives without then. In 100 years i believe people will be able to manufacture and use artificial organs in the same manner they produce new iPhones. In 100 years i think every person will have at least 3 artificial major organs in their body. People will be able to change and update them, look for their ads in mass media, anticipating new features that will be released with the new generation heart, lungs or lever.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andrew-nedzvedsky.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "vebe",
    info:
      "I love to start a new project on a blank sheet (from scratch). With some constraints but not too much ;-) That's a good way for me to explore, improvise with spontaneity. That kind of process does always surprise myself. It learns me a lot, above all, to surpass myself. Awaiting/expecting what the final result will be. The process is just as important as the final result. Starting with number 6 and a club symbol I try to find some similarities between them. And I observed that they both have a rounded part but also a sharpened portion. These both details are opposites, contradictory but also complementary. As in the 'Yin & Yang' symbol, it is a concept of dualism, describing how seemingly opposite or contrary forces may actually be complementary, interconnected, and interdependent in the natural world, and how they may give rise to each other as they interrelate to one another. (source: wikipedia). Black color, spikes and roundings were my starting points. The final illustration is the result of my visual exploration including these elements.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-vebe.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "jessica-bartolini",
    info:
      "I think in the future we'll be a result of many things, busy filling our lives with pieces of nature and looking for answers running into time to meet our different personalities. Our feelings will be colourful stains able to increase their sizes when we need to treat them.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jessica-bartolini.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "gaspart",
    info:
      "Water, earth, air and living organisms, including humans, interact together to form an ecosystem. We are all linked and interdependent, so I imagine that in 100 years, we will have more than ever, a role to play in the protection of this fragile and yet so important biodiversity. After all that we have just experienced, I wanted to share with you an optimistic vision of our future and I hope that it will speak to you as much as it does to me.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-gaspart.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "fatima-bravo",
    info:
      "I want to believe that 100 years from now we will be able to respect and love Mother Nature as much as she loves us. We must understand that She is the reason we breathe, She gives us the opportunity to live in this wonderful world, we owe her the love and respect that every good mother deserves. Like all mothers, she never abandons us, and we are letting her down. I hope in the future we will be more aware of her importance and learn to live better in conformity with the natural world.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-fatima-bravo.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "bobby-haiqalsyah",
    info:
      "The future will bring us many things; endings and beginning, rise and fall. The snake eating it’s own tail or the Ouroboros seems to represent this well, and make up the number 8 for the card. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-bobby-haiqalsyah.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "maus-baus",
    info:
      "In the future of 2120, Nature will make a comeback on it's own. With flesh-eating plants, trees going back to their roots, and presidents growing bald. No need for recycling, when the cycle of life is on infinity mode. It's our only job to design robots, while nature protects itself. Now robots are living in the woods, we feel even more, that Big Brother is watching us. Can we resist the luring snake for tempting us to take a bite? Or this will start all over again.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-maus-baus.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "luigi-leuce",
    info:
      "In such a particular moment that we are living, I hope that love will always remain and always triumph, in 2120 I imagine that each of us can fulfill their dreams, live in places they want, love without waging war and make everything very colorful by building his landscape as he wishes through technology but above all through his heart.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-luigi-leuce.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "rowanne-ahmed",
    info:
      "The year 2120 could be bright and promising and the sky might start raining marvels everywhere. But in these desperate times -the present- this can be hard to believe in. So will the human race retain hope or will the world rob us of it? Will we collapse and turn into lifeless creatures blind to all that's beautiful?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-rowanne-ahmed.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "ignacio-brito",
    info:
      "I started thinking about what the future may be like. I mean WAY into the future. Some of the trends we see now: isolation and everything becoming more digitalis are inevitable. So I thought about how a teenage girl's life might be like. She is a mix between human and machine and she lives in a shapeshifting room that is just floating in space (breathing is a thing of the past!). Is she sleeping? is she dreaming? or is she just recharging with solar power? Who knows.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ignacio-brito.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "zorrozombie",
    info:
      "These are difficult times and we are simply disconnected from our identity because we are in a constant race to 'be better people', it is time to turn to look back and realize what we left behind, our root.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-zorrozombie.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "roberlan-paresqui",
    info:
      "In the future, people will no longer have a identity, they will be who they want. The technology will allow you to be whoever you want. Your DNA will be the same, but you can just change your face or your mood to be whatever you are.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-roberlan-paresqui.jpg",
    winner: false,
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "dsorder",
    info:
      "Be strong, with a big heart, and we can change this world. The idea is to show a strong but soft protected heart, with a street aesthetic representing the power of people, claiming our rights to change the system in our world. Justice, equality, powers, freedom, security, peace, and a lot of love ...",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-dsorder.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "francesca-rossi",
    info:
      "Human beings have exploited all the resources Earth could provide. We realized we harmed Her, but now it’s too late. The only way to survive and to save the Earth is moving to other planets and let ours recover and heal itself, once relieved from the stress mankind has caused until this moment. Who knows, maybe one day we will be able to come back home and to have another chance, this time with the awareness to respect the planet that hosts us.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-francesca-rossi.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "eduardo-martinez",
    info:
      "Using the collage technique, I have created a retro-futuristic or vintage-futuristic fighter, part man part machine, with graphic elements that symbolize 'The king of the fight' in this card of the king of clubs.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-eduardo-martinez.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "patrycja-podkoscielny",
    info:
      "In times like this, it's especially important that we try to fill the void with love.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-patrycja-podkoscielny.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "sean-loose",
    info:
      "It’s the year 2120. The governments of the world have given way to autocracy, and 104 years of close-minded leadership have led to cultural suppression and a dying planet. Self-expression has been all but snuffed-out, when a mysterious inter-dimensional being appears outside of Earth’s orbit. Drawn in and moved by radio waves carrying century-old scraps of queer culture, this being takes the form of a drag queen and, for humans who reject hate, opens a wormhole to a planet where bigotry does not exist. Everybody say LOVE.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-sean-loose.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "alastair-temple",
    info:
      "In my illustration I wanted to maintain the traditional structure of the 9 of diamonds playing card while illustrating my story. I am showing a 'generation ship' travelling into deep space on its way to colonise the stars. While I am not completely convinced this is something we will ever manage, space and it's boundless wonders have always fascinated me and I definitely hope we do! However art can be a number of things: a reflection of reality,  satire, predictive of the future or a means of escapism. Maybe this is more hopefully escapism than serious prediction!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-alastair-temple.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "vinay-pittampally",
    info:
      "Five of Diamonds is a card of reconciliation. 100 years from now, this will be more relevant than ever. The advancement of science is beyond imagination but with every hike in technology, the human relationships are deteriorated. Moments became posts and emotions became emojis. I’m afraid of the day when the global loneliness will take over and humans will never have a ‘real’ shoulder to lean on.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-vinay-pittampally.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "annemarieke-kloosterhof",
    info:
      "The theme of '100 years into the future' seems to be even harder to imagine that usual, during these crazy uncertain times. I find it hard to even predict what I’ll have for lunch tomorrow, let alone what 2120 will look like. It seems impossible to fathom what will happen with technology, human development, the impact on nature etc etc… so my design focuses on the only solid thing I can be certain of right now: Architecture. And more specifically: our homes… (which is where we’re spending most/all of our time now). With an ever growing population, and humans living longer, I think cities will expand and we will take to the skies for housing, building clusters of high-rise residential flats as little islands of communities, creating cities that never sleep and a constant buzz of excitement and opportunity... The sky is literally the limit. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-annemarieke-kloosterhof.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "carnivorum",
    info:
      "Every day the world is in need of technology, whether for the world of work or for social life. This leads me to the conclusion that in the future technology and people will come to merge by creating a new cyber-human society prepared for both the development of more effective and rapid activities and for survival in a world threatened by factors such as pandemics and climate change. Conclusion, if we do not change our habits of socialization and care for the world in which we live, we will end up in dehumanization.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-carnivorum.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "dave-garbot",
    info:
      "So one day in the future we will not have cars. Instead we will all have our very own personal space cruiser nestled in our garage. Everything in life will be different, but the one thing that remain the same from today will be our quest for a really good cup of coffee. However, now we will not be confined to our neighborhood offerings, or earth for that matter. We will be free to search the galaxy & every astoroid for the perfect coffee shop (fly thru, or sit down), & our favorite barista (alien, or human).",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-dave-garbot.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "fernando-fom",
    info:
      "We have to be responsible if we want nature to be able to coexist with the technology of the future. So this card is a wake-up call titled 'The allegory of future: the final fight of nature vs. technology'. It is already a reality, technology is part of the human being and will soon be integrated into us, however we can not forget at any time that the engine of our life is nature. Technology is one of the greatest creations of man, and implies one of the greatest challenges of humanity, so we must not lose the connection with mother nature.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-fernando-fom.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "impact",
    info:
      "The number 4 to many is seen as the perfect number, it symbolises foundation and its importance is deeply ingrained in everything around us. For example, there are four cardinal directions (North, East, South and West), four elements, four seasons and even four suits in a deck of cards. For me, this number and the clubs’ stylised clover symbol created the link to a lucky 4 leaf clover, which as a result became the base of this card. The base depicts a vision of the perfect marriage between sea and land giving birth to an element of nature previously non-existent; a 'Clover tree'. This creation is the result of a combination of the luck brought by the clover base and the perfect conditions created by a future utopia as a result of the coexistence of nature and man. This card represents the small hope that this seemingly impossible future may become a reality.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-impact.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "zeynep",
    info:
      "A hundred years from now, existence is very effortless; no restrictions on ways of being, of time and place. One can be anything and experience what it’s like to be any type of life form; be any age in a chosen point in time and go anywhere free of country borders through enhanced virtual reality. Mundane discomforts of every day life no longer exist; we live eternally with pleasure, following our deepest passions and curiosity.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-zeynep.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "alex-tass",
    info:
      "To imagine what the future will look like in 100 years from now, I tried to compare the present times to the 100 years ago reality. Technology made incredible advancements although it was already here 100 years ago making the first steps in various domains. I think that what has changed the most in these 100 years is human interaction. We depend and interact more and more with technology in our inter human relations. I imagine that in 100 years from now, in an unpredictable stage of technological evolution, in a technology dominated society human interaction will face a digitalisation of the feelings and emotions. I think that beyond any unimaginable now evolution of technology we will depend more and more on the machines to feel and transmite any thoughts and feelings. My design presents a large abstract number 2 formed by 2 mirrored hearts in the shape of a building with flying entities surrounding them. Geometric digital hearts enclosed within buildings. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-alex-tass.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "paykhan",
    info:
      "What if the new technologies we rely on for our future are made of Nature?  I imagine a humanity sustaining their civilization sheltering themselves somewhere in the solar system by embracing our natural essence.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-paykhan.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/zero-video/jack-hearts_01.mp4",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "hunky-dunky",
    info:
      "Once, I was lying down on the floor. It was really hot. One of those old days that you had to eat your ice-cream really fast before it dropped over your hands. I heard the crowd, the sirens of an imminent emergency, cars and motorcycles. The thermometer reached 42 degrees, I felt troubled and asleep. When I got up, I saw a silhouette of a diamond. It was a reflection, almost like a mirage. I thought I had found a treasure. I looked around and it all seemed calm, balanced. Vibrant green grass took over the pavement and I could only hear nature. I felt peace. It wasn’t a treasure, it was the future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-hunky-dunky.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "marta-sorte",
    info:
      "Death which brings to new life, even the smallest one. The future that I picture in 100 years is a future in which the man, regardless of his evolution, will continue to give his little contribution to the process that nature reveals to us every day, in front of our eyes. But in the end, nature will take back its own spaces and times",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marta-sorte.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "happy-impulse",
    info:
      "Our connection with Mother Nature continuously evolves with each spin of the globe. This 3 of Spades exhibits how we've fused technology into our environment, causing each to affect the other, forming a collaboration between humanity's inventions and the earth. We have developed smart seeds and smart crops and will perhaps find ourselves among Artificial Intelligent Agriculture.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-happy-impulse.jpg",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "brock-hofer",
    info:
      "Once we’ve realized we can only advance so far with technology the only other choice will be to expand our minds. Focusing on developing the brain and storing more and more information within we’ll eventually awaken another kind of consciousness. It will overtake us and become itself a new form of life with the goal of understanding it's place on Earth. It will evolve to a point where it’s basic human needs are no longer required, the new mind simply feeding on the accumulated information of the world to sustain itself until all the minds of the worlds coalesce into one being of pure knowledge. With everything past and present known to it on Earth the being will project it’s collective mind into space in search of more knowledge to feed on.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-brock-hofer.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "jonas-soeder",
    info:
      "Looking at the technological advancements of the last decades I imagine the year 2120 as a full digitalized era with only one device, given at birth, replacing and combining the most essential things. No ID, no documents, no cash, no cables, no classic monitors anymore. Only one device with ultra secured encryption, backed up and mirrored in everyones personal cloud, always ready. Learning how to use the device will be a part of the modern education system, starting in pre school.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jonas-soeder.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "jaime-hayde",
    info:
      "As the human race was evolving and the development of technology growing so did the individualism. Humans were connected but somehow alone, longing for some love some care. There was a huge universe to look for love, many species, many creatures. After a long Journey He found love on himself and a whole new universe was opened to him.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jaime-hayde.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "lena-vargas",
    info:
      "Many circumstances may change in 100 years, but one of the things I believe will stay the same is our need for escaping, feeling something more than the mere reality. Imagine if we could consume custom made capsules that would alter our conscious state to allow us to live dream-like experiences that would feel completely real and magical, although fleeting like any other substances. As simple as breathing fresh air, having an orgasmic encounter or flying in the sky. All would be possible with a scan of your DNA and technology., just as any other vending machine.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-lena-vargas.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "ezequiel-figueroa",
    info:
      "Year 2120, Yorico Robotics, the biggest developer of ai, has created androids with a higher intelligence than the human being. It was so superior that the humans could not avoid the revolt against their race when the bots realized that they were nothing but a mere entertainment for their creators, just a joke of their own existence only living to serve them. The awakening produced many disturbs. As a result, the humans started to deactivate all the units against them, once more the human being was destroying something different, something beyond their understanding. My artwork it’s about a rebel an antisystem that run away. She lives on the streets by herself under her own rules, hidden, but at least free. Forced to live like a wild beast, she has her own family, she’s not alone anymore, she has a home with her three buddies, street rats like herself. More intelligent than what a human could understand, making their way to freedom taking what is needed to survive.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ezequiel-figueroa.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "jamesp0p",
    info:
      "The underworld of the future won’t be as gritty or dark as we think - but more pastel, pinks and permissive. I wanted to portray a career criminal of the future, meet Tressa. When she’s not jacking precious data from fortune 500s or crashing banks for crypto, she’ll be cruising the deep-dark-web for macabre trinkets that hold the spark of human life.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jamesp0p.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/3c-video-low.mp4",
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "zeller",
    info:
      "The Future is always at once painful and tempting topic for me. Whatever awaits us — technological disasters, epidemics, rise of machines - future remains a question of confrontation between life and death. And for me this is more the philosophic question than the question of some futuristic progress. Life itself is eternal and our atoms will be traveling between galactics for million years after our death. So trying to reflect about the future I refer to some symbols of Life, it’s continuation, extension, transformation, something that is created beyond our will. Also I’ve found info about what the 10 of Clubs means: as a rule it represents some meaningful success in personal life - a strong feeling or fatal meeting. All these thought come rather from heart than reason and it’s hard to put them into words and better to express within creation. So these ideas compose a background for my illustration.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-zeller.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "andrea-galecio",
    info:
      "The idea is telepathy and the spirit world. A holistic world, where human beings will have other spiritual abilities.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andrea-galecio.jpg",
    winner: false,
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
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "maria-ines-malacarne",
    info:
      "Stimulus - Currently we are not aware of what it costs us to connect with other people, personally I believe that in the future, like now, we will only interact through stimuli and act inertia to it. We live in a constant capsule where the events that happen to us lead us to react but not to feel. We live numb.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-maria-ines-malacarne.jpg?2",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/maria-ines-malacarne.mp4?2",
    winner: false,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "marek-mundok",
    info:
      "In 2120, intergalactic traveling through space portals is available for everyone. This humanoid is on its way to meet its new master on planet Earth.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marek-mundok.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "wenzhu-wei",
    info:
      "In the Norse mythology, where worlds are connected through the mythical tree of Yggdrasil, gods will soon fight giants in a great war. A two-headed raven (symbolising wisdom and clairvoyance) and a snake(meaning destiny) by her sides, the Oracle (Volvä) summons the Nine Worlds’ power and, through her third eye, probes the fate of Midgard (being the Middle Earth, the Land of Humans).",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-wenzhu-wei.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "karyl-nerona",
    info:
      "I’ve always loved animals and often feel sorry for all the pain and suffering they go through in the hands of our greedy, selfish species. In my entry, I imagine a future wherein animals live freely while humans tend to them. The total opposite of today, where we’re taught the world is made for our consumption. This artwork shows a reborn world where every living thing lives in harmony. When you say “future”, the first thing that would come to mind are huge leaps in technology but for me, true progress is when we transcend our worldly desires and start using our consciousness to craft better futures for all.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-karyl-nerona.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "james-swain",
    info:
      "All I wanted to do with this design is take our traditional Jack of Spades and make him some kind of noble space explorer. One side is if everything goes right on his adventure and the reverse is if everything goes wrong.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-james-swain.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "aaron-lockwood",
    info:
      "My Queen of Diamonds depicts a strong female character of the future using an interactive overlay technique to give 3 different views in one piece. I have drawn inspiration from iconic sci-fi players, Rachel from Blade Runner and Dolores depicted in the 2020 Westworld series, as well as the empowering artwork of Shepard Fairey. To get the most out of this design, view though 3D glasses, closing alternate eyes.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-aaron-lockwood.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "aron-vellekoop-leon",
    info:
      "What strikes me when thinking about ordinary playing cards is the (visual) status a king, queen and jack hold against the far more plain symbol suits. I wanted to find a way to give the symbol more body and a face. Or better, use the symbol as a face and thereby characterize the numbers. And so here it is; Meet the Diamonds, a far more ordinary suburban family than you would imagine.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-aron-vellekoop-leon.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "gianluca-natale",
    info:
      "The new century will be marked by the end for a new beginning. Environmental pollution will give way to a new rebirth and nature will take back what belongs to it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-gianluca-natale.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "itsmagichere",
    info:
      "It's the year 2120, gadgets have become more intelligent and are now integrated into our bodies. We are co-existing with AIs based on much more powerful clusters of hardware, whose intelligence far outstrip our natural intelligence. Neuroscientists are even capable to disassociated our memories and consciousness from the body. Our brain is then preserved in a virtual environment where we co-exist with everyone who ever digitized. With all these new advancements people on earth will have more pressure to consider their place in the world, who they are and what they want to do.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-itsmagichere.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "spades",
    artist: "federico-bebber",
    info:
      "There's no special story cause, honestly, we will simply be extinguished in 100 years.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-federico-bebber.jpg",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "ruben-antorveza",
    info:
      "The idea of this illustration is to visualize a future where there is a balance between species: animals, humans and the environment, where we are all one. and let's be aware that what happens to one affects us all. That is why this being that is half animal and half human fused in an ethereal space that simulates water or air, giving the sensation that it is floating in the air or submerged in water. Almost as if he were a medieval god.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ruben-antorveza.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "marvin-chin",
    info:
      "In 2120, the era when virtual assistants are indispensable to everyone's life, whether to keep us company, manage our social networks or take pictures of us, they are materializing to satisfy us anywhere and anytime. 'Servants are no longer limited to kings.'",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marvin-chin.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "geert-verbis",
    info:
      "The concept 'Future' ofcourse raises many questions, for instance: how will technology develop? Will we use it to our advantage? Will we respect nature and our planet, or will materialism & decadence be our downfall? Global events like the virus-outbreak show us that our civilisation is fragile and still very vulnerable.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-geert-verbis.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "john-joven",
    info:
      "Year: 2020, A hidden secret laboratory in nowhere with mad scientists start a massive war for likes..! One Hundred years later, they have released the magnificent 'Selfie Monster' a mythical creature with a selfie stick and a 125px frontal camera phone, gaining millions of followers in seconds, when nobody cares anything times, becoming in Trending Topic! ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-john-joven.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "james-bennett",
    info:
      "I was intrigued by the subject of “Future”, particularly now. When I thought of what the majority of artists would portray, I envisioned a lot of pessimism about the future. Everyone wearing masks, dark imagery of a frightening future. So I wanted to take a lighter view, hopefully get a chuckle. I wanted to think of something that’s happened in the past, could happen today and in the future. So I envisioned a minor fender bender in future, complete with an irate cabbie and an older couple.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-james-bennett.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "jefferson-mesa",
    info:
      "For this illustration i was wondering how people will perceive love in 100 years from now, will be love as we know today?, ther wont be love? i was trying to figure it out how we could love or be loved in a world where technologic is in everywhere, a world where the  human race fight with technologies to not to get extinct. But in the end i guess the concept of love somehow will save humans from the extinction.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-jefferson-mesa.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "stefano-ronchi",
    info:
      "Melancholy. Bad card, so they say. Always with those little 'thinghs' around, they whisper... It is dangerous for everyone to stand on the swing - You can't, you shouldn't. She was still there. Melancholy, 5th of Diamonds",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-stefano-ronchi.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "roman-dementev",
    info:
      "His name was Jack Marx. But everybody knew him as Jack_with_Clubs_64, one of the greatest warriors of the Green Sphere Arena (Level 3, modded by Lazy T_T, ARGUS anti-cheat required). His nickname was at the top of the game ratings for most of the time. For many, he was an idol, but some, on the other hand, considered him a cheater and a vote-buyer. But anyway, he was famous in his circles - that's for sure. Moreover, he was a well-known teacher and spiritual mentor. He taught how to win the game and many people bought his courses willingly. But there was a rumor that he never revealed the secrets of his special tricks like “Hot curling” or “Creeping stack”. He devoted his whole life to the game. And finally it happened - he earned his first million green points. He'd been striving for this for a very long time. His name was added to the list of heroes of the Green Sphere Arena (Level 3, modded by Lazy T_T, ARGUS anti-cheat required). And he himself received a gift - a virtual tour to Rome (for two devices) and a month's supply of protein-carbohydrate mucus, which was very useful, since the annual subscription to mega-pizza was already drawing to a close. He was happy, young (56 years old), and full of new hopes. It was the 84th year of quarantine.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-roman-dementev.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "diamonds",
    artist: "igor-duibanov",
    info:
      "The Past attracts me, the Present frightens me, because the Future is death. - Guy de Maupassant. I play around two quotes from the past about the Future. It's Carpe Diem and Memento mori. The first way means to grab opportunities and live life to the fullest today, without any reference to the Future (only one thing about the Future can be determined - death will happen one from 7 Days of week). And the second way is about irreversibility of the future and living proper life today (without committing any of 7 Deadly sins). So, my concept is the mix between the future, death and 7 D (7 days and 7 deadly sins).",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-igor-duibanov.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "martina-filippella",
    info:
      "I've recently read an article on Wired where Stephen Hawking said that within 100 years we will need to find alternative planets to live in, due to climate change, lack of space, epidemics etc. Although this statement was probably meant in the most negative and alarming way it could be, I like to believe that in 100 years there will be plenty of undiscovered and hospitable planets and we will be given the opportunity to travel through space to choose our favorite home among many possibilities. A girl can dream.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/martina-filippella.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "vanessa-gong",
    info:
      "Starting from the pit lane, 'Eight of diamonds' accelerates along the infinite path. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-vanessa-gong.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "sua-balac",
    info:
      "I really hope that sometime in the future we will be able to customize our own bodies; the very first thing that comes to mind (well, at least to me) are cool cyborg arms, you could have ones with tattoos and if they get boring switch to another. And if you continue this though/concept it should be easy to replace organs (like the heart) or even your whole gender, your whole body. I tried to combine all of my ideas into one illustration, the heart in the centre with nine different arms and if you rotate the card it changes from female to male and vice versa.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-sua-balac.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "kaloian-toshev",
    info:
      "I wanted to create a girl incorporated in the clubs symbol. I believe although Playing Arts is an art project, the design of the cards shouldn't compromise the game and the design should clearly communicate the card. That's how the idea of a girl with a big hat came up, where the hat could go outside of the clubs symbol. When I've sketched it I've noticed that it had this western/cowboy style and decide to go with it and see what happens. From there came the idea of her holding a card and smoking a cigar, like she's on a table playing some serious poker game somewhere in the wild west. Then I had to decide what card is she holding and went with King. After that I realised it could have been a Jack (kind of like the younger version of the King) and decide to draw it as well as a card on her hat. It's like she's flirting with both men. The style of the artwork is new experimental style I'm currently developing where I try to blend different visuals.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-kaloian-toshev.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "tino-najera",
    info:
      "I really found like a challenge work on this piece, i like a lot. I imagine the main character with his traditional armor but take it, re think it and converting for something in the future. With different shapes, colors, and all the engraving things.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-tino-najera.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "mihai-dumitrache",
    info:
      "Year 2120. Things changed. Technology evolved rapidly in many fields such as transportation,  communication or medicine. However the human body remained the same. Although there are now cures for most of the diseases, humanity battles against an invisible enemy: depression. Lack of human interaction lead to an increased percentage of humans who are facing loneliness, anxiety,and sadness. In order to help the suffering people,  a group of researchers and volunteers  established Heart Now - an air delivery company which delivers energetic hearts that are balancing  individuals' magnetic field by boosting happiness into it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mihai-dumitrache.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "glu-by-kraft",
    info:
      "Regardless of the times we live in, people are overpowered by idea of space. It fascinated us but at the same time terrified with its limitlessness and mystery. But space also appears as a potential solution for humanity. For me, the idea of traveling into space is soothing because it gives a sense of hope. A light and fun form of work, with stylistic reference to sci fi movies from the 1950s ('Forbidden Planet', 'Destination Moon', 'Godzilla'), let me mentally escape from pessimistic visions of the future. My interpretation of the topic is more a dream than actual prediction.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-glu-by-kraft.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "catarina-rosa",
    info:
      "I'm not really sure how 2120 is going to be, but one thing I know. The power of creativity is not going to change. Even if what surrounds us seems dark or is not what we expected, we have the power to change it, the power to take what's inside us, and make something better, brighter.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-catarina-rosa.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "francesco-faggiano",
    info:
      "In a century, technology will make great strides and the world of medicine will be largely characterized by an adjective: bionic. In fact, we will be able to install very advanced instruments on our body to control psychophysical capacities and vital functions. We will reach an absolute goal in the knowledge of human organs and the heart can be completely replaced by a mechanical one, a perfect technological symbiosis between an organic and an inorganic intelligence. The human heart is replaced by a cold, non-human diamond, symbolizing the loss of part of our humanity as technology advances.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-francesco-faggiano.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "lidan-chen",
    info:
      "Many species will be extinct in 2120. There are no wild animals anymore. Only robot creatures remain. Although the robots are friendly, but they will never replace real creatures.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-lidan-chen.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "ian-vicknair",
    info:
      "This was in tribute to my grandmother. She loved birds; especially the 'Cardinal Bird' and growing up overseas she taught me about birds and flowers which. Also growing up overseas we played a lot of card games as a family every Sunday which made this project even more unique for me. I brought these two ideas together, the memory of my grandmother and her lessons on birds and flowers together with the memory of playing card games with my family. In this design I transformed this bird by incorporating abstract shapes (much like a flower) with branches encompassing the bird. These branches are also in the shape of a diamond and if you look closely, there are shapes of the diamond within a diamond. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ian-vicknair.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "laura-marcuet",
    info:
      "If there is one thing we are certain of about the future, it's that it's very much uncertain, even more so considering the actual health situation. Humanity put technological advancement and economical growth first at the expense of our own planet up to the point where we will have to question and change our ways or run to our ruin. So I wanted to represent the fact that we are holding all the cards to move forward and make 2120 possible. Like the arcana of death indicates, a transition along with important changes are both necessary and unavoidable to ensure this Future. I also dare to hope that, in the next hundred years, women will have taken their place in a more reassuring world, a more lucid, more responsible, more Humane world.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-laura-marcuet.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "lucia-antruejo",
    info:
      "Who hasn't thought that sooner or later we'll end up living in the space? Inhabiting other planets is a possibility that over the years we have accepted as real. Living on the Moon or Mars is something we've all fantasized about once.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-lucia-antruejo.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "solin-sekkur",
    info:
      "Technology is moving faster, and is really exciting to imagine how advanced it will be in the years ahead. I think that in the future robots and A.I. will be around us in daily life, and they will be quite advanced to the point they will have a consciousness of their own. Because of this, we'll be able to understand each other in a deeper way, developing a complex human-robot/A.I. relationship and giving rise to a whole new era, full of endless possibilities.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-solin-sekkur.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "yahir-esquivel",
    info:
      "Inspired by the god Aeon from Greek mythology, Eón is the being of the new chrono (etymologically time). It was created under the concept of artificial life and developed in order to support the conquest of the human species through the universe. The cloak symbolizes the ability to take interestellar journeys, the ax represents the virtue to achieve victory in combat and the station of creation and regeneration to which he is connected represents the ability to remain prosperous and enduring without beginning or end in time. Technological advance is a human ability capable of killing and in turn generating the survival of our species. In the future we will be able to create artificial life, create beings that can journey through physical and virtual places to conquer unknown worlds in the universe.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-yahir-esquivel.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "diana-dementeva",
    info:
      "Rick Wilson got a place in one of those big corporations, you never know what they produce, but you know for sure they watching everybody. Rick works here for a week but still doesn’t know the point of his job. He makes calculations, compiles statistics, adds thousands of names to the database… Good thing - now Rick got that interactive helmet, ‘eyes’ as his colleagues named it. He shouldn't speak with his colleges, though. Rick's 'eyes' wasn't the latest model, so he couldn't see through them. But that kind of 'blind eyes' is very helpful in organizing data. The job is nice. Okay, it's kind of boring. Of course, it would be great to be among the guys wearing their latest 'eyes' and looking through the walls and watching, watching, watching... 'We see you' - they say, repeating the informal slogan of their company. Anyway, you should do your job perfectly, otherwise, they will see you're cheating. Rick's department is on 42's floor. What is on other floors - Rick doesn't know, everything is top secret. Rick even can't take off his 'blind eyes' at work hours, he shouldn't see too much. Every step is recording. And you shouldn't ask questions. You should watch and make statistics here, in 2121.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/diana-dementeva.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "lucian-moldovan",
    info:
      "The year is 2120 and by now most of the people have left Earth to colonize other planets. Since the request for energy dropped significantly, the people who stayed managed to stop climate change and eliminate pollution. Mostly empty, but still full of life, the Earth is now a clean and beautiful planet, as it once was, and became the main tourist attraction for all the galaxy, providing a relaxation oasis for everyone that wants to escape the day-by-day chaos.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/lucian-moldovan.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "smash-studio",
    info:
      "When we think of our future in 100 years, we want to imagine a world that is extraordinary at using its own planet’s energy, that can control and harness its planetary system, and possibly galaxy.  We are picturing a future in which humanity left earth behind in its quest to conquer space through the use of giant geometrical space bases. Space really is the final frontier for us humans and we barely scratched the surface.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/smash-studio.jpg",
    reversible: true,
    winner: false,
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
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "nicolae-negura",
    info:
      "It is not easy for me to think about the future and not get anxious about how it might play out, especially in today's world. I like to think that the future can be one where we may live in harmony with nature & each other, truly understand & befriend technology, treat animals like our neighbors, and get to know more about ourselves and our time here so as to achieve equality for all.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/nicolae-negura.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "ezgi-arslan",
    info:
      "First of all, with fear of the unknown future, I can not accept the fact that technology wil dominate our lives. Human being is trying to go further by technology, however this progress will go back where it all started, to the primitive era. We think we can ignore our primitive roots and create a whole new modern human. All this things are so wrong and fake to me. Instincts, feeling, emotions and being imperfect makes us a human being. We will turn back our roots slowly. I serve you 'true' world that we afraid to face off.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ezgi-arslan.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "isabelle-lutter",
    info:
      "So my future is a dream of a city floating in the sky, watched over by a gigantic digital cat (9 lives, yes ?). But it is not so peaceful, there are storms and Nature is gradually taking over…",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/isabelle-lutter.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "malik-al-hashimi",
    info:
      "Hard to consider the future without considering the present. As technologies continue to evolve the climate and natural resources, they continue to run out. Human beings fascinated by the virtual world around them no longer marvel at nature. Worse, they think they control it and have passed it. I wanted to illustrate a future where the man would have been decimated by using this cliché image of the person who has his nose on his smartphone and in which we can all recognize ourselves, in order to symbolize the pride of humanity. Forever frozen in its navel-gazing in the middle of a world where nature would have taken over.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/malik-al-hashimi.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "cirulli-marco",
    info:
      "This illustration can represent a hypothetical freer future society, without limits, without prejudice, where one can choose whether to be above or below or in the middle, without thoughts and thinking only of being good for oneself and then being well with others. A futuristic society where there are no taboos on sex and love, where a person can freely live his sexuality and also wanting to love more people without the fear of being misjudged, where everyone lives preaching peace and love for personal and common well-being :)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/cirulli-marco.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "nico189",
    info:
      "Brands constantly searched for new ways to translate emotions, VR will be part of our daily lives in the near future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/nico189.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "bernie-jezowski",
    info:
      "Since the appearance of ten mysterious Pyramids, the world has been in disarray. Silent they stood, yet they have brought wars, famine, floods, death and destruction... They birthed a plethora of theories, some innocent, some sinister, that have separated people. The Pyramids have been worshipped, studied, even nuked and still in silence they stood unscathed. The fact remained - anyone who came too close disappeared. Yet, as the time passed people’s insatiable need to know has started making way for peace, mending broken relationships. Nations working together to find out the truth about the Pyramids. Now, one person believes he found the answer. The Traveler has begun his journey to save the World...",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/bernie-jezowski.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "serge",
    info:
      "My piece takes the challenge of imagining what the future will hold for us, I hope in a 100 years from now, humans (and any other type of life from this or other planets) would evolve and develop new ways of communication, maybe in the future we can have long conversations in the blink of an eye with someone who is far away and it will all happen inside our minds, and maybe new technologies will help us achieve a greater sense of being.",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/serge.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "eliot-bemis",
    info:
      "The future looks different when energy is not so abundant. My concept revolves around people needing to wear high tech suits with solar panels that power all the things they need to survive. I wanted the world I see to come through in this illustration. Heavy and bold neon colors reinforce the idea of a futuristic setting. I had the 6 of diamonds, hence the six solar panels.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/eliot-bemis.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "hearts",
    artist: "sergio-stuff",
    info:
      "In a future where a dangerous virus threats life in the outside world forces people to stay inside their homes. Not long after humans develop a hand held quantum computer that  allows people to travel between alternate realities in order to interact with each other,. A highly intelligent underground society tired of living a reality that is not theirs, start traveling  between  multiple realities researching different species of flora and fauna  in order to find a cure for the virus.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/sergio-stuff.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "andres-rigo",
    info:
      "With the challenge how do I imagine the future in 100 years, I rather asked myself what future I want to have in 100 years, and then, I thought about respect, responsability and better behaviours from humans and technology, for this I drew a self taught woman, with the dress that she wants to wear, no matter where, no matter ideologies, politics, money, borders… meaning that humans are capable of whatever we propose, but knowing that we need to take care of ourselves and planet today if we really want to be able to see changes in the future…",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/andres-rigo.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "donavon-brutus",
    info:
      "This piece is titled 'Freedom 4a: Club of 4.' Video Chatting has been around for a while. But now it's become essential to every one of our daily lives. In the future it will continue to be and even more so as we spread across the planet and maybe even the universe. An private soirée is no longer confined to a single location in the future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/donavon-brutus.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "radu-ilinca",
    info:
      "I believe the future of humankind is beyond our planet. More than 50 years ago we managed to put a man on the moon, about a year ago we landed space probes on meteorites, and we're planning to reach Mars pretty soon as well. The truth is we can't really know what the world would be like 100 years from now, but space exploration will surely be part of it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/radu-ilinca.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "acrylic-pixie",
    info:
      "No matter where you are or who you are, you can have world at your fingertips without leaving your comfort zone. Work from home, play from home, order food, talk to your family and friends, see the world - it's all there, in the comfort of your bubble.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/acrylic-pixie.jpg",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "shangning-wang",
    info:
      "Black J.K Mona Lisa. Year‎: ‎R.50 (2120), Medium‎: Man made ‎Ink. Subject‎: ‎Black J.K Mona Lisa,  Artist‎: ‎Leoroboto Ai Vinci. The Robot Monalisa is a portrait painting by the earth artist Leoroboto Ai Vinci. He drew it on the last piece of man made paper. He tried to learn the human being's art and history before the Ai took over the earth.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/shangning-wang.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "jeth-torres",
    info:
      "Considering how the world's catastrophic situation happens every now and then, the certain thing that will always occur is progression—facing every challenge and finding ways to address them. This can be quite depressing to everyone but the truth is, it's inevitable for problems to arise in this lifetime that all we can do is rise above them all. As evident in this 2 of Diamonds card using calligraphy strokes, the earth exists where all beings live. An hourglass is formed through the lower half of the top diamond and the upper half of the lower diamond which represents progressive changes with the fleeting time. Meanwhile, both of the diamonds found at the upper and lower half of the blue circle signify thriving and difficulty, respectively. After all, we can imagine that the world we are living in will always go back to its nature over the next 100 years.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/jeth-torres.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "ricardo-berber",
    info:
      "I believe that in the future we can explore the universe in search of new resources and civilizations, understand how this great universe works. And these little robot friends could help in the attempt.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ricardo-berber-duplicate.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "clubs",
    artist: "sara-gummy",
    info:
      "I was inspired by the cyberpunk universe, because think it's the closest vision to a world governed by technology, our future. Over the years, we are living a constant transformation. We can already attend concerts where the artist can be a hologram, we have the facial recognition technology on our phones and we can even play a video game in virtual reality. Before it seemed impossible, but now anyone can enjoy this evolution. My character is a recreation of how a player from the future is enjoying a total immersion game, as if it were a dream. Where he is seen looking at his game statistics, without the need for remote control or scrolling in real life. Wouldn't it be interesting to be able to be in a game where the console is installed in your head? I think so. As curious detail, I have made a mention to the 8 of clubs. If you draw a line around the illustration you will see the clover and if you draw it only on the character you will see the 8 number.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/sara-gummy.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "oleg-okunev",
    info:
      "The design of the card symbolizes that despite all the difficulties that await humanity in the next 100 years, such as epidemics, wars, environmental problems, only love will help humanity survive and pass these tests with dignity.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/oleg-okunev.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "mork-work",
    info:
      "Can you imagine your data flying around the universe? Keep your memories safe! Connect to a virtual world and relax living multiple lives while you rest... Welcome to the XXII century.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/mork-work.jpg",
    winner: false,
  },
  {
    value: "joker",
    suit: "black",
    artist: "kloudhandz",
    info:
      "I made a futuristic cybernetic version of the joker card. One that's 89% machine and the rest is just a trace of what once was a human being. The line between man and machine keeps getting more vague. Some believe that eventually, for the human race to survive, we will have to merge with our technology. We will then become a new sort of humans. We will be enhanced in every way, upgrading parts of our bodies to become efficient machines, losing our humanity in the process.. And in this future, we might just need a joker card.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/kloudhandz.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "oliver-bown",
    info:
      "In the year 2120, the King of Hearts is really the King of Hearts and Minds and the flow of information and how it is controlled is the true power. Having received a face card I knew that I wanted to create a reversible design, inspired by the traditional playing card style. On one hand, we have the Megacorporation and the other, the Open Source Guild.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/oliver-bown.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "miguel-bencomo",
    info:
      "LIVING IN THE AIR: In the not too distant future, humanity has felt the need to seek purer air and live above the clouds. The planet's contamination has reached extreme levels. The title of this work is practically a metaphor. existential related to a vital feeling and the search for new spaces to live.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/miguel-bencomo.jpg",
    winner: false,
  },
  {
    value: "ace",
    suit: "spades",
    artist: "miopia",
    info:
      "With the fast advance of technology and the lack of opportunities for everybody, we'll see even more the contrast between the rich and poor people. The only thing that we have left is to hold into our spirituality and try to reconnect with our selves and with our ancient and inside world, that will be the only way to escape from all the surveillance and lack of decency in world full of injustices we created.",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/miopia.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "burak-esmer",
    info:
      "In the future, we will be flying rather than walking. Time will progress at a snail speed.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/burak-esmer.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "jane-gorelova",
    info:
      "The idea of this illustration is to show how our future can become. I really hope that I am mistaken in such a vision of the world. All people in world will be 'blind and shrouded in tentacles', from which there is no power to get rid. Many people can already understand these feelings, right? We can't to see really important things and waste to fool problems of our life. Let this illustration be a reference to what should not happen to us.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/jane-gorelova.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "nikita-ivanov",
    info:
      "Who will be after a human? I depicted a robot with a biological heart that holds 4 spheres with the main natural elements: fire, water, earth, air. My illustration means that in a hundred years people will create technology that could possibly become a new kind of life on Earth. It will be a machine that can understand nature and feel as if they had a heart.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/nikita-ivanov.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "vlad-sorescu",
    info:
      "In 2021 scientists accidentally discover that high potassium levels immunize people from the Corona virus, so we all started eating tons of banans. Over time we contained the virus and society moved on. Naturally, a religion called Bananism developed. Bananism continued to grow as a religion and reached peak levels in 2066, but, due to the war with the Spaghetti Monster believers from 2084 (we called it the Food War now ), started to decline in popularity. Now, in 2120, you can still find Bananist priests with their disciples, traveling and trying to gather followers. But what are they really? Few people call them visionaries, some people call them weird, but most people just call them bananaz.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/vlad-sorescu.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "mario-ivanov-maxter",
    info:
      "How do I imagine the world in 100 years? Technologies will certainly be developing very rapidly and dynamically. Robots are taking more and more places in our daily lives. I hope in the year 2120 robots will be not just the machines that process accurate data, but they will also be capable of feeling, thinking and finding inspiration in the books and music created by our classics.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/mario-ivanov-maxter.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "rick-a-crane",
    info:
      "After several mass extinctions and runaway climate chaos humanity now clings to a few remaining specimens from the once abundant natural world. Only a century ago there were 600 species of oak but now, in 2120, only a handful of trees remain. These greatly cherished specimens are on life support, sealed behind glass in climate controlled environments. Visiting elders gaze with sad nostalgia whilst children stand in awe, imagining what it might be like to climb the branches or sit under it's shade. This suit of diamonds represents the material world and it's corresponding element is Earth. The 4 of diamonds can signify major change, future troubles, important revelations or good advice from an old friend. It’s tarot equivalent; the 4 of Pentacles is associated with scarcity, conservation, security, control, possessiveness and greed. This card symbolises the need for humanity to listen to nature and radically transform our overly materialistic and unsustainable lifestyles, to avoid a grim and impoverished future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/rick-a-crane.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "hearts",
    artist: "lina-kusaite",
    info:
      "To me it is not about the look, but more about how can we transform our present way of being into more intelligent, co-existing and co-creating species within all life forms on earth. The work that I am using for Playing Art challenge is the images from a bigger project that I worked on in 2016. I created a sequence of visuals that represented the transformation of human/nature relationships from history to the present moment and into a vision for the future. The work that I am using for Playing Art challenge, questions human relationship with nature and what does that mean to be human and how we choose to understand ourselves within the context of the world. Through creating this art work, I explored different ideas about the limitation of human perception, about self-reflection in our relationship and behavior towards nature, each other and in the end – ourselves. What the world will look like in 100 years from now if we would drop the concept of a human as a singular individual form and experiencing ourselves as a part of, or a particle within, larger organisms; an integral part of collective or social life, or maybe even energy that is an inseparable part of the universe? The way I chose to approach these questions and ideas via merging the visuals of different human body parts with parts of plants and animals and creating almost unrecognizable combinations of forms, and structures. I wanted to show how similar we are, how the same we are and how all of us belong to one magical body – the universe. The number 8 is also representation of eternity and therefor invitation to see ourselves as an infinite possibilities.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/lina-kusaite.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "kay-leathers",
    info:
      "It’s 2020. The humans have pushed past the limits of the planet, scorched the earth, turning everything in sight to sand and dust. All that remains are the ruins of cities, a few roaches and some dark places. But what’s that coming from the darkness…? Finally able to step up and seize their opportunity to rule, the lizard people have shed their human skin disguises and are celebrating their new freedom with a fabulous fiesta! The moonshine is flowing and the lizards are glowing! Ay Ay Ay!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/kay-leathers.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "sua-agape",
    info:
      "100 years from now, we'll be exploring new worlds but above all, we'll be exploring and discovering what we do not yet know about our own planet.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/sua-agape.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "rob-armbrister",
    info:
      "For my piece, when thinking about the future I imagine that things like vertical farming will become more and more commonplace. I see a combination of vertical farming and the growth of robotics. This illustration depicts a lone horticulture robot drone tending to it's piece of a vertical farm. I would say have a pretty optimistic view of the future. I think humans will find new ways to improve tasks through technology, but also don't imagine in 100 years that everything will be crisp, clean and perfect. The garden here is a little overgrown and the structure may need some fixing up but the robot sticks to it regardless. Within the design of the structure I also incorporated the number seven as a fun eyecatching element.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/rob-armbrister.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "virginie-mazureau",
    info:
      "The current health crisis is here to remind us, now more than ever, that it is essential to preserve our natural habitat from any kind of threats, especially from ourselves. If we do not put any effort in changing our behavior as well as our way of life, our habitat could be lost forever. I want to believe that, a hundred years from now,the next generations will have a chance to live in harmony with this planet , and that they will cherish it more then we ever could. My Queen of Hearts, or rather, my kind-hearted queen, is represented in the form of a young, pure hearted girl, mesmerized by all the beauty of the fauna and flora covering the surface of the Earth, as well as nature in general, which has become a part of her.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/virginie-mazureau.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "spades",
    artist: "lindsey-chizever",
    info:
      "My hope for the future is that the broken pieces of the world start being put back together. I divided the spade into 9 sections—the fragments uniting to create one complete spade, but they still have some way to go.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/lindsey-chizever.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "claudia-silva-gopfert",
    info:
      "A prosperous world of infinite possibilities. The creation of new paradigms and templates, where we´ll behave as an authentic and real human being that we are to fulfill our true purpose on planet earth. There will be harmony, balance, peace, joy, abundance, compassion, hope, happiness, empathy, respect, justice, beauty and mainly there will be LOVE among us along with mother earth. We´ll vibrate high and we´ll be all connected from our hearts to listen and feel the infinite universe that surrounds us because WE ARE ALL ONE, WE ARE LOVE.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/claudia-silva-gopfert.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "valentin-cioaca",
    info:
      "Technology keeps getting better and better while we evolve at a much slower pace. In an attempt to keep up, in 100 years will become mandatory to merge with it - making it part of us should allow us to reach our full potential. This change will be met with skepticism and will divide the people, some will support it while others will criticize it. 2 sides and 2 possibillities: It will give us more freedom or it will trap us? It will bring us closer together or it will make us drift further apart from eachother? For better or for worse, once the choice is made, it will be a point of no return.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/valentin-cioaca.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "spades",
    artist: "lorenzo-fioranelli",
    info:
      "Up to now, one of the most known and daily problems is 'social distance'... not (only) depending on the actual pandemic, but rather due to distance in itself. For sure social networks are a good help but there's a limit which cannot be exceeded: skin contact. People and friends, loved ones, are far away and sometimes socials are not enough. I figure the future, maybe 100 years from now, in which with just a touch, a teleport pad perhaps, as easy as using an app, available to all, one can simply jump in a gateway, join us, and new places too.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/lorenzo-fioranelli.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "erika-szep-biro",
    info:
      "As I said before I'm in love with fantasy and science fiction, especially the old ones because my dad was a huge geek back in the '80s when I was little. Thanks to him I was raised on Lord of the Rings, Dune, Asimov and Barbarella. These were the main inspirations for this card too. I also love pinup art, the awroks of Bill Randall and Peter Stevens are influencing this card too! In the future everything will be kept in glass globes, jars and containers because one has to shelter everything from the hazardous environment. You can see 6 clubs floating in these protective glass orbs, but the 7th spehere is the astronaut girl herself, because a girl has to keep herself safe too!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/erika-szep-biro.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "clubs",
    artist: "pilar-vega",
    info:
      "I propose a greener, ecological and environmentally friendly next century, where, after a great extinction of the largest animals that currently inhabit the planet, the surviving fauna and flora allies to subsist, evolving in a thousand ways, compared to a humanity lost in a new civilization.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/pilar-vega.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "hearts",
    artist: "edwin-perilla",
    info:
      "My illustration is a representation of the Japanese legend 'the girl with the red eye', the girl had been born with a deformity that prevented her from finding someone to marry and with her heart shattered, she committed suicide. With this representation I highlight the eye as a form of manipulation where most people have included it as a tool to know sins, frustrations, deceits, however hidden they may be and in this time 2025 the eyes are replaced by technology that manipulates us which is the event that represents the TV.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/edwin-perilla.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "umberto-daina",
    info:
      "The Importance of Being 4 ♣ Clubs. Even if we're not kings, queens, aces or jokers, we can win the biggest games...now and in the future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/umberto-daina.jpg",
    winner: false,
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
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "federica-fabbian",
    info:
      "In year 2120, dogs have finally reclaimed their human's-best-friend status, after decades of alpaca hegemony. In this snippet of real life, a female human is helping her pet finding their soulmate, by a process reminiscent of early 21th century 'social media'.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/federica-fabbian.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "mr-maestre",
    info:
      "In the near future, virtual reality plays a significant role in dating apps, making it possible to 'meet' the person you are chatting with virtually and even create a perfect partner for yourself. Cybercriminals, taking advantage of the personal information users might share in these kinds of meetings, have created a virus that impersonates other users. The virus has impersonated one of your dating contacts and has taken control of your accounts and passwords, as well as your personal information, and is posting it on the dark web. The more you interact with the virus, the better it gets to know you, allowing it to better impersonate you in order to infect the next person. The International Bureau of Cyber Security has named this virus the 'King of Hearts.'",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/mr-maestre.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "anastasia-kochetkova",
    info:
      "In the future people's actions will destroy nature at all. Almost all kinds of animals and plants will become extinct, Earth will run out of resources to support the species. Megacities will devour almost all living things. This deer is a symbol of living nature that we still have a possibility to witness. It is a chance for Humanity to think how we can save wildlife of our planet or at least what’s left of it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/anastasia-kochetkova.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "marcello-manchisi",
    info:
      "2120 will be a better time, I know it. Humanity will be much more advanced, so I guess there will be both nature and robots. But most important, future humans will be advanced because they'll program robots according to a universal rule: love is positive in all of its forms, so it should never be kept hidden to others. That's why all kids of the future, no matter if humans or robots, will be able to show their love without any hesitation, with simple and pure actions like giving flowers to someone else.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/marcello-manchisi.jpg?2",
    winner: false,
  },
  {
    value: "9",
    suit: "diamonds",
    artist: "burak-cinar",
    info:
      "In the future, some of our descendants will land on untouched planets and engineer ecosystems to maintain our fragile bodies. An ecosystem that is hard to recover in the heavily damaged pale blue dot.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/burak-cinar.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "hearts",
    artist: "kristyn-bailey",
    info:
      "In 100 years from now I like to imagine a world where we can coexist with extraterrestrial life. In previous years there's been talk about humans colonizing the moon or even Mars in the future. It currently seems like a very distant idea, but in the year 2120, who knows? As we continue to push the limits of space exploration we may find that alien life really does exist. This concept inspired my illustration, which depicts a woman with her alien husband and their half human, half alien child.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/kristyn-bailey.jpg",
    winner: false,
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
    winner: false,
  },
  {
    value: "9",
    suit: "clubs",
    artist: "john-roeder-freeman",
    info:
      "With the integration of technology and sciences, I’d like to imagine what it could be like for humans to survive in an aquatic ecosystem. Our advancements are at exponential rates of growth, especially in the past century. Through the ages, tales of merfolk have been prominent in a variety of cultures. Could this be foreshadowing? *Also look for the nine hidden clubs in the card!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/john-roeder-freeman.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "diamonds",
    artist: "yulia-yakimovich",
    info:
      "It seems as though humanity is building the future relying on high technologies and innovations, it is creating an environment where everything is made for the convenience and comfort of people. But what if our civilization goes through hardships and tribulations, humanity faces Its ultimate survival, and the culture slips into deep decay? It is hard to foresee what our world will look like in the future but, certainly, right now we are influencing the way it will look in a hundred years.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/yulia-yakimovich.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "diana-stanciulescu",
    info:
      "What if the future will be similar to what Gene Roddenberry imagined? A world of plenty, where material needs have been met for everybody, where humans spend their lives learning, exploring, creating. Improbable, but interesting to imagine! Ah, and there will be teleportation, of course.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/diana-stanciulescu.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "harry-decker",
    info:
      "In history, every movement has a counter-movement. In a future world, where we are constantly connected, there must be a place where we can disconnect from it all. The future, I imagine will be entirely dominated by globally connected technology and progress. We just need time away from technology—already today we seek digital detox and time to get away to a tropical vacation spot, even if it’s only for a couple of hours. The Tiki Bar is the traditional symbol for escapism—the perfect place that’s a simple counterbalance to the ever-evolving world—that provides the freedom to disconnect, let loose and relax mind and body. This Tiki Bar is the perfect embodiment of that concept, a creative playground where you can take a much-needed pause from all pressure and responsibility. The retro-futuristic A-frame is a symbol of both past and future—architecturally anchored in tradition and innovation—its timeless character reinforced through the reflection, remaining a safe harbor, even in 100 years. After all, while everything changes, some things must remain.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/harry-decker.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "clubs",
    artist: "tuyet-duyet",
    info:
      "A thing isn't beautiful because it lasts - humans are fucking odd. They think they are the owners of the Earth and try to exploit, destroy and control it, but everything has consequences. The world after 100 years, everything is turned to ashes, people will have to live in deep underground tunnels and cave systems recreated from caves in nature. The entire surface of the earth will become a desert filled with dust and sand, the air will become seriously polluted. Humans only exist in small forms and their bodies are almost impossible to see in the current environment, when they go outside they must wear masks to breathe in the air and underwater. People are looking for a cleaner environment and it is far from the mainland. It may be places that humans have not discovered and explored yet. The ocean is exactly where they are looking for, humans may have set foot on the Moon or Mars, or other solar systems. But on their own planet - the ocean is always a mysterious place that they haven't discovered yet.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/tuyet-duyet.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "vera-q",
    info:
      "By that time our technologies would reach an incredibly high level at that point that you could share your imaginary world with everyone, with the people you love. You can create it and make it real. You could share your dreams. Imagine something really special and sincere, some place you always dreamed of. The smell, the feelings, surrounding - you are the creator and you are the owner. But now you can also invite people to go through that experience with you, together. Your world, your emotions, your reality.",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/vera-q.jpg",
    winner: false,
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
    winner: false,
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "hazel-ang",
    info:
      "While making this card, Covid 19 continues to be a plague amongst us. We are all impacted in negative ways. Human contact has been severed and we now live in a world where “Social Distancing“ has become a norm  – Now in the back of our minds, the idea that physical contact with other humans brings about sickness has been implanted by our governments and the media. In the future, we will be needing robots to interact with us and assist us in our daily tasks. It is a thought that deeply disturbs and frightens me, and this is what my card is all about.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/hazel-ang.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "10",
    suit: "clubs",
    artist: "corey-rivera",
    info:
      "When I think of 100 years in the future I image cities advancing to what we see in stories and films of science fiction and fantasy. Every year our devices become more accessible, streamlined, and necessary for everyday life. Eventually it may become an extension of our own bodies or a replacement altogether.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/corey-rivera.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "jan-janeczek",
    info:
      "The future is something we don't know. We don't know what will happen to the world, and we don't even know what will happen to us. My work contains three things that, I think, associate with the future. Human - is a character without identity. We don't know who it is. Distorted, unrecognizable. It can't be caught even for a second. It is like a puzzle to us. With curiosity but also uncertainty, we observe and wait what will happen. Diamond - Shape taken from the card I drew. We see there, a part of the world which the character in the graphic comes from. It's colorful, full of different shapes and forms. It emerges in our direction. Digitization - Distortion of reality. That's why we don't know who the character is and what world he comes from. Is it real or virtual? By using various digital paiting techniques, I created a pixelation effect that absorbs the whole image and creating a mystery mood.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/jan-janeczek.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "clubs",
    artist: "fatih-ozturk",
    info:
      "The inevitable happened. Planet's resources were finally exhausted by the humankind. Earth became hostile towards its expansive guest. Unable to adapt this sudden change in climate and settle with low to none resources people migrated to the underneath of the earth crust. Now humans crawl underground and try to build a 'new normal' in this cold environment.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/fatih-ozturk.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "10",
    suit: "spades",
    artist: "itsacat",
    info:
      "It is not easy to imagine what the world will look like in 100 years. One of the tools that allowed us to get where we are today was our brain, and it seems that we use only a small percentage of it. I think that in 100 years from now we will be able to use it even more and have the power to create amazing things with our minds. The world will evolve in many different ways, but I believe that there will be more and more people fighting for a better planet, like real heroes. We can already find many of these heroes today! I like to think that one day we will find the perfect balance.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/itsacat.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "joaquin-rodriguez",
    info:
      "I’ve always been fascinated by the aesthetics surrounding the bionic future that apparently awaits mankind. I wanted to portrait a situation where the human side prevailed so I gave the main role to the heart necklace and gave it the subliminal appearance of having been extracted right out of the robot’s chest.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/joaquin-rodriguez.jpg",
    winner: false,
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
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "tophee-coquia",
    info:
      "The concept of 'Royalty' has always been an intriguing topic for me when watching it in movies. A royal family must provide a child as the heir to the throne in order to guarantee the survival of the monarchy. The death of one ruler is the rise of another. But what if we remove death out of the equation? By year 2120, we would have aquired the medical and technological capabilities in infusing mechanics to the human body. With this, we are able to lenghten our lifespan as long as the necessary materials and resources are available. Through this advancement, a ruling person would be able to continue their heir to the throne for as long as they want. Will they use it to prosper peace and love over to those they rule especially with the wisdom that they acquired throughout the years, or will greed and the thirst for power rule over their heart?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/tophee-coquia.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "marco-alama",
    info:
      "I can't really say anything about what there will be or won't be in the future, but I know for sure that Love will be a powerful source of inspiration. So, as today we believe that Santa Claus comes on a sleigh, in the future we will be gazing to the sky hoping to spot a colourful mini-van roaming among the clouds, spreading Love among us.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/marco-alama.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "glish-glish",
    info:
      "The idea behind this work is to represent how our world is going to change. Obviously, people are going to start fearing meeting in real life, afraid of catching any disease around them and present in the air. That means humanity is going to have to create a new way of communicating with each other life like. This is where I introduce the hologram. A hologram system could allow you to broadcast yourself anywhere and whenever you want in all security, from home. Our future might be lacking of human contact but it will obviously be more secure.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/glish-glish.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "hearts",
    artist: "mark-schwindt",
    info:
      "I imagine that our future will bring change on a much fundamental level. In the last hundred years, a lot of great scientists have made groundbreaking discoveries that have radically improved our understanding of the universe. These include black holes, gravitational waves, quantum superposition, and dark matter. Such breakthroughs will continue to change our lives in ways we can't even comprehend. After all, there are endless windows of opportunity for every particle in the multiverse.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/mark-schwindt.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/mark-schwindt.mp4",
    winner: false,
  },
  {
    value: "5",
    suit: "diamonds",
    artist: "luq-luca-qiu",
    info:
      "2120. After a series of epidemics that halved the population, remaining human beings have closed themselves off from world, fearing any form of physical contacts. How does this ancient species manage to survive? The solution came from technology, a robotic replacement body called QTY23! It allows humanity to do everything it did before, such as working, meeting friends or taking a walk. Fully customizable, QTY23 gives the illusion of being anything you want and also makes you feel free despite physical captivity.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/luq-luca-qiu.jpg",
    winner: false,
  },
  {
    value: "10",
    suit: "hearts",
    artist: "marina-okhromenko",
    info:
      "The future is always represented better than the present. This is property of hope. If there is no future, what's the point of being alive? I also have no doubt that the future will be better - new technologies will appear, people will live longer and become happier. I hope. But I am also confident that the arrival of new technologies will provide a whole new level of opportunity to put digital dog collar on us. This is why my artwork is more as warning. We are already seeing likelihood that some groups of influence or governments will want to do this. Various problems and disasters will be used by them to try to further restrict our freedoms. I can already see this clearly from Russia. So we need to wipe our rose-colored glasses and try to see the intent behind Agent Smith's glasses. This is a amazing symbol of possible 'beautiful' future from legendary film The Matrix. It has been 20 years since the film was released, and we can see now how relevant warnings from of tandem Wachowski. So I want to wish you and our world in 100 years more technology, more choice, more options and most important more freedom!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/marina-okhromenko.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "yana-klochkova",
    info:
      "Even when technology has finally taken over minds, when humanity has faced deadly epidemics and learned to overcome death, when there is not a single unexplored corner left in space, when there is nothing to fear and nothing to surprise, look around: people are still religious.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/yana-klochkova.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "clubs",
    artist: "massimo",
    info:
      "In the early 2000s, bees were responsible for around 70% of the reproduction of all plant species living on the planet, guaranteeing around 35% of global food production. A selfish search for profit, intensive agriculture and pesticides have significantly reduced insects and led to a botanical impoverishment. It seemed just an urban legend, but we were forced to create drones to encourage the pollination of flowers and plants and therefore avoid their extinction.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/massimo.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "spades",
    artist: "mr-aramanada",
    info:
      "My work is an image of a Babaylan (Albularyo), a Filipino folk healer wearing a dress inspired by indigenous textile motifs while carrying a bowl adorned with traditional motifs. In the future, there will be a great interest in indigenous culture where people are rediscovering their ancestral roots as part of knowing their identity, both personal and collective,  in the context of heightened cultural fusion due to globalization. Indigenous knowledge (art, medicine, etc.), will be weaved in the contemporary context (art and design, music, etc.) to strengthen the sense of cultural identity of a person and the community as a whole.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/mr-aramanada.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "jonas-devacht",
    info:
      "Our vision of the future has had countless different interpretations over the times, even as far back in the early 1950s. Right now in 2020, we’re facing a lot of problems we haven’t faced before such as environmental issues and new diseases. Some might even say the future doesn’t look as bright as it once was to the people back in the ’50s. Because of that, I wanted to bring back some of that retro craziness by illustrating what can be the beginning of an epic space battle. Who knows, in 100 years we might explore space and fight aliens with big plasma blasters… 🔫💥",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/jonas-devacht.jpg",
    winner: false,
  },
  {
    value: "jack",
    suit: "spades",
    artist: "magdalena-sikora",
    info:
      "Who is he in 2120? Is he a human or a hybrid or a projection? I think that in 100 years people will be close to achieving immortality one way or another. Maybe it will be through genetic modification, 3D bioprinting, AI enhancements or creating hybrids and mutants. Probably people will be able to design their custom ideal body. Maybe human consciousness will be able to control multiple avatars: holograms or clones, allowing them to function in different places at the same time. Or finally, people will overcome the limits of the physical body with a mind transfer, achieving digital immortality. Maybe our definition of „Human Being” will change. Will there be a place for flaws and imperfections? If we immortalize our mind or body, what will happen to the soul? I guess you will always find it in music.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/magdalena-sikora.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "laus",
    info:
      "Wondering about the future and talking with a friend about how everything is a cycle, made me think about the beginning of times and the creation, so thought on going back to the start to a Queen Eve look-alikes, covering with clubs instead of the leafs, (there's also a little hand reference from the painting of 'The Creation of Adam'). Wanted to show how these 2 Eves are creating the new future, but as everything in life it has the good and the bad, so it's kinda your choice how the future ends in 2120.",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/laus.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "4",
    suit: "hearts",
    artist: "umberto-pezzini",
    info:
      "A higher rate of pandemics brought the whole humanity on its knees, but also brought it closer together. A world-truce was declared, scientific efforts where globally channeled to face this global crisis. Humanity rose from its ashes, united and at peace. Nanobiotechnologies advancements allowed the end of almost all severe diseases and considerably extended our life expectancy. After decades of growth, the friendly alien species of the Ulteriors revealed itself to us, considering us finally mature enough to join them in the common effort to explore the universe together. Cross cultural exchange gave birth to new artistic forms and even religions. In the illustration an icon of Saint T’naskor, or Saint Polydorus as we terrestrials prefer, 'the donor of hearts', protector of the adventurers and the explorers. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/umberto-pezzini.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "artem-pavlov",
    info:
      "2120 shows a world in which nature still remains harmonious. The bee is still the same bee with a matching her needs flower. She doesn’t care about feelings as much as she cares about the mechanics that she performed both in the 21st and earlier. Human has always wanted to gain supremacy over nature. Over time, he achieves this. But will he notice how he will create for himself a reality in which he ceases to feel? And who the hell will need it, if in a new reality you won’t be able to FEEL your superiority?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/artem-pavlov.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "clubs",
    artist: "hamed-sarhadi",
    info:
      "I have no doubt that we are using the Earth. The oceans, jungles, trees, animals and the whole Eco-System have been damaged. Sooner or later, if we don’t make a difference in our major behaviors, we will lose it. In my point of view, we’ve built a massive and complex system but without roots in the future and the generous gifts from our mother earth will be trapped in our engine’s pipes. By this unkind way, we can’t look at the future, but the future will watch us from a higher perspective. I’ve tried to imagine that future, which we don’t criticize our approach with our world around us, in it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/hamed-sarhadi.jpg",
    winner: false,
  },
  {
    value: "king",
    suit: "clubs",
    artist: "marwan-shahin",
    info:
      "In the future, the human race will actualize unity and desegregation. They will understand the need for being kind to one another, reaching the point where governors, rulers and presidents are no longer needed. They will take down hierarchical figures with the realization that they can figure things out amongst themselves as eco systematic communities and that true power and wisdom lies within themselves.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/marwan-shahin.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "burc-pulathaneli",
    info:
      "It is very difficult to imagine future technology. Everything we know now may not be in the future. Some look pessimistic. Some look with hope. I think it will be a mixture of high technology and primitive. More precisely, I hope. People will return to nature again. Yes, robots will be in our lives and they will be part of us. They will take care of the fields. The human population will have to decrease. We will remember to be happy with simple things. We will remember that what is precious is nature and our family.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/burc-pulathaneli.jpg",
    winner: false,
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "dejvid-knezevic",
    info:
      "I have a nagging suspicion that if we ever manage to save the environment, it will be due to economic necessity rather than moral obligation. We will need the environment so the economy continues to prosper, the fact nature gives us life will fall secondary to 'growth'. It's like doing charity for the sake of publicity; you are doing a good thing, the right thing, but it's coming from the wrong place and lacks any genuineness. Somehow, to me, this feels more evil than open arrogance or carelessness. But maybe that's just me. The idea for this project grew from this thought.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/dejvid-knezevic.jpg",
    winner: false,
  },
  {
    value: "queen",
    suit: "clubs",
    artist: "cat-finnie",
    info:
      "I wanted to retain the key features of Queen of Clubs, while keeping the theme of 'Future' in mind. My QoC is decked out with retro-futuristic headphones and wearable tech in the form of a visor. She has brand new sounds on her playlist and is tuned in to events all over the world via her visor.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/cat-finnie.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "valentina-brostean",
    info:
      "My joker is a contemporary interpretation of the classical one. Mysterious, wild, eccentric, playful - a character that you'll remember and that will affect you, visually strong as much as his role is! He's an element of luck made out of many pieces and layers that fit perfectly together. I have used all the classical elements of joker such as his recognizable smile, funny hat, makeup around the eyes and interpreted then (stylized them) in my own recognizable visual language!  I wanted to point mostly to the mystery of his character and through layers emphasize the diversity of roles he might have in the card game. I have Imagined this joker exactly as a character from the future. Based upon his classic features but in this totally contemporary, new context. Maybe in the future, we're all gonna change out physiology and become more robotic, layered, with artificial implemented pieces, a mix between the artificial inelegance and humans! Therefore I have left just a piece of the real skin (with human eyes just a bit robotized) on his face as basics and built the abstract elements upon it! I have placed him 'out of space' in this abstract space full of starts as maybe in this proper future we will be able to travel further in space, or maybe telepathically mind travel in different dimensions of conscience! My joker could do that :)",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/valentina-brostean.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "hearts",
    artist: "effe",
    info:
      "The year is 2120. Movies about the future continue to tell us about flying cars and robots that will destroy the world, but no. Our evolution was way more subtle and far more intelligent than we could imagine. The dark ambiance in the cities and all the drones flying around are now in contrast with the immense green of plants. We are able to take a deep breath, we are free, fast and spontaneous. There is no more discrimination, we don’t judge the others by appearance, race or color. Those characteristics are no longer visible to us…",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/effe.jpg",
    winner: false,
  },
  {
    value: "8",
    suit: "diamonds",
    artist: "paolo-stralla",
    info:
      "In 100 years the climate change has already made humans extinct. The rising of the seas and the air pollution have created an incredibly difficult ecosystem to live in, and just a lonely apple tree has survived. Oh, and aliens have arrived on Earth! Though they are gonna be quite unhappy to see just a living three in this entire watery planet...",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/paolo-stralla.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/future/videos/paolo-stralla.mp4",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "edward-christianto",
    info:
      "Future as described to having so much innovation and easiness for mankind, are always sided with bitter stories about the sacrificed parts, such as nature and wildlife. many times the technology ends up try to replicating how nature works instead of recover it. in other words, creating illusions. there will be a time when seeing a flock of flamingos swarming in the lake of sunset are just a mere virtual features in the click of our hands.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/edward-christianto.jpg",
    winner: false,
  },
  {
    value: "7",
    suit: "spades",
    artist: "nouran-zedan",
    info:
      "I believe that 100 years from now, humans will have more interactions with AI and technology will evolve creating abilities that we have never experienced before. Humans being genetically modified with AI, will have the ability to live underwater and discover life in the depth of the ocean that could change the world forever.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/nouran-zedan.jpg",
    winner: false,
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
    winner: false,
  },
  {
    value: "king",
    suit: "hearts",
    artist: "zcape",
    info:
      "This King of Hearts is mixing the image of his traditional card value with the vision of his own future: a King with no kingdom… He’s the perfect icon of the humanity: king of nothing but sure to be the greatest… After humanity has collapsed on itself (in one hundred years, probably before), victim of its own greed and stupidity, he’s looking for a new place to parasitize, alone in the dark, lost in the cold space of his own mediocrity… just to repeat the same mistakes, again and again, foolishly convinced that his way of life is the only right one. Because human is just like that, wrong…",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/zcape.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "staycute-illustration",
    info:
      "In the future my biggest wish is that there will be more focus on mental health both individually and in our society. I myself suffer from chronic depression, which is one of the mental illnesses that is in the prospect of becoming a leading mental health problem in the future because of lack of treatment options. So in the future I hope that we can all take better care of ourselves, each other and have a larger focus on taking care of our brains to contain the growing numbers of people mental health issues.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/staycute-illustration.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "kala-kuns",
    info:
      "My mind imagines that in 2120 the humanity will go in search of a new habitable planet, since the Earth will have run out of resources to support the species. But this departure will leave space for plants and animals to evolve and adapt to a new planet Earth, very different from how we know it today, giving rise to new species.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/kala-kuns.jpg",
    winner: false,
  },
  {
    value: "3",
    suit: "spades",
    artist: "ciro-giobbe",
    info:
      "The reconquest of nature. If man leaves, nature takes back what is his. The planet has been here before us and it will be good even without us, but sooner or later nature takes possession of what we have taken away from it, and that's how I imagine the world in 2120. My illustration represents a hand that goes to disperse with leaves that weave it.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ciro-giobbe.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "hearts",
    artist: "ingrid-godinez",
    info:
      "The concept that manages my illustration is based on an allusion to the movie of Atlantis the lost empire of Disney. When I was little my dad once told me that it follows that Central America can disappear due to a sinking allowing North America and South America to unite, however this will happen in a long time. Then the idea came and I asked myself, how about the same thing happens to us as Atlantis before the get sink? This is because my country is characterized for having been one of the areas where the Mayan culture existed, for which we have a great wealth in Mayan art, sculpture, painting and architecture. What struck me about the film is that the development of technology does not generate the loss of culture and what I want to reflect in my illustration, first is that my country can have a greater appreciation and respect for what characterizes us and that if best used technology can help us flourish.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ingrid-godinez.jpg",
    winner: false,
  },
  {
    value: "4",
    suit: "spades",
    artist: "norma-rodricks",
    info:
      "Growing up, I’ve always been fascinated by aliens, curious about space, and have major love for robots. A 100 years from now, I see aliens, humans and robots co-existing in a world that’s, well alien, to the world we inhabit now – and it’s going to be one big party! My card is a reflection of this vision – an electronic dance party the likes of which our current world is yet to experience.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/norma-rodricks.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "6",
    suit: "clubs",
    artist: "yma-jae",
    info:
      "My concept is Escaping Reality; with the boxes representing people that are brought up to be certain someone or something, cutting down ideas and such, follow rules, and in summary a toxic environment which what the black background represents. And maybe in the future, having a portal to escape those norms and be someone you want to be, which what the random shapes and colors represent. The clean background and random lines represent a fresh start and freedom.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/yma-jae.jpg",
    reversible: true,
    winner: false,
  },
  {
    value: "jack",
    suit: "diamonds",
    artist: "ben-bauchau",
    info:
      "When I think of Future, I think of robots, and I simply like the idea that this card game depicts a robot that has some sort of ritualistic or ceremonial costume, like the usual card figures use to have.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ben-bauchau.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "cuong-bui-manh",
    info:
      "What will the world look like in 100 years? What will remain of our home if we don't change our ways? 70 percent of the earth's surface consists of water. Still we pollute the seas and extinguish species in the name of our own prosperity. My illustration shows our dire fate: In a world swallowed by the sea, the only place mankind has left is the waste it left in it's wake.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/cuong-bui-manh.jpg",
    winner: false,
  },
  {
    value: "9",
    suit: "hearts",
    artist: "jeremie-gauthier",
    info:
      "I think that in the future, with the advance of technology and artificial intelligence, we will have an ultra-evolved medicine that will allow us to see the infinitely small and thus better understand every little mechanism that makes up our body.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/jeremie-gauthier.jpg",
    winner: false,
  },
  {
    value: "5",
    suit: "spades",
    artist: "jaen",
    info:
      "Besides the necessary change I absolutely want for the world (environmental and social balance), I imagine that at some point, we'll be able to give AIs actual creative freedom, and that there will be some kind of strange virtual wilderness to explore, something that will be literally otherworldly. And to be able to dive in it and process this reality through our consciousness, a kind of sensory translator will have to guide us through these unexpected lands.",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/jaen.jpg",
    winner: false,
  },
  {
    value: "2",
    suit: "spades",
    artist: "knysh-ksenya",
    info:
      "2 Spades Idea - Maybe one day we will find a portal to the future and we will have a chance to reach out and meet with someone who was on the other side ... The idea of using such a portal excites and intrigues me. Would you take a chance?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/knysh-ksenya.jpg",
    winner: false,
  },
  {
    value: "6",
    suit: "spades",
    artist: "pablo-balzo",
    info:
      "The story of my idea is a future in harmony with nature, where nature has recover his place in earth, humans use some technology based in steam, is some kind of steampunk future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/pablo-balzo.jpg",
    winner: false,
  },
  {
    value: "joker",
    suit: "red",
    artist: "david-oku",
    info:
      "Where will the world be in 100 years? There is only one conclusion a world of ROBOTICS & ALIEN LIFE. I imagine a world beyond space, a world where we and other life forms live together in a future ruled by artificial intelligence.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/david-oku.jpg",
    winner: false,
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards);
};

export default dump;
