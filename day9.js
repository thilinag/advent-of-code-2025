const part1Data = {
  sample: `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`,
  answer: 50,
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
  let area = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i] === data[j]) continue;
      const [x1, y1] = data[i].split(",").map(Number);
      const [x2, y2] = data[j].split(",").map(Number);

      if (x1 === x2 || y1 === y2) continue;

      const currentArea = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
      if (currentArea > area) {
        area = currentArea;
      }
    }
  }

  return area;
};

const part2 = () => {
  const data = getData(2);
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
