/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginRequestDto {
  /** @example "foo@gmail.com" */
  email: string
  /** @example "password" */
  password: string
}

export interface UserRole {
  /** @example 1 */
  id: number
  /** @example "Admin" */
  name: string
  /** @example "admin" */
  slug: string
}

export interface OrganizationProfileResponseDto {
  /** @example 1 */
  id: number
  /** @example "Organization Fullname" */
  name: string
  /** @example "org_unique_name" */
  uniqueName: string
  roles: UserRole[]
}

export interface ProfileResponseDto {
  /** @example 1 */
  id: number
  /** @example "robin@moneyforward.co.jp" */
  email: string
  /** @example "robin" */
  name: string
  /** @example [{"id":1,"name":"First Organization Name","uniqueName":"first_organization_unique_name","roles":[{"id":1,"name":"Admin"}]}] */
  organizations: OrganizationProfileResponseDto[]
}

export interface LoginResponse {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" */
  accessToken: string
  userData: ProfileResponseDto
}

export interface RegisterRequestDto {
  /** @example "foo@gmail.com" */
  email: string
  /** @example "foo" */
  name: string
  /** @example "password" */
  password: string
}

export interface RegisterResponse {
  /** @example "foo@gmail.com" */
  email: string
  /** @example "foo" */
  name: string
  /** @example "password" */
  password: string
}

export interface OrganizationUserResponseDto {
  /** @example 1 */
  id: number
  /** @example "robin@moneyforward.co.jp" */
  email: string
  /** @example "robin" */
  name: string
  roles: UserRole[]
}

export interface UserSearchRequestDto {
  query?: string
  role?: string
}

export interface MetaData {
  total: number
  params: UserSearchRequestDto
  allData: OrganizationUserResponseDto[]
}

export interface OrganizationUserListResponseDto {
  users: OrganizationUserResponseDto[]
  metadata: MetaData
}

export interface TotalAdminResponseDto {
  /** @example 5 */
  totalAdmins: number
}

export interface BulkInviteRequestDto {
  /** @example ["hoge@i.moneyforward.com","fuga@i.moneyforward.com"] */
  emails: string[]
  /** @example [2,3] */
  roleIds: number[]
}

export interface BulkInviteResponseDto {
  /** @example 1 */
  invitedCount: number
  /** @example 1 */
  notInvitedCount: number
}

export interface UpdateOrganizationUserRequestDto {
  /** @example [2,3] */
  roleIds: number[]
}

export type EmptyResponseDto = object

export enum PermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum PermissionSubject {
  ALL = 'all',
  ORGANIZATION = 'organization',
  USER = 'user',
  ROLE = 'role'
}

export interface CaslPermission {
  action: PermissionAction
  subject: PermissionSubject
}

export interface GetUserPermissionsResponseDto {
  permissions: CaslPermission[]
}

export interface CreateOrganizationRequestDto {
  /** @example "Example organization" */
  name: string
  /** @example "example-org" */
  uniqueName: string
}

export interface OrganizationResponseDto {
  /** @example 1 */
  id: number
  /** @example "Test org" */
  name: string
  /** @example "test-org" */
  uniqueName: string
  /**
   * @format date-time
   * @example "2020/01/01 15:00:00"
   */
  createdAt: string
}

export interface UpdateOrganizationRequestDto {
  /** @example "Example organization" */
  name?: string
  /** @example "example-org" */
  uniqueName?: string
}

export interface PermissionSubjectResponseDto {
  /** @example "organization" */
  subject: string
}

export interface PermissionConfigDto {
  /** @example "create" */
  action: PermissionConfigDtoActionEnum
  /** @example "organization" */
  subject: PermissionConfigDtoSubjectEnum
}

export interface CreateRoleRequestDto {
  /** @example "Developer" */
  name: string
  /** @example "developer" */
  slug: string
  permissionConfigs: PermissionConfigDto[]
}

export type Permission = object

export interface RoleResponseDto {
  /** @example 1 */
  id: number
  /** @example "Admin" */
  name: string
  /** @example "admin" */
  slug: string
  permissions: Permission[]
  isCustom: boolean
  /**
   * @format date-time
   * @example "2020/01/01 15:00:00"
   */
  createdAt: string
}

export interface RoleResponseListDto {
  roles: RoleResponseDto[]
}

export interface UpdateRoleRequestDto {
  /** @example "Admin" */
  name?: string
  /** @example "admin" */
  slug?: string
  permissionConfigs: PermissionConfigDto[]
}

/** @example "create" */
export enum PermissionConfigDtoActionEnum {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

/** @example "organization" */
export enum PermissionConfigDtoSubjectEnum {
  ALL = 'all',
  ORGANIZATION = 'organization',
  USER = 'user',
  ROLE = 'role'
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(((method && this.instance.defaults.headers[method.toLowerCase()]) || {}) as object),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    })
  }
}

