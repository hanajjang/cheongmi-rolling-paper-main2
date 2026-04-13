import React from 'react';
import { toPng } from 'html-to-image';

export default function SaveModal({ onClose }) {
  const handleSave = () => {
    const target = document.getElementById('capture-area');
    if (!target) return;
    onClose();
    setTimeout(() => {
      toPng(target, {
        cacheBust: true,
        backgroundColor: '#faf7f2',
        pixelRatio: 2,
        skipFonts: true,
        filter: (node) => {
          if (node.tagName === 'HEADER') return false;
          return true;
        },
      }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'cheongmi-rolling-paper-2026.png';
        link.href = dataUrl;
        link.click();
      }).catch(() => {
        alert('이미지 저장에 실패했어요. 다시 시도해주세요.');
      });
    }, 300);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(80,40,50,0.45)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 300,
      }}
    >
      <div style={{
        background: '#fffaf8', borderRadius: 20,
        padding: '28px 28px 24px', width: 340, maxWidth: '93vw',
        boxShadow: '0 12px 48px rgba(140,60,80,0.18)',
        border: '1px solid rgba(220,180,180,0.4)',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 5,
          background: 'linear-gradient(90deg, #f4b8b0, #f9d4a0, #fce8b2, #c8e6c9, #b3d9f0)',
        }} />
        <div style={{ fontSize: 17, fontWeight: 800, color: '#7a4a5a', marginBottom: 8, marginTop: 4 }}>
          🖼️ 롤링페이퍼 이미지 저장
        </div>
        <div style={{ fontSize: 12, color: '#a08880', lineHeight: 1.7, marginBottom: 20 }}>
          헤더부터 메시지 보드까지<br />
          전체를 PNG로 저장합니다.<br />
          파일명: cheongmi-rolling-paper-2026.png
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, background: '#f5ede8', color: '#a08878',
              border: '1px solid #e0cec8', borderRadius: 12, padding: 11,
              fontSize: 13, fontFamily: 'Nanum Gothic, sans-serif',
              fontWeight: 700, cursor: 'pointer',
            }}
          >취소</button>
          <button
            onClick={handleSave}
            style={{
              flex: 2, background: 'linear-gradient(135deg, #e8798a, #d4607a)',
              color: '#fff', border: 'none', borderRadius: 12, padding: 11,
              fontSize: 13, fontFamily: 'Nanum Gothic, sans-serif',
              fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(212,96,122,0.3)',
            }}
          >💾 저장하기</button>
        </div>
      </div>
    </div>
  );
}
