'use client';

import React from 'react';

const ArchitectureDocs = () => {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">System Architecture</h1>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
                <h2 className="text-xl font-semibold text-purple-900 mb-2">🏗️ Pipeline Overview</h2>
                <p className="text-purple-800">
                    Immortigen API uses a three-service architecture for processing health data from PDF reports 
                    to comprehensive organ analysis.
                </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Flow</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="text-center">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl mb-2 mx-auto">
                            📄
                        </div>
                        <h3 className="font-semibold">PDF Report</h3>
                        <p className="text-sm text-gray-600">Lab results input</p>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="text-center">
                        <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl mb-2 mx-auto">
                            🔄
                        </div>
                        <h3 className="font-semibold">Service 1</h3>
                        <p className="text-sm text-gray-600">PDF Processing</p>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="text-center">
                        <div className="bg-yellow-100 text-yellow-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl mb-2 mx-auto">
                            🧬
                        </div>
                        <h3 className="font-semibold">Service 2</h3>
                        <p className="text-sm text-gray-600">Data Analysis</p>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="text-center">
                        <div className="bg-purple-100 text-purple-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl mb-2 mx-auto">
                            📊
                        </div>
                        <h3 className="font-semibold">Service 3</h3>
                        <p className="text-sm text-gray-600">Combined Pipeline</p>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Service 1: PDF Processing</h3>
                    <ul className="text-blue-800 space-y-2 text-sm">
                        <li>• Extract biomarker data from PDFs</li>
                        <li>• OCR and text processing</li>
                        <li>• Structured data output</li>
                        <li>• Format validation</li>
                    </ul>
                    <div className="mt-4 text-xs text-blue-600">
                        Port: 8001
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Service 2: Data Analysis</h3>
                    <ul className="text-green-800 space-y-2 text-sm">
                        <li>• Biomarker analysis</li>
                        <li>• Reference range comparison</li>
                        <li>• Health insights generation</li>
                        <li>• Risk assessment</li>
                    </ul>
                    <div className="mt-4 text-xs text-green-600">
                        Port: 8002
                    </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">Service 3: Combined Pipeline</h3>
                    <ul className="text-purple-800 space-y-2 text-sm">
                        <li>• End-to-end processing</li>
                        <li>• PDF to insights pipeline</li>
                        <li>• Comprehensive analysis</li>
                        <li>• Organ-specific reports</li>
                    </ul>
                    <div className="mt-4 text-xs text-purple-600">
                        Port: 8003
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Backend</h3>
                        <ul className="text-gray-700 space-y-2">
                            <li>• Python 3.8+</li>
                            <li>• FastAPI framework</li>
                            <li>• Uvicorn ASGI server</li>
                            <li>• Docker containerization</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing</h3>
                        <ul className="text-gray-700 space-y-2">
                            <li>• PDF processing libraries</li>
                            <li>• OCR engines</li>
                            <li>• Machine learning models</li>
                            <li>• Data validation</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Performance Characteristics</h2>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Response Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max File Size</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Throughput</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Service 1</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-5 seconds</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 MB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">~12 requests/min</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Service 2</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1-3 seconds</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 MB JSON</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">~20 requests/min</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Service 3</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-8 seconds</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 MB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">~8 requests/min</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Deployment Architecture</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto">
                <pre>{`┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   API Gateway   │    │   Rate Limiter  │
│   (nginx/envoy) │────┤   (Kong/AWS)    │────┤   (Redis)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌────────┼────────┐
                       │        │        │
                ┌──────▼───┐ ┌──▼───┐ ┌──▼───────┐
                │Service 1 │ │Service│ │Service 3 │
                │:8001     │ │2:8002 │ │:8003     │
                └──────────┘ └──────┘ └──────────┘`}</pre>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-2">⚡ Performance Tips</h3>
                <ul className="text-amber-800 space-y-2">
                    <li>• Use Service 3 for complete processing when you need both PDF extraction and analysis</li>
                    <li>• Service 1 + Service 2 separately when you need to cache intermediate results</li>
                    <li>• Monitor processing times and implement proper timeout handling</li>
                    <li>• Consider async processing for large batches of files</li>
                </ul>
            </div>
        </div>
    );
};

export default ArchitectureDocs;
