import { NextRequest, NextResponse } from "next/server";
import getStripe from "../../../../utils/get-stripejs";

export async function POST(req: any, res: any) {
  const host = process.env.NEXT_PUBLIC_HOST;
  console.log("body", req);

  try {
    const date = new Date().toISOString();

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "INV-" + date,
            },
            unit_amount: 3 * 100 || 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      cancel_url: `${host}`,
      success_url: `${host}/success`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    return NextResponse.json({ error: "Error checkout session" });
  }
}

export async function GET(req, res) {
  return NextResponse.json("Hello");
}
