
import React, { useState } from 'react';
import { Search, Filter, ChevronRight } from 'lucide-react';

const DeptHubPage: React.FC<{ depts: any[], onSelectDept: (id: string) => void }> = ({ depts, onSelectDept }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'size'>('score');

  const filteredDepts = depts
    .filter(d => d.name.includes(searchTerm))
    .sort((a, b) => {
      if (sortBy === 'score') return b.overall - a.overall;
      if (sortBy === 'size') return b.sampleSize - a.sampleSize;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">학과별 진단결과 탐색 (2026)</h1>
        <p className="text-gray-500 mt-2">각 학과별 상세 진단 결과와 대학 평균 대비 성취도를 확인하세요.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="학과명을 검색하세요..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006633]/20 focus:border-[#006633]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
            <Filter size={16} className="mr-2" />
            <select 
              className="bg-transparent focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="score">점수 높은 순</option>
              <option value="name">학과명 순</option>
              <option value="size">참여자 많은 순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dept Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => (
          <button
            key={dept.deptId}
            onClick={() => onSelectDept(dept.deptId)}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-md uppercase tracking-wider">Department Profile</span>
                <ChevronRight className="text-gray-300 group-hover:text-[#006633] group-hover:translate-x-1 transition-all" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
              <div className="flex items-center text-sm text-gray-500 space-x-3">
                <span>표본수: N={dept.sampleSize}</span>
                <span>•</span>
                <span>전체 평균: <span className="text-[#006633] font-bold">{dept.overall.toFixed(1)}</span></span>
              </div>
            </div>
            <div className="mt-8">
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#006633] rounded-full transition-all duration-1000"
                  style={{ width: `${dept.overall}%` }}
                ></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeptHubPage;
