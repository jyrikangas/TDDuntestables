function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}


//randomness is hard to test, since its ... random. we need to make the randomness predictable
//lets separate the randomness from the logic by separating the rolling of the dice from the evaluation of the dice
export function evaluateDice(die1, die2) {
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}
export function diceHandValue() {
  const die1 = diceRoll();
  const die2 = diceRoll();
  return evaluateDice(die1, die2);
}
