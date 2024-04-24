import { Grid } from '@mui/material'
import BudgetListTable from 'src/views/apps/project/budget/list/BudgetListTable'

export interface BudgetTabProps {
  projectId: string
}

const BudgetTab = ({ projectId }: BudgetTabProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <BudgetListTable projectId={projectId} />
      </Grid>
    </Grid>
  )
}

export default BudgetTab
