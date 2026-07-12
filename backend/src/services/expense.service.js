export function calculateExpense(amount) {
  const governmentAmount = Number((amount * 0.6).toFixed(2));
  const userAmount = Number((amount * 0.4).toFixed(2));

  return {
    governmentAmount,
    userAmount,
  };
}