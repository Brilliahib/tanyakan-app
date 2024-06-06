import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailQuestion = await retrieveDataById("question", id);
    if (detailQuestion) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: detailQuestion,
      });
    }

    return NextResponse.json({
      status: 404,
      message: "Not Found",
      data: [],
    });
  }

  const question = await retrieveData("question");

  return NextResponse.json({ status: 200, message: "Success", data: question });
}
