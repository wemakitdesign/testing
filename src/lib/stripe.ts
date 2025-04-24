
// Stripe configuration and utility functions

// Publishable key for the client-side Stripe instance
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RDeDIF3zJbdQWdBgvwpDjjAna8Pyf55sfWBDeqKgBkHKnJpC6GSe1ftZ3mIpchjepOOkZ6S7kddHilp864W7Uui008viFILPi';

// This is just a reference. The secret key should NEVER be used in the client-side code.
// It should only be used in a secure server-side environment
// export const STRIPE_SECRET_KEY = 'sk_test_51RDeDIF3zJbdQWdBKnzYlKD5GG8MHlbz3o1Rl2GRBMTHm0sYgrRFO6qMEifqWhmM1RRIlA24YOtGDiFGJxqS6Hhw00eN4gEhwH';

// Format amount for display (e.g., 1999 -> $19.99)
export const formatAmount = (amount: number): string => {
  return `$${(amount / 100).toFixed(2)}`;
};

// Format card number for display (e.g., 4242424242424242 -> **** **** **** 4242)
export const formatCardNumber = (cardNumber: string): string => {
  const last4 = cardNumber.slice(-4);
  return `•••• •••• •••• ${last4}`;
};

// Get Stripe test card numbers for testing
export const TEST_CARDS = {
  visa: '4242424242424242',
  visaDebit: '4000056655665556',
  mastercard: '5555555555554444',
  amex: '378282246310005',
  discover: '6011111111111117',
  diners: '3056930009020004',
  jcb: '3566002020360505',
  unionPay: '6200000000000005',
};
