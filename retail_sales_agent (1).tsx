import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Package, CreditCard, Gift, MapPin, MessageSquare, Phone, Monitor, Smartphone } from 'lucide-react';

// Mock Data Services
const mockCustomers = [
  { id: 'C001', name: 'Priya Sharma', tier: 'Gold', points: 2500, history: ['Dresses', 'Handbags'], preferences: ['Ethnic wear', 'Formal'], device: 'mobile' },
  { id: 'C002', name: 'Rahul Verma', tier: 'Silver', points: 1200, history: ['Shirts', 'Trousers'], preferences: ['Casual', 'Office wear'], device: 'web' },
  { id: 'C003', name: 'Ananya Patel', tier: 'Platinum', points: 5000, history: ['Designer wear', 'Accessories'], preferences: ['Premium', 'Trendy'], device: 'app' },
  { id: 'C004', name: 'Vikram Singh', tier: 'Gold', points: 3200, history: ['Jackets', 'Shoes'], preferences: ['Casual', 'Sports'], device: 'mobile' },
  { id: 'C005', name: 'Meera Reddy', tier: 'Silver', points: 1800, history: ['Sarees', 'Jewelry'], preferences: ['Ethnic wear', 'Traditional'], device: 'whatsapp' },
  { id: 'C006', name: 'Arjun Kumar', tier: 'Bronze', points: 500, history: ['T-shirts'], preferences: ['Casual', 'Trendy'], device: 'web' },
  { id: 'C007', name: 'Sneha Iyer', tier: 'Platinum', points: 7500, history: ['Designer wear', 'Premium'], preferences: ['Luxury', 'Premium'], device: 'app' },
  { id: 'C008', name: 'Karan Malhotra', tier: 'Gold', points: 2900, history: ['Formal wear', 'Accessories'], preferences: ['Formal', 'Office wear'], device: 'kiosk' },
  { id: 'C009', name: 'Divya Nair', tier: 'Silver', points: 1500, history: ['Dresses', 'Tops'], preferences: ['Casual', 'Western'], device: 'mobile' },
  { id: 'C010', name: 'Rohan Desai', tier: 'Bronze', points: 800, history: ['Shirts', 'Jeans'], preferences: ['Casual', 'Smart casual'], device: 'web' }
];

const mockProducts = [
  { sku: 'P001', name: 'Designer Kurta Set', category: 'Ethnic', price: 2999, image: '👗', stock: { online: 15, store1: 5, store2: 0 } },
  { sku: 'P002', name: 'Formal Shirt', category: 'Formal', price: 1499, image: '👔', stock: { online: 25, store1: 10, store2: 8 } },
  { sku: 'P003', name: 'Premium Handbag', category: 'Accessories', price: 3499, image: '👜', stock: { online: 8, store1: 3, store2: 5 } },
  { sku: 'P004', name: 'Casual Jeans', category: 'Casual', price: 1999, image: '👖', stock: { online: 30, store1: 12, store2: 15 } },
  { sku: 'P005', name: 'Ethnic Jewelry', category: 'Accessories', price: 1299, image: '💍', stock: { online: 20, store1: 7, store2: 4 } },
  { sku: 'P006', name: 'Designer Saree', category: 'Ethnic', price: 4999, image: '🥻', stock: { online: 10, store1: 4, store2: 3 } },
  { sku: 'P007', name: 'Leather Jacket', category: 'Casual', price: 5999, image: '🧥', stock: { online: 12, store1: 5, store2: 6 } },
  { sku: 'P008', name: 'Sports Shoes', category: 'Sports', price: 3299, image: '👟', stock: { online: 40, store1: 15, store2: 20 } },
  { sku: 'P009', name: 'Formal Trousers', category: 'Formal', price: 1799, image: '👔', stock: { online: 35, store1: 12, store2: 10 } },
  { sku: 'P010', name: 'Party Dress', category: 'Western', price: 3799, image: '👗', stock: { online: 18, store1: 6, store2: 8 } },
  { sku: 'P011', name: 'Denim Jacket', category: 'Casual', price: 2499, image: '🧥', stock: { online: 22, store1: 8, store2: 9 } },
  { sku: 'P012', name: 'Designer Watch', category: 'Accessories', price: 8999, image: '⌚', stock: { online: 5, store1: 2, store2: 1 } },
  { sku: 'P013', name: 'Cotton T-Shirt', category: 'Casual', price: 799, image: '👕', stock: { online: 50, store1: 20, store2: 25 } },
  { sku: 'P014', name: 'Evening Gown', category: 'Premium', price: 7999, image: '👗', stock: { online: 6, store1: 2, store2: 2 } },
  { sku: 'P015', name: 'Sunglasses', category: 'Accessories', price: 1599, image: '🕶️', stock: { online: 30, store1: 10, store2: 12 } }
];

