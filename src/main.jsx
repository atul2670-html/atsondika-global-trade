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
          <h2 style={{ fontSize: '1.6rem', color: '#2dd4bf', marginBottom: '12px' }}>Atsondika Global Trade</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '480px', marginBottom: '20px' }}>
            Updating live website assets. Click below to load fresh data.
          </p>
          <button
            onClick={() => {
              try {
                localStorage.removeItem('site_current_merchant_v1');
                localStorage.removeItem('site_active_logged_customer_v1');
              } catch(e) {}
              window.location.reload();
            }}
            style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem' }}
          >
            🚀 Load Live Website
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
