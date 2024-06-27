import Grid from '@mui/material/Grid'
import CategoryListTable from 'src/views/apps/project/category/list/CategoryListTable'

export interface CategoryTabProps {
  projectId: number
}

const CategoryTab = ({ projectId }: CategoryTabProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CategoryListTable projectId={projectId} />
      </Grid>
    </Grid>
  )
}

CategoryTab.acl = {
  action: 'read',
  subject: 'category'
}

export default CategoryTab
