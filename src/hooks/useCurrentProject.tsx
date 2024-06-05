import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { OrganizationProfileResponseDto, ProjectResponseDto } from 'src/__generated__/AccountifyAPI'

export function useCurrentProject(name: string) {
  const pathname = usePathname()
  const session = useSession()
  const uniqueNameFromPathName = pathname.split('/')[1]
  const organization = session.data?.user?.organizations.find(
    org => org.uniqueName === uniqueNameFromPathName
  ) as OrganizationProfileResponseDto

  const project = organization.projects?.find(prj => prj.name === name) as ProjectResponseDto

  // We can consider the organization's project always be valid when use useCurrentProject, in the middleware layer we should handle invalid later
  return {
    project,
    projectId: project?.id,
    projectName: project?.name
  }
}
