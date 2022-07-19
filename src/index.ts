import axios from 'axios'

run();

async function run() {
  const quote = await getFuturamaQuote();

  console.log(quote);
}

async function getFuturamaQuote() {
  const response = await axios.get('https://futuramaapi.herokuapp.com/api/characters/dr-zoidberg/1');

  const {data} = response;

  const firstEntry = data[0];

  return `${firstEntry.character} said: ${firstEntry.quote}`;
}