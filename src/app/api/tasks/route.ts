import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (
) => {
  try {
    const task = await prisma.task.findMany();
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

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const task = await prisma.task.create({
      data: {
        type: body.type,
        name: body.name,
        startAt: new Date(body.startAt),
        endAt:
          body.endAt && body.endAt.trim() !== "" ? new Date(body.endAt) : null,
        status: body.status,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (e) {
    console.error("Error creating task:", e);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
};