/**
 * @title GR API
 * @version 1.0
 * @contact
 *
 * GR API Description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params
    })

  internal = {
    /**
     * @description Login with email and password
     *
     * @tags Auth
     * @name Login
     * @summary Login endpoint for users
     * @request POST:/internal/api/v1/auth/login
     */
    login: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<LoginResponse, any>({
        path: `/internal/api/v1/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Register with email and password
     *
     * @tags Auth
     * @name Register
     * @summary Register endpoint for users
     * @request POST:/internal/api/v1/auth/register
     */
    register: (data: RegisterRequestDto, params: RequestParams = {}) =>
      this.request<RegisterResponse, any>({
        path: `/internal/api/v1/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Return user data and their belonging organization
     *
     * @tags Auth
     * @name GetUserProfile
     * @summary Get user profile
     * @request GET:/internal/api/v1/auth/profile
     * @secure
     */
    getUserProfile: (params: RequestParams = {}) =>
      this.request<ProfileResponseDto, any>({
        path: `/internal/api/v1/auth/profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get all organization users
     *
     * @tags Organization User
     * @name UsersControllerFindAll
     * @summary Get all organization users
     * @request GET:/internal/api/v1/organizations/{organizationId}/users
     * @secure
     */
    usersControllerFindAll: (
      organizationId: number,
      query?: {
        query?: string
        role?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<OrganizationUserListResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Count total admins
     *
     * @tags Organization User
     * @name UsersControllerCountAdmin
     * @summary Count total admins
     * @request GET:/internal/api/v1/organizations/{organizationId}/users/admin-count
     * @secure
     */
    usersControllerCountAdmin: (organizationId: number, params: RequestParams = {}) =>
      this.request<TotalAdminResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/admin-count`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Bulk invite users
     *
     * @tags Organization User
     * @name UsersControllerBulkInvite
     * @summary Bulk invite users
     * @request POST:/internal/api/v1/organizations/{organizationId}/users/bulk-invitations
     * @secure
     */
    usersControllerBulkInvite: (organizationId: number, data: BulkInviteRequestDto, params: RequestParams = {}) =>
      this.request<BulkInviteResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/bulk-invitations`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edit organization users information
     *
     * @tags Organization User
     * @name UsersControllerUpdate
     * @summary Edit organization users information
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/users/{id}
     * @secure
     */
    usersControllerUpdate: (
      organizationId: number,
      id: number,
      data: UpdateOrganizationUserRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<OrganizationUserResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete an organization user
     *
     * @tags Organization User
     * @name UsersControllerDelete
     * @summary Delete an organization user
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/users/{id}
     * @secure
     */
    usersControllerDelete: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get organization user's permissions
     *
     * @tags Organization User
     * @name GetUserPermissions
     * @summary Get organization user's permissions
     * @request GET:/internal/api/v1/organizations/{organizationId}/users/permissions
     * @secure
     */
    getUserPermissions: (organizationId: number, params: RequestParams = {}) =>
      this.request<GetUserPermissionsResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/permissions`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create new organization with organization name (Example org) and global unique name (example-org)
     *
     * @tags Organization
     * @name OrganizationsControllerCreate
     * @summary Create new organization
     * @request POST:/internal/api/v1/organizations
     * @secure
     */
    organizationsControllerCreate: (data: CreateOrganizationRequestDto, params: RequestParams = {}) =>
      this.request<OrganizationResponseDto, any>({
        path: `/internal/api/v1/organizations`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get organization
     *
     * @tags Organization
     * @name GetOrganization
     * @summary Get organization
     * @request GET:/internal/api/v1/organizations/{id}
     * @secure
     */
    getOrganization: (id: number, params: RequestParams = {}) =>
      this.request<OrganizationResponseDto, any>({
        path: `/internal/api/v1/organizations/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update organization
     *
     * @tags Organization
     * @name UpdateOrganization
     * @summary Update organization
     * @request PATCH:/internal/api/v1/organizations/{id}
     * @secure
     */
    updateOrganization: (id: number, data: UpdateOrganizationRequestDto, params: RequestParams = {}) =>
      this.request<OrganizationResponseDto, any>({
        path: `/internal/api/v1/organizations/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete an organization
     *
     * @tags Organization
     * @name DeleteAnOrganization
     * @summary Delete an organization
     * @request DELETE:/internal/api/v1/organizations/{id}
     * @secure
     */
    deleteAnOrganization: (id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get permission subject list
     *
     * @tags Permission
     * @name GetPermissionSubjectList
     * @summary Get permission subject list
     * @request GET:/internal/api/v1/permissions
     * @secure
     */
    getPermissionSubjectList: (params: RequestParams = {}) =>
      this.request<PermissionSubjectResponseDto[], any>({
        path: `/internal/api/v1/permissions`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create roles for an organization
     *
     * @tags Organization Role
     * @name CreateRolesForAnOrganization
     * @summary Create roles for an organization
     * @request POST:/internal/api/v1/organizations/{organizationId}/roles
     * @secure
     */
    createRolesForAnOrganization: (organizationId: number, data: CreateRoleRequestDto, params: RequestParams = {}) =>
      this.request<RoleResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get role list for organization
     *
     * @tags Organization Role
     * @name GetRoleListForOrganization
     * @summary Get role list for organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/roles
     * @secure
     */
    getRoleListForOrganization: (organizationId: number, params: RequestParams = {}) =>
      this.request<RoleResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get role by ID for an org
     *
     * @tags Organization Role
     * @name GetRoleByIdForAnOrg
     * @summary Get role by ID for an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/roles/{id}
     * @secure
     */
    getRoleByIdForAnOrg: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<RoleResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update a role for an organization
     *
     * @tags Organization Role
     * @name UpdateARoleForAnOrganization
     * @summary Update a role for an organization
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/roles/{id}
     * @secure
     */
    updateARoleForAnOrganization: (
      organizationId: number,
      id: number,
      data: UpdateRoleRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<RoleResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete a role for an organization
     *
     * @tags Organization Role
     * @name DeleteARoleForAnOrganization
     * @summary Delete a role for an organization
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/roles/{id}
     * @secure
     */
    deleteARoleForAnOrganization: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      })
  }
}
