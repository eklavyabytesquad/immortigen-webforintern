'use client';

import React from 'react';

const TroubleshootingDocs = () => {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Troubleshooting</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">🛠️ Common Issues & Solutions</h2>
                <p className="text-blue-800">
                    Find solutions to frequently encountered issues when integrating with the Immortigen API. 
                    This guide covers common problems, their causes, and step-by-step resolution methods.
                </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authentication Issues</h2>
            
            {/* API Key Problems */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔐 API Key Problems</h3>
                
                <div className="space-y-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <h4 className="font-semibold text-red-900 mb-2">Problem: &quot;API key is required&quot; error</h4>
                        <p className="text-red-800 mb-3">You&apos;re getting a 401 error with message &quot;API key is required&quot;</p>
                        
                        <div className="bg-white rounded p-3 mb-3">
                            <h5 className="font-medium text-gray-900 mb-2">Possible Causes:</h5>
                            <ul className="text-gray-700 space-y-1 text-sm">
                                <li>• Missing X-API-Key header</li>
                                <li>• Header name is incorrect (case-sensitive)</li>
                                <li>• API key is empty or undefined</li>
                            </ul>
                        </div>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <p className="text-green-800 mb-1">1. Verify header format:</p>
                                    <div className="bg-gray-900 text-green-400 p-2 rounded text-xs">
                                        <code>headers: {{ 'X-API-Key': 'your_api_key_here' }}</code>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-green-800 mb-1">2. Check for typos in header name (X-API-Key, not x-api-key)</p>
                                </div>
                                <div>
                                    <p className="text-green-800 mb-1">3. Ensure API key variable is not undefined</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <h4 className="font-semibold text-red-900 mb-2">Problem: &quot;Invalid API key&quot; error</h4>
                        <p className="text-red-800 mb-3">Getting 401/403 error with &quot;Invalid API key&quot;</p>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Use the test key: <code className="bg-green-100 px-1 rounded text-xs">test_sk_1234567890abcdef1234567890abcdef12345678</code></li>
                                <li>• Check for extra spaces or line breaks in the key</li>
                                <li>• Verify you&quot;re using the correct environment (dev/prod)</li>
                                <li>• Contact support if you need a production API key</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">File Upload Issues</h2>
            
            {/* PDF Upload Problems */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 PDF Upload Problems</h3>
                
                <div className="space-y-4">
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">Problem: &quot;File must be a PDF&quot; error</h4>
                        <p className="text-yellow-800 mb-3">Getting 400 error when uploading what appears to be a PDF</p>
                        
                        <div className="bg-white rounded p-3 mb-3">
                            <h5 className="font-medium text-gray-900 mb-2">Check File Properties:</h5>
                            <div className="bg-gray-900 text-green-400 p-2 rounded text-xs mb-2">
                                <pre>{`// JavaScript: Check file type
console.log('File type:', file.type);
console.log('File name:', file.name);
console.log('File size:', file.size);

// Should show:
// File type: application/pdf
// File name: report.pdf
// File size: 1234567`}</pre>
                            </div>
                        </div>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Ensure file extension is .pdf</li>
                                <li>• Check MIME type is application/pdf</li>
                                <li>• Try re-saving the file as PDF</li>
                                <li>• Verify file is not corrupted</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <h4 className="font-semibold text-red-900 mb-2">Problem: &quot;File size exceeds maximum limit&quot; error</h4>
                        <p className="text-red-800 mb-3">413 error - file is too large</p>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Compress PDF to reduce file size</li>
                                <li>• Remove unnecessary images or content</li>
                                <li>• Split multi-page documents</li>
                                <li>• Current limit: 10MB for PDFs, 1MB for JSON</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                        <h4 className="font-semibold text-orange-900 mb-2">Problem: &quot;Unable to extract biomarker data&quot; error</h4>
                        <p className="text-orange-800 mb-3">422 error - PDF processed but no data extracted</p>
                        
                        <div className="bg-white rounded p-3 mb-3">
                            <h5 className="font-medium text-gray-900 mb-2">Common Causes:</h5>
                            <ul className="text-gray-700 space-y-1 text-sm">
                                <li>• PDF is an image scan (needs OCR)</li>
                                <li>• Non-standard lab report format</li>
                                <li>• Password-protected PDF</li>
                                <li>• Corrupted or malformed PDF</li>
                                <li>• Document doesn&apos;t contain lab data</li>
                            </ul>
                        </div>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Use text-based PDFs when possible</li>
                                <li>• Ensure PDF contains actual lab report data</li>
                                <li>• Try a different lab report from the same source</li>
                                <li>• Contact support for custom format assistance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Network & Connection Issues</h2>
            
            {/* Network Problems */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🌐 Network Problems</h3>
                
                <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Problem: Connection timeout or network errors</h4>
                        <p className="text-blue-800 mb-3">Requests failing with network errors or timeouts</p>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Diagnostic Steps:</h5>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <p className="text-green-800 mb-1">1. Check service health:</p>
                                    <div className="bg-gray-900 text-green-400 p-2 rounded text-xs">
                                        <code>curl http://localhost:8001/service1/health</code>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-green-800 mb-1">2. Verify base URLs:</p>
                                    <ul className="text-green-700 ml-4 space-y-1">
                                        <li>• Service 1: http://localhost:8001</li>
                                        <li>• Service 2: http://localhost:8002</li>
                                        <li>• Service 3: http://localhost:8003</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-green-800 mb-1">3. Check if services are running:</p>
                                    <div className="bg-gray-900 text-green-400 p-2 rounded text-xs">
                                        <code>netstat -an | grep &quot;800[1-3]&quot;</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Problem: CORS errors in browser</h4>
                        <p className="text-purple-800 mb-3">Browser blocking requests due to CORS policy</p>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Use a proxy server for local development</li>
                                <li>• Make API calls from your backend, not frontend</li>
                                <li>• Use browser dev tools to bypass CORS (dev only)</li>
                                <li>• Configure proper CORS headers on your server</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Format Issues</h2>
            
            {/* Data Format Problems */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Data Format Problems</h3>
                
                <div className="space-y-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <h4 className="font-semibold text-red-900 mb-2">Problem: &quot;Invalid biomarker data format&quot; error</h4>
                        <p className="text-red-800 mb-3">422 error when sending data to Service 2</p>
                        
                        <div className="bg-white rounded p-3 mb-3">
                            <h5 className="font-medium text-gray-900 mb-2">Required Format:</h5>
                            <div className="bg-gray-900 text-green-400 p-2 rounded text-xs">
                                <pre>{`{
  "biomarkers": [
    {
      "name": "Glucose",           // Required
      "value": 95,                 // Required (number)
      "unit": "mg/dL",            // Required
      "reference_range": "70-99 mg/dL"  // Required
    }
  ]
}`}</pre>
                            </div>
                        </div>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Common Fixes:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Ensure all required fields are present</li>
                                <li>• Check that &apos;value&apos; is a number, not string</li>
                                <li>• Verify JSON structure is valid</li>
                                <li>• Use proper biomarker names (case-sensitive)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">Problem: &quot;Unsupported biomarker&quot; error</h4>
                        <p className="text-yellow-800 mb-3">Some biomarkers not recognized by the system</p>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Use standard biomarker names (e.g., &quot;Glucose&quot; not &quot;Blood Sugar&quot;)</li>
                                <li>• Check supported biomarkers list in Service 2 documentation</li>
                                <li>• Remove unsupported biomarkers from request</li>
                                <li>• Contact support to add new biomarker types</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Performance Issues</h2>
            
            {/* Performance Problems */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Performance Problems</h3>
                
                <div className="space-y-4">
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                        <h4 className="font-semibold text-orange-900 mb-2">Problem: Slow response times</h4>
                        <p className="text-orange-800 mb-3">API calls taking longer than expected</p>
                        
                        <div className="bg-white rounded p-3 mb-3">
                            <h5 className="font-medium text-gray-900 mb-2">Expected Response Times:</h5>
                            <ul className="text-gray-700 space-y-1 text-sm">
                                <li>• Service 1 (PDF): 2-5 seconds</li>
                                <li>• Service 2 (Analysis): 1-3 seconds</li>
                                <li>• Service 3 (Combined): 3-8 seconds</li>
                            </ul>
                        </div>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Optimization Tips:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Reduce PDF file size and complexity</li>
                                <li>• Use Service 1 + 2 separately for caching</li>
                                <li>• Implement request timeouts (30-45 seconds)</li>
                                <li>• Monitor processing times and set alerts</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <h4 className="font-semibold text-red-900 mb-2">Problem: &quot;Processing timeout&quot; error</h4>
                        <p className="text-red-800 mb-3">504 error - request timed out</p>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Reduce file size or complexity</li>
                                <li>• Retry with smaller chunks of data</li>
                                <li>• Increase client timeout settings</li>
                                <li>• Use async processing for large files</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Problem: Rate limit exceeded</h4>
                        <p className="text-blue-800 mb-3">429 error - too many requests</p>
                        
                        <div className="bg-green-50 rounded p-3">
                            <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                            <ul className="text-green-800 space-y-1 text-sm">
                                <li>• Implement exponential backoff retry</li>
                                <li>• Respect retry_after values in error responses</li>
                                <li>• Batch requests instead of concurrent calls</li>
                                <li>• Contact support for higher rate limits</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Dependencies</h2>
            
            {/* Service Dependencies */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 Service Dependencies</h3>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Problem: Service 3 dependency failures</h4>
                    <p className="text-purple-800 mb-3">503 error - dependent service unavailable</p>
                    
                    <div className="bg-white rounded p-3 mb-3">
                        <h5 className="font-medium text-gray-900 mb-2">Check Dependencies:</h5>
                        <div className="bg-gray-900 text-green-400 p-2 rounded text-xs">
                            <pre>{`# Check all service health
curl http://localhost:8001/service1/health
curl http://localhost:8002/service2/health
curl http://localhost:8003/service3/health

# Expected response for healthy service:
{
  "status": "healthy",
  "service": "service1",
  "version": "1.0.0"
}`}</pre>
                        </div>
                    </div>
                    
                    <div className="bg-green-50 rounded p-3">
                        <h5 className="font-medium text-green-900 mb-2">Solutions:</h5>
                        <ul className="text-green-800 space-y-1 text-sm">
                            <li>• Ensure all services are running</li>
                            <li>• Check Service 1 and 2 individually</li>
                            <li>• Restart failed services</li>
                            <li>• Wait for service recovery and retry</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Debug Tools & Techniques</h2>
            
            {/* Debug Tools */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Debug Tools & Techniques</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-3">🌐 Browser Tools</h4>
                        <ul className="text-blue-800 space-y-2 text-sm">
                            <li>• Use Network tab to inspect requests</li>
                            <li>• Check Console for JavaScript errors</li>
                            <li>• Verify request headers and body</li>
                            <li>• Look for CORS errors</li>
                        </ul>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-3">💻 Command Line</h4>
                        <ul className="text-green-800 space-y-2 text-sm">
                            <li>• Use cURL for direct testing</li>
                            <li>• Add -v flag for verbose output</li>
                            <li>• Test with Postman or similar tools</li>
                            <li>• Check network connectivity</li>
                        </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-3">📝 Logging</h4>
                        <ul className="text-purple-800 space-y-2 text-sm">
                            <li>• Log all request/response data</li>
                            <li>• Include request_id for support</li>
                            <li>• Track processing times</li>
                            <li>• Monitor error patterns</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-900 mb-3">🔧 Testing</h4>
                        <ul className="text-yellow-800 space-y-2 text-sm">
                            <li>• Start with health check endpoints</li>
                            <li>• Use sample data files</li>
                            <li>• Test error scenarios</li>
                            <li>• Verify with different file types</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Help</h2>
            
            {/* Getting Help */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">🆘 When You Need Support</h3>
                
                <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">📧 Contact Information</h4>
                        <ul className="text-gray-700 space-y-1 text-sm">
                            <li>• Email: api-support@Immortigen.com</li>
                            <li>• Documentation: <a href="/sandbox/api-docs" className="text-blue-600 underline">API Docs</a></li>
                            <li>• Status Page: <a href="/sandbox/api-status" className="text-blue-600 underline">Service Status</a></li>
                            <li>• Interactive Testing: <a href="/sandbox" className="text-blue-600 underline">Sandbox</a></li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">📋 Information to Include</h4>
                        <ul className="text-gray-700 space-y-1 text-sm">
                            <li>• Request ID (from error response)</li>
                            <li>• Timestamp of the issue</li>
                            <li>• Complete error message</li>
                            <li>• Sample request (sanitized)</li>
                            <li>• Expected vs actual behavior</li>
                            <li>• Your environment (dev/staging/prod)</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">⚡ Before Contacting Support</h4>
                        <ul className="text-gray-700 space-y-1 text-sm">
                            <li>• Check the <a href="/sandbox/api-status" className="text-blue-600 underline">status page</a> for known issues</li>
                            <li>• Review this troubleshooting guide</li>
                            <li>• Test with the sample data provided</li>
                            <li>• Try the interactive sandbox</li>
                            <li>• Check your API key is correct</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">✅ Quick Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium text-green-800 mb-2">Basic Checks:</h4>
                        <ul className="text-green-700 space-y-1 text-sm">
                            <li>□ API key is correct</li>
                            <li>□ Headers are properly set</li>
                            <li>□ File format is valid</li>
                            <li>□ File size under limits</li>
                            <li>□ JSON structure is valid</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-green-800 mb-2">Service Checks:</h4>
                        <ul className="text-green-700 space-y-1 text-sm">
                            <li>□ Health endpoints respond</li>
                            <li>□ Network connectivity OK</li>
                            <li>□ No service outages</li>
                            <li>□ Rate limits not exceeded</li>
                            <li>□ Timeouts configured properly</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TroubleshootingDocs;
