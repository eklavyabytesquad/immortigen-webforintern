'use client';

import React from 'react';

const Service1Docs = () => {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Service 1: PDF Processing</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">🩺 PDF to Structured Data</h2>
                <p className="text-blue-800">
                    Service 1 extracts biomarker data from lab report PDFs and converts them into structured JSON format 
                    for further analysis. It handles various PDF formats and lab report layouts.
                </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Base URL</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <code className="text-gray-800">http://localhost:8001</code>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endpoints</h2>

            {/* Convert PDF Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">POST</span>
                    <code className="text-lg font-mono">/service1/convert-pdf</code>
                </div>
                
                <p className="text-gray-700 mb-4">Extract biomarker data from a PDF file.</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Request</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Headers</h4>
                    <div className="bg-gray-100 p-2 rounded text-sm">
                        <code>X-API-Key: your_api_key_here</code><br/>
                        <code>Content-Type: multipart/form-data</code>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Form Data</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left">Parameter</th>
                                    <th className="px-4 py-2 text-left">Type</th>
                                    <th className="px-4 py-2 text-left">Required</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 font-mono">pdf</td>
                                    <td className="px-4 py-2">file</td>
                                    <td className="px-4 py-2 text-red-600">Yes</td>
                                    <td className="px-4 py-2">PDF file containing lab report (max 10MB)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`curl -X POST "http://localhost:8001/service1/convert-pdf" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "pdf=@labreport.pdf"`}</pre>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Response</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`{
  "status": "success",
  "message": "PDF processed successfully",
  "data": {
    "biomarkers": [
      {
        "name": "Glucose",
        "value": 95,
        "unit": "mg/dL",
        "reference_range": "70-99 mg/dL",
        "status": "normal"
      },
      {
        "name": "Cholesterol",
        "value": 220,
        "unit": "mg/dL", 
        "reference_range": "<200 mg/dL",
        "status": "high"
      }
    ],
    "extracted_text": "Lab Report...",
    "processing_time": 2.34
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                </div>
            </div>

            {/* Convert PDF File Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">POST</span>
                    <code className="text-lg font-mono">/service1/convert-pdf-file</code>
                </div>
                
                <p className="text-gray-700 mb-4">Alternative endpoint with additional file metadata handling.</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Request</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Form Data</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left">Parameter</th>
                                    <th className="px-4 py-2 text-left">Type</th>
                                    <th className="px-4 py-2 text-left">Required</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 font-mono">file</td>
                                    <td className="px-4 py-2">file</td>
                                    <td className="px-4 py-2 text-red-600">Yes</td>
                                    <td className="px-4 py-2">PDF file with lab report data</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono">filename</td>
                                    <td className="px-4 py-2">string</td>
                                    <td className="px-4 py-2 text-gray-500">No</td>
                                    <td className="px-4 py-2">Custom filename for processing metadata</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`curl -X POST "http://localhost:8001/service1/convert-pdf-file" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "file=@patient_report_2024.pdf" \\
  -F "filename=patient_report_2024.pdf"`}</pre>
                </div>
            </div>

            {/* Health Check Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">GET</span>
                    <code className="text-lg font-mono">/service1/health</code>
                </div>
                
                <p className="text-gray-700 mb-4">Check the health status of Service 1.</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`curl -X GET "http://localhost:8001/service1/health"`}</pre>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Response</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`{
  "status": "healthy",
  "service": "service1",
  "version": "1.0.0",
  "uptime": "2h 15m 30s",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Responses</h2>
            <div className="space-y-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">400 Bad Request</h3>
                    <p className="text-red-700 mb-2">Invalid file format or missing required parameters</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "File must be a PDF",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">413 Payload Too Large</h3>
                    <p className="text-red-700 mb-2">File size exceeds the 10MB limit</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "File size exceeds maximum limit of 10MB",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">422 Unprocessable Entity</h3>
                    <p className="text-red-700 mb-2">PDF content cannot be processed or extracted</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "Unable to extract biomarker data from PDF",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Processing Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Supported</h3>
                    <ul className="text-green-800 space-y-2 text-sm">
                        <li>• Standard lab report layouts</li>
                        <li>• Multiple biomarker formats</li>
                        <li>• Text-based PDFs</li>
                        <li>• Image-based PDFs (with OCR)</li>
                        <li>• Multi-page documents</li>
                        <li>• Various units and ranges</li>
                    </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Limitations</h3>
                    <ul className="text-red-800 space-y-2 text-sm">
                        <li>• Heavily corrupted PDFs</li>
                        <li>• Non-medical documents</li>
                        <li>• Password-protected files</li>
                        <li>• Handwritten reports</li>
                        <li>• Files larger than 10MB</li>
                        <li>• Non-standard layouts (may vary)</li>
                    </ul>
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Best Practices</h3>
                <ul className="text-blue-800 space-y-2">
                    <li>• Ensure PDF files are clear and readable</li>
                    <li>• Use standard lab report formats when possible</li>
                    <li>• Check file size before uploading (max 10MB)</li>
                    <li>• Handle processing timeouts (typically 2-5 seconds)</li>
                    <li>• Validate extracted data before further processing</li>
                </ul>
            </div>
        </div>
    );
};

export default Service1Docs;
