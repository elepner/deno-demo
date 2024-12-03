import { expect } from "jsr:@std/expect";
import solution from './task1.ts';


Deno.test("should return diffs", () => {
  debugger;
  const result = solution([1, 2, 5, 7]);

  expect({ result }).toMatchObject({ result: [1, 3, 2] })
})


Deno.test("should return diffs 2", () => {
  debugger;
  const result = solution([1, 2, 5, 7]);

  expect({ result }).toMatchObject({ result: [1, 3, 2] })
})