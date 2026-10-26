import { Component, ErrorInfo, ReactNode } from 'react'
import * as Sentry from '@sentry/react'

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
    const dsn = import.meta.env.VITE_SENTRY_DSN
    if (dsn) {
      Sentry.init({ dsn, integrations: [], tracesSampleRate: 0 })
    }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const dsn = import.meta.env.VITE_SENTRY_DSN
    if (dsn) {
      Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } })
    }
  }
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="rounded border border-red-300 bg-red-50 dark:bg-red-950 p-3">
          <h2 className="font-semibold">Something went wrong.</h2>
          <p className="text-sm">Please reload the page or clear the shared URL hash.</p>
        </div>
      )
    }
    return this.props.children
  }
}
