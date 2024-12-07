import { expect } from "jsr:@std/expect";
import solution, { solutionPt2 } from './task1.ts';


Deno.test("should solve sample", () => {
  const result = solution('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))');
  expect(result).toBe(161);
});

Deno.test("should solve real task", async () => {
  const content = await Deno.readTextFile('./task1/input.txt');
  const result = solution(content);
  console.log(result)
})
const sample2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
Deno.test("dont substr", () => {
  expect(solutionPt2(sample2)).toBe(48)
});

Deno.test('should solve real task pt2', async () => {
  const content = await Deno.readTextFile('./task1/input.txt');
  const result = solutionPt2(content);
  console.log(result)
})