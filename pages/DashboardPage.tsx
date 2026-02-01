
import React, { useState, useCallback, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { UniversityAgg } from '../types.ts';
import { CompetencyRadarChart, CompetencyBarChart, SubCompetencyHeatmap } from '../components/Charts.tsx';
import { MAIN_COMPETENCIES, SUB_COMPETENCY_NAMES } from '../constants.ts';
import { 
  TrendingUp, Users, Activity, X, 
  FileUp, Calendar, FileText, Settings2 
} from 'lucide-react';

interface DashboardPageProps {
  data: UniversityAgg;
  onUpdateData: (univ: UniversityAgg, depts: any[]) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ data, onUpdateData }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [mapping, setMapping] = useState<any>(null);
  const [scale, setScale] = useState<number>(100); 

  // 드로어 상태에 따른 overflow 제어 및 클린업
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // 컴포넌트 언마운트 시 강제 복구
    return () => { document.body.style.overflow = 'auto'; };
  }, [isDrawerOpen]);

  const radarData = MAIN_COMPETENCIES.map(c => ({
    label: c.name,
    value: Number(data?.[c.id as keyof UniversityAgg]) || 0
  }));

  const subData = [
    data?.s1 || 0, data?.s2 || 0, data?.s3 || 0, data?.s4 || 0, data?.s5 || 0, data?.s6 || 0,
    data?.s7 || 0, data?.s8 || 0, data?.s9 || 0, data?.s10 || 0, data?.s11 || 0, data?.s12 || 0
  ];

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRawFile(file);
    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const jsonData: any[] = XLSX.utils.sheet_to_json(ws);
          
          if (jsonData.length > 0) {
            const columns = Object.keys(jsonData[0]);
            const newMapping = {
              dept: columns.find(c => c.includes('학과')) || columns[0],
              overall: columns.find(c => c.toLowerCase().includes('전체') || c.toLowerCase().includes('overall')) || columns[1],
              competencies: MAIN_COMPETENCIES.map((_, idx) => columns.find(c => c.toLowerCase().includes(`c${idx+1}`)) || ''),
              subCompetencies: SUB_COMPETENCY_NAMES.map((_, idx) => columns.find(c => c.toLowerCase().includes(`s${idx+1}`)) || '')
            };
            setMapping({ columns, current: newMapping, data: jsonData });
          }
          setIsUploading(false);
        } catch (err) {
          setIsUploading(false);
        }
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      setIsUploading(false);
    }
  }, []);

  const applyData = () => {
    if (!mapping) return;
    const { data: rawData, current } = mapping;
    const deptsMap = new Map();
    
    rawData.forEach((row: any) => {
      const deptName = row[current.dept];
      if (!deptName) return;
      if (!deptsMap.has(deptName)) deptsMap.set(deptName, { scores: [], count: 0 });
      const d = deptsMap.get(deptName);
      d.count += 1;
      const multiplier = 100 / scale;
      const getVal = (key: string) => (parseFloat(row[key]) || 0) * multiplier;
      d.scores.push({
        overall: getVal(current.overall),
        c1: getVal(current.competencies[0]), c2: getVal(current.competencies[1]), c3: getVal(current.competencies[2]),
        c4: getVal(current.competencies[3]), c5: getVal(current.competencies[4]), c6: getVal(current.competencies[5]),
        s1: getVal(current.subCompetencies[0]), s2: getVal(current.subCompetencies[1]), s3: getVal(current.subCompetencies[2]),
        s4: getVal(current.subCompetencies[3]), s5: getVal(current.subCompetencies[4]), s6: getVal(current.subCompetencies[5]),
        s7: getVal(current.subCompetencies[6]), s8: getVal(current.subCompetencies[7]), s9: getVal(current.subCompetencies[8]),
        s10: getVal(current.subCompetencies[9]), s11: getVal(current.subCompetencies[10]), s12: getVal(current.subCompetencies[11]),
      });
    });

    const finalDepts: any[] = [];
    const univSum: any = { overall: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0, c6: 0, s1:0, s2:0, s3:0, s4:0, s5:0, s6:0, s7:0, s8:0, s9:0, s10:0, s11:0, s12:0 };
    let totalN = 0;

    deptsMap.forEach((val, key) => {
      const avg = (field: string) => val.scores.reduce((acc: number, cur: any) => acc + (cur[field] || 0), 0) / val.count;
      finalDepts.push({
        deptId: `dept_${key}`, name: key, sampleSize: val.count, overall: avg('overall'),
        c1: avg('c1'), c2: avg('c2'), c3: avg('c3'), c4: avg('c4'), c5: avg('c5'), c6: avg('c6'),
        s1: avg('s1'), s2: avg('s2'), s3: avg('s3'), s4: avg('s4'), s5: avg('s5'), s6: avg('s6'),
        s7: avg('s7'), s8: avg('s8'), s9: avg('s9'), s10: avg('s10'), s11: avg('s11'), s12: avg('s12'),
      });
      totalN += val.count;
      Object.keys(univSum).forEach((k: any) => { univSum[k] += val.scores.reduce((acc: number, cur: any) => acc + (cur[k] || 0), 0); });
    });

    const universityAgg: UniversityAgg = {
      id: 'university_total', name: '건양대학교 전체', sampleSize: totalN, overall: univSum.overall / totalN,
      c1: univSum.c1 / totalN, c2: univSum.c2 / totalN, c3: univSum.c3 / totalN, c4: univSum.c4 / totalN, c5: univSum.c5 / totalN, c6: univSum.c6 / totalN,
      s1: univSum.s1 / totalN, s2: univSum.s2 / totalN, s3: univSum.s3 / totalN, s4: univSum.s4 / totalN, s5: univSum.s5 / totalN, s6: univSum.s6 / totalN,
      s7: univSum.s7 / totalN, s8: univSum.s8 / totalN, s9: univSum.s9 / totalN, s10: univSum.s10 / totalN, s11: univSum.s11 / totalN, s12: univSum.s12 / totalN,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    onUpdateData(universityAgg, finalDepts);
    setIsDrawerOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-6 md:space-y-0">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">대학 전체 진단 현황</h1>
            <p className="text-slate-500 mt-2 font-medium">건양대학교 학생들의 핵심역량 성취도를 실시간 분석합니다.</p>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center px-6 py-3.5 bg-[#006633] text-white rounded-2xl font-bold hover:bg-[#004d26] transition-all shadow-xl shadow-emerald-900/10 no-print active:scale-95"
          >
            <Settings2 size={20} className="mr-2" /> 데이터 관리
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <KPICard title="전체 평균" value={Number(data?.overall || 0).toFixed(1)} unit="점" icon={<TrendingUp className="text-emerald-500" />} color="bg-emerald-50" />
          <KPICard title="총 참여자" value={Number(data?.sampleSize || 0).toLocaleString()} unit="명" icon={<Users className="text-blue-500" />} color="bg-blue-50" />
          <KPICard title="업데이트" value={data?.updatedAt || '-'} icon={<Calendar className="text-amber-500" />} color="bg-amber-50" />
          <KPICard title="안정성" value="98.2" unit="%" icon={<Activity className="text-rose-500" />} color="bg-rose-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col min-h-[400px]">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">핵심역량 밸런스</h3>
            <div className="flex-grow">
              <CompetencyRadarChart data={radarData} label1="대학 평균" />
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col min-h-[400px]">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">역량별 순위</h3>
            <div className="flex-grow">
              <CompetencyBarChart data={radarData} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-8">하위역량 상세 매트릭스</h3>
          <SubCompetencyHeatmap data={subData} labels={SUB_COMPETENCY_NAMES} />
        </div>
      </div>

      {/* Drawer Overlay (z-index 200+) */}
      <div 
        className={`fixed inset-0 z-[200] transition-all duration-300 no-print ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
        <div 
          className={`absolute right-0 top-0 w-full max-w-md bg-white h-[100dvh] shadow-2xl flex flex-col transition-transform duration-300 transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#006633] text-white">
            <h2 className="text-lg font-bold flex items-center"><FileUp size={20} className="mr-2" /> 새 데이터 업로드</h2>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20}/></button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">1. 파일 선택</h3>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50 hover:border-[#006633] transition-all relative group">
                <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <FileUp className="w-10 h-10 text-slate-300 mx-auto mb-2 group-hover:text-[#006633] transition-colors" />
                <p className="text-sm text-slate-900 font-bold">{rawFile ? rawFile.name : '엑셀 파일을 선택하세요'}</p>
                <p className="text-[11px] text-slate-400 mt-1">N(학과), C1~C6, S1~S12 컬럼 포함</p>
              </div>
            </section>
            
            {mapping && (
              <section className="animate-in fade-in slide-in-from-top-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">2. 점수 스케일링</h3>
                <div className="flex bg-slate-100 p-1.5 rounded-xl">
                  <button onClick={() => setScale(100)} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${scale === 100 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>100점 만점</button>
                  <button onClick={() => setScale(5)} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${scale === 5 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>5점 만점</button>
                </div>
              </section>
            )}
          </div>

          <div className="p-6 border-t border-gray-100 flex space-x-3 bg-gray-50/50">
            <button onClick={() => setIsDrawerOpen(false)} className="flex-1 py-4 border border-slate-200 text-slate-500 rounded-2xl font-bold bg-white hover:bg-slate-100 transition-colors">취소</button>
            <button 
              disabled={!mapping} 
              onClick={applyData} 
              className={`flex-[2] py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${mapping ? 'bg-[#006633] shadow-emerald-900/20 active:scale-95' : 'bg-slate-200 cursor-not-allowed'}`}
            >
              대시보드 업데이트
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, unit, icon, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12`}>{icon}</div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
    </div>
    <div className="flex items-baseline space-x-1">
      <span className="text-3xl font-black text-slate-900">{value}</span>
      {unit && <span className="text-xs text-slate-400 font-bold">{unit}</span>}
    </div>
  </div>
);

export default DashboardPage;
