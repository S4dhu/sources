export const getCount = values => {
  const counter = values.reduce((o, i) => {
    if (!o.hasOwnProperty(i.category)) {
      o[i.category] = 0;
    }
    o[i.category]++;
    return o;
  }, {});
  const result = Object.keys(counter).map(category => {
    return { name: category, count: counter[category] };
  });

  return result
}