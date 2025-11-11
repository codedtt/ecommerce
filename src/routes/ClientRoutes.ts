// src/routes/ClientRoutes.ts
import { Router } from 'express';
import type { Request, Response } from 'express';
import { OrderService } from '../services/OrderService.js';
import type { OrderItem } from '../models/DataModels.js';

const router = Router();

// Interface for the input data structure
interface CartItemInput {
    productId: string;
    quantity: number;
}

// --- API: POST /api/v1/checkout ---
router.post('/checkout', (req: Request, res: Response) => {
    try {
        const { cartItems, couponCode } = req.body;

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart must contain items.' });
        }

        // Type casting the raw request body data to the defined input structure
        const items: CartItemInput[] = cartItems as CartItemInput[];

        // Place the order using the service logic
        const newOrder = OrderService.placeOrder(items, couponCode || null);

        // ... (rest of the response logic is unchanged)

        res.status(201).json({ 
            message: 'Order successfully placed.',
            order: {
                id: newOrder.id,
                totalAmount: newOrder.totalAmount,
                discountApplied: newOrder.discountApplied,
                couponCodeUsed: newOrder.couponCodeUsed,
                items: newOrder.items,
                isDiscountEligible: newOrder.isDiscountEligible 
            }
        });

    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;