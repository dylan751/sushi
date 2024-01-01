import { AbilityBuilder, Ability } from '@casl/ability'
import { CaslPermission } from 'src/__generated__/AccountifyAPI'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (permissions: CaslPermission[]) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (permissions) {
    permissions.forEach((permission: CaslPermission) => {
      can([permission.action], permission.subject)
    })
  } else {
    can(['read'], 'account-settings') // Default role to read essentials pages
  }

  return rules
}

export const buildAbilityFor = (permissions: CaslPermission[]): AppAbility => {
  return new AppAbility(defineRulesFor(permissions), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'read',
  subject: 'account-settings'
}

export default defineRulesFor
