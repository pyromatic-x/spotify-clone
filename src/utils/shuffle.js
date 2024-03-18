export function shuffle(array, firstIndex = null) {
  let result = JSON.parse(JSON.stringify(array));
  let first = null;

  if (firstIndex !== null) first = result.splice(firstIndex, 1)[0];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return first ? [first, ...result] : result;
}
