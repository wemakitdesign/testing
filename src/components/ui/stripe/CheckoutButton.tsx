
import React, { useState } from 'react';
import { Button } from '../button';
import { toast } from '../../../hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../../../lib/stripe';

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface CheckoutButtonProps {
  planId: string;
  planName: string;
  amount: number;
  buttonText?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  disabled?: boolean;
  onSuccess?: () => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  planId,
  planName,
  amount,
  buttonText,
  className,
  variant = 'default',
  disabled = false,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      // In a real app with Supabase integration, you would call your edge function
      // const { data, error } = await supabase.functions.invoke('create-checkout', {
      //   body: { priceId: planId }
      // });
      // 
      // if (error) throw new Error(error.message);
      // window.location.href = data.url;
      
      // For now, we're simulating a successful checkout
      toast({
        title: 'Processing payment...',
        description: 'Please wait while we redirect you to the payment page.'
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success simulation
      toast({
        title: 'Subscription updated',
        description: `You have been successfully subscribed to the ${planName} plan.`
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: 'Checkout failed',
        description: 'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      className={`${className} bg-blue-600 hover:bg-blue-700 h-12 text-white`}
      disabled={disabled || isLoading}
      onClick={handleCheckout}
    >
      {isLoading ? 'Processing...' : buttonText || `Subscribe to ${planName}`}
    </Button>
  );
};

export default CheckoutButton;
