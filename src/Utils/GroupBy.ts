import { IProject } from 'Interfaces/Project';

const groupBy = (
  list: IProject[],
  keyGetter: Function
): Map<string, Array<IProject>> => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

export { groupBy };
