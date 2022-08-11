export const getNumberFromUrl = (url: string): number => {
  let number = 0;
  var match = url.match(/pokemon\/(\d+)/);
  if (match) {
    number = parseInt(match[1]);
  }
  return number;
};
