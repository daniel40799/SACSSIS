export type AuthRole =
  | 'STUDENT'
  | 'FACULTY'
  | 'REGISTRAR'
  | 'BUSINESS_OFFICE'
  | 'ADMIN'
  | 'ACCOUNTING_STAFF'
  | 'HS_FORMATOR'
  | 'GS_FORMATOR'
  | 'GUIDANCE';

export interface CurrentUserResponse {
  authenticated: boolean;
  email?: string;
  name?: string;
  avatarUrl?: string | null;
  studentId?: number | null;
  facultyId?: number | null;
  roleCode?: AuthRole | null;
}
