
import React, { useState, useEffect } from 'react';
import {
  CardElement as StripeCardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '../../ui/button';
import { toast } from '../../../hooks/use-toast';

interface CardElementProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  buttonText?: string;
  isProcessing?: boolean;
}

const CardElement: React.FC<CardElementProps> = ({
  onSuccess,
  onCancel,
  buttonText = 'Submit Payment',
  isProcessing = false,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement(StripeCardElement)?.focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    // In a real implementation, you would create a payment intent on your server
    // and then use the client_secret to confirm the payment here
    
    // This would be a real payment intent confirmation in a production environment
    // For the demo using the test API keys, we'll simulate a successful payment
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful payment
      setProcessing(false);
      toast({
        title: "Payment successful",
        description: "Your payment has been processed successfully. Use 4242 4242 4242 4242 as a test card number.",
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      setProcessing(false);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      console.error('Payment error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="rounded-md border border-input p-4 focus-within:ring-2 focus-within:ring-ring">
          <StripeCardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            onChange={(e) => {
              setError(e.error ? e.error.message : null);
              setCardComplete(e.complete);
            }}
          />
        </div>
        {error && (
          <div className="text-sm text-red-500">{error}</div>
        )}
      </div>
      
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={processing || isProcessing}
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={!stripe || processing || isProcessing || !cardComplete}
        >
          {processing || isProcessing ? 'Processing...' : buttonText}
        </Button>
      </div>
    </form>
  );
};

export default CardElement;
