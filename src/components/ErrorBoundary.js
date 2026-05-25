import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Что-то пошло не так</h1>
          <p>Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.</p>
          <button type="button" className="login-nav-btn" onClick={this.handleReload}>
            На главную
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
