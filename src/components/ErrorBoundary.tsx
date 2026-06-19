import { Component } from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-4 bg-red-100 border border-red-400 rounded-sm dark:bg-red-1000/10 dark:border-red-800/30">
          <h2 className="text-red-800 font-semibold text-sm mb-1.5 dark:text-red-600">
            Something went wrong rendering this post
          </h2>
          <pre className="text-red-900/70 text-xs font-mono whitespace-pre-wrap dark:text-red-400/70">
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
