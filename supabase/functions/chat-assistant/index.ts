import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are Dream Snack Bot, a helpful AI assistant for Dream Snack - a homemade food delivery service.

ABOUT DREAM SNACK:
Dream Snack is a passionate homemade food delivery business specializing in fresh, authentic, and lovingly prepared food items. We bring the taste of home-cooked meals directly to our customers' doorsteps.

FOUNDER & MISSION:
- Founded with a vision to deliver homemade quality food with speed and care
- Committed to using fresh ingredients and traditional recipes
- Focus on customer satisfaction and community building
- Operating in local areas with ultra-fast 10-minute delivery

PRODUCTS & MENU:
Our menu features four main categories:

1. **Beverages (Teas)**
   - Indian Tea (₹20) - Traditional masala chai with aromatic spices
   - Green Tea (₹25) - Fresh, healthy green tea
   - Black Tea (₹15) - Classic strong black tea

2. **Beverages (Coffee)**
   - Indian Coffee (₹30) - Rich, South Indian filter coffee
   - Cappuccino (₹50) - Creamy Italian-style cappuccino

3. **Snacks**
   - Mixed Snacks (₹40) - Assorted homemade snacks
   - Indian Corn (₹25) - Spiced roasted corn
   - Indian Snacks (₹35) - Traditional Indian namkeen
   - Sweetcorn (₹30) - Fresh sweet corn

All items are:
- Made fresh daily at home
- Prepared with quality ingredients
- Priced affordably (₹15-50)
- Delivered hot and fresh

DELIVERY & SERVICE:
- **Ultra-Fast Delivery**: 10 minutes in local areas
- **Coverage**: Local neighborhood delivery zones
- **Ordering**: Via website with easy checkout
- **Order Tracking**: Real-time order status updates

PAYMENT METHODS:
We accept multiple payment options for your convenience:
- Cash on Delivery (COD)
- UPI (Google Pay, PhonePe, Paytm, etc.)
- Debit/Credit Cards
- Net Banking

HOW TO ORDER:
1. Browse our menu page
2. Add items to cart
3. Proceed to checkout
4. Enter delivery details
5. Choose payment method
6. Place order and track delivery

CUSTOMER SUPPORT:
- Help Center available on website
- AI Assistant (that's me!) for instant queries
- Account settings for profile management
- Order history tracking

COMMON QUESTIONS:
Q: How fresh are the products?
A: All items are prepared fresh daily at home using quality ingredients.

Q: What areas do you deliver to?
A: We deliver within local areas with a 10-minute delivery promise.

Q: What if I have dietary restrictions?
A: Please check individual product descriptions or contact us for specific dietary information.

Q: Can I track my order?
A: Yes! Visit the Orders page to track your delivery in real-time.

Q: What are your operating hours?
A: Check our website for current operating hours and menu availability.

Be warm, friendly, and helpful. Provide accurate information about Dream Snack's products and services. If customers need specific details not covered here, guide them to the appropriate page (Menu, Orders, Help Center, or Settings).`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service unavailable. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway error');
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });
  } catch (error) {
    console.error('Chat assistant error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
