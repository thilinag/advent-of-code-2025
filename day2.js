const part1Data = {
  sample: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`,
  answer: 1227775554,
};

const part2Data = {
  sample: part1Data.sample,
  answer: 4174379265,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
  const input = isBrowser
    ? document.body.innerText.trim()
    : sampleData[part - 1].sample;
  return input.split(",");
};

const part1 = () => {
  const data = getData(1);

  const invalid = [];

  data.forEach((line) => {
    const [min, max] = line.split("-").map(Number);
    let current = min;
    while (current <= max) {
      const currentStr = String(current);
      current++;
      if (currentStr.length % 2 !== 0) continue;
      const mid = currentStr.length / 2;
      const left = currentStr.slice(0, mid);
      const right = currentStr.slice(mid);

      if (left === right) {
        invalid.push(Number(currentStr));
      }
    }
  });

  return invalid.reduce((a, b) => a + b, 0);
};

const part2 = () => {
  const data = getData(2);

  const invalid = [];

  data.forEach((line) => {
    const [min, max] = line.split("-").map(Number);
    let current = min;
    while (current <= max) {
      const currentStr = String(current);
      current++;
      if (/^(.+)\1+$/.test(currentStr)) {
        invalid.push(Number(currentStr));
      }
    }
  });

  return invalid.reduce((a, b) => a + b, 0);
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
