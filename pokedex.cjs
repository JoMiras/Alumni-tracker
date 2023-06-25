const mysql = require("mysql2/promise");

class Pokemon {
  constructor(pokedexId, name, types, total, hp, attack, defense, spAtk, spDef, speed) {
    this.pokedexId = pokedexId;
    this.name = name;
    this.types = types;
    this.total = total;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.spAtk = spAtk;
    this.spDef = spDef;
    this.speed = speed;
  }

// Custom toString() method to represent the Pokemon object as a string
  toString() {
    return `ID: ${this.pokedexId}\nName: ${this.name}\nType: ${this.types}\nTotal: ${this.total}\nHP: ${this.hp}\nAttack: ${this.attack}\nDefense: ${this.defense}\nSp. Atk: ${this.spAtk}\nSp. Def: ${this.spDef}\nSpeed: ${this.speed}`;
  }
}
// Function to generate a random name from a given array, avoiding duplicate names
function generateRandomName(usedNames, isPokemon) {
  const pokemonNames = [
    "Bulbasaur",
    "Charmander",
    "Squirtle",
    "Pikachu",
    "Jigglypuff",
    "Snorlax",
    "Mewtwo",
    "Gyarados",
    "Dragonite",
    "Mew",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Venusaur",
    "Charizard",
    "Blastoise",
    "Gengar",
    "Alakazam",
    "Lapras",
    "Arcanine",
    "Golem",
    "Kangaskhan",
    "Tauros",
    "Gyarados",
    "Machamp",
    "Rhydon",
    "Kabutops",
    "Aerodactyl",
    "Lapras",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Espeon",
    "Umbreon",
    "Leafeon",
    "Glaceon",
    "Sylveon",
    "Charjabug",
    "Vikavolt",
    "Crabrawler",
    "Crabominable",
    "Oricorio",
    "Cutiefly",
    "Ribombee",
    "Rockruff",
    "Lycanroc",
    "Wishiwashi",
    "Mareanie",
    "Toxapex",
    "Mudbray",
    "Mudsdale",
    "Dewpider",
    "Araquanid",
    "Fomantis",
    "Lurantis",
    "Morelull",
    "Shiinotic",
    "Salandit",
    "Salazzle",
    "Stufful",
    "Bewear",
    "Bounsweet",
    "Steenee",
    "Tsareena",
    "Comfey",
    "Oranguru",
    "Passimian",
    "Wimpod",
    "Golisopod",
    "Sandygast",
    "Palossand",
    "Pyukumuku",
    "Type: Null",
    "Silvally",
    "Minior",
    "Komala",
    "Turtonator",
    "Togedemaru",
    "Mimikyu",
    "Bruxish",
    "Drampa",
    "Dhelmise",
    "Jangmo-o",
    "Hakamo-o",
    "Kommo-o",
    "Tapu Koko",
    "Tapu Lele",
    "Tapu Bulu",
    "Tapu Fini",
    "Cosmog",
    "Cosmoem",
    "Solgaleo",
    "Lunala",
    "Nihilego",
    "Buzzwole",
    "Pheromosa",
    "Xurkitree",
    "Celesteela",
    "Kartana",
    "Guzzlord",
    "Necrozma",
    "Magearna",
    "Marshadow",
    "Poipole",
    "Naganadel",
    "Stakataka",
    "Blacephalon",
    "Zeraora",
    "Meltan",
    "Melmetal",
    "Zacian",
    "Zamazenta",
    "Eternatus",
    "Kubfu",
    "Urshifu",
    "Zarude",
    "Regieleki",
    "Regidrago",
    "Glastrier",
    "Spectrier",
    "Calyrex",
  ];

  const yugiohNames = [
    "Dark Magician",
    "Blue-Eyes White Dragon",
    "Red-Eyes Black Dragon",
    "Exodia the Forbidden One",
    "Black Luster Soldier",
    "Summoned Skull",
    "Gaia The Fierce Knight",
    "Red Dragon Archfiend",
    "Black Rose Dragon",
    "Stardust Dragon",
    "Cyber Dragon",
    "Elemental HERO Neos",
    "Jinzo",
    "Harpie Lady",
    "Dark Paladin",
    "Obelisk the Tormentor",
    "Slifer the Sky Dragon",
    "The Winged Dragon of Ra",
    "Red-Eyes Darkness Dragon",
    "Blackwing - Gale the Whirlwind",
    "Horus the Black Flame Dragon LV8",
    "Neo-Spacian Grand Mole",
    "Ancient Fairy Dragon",
    "Majestic Star Dragon",
    "Junk Warrior",
    "Goyo Guardian",
    "Mecha Phantom Beast Dracossack",
    "Number 39: Utopia",
    "Number 17: Leviathan Dragon",
    "Number 11: Big Eye",
    "Wind-Up Zenmaines",
    "Gagaga Cowboy",
    "Constellar Pleiades",
    "Number 101: Silent Honor ARK",
    "Evilswarm Exciton Knight",
    "Number 74: Master of Blades",
    "Number 106: Giant Hand",
    "Number C39: Utopia Ray",
    "Dark Rebellion Xyz Dragon",
    "Number 39: Utopia Beyond",
    "Clear Wing Synchro Dragon",
    "Stardust Spark Dragon",
    "Star Eater",
    "Ghostrick Alucard",
    "Downerd Magician",
    "Number 103: Ragnazero",
    "Number 50: Blackship of Corn",
    "Number 82: Heartlandraco",
    "M-X-Saber Invoker",
    "Evilswarm Ophion",
    "Evilswarm Bahamut",
    "Evilswarm Thanatos",
    "Ophion the Silent",
    "Dark Armed Dragon",
    "Number 92: Heart-eartH Dragon",
    "Number C92: Heart-eartH Chaos Dragon",
    "Number 107: Galaxy-Eyes Tachyon Dragon",
    "Number C107: Neo Galaxy-Eyes Tachyon Dragon",
    "Starliege Paladynamo",
    "Constellar Ptolemy M7",
    "Number 61: Volcasaurus",
    "Number C69: Heraldry Crest of Horror",
    "Number 19: Freezadon",
    "Number 46: Dragluon",
    "Number 6: Chronomaly Atlandis",
    "Number C6: Chronomaly Chaos Atlandis",
    "Number 15: Gimmick Puppet Giant Grinder",
    "Number 40: Gimmick Puppet of Strings",
    "Number 88: Gimmick Puppet of Leo",
    "Number C88: Gimmick Puppet Disaster Leo",
    "Number 9: Dyson Sphere",
    "Number C9: Chaos Dyson Sphere",
  ];
  

  const allNames = isPokemon ? [...pokemonNames] : [...yugiohNames];
  const remainingNames = allNames.filter(name => !usedNames.includes(name));
  const randomIndex = Math.floor(Math.random() * remainingNames.length);
  return remainingNames[randomIndex];
}
// function to create the pokemon table in the database if it doesn't exist
async function createPokemonTable(connection) {
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS PokeDigiMonDex (
      pokedex_id INT PRIMARY KEY,
      name VARCHAR(255),
      types VARCHAR(255),
      total INT,
      hp INT,
      attack INT,
      defense INT,
      sp_atk INT,
      sp_def INT,
      speed INT
    )
  `);
}
// function to insert random Pokemon data into the database
async function insertRandomDataIntoDatabase() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "bvtpassword",
    database: "pokedexDB",
  });
  // Create the pokemon table in the database
  await createPokemonTable(connection); 

  const usedNames = [];

  // generate and insert 100 random pokemon records
  for (let i = 0; i < 100; i++) {
    const pokedexId = i + 1;
    const name = generateRandomName(usedNames, true);
    const types = ["Grass", "Fire", "Water", "Electric", "Normal"];
    const total = Math.floor(Math.random() * 200) + 300;
    const hp = Math.floor(Math.random() * 100) + 50;
    const attack = Math.floor(Math.random() * 100) + 50;
    const defense = Math.floor(Math.random() * 100) + 50;
    const spAtk = Math.floor(Math.random() * 100) + 50;
    const spDef = Math.floor(Math.random() * 100) + 50;
    const speed = Math.floor(Math.random() * 100) + 50;
// create a new pokemon instance
    const pokemon = new Pokemon(
      pokedexId,
      name,
      types,
      total,
      hp,
      attack,
      defense,
      spAtk,
      spDef,
      speed
    );

    console.log(pokemon.toString());
// insert the pokemon record into the database
    await connection.execute(
      "INSERT INTO PokeDigiMonDex (pokedex_id, name, types, total, hp, attack, defense, sp_atk, sp_def, speed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        pokemon.pokedexId,
        pokemon.name,
        pokemon.types.join(", "),
        pokemon.total,
        pokemon.hp,
        pokemon.attack,
        pokemon.defense,
        pokemon.spAtk,
        pokemon.spDef,
        pokemon.speed,
      ]
    );

    usedNames.push(pokemon.name);
  }
// close the database connection 
  await connection.end();
  console.log("Data insertion completed.");
}

insertRandomDataIntoDatabase();