
export const COLORS = {
  primary: '#006633', // Konyang Green
  secondary: '#FFCC00', // Konyang Yellow/Gold
  accent: '#E6F0EA',
  background: '#F8FAFC',
  text: '#1E293B'
};

export const MAIN_COMPETENCIES = [
  { id: 'c1', name: '자기신뢰', definition: '자신에 대한 긍정적 믿음과 자아 정체성 확립', sub: ['자기이해', '자기관리'] },
  { id: 'c2', name: '라이프디자인', definition: '주체적인 생애 설계와 진로 목표 실행력', sub: ['진로설계', '목표실행'] },
  { id: 'c3', name: '프로페셔널리즘', definition: '전문 지식 습득과 직무 윤리 및 책임 의식', sub: ['직무기초', '윤리/책임'] },
  { id: 'c4', name: '창조적 도전', definition: '비판적 사고를 통한 창의적 문제해결 및 도전', sub: ['문제해결', '혁신/도전'] },
  { id: 'c5', name: '융화적 소통', definition: '타인과의 협력 및 원활한 의사소통 능력', sub: ['협업', '의사소통'] },
  { id: 'c6', name: '공동체참여', definition: '사회적 공헌과 책임감 있는 시민 의식', sub: ['사회참여', '공동체의식'] }
];

export const SUB_COMPETENCY_NAMES = [
  '자기이해', '자기관리', '진로설계', '목표실행', '직무기초', '윤리/책임',
  '문제해결', '혁신/도전', '협업', '의사소통', '사회참여', '공동체의식'
];

export const DUMMY_UNIV_DATA = {
  id: 'university_total',
  name: '건양대학교 전체',
  sampleSize: 12450,
  overall: 78.4,
  c1: 82.1, c2: 75.3, c3: 80.5, c4: 72.8, c5: 81.2, c6: 78.5,
  s1: 83, s2: 81, s3: 76, s4: 74, s5: 81, s6: 80, s7: 73, s8: 72, s9: 82, s10: 80, s11: 79, s12: 78,
  updatedAt: '2026-01-15'
};

export const DUMMY_DEPTS = [
  { deptId: 'd1', name: '간호학과', overall: 85.2, sampleSize: 420 },
  { deptId: 'd2', name: '의학과', overall: 84.8, sampleSize: 310 },
  { deptId: 'd3', name: '컴퓨터공학과', overall: 79.5, sampleSize: 280 },
  { deptId: 'd4', name: '시각디자인학과', overall: 76.2, sampleSize: 150 },
  { deptId: 'd5', name: '사회복지학과', overall: 81.1, sampleSize: 190 },
];

export const ADMIN_EMAIL = 'okh831@gmail.com';
