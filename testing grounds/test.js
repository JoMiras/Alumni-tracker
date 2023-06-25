import fs from 'fs';

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

  toString() {
    return `ID: ${this.pokedexId}\nName: ${this.name}\nType: ${this.types}\nTotal: ${this.total}\nHP: ${this.hp}\nAttack: ${this.attack}\nDefense: ${this.defense}\nSp. Atk: ${this.spAtk}\nSp. Def: ${this.spDef}\nSpeed: ${this.speed}`;
  }
}

function generateRandomName(usedNames, isPokemon) {
  const pokemonNames = ["Chikorita", "Cyndaquil", "Totodile", "Larvitar", "Mareep", "Sudowoodo", "Wooper", "Heracross", "Phanpy", "Teddiursa"];
  const yugiohNames = ["Dark Magician", "Blue-Eyes White Dragon", "Red-Eyes Black Dragon", "Exodia the Forbidden One", "Summoned Skull", "Black Luster Soldier", "Gaia the Fierce Knight", "Jinzo", "Slifer the Sky Dragon", "Obelisk the Tormentor"];
  const availableNames = isPokemon ? pokemonNames.filter(name => !usedNames.includes(name)) : yugiohNames.filter(name => !usedNames.includes(name));

  if (availableNames.length === 0) {
    const generatedName = generateRandomGeneratedName(usedNames, isPokemon);
    if (generatedName) {
      return generatedName;
    }
    return `Name ${usedNames.length + 1}`;
  }

  const randomIndex = Math.floor(Math.random() * availableNames.length);
  const name = availableNames[randomIndex];
  availableNames.splice(randomIndex, 1);

  return name;
}

function generateRandomGeneratedName(usedNames, isPokemon) {
  const generatedNames = isPokemon ? generateRandomPokemonNames() : generateRandomYugiohNames();
  const availableGeneratedNames = generatedNames.filter(name => !usedNames.includes(name));

  if (availableGeneratedNames.length === 0) {
    return null; // No available generated names left
  }

  const randomIndex = Math.floor(Math.random() * availableGeneratedNames.length);
  const name = availableGeneratedNames[randomIndex];
  availableGeneratedNames.splice(randomIndex, 1);

  return name;
}

function generateRandomPokemonNames() {
  const generatedNames = [];
  const prefixes = ["Flame", "Thunder", "Aqua", "Leaf", "Rock", "Mystic", "Shadow", "Crystal", "Steel", "Storm"];
  const suffixes = ["onix", "izard", "achu", "ite", "drake", "oreon", "ight", "eon", "ix", "aptor"];

  for (const prefix of prefixes) {
    for (const suffix of suffixes) {
      generatedNames.push(prefix + suffix);
    }
  }

  return generatedNames;
}

function generateRandomYugiohNames() {
  const generatedNames = [];
  const adjectives = ["Dark", "Mystic", "Crimson", "Ancient", "Fiery", "Mighty", "Celestial", "Divine", "Sorcerous", "Wicked"];
  const nouns = ["Dragon", "Sorcerer", "Knight", "Beast", "Warrior", "Mage", "Pharaoh", "Guardian", "Elemental", "Emperor"];

  for (const adjective of adjectives) {
    for (const noun of nouns) {
      generatedNames.push(adjective + " " + noun);
    }
  }

  return generatedNames;
}

function generateRandomPokemon(pokedexId, usedNames) {
  const isPokemon = true;
  const name = generateRandomName(usedNames, isPokemon);
  const types = generateRandomTypes();
  const total = 800;

  const getRandomStat = () => Math.floor(Math.random() * 256);
  const hp = getRandomStat();
  const attack = getRandomStat();
  const defense = getRandomStat();
  const spAtk = getRandomStat();
  const spDef = getRandomStat();
  const speed = getRandomStat();

  return new Pokemon(pokedexId, name, types, total, hp, attack, defense, spAtk, spDef, speed);
}

function generateRandomYugiohCard(cardId, usedNames) {
  const isPokemon = false;
  const name = generateRandomName(usedNames, isPokemon);
  const types = generateRandomYugiohTypes();
  const total = 3000;

  const getRandomStat = () => Math.floor(Math.random() * 500);
  const attack = getRandomStat();
  const defense = getRandomStat();

  return new YugiohCard(cardId, name, types, total, attack, defense);
}

function generateRandomTypes() {
  const types = ["Grass", "Fire", "Water", "Electric", "Rock", "Psychic", "Ghost", "Ice", "Dragon", "Flying"];
  const numTypes = Math.floor(Math.random() * 2) + 1;
  const shuffledTypes = types.sort(() => Math.random() - 0.5);
  return shuffledTypes.slice(0, numTypes);
}

function generateRandomYugiohTypes() {
  const types = ["Warrior", "Spellcaster", "Dragon", "Zombie", "Fiend", "Machine", "Aqua", "Pyro", "Rock", "Wind"];
  const numTypes = Math.floor(Math.random() * 2) + 1;
  const shuffledTypes = types.sort(() => Math.random() - 0.5);
  return shuffledTypes.slice(0, numTypes);
}

class YugiohCard {
  constructor(cardId, name, types, total, attack, defense) {
    this.cardId = cardId;
    this.name = name;
    this.types = types;
    this.total = total;
    this.attack = attack;
    this.defense = defense;
  }

  toString() {
    return `Card ID: ${this.cardId}\nName: ${this.name}\nType: ${this.types}\nTotal: ${this.total}\nAttack: ${this.attack}\nDefense: ${this.defense}`;
  }
}

const usedNames = [];
const pokemonList = [];
const yugiohCardList = [];

for (let i = 1; i <= 100; i++) {
  const isPokemon = Math.random() < 0.5;
  if (isPokemon) {
    const pokemon = generateRandomPokemon(i.toString().padStart(3, '0'), usedNames);
    usedNames.push(pokemon.name);
    pokemonList.push(pokemon);
    console.log(pokemon.toString());
  } else {
    const yugiohCard = generateRandomYugiohCard(i.toString().padStart(3, '0'), usedNames);
    usedNames.push(yugiohCard.name);
    yugiohCardList.push(yugiohCard);
    console.log(yugiohCard.toString());
  }
}

const outputFile = 'pokemon_output.txt';
const outputText = pokemonList.map(pokemon => pokemon.toString()).join('\n\n');
const yugiohOutputText = yugiohCardList.map(card => card.toString()).join('\n\n');

fs.writeFile(outputFile, outputText + '\n\n' + yugiohOutputText, err => {
  if (err) {
    console.error('Error saving output file:', err);
  } else {
    console.log(`Pokemon and Yu-Gi-Oh! output saved to "${outputFile}".`);
  }
});
