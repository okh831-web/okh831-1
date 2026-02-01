
import React from 'react';
import { ChevronLeft, Share2, Mail, Download, TrendingUp, AlertTriangle } from 'lucide-react';
import { UniversityAgg } from '../types.ts';
import { CompetencyRadarChart, CompetencyBarChart, SubCompetencyHeatmap } from '../components/Charts.tsx';
import { MAIN_COMPETENCIES, SUB_COMPETENCY_NAMES } from '../constants.ts';

const DeptDetailPage: React.FC<{ deptSummary: any, universityData: UniversityAgg, onBack: () => void }> = ({ deptSummary, universityData, onBack }) => {
  const radarDept = MAIN_COMPETENCIES.map(c => ({ 
    label: c.name, 
    value: Number(deptSummary?.[c.id]) || 0 
  }));
  const radarUniv = MAIN_COMPETENCIES.map(c => ({ 
    label: c.name, 
    value: Number(universityData?.[c.id as keyof UniversityAgg]) || 0 
  }));
  
  const subData = SUB_COMPETENCY_NAMES.map((_, i) => Number(deptSummary?.[`s${i+1}`]) || 0);
  const diff = (Number(deptSummary?.overall) || 0) - (Number(universityData?.overall) || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 no-print">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#006633] transition-colors">
          <ChevronLeft size={20} className="mr-1" /> 학과 목록으로 돌아가기
        </button>
        <div className="flex space-x-2">
          <button onClick={() => window.print()} className="p-2 bg-[#006633] text-white rounded-lg hover:bg-[#004d26] flex items-center text-sm font-medium">
            <Download size={16} className="mr-2" /> PDF 출력
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-50 pb-8">
          <div>
            <span className="px-3 py-1 bg-emerald-50 text-[#006633] text-xs font-bold rounded-full mb-3 inline-block uppercase tracking-wider border border-emerald-100">
              Department Analysis (2026)
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900">{deptSummary?.name || '학과명'}</h1>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-8">
            <div className="text-center">
              <span className="text-xs text-gray-400 font-bold block mb-1">표본수 (N)</span>
              <span className="text-2xl font-bold text-gray-900">{deptSummary?.sampleSize || 0}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-400 font-bold block mb-1">학과 평균</span>
              <span className="text-2xl font-bold text-[#006633]">{(Number(deptSummary?.overall) || 0).toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">학과 vs 대학 평균 비교</h3>
            <CompetencyRadarChart data={radarDept} data2={radarUniv} label1="학과 평균" label2="대학 평균" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">역량별 상세 점수</h3>
            <CompetencyBarChart data={radarDept} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-6">12개 하위역량 상세 분포</h3>
        <SubCompetencyHeatmap data={subData} labels={SUB_COMPETENCY_NAMES} />
      </div>
    </div>
  );
};

export default DeptDetailPage;
