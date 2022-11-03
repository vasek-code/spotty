// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = (obj: any) => {
  const replacer = [];
  for (const key in obj) {
    replacer.push(key);
  }
  return JSON.stringify(obj, replacer);
};