import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function DELETE(
  _request: Request,
  {params}: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const eventId = (await params).id ;

  if (!session?.user?.id) {
    return NextResponse.json({ error: "認証されていません" }, { status: 401 });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event || event.userId !== session.user.id) {
      return NextResponse.json({ error: "権限がありません" }, { status: 403 });
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json(
      { message: "イベントを削除しました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("イベント作成APIでエラー", error);
    return NextResponse.json(
      { error: "イベントの削除に失敗しました" },
      { status: 500 }
    );
  }
}
