'use client';

import React, { useState } from 'react';

const SideMenu = ({ activeEndpoint, onEndpointChange }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const endpoints = [
        {
            id: 'service1',
            name: 'PDF to Structured Data',
            description: 'Convert lab report PDF to structured JSON',
            icon: '🩺',
            methods: ['POST']
        },
        {
            id: 'service2',
            name: 'Structured Data Analysis',
            description: 'Process structured data to organ analysis',
            icon: '🧬',
            methods: ['POST']
        },
        {
            id: 'service3',
            name: 'Combined Processing',
            description: 'Complete PDF to analysis pipeline',
            icon: '�',
            methods: ['POST']
        }
    ];

    return (
        <div className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            {/* Toggle Button */}
            <div className="p-4 border-b border-gray-200">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center justify-center w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                    <svg 
                        className={`w-5 h-5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                    {!isCollapsed && <span className="ml-2 text-sm font-medium">Endpoints</span>}
                </button>
            </div>

            {/* Endpoints List */}
            <div className="p-2">
                {endpoints.map((endpoint) => (
                    <button
                        key={endpoint.id}
                        onClick={() => onEndpointChange(endpoint.id)}
                        className={`w-full mb-2 p-3 rounded-lg text-left transition-all duration-200 ${
                            activeEndpoint === endpoint.id
                                ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                                : 'hover:bg-gray-100 text-gray-700 border-2 border-transparent'
                        }`}
                    >
                        <div className="flex items-center">
                            <span className="text-xl">{endpoint.icon}</span>
                            {!isCollapsed && (
                                <div className="ml-3 flex-1">
                                    <div className="font-medium text-sm">{endpoint.name}</div>
                                    <div className="text-xs text-gray-500 mt-1">{endpoint.description}</div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {endpoint.methods.map((method) => (
                                            <span
                                                key={method}
                                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                    method === 'GET' ? 'bg-green-100 text-green-800' :
                                                    method === 'POST' ? 'bg-blue-100 text-blue-800' :
                                                    method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {method}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>


        </div>
    );
};

export default SideMenu;
