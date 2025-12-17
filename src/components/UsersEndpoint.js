'use client';

import React, { useState } from 'react';

const Service1Endpoint = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setError('');
        } else {
            setError('Please select a valid PDF file');
            setSelectedFile(null);
        }
    };

    const handleTest = async () => {
        if (!selectedFile) {
            setError('Please select a PDF file first');
            return;
        }

        if (!apiKey.trim()) {
            setError('Please enter an API key');
            return;
        }

        setLoading(true);
        setError('');
        setResponse('');

        try {
            const formData = new FormData();
            formData.append('pdf', selectedFile);

            const response = await fetch('http://localhost:8000/service1/convert-pdf', {
                method: 'POST',
                headers: {
                    'X-API-Key': apiKey
                },
                body: formData
            });

            const result = await response.json();
            
            if (response.ok) {
                setResponse(JSON.stringify(result, null, 2));
            } else {
                setError(`Error ${response.status}: ${result.detail || result.message || 'Unknown error'}`);
            }
        } catch (err) {
            setError(`Network Error: ${err.message}. Make sure the server is running on localhost:8000`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🩺 Service 1 - PDF to Structured Data</h2>
                <p className="text-gray-600">Converts lab report PDF to structured JSON data with 61 health parameters</p>
                <div className="mt-2 text-sm text-blue-600">
                    <span className="font-medium">Endpoint:</span> POST /service1/convert-pdf
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Request Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Request</h3>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-800 mb-2">📋 What this service does:</div>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Extracts health parameters from PDF lab reports</li>
                            <li>• Converts unstructured data to structured JSON</li>
                            <li>• Processes up to 61 different biomarkers</li>
                            <li>• Returns standardized format for analysis</li>
                        </ul>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            API Key <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your API key (e.g., test_sk_1234567890abcdef...)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            PDF File <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                                id="pdf-upload"
                            />
                            <label htmlFor="pdf-upload" className="cursor-pointer">
                                <div className="text-gray-500">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="mt-2">
                                        <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">PDF files only</div>
                                </div>
                            </label>
                        </div>
                        {selectedFile && (
                            <div className="mt-2 text-sm text-green-600">
                                ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleTest}
                        disabled={loading || !selectedFile}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing PDF...
                            </div>
                        ) : (
                            'Convert PDF to Structured Data'
                        )}
                    </button>
                </div>

                {/* Response Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Response</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-2">Expected Response Format:</div>
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap">
{`{
  "status": "success",
  "message": "PDF successfully converted to structured data",
  "service": "service1",
  "data": {
    "pdf_filename": "labreport.pdf",
    "gender": "Male",
    "total_parameters": 61,
    "processing_time_ms": 5000,
    "structured_data": [...]
  }
}`}
                        </pre>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Response Body:
                        </label>
                        <textarea
                            value={response}
                            readOnly
                            className="w-full h-96 p-3 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Response will appear here after processing..."
                        />
                    </div>

                    {response && (
                        <div className="text-sm text-green-600">
                            ✓ PDF processed successfully! The structured data is ready for Service 2.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Service1Endpoint;
