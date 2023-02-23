// return random interger upto <max> value
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// 50% change of true or false
export const getRandomBool = () => Math.random() >= 0.5;
