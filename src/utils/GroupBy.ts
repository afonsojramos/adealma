import type { IProject } from 'interfaces';

const groupBy = (
  list: IProject[],
  keyGetter: (item: IProject) => number,
): Map<string, Array<IProject>> => {
  const map = new Map();
  for (const item of list) {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  }
  return map;
};

export default groupBy;
