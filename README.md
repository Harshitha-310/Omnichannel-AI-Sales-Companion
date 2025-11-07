# ABFRL Agentic Conversational Sales Agent

An AI-powered omnichannel retail assistant built using React + modular Worker Agents to deliver
personalized product recommendations, real-time stock checks, seamless payments, loyalty benefits, 
and smooth checkout across channels like Web, Mobile, WhatsApp, and in-store kiosk.

---

### 🚀 Key Features

✅ **Omnichannel Continuity**
- Switch between web, mobile, WhatsApp, kiosk — session stays consistent

✅ **Personalized Sales Experience**
- Identifies customer by ID/name
- Uses shopping history, preferences & loyalty tier for tailored suggestions

✅ **Agentic Worker Architecture**
- Recommendation Agent → smart picks & cross-sell bundles  
- Inventory Agent → online + in-store stock availability  
- Payment Agent → secure checkout with failure handling  
- Loyalty Agent → promo validation + reward points  
- Fulfillment Agent → delivery or pickup scheduling  

✅ **Persuasive Sales Psychology**
- Conversational guidance
- Add-on item suggestions to increase AOV
- Friendly emoji experience 😄

✅ **Robust Edge Case Handling**
- Payment retry flow
- Out-of-stock alternatives
- Promo rules & fallback suggestions
- Cart recalculations in real-time

---

### 🧠 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + Hooks + Tailwind UI-like styling |
| Business Logic | Agentic Worker Modules (JS Classes) |
| Data | Mock APIs: Customers, Products, Inventory, Promotions |

---

### ✨ Sample Journey to Test

1️⃣ Enter name/ID:  
`C001`

2️⃣ Ask for products:  
`show products`

3️⃣ Add to cart:  
`add P001`  
`add P003`

4️⃣ Apply promo:  
`FESTIVE20`

5️⃣ Checkout:  
`checkout`

✔ You will receive order confirmation + delivery timeline  
✔ Loyalty points awarded 🎁  

---

### 🏛 Architecture Overview

**Sales Agent (Core Brain)**  
➡ Listens to user intent  
➡ Maintains session context  
➡ Delegates tasks to Worker Agents  

**Pluggable Worker Agents**  
| Agent | Responsibility |
|-------|----------------|
| RecommendationAgent | Personalized picks, complementary bundles |
| InventoryAgent | Online & store stock checks, reserve availability |
| PaymentAgent | Transaction processing + retries |
| LoyaltyAgent | Promo/points validation |
| FulfillmentAgent | Delivery scheduling or store pickup |

Easily extendable — e.g., Gift-Wrapping Agent 🎁

---
### 🧪 Future Enhancements

🔹 Integration with real backend APIs  
🔹 Voice assistant support  
🔹 ML-driven recommendation engine  
🔹 Analytics to track conversion improvement  
🔹 POS & payment gateway integration  

---

### 🏁 Summary

> This AI Sales Agent eliminates online–offline fragmentation by creating a continuous,
> highly personalized, and persuasive shopping journey — boosting AOV & conversions
> for ABFRL retail experiences.

---

👩‍💻 Developed for **EY Techathon 6.0**  
📌 Made with ❤️ using React + Agent-Orchestrated Architecture
