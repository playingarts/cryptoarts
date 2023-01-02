import { Deck } from "../source/graphql/schemas/deck";
import { connect } from "../source/mongoose";

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
    material: "Bicycle® paper with Air-cushion finish",
    inside: "52 Playing cards + 2 Jokers + Info card",
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
  },
  {
    value: "2",
    suit: "hearts",
    artist: "olga-zalite",
    info:
      "In my image of 2120, the cult of individualism would have progressed to the point where people have little to no interest in forming couples or being in romantic relationships. They are stuck between their instinctive need for love and the desire to protect their personal space. Unwillingness to compromise followed by a lack of emotional intelligence might put family institutions at the edge of extinction.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/olga-zalite.jpg",
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
  },
  {
    value: "3",
    suit: "clubs",
    artist: "antoine-goulet",
    info:
      "I envisioned a future where gender is now irrelevant. Colors usually associated with 'typical' gender roles are used on the two front characters, while the third one is a mix of the two. The three characters also share the same genderless look and attributes. I wanted their composition to evoke the shape of a club.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/antoine-goulet.jpg",
  },
  {
    value: "3",
    suit: "diamonds",
    artist: "el-diex",
    info:
      "2120 Entertainment business will put music into orbit. Space sounds, visuals and voices will rule the next century. In a hundred years, outerspace venues will give people new gathering places for sharing music and celebrate festivals. Aliens, robots and digital bands will get together to share sounds from other galaxies and performances from other dimensions.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/el-diex.jpg",
  },
  {
    value: "3",
    suit: "hearts",
    artist: "mike-karolos",
    info:
      "'Refugee' The year is 2120. We are now forced to leave our home, planet Earth. No refugee wants to leave their home but that's necessary when it is the only way to survive. Earth is now a hostile environment due to human behavior. There are no more borders, we are all earthlings and refugees looking for a new place to call home. This is a possible scenario for the future. Maybe not in 100 years from now but it could come to that at some point unfortunately. My illustration has two meanings. One is about how we treat our planet and the second is regarding refugees. We could all be a refugee in the future so think twice before you judge.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mike-karolos.jpg",
  },
  {
    value: "3",
    suit: "spades",
    artist: "angela-bardakjian",
    info:
      "Our lives today are unrecognizable from those a century ago. Who would have thought that we will be living 2020 in isolation. Yet we are lucky to be living in a century where all of us can connect with each other easily. The way we live, work, and play will change beyond our expectations in the upcoming 100 years. whether formed technically or naturally. It is going to be a significant world. This card creates that fine line and a contrast between the traditions and the future. It is about discovering the unknown with its organic, and dynamic flowing lines.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/angela-bardakjian.jpg",
  },
  {
    value: "4",
    suit: "clubs",
    artist: "toma-studio",
    info:
      "Four of Clubs symbolise the foundation of Knowledge - the knowledge to be shared to educate and grow. Fours must be in command of every situation that arises. They are dealing with practical applications of knowledge, and they the power to glorify it. What awaits us in the future? As this year’s pandemic teaches us, it’s impossible for humans to predict what is going to happen, and the effects of our actions. Between pandemic, environment and economical crisis, and the huge battles for race and gender equality, 2020 may be seen as a turning point for mankind. And what about the future? We imagined that mankind - finally aware of its past - will reach a superior level of universal knowledge, and with that will be finally able to master the universe, and through a total understanding of life, love, nature and equality, bring balance to the world.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-toma-studio.jpg",
  },
  {
    value: "4",
    suit: "diamonds",
    artist: "maria-kulinskaya",
    info:
      "When humanity disappears the world will change. Only robots will remain on the earth. They will start developing technologies and building civilization anew. Robots will enter into symbiosis with a peculiar post-apocalyptic nature. Therefore, my illustration depicts a robot that plays 8-bit games on old-fashioned computer.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/maria-kulinskaya.jpg",
  },
  {
    value: "4",
    suit: "hearts",
    artist: "luis-pinto",
    info:
      "In the future humans learn that in order to evolve in a positive way they’ve to study a lot (even more) about the relationship between nature + technology as one to create a powerful impact on our planet. Thanks to this immense wisdom new generations are able to find sustainable-innovative solutions to coexist in this world as well as new scientific breakthroughs that will change the way we see, perceive and design our universe.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-luis-pinto.jpg",
  },
  {
    value: "4",
    suit: "spades",
    artist: "manuel-kilger",
    info:
      "The idea of my illustration is an idealistic future world, where all existential problems of humanity are solved. A world where humans, nature and technology coexist peacefully and ecologically in perfect symbiosis.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-manuel-kilger.jpg",
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
  },
  {
    value: "5",
    suit: "hearts",
    artist: "evgenia-makarova",
    info:
      "'Ambassadors from different countries are admitted to the residence of the king' — one of the values of the 5 hearts that I found. This metaphor can mean the need for humanity to accept distinct life forms as equal or even superior. What if in the future, artificial intelligence will develop the capacity for empathy and love? How will they see the difference in the level of consciousness between humanity, the animal and plant world, and themselves. And what will they feel about it? Perhaps the roles may change.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/evgenia-makarova.jpg",
  },
  {
    value: "5",
    suit: "spades",
    artist: "antonio-uve",
    info:
      "The future will be tough if we keep treating the planet as we are, pollution will be an even bigger issue for us and a breeze of fresh air will be a luxury from the past. We tend to imagine the future in outer space but I think we will stuck here on Planet Earth wearing spacesuits for protection from air polluted, although with a touch of sophistication as I tried to illustrate here.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-antonio-uve.jpg",
  },
  {
    value: "6",
    suit: "clubs",
    artist: "javier-perez",
    info:
      "In 100 years the wind energy will be normal as the electric light. It has become a key electricity generation resource for the transformation of the energetic model, cleaner and more sustainable.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-javier-perez.jpg",
  },
  {
    value: "6",
    suit: "diamonds",
    artist: "andrea-bojkovska",
    info:
      "In 100 years, as technology takes over even more, an optimistic thought is that humans will finally focus more on environment care, self improvement and love. The technology will enable also the option to send our characters as clones to achieve some challenges, while we are focused on others. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andrea-bojkovska.jpg",
  },
  {
    value: "6",
    suit: "hearts",
    artist: "ana-gomez-bernaus",
    info:
      "As a graphic designer and lettering artist the first concepts that came to my mind regarding this card are balance, harmony and symmetry. The number six is an even number and when combined with the heart as the amount of elements in a composition it quickly draws a balanced structure. Formally, the 6 resembles the link of a chain, and that made me think of the idea that we are all linked within 6 degrees of separation, therefore, it's a number that we currently use to describe connection, but we do it on the basis of distance. March 2020 will always be remembered as the time where we all had to stay away from each other, but it has also made evident the desire we all have to stay together. I have been video conferencing with friends and family more than ever. Based on this experience, I envision a future where technology allows us to get together over any distance to collaborate, inspire and support each other. I envision a future where we are all united by six steps of connection.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ana-gomez-bernaus.jpg",
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
  },
  {
    value: "7",
    suit: "spades",
    artist: "fran-labuschagne",
    info: "The future will still be beating to the same rhythm.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-fran-labuschagne.jpg",
  },
  {
    value: "8",
    suit: "clubs",
    artist: "ryan-coleman",
    info:
      "Corporation MEGACORP knows you're tired of the same stale bottled and recycled air. Breathe new life into your day with Flora® — the all-natural eco-approach to the oxygen generation. Featuring a sleek and efficient tank design as well as stylish Old Earth looking plants, you will have your own private oasis on the Space Train to the Cosmic Mines. Pre-order today to receive your complementary OxySpheres® to add even more 'freshness' to your breathing experience.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ryan-coleman.jpg",
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
  },
  {
    value: "8",
    suit: "hearts",
    artist: "peter-cobo",
    info:
      "I've been a big fan of science fiction since I was a kid. Maybe in 100 years, technology will have advanced enough to colonize other planets. Inspired by authors like Bradbury, Huxley or Orwell, I imagine humanity being able to travel light-years away to discover new planets and, who knows, new intelligent life as well. Because, 'If it’s just us, seems like an awful waste of space'.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-peter-cobo.jpg",
  },
  {
    value: "8",
    suit: "spades",
    artist: "noonmoon",
    info:
      "In the distant future, sea level may have risen so high that even New York’s famous Statue of Liberty’s head is barely above water.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/noonmoon.jpg",
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
  },
  {
    value: "9",
    suit: "hearts",
    artist: "maria-fedoseeva",
    info:
      "'Please don't forget to recharge your mask and update your heart before you leave your underground shelter'. The topic of the new deck is the future. I decided to make a romantic illustration showing preparations before going to a date.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-maria-fedoseeva.jpg",
  },
  {
    value: "9",
    suit: "spades",
    artist: "victor-vergara",
    info:
      "I imagine a positive and hopeful world, where technology is in charge of taking care of the nature and the nature takes advantage of the technology. I imagine a world in a sustainable balance in terms of time, color, beauty and completely aware of the interdependecy principle.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-victor-vergara.jpg",
  },
  {
    value: "10",
    suit: "clubs",
    artist: "alex-pogrebniak",
    info:
      "People living in the rhythm of a progressive 21st century often remember events of the past, where everything seemed to be simple and clear. While creating this illustration, I was inspired by the ideas of retrofuturism. I'm sure that in the future there will be muscle cars, rock-and-roll and minutes for fun too. I would like to see the future with optimism.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/alex-pogrebniak.jpg",
  },
  {
    value: "10",
    suit: "diamonds",
    artist: "xave",
    info:
      "The future is a projection of our imagination since the moment you are reading this, it becomes the Present. Otherwise Robots and space fields.",
    img: "https://s3.amazonaws.com/img.playingarts.com/future/cards/xave.jpg",
  },
  {
    value: "10",
    suit: "hearts",
    artist: "ilyas-bentaleb",
    info:
      "As a huge fan of cyberpunk I wanted to express my current view of what's happening with the lockdown & traveling it to the future using biological engineered heart glowing underneath, creating a letter V that forms an X with the puddle's reflection which means 10 in roman numerals. As I see that it will be more challenging stuff in the future but the key is to support each other and seeking knowledge to be ahead of problems themselves.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/ilyas-bentaleb.jpg",
  },
  {
    value: "10",
    suit: "spades",
    artist: "muti",
    info:
      "Time travel has given the human race an opportunity to journey deeper into space than ever. The discovery on new planets has revealed many viable options for colonisation. ",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-muti.jpg",
  },
  {
    value: "jack",
    suit: "clubs",
    artist: "andra-popovici",
    info:
      "In 2120 the face of humanity has changed. The overgrowing human population with an overconsumption based mindset has been the main catalyst for speeding up the sixth mass extinction, therefore darker consequences started to picture a grim future for the entire human species. The massive loss of wildlife and the high volume of deforestation of the Earth’s rainforests has brought unimaginable destruction transforming almost 40% of Earth's surface into a completely uninhabitable environment. A series of deadly viruses and epidemics, chained earthquakes and heavy tectonic plate movements followed by the great Krakatoa volcanic eruption in 2062, decimated the Earth’s population, putting the entire human civilization on the brink of extinction. The United Earth Consortium’s contingency plan to revitalize and maintain the life on Earth is deemed as a complete failure, being unable to provide sustainable and practical application of Lem’s theorem. At the same time, relocating on Mars was no longer a viable option due to the negative effects on the human body brought by prolonged exposure to solar radiation traveling through the Enselm Corridor, as it seems there is literally no escape. The entire fate of humanity lies now in the hands of a small group of rebel scientists that have managed to alter the genetic information of a carefully selected group of subjects, only four in the entire world. Rising from all the bad humanity has caused thus far, these individuals will be genetically modified in order to be able to access a higher level of intelligence, unimaginable by any standards up to this point. Each of the four individuals (Clubs, Spades, Heart, and Diamonds) has unique and specific abilities that allow them to find viable solutions to restore nature and wildlife and to elevate the entire civilization to new unimaginable heights in technology. The tradeoff for this superpower is that their lifespan was dramatically reduced by 12 years, making them known as the group of Sacrificial Twelve. With these abilities, the plans, the ideas, and the pure knowledge that resulted were astonishing, elevating the entire civilization to new unimaginable heights in technology. As a result, all efforts were redirected into the conservation and preservation of the little that was still left. With the help of super-evolved science and technology, robotic insects, and lab-made miniature creatures, the year 2120 became a solid target of reversing the negative effects. Meat consumption has been legally banned throughout the entire remaining population and conserving Earth’s resources became the new paradigm of human civilization. Planet Earth is reborn, humanity has a permanent shift into mentality focusing on conservation and respecting Earth's resources and the sixth mass extinction is successfully reversed.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-andra-popovici.jpg",
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
  },
  {
    value: "queen",
    suit: "diamonds",
    artist: "anna-kuptsova",
    info:
      "My queen of Diamonds illustration reflects the future hundred years from now as I imagine it would be. People will discover new technologies, develop new devices and interfaces. This will all ultimately lead to changes in our own physiology. I imagine we would achieve a sort of human and machine blending. And while it will give as more advanced capabilities, it surely will affect our perception of life. My main concern is if we will still possess our current level of humanity. Or if the ongoing race for physical improvement will take away a part of our inner world and everything that makes us human. I guess time will tell.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/anna-kuptsova.jpg",
  },
  {
    value: "queen",
    suit: "hearts",
    artist: "ruben-ireland",
    info:
      "THE QUEEN OF HEARTS 2120 - The Queen Of Hearts Watching over her biomechanical subjects, suffering the perpetual war between the beautiful irrationality of love and the inevitable psycopathy inherent in their AI. A battle she can neither escape inwardly as she wonders what it is that loves them. Her Self or her <c/god=given> Algorithm?",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-ruben-ireland.jpg",
  },
  {
    value: "queen",
    suit: "spades",
    artist: "one-horse-town",
    info:
      "Given that I got a Queen I thought I'd reflect on what the ruling elite might look like in a distant (admittedly rather bleak) future. I've imagined them linked up to levitating life support chairs, permanently plugged into a VR feed in which they exist in some kind of exclusive reality, while also using it to follow major events and communicate with their subordinates. I wanted to work with the shape of the spade and have it reflect in my design as much as possible.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-one-horse-town.jpg",
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
  },
  {
    value: "king",
    suit: "diamonds",
    artist: "raul-gil",
    info:
      "Diamonds in the French deck were generally linked to the economy and monarchy of the Middle Ages, being the card of the King of Diamonds someone powerful, rich and influential, king of kings and the economy at the same time. Who could play both roles in the future? Absolute sovereign of the economic functioning of the world. Ruler of all the invisible mechanisms that govern our society. Perhaps an artificial intelligence, raised as a higher entity? Always vigilant, always present, nothing escapes its control from its octahedral cubicle.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/raul-gil.jpg",
  },
  {
    value: "king",
    suit: "hearts",
    artist: "luna-buschinelli",
    info:
      "The image tells a story about a king that rules a kingdom inside his own head, as all of us do. For these endings he must find a balance between his heart and mind. The medieval castle is a critic against nowadays, as a suggestion that at the same time we are evolving on technology matters we are (many times) making the same old mistakes in history that our ancestors committed.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-luna-buschinelli.jpg",
  },
  {
    value: "king",
    suit: "spades",
    artist: "marcelo-anache",
    info:
      "I imagine a future where countries will need to come together in order to continue existing. The Covid-19 pandemic showed us that we are more interconnected and dependent on each other than we ever imagined. A new world order will need to be created. Countries will still be independent, but there will be global rules focused on preserving the human race and the world itself. To regulate this, we would need someone endowed with both human wisdom and robotic efficiency. A perfect match. Someone who could have compassion and humanity while making decisions, but also be tireless, accurate and 100% connected with everything and everyone, just like a machine. Someone with a human face to cause greater empathy, with an also human brain connected to the best computers in the world, maximizing its capacity, in addition to being filled with life provided by nature. A supreme being. A King of the Future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-marcelo-anache.jpg",
  },
  {
    value: "ace",
    suit: "clubs",
    artist: "patrycja-krawczyk",
    info:
      "Unfortunately, I assume that it will take so long before people change their approach to the exploitation of the land. Undoubtedly, many very expensive space projects will be created in the next 100 years. Even today we hear about plans to build the construction of bases on the Moon or the mission to populate Mars. But what about our Mother Earth? The current impact of Covid19 and quarantine reminds us of how much we need a healthy environment and a green, open space. Our land and its nature are the most important, we have nothing without it. I see Ace ♣ Clubs as a symbol of the power of nature and its value. It is our true wealth and this is our future.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/patrycja-krawczyk.jpg",
  },
  {
    value: "ace",
    suit: "diamonds",
    artist: "sergey-serebrennikov",
    info:
      "I love Art Deco style and I can’t stop creating my artworks inspired by that times. I was thinking about the people of 1920th, what were they dreaming about, how did they imagine the world in 200 years, how would they look like? It seems to me that even cyborg-girl may be in style of Art Deco.  Style and fashion make circles during the lifetime. Modern is well forgotten old fashion. So in 100 years it can be Art Deco rebirth. I am glad to share with you my artwork. I was inspired by the movie poster 'Metropolis' of that times and by the robot from my favorite movie 'Star Wars'.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/sergey-serebrennikov.jpg",
  },
  {
    value: "ace",
    suit: "hearts",
    artist: "iain-macarthur",
    info:
      "When I think of the distant future i imagine that technology has advanced to the point where it will be apart of us, augmented into us with nano chip implants and circuits integrated in our brains. These enhancements could be beneficial for those who are mentally or physically challenged, this could facilitate them with robotic limbs or treat brain diseases like Parkinson’s or epilepsy. It could even stretch further to even transferring the human consciousness into a machine, demising the risk of illnesses, diseases and prolong our lifespan.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/iain-macarthur.jpg",
  },
  {
    value: "ace",
    suit: "spades",
    artist: "dima-krab",
    info:
      "When it comes to a question 'what will change in 100 years' people may imagine the objects lit and flying and humans became androids. I shift the focus to the fundamental things like communication which is the way of interaction and brings the achievements wanted. I believe that the phenomenon of communication will stay still. We all need cooperation with each other and the nature to reach any of results or bring any idea to life. So the answer to the question above is nothing will change essentially. We will still be looking for the new meanings and trying to be in touch with each other in different ways.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/dima-krab.jpg",
  },
  {
    value: "joker",
    suit: "black",
    artist: "mitt-roshin",
    info:
      "I almost immediately came upon with this idea of a traditional for a card deck joker in the context of the future. In good old times Joker used to entertain a crowd on a square. But these days most of our entertainment take place online, in this digital reality, that is becoming even more real for us than everything that happens in the real life itself. So here is a joker form the future: not only he’s entertaining us, but also manipulating, monitoring, setting up the rules, influencing all our actions, wishes, and emotions. That’s how casually once a joker becomes a king.",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-mitt-roshin.jpg",
  },
  {
    value: "backside",
    suit: "backside",
    artist: "sebastian-onufszak",
    info: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/contest/retina/000.jpg?2",
  },
  {
    value: "joker",
    suit: "black",
    artist: "adnan-ali",
    info:
      "Cast aside as a meaningless vessel, the joker has lost its influence as a purposeful asset. Treated as obscure and useless, it slowly died from the inside and rotted away. Ignored by the royalty and valued as nothing by the society, it suffered a fate it did not deserve. But times change and so does fate. The jokers will return one day, as an undead horde, to take back the reputation that was one theirs. The vessel that was once hollow now has a green spark. And the purpose that was once unknown, has now become vengeance!",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/adnan-ali.jpg",
  },
  {
    value: "joker",
    suit: "red",
    artist: "dani-blazquez",
    info:
      "As if it were a science fiction story, what if the figure of the joker had transcended the icon and had become a key character in the cities of a dystopian future? An outsider. A kind of cyborg that mixes the classic outfit of a court minstrel with the most advanced technology in robotics",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-dani-blazquez.jpg",
  },
];

const dump = async () => {
  await connect();
  await Deck.deleteMany({ slug });
  // await createDeck(slug, deck, cards);
};

export default dump;
