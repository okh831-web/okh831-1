import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// 렌더링 테스트 성공 확인용 (콘솔 및 최상단)
console.log("%c[SYSTEM] 렌더링 테스트 성공: React 18.2.0 번들러 모드 진입", "color: #006633; font-weight: bold; font-size: 14px;");

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      {/* 개발자 확인용 텍스트 (숨겨져 있다가 에러 시 활용 가능) */}
      <div id="debug-check" style={{ display: 'none' }}>Rendering Test Success</div>
      <App />
    </React.StrictMode>
  );
} catch (error: any) {
  console.error("Critical Rendering Error:", error);
  rootElement.innerHTML = `
    <div style="padding: 3rem; text-align: center; font-family: 'Pretendard', sans-serif;">
      <div style="background: #fff; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.05); max-width: 500px; margin: 0 auto;">
        <h1 style="color: #ef4444; margin-bottom: 1rem; font-size: 1.5rem;">시스템 로드 오류</h1>
        <p style="color: #64748b; margin-bottom: 2rem;">애플리케이션을 초기화하는 중 문제가 발생했습니다.</p>
        <div style="background: #f1f5f9; padding: 1rem; border-radius: 0.5rem; text-align: left; margin-bottom: 2rem; overflow-x: auto;">
          <code style="font-size: 12px; color: #e11d48;">${error?.message || '알 수 없는 오류'}</code>
        </div>
        <button onclick="window.location.reload()" style="padding: 12px 24px; background: #006633; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold;">
          페이지 새로고침
        </button>
      </div>
    </div>
  `;
}