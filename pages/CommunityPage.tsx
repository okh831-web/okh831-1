
import React, { useState } from 'react';
import { Send, FileText, Bell, User, Mail, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ADMIN_EMAIL } from '../constants.ts';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notice' | 'inquiry'>('notice');
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleEmailRedirect = () => {
    const receiptNo = `KY-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    const subject = `[2026 핵심역량포털] 문의 접수: ${receiptNo}`;
    const body = `--- 포털 문의 상세 내역 ---\n접수번호: ${receiptNo}\n발신인: ${inquiryForm.name}\n회신 이메일: ${inquiryForm.email}\n문의 제목: ${inquiryForm.subject}\n\n문의 내용:\n${inquiryForm.message}\n\n접수 일시: ${new Date().toLocaleString()}\n시스템 명: 건양대학교 핵심역량 진단 포털(2026)`;
    
    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12 text-center animate-in fade-in duration-700">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">커뮤니티 센터</h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-medium">
          핵심역량 진단 체계 개편 소식과 데이터 활용 가이드를 확인하세요. <br/>
          시스템 이용 중 불편사항이나 분석 요청은 1:1 문의를 이용해 주시기 바랍니다.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex shadow-inner">
          <button 
            onClick={() => setActiveTab('notice')}
            className={`px-10 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'notice' ? 'bg-white text-[#006633] shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
            공지 및 자료실
          </button>
          <button 
            onClick={() => setActiveTab('inquiry')}
            className={`px-10 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'inquiry' ? 'bg-white text-[#006633] shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
            1:1 온라인 문의
          </button>
        </div>
      </div>

      {activeTab === 'notice' ? (
        <div className="max-w-4xl mx-auto space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <NoticeItem 
            type="notice" 
            date="2026.01.20" 
            title="2026학년도 핵심역량 진단 데이터 최종 업데이트 완료" 
            content="신학기 기준 2026 개편 체계가 적용된 전수 진단 데이터가 반영되었습니다. 대시보드에서 학과별 결과를 확인하세요." 
          />
          <NoticeItem 
            type="resource" 
            date="2026.01.15" 
            title="[공식자료] 6대 핵심역량 행동지표 정의 및 수준별 루브릭 가이드" 
            content="진단 점수 해석을 위한 핵심역량별 정의와 행동지표, 산출 공식이 포함된 공식 가이드북입니다." 
          />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
          {submitted ? (
            <div className="bg-white rounded-3xl p-12 border border-emerald-100 shadow-2xl text-center">
              <div className="w-20 h-20 bg-emerald-50 text-[#006633] rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">문의 내용이 임시 저장되었습니다!</h3>
              <p className="text-gray-600 leading-relaxed mb-10 font-medium">
                담당자에게 내용을 정확히 전달하기 위해 <br/>
                <strong className="text-[#006633]">아래 버튼을 클릭하여 관리자 메일을 최종 전송</strong>해 주시기 바랍니다.
              </p>
              <button 
                onClick={handleEmailRedirect}
                className="w-full py-4 bg-[#006633] text-white font-bold rounded-2xl hover:bg-[#004d26] transition-all flex items-center justify-center shadow-lg shadow-emerald-900/20 active:scale-95"
              >
                관리자에게 메일 발송하기 (okh831@gmail.com) <ExternalLink size={18} className="ml-2" />
              </button>
              <button 
                onClick={() => setSubmitted(false)} 
                className="mt-8 text-sm text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-8"
              >
                새로운 문의 작성하기
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">문의자 성함</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                      <input 
                        required
                        type="text" 
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006633]/20 focus:border-[#006633] outline-none transition-all text-sm font-medium"
                        placeholder="성함을 입력하세요"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">회신 이메일</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                      <input 
                        required
                        type="email" 
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006633]/20 focus:border-[#006633] outline-none transition-all text-sm font-medium"
                        placeholder="example@konyang.ac.kr"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">문의 제목</label>
                  <input 
                    required
                    type="text" 
                    value={inquiryForm.subject}
                    onChange={(e) => setInquiryForm({...inquiryForm, subject: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006633]/20 focus:border-[#006633] outline-none transition-all text-sm font-medium"
                    placeholder="문의하실 핵심 내용을 적어주세요"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">상세 내용</label>
                  <textarea 
                    required
                    rows={7}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006633]/20 focus:border-[#006633] outline-none resize-none transition-all text-sm font-medium"
                    placeholder="데이터 오류 제보, 시스템 개선 제안 등 상세 내용을 입력하세요."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4.5 bg-[#006633] text-white font-bold rounded-2xl hover:bg-[#004d26] transition-all flex items-center justify-center shadow-lg shadow-emerald-900/10 active:scale-[0.98]"
                >
                  <Send size={18} className="mr-2" /> 문의하기 (1단계 완료)
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const NoticeItem = ({ type, date, title, content }: { type: 'notice' | 'resource', date: string, title: string, content: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex items-start group cursor-pointer border-l-4 border-l-transparent hover:border-l-[#006633]">
    <div className={`mt-1 p-3.5 rounded-2xl mr-6 ${type === 'notice' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
      {type === 'notice' ? <Bell size={22} /> : <FileText size={22} />}
    </div>
    <div className="flex-grow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{date}</span>
        <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-widest ${type === 'notice' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
          {type === 'notice' ? '공지사항' : '전문자료'}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-[#006633] transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed font-medium">{content}</p>
    </div>
  </div>
);

export default CommunityPage;
