'use client';

import React from 'react';
import SandboxNavbar from '../../../components/SandboxNavbar';
import SandboxFooter from '../../../components/SandboxFooter';
import ApiDocsPage from '../../../components/ApiDocsPage';

const ApiDocsPageWrapper = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <SandboxNavbar />
            <div className="flex-1">
                <ApiDocsPage />
            </div>
            <SandboxFooter />
        </div>
    );
};

export default ApiDocsPageWrapper;
