import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error Boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-medical-primary">Something went wrong</h1>
            <Link
              to="/"
              className="inline-block px-6 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-secondary"
            >
              Return to Home
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}