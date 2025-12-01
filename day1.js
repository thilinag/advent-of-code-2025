const part1Data = {
  sample: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
  answer: 0,
};

const part2Data = {
  sample: part1Data.sample,
  answer: 0,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
  const input = isBrowser
    ? document.body.innerText.trim()
    : sampleData[part - 1].sample;
  return input.split("\n");
};

const part1 = () => {
  const data = getData(1);

  let currentPos = 50;
  const max = 100;
  let password = 0;

  data.forEach((line) => {
    if (!currentPos) password++;
    const isLeft = line.startsWith("L");
    const number = Number(line.substring(1));

    const nextPos = isLeft ? currentPos - number : currentPos + number;

    currentPos = (max + nextPos) % max;
  });

  return password;
};

const part2 = () => {
  const data = getData(2);

  let currentPos = 50;
  const max = 100;
  let password = 0;

  data.forEach((line) => {
    const isLeft = line.startsWith("L");
    const number = Number(line.substring(1));

    const nextPos = isLeft ? currentPos - number : currentPos + number;

    if (isLeft) {
      password +=
        Math.floor((currentPos - 1) / 100) - Math.floor((nextPos - 1) / 100);
    } else {
      password += Math.floor(nextPos / 100) - Math.floor(currentPos / 100);
    }

    currentPos = nextPos;
  });

  return password;
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
