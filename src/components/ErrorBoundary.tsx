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
        <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
          <h2 className="text-red-400 font-bold text-sm mb-2">
            Something went wrong rendering this post
          </h2>
          <pre className="text-red-300/70 text-xs font-mono whitespace-pre-wrap">
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
