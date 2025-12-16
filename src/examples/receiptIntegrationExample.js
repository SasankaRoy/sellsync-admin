/**
 * Receipt Generation Integration Example
 * 
 * This file demonstrates how to integrate the receipt generation API
 * into the existing SalePoint.jsx component without affecting the current code flow.
 * 
 * Copy the relevant parts into your SalePoint.jsx component.
 */

// ============================================================================
// Step 1: Add imports at the top of SalePoint.jsx
// ============================================================================

import { buildReceiptRequest, validateReceiptRequest } from "../../utils/receiptHelpers";
import axios from "../../utils/axios-interceptor"; // Use your configured axios instance

// ============================================================================
// Step 2: Add state for receipt generation status (optional)
// ============================================================================

// Add these state variables inside the SalePoint component
const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false);
const [receiptError, setReceiptError] = useState(null);
const [lastReceiptNumber, setLastReceiptNumber] = useState(null);

// ============================================================================
// Step 3: Create the receipt generation handler function
// ============================================================================

/**
 * Generate receipt for the completed transaction
 * This function can be called from the onPay handler
 */
const generateReceipt = async (paymentMethod, checkoutData) => {
  setIsGeneratingReceipt(true);
  setReceiptError(null);

  try {
    // Build the receipt request using the helper function
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
      paymentMethod: paymentMethod,
      checkoutData: {
        tendered: checkoutData?.tendered,
        change: checkoutData?.change,
        emailReceipt: checkoutData?.emailReceipt || false,
        // Add card details if method is 'card'
        ...(paymentMethod === 'card' && {
          cardLast4: checkoutData?.cardLast4,
          cardBrand: checkoutData?.cardBrand,
          transactionReference: checkoutData?.transactionReference || `TXN_${Date.now()}`,
        }),
      },
      metadata: {
        // Get these from your app's state/session/context
        storeId: sessionStorage.getItem('storeId') || 'STORE_001',
        posTerminalId: sessionStorage.getItem('posTerminalId') || 'POS_TERMINAL_01',
        employeeId: sessionStorage.getItem('employeeId'),
        employeeName: sessionStorage.getItem('employeeName'),
      },
    });

    // Validate the request before sending
    const validation = validateReceiptRequest(receiptRequest);
    if (!validation.isValid) {
      console.error('Receipt validation failed:', validation.errors);
      setReceiptError('Invalid receipt data. Please check all fields.');
      
      // Optionally show validation errors to user
      alert(`Receipt validation failed:\n${validation.errors.map(e => `- ${e.message}`).join('\n')}`);
      
      setIsGeneratingReceipt(false);
      return null;
    }

    // Send request to backend
    const response = await axios.post('/api/receipts/generate', receiptRequest);

    if (response.data.success) {
      console.log('Receipt generated successfully:', response.data.data.receiptNumber);
      
      // Store the receipt number for reference
      setLastReceiptNumber(response.data.data.receiptNumber);
      
      // Optionally show success message
      // toast.success(`Receipt ${response.data.data.receiptNumber} generated successfully`);
      
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Receipt generation failed');
    }

  } catch (error) {
    console.error('Receipt generation error:', error);
    
    // Set error state
    const errorMessage = error.response?.data?.message || error.message || 'Failed to generate receipt';
    setReceiptError(errorMessage);
    
    // Optionally show error to user
    // toast.error(`Receipt generation failed: ${errorMessage}`);
    
    return null;
  } finally {
    setIsGeneratingReceipt(false);
  }
};

// ============================================================================
// Step 4: Update the onPay handler in CheckoutModal
// ============================================================================

// Replace the existing onPay handler with this enhanced version:

<CheckoutModal
  open={showCheckoutModal}
  onClose={() => setShowCheckoutModal(false)}
  customerInfo={customerInfo}
  summary={{
    subtotal,
    tax,
    discount: discountAmount,
    total,
    totalItems,
  }}
  onPay={async (method, checkoutData) => {
    console.log("Payment method:", method);
    console.log("Checkout data:", checkoutData);
    
    // Generate receipt
    const receiptData = await generateReceipt(method, checkoutData);
    
    if (receiptData) {
      // Receipt generated successfully
      console.log('Receipt ID:', receiptData.receiptId);
      console.log('Receipt Number:', receiptData.receiptNumber);
      
      // If email was requested and sent
      if (receiptData.emailSent) {
        console.log('Receipt emailed to customer');
        // Optionally show success message
        // toast.success('Receipt sent to customer email');
      }
      
      // Clear the cart after successful receipt generation
      dispatch(clearCart());
      
      // Reset customer info if needed
      setCustomerInfo({});
      
      // Close the checkout modal
      setShowCheckoutModal(false);
      
      // Optionally redirect or show success screen
      // navigate('/success');
      
    } else {
      // Receipt generation failed - keep modal open
      console.error('Failed to generate receipt');
      // The error state is already set in generateReceipt function
      // User can retry or cancel
    }
  }}
