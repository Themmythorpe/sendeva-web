const https = require('https');
const http = require('http');

const testSecurityHeaders = (url) => {
  const protocol = url.startsWith('https') ? https : http;
  
  protocol.get(url, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('\nSecurity Headers:');
    console.log('----------------');
    
    const securityHeaders = [
      'content-security-policy',
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'referrer-policy',
      'permissions-policy'
    ];
    
    securityHeaders.forEach(header => {
      console.log(`${header}: ${res.headers[header] || 'Not Set'}`);
    });
    
    console.log('\nAll Headers:');
    console.log('------------');
    console.log(res.headers);
  }).on('error', (err) => {
    console.error('Error:', err.message);
  });
};

// Test local development server
testSecurityHeaders('http://localhost:3000'); 