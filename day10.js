const part1Data = {
  sample: `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`,
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
  return input.split("\n").map((line) => {
    const [_, target, buttons, joltage] = line.match(
      /\[(.+)\] \((.+)\) \{(.+)\}/
    );
    return {
      target: parseInt(
        target
          .split("")
          .reverse()
          .map((c) => (c === "." ? 0 : 1))
          .join(""),
        2
      ),
      buttons: buttons.split(") (").map((line) =>
        line
          .split(",")
          .map(Number)
          .reduce((acc, c) => Math.pow(2, c) + acc, 0)
      ),
      joltage: joltage.split(",").map(Number),
    };
  });
};

function pressButtons(line) {
  const { target, buttons } = line;
  const pressed = new Set([0]);
  const queue = [[0, 0]];
  let cursor = 0;
  while (queue) {
    const [curr, numOfPresses] = queue[cursor++];
    if (curr == target) {
      return numOfPresses;
    }
    for (const button of buttons) {
      if (!pressed.has(curr ^ button)) {
        pressed.add(curr);
        queue.push([curr ^ button, numOfPresses + 1]);
      }
    }
  }
}

const part1 = () => {
  const data = getData(1);

  return data.reduce((acc, curr) => pressButtons(curr) + acc, 0);
};

const part2 = () => {
  const data = getData(2);
  // part 2 code
  // return ;
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
