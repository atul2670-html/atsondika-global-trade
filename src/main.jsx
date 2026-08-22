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
      try {
        localStorage.removeItem('site_current_merchant_v1');
        localStorage.removeItem('site_active_logged_customer_v1');
      } catch(e) {}
      return this.props.children;
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
