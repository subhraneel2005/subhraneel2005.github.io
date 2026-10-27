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
        <div className="p-4 bg-red-100 border border-red-400 rounded-sm">
          <h2 className="text-red-800 font-semibold text-sm mb-1.5">
            something went wrong rendering this post
          </h2>
          <pre className="text-red-900/70 text-xs font-mono whitespace-pre-wrap">
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
