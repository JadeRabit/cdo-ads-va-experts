'use client';

import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Loader2, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  businessName: z.string().min(2, 'Business name is required'),
  monthlyAdBudget: z.string().min(1, 'Please select a budget range'),
  serviceNeeded: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

const budgetOptions = [
  { value: 'under-10k', label: 'Under ₱10,000/month' },
  { value: '10k-50k', label: '₱10,000 - ₱50,000/month' },
  { value: '50k-100k', label: '₱50,000 - ₱100,000/month' },
  { value: '100k-250k', label: '₱100,000 - ₱250,000/month' },
  { value: '250k-500k', label: '₱250,000 - ₱500,000/month' },
  { value: '500k-plus', label: '₱500,000+/month' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const serviceOptions = [
  { value: 'facebook-ads', label: 'Facebook Ads Management' },
  { value: 'social-media', label: 'Social Media Management' },
  { value: 'virtual-assistant', label: 'Virtual Assistant Services' },
  { value: 'digital-products', label: 'Digital Products/Templates' },
  { value: 'multiple', label: 'Multiple Services' },
  { value: 'not-sure', label: 'Not sure - need guidance' },
];

export function InquiryForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const methods = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      honeypot: '',
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = methods;

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        toast({
          title: 'Message Sent!',
          description: 'We\'ll get back to you within 24 hours.',
          variant: 'success',
        });
        methods.reset({
          honeypot: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Please try again later.');
        toast({
          title: 'Failed to Send',
          description: result.error || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-label="Business inquiry form">
        {/* Live region for form status announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {submitStatus === 'success' && 'Message sent successfully. We will get back to you within 24 hours.'}
          {submitStatus === 'error' && errorMessage}
          {hasErrors && 'Form has validation errors. Please review the fields below.'}
        </div>

        {submitStatus === 'error' && (
          <div
            role="alert"
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start space-x-3"
          >
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium text-red-400">Failed to Send</p>
              <p className="text-body-sm text-red-300">{errorMessage}</p>
            </div>
          </div>
        )}

        {submitStatus === 'success' && (
          <div
            role="status"
            className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start space-x-3"
          >
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium text-green-400">Message Sent!</p>
              <p className="text-body-sm text-green-300">We'll get back to you within 24 hours.</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Juan Dela Cruz"
            error={errors.name?.message}
            {...register('name')}
            required
            autoComplete="name"
            aria-describedby={errors.name ? 'name-error' : undefined}
            id="inquiry-name"
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="juan@example.com"
            error={errors.email?.message}
            {...register('email')}
            required
            autoComplete="email"
            aria-describedby={errors.email ? 'email-error' : undefined}
            id="inquiry-email"
          />

          <Input
            label="Business Name"
            placeholder="GlowSkin PH"
            error={errors.businessName?.message}
            {...register('businessName')}
            required
            autoComplete="organization"
            aria-describedby={errors.businessName ? 'businessName-error' : undefined}
            id="businessName"
          />

          <Select
            value={watch('monthlyAdBudget')}
            onValueChange={(value) => setValue('monthlyAdBudget', value)}
          >
            <SelectTrigger
              aria-label="Select monthly ad budget"
              aria-describedby={errors.monthlyAdBudget ? 'monthlyAdBudget-error' : undefined}
              error={!!errors.monthlyAdBudget?.message}
            >
              <SelectValue placeholder="Monthly ad budget" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={watch('serviceNeeded')}
            onValueChange={(value) => setValue('serviceNeeded', value)}
          >
            <SelectTrigger
              aria-label="Select service needed"
              aria-describedby={errors.serviceNeeded ? 'serviceNeeded-error' : undefined}
              error={!!errors.serviceNeeded?.message}
            >
              <SelectValue placeholder="Service you're interested in" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            label="Message (Optional)"
            placeholder="Tell us about your goals, current challenges, or anything else we should know..."
            rows={4}
            {...register('message')}
            id="inquiry-message"
          />
        </div>

        {/* Honeypot field - hidden from users but visible to bots */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="inquiry-honeypot" className="sr-only">Leave this field empty if you're human</label>
          <input
            type="text"
            id="inquiry-honeypot"
            tabIndex={-1}
            autoComplete="off"
            {...register('honeypot')}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={submitting || isSubmitting}
          disabled={submitting || isSubmitting}
        >
          {submitting || isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              Send Inquiry
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-center text-caption text-foreground-muted">
          By submitting, you agree to our{' '}
          <a href="/privacy" className="text-gold hover:underline">
            Privacy Policy
          </a>.
        </p>
      </form>
    </FormProvider>
  );
}