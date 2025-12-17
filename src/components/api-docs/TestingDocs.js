'use client';

import React from 'react';

const TestingDocs = () => {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Testing & Examples</h1>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                <h2 className="text-xl font-semibold text-green-900 mb-2">🧪 Interactive Testing</h2>
                <p className="text-green-800">
                    Explore and test the Immortigen API endpoints with real examples, sample data, 
                    and interactive tools to help you integrate our services effectively.
                </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Test API Key</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-blue-900 mb-3">Use this test API key for all examples below:</p>
                <div className="bg-blue-100 p-3 rounded font-mono text-sm break-all">
                    test_sk_1234567890abcdef1234567890abcdef12345678
                </div>
                <p className="text-sm text-blue-700 mt-3">
                    This key has full access to all endpoints for testing purposes.
                </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">JavaScript Examples</h2>

            {/* Service 1 Example */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service 1: PDF Processing</h3>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`// Upload and process PDF lab report
async function processPDF(pdfFile) {
  const formData = new FormData();
  formData.append('pdf', pdfFile);
  
  try {
    const response = await fetch('http://localhost:8001/service1/convert-pdf', {
      method: 'POST',
      headers: {
        'X-API-Key': 'test_sk_1234567890abcdef1234567890abcdef12345678'
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const result = await response.json();
    console.log('Extracted biomarkers:', result.data.biomarkers);
    return result.data;
    
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}

// Example usage
const fileInput = document.getElementById('pdf-upload');
fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    try {
      const extractedData = await processPDF(file);
      displayResults(extractedData);
    } catch (error) {
      displayError(error.message);
    }
  }
});`}</pre>
                </div>
            </div>

            {/* Service 2 Example */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service 2: Data Analysis</h3>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`// Analyze biomarker data
async function analyzeBiomarkers(biomarkerData, patientInfo = {}) {
  const requestBody = {
    biomarkers: biomarkerData,
    patient_info: patientInfo
  };
  
  try {
    const response = await fetch('http://localhost:8002/service2/process-structured-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'test_sk_1234567890abcdef1234567890abcdef12345678'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const result = await response.json();
    return result.data.analysis;
    
  } catch (error) {
    console.error('Error analyzing biomarkers:', error);
    throw error;
  }
}

// Example biomarker data
const sampleBiomarkers = [
  {
    name: "Glucose",
    value: 95,
    unit: "mg/dL",
    reference_range: "70-99 mg/dL"
  },
  {
    name: "Total Cholesterol",
    value: 220,
    unit: "mg/dL",
    reference_range: "<200 mg/dL"
  }
];

const patientInfo = {
  age: 35,
  gender: "male",
  weight: 75,
  height: 175
};

// Run analysis
analyzeBiomarkers(sampleBiomarkers, patientInfo)
  .then(analysis => {
    console.log('Health Score:', analysis.overall_health_score);
    console.log('Risk Level:', analysis.risk_level);
    console.log('Organ Analysis:', analysis.organ_analysis);
  })
  .catch(error => console.error('Analysis failed:', error));`}</pre>
                </div>
            </div>

            {/* Service 3 Example */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service 3: Combined Pipeline</h3>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre>{`// Complete PDF to insights pipeline
async function processLabReport(pdfFile, patientData = {}) {
  const formData = new FormData();
  formData.append('pdf', pdfFile);
  
  // Add optional patient data
  if (patientData.age) formData.append('patient_age', patientData.age);
  if (patientData.gender) formData.append('patient_gender', patientData.gender);
  formData.append('include_recommendations', 'true');
  
  try {
    const response = await fetch('http://localhost:8003/service3/process-combined', {
      method: 'POST',
      headers: {
        'X-API-Key': 'test_sk_1234567890abcdef1234567890abcdef12345678'
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const result = await response.json();
    return result.data;
    
  } catch (error) {
    console.error('Error processing lab report:', error);
    throw error;
  }
}

// Example usage with progress tracking
async function handleLabReportUpload(file, patient) {
  try {
    console.log('Starting PDF processing...');
    
    const results = await processLabReport(file, patient);
    
    console.log('Processing completed!');
    console.log('Extraction Results:', results.extraction_results);
    console.log('Analysis Results:', results.analysis_results);
    console.log('Total Processing Time:', results.total_processing_time, 'seconds');
    
    // Display results in UI
    displayHealthScore(results.analysis_results.overall_health_score);
    displayOrganAnalysis(results.analysis_results.organ_analysis);
    displayRecommendations(results.analysis_results.detailed_insights);
    
  } catch (error) {
    console.error('Processing failed:', error);
    displayError(\`Processing failed: \${error.message}\`);
  }
}`}</pre>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">cURL Examples</h2>

            <div className="space-y-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Health Check (All Services)</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <pre>{`# Check Service 1 health
curl -X GET "http://localhost:8001/service1/health"

# Check Service 2 health  
curl -X GET "http://localhost:8002/service2/health"

# Check Service 3 health
curl -X GET "http://localhost:8003/service3/health"`}</pre>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">PDF Processing (Service 1)</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <pre>{`# Process PDF file
curl -X POST "http://localhost:8001/service1/convert-pdf" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "pdf=@sample_lab_report.pdf"

# Alternative endpoint with filename
curl -X POST "http://localhost:8001/service1/convert-pdf-file" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "file=@patient_report.pdf" \\
  -F "filename=patient_report_2024.pdf"`}</pre>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Analysis (Service 2)</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <pre>{`# Analyze structured biomarker data
curl -X POST "http://localhost:8002/service2/process-structured-data" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -H "Content-Type: application/json" \\
  -d '{
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
      }
    ],
    "patient_info": {
      "age": 35,
      "gender": "male"
    }
  }'

