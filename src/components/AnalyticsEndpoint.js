'use client';

import React, { useState } from 'react';

const Service3Endpoint = () => {
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

            const response = await fetch('http://localhost:8000/service3/combined-blood-report', {
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🔄 Service 3 - Combined PDF Processing and Analysis</h2>
                <p className="text-gray-600">Complete pipeline - PDF to structured data to organ analysis in one call</p>
                <div className="mt-2 text-sm text-blue-600">
                    <span className="font-medium">Endpoint:</span> POST /service3/combined-blood-report
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Request Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Request</h3>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-purple-800 mb-2">🚀 Complete Pipeline:</div>
                        <div className="space-y-2 text-sm text-purple-700">
                            <div className="flex items-center">
                                <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full mr-2">1</span>
                                PDF → Structured Data Extraction
                            </div>
                            <div className="flex items-center">
                                <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full mr-2">2</span>
                                Structured Data → Organ Analysis
                            </div>
                            <div className="flex items-center">
                                <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full mr-2">3</span>
                                Complete Health Report Generation
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-green-800 mb-2">✅ Benefits of Combined Processing:</div>
                        <ul className="text-sm text-green-700 space-y-1">
                            <li>• Single API call for complete analysis</li>
                            <li>• Faster processing with optimized pipeline</li>
                            <li>• Comprehensive results in one response</li>
                            <li>• Reduced complexity and error handling</li>
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
                                id="pdf-upload-combined"
                            />
                            <label htmlFor="pdf-upload-combined" className="cursor-pointer">
                                <div className="text-gray-500">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="mt-2">
                                        <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">PDF lab reports only</div>
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
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing Complete Pipeline...
                            </div>
                        ) : (
                            'Run Complete Analysis Pipeline'
                        )}
                    </button>

                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                        <strong>Note:</strong> This endpoint combines Service 1 and Service 2 into a single operation. 
                        Processing time may be longer as it performs both PDF extraction and organ analysis.
                    </div>
                </div>

                {/* Response Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Response</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-2">Expected Response Format:</div>
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap">
{`{
  "status": "success",
  "message": "PDF successfully processed through complete analysis pipeline",
  "service": "service3",
  "pipeline_stages": {
    "stage_1": "PDF → Structured Data (Completed)",
    "stage_2": "Structured Data → Organ Analysis (Completed)"
  },
  "data": {
    "pdf_filename": "labreport.pdf",
    "gender": "Male",
    "total_parameters_extracted": 61,
    "organs_analyzed": 8,
    "processing_time_ms": 6500,
    "raw_structured_data": [...],
    "organ_specific_analysis": {...}
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
                            placeholder="Complete analysis results will appear here..."
                        />
                    </div>

                    {response && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center text-green-800">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">Complete Pipeline Executed Successfully!</span>
                            </div>
                            <div className="text-sm text-green-700 mt-1">
                                Your PDF has been processed and analyzed. Check the response for detailed health insights and organ-specific recommendations.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Service3Endpoint;
