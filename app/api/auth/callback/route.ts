import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // ใช้ nextUrl ของ Next.js โดยตรง จะช่วยแก้ปัญหาเรื่อง Type Error ตอน Build ครับ
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json({ error: 'LINE Login failed: ' + error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // 1. นำ code ไปแลกกับ Access Token จาก LINE
    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://futverse.vercel.app/api/auth/callback',
        // ท่าไม้ตาย: ใส่ ID และ Secret ตรงๆ ไปเลยเพื่อแก้ปัญหา Vercel ไม่จำค่า
        client_id: '2010501872',
        client_secret: 'd5b53d5e28ec4b06c750c8534dfd52c1',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error('LINE Token Error Details:', tokenData);
      return NextResponse.json({ 
        error: 'Failed to get access token', 
        details: tokenData 
      }, { status: 400 });
    }

    // 2. นำ Access Token ไปดึงข้อมูลโปรไฟล์ผู้ใช้
    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileResponse.json();
    console.log('User Profile:', profile);

    // 3. กลับไปหน้าหลัก
    return NextResponse.redirect(new URL('/', req.url));

  } catch (error) {
    console.error('System Auth Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}