export const calculateBudgetProcess = (totalSpent: number, totalBudget: number): number => {
  const budgetProcess = parseFloat(((totalSpent / totalBudget) * 100).toFixed(2))

  // Prevent over 100% value for linear progress UI
  return budgetProcess
}

export const renderColorBudgetProcess = (totalSpent: number, totalBudget: number): string => {
  const budgetProcess = calculateBudgetProcess(totalSpent, totalBudget)

  if (budgetProcess <= 75) {
    return 'success'
  } else if (budgetProcess < 100) {
    return 'warning'
  } else {
    return 'error'
  }
}
