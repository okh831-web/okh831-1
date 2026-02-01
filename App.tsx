import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Home as HomeIcon, 
  Users, 
  MessageSquare, 
  Settings,
  AlertTriangle,
  RefreshCcw
} from 'lucide-react';
import { PageView, UniversityAgg } from './types.ts';
import { DUMMY_UNIV_DATA, DUMMY_DEPTS } from './constants.ts';

// Pages
import HomePage from './pages/HomePage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import DeptHubPage from './pages/DeptHubPage.tsx';
import DeptDetailPage from './pages/DeptDetailPage.tsx';
import CommunityPage from './pages/CommunityPage.tsx';
import AdminPage from './pages/AdminPage.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [universityData, setUniversityData] = useState<UniversityAgg>(DUMMY_UNIV_DATA as UniversityAgg);
  const [departmentData, setDepartmentData] = useState<any[]>(DUMMY_DEPTS);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    // 1. 드로어로 인한 overflow lock 방지 및 초기화
    document.body.style.overflow = 'auto';
    
    // 2. 데이터 유실 방지
    if (!universityData || !departmentData.length) {
      setUniversityData(DUMMY_UNIV_DATA as UniversityAgg);
      setDepartmentData(DUMMY_DEPTS);
    }

    // 3. 윈도우 에러 캡처 (Global Error Boundary 대체)
    const handleError = (e: ErrorEvent) => {
      console.error("Global Error Caught:", e.message);
      setRenderError(e.message);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const handleDataUpdate = (univ: UniversityAgg, depts: any[]) => {
    try {
      setUniversityData(univ);
      setDepartmentData(depts);
    } catch (e: any) {
      console.error("Data update failed:", e);
      setRenderError("데이터 처리 중 오류: " + e.message);
    }
  };

  if (renderError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-red-100 max-w-lg w-full">
          <AlertTriangle size={64} className="text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 mb-4">런타임 오류가 발생했습니다</h1>
          <p className="text-slate-500 mb-6">컴포넌트를 렌더링하는 중 문제가 발생하여 실행을 중단했습니다.</p>
          <div className="bg-slate-50 p-4 rounded-xl text-left mb-8 overflow-x-auto max-h-40 border border-slate-200">
            <code className="text-[11px] text-red-600 font-mono leading-relaxed">{renderError}</code>
          </div>
          <button 
            onClick={() => { setRenderError(null); setCurrentPage('home'); window.location.reload(); }}
            className="w-full flex items-center justify-center px-6 py-4 bg-[#006633] text-white rounded-2xl font-bold shadow-lg hover:bg-[#004d26] transition-all"
          >
            <RefreshCcw size={20} className="mr-2" /> 초기 화면으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    try {
      switch (currentPage) {
        case 'home':
          return <HomePage onStart={() => setCurrentPage('dashboard')} onDept={() => setCurrentPage('dept-hub')} />;
        case 'dashboard':
          return <DashboardPage data={universityData} onUpdateData={handleDataUpdate} />;
        case 'dept-hub':
          return <DeptHubPage depts={departmentData} onSelectDept={(id) => { setSelectedDeptId(id); setCurrentPage('dept-detail'); }} />;
        case 'dept-detail': {
          // 중괄호 블록을 추가하여 렉시컬 선언(const) 오류 방지
          const selectedDept = departmentData.find(d => (d.deptId === selectedDeptId || d.id === selectedDeptId)) || departmentData[0];
          return <DeptDetailPage deptSummary={selectedDept} universityData={universityData} onBack={() => setCurrentPage('dept-hub')} />;
        }
        case 'community':
          return <CommunityPage />;
        case 'admin':
          return <AdminPage onUpdateData={handleDataUpdate} />;
        default:
          return <HomePage onStart={() => setCurrentPage('dashboard')} onDept={() => setCurrentPage('dept-hub')} />;
      }
    } catch (e: any) {
      console.error("Content rendering crash:", e);
      setRenderError(e.toString());
      return null;
    }
  };

  const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 text-sm font-bold transition-all rounded-lg ${
        active 
          ? 'text-[#006633] bg-[#E6F0EA] shadow-sm' 
          : 'text-gray-500 hover:text-[#006633] hover:bg-gray-100'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col relative overflow-x-hidden bg-[#f8fafc]">
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] no-print h-16 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center cursor-pointer group" onClick={() => setCurrentPage('home')}>
              <div className="w-9 h-9 bg-[#006633] rounded-lg flex items-center justify-center text-white mr-3 shadow-md group-hover:scale-105 transition-transform">
                <span className="font-black text-lg">K</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-slate-900 tracking-tight">건양대학교</span>
                <span className="ml-2 text-xs text-slate-400 font-medium">역량 진단 포털</span>
              </div>
            </div>
            <div className="hidden md:flex ml-10 space-x-1">
              <NavItem active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={<HomeIcon size={18}/>} label="홈" />
              <NavItem active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} icon={<BarChart3 size={18}/>} label="대시보드" />
              <NavItem active={currentPage === 'dept-hub' || currentPage === 'dept-detail'} onClick={() => setCurrentPage('dept-hub')} icon={<Users size={18}/>} label="학과별" />
              <NavItem active={currentPage === 'community'} onClick={() => setCurrentPage('community')} icon={<MessageSquare size={18}/>} label="커뮤니티" />
            </div>
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentPage('admin')}
              className={`p-2 rounded-lg transition-all ${currentPage === 'admin' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-100'}`}
              title="관리자 설정"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow z-10 w-full relative">
        <div className="min-h-[calc(100dvh-64px)] w-full">
          {renderContent()}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 mt-auto py-8 z-20 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="text-sm text-slate-400 font-medium">
            <p>© 2026 Konyang University IR Center.</p>
            <p className="mt-1 text-[10px]">6대 핵심역량(자기신뢰, 라이프디자인, 프로페셔널리즘, 창조적도전, 융화적소통, 공동체참여)</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs font-bold text-slate-300">
            <span>SYSTEM VERSION 2026.R1</span>
            <span>최근 업데이트: {universityData?.updatedAt}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;