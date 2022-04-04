import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

export const slug = "three";

export const deck: Omit<GQL.Deck, "_id"> = {
  title: "Edition Three",
  short: "Three",
  slug,
  info: "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
  image:
    "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_three.jpg",
  backgroundImage:
    "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_three_bg.jpg",
  properties: {
    size: "Poker, 88.9 × 63.5mm",
    inside: "52 Playing cards + 3 Jokers + Info card",
    material: "Bicycle® paper with Air-cushion finish",
  },
  description:
    "Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!",
};

export const cards = [
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/2-of-clubs-riccardo-guasco.jpg",
    video: "",
    opensea: "",
    artist: "riccardo-guasco",
    suit: "clubs",
    deck: "three",
    info:
      "I wanted to do an homage to the Cezanne’s painting “The Card Players 1894–1895”, one of the works that started the idea of Cubism in art history.",
    value: "2",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/2-of-dimonds-zooka.jpg",
    video: "",
    opensea: "",
    artist: "zooka",
    suit: "diamonds",
    deck: "three",
    info:
      "I like to draw the monsters which have two faces. so when I was given number 2 diamonds, It matched well with the concept. Basically I wanted to create really unique, mysterious, wicked character and have cute appearance monster.",
    value: "2",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/2-of-hearts-wade-jeffree.jpg",
    video: "",
    opensea: "",
    artist: "wade-jeffree",
    suit: "hearts",
    deck: "three",
    info:
      "Two of hearts! Two hearts that beat as one! I really love the song Two Of Hearts by Stacey Q. It’s catchy, kitschy and has a lots of positive vibes. I could sing it all day! I’m also a huge fan of the movie Hot Rod, which features a hilarious scene featuring the song.",
    value: "2",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/2-of-spades-kate-ohara.jpg",
    video: "",
    opensea: "",
    artist: "kate-ohara",
    suit: "spades",
    deck: "three",
    info:
      "I drew a pair of Genets raiding a birds nest. Most of my work incorporates natural elements and I like to draw animals that are not know very well. The Genet is a small fox like carnivore that lives in Spain and some areas of Europe. I also wanted to make sure my card was reversible like a traditional face card.",
    value: "2",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-clubs-david-mcleod.jpg",
    video: "",
    opensea: "",
    artist: "david-mcleod",
    suit: "clubs",
    deck: "three",
    info:
      "I actually chose this card at random. However after I did a little research I discovered that according to tarot card readings, people who have the 3 of clubs as their birth card are apparently bright, magnetic and very indecisive people. I took this as inspiration for the piece in creating the jumbled composition clustered around the obscured 3 club symbols.",
    value: "3",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-dimonds-burnt-toast-creative.jpg",
    video: "",
    opensea: "",
    artist: "burnt-toast-creative",
    suit: "diamonds",
    deck: "three",
    info:
      "My work is combination of playfulness and cynicism. Although it may appear organic it is actually built on a very mathematical structure. This piece was designed and built within the diamond shape.",
    value: "3",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-hearts-dan-matutina.jpg",
    video: "",
    opensea: "",
    artist: "dan-matutina",
    suit: "hearts",
    deck: "three",
    info:
      "I was trying to be “punny” with this particular illustration. Since I got the 3 of hearts, I thought why not create a “Tree of Hearts” emblem. Hahahaha. In the Lord of the Rings, Gondor one of the great kingdoms of Men had a White Tree as their emblem.",
    value: "3",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-spades-antonio-rodrigues-jr.jpg",
    video: "",
    opensea: "",
    artist: "antonio-rodrigues-jr",
    suit: "spades",
    deck: "three",
    info: "",
    value: "3",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/4-of-clubs-victor-vergara.jpg",
    video: "",
    opensea:
      "This artwork called Glasswinged butterfly is inspired by feminine sensuality and delicacy, nature, peace and magic.",
    artist: "victor-vergara",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "4",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/4-of-dimonds-edgar-rozo.jpg",
    video: "",
    opensea:
      "4 of diamonds, was based on the beatles song “lucy in the sky with diamonds”, i interpret it as the death, like a beauty girl in the sky.",
    artist: "edgar-rozo",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "4",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/4-of-hearts-tobias-hall.jpg",
    video: "",
    opensea: "",
    artist: "tobias-hall",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "4",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/4-of-spades-inkration-studio.jpg",
    video: "",
    opensea: "",
    artist: "inkration-studio",
    suit: "spades",
    deck: "three",
    info:
      "2 elements + 1 spontaneous idea = guardian of 4 spades. Actually, when we thought about 4 spades, the most obvious was to play with 2 elements: spade and number 4. We tried to get answers for the following: How to combine them? How to present them in the most creative way? How to make understandable for player to know which card he take in his hand even within watching in its value.",
    value: "4",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/5-of-clubs-justin-poulter.jpg",
    video: "",
    opensea: "",
    artist: "justin-poulter",
    suit: "clubs",
    deck: "three",
    info:
      "I began researching the metasymbology of the 5 of Cubs. I found that the card symbolises a person that has the constant need to travel, discover new things, and a person that has a keenness for inquiry. This however has its negative effects too like jealousy and suspicion in people, especially partners. I wanted to show these positive and negative aspects using my own forms of symbolism for the viewer to decrypt and interporate in their own way.",
    value: "5",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/5-of-dimonds-leonardoworx.jpg",
    video: "",
    opensea: "",
    artist: "leonardoworx",
    suit: "diamonds",
    deck: "three",
    info:
      "I choosed 5 Diamonds card and it was confirmed! I would like to play with the idea of building up a Jewel made of abstract clothes fluids full of energy in a sunset light background, where 5 energetic diamonds are the “power supply” to all this surreal machine.",
    value: "5",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/5-of-hearts-bram-vanhaeren.jpg",
    video: "",
    opensea: "",
    artist: "bram-vanhaeren",
    suit: "hearts",
    deck: "three",
    info:
      "In a previous personal project I have been looking into a way to make letters sexy again. Why not apply this to numbers as well. The idea is to mislead the viewer into seeing a regular number, but at a second glare notice an appealing woman looking at the person. Maybe her look succeeds in getting the person attention and distract the player into a new dimension.",
    value: "5",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/5-of-spades-leandro-castelao.jpg",
    video: "",
    opensea: "",
    artist: "leandro-castelao",
    suit: "spades",
    deck: "three",
    info: "",
    value: "5",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/6-of-clubs-middle-boop-gordon-reid.jpg",
    video: "",
    opensea: "",
    artist: "middle-boop",
    suit: "clubs",
    deck: "three",
    info:
      "I wanted to use the 6 and the clubs symbol as the starting point and focal point for the artwork, for obvious reasons but I felt both are such strong graphic symbols (depending on what don’t you use for the 6) that I could really use these and work them into the piece. I knew that given the size, the piece would need to be striking and colourful but wanted to limit myself to a few colours and work around those chosen for the artwork. From there I just sketched out a load of different concepts and when I had my preferred option I got into the Mac to finish it off.",
    value: "6",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/6-of-dimonds-francisco-miranda.jpg",
    video: "",
    opensea: "",
    artist: "francisco-miranda",
    suit: "diamonds",
    deck: "three",
    info:
      "I’ve been always strongly inspired by nature. And birds are a part of nature that specifically always took my attention and admiration. This was the oportunity to create this 6 of diamonds paradise bird.",
    value: "6",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/6-of-hearts-man-tsun.jpg",
    video: "",
    opensea: "",
    artist: "man-tsun",
    suit: "hearts",
    deck: "three",
    info: "No heart, no game!",
    value: "6",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/6-of-spades-charis-tsevis.jpg",
    video: "",
    opensea: "",
    artist: "charis-tsevis",
    suit: "spades",
    deck: "three",
    info: "",
    value: "6",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/7-of-clubs-saddo.jpg",
    video: "",
    opensea: "",
    artist: "saddo",
    suit: "clubs",
    deck: "three",
    info:
      "I did a tiny bit of research about the symbolism of playing cards, it’s not the first time I played a bit with illustrating and interpreting cards. I have another series of works inspired by each of the Kings, of Clubs, Spades, Diamonds and Hearts, each with its own meaning, somehow overlapping with the four seasons. This time I illustrated The Seven of Clubs, and I read that the Sevens are the most spiritual cards of the deck, and this one in particular is connected with magic, creativity, spiritual knowledge. I was also inspired by the way the Seven of Wands in the Tarot cards looks like, with the seven sticks with tiny leaves on them. So I agreed to illustrate the Seven of Clubs as some sort of inspired magus, shaman, sitting, inhaling some magical vapors, with his eyes turned inside, surrounded by the seven wands, which in the Tarot card look very robust, very earthly, and in this illustration they bloom into these beautiful flowers. And visually I’m pretty fascinated and inspired by Islamic Art and Indian Miniatures lately, so the character is very reminiscent of that.",
    value: "7",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/7-of-diamonds-rafael-mayani.jpg",
    video: "",
    opensea: "",
    artist: "rafael-mayani",
    suit: "diamonds",
    deck: "three",
    info:
      "I read a couple of descriptions of what the 7 of Diamonds meant and most of them related it with money and power, so I thought I could represent it as a sort of Sheriff of Nottingham who steals everyone’s possessions. He is wrapped in a golden diamond that is almost like a cage.",
    value: "7",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/7-of-hearts-velvet-spectrum.jpg",
    video: "",
    opensea: "",
    artist: "velvet-spectrum",
    suit: "hearts",
    deck: "three",
    info:
      "This is literally came to me in the shower as i have a shower curtain with tattoo flash all over it. I noticed the elements of the anchor and rose resembled heart shapes, so i wanted to bring it to life in 3D like i have done with previous tattoo illustrations in the past.",
    value: "7",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/7-of-spades-aj-frena.jpg",
    video: "",
    opensea: "",
    artist: "aj-frena",
    suit: "spades",
    deck: "three",
    info: "",
    value: "7",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/8-of-clubs-andreas-preis.jpg",
    video: "",
    opensea: "",
    artist: "andreas-preis",
    suit: "clubs",
    deck: "three",
    info:
      "After creating almost exclusively animals for quite a while now, I wanted to do something else here. Earlier in my career I started with lots of portraits so I wanted to try this again - but with a lot more experience of course. I’ve also tried some little new things within my shading technique and I think it worked out quite well.",
    value: "8",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/8-of-diamonds-pierre-kleinhouse.jpg",
    video: "",
    opensea: "",
    artist: "pierre-kleinhouse",
    suit: "diamonds",
    deck: "three",
    info:
      "The 8 of diamonds represent power and powerful people. It’s also known as the card of fame and fortune. So I decided to represent it with a powerful animal (and one of my favourite) the bear. I like the idea of searching and finding your own “power source”, so this is what I was thinking about when creating this piece, if that makes any sense.",
    value: "8",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/8-of-hearts-amaia-arrazola.jpg",
    video: "",
    opensea: "",
    artist: "amaia-arrazola",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "8",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/8-of-spades-mike-perry.jpg",
    video: "",
    opensea: "",
    artist: "mike-perry",
    suit: "spades",
    deck: "three",
    info:
      "I love the infinite loop of the number 8. I have always been attracted to its power. This piece is a celebration of the Infinite 8.",
    value: "8",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/9-of-clubs-karol-banach.jpg",
    video: "",
    opensea: "",
    artist: "karol-banach",
    suit: "clubs",
    deck: "three",
    info:
      "It’s very simple, I have always loved music, so I;m trying to put the music theme on all my works. Here you have a jazz musician, walking and playing music. And the cards associate in my mind with night, stylish bars, where you can sit, drink whiskey and listen to jazz music.",
    value: "9",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/9-of-dimonds-ery-burns.jpg",
    video: "",
    opensea: "",
    artist: "ery-burns",
    suit: "diamonds",
    deck: "three",
    info:
      "Hmmm...my artwork is on the spectrum of graphic, trippy, soulful, and wonderfilled. The idea behind my playing card was a vision that came to me of a space dwelling diamond lord who travels through the universe, sucking planets dry of their precious minerals like a protein shake before you go to the gym.",
    value: "9",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/9-of-hearts-will-scobie.jpg",
    video: "",
    opensea: "",
    artist: "will-scobie",
    suit: "hearts",
    deck: "three",
    info:
      "I based my design around a cats’ nine lives and the symmetry of life and death.",
    value: "9",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/9-of-spades-jackson-alves.jpg",
    video: "",
    opensea: "",
    artist: "jackson-alves",
    suit: "spades",
    deck: "three",
    info: "",
    value: "9",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/10-of-clubs-jilipollo.jpg",
    video: "",
    opensea: "",
    artist: "jilipollo",
    suit: "clubs",
    deck: "three",
    info:
      "As I think it’s quite clear, I took the reference from Hokusai’s art piece “The Dream of the fisherman’s wife” and tried to make a tribute in a more occidental way. The composition of the piece (octopus head and girl’s hair, both with the shape of the “clubs” symbol) makes the reference of the card I was given, which is the 10 of clubs.",
    value: "10",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/10-of-dimonds-justin-maller.jpg",
    video: "",
    opensea: "",
    artist: "justin-maller",
    suit: "diamonds",
    deck: "three",
    info:
      "Wanted to have some fun with the diamond shape. Thought I’d incorporate it into the ’10’ as a structure.",
    value: "10",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/10-of-hearts-daniel-shaffer.jpg",
    video: "",
    opensea: "",
    artist: "daniel-shaffer",
    suit: "hearts",
    deck: "three",
    info:
      "When I set out to make the card I jumped around in a lot of different directions. I originally was planning on making an image that related to the metasymbology of the card. At one point I was going to create a portrait of Jane Fonda as the iconic character Barbarella, because I found out Jane Fonda was born as a 10 of Hearts. In the end I ditched that idea because it felt too stiff. I agreed to loosen up and create an image that wasn’t related to metasymbology, but rather my own inclination when I thought of the words “Ten of Hearts.” Somehow I got to the image you see here. If I could sum up the image in a few words it would be: An elf is helping a tree grow anew. A tree stump felt like a strong base for a stand alone image, and the elf and plants grew around it to create the final idea.",
    value: "10",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/10-of-spades-bratislav-milenkovic.jpg",
    video: "",
    opensea: "",
    artist: "bratislav-milenkovic",
    suit: "spades",
    deck: "three",
    info:
      "I was looking to find the way to make a fun twist on 10 spades card, by incorporating the original element (ten spades) into the artwork – so I thought of having a fun looking guy with spades for his braces.",
    value: "10",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/jack-of-clubs-mister-thoms.jpg",
    video: "",
    opensea: "",
    artist: "mister-thoms",
    suit: "clubs",
    deck: "three",
    info:
      "The initial idea was immediately to play as Jack and saw that the figure of the classic card is traditionally depicted as a man divided in two parts, I was inspired to play with the concept of the dual personality of the famous character Dr. Jekill & Mr. Hyde",
    value: "jack",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/jack-of-dimonds-alvaro-tapia-hidalgo.jpg",
    video: "",
    opensea: "",
    artist: "alvaro-tapia-hidalgo",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "jack",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/jack-of-hearts-roman-klonek.jpg",
    video: "",
    opensea: "",
    artist: "roman-klonek",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "jack",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/jack-of-spades-grzegorz-domaradzki.jpg",
    video: "",
    opensea: "",
    artist: "grzegorz-domaradzki",
    suit: "spades",
    deck: "three",
    info:
      "I wanted to have fun with this project, draw something I enjoy drawing, so I went with this sculpture-like fictional warrior.",
    value: "jack",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/queen-of-clubs-nikita-kaun.jpg",
    video: "",
    opensea: "",
    artist: "nikita-kaun",
    suit: "clubs",
    deck: "three",
    info: "",
    value: "queen",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/queen-of-dimonds-nicolle-florian.jpg",
    video: "",
    opensea: "",
    artist: "nicolle-florian",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "queen",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/queen-of-hearts-alessandro-pautasso.jpg",
    video: "",
    opensea: "",
    artist: "alessandro-pautasso",
    suit: "hearts",
    deck: "three",
    info:
      "The idea behind the artwork was to try not to illustrate a traditional Queen, I wanted to give her a more “natural” connotation, so I’ve tried to draw a crown made of abstract branches and twigs.",
    value: "queen",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/queen-of-spades-david-vicente.jpg",
    video: "",
    opensea: "",
    artist: "d.vicente",
    suit: "spades",
    deck: "three",
    info:
      "Before i design my card, i search some informations about the signification “Queen of Spades”. Queen of Spades: A malicious, dark woman, generally a widow. An unscrupulous woman. A very dark-haired woman. A cruel woman, one who interferes. For women, a betrayal by a good friend. For men, a woman who will use them for their own gain. Widowed or divorced woman; or a woman with Air predominating in her chart. Dark haired woman, seductive or unscrupulous, treachery, betrayal, malice, widow. Treachery, betrayal, malice; a widow or evil woman and death symbol… The concept was to create a design in the spirit and style of a card to play and represent a dangerous woman symbolizing death and the dark side of some women lend anything to happen to get the one they want. Playing cards and dice represent more or less the uncertainty of the intended.",
    value: "queen",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/king-of-clubs-angga-tantama.jpg",
    video: "",
    opensea: "",
    artist: "angga-tantama",
    suit: "clubs",
    deck: "three",
    info:
      "I think ’King’ has a originally strong character compared to the others, a leader. King of Clubs and my original character, Bluboo, have similar things. Bluboo wore a crown that could be related to King and Clubs represent many things for me, such as energy, happiness, flow, and creativity. I don’t know, i just like it.",
    value: "king",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/king-of-dimonds-skinpop-studio.jpg",
    video: "",
    opensea: "",
    artist: "raul-urias",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "king",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/king-of-hearts-denis-zilber.jpg",
    video: "",
    opensea: "",
    artist: "denis-zilber",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "king",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/king-of-spades-jonny-wan.jpg",
    video: "",
    opensea: "",
    artist: "jonny-wan",
    suit: "spades",
    deck: "three",
    info: "",
    value: "king",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/ace-of-clubs-omaraqil.jpg",
    video: "",
    opensea: "",
    artist: "omaraqil",
    suit: "clubs",
    deck: "three",
    info:
      "The Idea behind this visual is to show one of my favorite culture (Native Americans) elements and try to experiment with their cultural shapes & colors. Natives have very vibrant feel in their appearance so I mostly used their elements in my work, their Style and attitude is really fascinating me, so I am trying to illustrate their graphic values.",
    value: "ace",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/ace-of-dimonds-joan-tarrago.jpg",
    video: "",
    opensea: "",
    artist: "joan-tarragó",
    suit: "diamonds",
    deck: "three",
    info: "",
    value: "ace",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/ace-of-hearts-jesse-hernandez.jpg",
    video: "",
    opensea: "",
    artist: "jesse-hernandez",
    suit: "hearts",
    deck: "three",
    info: "",
    value: "ace",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/ace-of-spades-gmunk.jpg",
    video: "",
    opensea: "",
    artist: "gmunk",
    suit: "spades",
    deck: "three",
    info:
      "I wanted it to be a recognizable Spade - that was the most important part - that it fit in with the Card Type.. Beyond that I wanted to make it somewhat Optical Art inspired, and playing heavily on perspective.",
    value: "ace",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/joker-1-blackout-brother.jpg",
    video: "",
    opensea: "",
    artist: "blackout-brother",
    suit: "black",
    deck: "three",
    info:
      "i want to make something creepy in this contribution for Playing Arts project. Glad i was chosen to create the joker card. This idea suddenly came into my mind when they gave me this card. I love drawing skull and joker is the best match to create something creepy.",
    value: "joker",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/_backside-juan-diaz-faes.jpg",
    video: "",
    opensea: "",
    artist: "juan-diaz-faes",
    suit: "",
    deck: "three",
    info:
      "My intention from the beginning was to keep as strong aesthetic that have both the Spanish deck as the French trying to keep my drawing style.",
    value: "backside",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/joker-3-juan-diaz-faes.jpg",
    video: "",
    opensea: "",
    artist: "juan-diaz-faes-2",
    suit: "blue",
    deck: "three",
    info: "",
    value: "joker",
  },
  {
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/joker-2-wes-art-studio.jpg",
    video: "",
    opensea: "",
    artist: "wes-art-studio",
    suit: "red",
    deck: "three",
    info:
      "The Red Joker, for us women are the most important piece in the world. We try to design two joker women with our different styles (because we are two in the studio) and then incorporate them into the same layout using the same colour scheme. We wanted to keep the essence of the old joker cards with elements such as the hat, the skull rod, feathers and the make up.",
    value: "joker",
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards);
};

export default dump;
