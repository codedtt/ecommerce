// src/data/InMemoryStore.ts
import type { Product, Order, DiscountCode } from '../models/DataModels.js';

// --- 1. Products (Fixed Catalog) ---
export const products: Product[] = [
    { id: 'P001', name: 'Wireless Mouse', price: 25.00 },
    { id: 'P002', name: 'Mechanical Keyboard', price: 120.00 },
    { id: 'P003', name: 'Monitor Stand', price: 45.00 },
];

// --- 2. Orders (Transaction History) ---
export const orders: Order[] = [];

// --- 3. Discount Codes (The n-th order feature) ---
export const discountCodeStore: { code: DiscountCode | null } = {
    code: null,
};