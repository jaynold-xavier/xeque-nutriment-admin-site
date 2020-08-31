import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ textAlign: 'center' }}>
        <h1 className="page-error-heading" style={{
          fontFamily: "sans-serif",
          color: 'rgb(231, 141, 141)',
          margin: '0 auto',
          marginTop: '6rem'
        }}>404 - Page Error</h1>
        <span>This page either doesn't exist or is a priveleged page</span>
      </div>;
    }

    return this.props.children;
  }
}

export default React.memo(ErrorBoundary)