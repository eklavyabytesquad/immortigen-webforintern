'use client';

import React, { useState } from 'react';
import ApiDocsSidebar from './ApiDocsSidebar';

const ApiDocsContent = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    const renderContent = () => {
        switch (activeSection) {
            case 'introduction':
                return (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Introduction</h1>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 mb-6">
                                This API reference includes Immortigen&apos;s Health Analytics APIs, which are REST APIs exposed by the Immortigen backend. 
                                They are typically used to create health analysis applications for processing biomarker data and generating personalized health insights.
                            </p>
                            
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                                <p className="text-blue-800">
                                    All endpoints are prefixed with <code className="bg-blue-100 px-2 py-1 rounded text-blue-900">/service1</code>, <code className="bg-blue-100 px-2 py-1 rounded text-blue-900">/service2</code>, or <code className="bg-blue-100 px-2 py-1 rounded text-blue-900">/service3</code>. 
                                    So, during development, the endpoints will be available under the path <code className="bg-blue-100 px-2 py-1 rounded text-blue-900">http://localhost:8000/service*</code>. 
                                    For production, replace <code className="bg-blue-100 px-2 py-1 rounded text-blue-900">http://localhost:8000</code> with your Immortigen backend URL.
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">There are different ways you can send requests to these endpoints, including:</h3>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    Using <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">cURL</code> commands
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    Using JavaScript <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">fetch</code> API
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    Using Python <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">requests</code> library
                                </li>
                            </ul>

                            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                                <p className="text-green-800">
                                    Aside from this API reference, check out the <strong>Sandbox</strong> section to test these APIs interactively and the <strong>API Status</strong> page for real-time monitoring.
                                </p>
                            </div>

                            <p className="text-sm text-gray-500">Modified at August 31, 2025</p>
                        </div>
                    </div>
                );

            case 'authentication':
                return (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Authentication</h1>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 mb-6">
                                All API endpoints require authentication using an API key. The API key must be included in the request headers.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">API Key Header</h3>
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <code className="text-sm text-gray-800">X-API-Key: your_api_key_here</code>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Example Request</h3>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
                                <pre className="text-sm">
{`curl -X POST "http://localhost:8000/service1/convert-pdf" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "pdf=@labreport.pdf"`}
                                </pre>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <p className="text-yellow-800">
                                    <strong>Important:</strong> Keep your API key secure and never expose it in client-side code. 
                                    API keys are validated against the Supabase database.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'service1':
            case 'service1-overview':
                return (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">🩺 Service 1 - PDF to Structured Data</h1>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 mb-6">
                                Service 1 converts lab report PDF files into structured JSON data with up to 61 health parameters.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">Input</h4>
                                    <p className="text-blue-800 text-sm">PDF file (lab report)</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-2">Output</h4>
                                    <p className="text-green-800 text-sm">Structured JSON with health parameters</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    Extracts up to 61 different biomarkers
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    Processes various lab report formats
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    Returns standardized JSON format
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    Includes metadata and processing information
                                </li>
                            </ul>
                        </div>
                    </div>
                );

            case 'service1-endpoint':
                return (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Convert PDF Endpoint</h1>
                        <div className="space-y-6">
                            {/* Endpoint Info */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3">POST</span>
                                    <code className="text-lg font-mono text-gray-800">/service1/convert-pdf</code>
                                </div>
                                <p className="text-gray-600">Converts a PDF lab report to structured JSON data.</p>
                            </div>

                            {/* Parameters */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-4 py-2 text-sm font-mono text-gray-900">pdf</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">File</td>
                                                <td className="px-4 py-2 text-sm text-red-600">Yes</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">PDF file containing lab report</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Example Response */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Response</h3>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                    <pre className="text-sm">
{`{
  "status": "success",
  "message": "PDF successfully converted to structured data",
  "service": "service1",
  "data": {
    "pdf_filename": "labreport.pdf",
    "gender": "Male",
    "total_parameters": 61,
    "processing_time_ms": 5000,
    "structured_data": [
      {"gender": "Male"},
      {
        "test_name": "Glucose (Fasting)",
        "result": "95",
        "unit": "mg/dL",
        "reference_range": "70 - 100",
        "method": "Glucose Oxidase"
      }
    ]
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'service2':
            case 'service2-overview':
                return (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">🧬 Service 2 - Structured Data Analysis</h1>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 mb-6">
                                Service 2 processes structured health data into organ-specific risk analysis and health recommendations.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">Input</h4>
                                    <p className="text-blue-800 text-sm">Structured JSON data or JSON file</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-2">Output</h4>
                                    <p className="text-green-800 text-sm">Organ analysis with risk scores</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Endpoints</h3>
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3">POST</span>
                                        <code className="font-mono text-gray-800">/service2/process-structured-data</code>
                                    </div>
                                    <p className="text-gray-600 text-sm">Send structured data in request body</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-3">POST</span>
                                        <code className="font-mono text-gray-800">/service2/process-json-file</code>
                                    </div>
                                    <p className="text-gray-600 text-sm">Upload JSON file with structured data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'service3':
            case 'service3-overview':
                return (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">🔄 Service 3 - Combined Processing</h1>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 mb-6">
                                Service 3 provides a complete pipeline that combines Service 1 and Service 2 into a single operation.
                            </p>

                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                                <h4 className="font-semibold text-purple-900 mb-3">Pipeline Stages</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full mr-3">1</span>
                                        <span className="text-purple-800">PDF → Structured Data Extraction</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full mr-3">2</span>
                                        <span className="text-purple-800">Structured Data → Organ Analysis</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full mr-3">3</span>
                                        <span className="text-purple-800">Complete Health Report Generation</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                    Single API call for complete analysis
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                    Optimized processing pipeline
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                    Comprehensive results in one response
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                    Reduced complexity and error handling
                                </li>
                            </ul>
                        </div>
                    </div>
                );

            case 'errors':
                return (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">⚠️ Error Codes</h1>
                        <div className="space-y-6">
                            <p className="text-lg text-gray-700">
                                The API uses standard HTTP status codes to indicate success or failure of requests.
                            </p>

                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-mono text-green-600">200</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">OK</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Request successful</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-mono text-green-600">201</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Created</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Resource created successfully</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-mono text-yellow-600">400</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Bad Request</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Invalid request format or parameters</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-mono text-red-600">401</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Unauthorized</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Invalid or missing API key</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-mono text-red-600">422</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Unprocessable Entity</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Invalid file format or data structure</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-mono text-red-600">500</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Internal Server Error</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">Server processing error</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'examples':
                return (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">💻 Code Examples</h1>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">JavaScript (Fetch API)</h3>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                    <pre className="text-sm">
{`// Service 1 - PDF Upload
const formData = new FormData();
formData.append('pdf', pdfFile);

const response = await fetch('http://localhost:8000/service1/convert-pdf', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your_api_key_here'
  },
  body: formData
});

const result = await response.json();
console.log(result);`}
                                    </pre>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Python (Requests)</h3>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                    <pre className="text-sm">
{`import requests

# Service 1 - PDF Upload
with open('labreport.pdf', 'rb') as pdf_file:
    files = {'pdf': pdf_file}
    headers = {'X-API-Key': 'your_api_key_here'}
    
    response = requests.post(
        'http://localhost:8000/service1/convert-pdf',
        headers=headers,
        files=files
    )
    
    result = response.json()
    print(result)`}
                                    </pre>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">cURL</h3>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                    <pre className="text-sm">
{`# Service 1 - PDF Upload
curl -X POST "http://localhost:8000/service1/convert-pdf" \\
  -H "X-API-Key: your_api_key_here" \\
  -F "pdf=@labreport.pdf"

# Service 2 - JSON Processing
curl -X POST "http://localhost:8000/service2/process-structured-data" \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"structured_data": [{"gender": "Male"}, {"test_name": "Glucose", "result": "95"}]}'`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Documentation</h1>
                        <p className="text-lg text-gray-700">Select a section from the sidebar to view documentation.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex flex-1">
                {/* Sidebar */}
                <ApiDocsSidebar 
                    activeSection={activeSection} 
                    onSectionChange={setActiveSection} 
                />
                
                {/* Main Content */}
                <div className="flex-1 p-8 overflow-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default ApiDocsContent;
