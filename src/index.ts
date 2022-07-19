import axios from 'axios'
import core from '@actions/core'

const DEFAULT_CHARACTER = 'dr-zoidberg';

run();

async function run() {
  const character = getCharacterInput();

  console.log(`Getting a quote from ${character}...`);

  const quote = await getFuturamaQuote();

  console.log(quote);
}

function getCharacterInput() {
  const character = core?.getInput('character') || DEFAULT_CHARACTER;

  return character;
}

async function getFuturamaQuote() {
  const response = await axios.get('https://futuramaapi.herokuapp.com/api/characters/dr-zoidberg/1');

  const {data} = response;

  const firstEntry = data[0];

  return `${firstEntry.character} said: ${firstEntry.quote}`;
}