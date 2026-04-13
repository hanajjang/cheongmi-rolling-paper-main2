import React, { useRef, useState } from 'react';
import useMessages from './hooks/useMessages';
import PostitCard from './components/PostitCard';
import WriteModal from './components/WriteModal';
import EditModal from './components/EditModal';
import SaveModal from './components/SaveModal';

export default function App() {
  const { messages, loading, error, refetch } = useMessages();
  const [showWrite, setShowWrite]   = useState(false);
  const [showSave, setShowSave]     = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);
  const boardRef = useRef(null);

return (
  <div id="capture-area" style={{ minHeight: '100vh' }}>

      {/* 상단 무지개 줄 */}
      <div style={{
        height: 5,
        background: 'linear-gradient(90deg, #f4b8b0 0%, #f9d4a0 25%, #fce8b2 50%, #c8e6c9 75%, #b3d9f0 100%)'
      }} />

      {/* 헤더 */}
      <header style={{
        background: 'rgba(255,250,246,1)',
        borderBottom: '1px solid rgba(220,180,160,0.3)',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40,
            background: 'linear-gradient(135deg, #f4a89a, #e8798a)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 3px 12px rgba(232,121,138,0.35)',
            flexShrink: 0,
          }}>💌</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#7a4a5a', lineHeight: 1.2 }}>
              이경민 부교님께
            </div>
            <div style={{ fontSize: 10, color: '#c0968a', marginTop: 2 }}>
              청미 롤링페이퍼 🌸
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button onClick={() => setShowSave(true)} style={{
            background: '#fff',
            color: '#7a4a5a',
            border: '1.5px solid #e8798a',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 12,
            fontFamily: 'Nanum Gothic, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 4,
            boxShadow: '0 2px 8px rgba(232,121,138,0.2)',
          }}>
            🖼️ 이미지 저장
          </button>
          <button onClick={() => setShowWrite(true)} style={{
            background: 'linear-gradient(135deg, #e8798a, #d4607a)',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '8px 14px',
            fontSize: 12,
            fontFamily: 'Nanum Gothic, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 4,
            boxShadow: '0 3px 12px rgba(212,96,122,0.4)',
          }}>
            ✏️ 마음 남기기
          </button>
        </div>
      </header>

      {/* 히어로 */}
      <div style={{ textAlign: 'center', padding: '30px 20px 22px' }}>
        <div style={{ fontSize: 10, color: '#c0968a', letterSpacing: '1px', marginBottom: 10, fontWeight: 700 }}>
          안산 주성령 청미 · 경민 부교님 이임 롤링페이퍼 · 2026
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#7a4a5a', lineHeight: 1.4, marginBottom: 12 }}>
          사랑하는 <span style={{ color: '#e8798a' }}>경민 부교님</span>께<br />
          전하는 우리의 마음 💌
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '14px 0 12px' }}>
          <div style={{ height: 1, width: 70, background: 'linear-gradient(90deg, transparent, #d8b8b0)' }} />
          <span style={{ fontSize: 18 }}>🌸</span>
          <div style={{ height: 1, width: 70, background: 'linear-gradient(90deg, #d8b8b0, transparent)' }} />
        </div>
        <p style={{ fontSize: 12, color: '#a88880', fontStyle: 'italic', maxWidth: 380, margin: '0 auto', lineHeight: 1.8 }}>
          "너희 안에서 착한 일을 시작하신 이가<br />
          그리스도 예수의 날까지 이루실 줄을 우리는 확신하노라" — 빌 1:6
        </p>
      </div>

      {/* 보드 */}
      <div style={{ padding: '4px 16px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#a07870' }}>💌 청미들의 메시지</span>
          <span style={{
            background: '#e8798a', color: '#fff',
            borderRadius: 20, padding: '1px 8px',
            fontSize: 11, fontWeight: 700,
          }}>{messages.length}</span>
          <div style={{ flex: 1, height: 1, background: 'repeating-linear-gradient(90deg, #d8c0b8 0px, #d8c0b8 5px, transparent 5px, transparent 10px)', opacity: 0.6 }} />
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: 60, color: '#c0968a', fontSize: 15 }}>
            💌 메시지 불러오는 중...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: 60, color: '#e8798a', fontSize: 14 }}>
            연결에 실패했어요. 잠시 후 다시 시도해주세요.
          </div>
        )}

        {!loading && !error && (
          <div ref={boardRef} style={{
            background: 'rgba(255,248,242,0.7)',
            border: '1.5px dashed #d8c0b0',
            borderRadius: 16,
            padding: '20px 16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            minHeight: 300,
            alignContent: 'start',
          }}>
            {messages.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: '#c0a898', fontSize: 14 }}>
                아직 메시지가 없어요. 첫 번째로 마음을 남겨보세요 💌
              </div>
            ) : (
              messages.map((msg) => (
                <PostitCard
                  key={msg.id}
                  message={msg}
                  onClick={() => setDetailTarget(msg)}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* 푸터 */}
      <div style={{
        textAlign: 'center', padding: 18,
        fontSize: 11, color: '#c0a898',
        borderTop: '1px dashed #e8d8d0',
        marginTop: 10,
      }}>
        🕊️ 안산 주성령 청미 · 경민 부교님 이임 롤링페이퍼 · 2026
      </div>

      {/* 모달들 */}
      {showWrite && (
        <WriteModal
          onClose={() => setShowWrite(false)}
          onSuccess={() => { setShowWrite(false); refetch(); }}
        />
      )}
      {detailTarget && (
        <DetailModal
          message={detailTarget}
          onClose={() => setDetailTarget(null)}
          onEdit={() => { setDetailTarget(null); setEditTarget(detailTarget); }}
          onDelete={() => { setDetailTarget(null); setEditTarget({ ...detailTarget, defaultTab: 'delete' }); }}
        />
      )}
     {editTarget && (
  <EditModal
    message={editTarget}
    defaultTab={editTarget.defaultTab || 'edit'}
    onClose={() => setEditTarget(null)}
    onSuccess={() => { setEditTarget(null); refetch(); }}
  />
)}
      {showSave && (
  <SaveModal
    onClose={() => setShowSave(false)}
  />
)}
    </div>
  );
}

