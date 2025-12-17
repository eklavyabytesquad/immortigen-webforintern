'use client';

import React from 'react';

const IntroductionDocs = () => {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Immortigen API Documentation</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">Welcome to Immortigen API</h2>
                <p className="text-blue-800">
                    This API reference includes Immortigens Health Analysis APIs, which are REST APIs for processing 
                    lab reports and generating comprehensive health insights. They are typically used to create health 
                    analytics platforms, medical dashboards, or health monitoring applications.
                </p>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Base URL</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <code className="text-gray-800">http://localhost:8000</code>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Overview</h2>
            <p className="text-gray-700 mb-4">
                All endpoints are prefixed with service-specific paths. During development, the endpoints 
                will be available under the path <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8000</code>. 
                For production, replace <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8000</code> with your production URL.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🩺 PDF Processing</h3>
                    <p className="text-gray-700">Extract biomarker data from lab report PDFs with high accuracy</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🧬 Health Analysis</h3>
                    <p className="text-gray-700">Comprehensive analysis of biomarkers with reference ranges</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🔄 Combined Pipeline</h3>
                    <p className="text-gray-700">End-to-end processing from PDF to detailed health insights</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">⚡ Real-time</h3>
                    <p className="text-gray-700">Fast processing with immediate response for all services</p>
                </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Request Methods</h2>
            <p className="text-gray-700 mb-4">There are different ways you can send requests to these endpoints, including:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Using JavaScript fetch API</li>
                <li>Using cURL commands</li>
                <li>Using HTTP client libraries</li>
                <li>Using our interactive sandbox</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Response Format</h2>
            <p className="text-gray-700 mb-4">All API responses are returned in JSON format with the following structure:</p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto">
                <pre>{`{
  "status": "success" | "error",
  "message": "Human readable message",
  "data": { ... },
  "timestamp": "ISO 8601 timestamp"
}`}</pre>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">📚 Additional Resources</h3>
                <p className="text-yellow-800">
                    Aside from this API reference, check out the 
                    <a href="/sandbox" className="text-blue-600 hover:text-blue-800 underline ml-1">Interactive Sandbox</a> 
                    for hands-on testing and examples of how to use these APIs in different scenarios.
                </p>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
                Modified at {new Date().toLocaleDateString()}
            </div>
        </div>
    );
};

export default IntroductionDocs;
