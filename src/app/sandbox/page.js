'use client';

import React, { useState } from 'react';
import SandboxNavbar from '../../components/SandboxNavbar';
import SideMenu from '../../components/SideMenu';
import SandboxFooter from '../../components/SandboxFooter';
import Service1Endpoint from '../../components/UsersEndpoint';
import Service2Endpoint from '../../components/BiomarkersEndpoint';
import Service3Endpoint from '../../components/AnalyticsEndpoint';

const SandboxPage = () => {
    const [activeEndpoint, setActiveEndpoint] = useState('service1');

    const renderEndpointComponent = () => {
        switch (activeEndpoint) {
            case 'service1':
                return <Service1Endpoint />;
            case 'service2':
                return <Service2Endpoint />;
            case 'service3':
                return <Service3Endpoint />;
            default:
                return <Service1Endpoint />;
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Navbar */}
            <SandboxNavbar />
            
            {/* Main Content */}
            <div className="flex flex-1">
                {/* Side Menu */}
                <SideMenu 
                    activeEndpoint={activeEndpoint} 
                    onEndpointChange={setActiveEndpoint} 
                />
                
                {/* Content Area */}
                <div className="flex-1 overflow-auto">
                    {renderEndpointComponent()}
                </div>
            </div>

            {/* Footer */}
            <SandboxFooter />
        </div>
    );
};

export default SandboxPage;
