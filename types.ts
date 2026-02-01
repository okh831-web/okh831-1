
export interface CompetencyData {
  c1: number; // 자기신뢰
  c2: number; // 라이프디자인
  c3: number; // 프로페셔널리즘
  c4: number; // 창조적 도전
  c5: number; // 융화적 소통
  c6: number; // 공동체참여
}

export interface SubCompetencyData {
  s1: number; s2: number; s3: number; s4: number; s5: number; s6: number;
  s7: number; s8: number; s9: number; s10: number; s11: number; s12: number;
}

export interface AggregatedResult extends CompetencyData, SubCompetencyData {
  name: string;
  sampleSize: number;
  overall: number;
  standardDeviation?: number;
  updatedAt: string;
}

export interface DeptResult extends AggregatedResult {
  deptId: string;
  diffFromUniv: CompetencyData;
}

export interface UniversityAgg extends AggregatedResult {
  id: 'university_total';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  category: 'notice' | 'resource';
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved';
  createdAt: string;
}

export type PageView = 'home' | 'dashboard' | 'dept-hub' | 'dept-detail' | 'community' | 'admin';

export interface ColumnMapping {
  dept: string;
  overall: string;
  c1: string; c2: string; c3: string; c4: string; c5: string; c6: string;
  s1: string; s2: string; s3: string; s4: string; s5: string; s6: string;
  s7: string; s8: string; s9: string; s10: string; s11: string; s12: string;
}
