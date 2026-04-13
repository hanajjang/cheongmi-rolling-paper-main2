import React from 'react';

const ROTATIONS = [-2.2, 2.8, -1.5, 3, -2.5, 1.8, -1, 2.3];

export default function PostitCard({ message, onClick }) {
  const rot = ROTATIONS[message.id % ROTATIONS.length];

  return (
    <div
      className={`postit-${message.color}`}
      onClick={onClick}
      style={{
        borderRadius: 4,
        padding: '18px 14px 14px',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        transform: `rotate(${rot}deg)`,
        transition: 'transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rot}deg) translateY(-6px) scale(1.03)`;
        e.currentTarget.style.zIndex = '20';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rot}deg)`;
        e.currentTarget.style.zIndex = '1';
      }}
    >
      {/* 핀 */}
      <div className={`pin-${message.color}`} style={{
        position: 'absolute',
        top: -8, left: '50%',
        transform: 'translateX(-50%)',
        width: 13, height: 13,
        borderRadius: '50%',
        zIndex: 2,
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        border: '2px solid rgba(255,255,255,0.6)',
      }} />

      {/* 접힌 모서리 */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 0, height: 0, borderStyle: 'solid',
        borderWidth: '0 0 18px 18px',
        borderColor: 'transparent transparent rgba(0,0,0,0.1) transparent',
      }} />

      {/* 이름 */}
      <div style={{ fontSize: 13, fontWeight: 800, color: '#6a4858', marginTop: 4 }}>
        {message.from}
      </div>

      {/* 메시지 4줄 미리보기 */}
      <div style={{
        fontSize: 12, color: '#3d2d38', lineHeight: 1.7,
        wordBreak: 'keep-all',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        flex: 1,
      }}>
        {message.message}
      </div>

      {/* 더 보기 */}
      <div style={{ fontSize: 10, color: '#e8798a', fontWeight: 700, textAlign: 'right' }}>
        더 보기 →
      </div>

      {/* 날짜 */}
      <div style={{ fontSize: 9, color: 'rgba(80,50,60,0.4)', textAlign: 'right' }}>
        {message.createdAt ? new Date(message.createdAt).toLocaleDateString('ko-KR') : ''}
      </div>
    </div>
  );
}
