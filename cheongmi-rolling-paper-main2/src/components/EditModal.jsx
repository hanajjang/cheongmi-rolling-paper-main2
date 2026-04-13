import React, { useState } from 'react';

const COLORS = ['rose','blush','butter','mint','sky','lilac'];
const COLOR_MAP = {
  rose: '#fde8e8', blush: '#fdf0e4', butter: '#fefce4',
  mint: '#e8f8f0', sky: '#e8f4fd', lilac: '#f0ecfd',
};
const GAS_URL = process.env.REACT_APP_GAS_URL;

export default function EditModal({ message, onClose, onSuccess, defaultTab = 'edit' }) {
  const [tab, setTab] = useState(defaultTab); // 'edit' | 'delete'
  const [form, setForm]       = useState({ from: message.from, message: message.message, color: message.color, password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleUpdate = async () => {
    if (!form.password) return setError('비밀번호를 입력해주세요.');
    setLoading(true);
    try {
      const res  = await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'update', id: message.id, ...form }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.error || '오류가 발생했어요.');
      onSuccess();
    } catch {
      setError('오류가 발생했어요. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!form.password) return setError('비밀번호를 입력해주세요.');
    setLoading(true);
    try {
      const res  = await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'delete', id: message.id, password: form.password }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.error || '오류가 발생했어요.');
      onSuccess();
    } catch {
      setError('오류가 발생했어요. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0,
      background: 'rgba(80,40,50,0.3)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200,
    }}>
      <div style={{
        background: '#fffaf8', borderRadius: 20,
        padding: '32px 28px 28px', width: 370, maxWidth: '93vw',
        boxShadow: '0 12px 48px rgba(140,60,80,0.15)',
        border: '1px solid rgba(220,180,180,0.4)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5,
          background: 'linear-gradient(90deg, #f4b8b0, #f9d4a0, #fce8b2, #c8e6c9, #b3d9f0)' }} />

        {/* 탭 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          {['edit','delete'].map((t) => (
            <button key={t} onClick={() => { setTab(t); setError(''); }} style={{
              flex: 1, padding: '8px', borderRadius: 10, border: 'none',
              fontFamily: 'Nanum Gothic, sans-serif', fontWeight: 700, fontSize: 13,
              cursor: 'pointer',
              background: tab === t ? '#e8798a' : '#f5ede8',
              color: tab === t ? '#fff' : '#a08878',
            }}>
              {t === 'edit' ? '✏️ 수정' : '🗑 삭제'}
            </button>
          ))}
        </div>

        {tab === 'edit' && (
          <>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a07878', marginBottom: 5, textTransform: 'uppercase' }}>이름</label>
              <input value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })}
                style={{ width: '100%', border: '1px solid #e8d0c8', borderRadius: 10, padding: '10px 13px', fontFamily: 'Nanum Gothic, sans-serif', fontSize: 14, outline: 'none', background: '#fffdf9' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a07878', marginBottom: 5, textTransform: 'uppercase' }}>메시지</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4} style={{ width: '100%', border: '1px solid #e8d0c8', borderRadius: 10, padding: '10px 13px', fontFamily: 'Nanum Gothic, sans-serif', fontSize: 14, outline: 'none', resize: 'vertical', lineHeight: 1.7, background: '#fffdf9' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a07878', marginBottom: 5, textTransform: 'uppercase' }}>색상</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {COLORS.map((c) => (
                  <div key={c} onClick={() => setForm({ ...form, color: c })} style={{
                    width: 26, height: 26, borderRadius: '50%', background: COLOR_MAP[c],
                    border: form.color === c ? '2.5px solid #7a4a5a' : '2.5px solid transparent',
                    cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    transform: form.color === c ? 'scale(1.15)' : 'scale(1)', transition: 'all 0.12s',
                  }} />
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'delete' && (
          <div style={{ textAlign: 'center', padding: '10px 0 20px', color: '#7a4a5a', fontSize: 14, lineHeight: 1.7 }}>
            정말 이 메시지를 삭제할까요?<br />
            <span style={{ fontSize: 12, color: '#a08878' }}>삭제된 메시지는 복구되지 않아요.</span>
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a07878', marginBottom: 5, textTransform: 'uppercase' }}>비밀번호</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="작성 시 입력한 비밀번호"
            style={{ width: '100%', border: '1px solid #e8d0c8', borderRadius: 10, padding: '10px 13px', fontFamily: 'Nanum Gothic, sans-serif', fontSize: 14, outline: 'none', background: '#fffdf9' }} />
        </div>

        {error && <div style={{ color: '#e8798a', fontSize: 12, marginBottom: 10, textAlign: 'center' }}>{error}</div>}

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, background: '#f5ede8', color: '#a08878', border: '1px solid #e0cec8', borderRadius: 12, padding: 11, fontSize: 13, fontFamily: 'Nanum Gothic, sans-serif', fontWeight: 700, cursor: 'pointer' }}>취소</button>
          <button onClick={tab === 'edit' ? handleUpdate : handleDelete} disabled={loading} style={{ flex: 2, background: tab === 'edit' ? 'linear-gradient(135deg, #e8798a, #d4607a)' : '#c05060', color: '#fff', border: 'none', borderRadius: 12, padding: 11, fontSize: 13, fontFamily: 'Nanum Gothic, sans-serif', fontWeight: 700, cursor: 'pointer' }}>
            {loading ? '처리 중...' : tab === 'edit' ? '✏️ 수정 완료' : '🗑 삭제하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
