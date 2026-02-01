
import React from 'react';
import { ArrowRight, CheckCircle2, Target, Globe, Lightbulb, Users as UsersIcon, Heart } from 'lucide-react';
import { MAIN_COMPETENCIES } from '../constants.ts';

const HomePage: React.FC<{ onStart: () => void, onDept: () => void }> = ({ onStart, onDept }) => {
  const getIcon = (id: string) => {
    switch(id) {
      case 'c1': return <Target className="text-emerald-600" />;
      case 'c2': return <Lightbulb className="text-amber-500" />;
      case 'c3': return <Globe className="text-blue-500" />;
      case 'c4': return <ArrowRight className="text-rose-500" />;
      case 'c5': return <UsersIcon className="text-indigo-500" />;
      case 'c6': return <Heart className="text-pink-500" />;
      default: return <CheckCircle2 />;
    }
  };

  return (
    <div className="bg-white">
      <section className="relative py-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/id/122/1920/1080')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              건양대학교 <br/>
              <span className="text-[#4ade80]">핵심역량 진단</span> 포털(2026)
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              자신만의 가치를 설계하고 세상을 변화시키는 건양인의 역량을 데이터로 확인하세요. <br/>
              정직한 분석과 투명한 공개로 교육의 질을 높입니다.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-[#006633] text-white rounded-lg font-bold text-lg hover:bg-[#004d26] transition-all flex items-center justify-center shadow-lg shadow-emerald-900/20"
              >
                전체 결과 보기
              </button>
              <button 
                onClick={onDept}
                className="px-8 py-4 bg-white/10 text-white backdrop-blur-md rounded-lg font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center border border-white/30"
              >
                학과별 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6대 핵심역량 체계</h2>
            <div className="w-20 h-1.5 bg-[#006633] mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600">
              건양대학교는 2026년 개편된 체계를 바탕으로 학생들의 전인적 성장을 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MAIN_COMPETENCIES.map((comp) => (
              <div key={comp.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 border border-gray-100">
                  {getIcon(comp.id)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{comp.name}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {comp.definition}
                </p>
                <div className="pt-6 border-t border-gray-50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">하위 역량</span>
                  <div className="flex flex-wrap gap-2">
                    {comp.sub.map(s => (
                      <span key={s} className="px-3 py-1 bg-[#E6F0EA] text-[#006633] text-xs font-semibold rounded-full border border-emerald-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
