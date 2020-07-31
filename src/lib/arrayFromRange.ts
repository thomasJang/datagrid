function arrayFromRange(
  start: number,
  end: number,
  step: number = 1
): number[] {
  const range = [];

  if (end < start) {
    step = -step;
  }

  while (step > 0 ? end >= start : end <= start) {
    range.push(start);
    start += step;
  }

  return range;
}

export default arrayFromRange;
