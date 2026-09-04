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
import { Calendar, Clock, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  serviceType: z.enum(['ad-audit', 'discovery-call', 'strategy-session']),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  timezone: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const serviceOptions = [
  { value: 'ad-audit', label: 'Free Ad Account Audit (30 min)' },
  { value: 'discovery-call', label: 'Discovery Call (30 min)' },
  { value: 'strategy-session', label: 'Strategy Session (45 min)' },
];

const timeOptions = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
];

export function BookingForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      timezone: 'PHT',
      honeypot: '',
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = methods;

  const onSubmit = async (data: BookingFormData) => {
    setSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        toast({
          title: 'Booking Confirmed!',
          description: 'Check your email for confirmation details.',
          variant: 'success',
        });
        methods.reset({
          timezone: 'PHT',
          honeypot: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Please try again later.');
        toast({
          title: 'Booking Failed',
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-label="Booking consultation form">
        {/* Live region for form status announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {submitStatus === 'success' && 'Booking confirmed successfully. Check your email for details.'}
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
              <p className="font-medium text-red-400">Submission Failed</p>
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
              <p className="font-medium text-green-400">Booking Confirmed!</p>
              <p className="text-body-sm text-green-300">Check your email for confirmation details.</p>
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
            id="name"
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
            id="email"
          />

          <Select
            value={watch('serviceType')}
            onValueChange={(value) => setValue('serviceType', value as any)}
          >
            <SelectTrigger
              aria-label="Select consultation type"
              aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}
              error={!!errors.serviceType?.message}
            >
              <SelectValue placeholder="Select consultation type" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="preferredDate" className="mb-1.5 block text-body-sm font-medium text-foreground">
                Preferred Date
              </label>
              <Input
                id="preferredDate"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                error={errors.preferredDate?.message}
                {...register('preferredDate')}
                required
                aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                className="pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted pointer-events-none" aria-hidden="true" />
            </div>

            <div>
              <label htmlFor="preferredTime" className="mb-1.5 block text-body-sm font-medium text-foreground">
                Preferred Time (PHT)
              </label>
              <Select
                value={watch('preferredTime')}
                onValueChange={(value) => setValue('preferredTime', value)}
              >
                <SelectTrigger
                  aria-label="Select preferred time"
                  aria-describedby={errors.preferredTime ? 'preferredTime-error' : undefined}
                  error={!!errors.preferredTime?.message}
                >
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Input
            label="Timezone"
            placeholder="PHT (Philippines)"
            {...register('timezone')}
            defaultValue="PHT"
            className="opacity-50 pointer-events-none"
            aria-hidden="true"
            tabIndex={-1}
            readOnly
          />

          <Textarea
            label="Additional Notes (Optional)"
            placeholder="Tell us about your current ad spend, biggest challenges, or specific goals..."
            rows={3}
            {...register('message')}
            id="message"
          />
        </div>

        {/* Honeypot field - hidden from users but visible to bots */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="honeypot" className="sr-only">Leave this field empty if you're human</label>
          <input
            type="text"
            id="honeypot"
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
              Submitting...
            </>
          ) : (
            <>
              Book My Free Consultation
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-center text-caption text-foreground-muted">
          By submitting, you agree to our{' '}
          <a href="/privacy" className="text-gold hover:underline">
            Privacy Policy
          </a>{' '}
          and consent to being contacted.
        </p>
      </form>
    </FormProvider>
  );
}