# Process JSON file
curl -X POST "http://localhost:8002/service2/process-json-file" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "file=@biomarkers.json"`}</pre>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Combined Pipeline (Service 3)</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <pre>{`# Complete PDF to insights pipeline
curl -X POST "http://localhost:8003/service3/process-combined" \\
  -H "X-API-Key: test_sk_1234567890abcdef1234567890abcdef12345678" \\
  -F "pdf=@lab_report.pdf" \\
  -F "patient_age=35" \\
  -F "patient_gender=male" \\
  -F "include_recommendations=true"`}</pre>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sample Data Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">📄 Sample PDF Reports</h3>
                    <p className="text-blue-800 mb-4">Download sample lab reports for testing:</p>
                    <ul className="text-blue-700 space-y-2 text-sm">
                        <li>• <a href="#" className="underline hover:text-blue-900">Basic Metabolic Panel</a></li>
                        <li>• <a href="#" className="underline hover:text-blue-900">Comprehensive Blood Chemistry</a></li>
                        <li>• <a href="#" className="underline hover:text-blue-900">Lipid Panel Report</a></li>
                        <li>• <a href="#" className="underline hover:text-blue-900">Multi-page Lab Results</a></li>
                    </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">📊 Sample JSON Data</h3>
                    <p className="text-green-800 mb-4">JSON files for Service 2 testing:</p>
                    <ul className="text-green-700 space-y-2 text-sm">
                        <li>• <a href="#" className="underline hover:text-green-900">Basic Biomarkers</a></li>
                        <li>• <a href="#" className="underline hover:text-green-900">Extended Metabolic Panel</a></li>
                        <li>• <a href="#" className="underline hover:text-green-900">Cardiovascular Markers</a></li>
                        <li>• <a href="#" className="underline hover:text-green-900">Patient with Demographics</a></li>
                    </ul>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interactive Sandbox</h2>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">🎮 Try it Live</h3>
                <p className="text-purple-800 mb-4">
                    Use our interactive sandbox to test all endpoints with real data, see live responses, 
                    and explore the API capabilities without writing any code.
                </p>
                <a 
                    href="/sandbox" 
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Open Interactive Sandbox →
                </a>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Testing Checklist</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Recommended Testing Flow</h3>
                <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-gray-700">Test health endpoints for all services</span>
                    </div>
                    <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-gray-700">Upload a sample PDF to Service 1</span>
                    </div>
                    <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-gray-700">Send extracted data to Service 2</span>
                    </div>
                    <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-gray-700">Test end-to-end pipeline with Service 3</span>
                    </div>
                    <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-gray-700">Test error handling with invalid data</span>
                    </div>
                    <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-gray-700">Verify response times and performance</span>
                    </div>
                    <div className="flex items-start space-x-3">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-gray-700">Test with different patient demographics</span>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Performance Testing</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Load Testing Guidelines</h3>
                
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Rate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Concurrent</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeout</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Service 1</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 req/5s</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 requests</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30 seconds</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Service 2</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 req/3s</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 requests</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 seconds</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Service 3</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 req/8s</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 requests</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 seconds</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <h4 className="text-lg font-semibold text-yellow-900 mb-2">⚠️ Rate Limiting</h4>
                    <p className="text-yellow-800">
                        The test API key has rate limits. For production testing with higher volumes, 
                        contact us for a dedicated testing environment and API key.
                    </p>
                </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">🎯 Next Steps</h3>
                <ul className="text-green-800 space-y-2">
                    <li>• Start with the <a href="/sandbox" className="underline hover:text-green-900">Interactive Sandbox</a> for hands-on testing</li>
                    <li>• Download sample files and test with your own integration</li>
                    <li>• Review the error handling documentation for robust implementations</li>
                    <li>• Contact support for production API keys and higher rate limits</li>
                    <li>• Check out the troubleshooting section for common issues</li>
                </ul>
            </div>
        </div>
    );
};

export default TestingDocs;
