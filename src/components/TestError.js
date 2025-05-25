import React from 'react';
import { Button } from '@mui/material';

const TestError = () => {
  const triggerError = () => {
    throw new Error('This is a test error');
  };

  return (
    <Button 
      variant="contained" 
      color="error" 
      onClick={triggerError}
      sx={{ margin: 2 }}
    >
      Trigger Test Error
    </Button>
  );
};

export default TestError; 