const mockPromotions = [
  { code: 'FESTIVE20', discount: 20, minPurchase: 2000, type: 'percentage' },
  { code: 'WELCOME10', discount: 10, minPurchase: 0, type: 'percentage' },
  { code: 'FLAT500', discount: 500, minPurchase: 3000, type: 'flat' },
  { code: 'SUMMER25', discount: 25, minPurchase: 2500, type: 'percentage' },
  { code: 'NEWYEAR15', discount: 15, minPurchase: 1500, type: 'percentage' },
  { code: 'SAVE1000', discount: 1000, minPurchase: 5000, type: 'flat' },
  { code: 'FIRST100', discount: 100, minPurchase: 500, type: 'flat' },
  { code: 'MEGA30', discount: 30, minPurchase: 4000, type: 'percentage' }
];

// Worker Agents
class RecommendationAgent {
  recommend(customer, context) {
    const products = mockProducts.filter(p => 
      customer.preferences.some(pref => p.category.toLowerCase().includes(pref.toLowerCase()))
    );
    return products.slice(0, 3);
  }

  suggestBundles(mainProduct) {
    return mockProducts.filter(p => p.sku !== mainProduct.sku).slice(0, 2);
  }
}

class InventoryAgent {
  checkStock(sku, location = 'online') {
    const product = mockProducts.find(p => p.sku === sku);
    if (!product) return { available: false, locations: [] };
    
    const locations = [];
    if (product.stock.online > 0) locations.push({ name: 'Online Warehouse', qty: product.stock.online, type: 'ship' });
    if (product.stock.store1 > 0) locations.push({ name: 'Phoenix Mall Store', qty: product.stock.store1, type: 'pickup' });
    if (product.stock.store2 > 0) locations.push({ name: 'Central Plaza Store', qty: product.stock.store2, type: 'pickup' });
    
    return { available: locations.length > 0, locations };
  }
}

class PaymentAgent {
  processPayment(amount, method) {
    // Simulate payment processing
    const success = Math.random() > 0.1; // 90% success rate
    return {
      success,
      transactionId: success ? `TXN${Date.now()}` : null,
      message: success ? 'Payment successful' : 'Payment failed. Please try again.'
    };
  }
}

class LoyaltyAgent {
  applyPoints(customer, amount) {
    const pointsEarned = Math.floor(amount / 100);
    const maxRedeemable = Math.floor(customer.points / 10);
    return { pointsEarned, maxRedeemable };
  }

  validatePromo(code, amount) {
    const promo = mockPromotions.find(p => p.code === code);
    if (!promo) return { valid: false, discount: 0 };
    if (amount < promo.minPurchase) return { valid: false, discount: 0, message: `Minimum purchase ₹${promo.minPurchase} required` };
    
    const discount = promo.type === 'percentage' ? (amount * promo.discount / 100) : promo.discount;
    return { valid: true, discount, message: `${promo.discount}${promo.type === 'percentage' ? '%' : '₹'} discount applied` };
  }
}

class FulfillmentAgent {
  scheduleDelivery(orderId, type) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (type === 'ship' ? 3 : 1));
    return {
      orderId,
      type,
      scheduledDate: deliveryDate.toLocaleDateString(),
      trackingId: `TRACK${Date.now()}`
    };
  }
}

