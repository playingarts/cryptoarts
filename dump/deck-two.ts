import { connect } from "../source/mongoose";
import { createDeck } from "./_utils";

export const slug = "two";

export const deck: Omit<GQL.Deck, "_id"> = {
  title: "Edition Two",
  short: "Two",
  slug,
  info: "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
  image: "https://s3.amazonaws.com/img.playingarts.com/www/decks/deck_two.jpg",
  backgroundImage:
    "https://s3.amazonaws.com/img.playingarts.com/www/static/deck_two_bg.jpg",
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
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-clubs-jonathan-calugi.jpg",
    artist: "jonathan-calugi",
    value: "2",
    suit: "clubs",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-diamonds-jon-lau.jpg",
    artist: "jon-lau",
    value: "2",
    suit: "diamonds",
    info:
      "This is an illustration centered around the Korean mythological fox demon, the kumiho, as part of a larger in progress personal series. This piece specifically presents a more intimate characterization of the fox demon interacting with her family of foxes. I love foxes.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-hearts-maria-gronlund.jpg",
    artist: "maria-grønlund",
    value: "2",
    suit: "hearts",
    info:
      "Well, getting the card Two of Hearts and drawing the graphics for it on Valentine’s day had a sweet synchronicity that of course had to inspire the theme and style. The two hearts on the card resembles red roses/rose pedals and it looks as if you can look into the chambers of the hearts. The hearts look soft, fluid, organic. All very romantic of course.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/2-of-spades-fictive-artist.jpg",
    artist: "fictive-artist",
    value: "2",
    suit: "spades",
    info:
      "Accidentally, I’ve got the 2 of Spades. In my vision this card must be mystical, dark and a little bit enigmatic. I’ve decided to mix these features with a female character and this is how the final artwork has been created.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/3-of-clubs-tamer-koseli.jpg",
    artist: "tamer-köseli",
    value: "3",
    suit: "clubs",
    info:
      "The idea behind the artwork was trying to illustrate how “clubs” evolved throughout history and culture also what it means in terms of symbolism.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/3-of-diamonds-zipeng-zhu.gif",
    artist: "zipeng-zhu",
    value: "3",
    suit: "diamonds",
    info:
      "I got 3 ♦ Diamonds, so I try to combine the 3 hand gesture with 3 diamonds. Honestly at first I was thinking just using the diamonds to make a 3, then I felt it was too lazy. Then I was trying to play around with the hand gesture with a diamond in the middle, it still felt flat. I added a diamond behind the hand to pop it better then I SAW ANOTHER DIAMOND! So I started to redraw everything and to make sure it all lines up beautifully. (I’m a control freak...)",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/3-of-hearts-oscar-ramos.jpg",
    artist: "oscar-ramos",
    value: "3",
    suit: "hearts",
    info:
      "I always see the number 3 as a triangle, and when I received the assign- the 3 of hearts- was pretty obvious to me make a kind of love triangle, and a love triangle is always a little conflictive and sometimes bizarre. I don’t know why I use here just masculine characters, but definitely they are ambiguous, very different between them and slightly aggressive, maybe complicated in this situation... because three’s a crowd.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/3-of-spades-steven-wilson.jpg",
    artist: "steven-wilson",
    value: "3",
    suit: "spades",
    info:
      "It’s my take on the traditional representation of a 3 of Spades. I have been quite literal in the content but abstract and personal in the execution.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-clubs-jeff-rogers.jpg",
    artist: "jeff-rogers",
    value: "4",
    suit: "clubs",
    info:
      "The idea was pretty simple. I wanted to somehow combine the forms of the club and the number 4 in an interesting, beautiful way.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-diamonds-foreal.jpg",
    artist: "foreal",
    value: "4",
    suit: "diamonds",
    info:
      "The karma for the 4 of diamonds is overcoming of self. We are 4 people at Foreal at the moment and everyone has their own approach and style on design and illustration. We are constantly aiming towards overcoming our egos and work together as a whole rather than individuals towards a common goal. As the reflection of the objects complete each other they become a diamond shape. It’s a symbol on how we reflect on each other ideas and thoughts to make them complete and a whole.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-hearts-steve-simpson.jpg",
    artist: "steve-simpson",
    value: "4",
    suit: "hearts",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-spades-anton-repponen.jpg",
    artist: "anton-repponen",
    value: "4",
    suit: "spades",
    info:
      "Four ghosts each represent a Spade with fourth one enlightening and leading the way.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-clubs-mikey-burton.jpg",
    artist: "mikey-burton",
    value: "5",
    suit: "clubs",
    info:
      "Club sandwiches are the fanciest of sandwiches because they not only have frilly toothpicks, but also 3 slices of bread. The 5 of clubs is an elite inner circle of that club, and the sandwiches contain even more pomp and circumstance.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-diamonds-patrick-seymour.jpg",
    artist: "patrick-seymour",
    value: "5",
    suit: "diamonds",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-hearts-charles-williams.jpg",
    artist: "charles-williams",
    value: "5",
    suit: "hearts",
    info:
      "I’ve been playing with stripes a lot recently, using undulating movements to create 3D shapes, based on an isometric grid. I wanted the type to be both bold, and sort of subtle/recessive. The red stripe was a last minute (1am) addition.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/5-of-spades-gabriel-moreno.jpg",
    artist: "gabriel-moreno",
    value: "5",
    suit: "spades",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-clubs-migthy-short.jpg",
    artist: "mighty-short",
    value: "6",
    suit: "clubs",
    info:
      "I have based my artwork on 6 number layout, I have choose to used only red and black colours, it’s a combo I used in my personal works actually who match perfect with the classic playing cards tones.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-diamonds-ian-jepson.jpg",
    artist: "ian-jepson",
    value: "6",
    suit: "diamonds",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-hearts-freak-city.jpg",
    artist: "freak-city",
    value: "6",
    suit: "hearts",
    info:
      "The eyeball has been my trademark for quite some years, and i like to draw one in a composition whenever i can! Sometimes as a cartoon, sometimes as an icon, the point is to leave a mark with it. I chose to include some exotic yet fictionary plants, cause i like how wild and dense they look like. Drawing jungle is a good way to fight cold European winters.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/6-of-spades-zansky.jpg",
    artist: "zansky",
    value: "6",
    suit: "spades",
    info:
      "Well, I collect tarot decks, so the idea of my card came from the tarot. The 6 of spades is a card to represent transition, changings, knowing a new world, ideas, feelings and elsewhere. Basically I reinterpreted this ideas.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-clubs-adhemas-batista.jpg",
    artist: "adhemas-batista",
    value: "7",
    suit: "clubs",
    info:
      "My piece represents the many facets of sin and the relationship with gambling.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-diamonds-sakiroo.jpg",
    artist: "sakiroo",
    value: "7",
    suit: "diamonds",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-hearts-antoni-tudisco.jpg",
    artist: "antoni-tudisco",
    value: "7",
    suit: "hearts",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/7-of-spades-chocotoy.jpg",
    artist: "choco-toy",
    value: "7",
    suit: "spades",
    info:
      "The idea came from a biblical Word, where it explain how Jesus will come for the second time, he will show on a White horse with a White and shinny dress, with a sword in the hand and a Crown in the head. It speaks that the one that was called by love will come this time on a horse from the heaven with a White dress, a sword and a Crown to make justice, so we make a representation with our own style to describe this prophetic Word. With a research, we realize that the number seven it’s the number of perfection and the sword is associated to the divine Word.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-clubs-zutto.jpg",
    artist: "zutto",
    value: "8",
    suit: "clubs",
    info:
      "On the one hand this’s the road among the hills and future-looking landscape, on the other hand this’s the infinity sign. So basically I’d describe it as the metaphor of endless journey :)",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-diamonds-mathis-rekowski.jpg",
    artist: "marubu",
    value: "8",
    suit: "diamonds",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-hearts-van-orton-design.jpg",
    artist: "van-orton-design",
    value: "8",
    suit: "hearts",
    info:
      "We liked the idea of a wolf standing guard at a mega vintage synthesizer, a synthesizer that no one has ever played. Only the wolf knows the sound of the synthesizer. An image of a little dream that inspires us a lot.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-spades-rubens-scarelli.jpg",
    artist: "rubens-scarelli",
    value: "8",
    suit: "spades",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-clubs-skinpop-studio.jpg",
    artist: "raul-urias",
    value: "9",
    suit: "clubs",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-diamonds-viktor-miller-gausa.jpg",
    artist: "viktor-miller-gausa",
    value: "9",
    suit: "diamonds",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-hearts-irina-vinnik.jpg",
    artist: "irina-vinnik",
    value: "9",
    suit: "hearts",
    info:
      "I wanted to make an allusion to a figure of Don Juan, because he is able to collect as many hearts together. Therefore 9 hearts impaled on a sword and shrouded in a cloak.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/9-of-spades-pichet-rujivararat.jpg",
    artist: "pichet-rujivararat",
    value: "9",
    suit: "spades",
    info:
      "My brief is to develop art piece from “Nine Spade”. What come in my mind the first thing is “Cat”. In Thailand, we believe that cat is one of the animal that has the longest life some says cat has nine life. Therefore, this is what inspired me to create this art. I also use illusion technique to create a picture of cat in two character so the audience could look at my work from both side.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-clubs-mike-creative-mints.jpg",
    artist: "mike-creative-mints",
    value: "10",
    suit: "clubs",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-diamonds-kerby-rosanes.jpg",
    artist: "kerby-rosanes",
    value: "10",
    suit: "diamonds",
    info:
      "To be honest, designing a ’high’ card is a bit of a challenge to me. I wanted to design a reversible card and the illustration can stand on its own without looking at the given pictograms showing what card it is. Nature has always been my favourite subject. Natural elements such as animals and plants are used to incorporate 10 bits of diamonds with two of them facing each other at the centre forming an “X” symbol which means 10. The resulting piece is a reversible design with two sides that are totally different from each other.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-hearts-david-sossella.jpg",
    artist: "david-sossella",
    value: "10",
    suit: "hearts",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/10-of-spades-marcelo-schultz.jpg",
    artist: "marcelo-schultz",
    value: "10",
    suit: "spades",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-clubs-yury-ustsinau.jpg",
    artist: "yury-ustsinau",
    value: "jack",
    suit: "clubs",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-diamonds-stavros-damos.jpg",
    artist: "stavros-damos",
    value: "jack",
    suit: "diamonds",
    info:
      "I love to analyze the forms of a subject as a sculptor. I usually work with lines and strokes to create my illustrations. For the specific project I’ve decided to make a self portrait. Usually the card figures are static and serious, so I thought it would be a great idea to make a sarcastic pose, to illustrate the jack diamond.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-hearts-julian-ardila.jpg",
    artist: "julian-ardila",
    value: "jack",
    suit: "hearts",
    info:
      "The illustration of J of hearts is inspired in the poker game. Who has never feel extremely happy after wining a hand, and after few seconds get blow with a dagger and stays there on the green fabric. Poker is the representation of a mathematical game, where feelings play an important role and we may lose everything.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/jack-of-spades-peter-donnelly.jpg",
    artist: "peter-donnelly",
    value: "jack",
    suit: "spades",
    info:
      "Perched high on the Dublin mountains lies The Hellfire Club, an 18th century hunting lodge with an infamous history of outrageous behaviour and depravity. Accounts of the club’s meetings claim that members drank “scaltheen”, a mixture of whiskey and hot butter, and that they left a chair vacant at each gathering for the Devil. One of these accounts tells of a stranger who arrived at the club on a stormy night. Invited in, he joined the members in a card game. As one player dropped his card on the floor he bent under the table to retrieve it and noticed that the stranger had a cloven hoof. At this point the visitor disappeared in a ball of flames ;)",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-clubs-raphael-vicenzi.jpg",
    artist: "raphael-vicenzi",
    value: "queen",
    suit: "clubs",
    info:
      "My card was the queen of clubs. I just wanted to draw a woman who would be like a timeless queen in a forgotten city.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-diamonds-pablo-jurado-ruiz.jpg",
    artist: "pablo-jurado-ruiz",
    value: "queen",
    suit: "diamonds",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-hearts-orlando-arocena.jpg",
    artist: "orlando-arocena",
    value: "queen",
    suit: "hearts",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/queen-of-spades-zso-sara-blake.jpg",
    artist: "sara-blake",
    value: "queen",
    suit: "spades",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-clubs-burak-senturk.jpg",
    artist: "burak-sentürk",
    value: "king",
    suit: "clubs",
    info:
      "Oddity :) I like to use pale colors. I think it’s make my illustration softer than real.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-diamonds-alexis-marcou.jpg",
    artist: "alexis-marcou",
    value: "king",
    suit: "diamonds",
    info:
      "This piece literally represents the King of Diamonds. It’s a stone face of a king.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-hearts-yoaz.jpg",
    artist: "yoaz",
    value: "king",
    suit: "hearts",
    info:
      "I love the aesthetic of card, also the colours so i wanted to keep this and do a king of heart very close to the existant versions.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/king-of-spades-yeaaah-studio.jpg",
    artist: "yeaaah-studio",
    value: "king",
    suit: "spades",
    info:
      "It’s a Lion-headed king slaying a snake. The design is based on a classic King card design, I just tried to put my style in it. I wrote キング in the banner, which is Japanese for “king”.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-clubs-andreas-preis.jpg",
    artist: "andreas-preis",
    value: "ace",
    suit: "clubs",
    info:
      "Due to some unfavorable circumstances, it had be be done very quickly this time, so I’ve decided to make a little revision of one of my favourite personal artworks from last year. Taking my »Berlin Fox« and making him kind of a guardian to the Ace of Clubs!",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-diamonds-joshua-davis.jpg",
    artist: "joshua-davis",
    value: "ace",
    suit: "diamonds",
    info:
      "Well everything I create is based on code and I have been totally dominated by using Delaunay Triangulation to create triangle structures… so it only made sense to doing something in the Diamonds family since I could incorporate triangle into the diamond form. So I requested the Ace of Diamonds, fingers crossed, and got it! Then I usually start to play with color… and the diamond family is red… so starting with red… I found a range from red to pink to purple… and then electrified it with mint. So why the Ace ? I knew if I got the Ace - I’d use an “A” with the knock out of the “A” having the diamond shape. The “A” would be subtle… with Triangle and Diamonds tearing apart. My style is abstraction… and I’m super happy with the texture and atmosphere my card turned into.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-hearts-studio-blup.jpg",
    artist: "studio-blup",
    value: "ace",
    suit: "hearts",
    info: "",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/ace-of-spades-ars-thanea.jpg",
    artist: "ars-thanea",
    value: "ace",
    suit: "spades",
    info:
      "The idea was to find some mighty and powerful animal character and mix it with various items to make it more grotesque and funny.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/joker-zombie-yeti.jpg",
    artist: "zombie-yeti",
    value: "joker",
    suit: "black",
    info:
      "Well, the concept behind my card isn’t terribly high brow... The Joker card is always some play off of a jester or fool in a rather literal way. I’m sure the history behind that is fascinating, but visually it’s rather boring. All art is derivative, so it’s not like I’m doing anything unique - but i wanted to approach the joker from the known representation and build on to it as more of an entity at play than a court jester playing tricks. Since playing cards are rather small and I tend to get intricate in detail more often than not, I chose to focus on the head and play on the symmetrical card structure to make it ambiguous while obvious. I chose not to push too far past the recognizable to respect the source material.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/_backside-danny-ivan.jpg",
    artist: "danny-ivan",
    value: "backside",
    suit: "",
    info:
      "The idea was create a vibrant, colourful, energetic abstract artwork which represents the connections of the card game, i tried to represent the interaction between the players and the cards with swirls, lines and some geometry.",
    deck: "two",
  },
  {
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/joker-amrei-hofstatter.jpg",
    artist: "amrei-hofstätter",
    value: "joker",
    suit: "red",
    info: "",
    deck: "two",
  },
];

const dump = async () => {
  await connect();
  await createDeck(slug, deck, cards);
};

export default dump;
