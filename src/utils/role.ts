export const MAX_ROLES_PER_USER = 5
export const ADMIN_ROLE_ID = 1
export const MEMBER_ROLE_ID = 2

/**
 * A user must have at least one role out of: [Admin, Member]
 * If user have role Admin -> Cannot choose any other role
 * A user can have MAX_ROLES_PER_USER roles at maximum
 */
export const areSelectedRolesValid = (roleIds: number[]) => {
  if (roleIds.length === 0) return false

  if (roleIds.length > MAX_ROLES_PER_USER) return false

  let hasAdmin = false
  let hasMember = false

  roleIds.forEach(roleId => {
    if (roleId === ADMIN_ROLE_ID) hasAdmin = true
    if (roleId === MEMBER_ROLE_ID) hasMember = true
  })

  if (hasAdmin && roleIds.length > 1) return false

  if (!hasMember && !hasAdmin) return false

  return true
}

export function getRoleErrorMessageArgs(roleIds: number[]): string {
  if (roleIds.length === 0) {
    return 'role_page.role_errors.no_roles_selected'
  }

  if (roleIds.length > MAX_ROLES_PER_USER) {
    return 'role_page.role_errors.max_of_roles_can_be_selected'
  }

  let hasAdmin = false
  let hasMember = false

  roleIds.forEach(roleId => {
    if (roleId === ADMIN_ROLE_ID) hasAdmin = true
    if (roleId === MEMBER_ROLE_ID) hasMember = true
  })

  if (!hasMember && !hasAdmin) {
    return 'role_page.role_errors.no_admin_nor_member'
  }

  // If nothing above wrong, then only this error case lef
  return 'role_page.role_errors.admin'
}
