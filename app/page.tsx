"use client";
import { useState, useEffect } from "react";

export default function LoginPage() {
const [showDemo, setShowDemo] = useState(false);
const [userProfile, setUserProfile] = useState<{name: string, pic: string} | null>(null);
const [debug, setDebug] = useState(""); // เพิ่มตัวแปรสำหรับโชว์ข้อความ Error ถ้าดึงข้อมูลไม่ได้

useEffect(() => {
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
const pic = params.get("pic");

console.log("Params detected:", { name, pic }); // ลองดูใน Console ของ Browser

if (name && pic) {
  setUserProfile({ name, pic });
  // ไม่ต้องลบ URL ทันที เพื่อให้เราเช็กได้ว่าข้อมูลมาจริงไหม
} else {
  setDebug("ไม่พบข้อมูลชื่อ/รูปโปรไฟล์ใน URL");
}


}, []);

const handleLineLogin = () => {
const channelId = "2010501872";
const callbackUrl = encodeURIComponent("https://futverse.vercel.app/api/auth/callback");
const lineAuthUrl = https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${callbackUrl}&state=random123&scope=profile%20openid;
window.location.href = lineAuthUrl;
};

return (

<div className="mb-8 text-center" onClick={() => setShowDemo(!showDemo)}>
FV
FUTVERSE


  <div className="w-full max-w-sm mx-auto my-auto space-y-6">
    {userProfile ? (
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center shadow-2xl">
        <img src={userProfile.pic} alt="Profile" className="w-28 h-28 mx-auto rounded-full border-4 border-[#00C300] mb-5" />
        <p className="text-[#00C300] font-bold text-2xl">{userProfile.name}</p>
        <button onClick={() => setUserProfile(null)} className="mt-6 w-full bg-slate-700 py-3 rounded-xl text-white">ออกจากระบบ</button>
      </div>
    ) : (
      <>
        {/* โชว์ Debug ถ้าล็อกอินแล้วไม่ขึ้นชื่อ */}
        {debug && <p className="text-red-400 text-xs text-center">{debug}</p>}
        
        <button onClick={handleLineLogin} className="w-full bg-[#00C300] py-4 rounded-2xl text-white font-bold shadow-lg">
          เข้าสู่ระบบด้วย LINE
        </button>
        {/* ฟอร์มอื่น... (เหมือนเดิม) */}
      </>
    )}
  </div>
</div>


);
}