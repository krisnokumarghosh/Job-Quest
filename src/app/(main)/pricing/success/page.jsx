import { createSubscription } from "@/lib/actions/subscriptions";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") return redirect("/");

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };

    const result = await createSubscription(subsInfo)
    console.log(result);
    

    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Check icon */}
          <div className="w-18 h-18 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-9 h-9 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-3 py-1 rounded-full mb-4">
            ✓ Payment confirmed
          </span>

          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Youre all set!
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            A confirmation has been sent to{" "}
            <span className="font-medium text-foreground">{customerEmail}</span>
            .
            <br />
            Questions? Email{" "}
            <a
              href="mailto:orders@example.com"
              className="text-blue-600 hover:underline"
            >
              orders@example.com
            </a>
          </p>

          <hr className="border-border mb-5" />

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order status</span>
              <span className="font-medium text-emerald-600">Complete</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Confirmation sent to
              </span>
              <span className="font-medium text-foreground truncate ml-4">
                {customerEmail}
              </span>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground flex items-center justify-center gap-1">
            🔒 Secured by Stripe
          </p>
        </div>
      </main>
    );
  }
}
