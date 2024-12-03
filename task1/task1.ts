import * as R from 'npm:remeda';


export default function solution(input: string) {
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches = [...input.matchAll(regex)]; // Convert the iterator to an array
  return R.pipe(
    matches,
    R.map((match) => ([Number(match[1]), Number(match[2])] as const)),
    R.map(([a, b]) => a * b),
    R.reduce((acc, current) => acc + current, 0)
  )
  // matches.forEach(match => {
  //   console.log(`First number: ${match[1]}, Second number: ${match[2]}`);
  // });
}

export function solutionPt2(input: string) {
  return R.pipe(
    Array.from(stringChunks(input)),
    R.map(solution),
    R.reduce((acc, current) => acc + current, 0)
  )
}

export function dontSubstr(input: string) {
  return substr(input, `don't()`);
}

export function doSubstr(input: string) {
  return substr(input, 'do()');
}

function substr(input: string, pattern: string) {
  const index = input.indexOf(pattern);
  if (index < 0) {
    return [input, '', true] as const;
  }

  return [input.substring(0, index), input.substring(index + pattern.length), false] as const;
}

export function* stringChunks(input: string) {
  let current = input;
  while (true) {
    let [substr, rest, isEnd] = dontSubstr(current);
    yield substr;
    if (isEnd) {
      break;
    }

    [substr, rest, isEnd] = doSubstr(rest);

    current = rest;
  }
}