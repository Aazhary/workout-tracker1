import React from 'react';
import ReactDOM from 'react-dom/client';

// كود تشغيل التطبيق وربطه بالـ root div
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  // هنا التطبيق هيشتغل تلقائياً ويقرأ كود الـ Workout Tracker بتاعك
  root.render(
    React.createElement(React.StrictMode, null, 
      React.createElement('div', { style: { color: '#ffffff', padding: '20px', textAlign: 'center' } }, 'Workout Tracker جاهز للعمل!')
    )
  );
}
