import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
})

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is not defined. Check your environment variables."
  )
}

interface CreateCheckOutSessionParams {
  userEmail: string
  userId: string
}

const createCheckOutSession = async ({
  userEmail,
  userId,
}: CreateCheckOutSessionParams) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1QVYNfGXEviLavTxILPoXCmd",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    customer_email: userEmail,
    metadata: { userId },
  })

  return session
}

export { createCheckOutSession, stripe }
