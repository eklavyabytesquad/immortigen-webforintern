'use client';

import React, { useState, useEffect } from 'react';
import supabase from '../app/utils/supabase';

const ApiStatusPage = () => {
    const [statusData, setStatusData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [error, setError] = useState(null);

    const fetchStatusData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const { data, error } = await supabase
                .from('endpoint_status_logs')
                .select('*')
                .order('checked_at', { ascending: false })
                .limit(100);

            if (error) throw error;

            // Group by service and get latest status for each
            const groupedData = data.reduce((acc, log) => {
                const key = `${log.service_type}_${log.endpoint_path}`;
                if (!acc[key] || new Date(log.checked_at) > new Date(acc[key].checked_at)) {
                    acc[key] = log;
                }
                return acc;
            }, {});

            setStatusData(Object.values(groupedData));
            setLastRefresh(new Date());
        } catch (err) {
            setError(err.message);
            console.error('Error fetching status data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatusData();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchStatusData, 30000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'green': return 'bg-green-500';
            case 'yellow': return 'bg-yellow-500';
            case 'red': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'green': return 'text-green-600';
            case 'yellow': return 'text-yellow-600';
            case 'red': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getServiceIcon = (serviceType) => {
        switch (serviceType) {
            case 'service1': return '🩺';
            case 'service2': return '🧬';
            case 'service3': return '🔄';
            default: return '⚙️';
        }
    };

    const getServiceName = (serviceType) => {
        switch (serviceType) {
            case 'service1': return 'PDF to Structured Data';
            case 'service2': return 'Structured Data Analysis';
            case 'service3': return 'Combined Processing';
            default: return 'Unknown Service';
        }
    };

    const formatDuration = (ms) => {
        if (ms < 1000) return `${ms}ms`;
        if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
        return `${(ms / 60000).toFixed(1)}m`;
    };

    const getOverallStatus = () => {
        if (statusData.length === 0) return 'unknown';
        const hasRed = statusData.some(item => item.status === 'red');
        const hasYellow = statusData.some(item => item.status === 'yellow');
        
        if (hasRed) return 'red';
        if (hasYellow) return 'yellow';
        return 'green';
    };

    const overallStatus = getOverallStatus();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">API Status Dashboard</h1>
                            <p className="text-gray-600">Real-time monitoring of Immortigen API services</p>
                        </div>
                        <button
                            onClick={fetchStatusData}
                            disabled={loading}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            <svg className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {loading ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>

                    {/* Overall Status Banner */}
                    <div className={`p-6 rounded-xl shadow-lg border-l-4 ${
                        overallStatus === 'green' ? 'bg-green-50 border-green-500' :
                        overallStatus === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                        overallStatus === 'red' ? 'bg-red-50 border-red-500' :
                        'bg-gray-50 border-gray-500'
                    }`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`w-4 h-4 rounded-full mr-3 ${getStatusColor(overallStatus)}`}></div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Overall System Status: 
                                        <span className={`ml-2 ${getStatusTextColor(overallStatus)} capitalize`}>
                                            {overallStatus === 'green' ? 'All Systems Operational' :
                                             overallStatus === 'yellow' ? 'Some Issues Detected' :
                                             overallStatus === 'red' ? 'Service Disruption' : 'Unknown'}
                                        </span>
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        Last updated: {lastRefresh.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">{statusData.length}</div>
                                <div className="text-sm text-gray-600">Services Monitored</div>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span className="text-red-700">Error loading status data: {error}</span>
                        </div>
                    </div>
                )}

                {/* Service Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {statusData.map((service, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">{getServiceIcon(service.service_type)}</span>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{service.service_type.toUpperCase()}</h3>
                                            <p className="text-sm text-gray-600">{getServiceName(service.service_type)}</p>
                                        </div>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Endpoint:</span>
                                        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">
                                            {service.endpoint_path}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Status:</span>
                                        <span className={`text-sm font-medium capitalize ${getStatusTextColor(service.status)}`}>
                                            {service.status}
                                        </span>
                                    </div>

                                    {service.response_time_ms && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Response Time:</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {formatDuration(service.response_time_ms)}
                                            </span>
                                        </div>
                                    )}

                                    {service.response_status_code && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">HTTP Status:</span>
                                            <span className={`text-sm font-medium ${
                                                service.response_status_code < 300 ? 'text-green-600' :
                                                service.response_status_code < 400 ? 'text-yellow-600' :
                                                'text-red-600'
                                            }`}>
                                                {service.response_status_code}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Last Check:</span>
                                        <span className="text-sm text-gray-900">
                                            {new Date(service.checked_at).toLocaleTimeString()}
                                        </span>
                                    </div>

                                    {service.error_message && (
                                        <div className="mt-3 p-3 bg-red-50 rounded-lg">
                                            <p className="text-xs text-red-700 font-medium">Error:</p>
                                            <p className="text-xs text-red-600 mt-1">{service.error_message}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={`h-2 ${getStatusColor(service.status)}`}></div>
                        </div>
                    ))}
                </div>

                {/* Status Legend */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Legend</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                            <div>
                                <p className="font-medium text-green-600">Operational</p>
                                <p className="text-sm text-gray-600">Service is running normally</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                            <div>
                                <p className="font-medium text-yellow-600">Degraded</p>
                                <p className="text-sm text-gray-600">Service has minor issues</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                            <div>
                                <p className="font-medium text-red-600">Down</p>
                                <p className="text-sm text-gray-600">Service is not responding</p>
                            </div>
                        </div>
                    </div>
                </div>

                {loading && statusData.length === 0 && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-gray-600">Loading status data...</p>
                        </div>
                    </div>
                )}

                {!loading && statusData.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-600">No status data available</p>
                        <p className="text-sm text-gray-500 mt-1">Check back later or contact support</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApiStatusPage;
