export const calculateBudgetProcess = (spentAmount: number, totalBudget: number): number => {
  return parseFloat(((spentAmount / totalBudget) * 100).toFixed(2))
}
