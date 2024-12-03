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