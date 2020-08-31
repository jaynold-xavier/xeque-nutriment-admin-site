import React from 'react'
const ErrorPage = () => {
        return (
                <div style={{ textAlign: 'center' }}>
                        <h1 className="page-error-heading" style={{
                                fontFamily: "sans-serif",
                                color: 'rgb(231, 141, 141)',
                                margin: '0 auto',
                                marginTop: '6rem'
                        }}>404 - Page Error</h1>
                        <span>This page either doesn't exist or is a priveleged page</span>
                </div>
        )
}

export default ErrorPage;
