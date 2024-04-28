import connectMongoDB from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function POST(request) { 
    const { title, description } = await request.json();
    await connectMongoDB();
    await Todo.create({ title, description })
    return NextResponse.json({ message: "OK" }, { status: 200});
};

export async function GET() {
    await connectMongoDB();
    const todos = await Todo.find();
    return NextResponse.json(todos, { status: 200 });
};

// delete method

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
};