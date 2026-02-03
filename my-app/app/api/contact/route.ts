import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  console.log("GAUTA FORMA:", Object.fromEntries(formData));

  return NextResponse.json({ success: true });
}
