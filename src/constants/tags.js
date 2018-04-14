const tags = [
  { id: 'btc', displayName: 'Bitcoin' },
  { id: 'ltc', displayName: 'Litecoin' },
  { id: 'eth', displayName: 'Ethereum' },
];

export const idToDisplayName = tags.reduce((acc, tag) => {
  acc[tag.id] = tag.displayName;
  return acc;
}, {});

export default tags;
