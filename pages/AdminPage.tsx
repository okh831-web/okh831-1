
import React, { useState } from 'react';
import { Upload, CheckCircle, FileSpreadsheet, Settings, LogOut, Database, History, Activity } from 'lucide-react';
import { UniversityAgg } from '../types.ts';

const AdminPage: React.FC<{ onUpdateData: (univ: UniversityAgg, depts: any[]) => void }> = ({ onUpdateData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 border border-gray-100 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#006633]/10 text-[#006633] rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">관리자 로그인 (2026)</h2>
            <p className="text-gray-500 text-sm mt-2">시스템 관리자만 접근 가능합니다.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">관리자 암호</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#006633]/20 focus:border-[#006633]"
                placeholder="Password"
              />
            </div>
            <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">데이터 관리 센터 (2026)</h1>
          <p className="text-gray-500 mt-2">영구 저장 모드 및 시스템 설정을 관리합니다.</p>
        </div>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="px-4 py-2 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 transition-all flex items-center font-bold text-sm"
        >
          <LogOut size={16} className="mr-2" /> 로그아웃
        </button>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 mb-8">
        <h3 className="text-lg font-bold text-[#006633] mb-2">영구 저장 모드 안내</h3>
        <p className="text-[#006633]/80 text-sm">
          관리자 로그인이 완료되었습니다. 이제 대시보드 페이지에서 데이터를 업로드하고 '반영하기'를 누르면 브라우저 세션 동안 집계 데이터가 유지됩니다.<br/>
          실제 운영 환경에서는 반영 시 Firestore DB로 영구 저장되어 모든 사용자가 동일한 결과를 보게 됩니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center">
            <Activity className="mr-2 text-rose-500" size={18} /> 실시간 통계
          </h4>
          <div className="space-y-4">
            <StatRow label="총 응답 수" value="현재 데이터 기준" />
            <StatRow label="집계 학과 수" value="업로드 시 자동 산출" />
            <StatRow label="데이터 기준일" value="2026.01.15" />
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center">
            <History className="mr-2 text-amber-500" size={18} /> 최근 변경 이력
          </h4>
          <div className="space-y-4">
            <HistoryItem date="26-01-15" action="전체 데이터 업데이트 (초기화)" />
            <HistoryItem date="26-01-10" action="2026 개편 체계 레이블 적용" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-bold text-gray-900">{value}</span>
  </div>
);

const HistoryItem = ({ date, action }: { date: string, action: string }) => (
  <div className="text-xs">
    <span className="text-gray-400 block mb-0.5">{date}</span>
    <span className="font-medium text-gray-700">{action}</span>
  </div>
);

export default AdminPage;
