/* Authentication & User */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  groups: string[];
}

export type UserRole =
  | 'front-office'
  | 'data-governance-admin'
  | 'read-only'
  | 'audit'
  | 'system-admin';

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: string;
}

export interface Session {
  isAuthenticated: boolean;
  user: User | null;
  isEmergencyMode: boolean;
}

/* Portfolio */
export interface Portfolio {
  id: string;
  name: string;
  currency: string;
  domicile: string;
  description?: string;
  legalEntity: string;
  manager: string;
  saa: boolean;
  assetOwner: string;
  bookType: string;
  bankAccount: string;
  ph1: string;
  ph2: string;
  ph3: string;
  ph4: string;
  status: PortfolioStatus;
  createdAt: string;
  modifiedAt: string;
  createdBy: string;
  modifiedBy: string;
}

export type PortfolioStatus =
  | 'draft'
  | 'submitted'
  | 'codes-generated'
  | 'aladdin-entered';

export interface PortfolioSubmissionRequest {
  portfolioName: string;
  currency: string;
  domicile: string;
  description?: string;
  legalEntity: string;
  manager: string;
  saa: boolean;
  assetOwner: string;
  bookType: string;
  bankAccount: string;
  effectiveDate?: string;
}

export interface PortfolioReclassification {
  portfolioId: string;
  changes: Record<string, { old: string; new: string }>;
  effectiveDate: string;
  changedBy: string;
  changedAt: string;
}

/* Mapping Tables */
export interface MappingTableEntry {
  id: string;
  code: string;
  description: string;
  active: boolean;
  createdBy: string;
  createdAt: string;
  modifiedAt: string;
}

export type MappingTableType =
  | 'legal-entity'
  | 'manager'
  | 'saa'
  | 'asset-owner'
  | 'book-type'
  | 'currency'
  | 'domicile'
  | 'product-group'
  | 'mandate';

/* Audit Trail */
export interface AuditTrailRecord {
  id: string;
  entityType: string;
  entityId: string;
  action: AuditAction;
  oldValues: Record<string, any>;
  newValues: Record<string, any>;
  userId: string;
  timestamp: string;
  ipAddress?: string;
}

export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'RECLASSIFY'
  | 'MAPPING_ADD'
  | 'MAPPING_EDIT'
  | 'MAPPING_DELETE'
  | 'LOGIN'
  | 'LOGOUT';

/* Reports */
export interface SetupTimeMetrics {
  averageSetupTime: number;
  minSetupTime: number;
  maxSetupTime: number;
  portfoliosCount: number;
  targetTime: number;
}

export interface MonthlySetupTimeData {
  month: string;
  averageSetupTime: number;
  portfoliosCount: number;
  percentageChange?: number;
}

export interface ComplianceMetrics {
  auditTrailCompleteness: number;
  recordsThisMonth: number;
  reclassifications: number;
  mappingChanges: number;
  deactivations: number;
}

/* API Responses */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/* Form State */
export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
}

/* Notification */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string;
  duration?: number;
  timestamp: string;
}

/* Table Configuration */
export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableState {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}
