'use client';

import React, { useState } from 'react';

const Service2Endpoint = () => {
    const [activeTab, setActiveTab] = useState('json-body');
    const [selectedFile, setSelectedFile] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sampleJsonData = JSON.stringify([
        {"gender": "Male"},
        {"test_name": "Glucose (Fasting)", "result": "95", "unit": "mg/dL", "reference_range": "70 - 100", "method": "Glucose Oxidase"},
        {"test_name": "Cholesterol (Total)", "result": "180", "unit": "mg/dL", "reference_range": "< 200", "method": "CHOD-PAP"},
        {"test_name": "HDL Cholesterol", "result": "45", "unit": "mg/dL", "reference_range": "> 40", "method": "Direct"},
        {"test_name": "LDL Cholesterol", "result": "120", "unit": "mg/dL", "reference_range": "< 130", "method": "Calculated"},
        {"test_name": "Triglycerides", "result": "150", "unit": "mg/dL", "reference_range": "< 150", "method": "GPO-PAP"},
        {"test_name": "Urea", "result": "25.6", "unit": "mg/dL", "reference_range": "17 - 43", "method": "Urase, UV"},
        {"test_name": "Creatinine", "result": "1.0", "unit": "mg/dL", "reference_range": "0.9 - 1.3", "method": "Alkaline picrate kinetic"}
    ], null, 2);

    React.useEffect(() => {
        setJsonData(sampleJsonData);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/json') {
            setSelectedFile(file);
            setError('');
        } else {
            setError('Please select a valid JSON file');
            setSelectedFile(null);
        }
    };

    const handleTestJsonBody = async () => {
        if (!jsonData.trim()) {
            setError('Please enter JSON data');
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
            const parsedData = JSON.parse(jsonData);
            
            const response = await fetch('http://localhost:8000/service2/process-structured-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                },
                body: JSON.stringify({ structured_data: parsedData })
            });

            const result = await response.json();
            
            if (response.ok) {
                setResponse(JSON.stringify(result, null, 2));
            } else {
                setError(`Error ${response.status}: ${result.detail || result.message || 'Unknown error'}`);
            }
        } catch (err) {
            if (err.message.includes('JSON')) {
                setError('Invalid JSON format. Please check your JSON syntax.');
            } else {
                setError(`Network Error: ${err.message}. Make sure the server is running on localhost:8000`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTestFileUpload = async () => {
        if (!selectedFile) {
            setError('Please select a JSON file first');
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
            formData.append('json_file', selectedFile);

            const response = await fetch('http://localhost:8000/service2/process-json-file', {
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🧬 Service 2 - Structured Data to Organ Analysis</h2>
                <p className="text-gray-600">Processes structured health data into organ-specific risk analysis</p>
            </div>

            {/* Method Tabs */}
            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => {
                                setActiveTab('json-body');
                                setError('');
                                setResponse('');
                            }}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'json-body'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <span className="px-2 py-1 rounded-full text-xs mr-2 bg-blue-100 text-blue-800">POST</span>
                            /service2/process-structured-data
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('file-upload');
                                setError('');
                                setResponse('');
                            }}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'file-upload'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <span className="px-2 py-1 rounded-full text-xs mr-2 bg-green-100 text-green-800">POST</span>
                            /service2/process-json-file
                        </button>
                    </nav>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Request Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Request</h3>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-800 mb-2">🧬 What this service does:</div>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Analyzes structured health data</li>
                            <li>• Calculates organ-specific risk scores</li>
                            <li>• Provides health recommendations</li>
                            <li>• Generates comprehensive health insights</li>
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

                    {activeTab === 'json-body' ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Structured Data (JSON) <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={jsonData}
                                onChange={(e) => setJsonData(e.target.value)}
                                className="w-full h-64 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter structured JSON data..."
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                Expected format: Array of objects with test results from Service 1
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                JSON File <span className="text-red-500">*</span>
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="json-upload"
                                />
                                <label htmlFor="json-upload" className="cursor-pointer">
                                    <div className="text-gray-500">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="mt-2">
                                            <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">JSON files only</div>
                                    </div>
                                </label>
                            </div>
                            {selectedFile && (
                                <div className="mt-2 text-sm text-green-600">
                                    ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                                </div>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={activeTab === 'json-body' ? handleTestJsonBody : handleTestFileUpload}
                        disabled={loading || (activeTab === 'json-body' ? !jsonData.trim() : !selectedFile)}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing Data...
                            </div>
                        ) : (
                            'Process Structured Data'
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
  "message": "Structured data successfully processed to organ analysis",
  "service": "service2",
  "data": {
    "processing_time_ms": 1500,
    "organs_analyzed": 8,
    "analysis": {
      "gender": "Male",
      "organ_ohr_summary": {
        "kidney": 1.2,
        "liver": 1.0,
        "heart": 1.1
      }
    }
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
                            placeholder="Organ analysis results will appear here..."
                        />
                    </div>

                    {response && (
                        <div className="text-sm text-green-600">
                            ✓ Data processed successfully! Organ analysis complete.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Service2Endpoint;
