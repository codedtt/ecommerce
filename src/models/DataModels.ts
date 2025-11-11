// src/models/DataModels.ts

/** The fixed price item sold by the store. */
export interface Product {
    id: string;
    name: string;
    price: number; // e.g., 29.99
}

/** An item added to the cart/order. */
export interface OrderItem {
    productId: string;
    quantity: number;
    priceAtTimeOfPurchase: number; // For historical accuracy
}

/** The single-use coupon code model. */
export interface DiscountCode {
    code: string;
    percentage: number; // e.g., 10 for 10%
    isValid: boolean; // True until successfully used once
    orderGeneratedBy: number; // The Order ID that generated this code
}

/** The main Order model. The ID is the order count. */
export interface Order {
    id: number; // Auto-incrementing, serves as the nth order counter (1, 2, 3, 4, 5...)
    items: OrderItem[];
    subtotal: number;
    discountApplied: number;
    couponCodeUsed: string | null;
    totalAmount: number;
    // Flag to indicate if this order was the one that qualified for the discount rule
    isDiscountEligible: boolean; 
    status: 'PLACED' | 'DISCOUNT_GENERATED'; // Used by admin API check
}