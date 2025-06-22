import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const eventId = await params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: '認証されていません' }, { status: 401 });
  }

  try {
    // 削除しようとしているイベントが、本当にログインユーザーのものか確認（重要）
    const event = await prisma.event.findUnique({
      where: { id: eventId.id },
    });

    if (!event || event.userId !== session.user.id) {
      return NextResponse.json({ error: '権限がありません' }, { status: 403 });
    }

    await prisma.event.delete({
      where: { id: eventId.id },
    });

    return NextResponse.json({ message: 'イベントを削除しました' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'イベントの削除に失敗しました' }, { status: 500 });
  }
}