import { isEntryBalance } from './balance';

describe('Test utility methods', () => {
  it('isBalance should work properly', () => {
    const balancedEntry = [
      { amount: 100, account: 100 },
      { amount: -100, account: 200 },
    ];
    const unbalancedEntry = [
      { amount: 100, account: 100 },
      { amount: 50, account: 200 },
    ];

    expect(isEntryBalance(balancedEntry)).toBe(true);
    expect(isEntryBalance(unbalancedEntry)).toBe(false);
  });
});
