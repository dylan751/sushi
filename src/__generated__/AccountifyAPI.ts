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

export enum CurrencyType {
  VND = 'vnd',
  USD = 'usd'
}

export enum BankType {
  BIDV = 'bidv',
  VCB = 'vcb'
}

export interface UserRole {
  /** @example 1 */
  id: number
  /** @example "Admin" */
  name: string
  /** @example "admin" */
  slug: string
}

export interface OrganizationUserResponseDto {
  /** @example 1 */
  id: number
  /** @example "robin@moneyforward.co.jp" */
  email: string
  /** @example "robin" */
  name: string
  /** @example "0339089172" */
  phone: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address: string
  /** @example "https://image.com/avatar-1" */
  avatar: string
  roles: UserRole[]
}

export enum ColorType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning'
}

export enum IconType {
  MDI_INVOICE_ADD = 'mdi:invoice-add',
  MDI_INVOICE_ARROW_LEFT_OUTLINE = 'mdi:invoice-arrow-left-outline',
  MDI_INVOICE_ARROW_RIGHT_OUTLINE = 'mdi:invoice-arrow-right-outline',
  MDI_INVOICE_LIST_OUTLINE = 'mdi:invoice-list-outline',
  MDI_INVOICE_CLOCK_OUTLINE = 'mdi:invoice-clock-outline',
  MDI_INVOICE_EDIT_OUTLINE = 'mdi:invoice-edit-outline',
  MDI_INVOICE_MINUS_OUTLINE = 'mdi:invoice-minus-outline',
  MDI_INVOICE_RECEIVE_OUTLINE = 'mdi:invoice-receive-outline',
  MDI_INVOICE_SCHEDULE_OUTLINE = 'mdi:invoice-schedule-outline',
  MDI_INVOICE_TEXT_CHECK_OUTLINE = 'mdi:invoice-text-check-outline',
  MDI_INVOICE_TEXT_REMOVE_OUTLINE = 'mdi:invoice-text-remove-outline',
  MDI_INVOICE_TEXT_PLUS_OUTLINE = 'mdi:invoice-text-plus-outline',
  MDI_INVOICE_TEXT_SEND_OUTLINE = 'mdi:invoice-text-send-outline',
  MDI_CATEGORY = 'mdi:category',
  MDI_CATEGORY_OUTLINE = 'mdi:category-outline',
  MDI_CATEGORY_PLUS = 'mdi:category-plus',
  MDI_CATEGORY_PLUS_OUTLINE = 'mdi:category-plus-outline',
  MDI_COMPUTER = 'mdi:computer',
  MDI_COMPUTER_CLASSIC = 'mdi:computer-classic',
  MDI_ACCOUNT_BADGE_OUTLINE = 'mdi:account-badge-outline',
  MDI_ACCOUNT_BOX = 'mdi:account-box',
  MDI_ACCOUNT_COG = 'mdi:account-cog',
  MDI_ACCOUNT_CASH = 'mdi:account-cash',
  MDI_ACCOUNT_EDIT = 'mdi:account-edit',
  MDI_ACCOUNT_ALERT = 'mdi:account-alert',
  MDI_ACCOUNT_BOX_OUTLINE = 'mdi:account-box-outline',
  MDI_ACCOUNT_COG_OUTLINE = 'mdi:account-cog-outline',
  MDI_ACCOUNT_CASH_OUTLINE = 'mdi:account-cash-outline',
  MDI_ACCOUNT_EDIT_OUTLINE = 'mdi:account-edit-outline',
  MDI_ACCOUNT_ALERT_OUTLINE = 'mdi:account-alert-outline',
  MDI_BADGE_ACCOUNT_OUTLINE = 'mdi:badge-account-outline',
  MDI_BOOK_ACCOUNT_OUTLINE = 'mdi:book-account-outline',
  MDI_BRIEFCASE_ACCOUNT_OUTLINE = 'mdi:briefcase-account-outline',
  MDI_MAP_MARKER_ACCOUNT_OUTLINE = 'mdi:map-marker-account-outline',
  MDI_MEDICINE = 'mdi:medicine',
  MDI_MEDICINE_OUTLINE = 'mdi:medicine-outline',
  MDI_MEDICINE_BOTTLE = 'mdi:medicine-bottle',
  MDI_MEDICINE_BOTTLE_OUTLINE = 'mdi:medicine-bottle-outline',
  MDI_MEDICINE_OFF = 'mdi:medicine-off',
  MDI_AIRPLANE = 'mdi:airplane',
  MDI_AIRPLANE_ALERT = 'mdi:airplane-alert',
  MDI_AIRPLANE_CAR = 'mdi:airplane-car',
  MDI_AIRPLANE_CLOCK = 'mdi:airplane-clock',
  MDI_AIRPLANE_COG = 'mdi:airplane-cog',
  MDI_PAPER_AIRPLANE = 'mdi:paper-airplane',
  MDI_PAPER_AIRPLANE_OUTLINE = 'mdi:paper-airplane-outline',
  MDI_PAPER_AIRPLANE_VARIANT = 'mdi:paper-airplane-variant',
  MDI_PAPER_AIRPLANE_VARIANT_OUTLINE = 'mdi:paper-airplane-variant-outline',
  MDI_CAR_OUTLINE = 'mdi:car-outline',
  MDI_CABLE_CAR = 'mdi:cable-car',
  MDI_CAR_ARROW_LEFT = 'mdi:car-arrow-left',
  MDI_CAR_ARROW_RIGHT = 'mdi:car-arrow-right',
  MDI_IMPORT = 'mdi:import',
  MDI_CALENDAR_IMPORT_OUTLINE = 'mdi:calendar-import-outline',
  MDI_FILE_IMPORT_OUTLINE = 'mdi:file-import-outline',
  MDI_EXPORT = 'mdi:export',
  MDI_CALENDAR_EXPORT_OUTLINE = 'mdi:calendar-export-outline',
  MDI_FILE_EXPORT_OUTLINE = 'mdi:file-export-outline',
  MDI_CREDIT_CARD_ADD = 'mdi:credit-card-add',
  MDI_EMAIL_CHECK_OUTLINE = 'mdi:email-check-outline',
  MDI_EMAIL_SEARCH_OUTLINE = 'mdi:email-search-outline',
  MDI_EMAIL_EDIT_OUTLINE = 'mdi:email-edit-outline',
  MDI_EMAIL_PLUS_OUTLINE = 'mdi:email-plus-outline',
  MDI_EMAIL_OFF_OUTLINE = 'mdi:email-off-outline',
  MDI_EMAIL_ADD_OUTLINE = 'mdi:email-add-outline',
  MDI_ABACUS = 'mdi:abacus',
  MDI_ACCOUNT = 'mdi:account',
  MDI_AB_TESTING = 'mdi:ab-testing',
  MDI_ABJAD_ARABIC = 'mdi:abjad-arabic',
  MDI_ABJAD_HEBREW = 'mdi:abjad-hebrew',
  MDI_ABUGIDA_THAI = 'mdi:abugida-thai',
  MDI_ACCESS_POINT = 'mdi:access-point'
}

