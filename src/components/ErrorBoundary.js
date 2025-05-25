import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log the error to your error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          p={3}
          textAlign="center"
        >
          <Typography variant="h4" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            We apologize for the inconvenience. Please try refreshing the page.
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </Box>
          {process.env.NODE_ENV === 'development' && (
            <Box mt={2} textAlign="left">
              <Typography variant="subtitle2" color="error">
                {this.state.error && this.state.error.toString()}
              </Typography>
              <Typography variant="caption" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </Typography>
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 