import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// this route will use client base way. we can not directly use
export async function GET(req: NextRequest, res: NextResponse) {
  const getCookies = cookies()
  const nextAuthSession = getCookies.get('next-auth.session-token')?.value || ''
  return NextResponse.json(nextAuthSession)
}