export enum InvoiceType {
  EXPENSE = 'expense',
  INCOME = 'income'
}

export interface CategoryResponseDto {
  /** @example 1 */
  id: number
  /** @example "Computer Expense" */
  name: string
  /** @example "primary" */
  color: ColorType
  /** @example "mdi:airplane" */
  icon: IconType
  /** @example "expense" */
  type: InvoiceType
  /** @example 1000 */
  totalSpent: number
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface BudgetResponseDto {
  /** @example 1 */
  id: number
  /** @example 1 */
  categoryId: number
  /** @example 100000 */
  amount: number
  category: CategoryResponseDto
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface ProjectResponseDto {
  /** @example 1 */
  id: number
  /** @example "Technology Investment" */
  name: string
  /** @example "A project to improve school technology" */
  description: string
  /** @example 100000 */
  totalBudget: number
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  startDate: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  endDate: string
  creator: OrganizationUserResponseDto
  invoices: any[][]
  budgets: BudgetResponseDto[]
  categories: CategoryResponseDto[]
  /** @example 1000 */
  totalSpent: number
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface OrganizationProfileResponseDto {
  /** @example 1 */
  id: number
  /** @example "Organization Fullname" */
  name: string
  /** @example "org_unique_name" */
  uniqueName: string
  /** @example "0339089172" */
  phone: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address: string
  /** @example "dd/MM/yyyy" */
  dateFormat: string
  /** @example "vnd" */
  currency: CurrencyType
  /** @example "bidv" */
  bank: BankType
  /** @example 25464 */
  exchangeRate: number
  projects: ProjectResponseDto[]
  roles: UserRole[]
}

export interface ProfileResponseDto {
  /** @example 1 */
  id: number
  /** @example "robin@moneyforward.co.jp" */
  email: string
  /** @example "robin" */
  name: string
  /** @example "0339089172" */
  phone: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address: string
  /** @example "https://image.com/avatar-1" */
  avatar: string
  organizations: OrganizationProfileResponseDto[]
}

export interface LoginResponse {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" */
  accessToken: string
  userData: ProfileResponseDto
}

export interface LoginWithGoogleRequestDto {
  /** @example "foo@gmail.com" */
  email: string
  /** @example "foo" */
  name: string
  /** @example "https://avatar.png" */
  avatar: string
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

export interface UpdateProfileRequestDto {
  /** @example "Foo" */
  name?: string
  /** @example "0339089172" */
  phone?: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address?: string
  /** @example "password" */
  password?: string
}

export interface UserSearchRequestDto {
  query?: string
  role?: string
}

export interface MetaData {
  total: number
  params: UserSearchRequestDto
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
  ROLE = 'role',
  INVOICE = 'invoice',
  PROJECT = 'project',
  BUDGET = 'budget',
  CATEGORY = 'category'
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
  /** @example "0339089172" */
  phone: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address: string
}

export interface OrganizationResponseDto {
  /** @example 1 */
  id: number
  /** @example "Test org" */
  name: string
  /** @example "test-org" */
  uniqueName: string
  /** @example "0339089172" */
  phone: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address: string
  /** @example "dd/MM/yyyy" */
  dateFormat: string
  /** @example "vnd" */
  currency: CurrencyType
  /** @example "bidv" */
  bank: BankType
  /** @example 25464 */
  exchangeRate: number
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface UpdateOrganizationRequestDto {
  /** @example "Example organization" */
  name?: string
  /** @example "example-org" */
  uniqueName?: string
  /** @example "0339089172" */
  phone?: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address?: string
  /** @example "dd/MM/yyyy" */
  dateFormat?: string
  /** @example "vnd" */
  currency?: CurrencyType
  /** @example "bidv" */
  bank?: BankType
  /** @example 25464 */
  exchangeRate?: number
}

export interface PermissionSubjectResponseDto {
  /** @example "organization" */
  subject: string
}

export interface IncomesAndExpensesByCategoryResponseDto {
  /** @example "Computer Expense" */
  name: string
  /** @example "success" */
  color: string
  /** @example 1000 */
  total: number
}

export interface OrganizationStatisticsResponseDto {
  /** @example 1 */
  id: number
  /** @example "HPTN083" */
  name: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  created: string
  /** @example 10 */
  projectCount: number
  /** @example 10 */
  invoiceCount: number
  /** @example 10 */
  userCount: number
  /** @example 10 */
  roleCount: number
  /** @example 10000 */
  totalIncome: number
  /** @example 10000 */
  totalExpense: number
  /** @example 10000 */
  balance: number
  /** @example [100,300,320,150,170,150,150,300,230,170,260,200] */
  incomesByMonth: number[]
  /** @example [280,200,220,180,270,250,70,90,200,150,160,100] */
  expensesByMonth: number[]
  incomesByCategory: IncomesAndExpensesByCategoryResponseDto[]
  expensesByCategory: IncomesAndExpensesByCategoryResponseDto[]
  projects: ProjectResponseDto[]
  /** @example 10000 */
  totalUncategorizedIncome: number
  /** @example 10000 */
  totalUncategorizedExpense: number
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
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface RoleResponseListDto {
  roles: RoleResponseDto[]
  metadata: MetaData
}

export interface UpdateRoleRequestDto {
  /** @example "Admin" */
  name?: string
  /** @example "admin" */
  slug?: string
  permissionConfigs: PermissionConfigDto[]
}

export interface InvoiceItemResponseDto {
  /** @example 1 */
  id: number
  /** @example "Monthly bill" */
  name: string
  /** @example "Pay monthly internet bill" */
  note: string
  /** @example 10000 */
  price: number
  /** @example 1 */
  quantity: number
}

export interface InvoiceResponseDto {
  /** @example 1 */
  id: number
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  date: string
  /** @example "INV-EF5" */
  uid: string
  /** @example "expense" */
  type: InvoiceType
  /** @example "vnd" */
  currency: CurrencyType
  /** @example "John Doe" */
  clientName: string
  /** @example 10 */
  tax: number
  /** @example 10 */
  discount: number
  /** @example "Pay monthly internet bill" */
  note: string
  /** @example 10 */
  total: number
  /** @example 10 */
  exchangeRate: number
  items: InvoiceItemResponseDto[]
  project: ProjectResponseDto
  category: CategoryResponseDto
  creator: OrganizationUserResponseDto
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface InvoiceResponseListDto {
  invoices: InvoiceResponseDto[]
  metadata: MetaData
}

export interface CreateProjectRequestDto {
  /** @example "Technology Investment" */
  name: string
  /** @example "A project to improve school technology" */
  description: string
  /** @example 100000 */
  totalBudget: number
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  startDate: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  endDate: string
}

export interface ProjectResponseListDto {
  projects: ProjectResponseDto[]
  metadata: MetaData
}

export interface UpdateProjectRequestDto {
  /** @example "Technology Investment" */
  name?: string
  /** @example "A project to improve school technology" */
  description?: string
  /** @example 100000 */
  totalBudget?: number
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  startDate?: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  endDate?: string
}

export interface CreateInvoiceItemRequest {
  /** @example "Monthly bill" */
  name: string
  /** @example "Pay monthly internet bill" */
  note?: string
  /** @example 100000 */
  price: number
  /** @example 1 */
  quantity: number
}

export interface CreateInvoiceRequestDto {
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  date: string
  /** @example "expense" */
  type: InvoiceType
  /** @example "vnd" */
  currency: CurrencyType
  /** @example "John Doe" */
  clientName: string
  /** @example "INV-F1A" */
  uid: string
  /** @example 10 */
  tax?: number
  /** @example 10 */
  discount: number
  /** @example "Pay monthly internet bill" */
  note?: string
  /** @example 24.35 */
  exchangeRate?: number
  items: CreateInvoiceItemRequest[]
  /** @example 1 */
  categoryId?: number
}

export interface UpdateInvoiceItemRequest {
  /** @example "Monthly bill" */
  name?: string
  /** @example "Pay monthly internet bill" */
  note?: string
  /** @example 100000 */
  price?: number
  /** @example 1 */
  quantity?: number
}

export interface UpdateInvoiceRequestDto {
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  date?: string
  /** @example "expense" */
  type?: InvoiceType
  /** @example "vnd" */
  currency?: CurrencyType
  /** @example "John Doe" */
  clientName?: string
  /** @example "INV-F1A" */
  uid?: string
  /** @example 10 */
  tax?: number
  /** @example 10 */
  discount?: number
  /** @example "Pay monthly internet bill" */
  note?: string
  /** @example 24.35 */
  exchangeRate?: number
  items: UpdateInvoiceItemRequest[]
  /** @example 1 */
  categoryId?: number
}

export interface CreateBudgetRequestDto {
  /** @example 1 */
  categoryId: number
  /** @example 100000 */
  amount: number
}

export interface BudgetResponseListDto {
  budgets: BudgetResponseDto[]
  metadata: MetaData
}

export interface UpdateBudgetRequestDto {
  /** @example 100000 */
  amount?: number
}

export interface CreateCategoryRequestDto {
  /** @example "Computer Expense" */
  name: string
  /** @example "primary" */
  color: ColorType
  /** @example "mdi:airplane" */
  icon: IconType
  /** @example "expense" */
  type: InvoiceType
}

export interface CategoryResponseListDto {
  categories: CategoryResponseDto[]
  metadata: MetaData
}

export interface UpdateCategoryRequestDto {
  /** @example "Computer Expense" */
  name?: string
  /** @example "primary" */
  color?: ColorType
  /** @example "mdi:airplane" */
  icon?: IconType
  /** @example "expense" */
  type?: InvoiceType
}

export interface ProjectStatisticsResponseDto {
  /** @example 1 */
  id: number
  /** @example "HPTN083" */
  name: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  created: string
  /** @example 10 */
  invoiceCount: number
  /** @example 10 */
  budgetCount: number
  /** @example 10 */
  categoryCount: number
  /** @example 10000 */
  totalIncome: number
  /** @example 10000 */
  totalExpense: number
  /** @example 10000 */
  balance: number
  /** @example [100,300,320,150,170,150,150,300,230,170,260,200] */
  incomesByMonth: number[]
  /** @example [280,200,220,180,270,250,70,90,200,150,160,100] */
  expensesByMonth: number[]
  expensesByCategory: IncomesAndExpensesByCategoryResponseDto[]
  incomesByCategory: IncomesAndExpensesByCategoryResponseDto[]
  /** @example 10000 */
  totalUncategorizedIncome: number
  /** @example 10000 */
  totalUncategorizedExpense: number
  lastInvoices: InvoiceResponseDto[]
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
  ROLE = 'role',
  INVOICE = 'invoice',
  PROJECT = 'project',
  BUDGET = 'budget',
  CATEGORY = 'category'
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
     * @description Login with Google
     *
     * @tags Auth
     * @name LoginWithGoogle
     * @summary Login with Google endpoint for users
     * @request POST:/internal/api/v1/auth/login-google
     */
    loginWithGoogle: (data: LoginWithGoogleRequestDto, params: RequestParams = {}) =>
      this.request<LoginResponse, any>({
        path: `/internal/api/v1/auth/login-google`,
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
     * @description Update user profile
     *
     * @tags Auth
     * @name UpdateUserProfile
     * @summary Update user profile
     * @request PATCH:/internal/api/v1/auth/profile
     * @secure
     */
    updateUserProfile: (data: UpdateProfileRequestDto, params: RequestParams = {}) =>
      this.request<ProfileResponseDto, any>({
        path: `/internal/api/v1/auth/profile`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get all organization users
     *
     * @tags Organization User
     * @name GetUserListForOrganization
     * @summary Get all organization users
     * @request GET:/internal/api/v1/organizations/{organizationId}/users
     * @secure
     */
    getUserListForOrganization: (
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
     * @name CountTotalAdminsOfOrganization
     * @summary Count total admins
     * @request GET:/internal/api/v1/organizations/{organizationId}/users/admin-count
     * @secure
     */
    countTotalAdminsOfOrganization: (organizationId: number, params: RequestParams = {}) =>
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
     * @name InviteUsersToOrganization
     * @summary Bulk invite users
     * @request POST:/internal/api/v1/organizations/{organizationId}/users/bulk-invitations
     * @secure
     */
    inviteUsersToOrganization: (organizationId: number, data: BulkInviteRequestDto, params: RequestParams = {}) =>
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
     * @description Update organization users information
     *
     * @tags Organization User
     * @name UpdateOrganizationUserInformation
     * @summary Update organization users information
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/users/{id}
     * @secure
     */
    updateOrganizationUserInformation: (
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
     * @name DeleteAnOrganizationUser
     * @summary Delete an organization user
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/users/{id}
     * @secure
     */
    deleteAnOrganizationUser: (organizationId: number, id: number, params: RequestParams = {}) =>
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
     * @name GetOrganizationUsersPermissions
     * @summary Get organization user's permissions
     * @request GET:/internal/api/v1/organizations/{organizationId}/users/permissions
     * @secure
     */
    getOrganizationUsersPermissions: (organizationId: number, params: RequestParams = {}) =>
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
     * @description Get statistics for organization
     *
     * @tags Organization Statistics
     * @name GetStatisticsForOrganization
     * @summary Get statistics for organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/statistics
     * @secure
     */
    getStatisticsForOrganization: (
      organizationId: number,
      query?: {
        /** @format date-time */
        date?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<OrganizationStatisticsResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/statistics`,
        method: 'GET',
        query: query,
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
    getRoleListForOrganization: (
      organizationId: number,
      query?: {
        query?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<RoleResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles`,
        method: 'GET',
        query: query,
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
      }),

    /**
     * @description Get invoice list for organization
     *
     * @tags Organization Invoice
     * @name GetInvoiceListForOrganization
     * @summary Get invoice list for organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/invoices
     * @secure
     */
    getInvoiceListForOrganization: (
      organizationId: number,
      query?: {
        /** @format date-time */
        fromDate?: string
        /** @format date-time */
        toDate?: string
        uid?: string
        type?: string
        projectId?: number
        status?: string
        categoryId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<InvoiceResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/invoices`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get invoice by ID for an org
     *
     * @tags Organization Invoice
     * @name GetInvoiceByIdForAnOrg
     * @summary Get invoice by ID for an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/invoices/{id}
     * @secure
     */
    getInvoiceByIdForAnOrg: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<InvoiceResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/invoices/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete an invoice for an organization
     *
     * @tags Organization Invoice
     * @name DeleteAnInvoiceForAnOrganization
     * @summary Delete an invoice for an organization
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/invoices/{id}
     * @secure
     */
    deleteAnInvoiceForAnOrganization: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/invoices/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create projects for an organization
     *
     * @tags Organization Project
     * @name CreateProjectsForAnOrganization
     * @summary Create projects for an organization
     * @request POST:/internal/api/v1/organizations/{organizationId}/projects
     * @secure
     */
    createProjectsForAnOrganization: (
      organizationId: number,
      data: CreateProjectRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<ProjectResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get project list for organization
     *
     * @tags Organization Project
     * @name GetProjectListForOrganization
     * @summary Get project list for organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/projects
     * @secure
     */
    getProjectListForOrganization: (
      organizationId: number,
      query?: {
        query?: string
        /** @format date-time */
        fromDate?: string
        /** @format date-time */
        toDate?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<ProjectResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get project by ID for an org
     *
     * @tags Organization Project
     * @name GetProjectByIdForAnOrg
     * @summary Get project by ID for an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/projects/{id}
     * @secure
     */
    getProjectByIdForAnOrg: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<ProjectResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update a project for an organization
     *
     * @tags Organization Project
     * @name UpdateAProjectForAnOrganization
     * @summary Update a project for an organization
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/projects/{id}
     * @secure
     */
    updateAProjectForAnOrganization: (
      organizationId: number,
      id: number,
      data: UpdateProjectRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<ProjectResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete a project for an organization
     *
     * @tags Organization Project
     * @name DeleteAProjectForAnOrganization
     * @summary Delete a project for an organization
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/projects/{id}
     * @secure
     */
    deleteAProjectForAnOrganization: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create invoices for a project of organization
     *
     * @tags Organization Project Invoice
     * @name CreateInvoicesForAProjectOfOrganization
     * @summary Create invoices for a project of organization
     * @request POST:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/invoices
     * @secure
     */
    createInvoicesForAProjectOfOrganization: (
      organizationId: number,
      projectId: number,
      data: CreateInvoiceRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<InvoiceResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/invoices`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get invoice list for a project of organization
     *
     * @tags Organization Project Invoice
     * @name GetInvoiceListForAProjectOfOrganization
     * @summary Get invoice list for a project of organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/invoices
     * @secure
     */
    getInvoiceListForAProjectOfOrganization: (
      organizationId: number,
      projectId: number,
      query?: {
        /** @format date-time */
        fromDate?: string
        /** @format date-time */
        toDate?: string
        uid?: string
        type?: string
        projectId?: number
        status?: string
        categoryId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<InvoiceResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/invoices`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update an invoice for a project of organization
     *
     * @tags Organization Project Invoice
     * @name UpdateAnInvoiceForAProjectOfOrganization
     * @summary Update an invoice for a project of organization
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/invoices/{id}
     * @secure
     */
    updateAnInvoiceForAProjectOfOrganization: (
      organizationId: number,
      projectId: number,
      id: number,
      data: UpdateInvoiceRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<InvoiceResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/invoices/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Create project's budget for an organization
     *
     * @tags Organization Project Budget
     * @name CreateProjectsBudgetForAnOrganization
     * @summary Create project's budget for an organization
     * @request POST:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/budgets
     * @secure
     */
    createProjectsBudgetForAnOrganization: (
      organizationId: number,
      projectId: number,
      data: CreateBudgetRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<BudgetResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/budgets`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get budget list for project of organization
     *
     * @tags Organization Project Budget
     * @name GetBudgetListForProjectOfOrganization
     * @summary Get budget list for project of organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/budgets
     * @secure
     */
    getBudgetListForProjectOfOrganization: (
      organizationId: number,
      projectId: number,
      query?: {
        categoryId?: number
        fromAmount?: number
        toAmount?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<BudgetResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/budgets`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get project's budget by ID for an org
     *
     * @tags Organization Project Budget
     * @name GetProjectsBudgetByIdForAnOrg
     * @summary Get project's budget by ID for an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/budgets/{id}
     * @secure
     */
    getProjectsBudgetByIdForAnOrg: (
      organizationId: number,
      projectId: number,
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<BudgetResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/budgets/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update a budget for a project of organization
     *
     * @tags Organization Project Budget
     * @name UpdateABudgetForAProjectOfOrganization
     * @summary Update a budget for a project of organization
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/budgets/{id}
     * @secure
     */
    updateABudgetForAProjectOfOrganization: (
      organizationId: number,
      projectId: number,
      id: number,
      data: UpdateBudgetRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<BudgetResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/budgets/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete a project's budget for an organization
     *
     * @tags Organization Project Budget
     * @name DeleteAProjectsBudgetForAnOrganization
     * @summary Delete a project's budget for an organization
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/budgets/{id}
     * @secure
     */
    deleteAProjectsBudgetForAnOrganization: (
      organizationId: number,
      projectId: number,
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/budgets/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create project's category for an organization
     *
     * @tags Organization Project Category
     * @name CreateProjectsCategoryForAnOrganization
     * @summary Create project's category for an organization
     * @request POST:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/categories
     * @secure
     */
    createProjectsCategoryForAnOrganization: (
      organizationId: number,
      projectId: number,
      data: CreateCategoryRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<CategoryResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/categories`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get category list for project of organization
     *
     * @tags Organization Project Category
     * @name GetCategoryListForProjectOfOrganization
     * @summary Get category list for project of organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/categories
     * @secure
     */
    getCategoryListForProjectOfOrganization: (
      organizationId: number,
      projectId: number,
      query?: {
        query?: string
        type?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<CategoryResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/categories`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get project's category by ID for an org
     *
     * @tags Organization Project Category
     * @name GetProjectsCategoryByIdForAnOrg
     * @summary Get project's category by ID for an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/categories/{id}
     * @secure
     */
    getProjectsCategoryByIdForAnOrg: (
      organizationId: number,
      projectId: number,
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<CategoryResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/categories/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update a category for a project of organization
     *
     * @tags Organization Project Category
     * @name UpdateACategoryForAProjectOfOrganization
     * @summary Update a category for a project of organization
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/categories/{id}
     * @secure
     */
    updateACategoryForAProjectOfOrganization: (
      organizationId: number,
      projectId: number,
      id: number,
      data: UpdateCategoryRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<CategoryResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/categories/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete a project's category for an organization
     *
     * @tags Organization Project Category
     * @name DeleteAProjectsCategoryForAnOrganization
     * @summary Delete a project's category for an organization
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/categories/{id}
     * @secure
     */
    deleteAProjectsCategoryForAnOrganization: (
      organizationId: number,
      projectId: number,
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/categories/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get statistics for project of organization
     *
     * @tags Organization Project Statistics
     * @name GetStatisticsForProjectOfOrganization
     * @summary Get statistics for project of organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/projects/{projectId}/statistics
     * @secure
     */
    getStatisticsForProjectOfOrganization: (
      organizationId: number,
      projectId: number,
      query?: {
        /** @format date-time */
        date?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<ProjectStatisticsResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/projects/${projectId}/statistics`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      })
  }
}
