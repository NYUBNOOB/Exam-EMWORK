import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    return NextResponse.json(task);
  } catch (e) {
    console.log("Error Fetch data");
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        type: body.type,
        name: body.name,
        startAt: body.startAt ? new Date(body.startAt) : undefined,
        endAt: body.endAt ? new Date(body.endAt) : undefined,
        status: body.status,
      },
    });
    return NextResponse.json(updatedTask);
  } catch (e) {}
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (e) {
    console.error("Error deleting task:", e);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
};
