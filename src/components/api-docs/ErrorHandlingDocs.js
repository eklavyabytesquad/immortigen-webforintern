'use client';

import React from 'react';

const ErrorHandlingDocs = () => {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Error Handling</h1>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
                <h2 className="text-xl font-semibold text-red-900 mb-2">⚠️ Comprehensive Error Management</h2>
                <p className="text-red-800">
                    The Immortigen API provides detailed error information to help you handle failures gracefully 
                    and implement robust error recovery mechanisms in your applications.
                </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Response Format</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-4">All API errors follow a consistent JSON structure:</p>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                    <pre>{`{
  "status": "error",
  "message": "Human-readable error description",
  "error_code": "SPECIFIC_ERROR_CODE",
  "details": "Additional technical details (optional)",
  "timestamp": "2024-01-15T10:30:00Z",
  "request_id": "req_1234567890abcdef" // For support tracking
}`}</pre>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">HTTP Status Codes</h2>
            <div className="space-y-4 mb-6">
                
                {/* 400 Errors */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">400 Bad Request</h3>
                    <p className="text-red-700 mb-4">The request was malformed, missing required parameters, or contains invalid data.</p>
                    
                    <div className="space-y-4">
                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Missing Required Parameters</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "Missing required parameter: pdf",
  "error_code": "MISSING_PARAMETER",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Invalid File Format</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "File must be a PDF",
  "error_code": "INVALID_FILE_FORMAT",
  "details": "Received file type: image/jpeg",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Invalid JSON Structure</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "Invalid JSON format in request body",
  "error_code": "INVALID_JSON",
  "details": "Expecting property name enclosed in double quotes",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 401 Errors */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">401 Unauthorized</h3>
                    <p className="text-red-700 mb-4">Authentication failed or API key is missing.</p>
                    
                    <div className="space-y-4">
                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Missing API Key</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "API key is required",
  "error_code": "MISSING_API_KEY",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Invalid API Key</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "Invalid API key",
  "error_code": "INVALID_API_KEY",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 403 Errors */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">403 Forbidden</h3>
                    <p className="text-red-700 mb-4">Valid API key but insufficient permissions or rate limit exceeded.</p>
                    
                    <div className="space-y-4">
                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Rate Limit Exceeded</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "Rate limit exceeded",
  "error_code": "RATE_LIMIT_EXCEEDED",
  "details": "Try again in 60 seconds",
  "retry_after": 60,
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Insufficient Permissions</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "API key does not have permission for this endpoint",
  "error_code": "INSUFFICIENT_PERMISSIONS",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 413 Errors */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">413 Payload Too Large</h3>
                    <p className="text-red-700 mb-4">Request exceeds size limits.</p>
                    
                    <div className="bg-white border border-red-100 rounded p-4">
                        <h4 className="font-semibold text-red-800 mb-2">File Size Limit</h4>
                        <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                            <pre>{`{
  "status": "error",
  "message": "File size exceeds maximum limit of 10MB",
  "error_code": "FILE_TOO_LARGE",
  "details": "Received file size: 15.2MB",
  "max_size": "10MB",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                        </div>
                    </div>
                </div>

                {/* 422 Errors */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">422 Unprocessable Entity</h3>
                    <p className="text-red-700 mb-4">Request is syntactically correct but semantically invalid or cannot be processed.</p>
                    
                    <div className="space-y-4">
                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">PDF Processing Failed</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "Unable to extract biomarker data from PDF",
  "error_code": "PDF_PROCESSING_FAILED",
  "details": "PDF appears to be corrupted or password-protected",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Invalid Biomarker Data</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "Invalid biomarker data format",
  "error_code": "INVALID_BIOMARKER_DATA",
  "details": "Missing required field 'value' in biomarker: Glucose",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Unsupported Biomarker</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "Unsupported biomarker type",
  "error_code": "UNSUPPORTED_BIOMARKER",
  "details": "Biomarker 'CustomMarker123' is not in our database",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 500 Errors */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">500 Internal Server Error</h3>
                    <p className="text-red-700 mb-4">An unexpected error occurred on the server.</p>
                    
                    <div className="bg-white border border-red-100 rounded p-4">
                        <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                            <pre>{`{
  "status": "error",
  "message": "Internal server error occurred",
  "error_code": "INTERNAL_SERVER_ERROR",
  "request_id": "req_1234567890abcdef",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                        </div>
                    </div>
                </div>

                {/* 503 Errors */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">503 Service Unavailable</h3>
                    <p className="text-red-700 mb-4">Service is temporarily unavailable or under maintenance.</p>
                    
                    <div className="space-y-4">
                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Service Maintenance</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "Service temporarily unavailable for maintenance",
  "error_code": "SERVICE_MAINTENANCE",
  "retry_after": "2024-01-15T12:00:00Z",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>

                        <div className="bg-white border border-red-100 rounded p-4">
                            <h4 className="font-semibold text-red-800 mb-2">Dependency Failure (Service 3)</h4>
                            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                                <pre>{`{
  "status": "error",
  "message": "Dependent service unavailable",
  "error_code": "DEPENDENCY_UNAVAILABLE",
  "failed_service": "service1",
  "retry_after": "30 seconds",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 504 Errors */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">504 Gateway Timeout</h3>
                    <p className="text-red-700 mb-4">Processing took longer than the maximum allowed time.</p>
                    
                    <div className="bg-white border border-red-100 rounded p-4">
                        <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                            <pre>{`{
  "status": "error",
  "message": "Request timeout - processing took too long",
  "error_code": "PROCESSING_TIMEOUT",
  "details": "Consider reducing file size or complexity",
  "timeout_duration": "30 seconds",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Handling Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">🔄 Retry Strategies</h3>
                    <ul className="text-blue-800 space-y-2 text-sm">
                        <li>• <strong>5xx errors:</strong> Implement exponential backoff</li>
                        <li>• <strong>429/503:</strong> Use retry_after value</li>
                        <li>• <strong>4xx errors:</strong> Do not retry without fixing request</li>
                        <li>• <strong>Max retries:</strong> Limit to 3 attempts</li>
                        <li>• <strong>Timeout:</strong> Use progressive timeouts</li>
                    </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">📝 Logging & Monitoring</h3>
                    <ul className="text-green-800 space-y-2 text-sm">
                        <li>• Log all error responses with request_id</li>
                        <li>• Monitor error rates and patterns</li>
                        <li>• Set up alerts for critical errors</li>
                        <li>• Track processing times and timeouts</li>
                        <li>• Implement health check monitoring</li>
                    </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">🛡️ Error Recovery</h3>
                    <ul className="text-purple-800 space-y-2 text-sm">
                        <li>• Implement graceful degradation</li>
                        <li>• Use fallback mechanisms</li>
                        <li>• Cache successful responses</li>
                        <li>• Provide meaningful user feedback</li>
                        <li>• Maintain request correlation IDs</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-3">⚡ Performance Tips</h3>
                    <ul className="text-yellow-800 space-y-2 text-sm">
                        <li>• Validate data before API calls</li>
                        <li>• Use appropriate timeout values</li>
                        <li>• Implement circuit breaker patterns</li>
                        <li>• Monitor response times</li>
                        <li>• Use async processing for large files</li>
                    </ul>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">JavaScript Error Handling Example</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                    <pre>{`class APIClient {
  constructor(apiKey, baseURL = 'http://localhost:8000') {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.maxRetries = 3;
  }

  async makeRequest(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      ...options,
      headers: {
        'X-API-Key': this.apiKey,
        ...options.headers
      }
    };

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new APIError(response.status, errorData);
        }
        
        return await response.json();
        
      } catch (error) {
        if (error instanceof APIError) {
          // Handle specific API errors
          if (this.shouldRetry(error, attempt)) {
            const delay = this.getRetryDelay(attempt, error);
            console.log(\`Retrying in \${delay}ms (attempt \${attempt}/\${this.maxRetries})\`);
            await this.sleep(delay);
            continue;
          } else {
            throw error;
          }
        } else {
          // Handle network errors
          console.error('Network error:', error);
          if (attempt === this.maxRetries) throw error;
          await this.sleep(this.getRetryDelay(attempt));
        }
      }
    }
  }

  shouldRetry(error, attempt) {
    if (attempt >= this.maxRetries) return false;
    
    // Retry on server errors (5xx) and rate limits (429)
    if (error.status >= 500 || error.status === 429) return true;
    
    // Don't retry on client errors (4xx)
    if (error.status >= 400 && error.status < 500) return false;
    
    return true;
  }

  getRetryDelay(attempt, error = null) {
    // Use retry_after if provided
    if (error?.data?.retry_after) {
      return error.data.retry_after * 1000;
    }
    
    // Exponential backoff: 1s, 2s, 4s, 8s...
    return Math.min(1000 * Math.pow(2, attempt - 1), 10000);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

class APIError extends Error {
  constructor(status, data) {
    super(data.message || 'API Error');
    this.status = status;
    this.data = data;
    this.errorCode = data.error_code;
    this.requestId = data.request_id;
  }
}

// Usage example
async function processPDFWithErrorHandling(file) {
  const client = new APIClient('your_api_key_here');
  
  try {
    const formData = new FormData();
    formData.append('pdf', file);
    
    const result = await client.makeRequest('/service1/convert-pdf', {
      method: 'POST',
      body: formData
    });
    
    console.log('Success:', result);
    return result;
    
  } catch (error) {
    if (error instanceof APIError) {
      console.error(\`API Error (\${error.status}): \${error.message}\`);
      console.error('Error Code:', error.errorCode);
      console.error('Request ID:', error.requestId);
      
      // Handle specific error types
      switch (error.errorCode) {
        case 'INVALID_FILE_FORMAT':
          showUserError('Please upload a valid PDF file');
          break;
        case 'FILE_TOO_LARGE':
          showUserError('File is too large. Maximum size is 10MB');
          break;
        case 'RATE_LIMIT_EXCEEDED':
          showUserError('Too many requests. Please try again later');
          break;
        default:
          showUserError('An error occurred while processing your file');
      }
    } else {
      console.error('Network error:', error);
      showUserError('Network error. Please check your connection');
    }
    
    throw error;
  }
}`}</pre>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Code Reference</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HTTP Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retry?</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">MISSING_PARAMETER</td>
                                <td className="px-6 py-4 whitespace-nowrap">400</td>
                                <td className="px-6 py-4">Required parameter missing</td>
                                <td className="px-6 py-4 text-red-600">No</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">INVALID_FILE_FORMAT</td>
                                <td className="px-6 py-4 whitespace-nowrap">400</td>
                                <td className="px-6 py-4">File is not a valid PDF</td>
                                <td className="px-6 py-4 text-red-600">No</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">MISSING_API_KEY</td>
                                <td className="px-6 py-4 whitespace-nowrap">401</td>
                                <td className="px-6 py-4">API key not provided</td>
                                <td className="px-6 py-4 text-red-600">No</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">INVALID_API_KEY</td>
                                <td className="px-6 py-4 whitespace-nowrap">401</td>
                                <td className="px-6 py-4">API key is invalid</td>
                                <td className="px-6 py-4 text-red-600">No</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">RATE_LIMIT_EXCEEDED</td>
                                <td className="px-6 py-4 whitespace-nowrap">429</td>
                                <td className="px-6 py-4">Too many requests</td>
                                <td className="px-6 py-4 text-green-600">Yes</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">FILE_TOO_LARGE</td>
                                <td className="px-6 py-4 whitespace-nowrap">413</td>
                                <td className="px-6 py-4">File exceeds size limit</td>
                                <td className="px-6 py-4 text-red-600">No</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">PDF_PROCESSING_FAILED</td>
                                <td className="px-6 py-4 whitespace-nowrap">422</td>
                                <td className="px-6 py-4">Cannot extract data from PDF</td>
                                <td className="px-6 py-4 text-red-600">No</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">INTERNAL_SERVER_ERROR</td>
                                <td className="px-6 py-4 whitespace-nowrap">500</td>
                                <td className="px-6 py-4">Unexpected server error</td>
                                <td className="px-6 py-4 text-green-600">Yes</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">SERVICE_MAINTENANCE</td>
                                <td className="px-6 py-4 whitespace-nowrap">503</td>
                                <td className="px-6 py-4">Service under maintenance</td>
                                <td className="px-6 py-4 text-green-600">Yes</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-mono">PROCESSING_TIMEOUT</td>
                                <td className="px-6 py-4 whitespace-nowrap">504</td>
                                <td className="px-6 py-4">Processing took too long</td>
                                <td className="px-6 py-4 text-yellow-600">Maybe</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-2">🆘 Need Help?</h3>
                <ul className="text-red-800 space-y-2">
                    <li>• Include the <code className="bg-red-100 px-2 py-1 rounded">request_id</code> when contacting support</li>
                    <li>• Check the <a href="#troubleshooting" className="underline hover:text-red-900">troubleshooting section</a> for common issues</li>
                    <li>• Monitor the <a href="/sandbox/api-status" className="underline hover:text-red-900">API status page</a> for service outages</li>
                    <li>• Review your error logs for patterns and trends</li>
                    <li>• Consider implementing health checks in your application</li>
                </ul>
            </div>
        </div>
    );
};

export default ErrorHandlingDocs;
