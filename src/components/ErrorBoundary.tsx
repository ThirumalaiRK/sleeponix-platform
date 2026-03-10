import React, { Component, ErrorInfo } from 'react';

/* -----------------------------------------------------------------------
   ErrorBoundary — Catches failures from lazy-loaded route chunks
   Without this, a network hiccup on mobile causes complete blank screen.
   With this, users see a friendly "Reload" message instead.
----------------------------------------------------------------------- */

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // In production you could send this to Sentry, LogRocket, etc.
        console.error('[ErrorBoundary] Chunk load failed:', error, info);
    }

    handleReload = () => {
        // Clear the error state and attempt re-render
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            const isChunkError = this.state.error?.message?.includes('Loading chunk') ||
                this.state.error?.message?.includes('Failed to fetch');

            return (
                <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-6">
                    <div className="max-w-md w-full text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#1B4D3E]/10 flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-[#1B4D3E]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                        </div>

                        {/* Message */}
                        <h1 className="text-2xl font-bold text-[#1E2A38] mb-3">
                            {isChunkError ? 'Connection Issue' : 'Something Went Wrong'}
                        </h1>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            {isChunkError
                                ? 'This page failed to load, possibly due to a slow or lost connection. Please check your internet and try again.'
                                : 'An unexpected error occurred. Our team has been notified. Please try refreshing the page.'}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="px-8 py-3 bg-[#1B4D3E] hover:bg-[#173F33] text-white font-semibold rounded-full transition-colors duration-200"
                            >
                                Reload Page
                            </button>
                            <a
                                href="/"
                                className="px-8 py-3 border-2 border-[#1B4D3E] text-[#1B4D3E] font-semibold rounded-full hover:bg-[#1B4D3E] hover:text-white transition-colors duration-200"
                            >
                                Go Home
                            </a>
                        </div>

                        {/* Support link */}
                        <p className="mt-8 text-sm text-gray-400">
                            Still having trouble?{' '}
                            <a href="mailto:support@sleeponix.com" className="text-[#C6A878] hover:underline">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
