export interface EmploymentContract {
    id?: number;
    contractDurationInMonths: number;
    contractStart?: Date;
    contractType?: 'PERMANENT' | 'FIXED_TERM';
  }