'use client';

import React, { useState } from 'react';
import SandboxNavbar from './SandboxNavbar';
import SandboxFooter from './SandboxFooter';
import IntroductionDocs from './api-docs/IntroductionDocs';
import AuthenticationDocs from './api-docs/AuthenticationDocs';
import ArchitectureDocs from './api-docs/ArchitectureDocs';
import Service1Docs from './api-docs/Service1Docs';
import Service2Docs from './api-docs/Service2Docs';
import Service3Docs from './api-docs/Service3Docs';
import TestingDocs from './api-docs/TestingDocs';
import ErrorHandlingDocs from './api-docs/ErrorHandlingDocs';
import TroubleshootingDocs from './api-docs/TroubleshootingDocs';

const ApiDocsPage = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    const sidebarItems = [
        {
            id: 'introduction',
            label: 'Introduction',
            icon: '📚'
        },
        {
            id: 'authentication',
            label: 'Authentication',
            icon: '🔐'
        },
        {
            id: 'architecture',
            label: 'Architecture',
            icon: '🏗️'
        },
        {
            id: 'service1',
            label: 'Service 1: Users API',
            icon: '👥'
        },
        {
            id: 'service2',
            label: 'Service 2: Biomarkers API',
            icon: '🧬'
        },
        {
            id: 'service3',
            label: 'Service 3: Analytics API',
            icon: '📊'
        },
        {
            id: 'testing',
            label: 'Testing & Examples',
            icon: '🧪'
        },
        {
            id: 'error-handling',
            label: 'Error Handling',
            icon: '⚠️'
        },
        {
            id: 'troubleshooting',
            label: 'Troubleshooting',
            icon: '🔧'
        }
    ];

    const renderDocumentationContent = () => {
        switch (activeSection) {
            case 'introduction':
                return <IntroductionDocs />;
            case 'authentication':
                return <AuthenticationDocs />;
            case 'architecture':
                return <ArchitectureDocs />;
            case 'service1':
                return <Service1Docs />;
            case 'service2':
                return <Service2Docs />;
            case 'service3':
                return <Service3Docs />;
            case 'testing':
                return <TestingDocs />;
            case 'error-handling':
                return <ErrorHandlingDocs />;
            case 'troubleshooting':
                return <TroubleshootingDocs />;
            default:
                return <IntroductionDocs />;
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Fixed Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <SandboxNavbar />
            </div>

            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <div className="w-64 bg-gray-50 border-r border-gray-200 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h2>
                        <nav className="space-y-1">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-3 ${
                                        activeSection === item.id
                                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="flex-1">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 ml-64">
                    <div className="p-8">
                        <div className="max-w-4xl mx-auto">
                            {renderDocumentationContent()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <SandboxFooter />
        </div>
    );
};

export default ApiDocsPage;