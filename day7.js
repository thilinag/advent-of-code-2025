const part1Data = {
  sample: `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`,
  answer: 21,
};

const part2Data = {
  sample: part1Data.sample,
  answer: 40,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
  const input = isBrowser
    ? document.body.innerText.trim()
    : sampleData[part - 1].sample;
  const data = input.split("\n").map((line) => line.split(""));
  let startRow = data.findIndex((row) => row.includes("S"));
  let startCol = data[startRow].indexOf("S");

  return { data, start: [startRow, startCol] };
};

const part1 = () => {
  const { data, start } = getData(1);

  /*
   * Perform kind of a  BFS from the starting point, splitting at each ^
   * and counting unique split points.
   */

  const queue = [start];
  const splitters = new Set();

  while (queue.length) {
    const [r, c] = queue.shift();

    const cell = data[r][c];
    // split at ^
    if (cell === "^") {
      const key = `${r},${c}`;

      // check if we have already visited this splitter
      if (splitters.has(key)) continue;

      splitters.add(`${r},${c}`);

      if (data[r]?.[c - 1]) {
        queue.push([r, c - 1]);
      }
      if (data[r]?.[c + 1]) {
        queue.push([r, c + 1]);
      }
    } else {
      if (data[r + 1]?.[c]) {
        queue.push([r + 1, c]);
      }
    }
  }

  return splitters.size;
};

const part2 = () => {
  const { data, start } = getData(2);

  /*
   * Keep track of all split points in a map with their counts.
   * For each row, update the split points based on the current row's ^
   * and their counts.
   *  eg:
   *             S
   *            1^1
   *           1^2^1
   */

  let splits = new Map();
  splits.set(start[1], 1);

  for (let r = 2; r < data.length; r += 2) {
    const line = data[r];
    const newSplits = new Map();
    splits.forEach((count, key) => {
      if (line[key] === "^") {
        newSplits.set(key - 1, (newSplits.get(key - 1) || 0) + count);
        newSplits.set(key + 1, (newSplits.get(key + 1) || 0) + count);
      } else {
        newSplits.set(key, (newSplits.get(key) || 0) + count);
      }
    });
    splits = newSplits;
  }

  return splits.values().reduce((a, b) => a + b, 0);
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
