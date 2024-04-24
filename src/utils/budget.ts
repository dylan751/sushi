export const calculateBudgetProcess = (spentAmount: number, totalBudget: number): number => {
  const budgetProcess = parseFloat(((spentAmount / totalBudget) * 100).toFixed(2))

  // Prevent over 100% value for linear progress UI
  return budgetProcess <= 100 ? budgetProcess : 100
}

export const renderColorBudgetProcess = (spentAmount: number, totalBudget: number): string => {
  const budgetProcess = calculateBudgetProcess(spentAmount, totalBudget)

  if (budgetProcess <= 50) {
    return 'success'
  } else if (budgetProcess <= 75) {
    return 'warning'
  } else {
    return 'error'
  }
}
