import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const date = String(formData.get("date") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Trūksta laukų (vardas, el. paštas arba žinutė)." },
        { status: 400 }
      );
    }

    console.log("✅ GAUTA UŽKLAUSA:", { name, email, date, location, message });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Serverio klaida." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, hint: "Use POST to /api/contact" },
    { status: 200 }
  );
}
