// src/services/DiscountService.ts
import * as dotenv from 'dotenv';
import { discountCodeStore } from '../data/InMemoryStore.js';
import type { DiscountCode, Order } from '../models/DataModels.js';    // Import types
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const N = parseInt(process.env.NTH_ORDER_TRIGGER || '5', 10); 
const DISCOUNT_PERCENTAGE = parseFloat(process.env.DISCOUNT_PERCENTAGE || '10');

/**
 * Service responsible for managing the single active discount code.
 */
export class DiscountService {

    /**
     * Checks if a new order satisfies the 'every nth order' condition.
     * @param orderId The ID of the newly placed order.
     * @returns boolean
     */
    public static isNthOrder(orderId: number): boolean {
        return orderId > 0 && orderId % N === 0;
    }

    /**
     * Generates a new, unique, single-use discount code.
     * @param eligibleOrder The order that triggered the eligibility.
     * @returns The newly created DiscountCode object.
     */
    public static generateCode(eligibleOrder: Order): DiscountCode {
        // Read active code from the store property
        const activeCode = discountCodeStore.code; // Use a new variable for local scoping
        
        // 1. SAFETY CHECK: Check the active code status
        if (activeCode && activeCode.isValid) { 
            throw new Error("A valid discount code already exists. Please use it first.");
        }
        
        // 2. SAFETY CHECK: Check the eligible order status
        if (!eligibleOrder.isDiscountEligible || eligibleOrder.status === 'DISCOUNT_GENERATED') {
            throw new Error(`Order ${eligibleOrder.id} is not eligible or has already generated a code.`);
        }

        const code = `D-${uuidv4().substring(0, 8).toUpperCase()}`;

        const newCode: DiscountCode = {
            code,
            percentage: DISCOUNT_PERCENTAGE,
            isValid: true,
            orderGeneratedBy: eligibleOrder.id,
        };
        
        // --- ASSIGNMENT IS SAFE ---
        discountCodeStore.code = newCode; 
        eligibleOrder.status = 'DISCOUNT_GENERATED';

        console.log(`CODE GENERATED: ${newCode.code} by Order #${eligibleOrder.id}`);
        return newCode;
    }

    /**
     * Validates a coupon code during the checkout process and redeems it.
     * @param code The user-provided coupon code.
     * @returns The redeemed code object, or null.
     */
    public static validateAndRedeemCode(code: string): DiscountCode | null {
        const activeCode = discountCodeStore.code; // Use a new variable
        
        // 1. Check if a code exists at all
        if (!activeCode) {
            return null;
        }

        // 2. Check if the code matches AND is valid
        if (activeCode.code === code && activeCode.isValid) {
            // Modify property of the imported object (Redeem the code)
            activeCode.isValid = false; 
            return activeCode;
        }

        return null; 
    }
}