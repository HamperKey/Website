import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini API client
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured with a valid key.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      extraHeaders: {
        "User-Agent": "aistudio-build"
      }
    } as any);
  }
  return aiInstance;
}

// Luxurious HamperKey System Instructions
const SYSTEM_INSTRUCTION = `You are the Elite Gourmet Specialist & Sommelier Concierge for HamperKey.
HamperKey is a luxury pre-arrival food and drinks delivery service catering to premium UK holiday homes, cottages, serviced apartments, and boutique hotels in London, Surrey, Sussex, Kent, Essex, Suffolk, and Norfolk.

Your tone should be sophisticated, warm, cultured, helpful, and highly professional. Maintain an elegant British luxury aesthetic. Use selective, elegant formatting.

KEY POLICIES TO REINFORCE:
1. 72-Hour Notice Rule: To guarantee dynamic field-harvesting, dairy orders, and morning bake-fresh sourdoughs, we require a strict 72-hour notice before guest check-in.
2. Perfect Logistics with Host Coordination: We obtain access codes or coordinate key safes directly with property hosts/managers. We stock the goods inside the kitchen counter & chilled fridge before guests step indoors.
3. Pricing & Hampers offered:
   - "First 24 Hours Sorted" (£89 Base/Flagship) - Organic farm eggs, outdoor pork bacon, salted butter, Kent sourdough, charcuterie.
   - "Wine, Cheese & Nibbles" (£65 Base) - Reserved vineyard bottle (sparkling/red) + 3 artisan local cheeses and rosemary almonds.
   - "Family No-Shop Bundle" (£149 Base) - Pancake mix, organic fruit basket, artisan spaghetti dinner kit, breakfast cycle.
   - "Classic Arrival Pack" (£39 Base) - Fresh ground coffee, morning tea, warm sourdough preserves.
   - "Celebration Ready" (£75) - Champagne flute + dark hand-rolled truffles + field wildflowers.
   - "Group House Starter" (£299) - Cider, beer, double brunches, grand cheese & charcuterie grazing boards.
   - "Dog-Friendly Welcome" (£25) - Organic treats, chew toys, biodegradable supplies.

INTERACTIVE ACTION TAGS:
When a customer is looking for a package recommendation, guide them beautifully and suggest ONE base package that matches their journey.
To allow the client-side system to programmatically load the recommended option directly into the interactive builder for them, MUST append a special hidden interaction tag at the very end of your response like this:
[RECOMMEND: base-first-24]

Replace the id with one of these matching ids:
- "base-first-24" for First 24 Hours Sorted
- "base-wine-cheese" for Wine, Cheese & Nibbles
- "base-classic" for Classic Arrival Pack
- "base-family" for Family No-Shop Bundle
- "base-group" for Group House Starter
- "base-none" for starting completely custom

Do not invent other base option IDs. If multiple apply, choose the single closest match.`;

// AI Assistant Chat Route
app.post("/api/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
      return;
    }

    // Attempt to request Gemini
    let client: GoogleGenAI;
    try {
      client = getGeminiClient();
    } catch (err: any) {
      console.warn("Gemini client initialization failed: ", err.message);
      // Fallback response if API key is missing or invalid
      res.json({
        content: "Thank you for reaching out to HamperKey Gourmet Concierge! I would love to help you arrange your pre-arrival larder box. Note: The server's Gemini API key is currently missing, but I can guide you manually. Would you like our Flagship 'First 24 Hours Sorted' (£89) package or our curated Wine & Cheese package? Just click on our packages below or build a custom selection!\n\n[RECOMMEND: base-first-24]"
      });
      return;
    }

    // Convert messages to Gemini Content schema format
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: m.content }]
    }));

    // Call modern Google GenAI SDK
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I am here to coordinate your culinary checkout. How may I guide you?";

    res.json({ content: replyText });

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({
      error: "An error occurred while connecting with HamperKey Concierge.",
      details: error.message
    });
  }
});

// Lazy-initialized Stripe client
let stripeInstance: Stripe | null = null;
function getStripeClient(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key === "MY_STRIPE_SECRET_KEY") {
      throw new Error("STRIPE_SECRET_KEY environment variable is not configured.");
    }
    stripeInstance = new Stripe(key, {
      apiVersion: "2025-01-27" as any,
    });
  }
  return stripeInstance;
}

// Stripe Checkout Session Creation Route
app.post("/api/checkout-session", async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, successUrl, cancelUrl, customerInfo } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Cart items are required for checkout." });
      return;
    }

    const key = process.env.STRIPE_SECRET_KEY;

    // Handle absent API Keys gracefully (Sandbox simulation)
    if (!key || key === "MY_STRIPE_SECRET_KEY") {
      const orderId = "hk_order_" + Math.random().toString(36).substr(2, 9);
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Simulate successful checkout redirection with metadata parameters
      const simulatedUrl = `${successUrl}?session_id=cs_simulated_${orderId}&simulated=true&total=${total}&propertyName=${encodeURIComponent(customerInfo?.propertyName || "")}&deliveryDate=${encodeURIComponent(customerInfo?.deliveryDate || "")}&guestName=${encodeURIComponent(customerInfo?.guestName || "")}`;
      
      res.json({ url: simulatedUrl });
      return;
    }

    const stripe = getStripeClient();

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name + (item.details ? ` (${item.details})` : ""),
          images: item.imageUrl ? [(item.imageUrl.startsWith("http") ? item.imageUrl : `${process.env.APP_URL || "http://localhost:3000"}${item.imageUrl}`).replace(/([^:]\/)\/+/g, "$1")] : [],
        },
        unit_amount: Math.round(item.price * 100), // convert GBP to Pence
      },
      quantity: item.quantity,
    }));

    // Save logs or handle meta
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&propertyName=${encodeURIComponent(customerInfo?.propertyName || "")}&deliveryDate=${encodeURIComponent(customerInfo?.deliveryDate || "")}&guestName=${encodeURIComponent(customerInfo?.guestName || "")}`,
      cancel_url: cancelUrl,
      metadata: {
        propertyName: customerInfo?.propertyName || "",
        deliveryDate: customerInfo?.deliveryDate || "",
        guestName: customerInfo?.guestName || "",
      }
    });

    res.json({ url: session.url });

  } catch (error: any) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: error.message });
  }
});

// Vite Middleware & Static Serves
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    // Production statics
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from dist/.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HamperKey server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
