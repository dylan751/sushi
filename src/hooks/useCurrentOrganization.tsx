import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { OrganizationProfileResponseDto, ProjectResponseDto } from 'src/__generated__/AccountifyAPI'

export interface useCurrentOrganizationResponseInterface {
  organization: OrganizationProfileResponseDto
  organizationId: number
  organizationUniqueName: string
  project?: ProjectResponseDto
  projectId?: number
}

export function useCurrentOrganization(projectName?: string): useCurrentOrganizationResponseInterface {
  const pathname = usePathname()
  const session = useSession()
  const uniqueNameFromPathName = pathname.split('/')[1]
  const organization = session.data?.user?.organizations.find(
    org => org.uniqueName === uniqueNameFromPathName
  ) as OrganizationProfileResponseDto

  const returnObject: useCurrentOrganizationResponseInterface = {
    organization,
    organizationId: organization?.id,
    organizationUniqueName: organization?.uniqueName
  }

  if (projectName) {
    const project = organization.projects?.find(prj => prj.name === projectName) as ProjectResponseDto
    returnObject.project = project
    returnObject.projectId = project?.id
  }

  // We can consider the organization always be valid when use useCurrentOrganization, in the middleware layer we should handle invalid later
  return returnObject
}
