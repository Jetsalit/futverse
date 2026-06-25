import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
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
        client_id: process.env.LINE_LOGIN_CHANNEL_ID || '',
        client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET || '',
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