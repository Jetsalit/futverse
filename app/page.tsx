"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [showDemo, setShowDemo] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // ฟังก์ชันลับ: แตะโลโก้ 5 ครั้งเพื่อเปิด Demo Mode
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setShowDemo(true);
      alert("🔓 เปิดใช้งานโหมดทดสอบ (Demo Mode) เรียบร้อยแล้ว");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between p-6 text-white font-sans overflow-y-auto">
      
      {/* ส่วนบน: โลโก้แอป */}
      <div className="flex flex-col items-center mt-12">
        <div 
          onClick={handleLogoClick}
          className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-500/30 cursor-pointer active:scale-95 transition-transform"
        >
          <span className="text-3xl font-black tracking-wider text-cyan-400">FV</span>
        </div>
        <h1 className="text-2xl font-bold mt-4 tracking-wide">FUTVERSE</h1>
        <p className="text-slate-400 text-xs mt-1">Football Academy Management Platform</p>
      </div>

      {/* ส่วนกลาง: ฟอร์มและปุ่มล็อกอินหลัก */}
      <div className="w-full max-w-sm mx-auto my-auto space-y-6">
        
        
       .{/* พระเอกของเรา: ปุ่ม LINE Login */}
        <button 
          onClick={() => {
            const channelId = "2010501872"; // Channel ID ของพี่
            const callbackUrl = encodeURIComponent("https://futverse.vercel.app/api/auth/callback");
            const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${callbackUrl}&state=random123&scope=profile%20openid`;
            window.location.href = lineAuthUrl;
          }}
          className="w-full bg-[#00C300] hover:bg-[#00B000] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 shadow-lg shadow-green-900/20 active:scale-[0.99] transition-all"
        >
          <span className="text-xl">💬</span>
          <span>เข้าสู่ระบบด้วย LINE</span>
        </button>

        {/* เส้นคั่นทางเลือกสำรอง */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-slate-700"></div>
          <span className="mx-4 text-xs text-slate-500 uppercase tracking-wider">หรือเข้าสู่ระบบด้วยรหัสผ่าน</span>
          <div className="flex-1 border-t border-slate-700"></div>
        </div>

        {/* ฟอร์มกรอกรหัสผ่านปกติ (สำหรับสิทธิ์อื่นๆ หรือกรณีทั่วไป) */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Username / Player ID</label>
            <input type="text" placeholder="กรอกชื่อผู้ใช้หรือไอดีนักเตะ" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3.5 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password / 4-Digit PIN</label>
            <input type="password" placeholder="••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3.5 px-4 text-sm text-white placeholder-slate-500 tracking-widest focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-indigo-600/20 active:scale-[0.99] transition-all mt-2">
            ENTER SYSTEM
          </button>
        </div>
      </div>

      {/* ส่วนล่าง: โหมดทดสอบ (จะแสดงเมื่อกดโลโก้ครบ 5 ครั้งเท่านั้น) */}
      <div className="w-full max-w-sm mx-auto pb-6">
        {showDemo ? (
          <div className="bg-slate-800/80 border border-dashed border-indigo-500/50 rounded-2xl p-4 space-y-3 animate-fadeIn">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider text-center">Fast Login For Testing (Demo Mode)</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => alert("Login as Director")} className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl p-2.5 text-xs text-rose-300 font-medium transition-all">👑 Director</button>
              <button onClick={() => alert("Login as Coach")} className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-2.5 text-xs text-emerald-300 font-medium transition-all">⚡ Head Coach</button>
              <button onClick={() => alert("Login as Scout")} className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-300 font-medium transition-all">🔍 Scout</button>
              <button onClick={() => alert("Login as Player")} className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl p-2.5 text-xs text-cyan-300 font-medium transition-all">⚽ Youth Player</button>
            </div>
          </div>
        ) : (
          <p className="text-center text-slate-600 text-[10px]">FUTVERSE v1.0.0 © 2026</p>
        )}
      </div>

    </div>
  );
}