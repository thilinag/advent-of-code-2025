const part1Data = {
  sample: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
  answer: 13,
};

const part2Data = {
  sample: part1Data.sample,
  answer: 43,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
  const input = isBrowser
    ? document.body.innerText.trim()
    : sampleData[part - 1].sample;
  return input.split("\n").map((line) => line.split(""));
};

// get adjacent cells
const getAdjacentCount = (grid, r, c) => {
  let adjacentCount = 0;
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [dr, dc] of offsets) {
    if (grid[r + dr] && grid[r + dr][c + dc] === "@") {
      adjacentCount++;
    }
  }

  return adjacentCount;
};

const part1 = () => {
  const data = getData(1);

  /*
   * Find all accessible cells by checking if there are less than 4 rolls
   *  around a roll and count unique positions
   */
  const accessible = new Set();

  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
      if (data[r][c] !== "@") continue;

      const adjacentCount = getAdjacentCount(data, r, c);

      if (adjacentCount < 4) {
        accessible.add(`${r},${c}`);
        continue;
      }
    }
  }

  return accessible.size;
};

const cleanRoom = (grid, accessible) => {
  let accessibleCount = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] !== "@") continue;

      const adjacentCount = getAdjacentCount(grid, r, c);

      if (adjacentCount < 4) {
        accessible.add(`${r},${c}`);
        grid[r][c] = "x";
        accessibleCount++;
        continue;
      }
    }
  }

  // exit recursion if we didn't find any new accessible cells
  if (accessibleCount === 0) return accessible.size;

  return cleanRoom(grid, accessible);
};

const part2 = () => {
  const data = getData(2);

  /*
   * recursively find all accessible cells by checking if there are less than 4 rolls
   *  around a roll and count unique positions
   */
  const accessible = new Set();
  return cleanRoom(data, accessible);
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
