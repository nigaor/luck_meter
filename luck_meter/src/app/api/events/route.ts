import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: '認証されていません' }, { status: 401 });
  }

  const events = await prisma.event.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(events);
}

// 新しいイベントを作成する (POST)
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: '認証されていません' }, { status: 401 });
  }

  try {
    const { text, score, comment } = await request.json();
    if(score === 0) {
      return NextResponse.json({ error: 'スコアが0のイベントは追加できません' }, { status: 400 });
    }
    const newEvent = await prisma.event.create({
      data: {
        text,
        score,
        comment,
        userId: session.user.id, // ★ ログインユーザーのIDを紐付ける
      },
    });
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'イベントの作成に失敗しました' }, { status: 500 });
  }
}