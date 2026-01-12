/**
 * Receipt Generation Helper Utilities
 *
 * This file contains helper functions to construct the receipt generation
 * request object from the current application state without modifying
 * existing code flow.
 */

/**
 * Calculate item-level totals including tax
 * @param {Object} item - Ring-up item from Redux store
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.085 for 8.5%)
 * @returns {Object} Item with calculated totals
 */
export const calculateItemTotals = (item, taxRate = 0) => {
  const subtotal = item.qty * item.product_price;
  const taxAmount = (subtotal * (item.tax_percentage || taxRate)) / 100;
  const itemDiscount = item.discount || 0;
  const total = subtotal + taxAmount - itemDiscount;

  return {
    id: item.id,
    name: item.name,
    qty: item.qty,
    product_price: item.product_price,
    tax_percentage: item.tax_percentage || taxRate * 100,
    tax_amount: parseFloat(taxAmount.toFixed(2)),
    discount: itemDiscount,
    subtotal: parseFloat(subtotal.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    barcode: item.barcode || undefined,
    sku: item.sku || undefined,
    category: item.category || undefined,
    imageUrl: item.imageUrl || undefined,
  };
};

/**
 * Build receipt generation request object
 * @param {Object} params - Parameters object
 * @param {Array} params.ringUpItems - Items from Redux RingUpSlice
 * @param {Object} params.customerInfo - Customer details from CustomerDetailsModal
 * @param {Object} params.summary - Payment summary from SalePoint calculations
 * @param {string} params.paymentMethod - Selected payment method
 * @param {Object} params.checkoutData - Additional checkout data from CheckoutModal
 * @param {Object} params.metadata - Optional transaction metadata
 * @returns {Object} Complete receipt request object
 */
export const buildReceiptRequest = (
  ringUpItems,
  customerInfo,
  summary,
  paymentMethod,
  checkoutData,
  metadata
) => {
  // Validate required fields
  if (!ringUpItems || ringUpItems.length === 0) {
    throw new Error("At least one item is required to generate a receipt");
  }

  if (!paymentMethod) {
    throw new Error("Payment method is required");
  }

  // Extract summary values with defaults
  const {
    subtotal = 0,
    tax = 0,
    discount = 0,
    total = 0,
    totalItems = 0,
    isPercentage = false,
    discountPercentage = 0,
  } = summary;

  // Extract checkout data
  const {
    tendered = undefined,
    change = undefined,
    emailReceipt = false,
    cardLast4 = undefined,
    cardBrand = undefined,
    transactionReference = undefined,
  } = checkoutData;

  // Extract metadata with defaults
  const {
    storeId = undefined,
    posTerminalId = undefined,
    employeeId = undefined,
    employeeName = undefined,
  } = metadata;

  // Calculate tax rate if needed
  const taxRate = subtotal > 0 ? (tax / subtotal) * 100 : 0;

  // Build items array with calculated totals
  const items = ringUpItems.map((item) => calculateItemTotals(item, taxRate));

  // Build the request object
  const receiptRequest = {
    transaction: {
      timestamp: new Date().toISOString(),
      ...(storeId && { storeId }),
      ...(posTerminalId && { posTerminalId }),
      ...(employeeId && { employeeId }),
      ...(employeeName && { employeeName }),
    },

    customer:
      Object.keys(customerInfo).length > 0
        ? {
            ...(customerInfo.name && { name: customerInfo.name }),
            ...(customerInfo.phone && { phone: customerInfo.phone }),
            ...(customerInfo.email && { email: customerInfo.email }),
            ...(customerInfo.address && { address: customerInfo.address }),
            ...(customerInfo.notes && { notes: customerInfo.notes }),
            ...(customerInfo.customerId && {
              customerId: customerInfo.customerId,
            }),
          }
        : null,

    items,

    payment: {
      method: paymentMethod,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      discount: {
        amount: parseFloat(discount.toFixed(2)),
        isPercentage,
        ...(isPercentage && { percentage: discountPercentage }),
      },
      total: parseFloat(total.toFixed(2)),
      totalItems,
      ...(tendered !== undefined && {
        tendered: parseFloat(tendered.toFixed(2)),
      }),
      ...(change !== undefined && { change: parseFloat(change.toFixed(2)) }),
      ...(cardLast4 && { cardLast4 }),
      ...(cardBrand && { cardBrand }),
      ...(transactionReference && { transactionReference }),
    },

    receipt: {
      emailReceipt,
      printReceipt: false, // Default to false, can be made configurable
      format: "pdf", // Default format, can be made configurable
    },
  };

  return receiptRequest;
};

/**
 * Validate receipt request object
 * @param {Object} request - Receipt request object
 * @returns {Object} Validation result with isValid flag and errors array
 */
export const validateReceiptRequest = (request) => {
  const errors = [];

  // Validate transaction
  if (!request.transaction?.timestamp) {
    errors.push({
      field: "transaction.timestamp",
      message: "Timestamp is required",
    });
  }

  // Validate items
  if (
    !request.items ||
    !Array.isArray(request.items) ||
    request.items.length === 0
  ) {
    errors.push({ field: "items", message: "At least one item is required" });
  } else {
    request.items.forEach((item, index) => {
      if (!item.name) {
        errors.push({
          field: `items[${index}].name`,
          message: "Item name is required",
        });
      }
      if (!item.qty || item.qty <= 0) {
        errors.push({
          field: `items[${index}].qty`,
          message: "Quantity must be greater than 0",
        });
      }
      if (item.product_price === undefined || item.product_price < 0) {
        errors.push({
          field: `items[${index}].product_price`,
          message: "Price must be >= 0",
        });
      }
    });
  }

  // Validate payment
  if (!request.payment?.method) {
    errors.push({
      field: "payment.method",
      message: "Payment method is required",
    });
  } else if (
    !["cash", "card", "online", "qr"].includes(request.payment.method)
  ) {
    errors.push({
      field: "payment.method",
      message: "Payment method must be one of: cash, card, online, qr",
    });
  }

  if (!request.payment?.total || request.payment.total <= 0) {
    errors.push({
      field: "payment.total",
      message: "Total must be greater than 0",
    });
  }

  // Validate cash payment specific fields
  if (
    request.payment?.method === "cash" &&
    request.payment.tendered !== undefined
  ) {
    if (request.payment.tendered < request.payment.total) {
      errors.push({
        field: "payment.tendered",
        message: "Tendered amount must be >= total for cash payments",
      });
    }
  }

  // Validate email if emailReceipt is true
  if (request.receipt?.emailReceipt && request.customer?.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.customer.email)) {
      errors.push({ field: "customer.email", message: "Invalid email format" });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Format receipt request for logging (removes sensitive data)
 * @param {Object} request - Receipt request object
 * @returns {Object} Sanitized request object safe for logging
 */
export const sanitizeReceiptRequestForLogging = (request) => {
  const sanitized = JSON.parse(JSON.stringify(request)); // Deep clone

  // Remove sensitive customer data
  if (sanitized.customer) {
    if (sanitized.customer.phone) {
      sanitized.customer.phone = sanitized.customer.phone.replace(
        /\d(?=\d{4})/g,
        "*"
      );
    }
    if (sanitized.customer.email) {
      const [local, domain] = sanitized.customer.email.split("@");
      sanitized.customer.email = `${local.substring(0, 2)}***@${domain}`;
    }
  }

  // Remove full card numbers if accidentally included
  if (sanitized.payment?.cardLast4) {
    // Keep only last 4 digits
    sanitized.payment.cardLast4 = sanitized.payment.cardLast4.slice(-4);
  }

  return sanitized;
};

/**
 * Example usage documentation
 */
export const USAGE_EXAMPLE = `
// Example usage in SalePoint.jsx onPay handler:

import { buildReceiptRequest, validateReceiptRequest } from '../../utils/receiptHelpers';
import axios from 'axios';

// Inside your component's onPay handler:
onPay={(method, checkoutData) => {
  try {
    // Build the receipt request
    const receiptRequest = buildReceiptRequest({
      ringUpItems: currentRingUpData,
      customerInfo: customerInfo,
      summary: {
        subtotal,
        tax,
        discount: discountAmount,
        total,
        totalItems,
        isPercentage,
        discountPercentage: isPercentage ? discount : 0,
      },
      paymentMethod: method,
      checkoutData: {
        tendered: checkoutData.tendered,
        change: checkoutData.change,
        emailReceipt: checkoutData.emailReceipt,
        // Add card details if method is 'card'
        ...(method === 'card' && {
          cardLast4: '4242',
          cardBrand: 'Visa',
          transactionReference: 'TXN_' + Date.now(),
        }),
      },
      metadata: {
        storeId: 'STORE_001',
        posTerminalId: 'POS_TERMINAL_03',
        employeeId: sessionStorage.getItem('employeeId'),
        employeeName: sessionStorage.getItem('employeeName'),
      },
    });

    // Validate the request
    const validation = validateReceiptRequest(receiptRequest);
    if (!validation.isValid) {
      console.error('Receipt validation failed:', validation.errors);
      // Handle validation errors (show to user)
      return;
    }

    // Send to backend
    const response = await axios.post('/api/receipts/generate', receiptRequest);
    
    if (response.data.success) {
      console.log('Receipt generated:', response.data.data.receiptNumber);
      // Clear cart, show success message, etc.
      dispatch(clearCart());
      setShowCheckoutModal(false);
    }
    
  } catch (error) {
    console.error('Receipt generation failed:', error);
    // Handle error (show to user)
  }
}}
`;

// const billingDetails = {
//   ringUpItems: [{
//     id: "item_001",
//     name: "Product A",
//     qty: 2,
//     product_price: 50,
//     tax_percentage: 8.5,
//     discount: 0,
//     barcode: "123456789012",
//     sku: "PROD_A_001",
//     category: "Electronics",
//     imageUrl: "https://example.com/product_a.jpg",
//     isEBT: false,
//     // if needed, add more item-level details
//   }],
//   customerInfo: {
//     // customer details are not required ....
//     name: "John Doe",
//     phone: "1234567890",
//     email: "example@gmail.com",
//     address: " 123 Main St, City, Country",
//     notes: "Regular customer",
//   },
//   summary: {
//     subtotal: 100,
//     tax: 8.5,
//     discount: 5,
//     total: 103.5,
//     totalItems: 3,
//     isPercentage: false, // indicates fixed amount discount,
//     discountPercentage: 0, // only relevant if isPercentage is true
//   },
//   paymentMethod: "card", // 'cash', 'card', 'online', 'qr'
//   checkoutData: {
//     tendered: 0, // only for cash payments
//     change: 0, // only for cash payments
//     emailReceipt: true, // boolean to indicate if email receipt is requested
//     cardDetails: {
//       // only for card payments
//       cardLast4: "4242",
//       cardBrand: "Visa",
//       transactionReference: "TXN_123456789",
//     },
//   },
//   metadata: {
//     storeId: "STORE_001",
//     posTerminalId: "POS_TERMINAL_03",
//     employeeId: "EMP_1001",
//     employeeName: "Alice Smith",
//   },
//   billingDateTime: "",
//   status:'pending', // 'pending', 'paid', 'failed','refund' pending -> 'onHold', 'paid' -> 'completed', failed -> 'canceled' 'refund' -> 'refunded'
// };

const holdOrderSchema = {
  ringUpItems: [
    {
      id: "item_001",
      name: "Product A",
      qty: 2,
      product_price: 50,
      tax_percentage: 8.5,
      discount: 0,
      barcode: "123456789012",
      sku: "PROD_A_001",
      category: "Electronics",
      imageUrl: "https://example.com/product_a.jpg",
      isEBT: false,
      // if needed, add more item-level details
    },
  ],
  customerInfo: {
    // customer details are not required ....
    name: "John Doe",
    phone: "1234567890",
    email: "example@gmail.com",
    address: " 123 Main St, City, Country",
    notes: "Regular customer",
  },
  summary: {
    subtotal: 100,
    tax: 8.5,
    discount: 5,
    total: 103.5,
    totalItems: 3,
    isPercentage: false, // indicates fixed amount discount,
    discountPercentage: 0, // only relevant if isPercentage is true
  },
  metadata: {
    storeId: "STORE_001",
    posTerminalId: "POS_TERMINAL_03",
    employeeId: "EMP_1001",
    employeeName: "Alice Smith",
  },
  billingDateTime: "",
  status: "pending",
};

// {
//    "billId":'', // bill id generated by backend with this you will get the items details
//   "customerInfo": { // customer details are not required ....
//     "name": "",
//     "phone": "8965412587",
//     "email": "",
//     "address": "",
//     "notes": ""
//   },
//   "metadata": {
//     "business_id": "68593a608f6d5a9964d07927",
//     "storeId": "Store T25",
//     "posTerminalId": "POS Terminal T25",
//     "employeeId": "691f14d061d92131b0ec32af",
//     "employeeName": "Tushankar Saha"
//   },
//   "payment": {
//     "method": "cash", // "card", "cash", "online", "EBT"
//     "subTotal": 628.75,
//     "taxTotal": 2.5,
//     "discount": {
//       "type": "FLAT", // "FLAT", "PERCENT"
//       "value": '', // "2.5" if percentage, "" if flat
//       "amount": 2.5
//     },
//     "grandTotal": 628.75,
//     "tendered": 629,
//     "change": 0.25,
//     "totalItems": 2,
//     "cardBrand": "",
//     "cardLast4": "",
//     "transactionReference": null
//   },
//   "receipt": {
//     "emailReceipt": true, // boolean to indicate if email receipt is requested
//   },
//   "status": "PAID",  // "OPEN", "HOLD", "PAID", "CANCELLED"
//   "timestamp": "2026-01-12T09:51:42.146Z"
// }
