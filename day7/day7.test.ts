import { expect } from "jsr:@std/expect";
import { EOL } from 'node:os';


const allOps = ['*', '+'] as const;
type Op = typeof allOps[number]
const opsMap: { [key in Op]: (a: number, b: number) => number } = {
  '*': (a, b) => a * b,
  '+': (a, b) => a + b
}
function evaluate(target: number, currentAggregate: number, rest: number[], ops: Op[]): Op[] | null {

  const diff = target - currentAggregate;

  if (diff < 0) {
    return null;
  }
  if (diff === 0) {
    return rest.length === 0 ? ops : null;
  }

  const [nextNum, ...nextRest] = rest;

  if (nextNum == null) {
    return null;
  }

  for (const op of allOps) {
    const nextAggregate = opsMap[op](currentAggregate, nextNum);
    const result = evaluate(target, nextAggregate, nextRest, [...ops, op]);
    if (result) {
      return result;
    }
  }
  return null;
}



function checkSeq(target: number, vals: number[]) {
  const [nextNum, ...nextRest] = vals;
  const res = evaluate(target, nextNum, nextRest, []);

  return res != null;
}

function solvePt1(input: string) {
  return parseInput(input).map(([target, seq]) => {
    return [target, checkSeq(target, seq)] as const
  }).filter(([, isOk]) => isOk).reduce((acc, [target]) => {
    return acc + target
  }, 0);
}

function parseInput(input: string) {
  return input.trim().split(EOL).map((str) => {
    const [target, seq] = str.split(':');
    return [Number(target), seq.split(' ').map(Number)] as const
  })
}

const testCases: [number, number[], boolean][] = [
  [190, [10, 19], true],
  [3267, [81, 40, 27], true],
  [83, [17, 5], false],
  [156, [15, 6], false],
  [7290, [6, 8, 6, 15], false],
  [161011, [16, 10, 13], false],
  [192, [17, 8, 14], false],
  [21037, [9, 7, 18, 13], false],
  [292, [11, 6, 16, 20], true],
];


Deno.test('should pass all cases', () => {
  for (const [t, seq, result] of testCases) {
    const res = checkSeq(t, seq);
    expect(res, `seq ${seq.join(',')} is ${result ? 'correct' : 'incorrect'}`).toBe(result);
  }
});
const sample = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;
Deno.test('shoould solve sample', () => {
  const result = solvePt1(sample);
  expect(result).toBe(3749);
});

Deno.test('should solve pt1', async () => {
  const content = await Deno.readTextFile('./day7/input.txt');
  const result = solvePt1(content);
  expect(result).toBeGreaterThan(3312209544174);


})