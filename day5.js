const part1Data = {
  sample: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
  answer: 3,
};

const part2Data = {
  sample: part1Data.sample,
  answer: 14,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
  const input = isBrowser
    ? document.body.innerText.trim()
    : sampleData[part - 1].sample;
  const [rangesPart, ingredientsPart] = input.split("\n\n");
  return {
    ranges: rangesPart.split("\n").map((range) => range.split("-").map(Number)),
    ingredients: ingredientsPart.split("\n").map(Number),
  };
};

const part1 = () => {
  const data = getData(1);

  /*
   * Find all invalid ingredients that fall within any of the ranges
   */
  const { ranges, ingredients } = data;
  const fresh = ingredients.filter((ingredient) =>
    ranges.some(([min, max]) => ingredient >= min && ingredient <= max)
  );

  return fresh.length;
};

const part2 = () => {
  const { ranges } = getData(2);

  /*
   * Merge overlapping ranges and count total unique numbers covered by the ranges
   */
  ranges.sort((a, b) => a[0] - b[0]);
  let fresh = 0;
  let currentStart = ranges[0][0];
  let currentEnd = ranges[0][1];

  for (let i = 1; i < ranges.length; i++) {
    const [nextStart, nextEnd] = ranges[i];
    if (nextStart <= currentEnd) {
      // overlapping ranges, extend the current end if required
      currentEnd = Math.max(currentEnd, nextEnd);
    } else {
      // non overlapping range, add the current range to fresh count and
      // move to the next range
      fresh += currentEnd - currentStart + 1;
      currentStart = nextStart;
      currentEnd = nextEnd;
    }
  }

  // add the last range
  fresh += currentEnd - currentStart + 1;
  return fresh;
};

const part1Optimised = () => {
  const { ranges, ingredients } = getData(2);
  ranges.sort((a, b) => a[0] - b[0]);
  ingredients.sort((a, b) => a - b);
  let fresh = 0;
  let currentStart = ranges[0][0];
  let currentEnd = ranges[0][1];

  for (let i = 1; i < ranges.length; i++) {
    const [nextStart, nextEnd] = ranges[i];
    if (nextStart <= currentEnd) {
      currentEnd = Math.max(currentEnd, nextEnd);
    } else {
      fresh += ingredients.filter(
        (ingredient) => ingredient >= currentStart && ingredient <= currentEnd
      ).length;
      currentStart = nextStart;
      currentEnd = nextEnd;
    }
  }

  fresh += ingredients.filter(
    (ingredient) => ingredient >= currentStart && ingredient <= currentEnd
  ).length;
  return fresh;
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

console.time("part1Optimised");
const part1OptimisedAnswer = part1Optimised();
console.log({ part1Optimised: part1OptimisedAnswer });
console.timeEnd("part1Optimised");

if (!isBrowser)
  console.assert(
    part2Answer === part2Data.answer,
    `${part2Data.answer} expected.`
  );
