"use client";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [showDemo, setShowDemo] = useState(false);
  // ตัวแปรสำหรับเก็บข้อมูลโปรไฟล์
  const [userProfile, setUserProfile] = useState<{name: string, pic: string} | null>(null);

  // โหลดข้อมูลโปรไฟล์จาก URL ทันทีที่เปิดหน้าเว็บขึ้นมา
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const pic = params.get("pic");

    if (name && pic) {
      setUserProfile({ name, pic }); // บันทึกข้อมูลลงในระบบของหน้าจอ
      // ล้าง URL ให้สะอาด (ลบ ?name=... ออกไปเพื่อความสวยงาม)
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const handleLineLogin = () => {
    const channelId = "2010501872"; 
    const callbackUrl = encodeURIComponent("https://futverse.vercel.app/api/auth/callback");
    // อย่าลืมแนบ scope profile เข้าไปด้วยเพื่อให้ LINE ส่งรูปและชื่อมาให้
    const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${callbackUrl}&state=random123&scope=profile%20openid`;
    window.location.href = lineAuthUrl;
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Logo Section */}
      <div className="mb-8 text-center" onClick={() => setShowDemo(!showDemo)}>
         <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white font-bold text-3xl cursor-pointer hover:scale-105 transition-transform">
           FV
         </div>
         <h1 className="text-3xl font-bold text-white tracking-widest">FUTVERSE</h1>
         <p className="text-slate-400 text-sm mt-2">Football Academy Management Platform</p>
      </div>

      {/* ส่วนกลาง: ฟอร์มและปุ่มล็อกอินหลัก */}
      <div className="w-full max-w-sm mx-auto my-auto space-y-6">

        {/* --- เช็คว่ามีข้อมูลผู้ใช้หรือยัง --- */}
        {userProfile ? (
          /* ถ้าล็อกอินแล้ว: แสดงการ์ดโปรไฟล์ */
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center shadow-2xl animate-fade-in">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-[#00C300] shadow-lg shadow-[#00C300]/20 mb-5">
              <img src={userProfile.pic} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-medium text-slate-300 mb-1">ยินดีต้อนรับกลับมา!</h2>
            <p className="text-[#00C300] font-bold text-2xl mb-8">{userProfile.name}</p>
            <button
              onClick={() => setUserProfile(null)} // กดปุ่มนี้เพื่อล้างค่า (ออกจากระบบ)
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              ออกจากระบบ
            </button>
          </div>
        ) : (
          /* ถ้ายังไม่ล็อกอิน: แสดงปุ่มเข้าสู่ระบบเหมือนเดิม */
          <>
            {/* พระเอกของเรา: ปุ่ม LINE Login */}
            <button
              onClick={handleLineLogin}
              className="w-full bg-[#00C300] hover:bg-[#00B000] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-colors shadow-lg shadow-[#00C300]/20"
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

            {/* ฟอร์มกรอกรหัสผ่านปกติ */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Username / Player ID</label>
                <input type="text" placeholder="กรอกชื่อผู้ใช้หรือไอดีนักเตะ" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password / 4-Digit PIN</label>
                <input type="password" placeholder="••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-indigo-500/20 transition-colors">
                ENTER SYSTEM
              </button>
            </div>
          </>
        )}

      </div>

      {/* ส่วนล่าง: โหมดทดสอบ */}
      <div className="w-full max-w-sm mx-auto pb-6 mt-8">
        {showDemo ? (
          <div className="bg-slate-800/80 border border-dashed border-indigo-500/50 rounded-2xl p-4 space-y-3">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider text-center">Fast Login For Testing (Demo Mode)</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => alert("Login as Director")} className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg py-2 text-rose-400 text-xs font-semibold transition-colors">Director</button>
              <button onClick={() => alert("Login as Coach")} className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg py-2 text-emerald-400 text-xs font-semibold transition-colors">Coach</button>
              <button onClick={() => alert("Login as Scout")} className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg py-2 text-amber-400 text-xs font-semibold transition-colors">Scout</button>
              <button onClick={() => alert("Login as Player")} className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg py-2 text-cyan-400 text-xs font-semibold transition-colors">Player</button>
            </div>
          </div>
        ) : (
          <p className="text-center text-slate-600 text-[10px]">FUTVERSE v1.0.0 © 2026</p>
        )}
      </div>
    </div>
  );
}