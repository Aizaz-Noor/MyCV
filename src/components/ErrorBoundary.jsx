import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if ('fallback' in this.props) return this.props.fallback;
      // You can render any custom fallback UI
      return (
        <div style={{
          height: '100vh', width: '100vw', display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#020205', color: 'white', padding: '2rem', textAlign: 'center'
        }}>
          <h1 style={{ color: '#ec4899', marginBottom: '1rem' }}>Something went wrong.</h1>
          <p style={{ color: '#a8a8b3', marginBottom: '2rem', maxWidth: '600px' }}>
            This section could not load. Please try reloading the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px', backgroundColor: '#00f0ff', color: 'black',
              border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}
