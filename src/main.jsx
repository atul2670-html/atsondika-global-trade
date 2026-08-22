import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import './styles/style.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical React Error Caught:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('site_current_merchant_v1');
      localStorage.removeItem('site_active_logged_customer_v1');
      sessionStorage.clear();
    } catch(e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#090d16', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#f59e0b', marginBottom: '12px' }}>⚠️ React Diagnostic Error Screen</h2>
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', padding: '16px', borderRadius: '12px', color: '#fca5a5', maxWidth: '750px', width: '90%', textAlign: 'left', margin: '15px 0', fontSize: '0.85rem', wordBreak: 'break-word' }}>
            <strong>Error Message:</strong> {this.state.error ? this.state.error.toString() : 'Unknown Error'}<br/><br/>
            <strong>Stack Trace:</strong>
            <pre style={{ fontSize: '0.75rem', overflowX: 'auto', background: 'black', padding: '10px', borderRadius: '6px', marginTop: '6px', whiteSpace: 'pre-wrap' }}>
              {this.state.error ? this.state.error.stack : ''}
            </pre>
          </div>
          <button
            onClick={() => {
              try {
                localStorage.clear();
                sessionStorage.clear();
              } catch(e) {}
              window.location.href = window.location.origin + window.location.pathname + '?v=' + Date.now();
            }}
            style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem' }}
          >
            🔄 Reset All Local Storage & Load Fresh Website
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
