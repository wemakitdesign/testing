
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/button';

const Help = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or contact our support team
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-wemakit-purple" />
              FAQ
            </CardTitle>
            <CardDescription>Common questions and answers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse through our frequently asked questions to find quick answers.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="#faq">View FAQs</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-wemakit-purple" />
              Live Chat
            </CardTitle>
            <CardDescription>Chat with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get real-time assistance for urgent issues during business hours.
            </p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-wemakit-purple" />
              Email Support
            </CardTitle>
            <CardDescription>Send us a detailed message</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              For complex issues, send us an email and we'll respond within 24 hours.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="mailto:support@wemakit.com">Contact Support</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card id="faq" className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find answers to the most commonly asked questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a new design request?</AccordionTrigger>
              <AccordionContent>
                To create a new design request, navigate to the "New Request" section from your dashboard. 
                Fill out the request form with your project details, design preferences, and any additional 
                requirements. You can also attach reference files or images to help our designers understand 
                your vision better.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What file formats do you support for uploads?</AccordionTrigger>
              <AccordionContent>
                We support a wide range of file formats including PNG, JPG, PDF, AI, PSD, and SVG. 
                For best results, we recommend using high-resolution images and vector files wherever possible.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How long does it take to complete a design request?</AccordionTrigger>
              <AccordionContent>
                The timeline for completing a design request depends on its complexity and our current workload. 
                Simple requests are typically completed within 1-2 business days, while more complex projects 
                may take 3-5 business days or longer. You'll receive an estimated completion date when your 
                request is accepted.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I provide feedback on designs?</AccordionTrigger>
              <AccordionContent>
                When a design is ready for review, you'll receive a notification. Navigate to the request 
                details page where you can view the design and provide feedback using our commenting system. 
                You can highlight specific areas and leave detailed notes for the designer to address in the 
                revision.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>What's included in my subscription plan?</AccordionTrigger>
              <AccordionContent>
                Your subscription plan includes a set number of design requests per month, unlimited revisions, 
                and prioritized support. You also get access to our design templates and resource library. 
                For detailed information about what's included in your specific plan, please visit the Billing 
                section in your dashboard.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
