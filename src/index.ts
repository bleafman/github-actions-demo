import axios from 'axios'
import * as core from '@actions/core';

const DEFAULT_CHARACTER = 'dr-zoidberg';

const VALID_CHARACTERS = ['dr-zoidberg', 'fry', 'leela', 'bender'];

run()

async function run() {
  const character = getCharacterInput();

  core.debug(`[Futurama] Input Character: ${character}`);

  if(!isCharacterValid(character)) {
    core.setFailed(`Unknown character: ${character}.`);
    return;
  }

  core.debug(`[Futurama] Getting a quote from ${character}...`);

  const quote = await getFuturamaQuote(character);

  core.debug(`[Futurama] Successfully retrieved quote: ${quote}`);

  core.setOutput('quote', quote);
}

function getCharacterInput() {
  const character = core?.getInput('character') || DEFAULT_CHARACTER;

  return character;
}

function isCharacterValid(character: string) {
  return VALID_CHARACTERS.includes(character)
}

async function getFuturamaQuote(character: string) {
  const response = await axios.get(`https://futuramaapi.herokuapp.com/api/characters/${character}/1`);

  const {data} = response;

  const firstEntry = data[0];

  return `${firstEntry.character} said: ${firstEntry.quote}`;
}