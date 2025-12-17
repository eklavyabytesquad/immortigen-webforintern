'use client';

import React, { useState } from 'react';

const ApiDocsSidebar = ({ activeSection, onSectionChange }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sections = [
        {
            id: 'introduction',
            name: 'Introduction',
            icon: '📖'
        },
        {
            id: 'authentication',
            name: 'Authentication',
            icon: '🔐'
        },
        {
            id: 'service1',
            name: 'Service 1',
            icon: '🩺',
            subsections: [
                { id: 'service1-overview', name: 'Overview' },
                { id: 'service1-endpoint', name: 'Convert PDF' }
            ]
        },
        {
            id: 'service2',
            name: 'Service 2',
            icon: '🧬',
            subsections: [
                { id: 'service2-overview', name: 'Overview' },
                { id: 'service2-json', name: 'Process JSON' },
                { id: 'service2-file', name: 'Upload File' }
            ]
        },
        {
            id: 'service3',
            name: 'Service 3',
            icon: '🔄',
            subsections: [
                { id: 'service3-overview', name: 'Overview' },
                { id: 'service3-combined', name: 'Combined Processing' }
            ]
        },
        {
            id: 'errors',
            name: 'Error Codes',
            icon: '⚠️'
        },
        {
            id: 'examples',
            name: 'Code Examples',
            icon: '💻'
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
                    {!isCollapsed && <span className="ml-2 text-sm font-medium">API Documentation</span>}
                </button>
            </div>

            {/* Navigation */}
            <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                {sections.map((section) => (
                    <div key={section.id} className="mb-1">
                        <button
                            onClick={() => onSectionChange(section.id)}
                            className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                                activeSection === section.id
                                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                                    : 'hover:bg-gray-100 text-gray-700 border-2 border-transparent'
                            }`}
                        >
                            <div className="flex items-center">
                                <span className="text-lg">{section.icon}</span>
                                {!isCollapsed && (
                                    <div className="ml-3 flex-1">
                                        <div className="font-medium text-sm">{section.name}</div>
                                    </div>
                                )}
                            </div>
                        </button>
                        
                        {/* Subsections */}
                        {section.subsections && !isCollapsed && activeSection === section.id && (
                            <div className="ml-4 mt-2 space-y-1">
                                {section.subsections.map((subsection) => (
                                    <button
                                        key={subsection.id}
                                        onClick={() => onSectionChange(subsection.id)}
                                        className="w-full p-2 text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                    >
                                        {subsection.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApiDocsSidebar;
