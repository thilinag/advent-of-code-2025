const part1Data = {
  sample: `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `,
  answer: 4277556,
};

const part2Data = {
  sample: part1Data.sample,
  answer: 3263827,
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

  /*
   * Perform the operations on each column and sum the results
   */

  const operations = data.pop().match(/[\+\-\*\/]/g);
  const numbers = data.map((line) => line.trim().split(/\s+/).map(Number));

  let total = 0;
  for (let i = 0; i < numbers[0].length; i++) {
    let columnTotal = 0;
    for (let j = 0; j < numbers.length; j++) {
      const num = numbers[j][i];
      const op = operations[i];

      if (op === "+") columnTotal += num;
      else if (op === "*") columnTotal = (columnTotal || 1) * num;
    }
    total += columnTotal;
  }

  return total;
};

const part2 = () => {
  const data = getData(2);

  /*
   * Rotate the input 90 degrees counter clockwise to process columns as rows
   * Then split the numbers based on spaces (0s after conversion)
   * Finally perform the operations on each column and sum the results
   * Operations are in reverse order since its right to left now
   */
  const operations = data
    .pop()
    .match(/[\+\-\*\/]/g)
    .reverse();
  const numbers = data.map((line) => line.split(""));

  // rotate 90 deg counter clockwise, convert to numbers
  // and split into numbers based on spaces
  const rightToLeftNumbers = numbers[0]
    .map((_, idx) =>
      Number(
        numbers
          .map((row) => row[row.length - 1 - idx])
          .join("")
          .trim()
      )
    )
    .reduce(
      (acc, num) => {
        if (num === 0) {
          acc.push([]);
        } else {
          acc[acc.length - 1].push(num);
        }
        return acc;
      },
      [[]]
    );

  // do the operations
  return rightToLeftNumbers.reduce((total, column, idx) => {
    const op = operations[idx];
    if (op === "+") {
      return total + column.reduce((a, b) => a + b, 0);
    }
    return total + column.reduce((a, b) => a * b, 1);
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
