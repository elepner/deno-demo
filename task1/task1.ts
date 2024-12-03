import * as R from 'npm:remeda';

export default function (input: number[]) {
  const bar = R.pipe(
    input,
    R.zip(R.pipe(input, R.drop(1))),
    R.map(([current, next]) => {
      return next! - current;
    }),
  );

  return bar;
}