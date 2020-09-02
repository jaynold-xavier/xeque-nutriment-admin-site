import React from 'react'
import ComponentMotionTag from './ComponentMotionTag';

const ErrorBoundary = () => {
  return <ComponentMotionTag style={{ textAlign: 'center' }}>
          <h1 className="page-error-heading" style={{
            fontFamily: "sans-serif",
            color: 'rgb(231, 141, 141)',
            margin: '0 auto',
            marginTop: '6rem'
          }}>404 - Page Error</h1>
          <span>This page either doesn't exist or is a priveleged page</span>
      </ComponentMotionTag>;
}

export default React.memo(ErrorBoundary)