/* 상세보기 모달 — App.jsx 안에 같이 선언 */
const COLOR_BG = {
  rose: '#fde8e8', blush: '#fdf0e4', butter: '#fefce4',
  mint: '#e8f8f0', sky: '#e8f4fd', lilac: '#f0ecfd',
};
const PIN_GRAD = {
  rose:   'radial-gradient(circle at 35% 35%, #f4a0a8, #d06070)',
  blush:  'radial-gradient(circle at 35% 35%, #f4c080, #d09040)',
  butter: 'radial-gradient(circle at 35% 35%, #e8d870, #b0a030)',
  mint:   'radial-gradient(circle at 35% 35%, #80d8a8, #409068)',
  sky:    'radial-gradient(circle at 35% 35%, #80c0f0, #4080c0)',
  lilac:  'radial-gradient(circle at 35% 35%, #c0a8f0, #8060c0)',
};

function DetailModal({ message, onClose, onEdit, onDelete }) {
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(80,40,50,0.35)',
        backdropFilter: 'blur(5px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200,
      }}
    >
      <div style={{
        background: COLOR_BG[message.color] || '#fde8e8',
        borderRadius: 6,
        padding: '30px 22px 22px',
        width: 340, maxWidth: '92vw',
        position: 'relative',
        boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
        maxHeight: '80vh',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {/* 핀 */}
        <div style={{
          position: 'absolute', top: -10, left: '50%',
          transform: 'translateX(-50%)',
          width: 18, height: 18, borderRadius: '50%',
          background: PIN_GRAD[message.color] || PIN_GRAD.rose,
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          border: '2px solid rgba(255,255,255,0.6)',
        }} />

        {/* 닫기 버튼 */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 12, right: 14,
          background: 'rgba(255,255,255,0.6)', border: 'none',
          borderRadius: '50%', width: 26, height: 26,
          cursor: 'pointer', fontSize: 13, color: '#7a4a5a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        <div style={{ fontSize: 17, fontWeight: 800, color: '#6a4858', marginTop: 6 }}>
          {message.from}
        </div>

        {message.episode && (
          <div style={{
            fontSize: 12, color: '#a08878',
            background: 'rgba(255,255,255,0.5)',
            borderRadius: 6, padding: '5px 9px', lineHeight: 1.6,
          }}>
            💭 {message.episode}
          </div>
        )}

        <div style={{
          fontSize: 14, color: '#3d2d38',
          lineHeight: 1.85, wordBreak: 'keep-all',
          whiteSpace: 'pre-wrap',
        }}>
          {message.message}
        </div>

        <div style={{ fontSize: 10, color: 'rgba(80,50,60,0.4)', textAlign: 'right', marginTop: 4 }}>
          {message.createdAt ? new Date(message.createdAt).toLocaleDateString('ko-KR') : ''}
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <button onClick={onEdit} style={{
            flex: 1, fontSize: 11, padding: '6px 0',
            borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)',
            cursor: 'pointer', background: 'rgba(255,255,255,0.7)',
            color: '#6a4858', fontFamily: 'Nanum Gothic, sans-serif', fontWeight: 700,
          }}>✏️ 수정</button>
          <button onClick={onDelete} style={{
            flex: 1, fontSize: 11, padding: '6px 0',
            borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)',
            cursor: 'pointer', background: 'rgba(255,255,255,0.7)',
            color: '#c05060', fontFamily: 'Nanum Gothic, sans-serif', fontWeight: 700,
          }}>🗑 삭제</button>
        </div>
      </div>
    </div>
  );
}
