import React, { useState } from 'react';

const COLORS = ['rose','blush','butter','mint','sky','lilac'];
const COLOR_MAP = {
  rose: '#fde8e8', blush: '#fdf0e4', butter: '#fefce4',
  mint: '#e8f8f0', sky: '#e8f4fd', lilac: '#f0ecfd',
};
const GAS_URL = process.env.REACT_APP_GAS_URL;

export default function WriteModal({ onClose, onSuccess }) {
  const [form, setForm]       = useState({ from: '', episode: '', message: '', color: 'rose', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async () => {
    if (!form.from.trim())    return setError('이름을 입력해주세요.');
    if (!form.message.trim()) return setError('메시지를 입력해주세요.');
    if (!form.password)       return setError('비밀번호를 입력해주세요.');

    setLoading(true);
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'create', ...form }),
      });
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
        {/* 상단 무지개 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5,
          background: 'linear-gradient(90deg, #f4b8b0, #f9d4a0, #fce8b2, #c8e6c9, #b3d9f0)' }} />

        <div style={{ fontSize: 20, fontWeight: 800, color: '#7a4a5a', marginBottom: 22, textAlign: 'center' }}>
          💌 부교님께 마음 전하기
        </div>

        {/* 이름 */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a07878', marginBottom: 5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>이름 / 닉네임</label>
          <input
            value={form.from}
            onChange={(e) => setForm({ ...form, from: e.target.value })}
            placeholder="예: 서연 🌸"
            style={{ width: '100%', border: '1px solid #e8d0c8', borderRadius: 10, padding: '10px 13px', fontFamily: 'Nanum Gothic, sans-serif', fontSize: 14, color: '#3d2d38', background: '#fffdf9', outline: 'none' }}
          />
        </div>

        {/* 추억 */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a07878', marginBottom: 5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>기억에 남는 추억 (선택)</label>
          <input
            value={form.episode}
            onChange={(e) => setForm({ ...form, episode: e.target.value })}
            placeholder="부교님과의 기억에 남는 에피소드"
            style={{ width: '100%', border: '1px solid #e8d0c8', borderRadius: 10, padding: '10px 13px', fontFamily: 'Nanum Gothic, sans-serif', fontSize: 14, color: '#3d2d38', background: '#fffdf9', outline: 'none' }}
          />
        </div>

        {/* 메시지 */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a07878', marginBottom: 5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>전하고 싶은 말</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="부교님께 감사했던 순간, 앞날을 위한 기도... 🙏"
            rows={4}
            style={{ width: '100%', border: '1px solid #e8d0c8', borderRadius: 10, padding: '10px 13px', fontFamily: 'Nanum Gothic, sans-serif', fontSize: 14, color: '#3d2d38', background: '#fffdf9', outline: 'none', resize: 'vertical', lineHeight: 1.7 }}
          />
        </div>

        {/* 색상 */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a07878', marginBottom: 5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>포스트잇 색상</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {COLORS.map((c) => (
              <div key={c} onClick={() => setForm({ ...form, color: c })} style={{
                width: 26, height: 26, borderRadius: '50%',
                background: COLOR_MAP[c],
                border: form.color === c ? '2.5px solid #7a4a5a' : '2.5px solid transparent',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                transform: form.color === c ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.12s',
              }} />
            ))}
          </div>
        </div>

        {/* 비밀번호 */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a07878', marginBottom: 5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>비밀번호 (수정·삭제 시 사용)</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="숫자 4자리"
            style={{ width: '100%', border: '1px solid #e8d0c8', borderRadius: 10, padding: '10px 13px', fontFamily: 'Nanum Gothic, sans-serif', fontSize: 14, color: '#3d2d38', background: '#fffdf9', outline: 'none' }}
          />
        </div>

        {error && <div style={{ color: '#e8798a', fontSize: 12, marginBottom: 10, textAlign: 'center' }}>{error}</div>}

        <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
          <button onClick={onClose} style={{ flex: 1, background: '#f5ede8', color: '#a08878', border: '1px solid #e0cec8', borderRadius: 12, padding: 11, fontSize: 13, fontFamily: 'Nanum Gothic, sans-serif', fontWeight: 700, cursor: 'pointer' }}>취소</button>
          <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, background: 'linear-gradient(135deg, #e8798a, #d4607a)', color: '#fff', border: 'none', borderRadius: 12, padding: 11, fontSize: 13, fontFamily: 'Nanum Gothic, sans-serif', fontWeight: 700, cursor: 'pointer', boxShadow: '0 3px 12px rgba(212,96,122,0.3)' }}>
            {loading ? '저장 중...' : '💌 마음 남기기'}
          </button>
        </div>
      </div>
    </div>
  );
}
