'use client';

import React from 'react';
import SandboxNavbar from '../../../components/SandboxNavbar';
import SandboxFooter from '../../../components/SandboxFooter';
import ApiStatusPage from '../../../components/ApiStatusPage';

const ApiStatusRoute = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <SandboxNavbar />
            <div className="flex-1">
                <ApiStatusPage />
            </div>
            <SandboxFooter />
        </div>
    );
};

export default ApiStatusRoute;
