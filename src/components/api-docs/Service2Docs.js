'use client';

import React from 'react';

const Service2Docs = () => {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Service 2: Data Analysis</h1>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                <h2 className="text-xl font-semibold text-green-900 mb-2">🧬 Biomarker Analysis Engine</h2>
                <p className="text-green-800">
                    Service 2 analyzes structured biomarker data and generates comprehensive health insights, 
                    organ-specific analysis, and risk assessments based on reference ranges and medical knowledge.
                </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Base URL</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <code className="text-gray-800">http://localhost:8002</code>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endpoints</h2>

            {/* Process Structured Data Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">POST</span>
                    <code className="text-lg font-mono">/service2/process-structured-data</code>
                </div>
                
                <p className="text-gray-700 mb-4">Analyze structured biomarker data and generate health insights.</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Request</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Headers</h4>
                    <div className="bg-gray-100 p-2 rounded text-sm">
                        <code>X-API-Key: your_api_key_here</code><br/>
                        <code>Content-Type: application/json</code>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Request Body</h4>
                    <div className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
                        <pre>{`{
  "biomarkers": [
    {
      "name": "Glucose",
      "value": 95,
      "unit": "mg/dL",
      "reference_range": "70-99 mg/dL"
    },
    {
      "name": "Cholesterol",
      "value": 220,
      "unit": "mg/dL",
      "reference_range": "<200 mg/dL"
    },
    {
      "name": "HDL Cholesterol",
      "value": 45,
      "unit": "mg/dL",
      "reference_range": ">40 mg/dL"
    }
  ],
  "patient_info": {
    "age": 35,
    "gender": "male",
    "weight": 75,
    "height": 175
  }
}`}</pre>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Parameters</h3>
                <div className="overflow-x-auto mb-4">
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
                                <td className="px-4 py-2 font-mono">biomarkers</td>
                                <td className="px-4 py-2">array</td>
                                <td className="px-4 py-2 text-red-600">Yes</td>
                                <td className="px-4 py-2">Array of biomarker objects</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-mono">patient_info</td>
                                <td className="px-4 py-2">object</td>
                                <td className="px-4 py-2 text-gray-500">No</td>
                                <td className="px-4 py-2">Patient demographics for personalized analysis</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`curl -X POST "http://localhost:8002/service2/process-structured-data" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -H "Content-Type: application/json" \\
  -d '{
    "biomarkers": [
      {
        "name": "Glucose",
        "value": 95,
        "unit": "mg/dL",
        "reference_range": "70-99 mg/dL"
      }
    ]
  }'`}</pre>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Response</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`{
  "status": "success",
  "message": "Data processed successfully",
  "data": {
    "analysis": {
      "overall_health_score": 75,
      "risk_level": "moderate",
      "biomarker_analysis": [
        {
          "name": "Glucose",
          "status": "normal",
          "interpretation": "Within normal range",
          "recommendations": ["Maintain current diet and exercise"]
        },
        {
          "name": "Cholesterol",
          "status": "high",
          "interpretation": "Above recommended levels",
          "recommendations": [
            "Consider dietary changes",
            "Increase physical activity",
            "Consult with healthcare provider"
          ]
        }
      ],
      "organ_analysis": {
        "cardiovascular": {
          "health_score": 65,
          "risk_factors": ["elevated cholesterol"],
          "recommendations": ["heart-healthy diet", "regular exercise"]
        },
        "metabolic": {
          "health_score": 85,
          "risk_factors": [],
          "recommendations": ["maintain current lifestyle"]
        }
      }
    },
    "processing_time": 1.23
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                </div>
            </div>

            {/* Process JSON File Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">POST</span>
                    <code className="text-lg font-mono">/service2/process-json-file</code>
                </div>
                
                <p className="text-gray-700 mb-4">Upload and analyze biomarker data from a JSON file.</p>
                
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
                                    <td className="px-4 py-2 font-mono">file</td>
                                    <td className="px-4 py-2">file</td>
                                    <td className="px-4 py-2 text-red-600">Yes</td>
                                    <td className="px-4 py-2">JSON file with biomarker data (max 1MB)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`curl -X POST "http://localhost:8002/service2/process-json-file" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "file=@biomarkers.json"`}</pre>
                </div>
            </div>

            {/* Health Check Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">GET</span>
                    <code className="text-lg font-mono">/service2/health</code>
                </div>
                
                <p className="text-gray-700 mb-4">Check the health status of Service 2.</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`curl -X GET "http://localhost:8002/service2/health"`}</pre>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Response</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`{
  "status": "healthy",
  "service": "service2",
  "version": "1.0.0",
  "models_loaded": true,
  "uptime": "2h 15m 30s",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analysis Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">🔬 Biomarker Analysis</h3>
                    <ul className="text-blue-800 space-y-2 text-sm">
                        <li>• Reference range comparison</li>
                        <li>• Status interpretation (normal/high/low)</li>
                        <li>• Trend analysis (if historical data)</li>
                        <li>• Clinical significance assessment</li>
                        <li>• Personalized recommendations</li>
                    </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">🫀 Organ Analysis</h3>
                    <ul className="text-purple-800 space-y-2 text-sm">
                        <li>• Cardiovascular health assessment</li>
                        <li>• Metabolic function analysis</li>
                        <li>• Liver function evaluation</li>
                        <li>• Kidney function assessment</li>
                        <li>• Endocrine system analysis</li>
                    </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">📊 Risk Assessment</h3>
                    <ul className="text-green-800 space-y-2 text-sm">
                        <li>• Overall health score calculation</li>
                        <li>• Disease risk stratification</li>
                        <li>• Lifestyle factor analysis</li>
                        <li>• Preventive care recommendations</li>
                        <li>• Follow-up suggestions</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-3">🎯 Personalization</h3>
                    <ul className="text-yellow-800 space-y-2 text-sm">
                        <li>• Age-adjusted reference ranges</li>
                        <li>• Gender-specific analysis</li>
                        <li>• BMI-based recommendations</li>
                        <li>• Lifestyle factor integration</li>
                        <li>• Cultural dietary considerations</li>
                    </ul>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Supported Biomarkers</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Metabolic Panel</h3>
                        <ul className="text-gray-700 space-y-1 text-sm">
                            <li>• Glucose</li>
                            <li>• HbA1c</li>
                            <li>• Insulin</li>
                            <li>• C-Peptide</li>
                            <li>• Fructosamine</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Lipid Panel</h3>
                        <ul className="text-gray-700 space-y-1 text-sm">
                            <li>• Total Cholesterol</li>
                            <li>• HDL Cholesterol</li>
                            <li>• LDL Cholesterol</li>
                            <li>• Triglycerides</li>
                            <li>• Non-HDL Cholesterol</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Liver Function</h3>
                        <ul className="text-gray-700 space-y-1 text-sm">
                            <li>• ALT (SGPT)</li>
                            <li>• AST (SGOT)</li>
                            <li>• Bilirubin</li>
                            <li>• Alkaline Phosphatase</li>
                            <li>• GGT</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">+ 50+ additional biomarkers across cardiovascular, metabolic, inflammatory, and hormonal panels</p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Responses</h2>
            <div className="space-y-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">400 Bad Request</h3>
                    <p className="text-red-700 mb-2">Invalid biomarker data format or missing required fields</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "Invalid biomarker data format",
  "details": "Missing required field: value",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">422 Unprocessable Entity</h3>
                    <p className="text-red-700 mb-2">Data validation failed or unsupported biomarker types</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "Unsupported biomarker or invalid reference range",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">💡 Best Practices</h3>
                <ul className="text-green-800 space-y-2">
                    <li>• Provide complete biomarker data including units and reference ranges</li>
                    <li>• Include patient demographics for personalized analysis</li>
                    <li>• Validate biomarker names and units before sending</li>
                    <li>• Use standard medical units (mg/dL, mmol/L, etc.)</li>
                    <li>• Consider batch processing for multiple patients</li>
                </ul>
            </div>
        </div>
    );
};

export default Service2Docs;
