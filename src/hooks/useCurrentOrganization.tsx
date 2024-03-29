import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { OrganizationProfileResponseDto } from 'src/__generated__/AccountifyAPI'

export function useCurrentOrganization() {
  const pathname = usePathname()
  const session = useSession()
  const uniqueNameFromPathName = pathname.split('/')[1]
  const organization = session.data?.user?.organizations.find(
    org => org.uniqueName === uniqueNameFromPathName
  ) as OrganizationProfileResponseDto

  // We can consider the organization always be valid when use useCurrentOrganization, in the middleware layer we should handle invalid later
  return {
    organization,
    organizationId: organization?.id,
    organizationUniqueName: organization?.uniqueName
  }
}
