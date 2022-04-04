import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

export const slug = "one";

export const deck: Omit<GQL.Deck, "_id"> = {
  title: "Edition One",
  short: "One",
  slug,
  info: "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
  image: "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_one.jpg",
  backgroundImage:
    "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_one_bg.jpg",
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
    artist: "tang-yau-hoong",
    info:
      "I wanted to create a surreal and conceptual illustration in a minimalist style. To me, 2 of clubs means two world- reality vs dream.",
    suit: "clubs",
    value: "2",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-clubs-tang-yau-hoong.jpg",
    video: "",
  },
  {
    artist: "yema-yema",
    info:
      "My work is very playful and colorful. I try to base any character on basic shapes like circles or squares and work my way up. My main focus in character design, creatures that even though they look a bit scary at times, they are still approachable and fun. For this project I wanted to focus in my 2 of diamond concept but also include my style and some character design. I wanted a “solid dominant” shape and lots of little things to come out of him.",
    suit: "diamonds",
    value: "2",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-diamonds-yemayema.jpg",
    video: "",
  },
  {
    artist: "peter-tarka",
    info: "",
    suit: "hearts",
    value: "2",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-hearts-peter-tarka.jpg",
    video: "",
  },
  {
    artist: "mattias-adolfsson",
    info:
      "I made the 2 of spades, the number two has always been my favorite number. I wanted to do a rather traditional playing card but I wanted to give the number two of spades some more tender love and care that the card usually get, being a low card.",
    suit: "spades",
    value: "2",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-spades-mattias-adolfsson.jpg",
    video: "",
  },
  {
    artist: "fernando-chamarelli",
    info: "",
    suit: "clubs",
    value: "3",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-clubs-fernando-chamarelli.jpg",
    video: "",
  },
  {
    artist: "carne-griffiths",
    info:
      "Using a familiar process whereby I let the materials dictate the piece – ’3 of Diamonds’ plays with the effects of optical distortion looking at glass or diamond as a metaphor for altered reality. The girl is lost within her distorted world, a world which is created and contained by her own thoughts.",
    suit: "diamonds",
    value: "3",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-diamonds-carne-griffiths.jpg",
    video: "",
  },
  {
    artist: "mercedes-debellard",
    info:
      "I choose 3 of hearts cause i really like this card (don´t ask me why). The idea was that it will be three hearts on the card, so i decided to draw a good one. The girl on the card is a good friend of mine.",
    suit: "hearts",
    value: "3",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-hearts-mercedes-debellard.jpg",
    video: "",
  },
  {
    artist: "teagan-white",
    info:
      "I’ve drawn the bodies of three starlings tangled in poppy plants. My card was the 3 of spades, and the suit of spades has always seemed ominous and dark to me — I frequently try to depict death and decay in a beautiful way in my drawings, and took this as an opportunity to continue that. I read that spades are the equivalent of the suits of swords and leaves in other types of decks, associated with the element of air, and sometimes symbolic of sickness and disappointment. I tried to take all of these factors into consideration when choosing my subject matter, as well as to create the composition out of groups of three — three starling, three large flowers, etc.",
    suit: "spades",
    value: "3",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-spades-teagan-white.jpg",
    video: "",
  },
  {
    artist: "muti",
    info: "",
    suit: "clubs",
    value: "4",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/4-of-clubs-muti.jpg",
    video: "",
  },
  {
    artist: "peter-olschinsky",
    info: "",
    suit: "diamonds",
    value: "4",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/4-of-diamonds-peter-olschinsky.jpg",
    video: "",
  },
  {
    artist: "ruben-ireland",
    info:
      "I like to explore the natural world, which also means discovering the more basic make-up of humans, wether in the throws of love or hate, possessed by loss and suffering or awake in a moment of peace. The girl in ‘Four of Hearts’ hunts for lovers like prey. It won’t be until her fourth victim perishes from the wound of her loving arrow, that she’ll realise that she can’t hunt for love, but embody it with peace and kindness and allow it to find her instead.",
    suit: "hearts",
    value: "4",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/4-of-hearts-ruben-ireland.jpg",
    video: "",
  },
  {
    artist: "serial-cut",
    info: "",
    suit: "spades",
    value: "4",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/4-of-spades-serial-cut.jpg",
    video: "",
  },
  {
    artist: "valerie-ann-chua",
    info:
      "I picked the Clubs card because it’s a symbol that’s close to nature. In some texts, they mention that Clubs can also mean flowers, clovers or crosses, and in the Tarot-universe, the symbol is associated to air. I like nature and birds a lot and I felt that it’s a little apt for the card.",
    suit: "clubs",
    value: "5",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/5-of-clubs-valerie-ann-chua.jpg",
    video: "",
  },
  {
    artist: "fab-ciraolo",
    info: "",
    suit: "diamonds",
    value: "5",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/5-of-diamonds-fab-ciraolo.jpg",
    video: "",
  },
  {
    artist: "aitch",
    info:
      "The 5 of hearts seems to me a very animated mix of symbolism, that s why i imagined it to be a vibrant scene of colourful beasts and flora.",
    suit: "hearts",
    value: "5",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/5-of-hearts-aitch.jpg",
    video: "",
  },
  {
    artist: "musketon",
    info:
      "Jebus is equally awesome as Jesus but had a more rock and roll vibe to it. Jebus started out as a character of mine a year ago. I made 2 very detailed vector illustrations of him, now I’m sharing him with the rest of the world via this card.",
    suit: "spades",
    value: "5",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/5-of-spades-musketon.jpg",
    video: "",
  },
  {
    artist: "tobias-van-schneider",
    info:
      "I got inspired by the meaning behind the 6 of Club “Messenger’s Card” – Let me quote: “All Six of Club feel an obligation toward duty and they take their responsibilities seriously. Trouble is, the 6 of Club also symbolize inertia.” Essentially Inertia is the resistance of any physical object to any change in its motion (including a change in direction) from a physics perspective. In other words, it is the tendency of objects to keep moving in a straight line at constant linear velocity, or to keep still. The principle of inertia is one of the fundamental principles of classical physics that are used to describe the motion of objects and how they are affected by externally applied forces. In my example I wanted to combine my love to space/universe with one of the moments of inertia, in this case showing a sphere(shell).",
    suit: "clubs",
    value: "6",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/6-of-clubs-tobias-van-schneider.jpg",
    video: "",
  },
  {
    artist: "vasava",
    info: "",
    suit: "diamonds",
    value: "6",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/6-of-diamonds-vasava.jpg",
    video: "",
  },
  {
    artist: "jilipollo",
    info:
      "I always have been fascinated by 70’s icons and stuff, so I was looking through images that may inspire me or give me an idea for this card. At the same time, I started sketching trying to come up with ideas. Then I remembered there was this old movie from the 70’s called “Unholy rollers”. I love the look of these vintage girls, so this, obviously, is what made me come up with the idea of a roller fighting to be the best of the 6 hearts while she defeat the rest of these girls. Maybe she is trying to give her heart to you ;) I then collected a bunch of documentation images… I finally made the final sketch. This is one of the most important parts. …and finally the technique application. In this case, watercolour. Done!",
    suit: "hearts",
    value: "6",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/6-of-hearts-javier-medellin-puyou.jpg",
    video: "",
  },
  {
    artist: "fernando-volken-togni",
    info:
      "I’ve drawn a knight which holds and protects the six blades/swords which represent nobility.",
    suit: "spades",
    value: "6",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/6-of-spades-fernando-volken-togni.jpg",
    video: "",
  },
  {
    artist: "krzysztof-chkn-nowak",
    info: "",
    suit: "clubs",
    value: "7",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/7-of-clubs-krzysztof-nowak.jpg",
    video: "",
  },
  {
    artist: "matt-w.-moore",
    info:
      "For the Seven-Of-Diamonds I chose to make a Diamond-Of-Sevens. It is somewhat of an ambigram since it reads the same when viewed from either perspective. It was fun to make the interlocking typography slightly cryptic yet still very legible upon closer inspection.",
    suit: "diamonds",
    value: "7",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/7-of-diamonds-matt-w-moore.jpg",
    video: "",
  },
  {
    artist: "felix-laflamme",
    info:
      "My original idea was to represent the seven main energy centers of the body and having each of them represented by a gem. The Heart, which is the emblem of the suit I chose, Is the main focus of the artwork. The Skeleton character of my card express a dying human race or society in general. He is doing the heart shape with his hands to encourage all of us to use the power of love, spread it all around and create a better world for the future. The Key is inside all of us.",
    suit: "hearts",
    value: "7",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/7-of-hearts-felix-laflamme.jpg",
    video: "",
  },
  {
    artist: "muxxi",
    info: "",
    suit: "spades",
    value: "7",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/7-of-spades-muxxi.jpg",
    video: "",
  },
  {
    artist: "el-grand-chamaco",
    info: "",
    suit: "clubs",
    value: "8",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/8-of-clubs-el-grand-chamaco.jpg",
    video: "",
  },
  {
    artist: "jthree-concepts",
    info: "",
    suit: "diamonds",
    value: "8",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/8-of-diamonds-jthree-concepts.jpg",
    video: "",
  },
  {
    artist: "raul-urias",
    info: "",
    suit: "hearts",
    value: "8",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/8-of-hearts-raul-urias.jpg",
    video: "",
  },
  {
    artist: "gary-fernández",
    info: "",
    suit: "spades",
    value: "8",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/8-of-spades-gary-fernandez.jpg",
    video: "",
  },
  {
    artist: "chuck-anderson",
    info: "",
    suit: "clubs",
    value: "9",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/9-of-clubs-chuck-anderson.jpg",
    video: "",
  },
  {
    artist: "pirecco",
    info:
      "The idea of my project was to work with an observation drawing and making a connection with the number of my card. So, I decided to draw my hands, where the sum of the fingers results in the number nine. To erase some parts of the drawing that I did not like, I used collage with craft paper.",
    suit: "diamonds",
    value: "9",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/9-of-diamonds-pirecco.jpg",
    video: "",
  },
  {
    artist: "carlos-lerma",
    info:
      "When doing my research I found that the 9 of Hearts card is related to wish fulfillment, specifically those wishes of an emotional nature and involving interpersonal relationships. I wanted to convey that longing for a wish to be granted, like a prayer, and I also included 9 different hearts in the character in different parts.",
    suit: "hearts",
    value: "9",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/9-of-hearts-carlos-lerma.jpg",
    video: "",
  },
  {
    artist: "anton-repponen",
    info:
      "I was very honored to be invited for the second time to be par of the collaborative project Playing Arts, where 54 extremely talented illustrators and designers together create a deck of playing cards. This year I got to draw 9 of Spades. I actually spent a lot of time thinking about the layout and how to position nine spade symbols in an interesting way and not to keep em flat. Here are some of the original sketches from the notebook. I didnt quite know which direction to go. I knew I wanted to have an isometric grid and play with 3 dimensions of it to position elements. First, I wanted to use shape on the number nine as a base and layout other elements around it. So I put together a grid in Photoshop and started to work around it. I also wanted to stick with just 2 colors this time too. At some point I decided to stick with a building idea and illustrate an utopian high rise apartment building that had an abandoned billboard on the roof top. I somehow saw the spades symbols as pills, so the banner shows three of them on the tongue. And number nine was treated in the other dimension/angle as a neon sign on the building, a welcome to a hotel or some other nasty joint.",
    suit: "spades",
    value: "9",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/9-of-spades-anton-repponen.jpg",
    video: "",
  },
  {
    artist: "hey",
    info: "",
    suit: "clubs",
    value: "10",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/10-of-clubs-hey.jpg",
    video: "",
  },
  {
    artist: "lei-melendres",
    info: "",
    suit: "diamonds",
    value: "10",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/10-of-diamonds-lei-melendres.jpg",
    video: "",
  },
  {
    artist: "caramelaw",
    info:
      "We see Captain Gumball Coner here from the land of Candy. All the 10 hearts we see in his head so indicates that he’s filled with love and lots to give. Every time he dispenses a one of his ‘loves’, another heart will generate within so rest assured, its always 10 of hearts within his shiny glass head. He’s well respected and all the candy critters love him.",
    suit: "hearts",
    value: "10",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/10-of-hearts-caramelaw.jpg",
    video: "",
  },
  {
    artist: "bicicleta-sem-freio",
    info: "",
    suit: "spades",
    value: "10",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/10-of-spades-bicicleta-sem-freio.jpg",
    video: "",
  },
  {
    artist: "bakea",
    info: "",
    suit: "clubs",
    value: "jack",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/jack-of-clubs-bakea.jpg",
    video: "",
  },
  {
    artist: "newfren",
    info: "",
    suit: "diamonds",
    value: "jack",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/jack-of-diamonds-newfren.jpg",
    video: "",
  },
  {
    artist: "steve-simpson",
    info: "",
    suit: "hearts",
    value: "jack",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/jack-of-hearts-steve-simpson.jpg",
    video: "",
  },
  {
    artist: "seb-niark1",
    info: "",
    suit: "spades",
    value: "jack",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/jack-of-spades-seb-niark1.jpg",
    video: "",
  },
  {
    artist: "ise-ananphada",
    info:
      "Queen of the club is showing the Equality of the two ladies that represent for the women’s strength. In my opinion, I want to present it as more illustration and more fashionable without loss of their old meaning.",
    suit: "clubs",
    value: "queen",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/queen-of-clubs-ise-ananphada.jpg",
    video: "",
  },
  {
    artist: "agnes-cecile",
    info:
      "The queen of diamonds was the subject that best fit with my subjects, in my gallery there are already a lot of ladies with geometrical shapes. I should make their queen. So I thought to a diamond near to me, a faceted diamond created by geometric games. It’s a rough diamond, as the young queen that I decide to create, dressed as a queen trough the jewelry, but under this crown there is still a child.",
    suit: "diamonds",
    value: "queen",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/queen-of-diamonds-agnes-cecile.jpg",
    video: "",
  },
  {
    artist: "conrad-roset",
    info:
      "I chose the Queen of hearts card because I thought that its the one that fits bettter with my style. Its very feminine, and I always like to draw female body and my muses.",
    suit: "hearts",
    value: "queen",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/queen-of-hearts-conrad-roset.jpg",
    video: "",
  },
  {
    artist: "david-mack",
    info: "",
    suit: "spades",
    value: "queen",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/queen-of-spades-david-mack.jpg",
    video: "",
  },
  {
    artist: "james-white",
    info:
      "Being a kid of the 80s, I’m always fired up to do something with that rockin’ retro vibe. My King of Clubs is no different. I originally set out to do something character-based, but I quickly reverted to illustrating a more straight-forward approach… with the club symbol sporting a crown. I dove into some research material from the 80s era to properly capture the colour and aesthetic.",
    suit: "clubs",
    value: "king",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/king-of-clubs-james-white.jpg",
    video: "",
  },
  {
    artist: "saturno",
    info:
      "Poker is a game where the details and wit are present, each person pretends to have something that basically does not have , and do not want other players to know who has, or otherwise. With this work what I understand , in this case, is that the monster could not impersonate authentic king , however great the crown, it is not a king, is a monster who only thinks about eating and drooling.",
    suit: "diamonds",
    value: "king",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/king-of-diamonds-saturno-the-creatter.jpg",
    video: "",
  },
  {
    artist: "sara-blake",
    info: "",
    suit: "hearts",
    value: "king",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/king-of-hearts-sara-blake.jpg",
    video: "",
  },
  {
    artist: "yulia-brodskaya",
    info:
      "I wanted to create a kind of ironic image of a king and I hope the audience will notice the little details that I incorporated into the artwork in order to achieve this. I really don’t want to be too descriptive here, I’m interested to know what people see in this work.",
    suit: "spades",
    value: "king",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/king-of-spades-yulia-brodskaya.jpg",
    video: "",
  },
  {
    artist: "andreas-preis",
    info: "",
    suit: "clubs",
    value: "ace",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/ace-of-clubs-andreas-preis.jpg",
    video: "",
  },
  {
    artist: "jordan-debney",
    info:
      "Psychedelic. In your face. There is nothing more fun than taking a simple concept and ruining it with how it can possibly be manipulated with my imagination.",
    suit: "diamonds",
    value: "ace",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/ace-of-diamonds-jordan-debney.jpg",
    video: "",
  },
  {
    artist: "mr-kone",
    info:
      "Is the reinterpretation of love as view from our tradition, because we love all things and passionately believe that love is a feeling so passionate that we could even die for that reason. Since childhood I learned that when you want something so much, death itself can not part with it, death is only the way to the creation of new life. And it’s something that we see not grudgingly but joyfully.",
    suit: "hearts",
    value: "ace",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/ace-of-hearts-mr-kone.jpg",
    video: "",
  },
  {
    artist: "iain-macarthur",
    info: "",
    suit: "spades",
    value: "ace",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/ace-of-spades-iain-macarthur.jpg",
    video: "",
  },
  {
    artist: "mike-friedrich",
    info:
      "I decided to choose the black joker! Why? Check my artworks -> the Harlequin/Joker is one of my well known MainCharacters. For me the harlequin/joker shows our society in a straight way! We have to smile, we have to be friendly unless the society give a shit on each person and the thoughts behind the faces! We just want to see the smiley faces without deeper stuff of each human. Poor society…",
    suit: "black",
    value: "joker",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/joker-mike-friedrich.jpg",
    video: "",
  },
  {
    artist: "evgeny-kiselev",
    info:
      "The main idea was quite simple - to make something striking and eye-catching.",
    suit: "",
    value: "backside",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/_backside-evgeny-kiselev.jpg",
    video: "",
  },
  {
    artist: "joshua-davis",
    info: "",
    suit: "red",
    value: "joker",
    deck: "one",
    opensea: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/joker-joshua-davis.jpg",
    video: "",
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards);
};

export default dump;
