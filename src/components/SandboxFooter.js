'use client';

import React from 'react';

const SandboxFooter = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-4 px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600">API Version:</span>
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            v1.0.0
                        </span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Server Status: </span>
                        <span className="text-sm font-medium text-green-600">Online</span>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>localhost:8000</span>
                    <span>•</span>
                    <span>Immortigen API</span>
                    <span>•</span>
                    <span>Health Analytics Platform</span>
                </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
                    <div className="mb-1 sm:mb-0">
                        © 2024 Immortigen. All rights reserved.
                    </div>
                    <div className="flex space-x-4">
                        <span>Documentation</span>
                        <span>•</span>
                        <span>Support</span>
                        <span>•</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SandboxFooter;