/>

// ============================================================================
// Step 5: Add error display (optional)
// ============================================================================

// Add this anywhere in your JSX to show receipt generation errors:

{receiptError && (
  <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
    <span>{receiptError}</span>
    <button 
      onClick={() => setReceiptError(null)}
      className="ml-2 text-white hover:text-gray-200"
    >
      ✕
    </button>
  </div>
)}

// ============================================================================
// Step 6: Add loading indicator (optional)
// ============================================================================

// Modify the CheckoutModal to show loading state:

<CheckoutModal
  open={showCheckoutModal}
  onClose={() => !isGeneratingReceipt && setShowCheckoutModal(false)} // Prevent close during loading
  customerInfo={customerInfo}
  summary={{
    subtotal,
    tax,
    discount: discountAmount,
    total,
    totalItems,
  }}
  isLoading={isGeneratingReceipt} // Pass loading state to modal
  onPay={async (method, checkoutData) => {
    // ... (same as Step 4)
  }}
/>

// ============================================================================
// Step 7: Add receipt preview/download functionality (optional)
// ============================================================================

// Add a function to download or preview the last receipt:

const downloadLastReceipt = async () => {
  if (!lastReceiptNumber) {
    alert('No receipt available');
    return;
  }

  try {
    const response = await axios.get(`/api/receipts/${lastReceiptNumber}`, {
      responseType: 'blob', // For PDF download
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `receipt-${lastReceiptNumber}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Failed to download receipt:', error);
    alert('Failed to download receipt');
  }
};

// Add button to UI:
// <button onClick={downloadLastReceipt}>Download Last Receipt</button>

// ============================================================================
// Complete Integration Summary
// ============================================================================

/**
 * INTEGRATION CHECKLIST:
 * 
 * ✓ 1. Import helper functions from utils/receiptHelpers.js
 * ✓ 2. Add state variables for receipt generation status
 * ✓ 3. Create generateReceipt function
 * ✓ 4. Update onPay handler in CheckoutModal to call generateReceipt
 * ✓ 5. Add error display UI (optional)
 * ✓ 6. Add loading indicator (optional)
 * ✓ 7. Add receipt preview/download (optional)
 * 
 * TESTING CHECKLIST:
 * 
 * □ Test receipt generation with all payment methods (cash, card, online, qr)
 * □ Test with customer info present and absent
 * □ Test email receipt functionality
 * □ Test with various discount types (percentage and fixed)
 * □ Test validation errors (empty cart, invalid data, etc.)
 * □ Test network errors (backend down, timeout, etc.)
 * □ Test cart clearing after successful receipt
 * □ Test receipt download/preview functionality
 * 
 * BACKEND REQUIREMENTS:
 * 
 * □ Implement POST /api/receipts/generate endpoint
 * □ Implement receipt validation
 * □ Implement receipt storage (database)
 * □ Implement email sending functionality
 * □ Implement receipt PDF generation
 * □ Implement GET /api/receipts/:receiptId endpoint
 * □ Add proper error handling and logging
 * □ Add authentication/authorization
 * 
 */

// ============================================================================
// Example: Minimal Integration (Just the essentials)
// ============================================================================

/**
 * If you want the absolute minimal integration without extra features,
 * just add this to your existing onPay handler:
 */

const minimalOnPayHandler = async (method, checkoutData) => {
  try {
    const receiptRequest = buildReceiptRequest({
      ringUpItems: currentRingUpData,
      customerInfo: customerInfo,
      summary: { subtotal, tax, discount: discountAmount, total, totalItems, isPercentage },
      paymentMethod: method,
      checkoutData,
      metadata: {}, // Empty metadata if not needed
    });

    const response = await axios.post('/api/receipts/generate', receiptRequest);
    
    if (response.data.success) {
      dispatch(clearCart());
      setShowCheckoutModal(false);
      console.log('Receipt:', response.data.data.receiptNumber);
    }
  } catch (error) {
    console.error('Receipt generation failed:', error);
    alert('Failed to generate receipt. Please try again.');
  }
};

// ============================================================================
// Export for reference
// ============================================================================

export {
  generateReceipt,
  downloadLastReceipt,
  minimalOnPayHandler,
};
