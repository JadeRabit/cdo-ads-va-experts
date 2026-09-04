'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  sectionName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`ErrorBoundary caught an error in ${this.props.sectionName || 'component'}:`, error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-8 text-center" role="alert">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" aria-hidden="true" />
          </div>
          <h2 className="text-display-sm font-display font-semibold text-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-body text-foreground-muted mb-6">
            {this.props.sectionName ? `The ${this.props.sectionName} section couldn't load.` : 'This component couldn\'t load.'}
          </p>
          <Button variant="outline" onClick={this.reset} className="gap-2">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  sectionName: string
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary sectionName={sectionName}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}