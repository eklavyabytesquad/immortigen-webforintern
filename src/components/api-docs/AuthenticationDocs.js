'use client';

import React from 'react';

const AuthenticationDocs = () => {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Authentication</h1>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
                <h2 className="text-xl font-semibold text-red-900 mb-2">🔐 API Key Required</h2>
                <p className="text-red-800">
                    All API endpoints require authentication using an API key. You must include your API key 
                    in the request headers for all service endpoints.
                </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Header Format</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <code className="text-gray-800">X-API-Key: your_api_key_here</code>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Example Request</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto">
                <pre>{`curl -X POST "http://localhost:8000/service1/convert-pdf" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "pdf=@labreport.pdf"`}</pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Test API Key</h2>
            <p className="text-gray-700 mb-4">For testing purposes, you can use the following API key:</p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <code className="text-blue-800 break-all">test_sk_1234567890abcdef1234567890abcdef12345678</code>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authentication Methods</h2>
            <div className="space-y-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Header-based Authentication</h3>
                    <p className="text-gray-700 mb-3">Include the API key in the request headers (recommended):</p>
                    <div className="bg-gray-100 p-3 rounded">
                        <code>X-API-Key: your_api_key_here</code>
                    </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Query Parameter</h3>
                    <p className="text-gray-700 mb-3">Alternative method using query parameters:</p>
                    <div className="bg-gray-100 p-3 rounded">
                        <code>?api_key=your_api_key_here</code>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Public Endpoints</h2>
            <p className="text-gray-700 mb-4">The following endpoints do not require authentication:</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><code className="bg-gray-100 px-2 py-1 rounded">GET /health</code> - System health check</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">GET /</code> - API information</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">GET /service1/health</code> - Service 1 health</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">GET /service2/health</code> - Service 2 health</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">GET /service3/health</code> - Service 3 health</li>
                </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Responses</h2>
            <p className="text-gray-700 mb-4">If authentication fails, you will receive one of these error responses:</p>
            
            <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">401 Unauthorized</h3>
                    <p className="text-red-700 mb-2">Missing or invalid API key</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "API key is required",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">403 Forbidden</h3>
                    <p className="text-red-700 mb-2">Valid API key but insufficient permissions</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "Invalid API key",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Best Practices</h3>
                <ul className="text-blue-800 space-y-2">
                    <li>• Store API keys securely and never expose them in client-side code</li>
                    <li>• Use environment variables to manage different keys for different environments</li>
                    <li>• Rotate API keys regularly for enhanced security</li>
                    <li>• Monitor API key usage and set up alerts for unusual activity</li>
                </ul>
            </div>
        </div>
    );
};

export default AuthenticationDocs;