// Main Sales Agent Component
const ConversationalSalesAgent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [channel, setChannel] = useState('web');
  const [sessionContext, setSessionContext] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize agents
  const agents = {
    recommendation: new RecommendationAgent(),
    inventory: new InventoryAgent(),
    payment: new PaymentAgent(),
    loyalty: new LoyaltyAgent(),
    fulfillment: new FulfillmentAgent()
  };

  useEffect(() => {
    // Welcome message
    addMessage('agent', 'Welcome to our store! 👋 I\'m your personal shopping assistant. May I know your name or customer ID to provide personalized recommendations?');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (sender, text, data = null) => {
    setMessages(prev => [...prev, { sender, text, data, timestamp: new Date() }]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    addMessage('user', userMessage);
    setInput('');
    setIsProcessing(true);

    // Process message through Sales Agent orchestration
    await processSalesQuery(userMessage);
    setIsProcessing(false);
  };

  const processSalesQuery = async (query) => {
    const lowerQuery = query.toLowerCase();

    // Customer identification
    if (!customer && (lowerQuery.includes('c00') || lowerQuery.includes('priya') || lowerQuery.includes('rahul') || lowerQuery.includes('ananya'))) {
      const foundCustomer = mockCustomers.find(c => 
        lowerQuery.includes(c.id.toLowerCase()) || lowerQuery.includes(c.name.toLowerCase().split(' ')[0])
      );
      
      if (foundCustomer) {
        setCustomer(foundCustomer);
        const recommendations = agents.recommendation.recommend(foundCustomer, sessionContext);
        addMessage('agent', `Great to see you again, ${foundCustomer.name}! 🌟 You're a ${foundCustomer.tier} member with ${foundCustomer.points} loyalty points.`);
        setTimeout(() => {
          addMessage('agent', 'Based on your preferences, I have some exciting recommendations for you!', { products: recommendations });
        }, 1000);
        return;
      }
    }

    // Product search and recommendations
    if (lowerQuery.includes('show') || lowerQuery.includes('looking for') || lowerQuery.includes('need') || lowerQuery.includes('want')) {
      if (customer) {
        const recommendations = agents.recommendation.recommend(customer, sessionContext);
        addMessage('agent', 'Here are some items specially picked for you based on your style preferences:', { products: recommendations });
      } else {
        addMessage('agent', 'I\'d love to help! Could you tell me your customer ID or name first so I can personalize recommendations for you?');
      }
      return;
    }

    // Add to cart
    if (lowerQuery.includes('add') || lowerQuery.includes('cart') || lowerQuery.includes('buy')) {
      const product = mockProducts.find(p => lowerQuery.includes(p.sku.toLowerCase()) || lowerQuery.includes(p.name.toLowerCase().split(' ')[0].toLowerCase()));
      
      if (product) {
        const stockInfo = agents.inventory.checkStock(product.sku);
        if (stockInfo.available) {
          setCart(prev => [...prev, product]);
          const bundles = agents.recommendation.suggestBundles(product);
          addMessage('agent', `Great choice! I've added ${product.name} to your cart. 🛍️`);
          setTimeout(() => {
            addMessage('agent', `This pairs beautifully with these items. Would you like to add them too?`, { products: bundles, type: 'bundle' });
          }, 1000);
        } else {
          addMessage('agent', `I'm sorry, ${product.name} is currently out of stock. Can I suggest similar alternatives?`);
        }
      } else {
        addMessage('agent', 'Could you specify which product you\'d like to add? You can mention the product name or code.');
      }
      return;
    }

    // Check inventory
    if (lowerQuery.includes('stock') || lowerQuery.includes('available')) {
      const product = mockProducts.find(p => lowerQuery.includes(p.sku.toLowerCase()));
      if (product) {
        const stockInfo = agents.inventory.checkStock(product.sku);
        addMessage('agent', `Let me check availability for ${product.name}...`, { inventory: stockInfo });
      } else {
        addMessage('agent', 'Which product would you like to check availability for?');
      }
      return;
    }

    // Apply promo code
    if (lowerQuery.includes('promo') || lowerQuery.includes('coupon') || lowerQuery.includes('discount') || lowerQuery.includes('apply') || lowerQuery.includes('code')) {
      // Extract code - look for any uppercase word with 5+ chars
      const words = query.split(/\s+/);
      const code = words.find(word => /^[A-Z0-9]{5,}$/.test(word.toUpperCase()))?.toUpperCase();
      
      if (code && cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const promoResult = agents.loyalty.validatePromo(code, total);
        if (promoResult.valid) {
          setSessionContext(prev => ({ ...prev, appliedPromo: { code, discount: promoResult.discount } }));
          addMessage('agent', `✅ Promo code ${code} applied! ${promoResult.message}\nYou save ₹${promoResult.discount.toFixed(2)}!\nNew total: ₹${(total - promoResult.discount).toFixed(2)}`);
        } else {
          addMessage('agent', `❌ ${promoResult.message || `Promo code ${code} is invalid or cannot be applied to your current cart.`}\n\nCurrent cart total: ₹${total}\n\n📋 Available codes:\n• FESTIVE20 (20% off on ₹2000+)\n• WELCOME10 (10% off any purchase)\n• FLAT500 (₹500 off on ₹3000+)\n• SUMMER25 (25% off on ₹2500+)\n• NEWYEAR15 (15% off on ₹1500+)\n• SAVE1000 (₹1000 off on ₹5000+)\n• FIRST100 (₹100 off on ₹500+)\n• MEGA30 (30% off on ₹4000+)`);
        }
      } else if (cart.length === 0) {
        addMessage('agent', 'Please add items to your cart first before applying a promo code.\n\n📋 Available codes:\n• FESTIVE20 (20% off on ₹2000+)\n• WELCOME10 (10% off any purchase)\n• FLAT500 (₹500 off on ₹3000+)\n• SUMMER25 (25% off on ₹2500+)\n• NEWYEAR15 (15% off on ₹1500+)\n• SAVE1000 (₹1000 off on ₹5000+)\n• FIRST100 (₹100 off on ₹500+)\n• MEGA30 (30% off on ₹4000+)');
      } else {
        addMessage('agent', '📋 Available promo codes:\n• FESTIVE20 (20% off on ₹2000+)\n• WELCOME10 (10% off any purchase)\n• FLAT500 (₹500 off on ₹3000+)\n• SUMMER25 (25% off on ₹2500+)\n• NEWYEAR15 (15% off on ₹1500+)\n• SAVE1000 (₹1000 off on ₹5000+)\n• FIRST100 (₹100 off on ₹500+)\n• MEGA30 (30% off on ₹4000+)\n\nType "apply FESTIVE20" or just "FESTIVE20" to use a code!');
      }
      return;
    }

    // Checkout
    if (lowerQuery.includes('checkout') || lowerQuery.includes('pay') || lowerQuery.includes('purchase')) {
      if (cart.length === 0) {
        addMessage('agent', 'Your cart is empty. Would you like to see our recommendations?');
      } else {
        initiateCheckout();
      }
      return;
    }

    // Channel switch
    if (lowerQuery.includes('store') || lowerQuery.includes('kiosk')) {
      setChannel('kiosk');
      addMessage('agent', `I see you've moved to our in-store kiosk. 🏬 Your cart and session are seamlessly transferred. How can I assist you here?`);
      return;
    }

    // Default response
    addMessage('agent', 'I can help you with:\n• Personalized product recommendations\n• Checking stock availability\n• Adding items to cart\n• Applying promo codes\n• Completing your purchase\n\nWhat would you like to do?');
  };

  const initiateCheckout = async () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    let total = subtotal;
    let discountAmount = 0;
    
    // Apply stored promo code if exists
    if (sessionContext.appliedPromo) {
      discountAmount = sessionContext.appliedPromo.discount;
      total = subtotal - discountAmount;
    }
    
    const loyaltyInfo = customer ? agents.loyalty.applyPoints(customer, total) : null;
    
    addMessage('agent', `📊 Order Summary:\nSubtotal: ₹${subtotal}${discountAmount > 0 ? `\nDiscount (${sessionContext.appliedPromo.code}): -₹${discountAmount.toFixed(2)}` : ''}\n━━━━━━━━━━━━\nTotal: ₹${total.toFixed(2)}\n\n${loyaltyInfo ? `🎁 You'll earn ${loyaltyInfo.pointsEarned} points on this purchase!` : ''}\n\nProcessing payment...`);
    
    setTimeout(() => {
      const paymentResult = agents.payment.processPayment(total, 'card');
      
      if (paymentResult.success) {
        const fulfillment = agents.fulfillment.scheduleDelivery(paymentResult.transactionId, 'ship');
        addMessage('agent', `🎉 Payment successful! Order confirmed.\n\n📦 Order ID: ${fulfillment.orderId}\n🚚 Expected delivery: ${fulfillment.scheduledDate}\n🔍 Tracking: ${fulfillment.trackingId}\n💰 Amount paid: ₹${total.toFixed(2)}\n\nThank you for shopping with us! 🛍️`);
        setCart([]);
        setSessionContext(prev => ({ ...prev, appliedPromo: null }));
      } else {
        addMessage('agent', `${paymentResult.message} Would you like to try a different payment method?`);
      }
    }, 2000);
  };

  const channelIcons = {
    web: <Monitor className="w-4 h-4" />,
    mobile: <Smartphone className="w-4 h-4" />,
    whatsapp: <MessageSquare className="w-4 h-4" />,
    kiosk: <MapPin className="w-4 h-4" />
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">AI Sales Assistant</h1>
            <p className="text-sm text-gray-500">Omnichannel Shopping Experience</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
            {channelIcons[channel]}
            <span className="text-sm font-medium capitalize">{channel}</span>
          </div>
          {customer && (
            <div className="flex items-center space-x-2 bg-purple-100 px-3 py-2 rounded-lg">
              <User className="w-4 h-4 text-purple-600" />
              <div className="text-xs">
                <div className="font-semibold">{customer.name}</div>
                <div className="text-gray-600">{customer.tier} • {customer.points} pts</div>
              </div>
            </div>
          )}
          {cart.length > 0 && (
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
              <ShoppingCart className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold">{cart.length} items</span>
            </div>
          )}
        </div>
      </div>

      {/* Channel Switcher */}
      <div className="bg-white border-b px-4 py-2 flex space-x-2">
        {['web', 'mobile', 'whatsapp', 'kiosk'].map(ch => (
          <button
            key={ch}
            onClick={() => {
              setChannel(ch);
              addMessage('system', `Switched to ${ch} channel. Session continued seamlessly.`);
            }}
            className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
              channel === ch ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {channelIcons[ch]}
            <span className="capitalize">{ch}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl ${msg.sender === 'user' ? 'bg-purple-600 text-white' : msg.sender === 'system' ? 'bg-yellow-100 text-yellow-800' : 'bg-white shadow-md'} rounded-lg p-4`}>
              <p className="whitespace-pre-line">{msg.text}</p>
              
              {msg.data?.products && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {msg.data.products.map(product => (
                    <div key={product.sku} className="bg-gray-50 p-3 rounded-lg text-center border border-gray-200">
                      <div className="text-4xl mb-2">{product.image}</div>
                      <div className="text-xs font-semibold text-gray-800">{product.name}</div>
                      <div className="text-sm font-bold text-purple-600">₹{product.price}</div>
                      <button 
                        onClick={() => {
                          setCart(prev => [...prev, product]);
                          addMessage('agent', `Added ${product.name} to cart!`);
                        }}
                        className="mt-2 w-full bg-purple-600 text-white text-xs py-1 rounded hover:bg-purple-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {msg.data?.inventory && (
                <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-sm mb-2">Stock Availability:</p>
                  {msg.data.inventory.locations.map((loc, i) => (
                    <div key={i} className="flex justify-between text-xs mb-1">
                      <span>{loc.name}:</span>
                      <span className="font-bold">{loc.qty} units ({loc.type})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Shopping Cart Summary */}
      {cart.length > 0 && (
        <div className="bg-white border-t p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2 flex-wrap">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg mb-2">
                  <span className="text-2xl">{item.image}</span>
                  <span className="text-sm">{item.name}</span>
                  <span className="font-bold text-purple-600">₹{item.price}</span>
                </div>
              ))}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Subtotal:</div>
              <div className="text-xl font-bold text-gray-800">₹{cart.reduce((sum, item) => sum + item.price, 0)}</div>
              {sessionContext.appliedPromo && (
                <>
                  <div className="text-sm text-green-600">Discount ({sessionContext.appliedPromo.code}):</div>
                  <div className="text-lg font-bold text-green-600">-₹{sessionContext.appliedPromo.discount.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 border-t mt-1 pt-1">Final Total:</div>
                  <div className="text-2xl font-bold text-purple-600">
                    ₹{(cart.reduce((sum, item) => sum + item.price, 0) - sessionContext.appliedPromo.discount).toFixed(2)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Try: 'C001' | 'show products' | 'add P001' | 'FESTIVE20' | 'checkout'"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={handleSendMessage}
            disabled={isProcessing}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          Quick test: Type "C001" → "add P001" → "add P003" → "FESTIVE20" → "checkout"
        </div>
      </div>
    </div>
  );
};

export default ConversationalSalesAgent;