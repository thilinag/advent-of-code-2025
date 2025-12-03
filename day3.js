const part1Data = {
  sample: `987654321111111
811111111111119
234234234234278
818181911112111`,
  answer: 357,
};

const part2Data = {
  sample: part1Data.sample,
  answer: 3121910778619,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
  const input = isBrowser
    ? document.body.innerText.trim()
    : sampleData[part - 1].sample;
  return input.split("\n").map((line) => line.split("").map(Number));
};

const part1 = () => {
  const data = getData(1);
  return data.reduce((acc, line) => {
    const remaining = line.slice(0, -1);
    const firstNum = Math.max(...remaining);
    const lastNum = Math.max(...line.slice(remaining.indexOf(firstNum) + 1));
    return acc + (firstNum * 10 + lastNum);
  }, 0);
};

const part2 = () => {
  const data = getData(2);
  return data.reduce((acc, line) => {
    const numbers = [];
    let remaining = [...line];
    for (let i = -11; i <= 0; i++) {
      const maxNum = Math.max(...remaining.slice(0, i || undefined));
      numbers.push(maxNum);
      remaining = remaining.slice(remaining.indexOf(maxNum) + 1);
    }
    return acc + Number(numbers.join(""));
  }, 0);
};

console.time("part1");
const part1Answer = part1();
console.log({ part1: part1Answer });
console.timeEnd("part1");
if (!isBrowser)
  console.assert(
    part1Answer === part1Data.answer,
    `${part1Data.answer} expected.`
  );

console.time("part2");
const part2Answer = part2();
console.log({ part2: part2Answer });
console.timeEnd("part2");
if (!isBrowser)
  console.assert(
    part2Answer === part2Data.answer,
    `${part2Data.answer} expected.`
  );
