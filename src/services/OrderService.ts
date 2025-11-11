// src/services/OrderService.ts
import type { OrderItem, Product, Order, DiscountCode } from '../models/DataModels.js'; 
import { products, orders } from '../data/InMemoryStore.js'; 
import { DiscountService } from './DiscountService.js'; 

// --- NEW INTERFACE FOR INPUT DATA ---
interface CartItemInput {
    productId: string;
    quantity: number;
}
// --- --------------------------- ---

// Simple auto-incrementing counter for Order ID
let nextOrderId = 1;

/**
 * Service responsible for calculating cart totals and placing orders.
 */
export class OrderService {

    /**
     * Validates and calculates the cost for a list of items.
     * ACCEPTS CartItemInput[], RETURNS enriched OrderItem[]
     * @param cartItems Items in the user's cart.
     * @returns Subtotal and the list of validated items.
     */
    public static calculateCart(cartItems: CartItemInput[]): { subtotal: number, validItems: OrderItem[] } {
        let subtotal = 0;
        const validItems: OrderItem[] = [];

        for (const item of cartItems) {
            const product = products.find(p => p.id === item.productId);
            if (!product || item.quantity <= 0) {
                continue; 
            }

            const itemPrice = product.price;
            const itemSubtotal = itemPrice * item.quantity;
            subtotal += itemSubtotal;

            validItems.push({
                // Note: Here we construct a complete OrderItem with the required field
                productId: item.productId,
                quantity: item.quantity,
                priceAtTimeOfPurchase: itemPrice, 
            });
        }

        return { subtotal: Number(subtotal.toFixed(2)), validItems };
    }

    /**
     * Places a new order, applies discount if valid, and checks for nth order eligibility.
     * ACCEPTS CartItemInput[]
     * @param cartItems The items to be ordered.
     * @param couponCode Optional discount code.
     * @returns The newly placed Order object.
     */
    public static placeOrder(cartItems: CartItemInput[], couponCode: string | null): Order {
        if (!cartItems || cartItems.length === 0) {
            throw new Error('Cannot place an order with an empty cart.');
        }

        const { subtotal, validItems } = this.calculateCart(cartItems);
        let discountApplied = 0;
        let usedCouponCode: DiscountCode | null = null;
        
        // =========================================================
        // === MISSING LOGIC BLOCK ADDED HERE ===
        // 1. Discount Validation and Redemption
        if (couponCode) {
            usedCouponCode = DiscountService.validateAndRedeemCode(couponCode);
            if (usedCouponCode) {
                // Apply discount to the entire order
                discountApplied = subtotal * (usedCouponCode.percentage / 100);
            } else {
                console.warn(`Coupon code ${couponCode} was provided but is invalid or expired.`);
            }
        }
        // =========================================================

        discountApplied = Number(discountApplied.toFixed(2));
        const totalAmount = Number((subtotal - discountApplied).toFixed(2));
        const currentOrderId = nextOrderId++; 

        // 2. Nth Order Check
        const isEligible = DiscountService.isNthOrder(currentOrderId);

        // 3. Create and store the new Order
        const newOrder: Order = {
            id: currentOrderId,
            items: validItems, // This is the fully enriched OrderItem[]
            subtotal,
            discountApplied,
            couponCodeUsed: usedCouponCode ? usedCouponCode.code : null,
            totalAmount,
            isDiscountEligible: isEligible,
            status: 'PLACED',
        };

        orders.push(newOrder);

        if (isEligible) {
            console.log(`*** ORDER #${currentOrderId} IS ELIGIBLE FOR A 10% COUPON! ***`);
        }
        
        return newOrder;
    }
}