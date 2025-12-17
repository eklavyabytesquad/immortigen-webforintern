'use client';

import React from 'react';

const Service3Docs = () => {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Service 3: Combined Pipeline</h1>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
                <h2 className="text-xl font-semibold text-purple-900 mb-2">🔄 End-to-End Processing</h2>
                <p className="text-purple-800">
                    Service 3 combines the power of Service 1 (PDF processing) and Service 2 (data analysis) 
                    into a single, streamlined pipeline that takes PDF lab reports and outputs comprehensive 
                    health insights in one request.
                </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Base URL</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <code className="text-gray-800">http://localhost:8003</code>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endpoints</h2>

            {/* Combined Processing Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">POST</span>
                    <code className="text-lg font-mono">/service3/process-combined</code>
                </div>
                
                <p className="text-gray-700 mb-4">Process a PDF lab report through the complete pipeline from extraction to analysis.</p>
                
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
                                <tr>
                                    <td className="px-4 py-2 font-mono">patient_age</td>
                                    <td className="px-4 py-2">integer</td>
                                    <td className="px-4 py-2 text-gray-500">No</td>
                                    <td className="px-4 py-2">Patient age for personalized analysis</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono">patient_gender</td>
                                    <td className="px-4 py-2">string</td>
                                    <td className="px-4 py-2 text-gray-500">No</td>
                                    <td className="px-4 py-2">Patient gender (male/female/other)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono">include_recommendations</td>
                                    <td className="px-4 py-2">boolean</td>
                                    <td className="px-4 py-2 text-gray-500">No</td>
                                    <td className="px-4 py-2">Include detailed recommendations (default: true)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`curl -X POST "http://localhost:8003/service3/process-combined" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "pdf=@patient_labreport.pdf" \\
  -F "patient_age=35" \\
  -F "patient_gender=male" \\
  -F "include_recommendations=true"`}</pre>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Response</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`{
  "status": "success",
  "message": "PDF processed and analyzed successfully",
  "data": {
    "extraction_results": {
      "biomarkers": [
        {
          "name": "Glucose",
          "value": 95,
          "unit": "mg/dL",
          "reference_range": "70-99 mg/dL",
          "status": "normal"
        },
        {
          "name": "Total Cholesterol",
          "value": 220,
          "unit": "mg/dL",
          "reference_range": "<200 mg/dL",
          "status": "high"
        },
        {
          "name": "HDL Cholesterol", 
          "value": 45,
          "unit": "mg/dL",
          "reference_range": ">40 mg/dL",
          "status": "normal"
        },
        {
          "name": "LDL Cholesterol",
          "value": 155,
          "unit": "mg/dL", 
          "reference_range": "<100 mg/dL",
          "status": "high"
        }
      ],
      "extracted_text": "Complete Blood Chemistry Panel Results...",
      "processing_time": 2.8
    },
    "analysis_results": {
      "overall_health_score": 72,
      "risk_level": "moderate",
      "biomarker_analysis": [
        {
          "name": "Glucose",
          "status": "normal",
          "interpretation": "Blood glucose levels are within normal range",
          "clinical_significance": "Good metabolic control",
          "recommendations": [
            "Maintain current diet and exercise routine",
            "Continue monitoring glucose levels regularly"
          ]
        },
        {
          "name": "Total Cholesterol",
          "status": "high",
          "interpretation": "Cholesterol levels exceed recommended guidelines",
          "clinical_significance": "Increased cardiovascular risk",
          "recommendations": [
            "Adopt heart-healthy diet low in saturated fats",
            "Increase physical activity to 150 minutes/week",
            "Consider discussing statin therapy with physician"
          ]
        }
      ],
      "organ_analysis": {
        "cardiovascular": {
          "health_score": 65,
          "status": "at_risk",
          "key_findings": [
            "Elevated total cholesterol",
            "Elevated LDL cholesterol",
            "Normal HDL cholesterol"
          ],
          "risk_factors": [
            "High cholesterol levels",
            "Age factor (35 years)"
          ],
          "recommendations": [
            "Implement Mediterranean-style diet",
            "Regular cardiovascular exercise",
            "Monitor blood pressure",
            "Follow-up lipid panel in 3 months"
          ]
        },
        "metabolic": {
          "health_score": 85,
          "status": "healthy",
          "key_findings": [
            "Normal glucose levels"
          ],
          "risk_factors": [],
          "recommendations": [
            "Continue current lifestyle",
            "Maintain healthy weight"
          ]
        },
        "liver": {
          "health_score": 80,
          "status": "healthy",
          "key_findings": [
            "Normal liver enzyme levels"
          ],
          "risk_factors": [],
          "recommendations": [
            "Maintain moderate alcohol consumption",
            "Continue healthy diet"
          ]
        }
      },
      "detailed_insights": {
        "summary": "Overall health shows good metabolic control with some cardiovascular risk factors that warrant lifestyle modifications.",
        "priority_actions": [
          "Address elevated cholesterol through diet and exercise",
          "Schedule follow-up with healthcare provider",
          "Implement heart-healthy lifestyle changes"
        ],
        "lifestyle_recommendations": {
          "diet": [
            "Reduce saturated fat intake",
            "Increase fiber consumption",
            "Include omega-3 rich foods"
          ],
          "exercise": [
            "150 minutes moderate cardio per week",
            "2-3 strength training sessions",
            "Daily walking goal: 10,000 steps"
          ],
          "monitoring": [
            "Track cholesterol levels quarterly",
            "Monitor blood pressure monthly",
            "Annual comprehensive metabolic panel"
          ]
        }
      },
      "processing_time": 1.45
    },
    "total_processing_time": 4.25,
    "pipeline_steps": [
      "PDF text extraction",
      "Biomarker identification",
      "Data validation",
      "Reference range comparison", 
      "Health analysis",
      "Risk assessment",
      "Recommendation generation"
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                </div>
            </div>

            {/* Health Check Endpoint */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">GET</span>
                    <code className="text-lg font-mono">/service3/health</code>
                </div>
                
                <p className="text-gray-700 mb-4">Check the health status of Service 3 and all dependent services.</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`curl -X GET "http://localhost:8003/service3/health"`}</pre>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Response</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`{
  "status": "healthy",
  "service": "service3",
  "version": "1.0.0",
  "dependencies": {
    "service1": "healthy",
    "service2": "healthy"
  },
  "pipeline_status": "operational",
  "uptime": "2h 15m 30s",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pipeline Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">🔄 Automated Processing</h3>
                    <ul className="text-blue-800 space-y-2 text-sm">
                        <li>• Single API call for complete workflow</li>
                        <li>• Automatic error handling and retries</li>
                        <li>• Progress tracking through pipeline stages</li>
                        <li>• Optimized processing order</li>
                        <li>• Built-in validation at each step</li>
                    </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">📊 Comprehensive Output</h3>
                    <ul className="text-green-800 space-y-2 text-sm">
                        <li>• Raw extraction results</li>
                        <li>• Detailed biomarker analysis</li>
                        <li>• Organ-specific health assessments</li>
                        <li>• Personalized recommendations</li>
                        <li>• Risk stratification</li>
                    </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">⚡ Performance Optimized</h3>
                    <ul className="text-purple-800 space-y-2 text-sm">
                        <li>• Parallel processing where possible</li>
                        <li>• Intelligent caching mechanisms</li>
                        <li>• Reduced network overhead</li>
                        <li>• Streamlined data flow</li>
                        <li>• Optimized resource utilization</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-3">🛡️ Reliability</h3>
                    <ul className="text-yellow-800 space-y-2 text-sm">
                        <li>• Comprehensive error handling</li>
                        <li>• Graceful degradation</li>
                        <li>• Service dependency monitoring</li>
                        <li>• Transaction-like processing</li>
                        <li>• Detailed logging and monitoring</li>
                    </ul>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Processing Workflow</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">PDF Upload & Validation</h3>
                            <p className="text-sm text-gray-600">File format validation, size check, and security scanning</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Text Extraction</h3>
                            <p className="text-sm text-gray-600">OCR processing and text extraction from PDF document</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-yellow-100 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Biomarker Identification</h3>
                            <p className="text-sm text-gray-600">Pattern matching and biomarker data extraction</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Data Validation</h3>
                            <p className="text-sm text-gray-600">Range validation, unit normalization, and quality checks</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Health Analysis</h3>
                            <p className="text-sm text-gray-600">Clinical interpretation and risk assessment</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Report Generation</h3>
                            <p className="text-sm text-gray-600">Comprehensive health insights and recommendations</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Handling</h2>
            <div className="space-y-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">400 Bad Request</h3>
                    <p className="text-red-700 mb-2">Invalid file format, missing parameters, or malformed data</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "Invalid file format or missing required parameters",
  "pipeline_stage": "pdf_validation",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">422 Unprocessable Entity</h3>
                    <p className="text-red-700 mb-2">PDF processing or analysis failure</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "Unable to extract meaningful biomarker data",
  "pipeline_stage": "biomarker_extraction",
  "partial_results": {
    "extracted_text": "Raw text from PDF...",
    "extraction_confidence": 0.3
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">503 Service Unavailable</h3>
                    <p className="text-red-700 mb-2">Dependent service (Service 1 or 2) is unavailable</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        <pre>{`{
  "status": "error",
  "message": "Dependent service unavailable",
  "failed_service": "service1",
  "retry_after": "30 seconds",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">🏥 Clinical Applications</h3>
                    <ul className="text-blue-800 space-y-2 text-sm">
                        <li>• Patient portal integrations</li>
                        <li>• Electronic health record systems</li>
                        <li>• Telemedicine platforms</li>
                        <li>• Clinical decision support tools</li>
                    </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">🔬 Research & Analytics</h3>
                    <ul className="text-green-800 space-y-2 text-sm">
                        <li>• Population health studies</li>
                        <li>• Clinical research data processing</li>
                        <li>• Health trend analysis</li>
                        <li>• Biomarker research platforms</li>
                    </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">💼 Commercial Solutions</h3>
                    <ul className="text-purple-800 space-y-2 text-sm">
                        <li>• Health and wellness apps</li>
                        <li>• Insurance risk assessment</li>
                        <li>• Corporate wellness programs</li>
                        <li>• Personalized health coaching</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-3">🔄 Automation</h3>
                    <ul className="text-yellow-800 space-y-2 text-sm">
                        <li>• Batch processing of lab reports</li>
                        <li>• Automated health screening</li>
                        <li>• Report generation workflows</li>
                        <li>• Alert and notification systems</li>
                    </ul>
                </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">🚀 Why Use Service 3?</h3>
                <ul className="text-purple-800 space-y-2">
                    <li>• <strong>Simplicity:</strong> Single API call for complete processing</li>
                    <li>• <strong>Reliability:</strong> Built-in error handling and service dependencies</li>
                    <li>• <strong>Performance:</strong> Optimized pipeline reduces overall processing time</li>
                    <li>• <strong>Completeness:</strong> Full spectrum from PDF to actionable insights</li>
                    <li>• <strong>Consistency:</strong> Standardized output format across all processing</li>
                </ul>
            </div>
        </div>
    );
};

export default Service3Docs;
