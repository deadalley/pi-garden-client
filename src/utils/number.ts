export const random = (min: number = 0, max: number = 10) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const calculateVariableMin = (fixedMin?: number, start?: number) => {
  if (fixedMin === undefined || fixedMin === null) {
    return start;
  }

  if (start === undefined || start === null) {
    return fixedMin;
  }

  return Math.min(fixedMin, start);
};

export const calculateVariableMax = (fixedMax?: number, end?: number) => {
  if (fixedMax === undefined || fixedMax === null) {
    return end;
  }

  if (end === undefined || end === null) {
    return fixedMax;
  }

  return Math.max(fixedMax, end);
};
