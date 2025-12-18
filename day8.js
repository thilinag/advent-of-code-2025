const part1Data = {
  sample: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
  answer: 40,
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
  return input.split("\n").map((line) => line.split(",").map(Number));
};

function getDistance([[x1, x2, x3], [y1, y2, y3]]) {
  return Math.hypot(x1 - y1, x2 - y2, x3 - y3);
}

const getKey = (point) => point.join("-");

const part1 = () => {
  const points = getData(1);

  const sortedJunctionBoxPairs = points
    .flatMap((junctionBox1, idx) =>
      points.slice(idx + 1).map((junctionBox2) => [junctionBox1, junctionBox2])
    )
    .toSorted((a, b) => getDistance(a) - getDistance(b));

  const sortedJunctionBoxIndexes = sortedJunctionBoxPairs.map((junctionBoxes) =>
    junctionBoxes.map((junctionBox) => points.indexOf(junctionBox))
  );

  let unions = points.map((_, i) => new Set([i]));

  sortedJunctionBoxIndexes.forEach(([u1, u2], i) => {
    unions[u1].forEach((u) => (unions[u] = unions[u2].add(u)));

    if (i == 9)
      answ = [...new Set(unions)]
        .map((u) => u.size)
        .sort((s1, s2) => s1 - s2)
        .slice(-3)
        .reduce((s1, s2) => s1 * s2);
  });

  return answ;
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
