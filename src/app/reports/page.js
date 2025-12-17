"use client";

import HeartReportPdf from "@/components/reports/HeartReportPdf";
import CommonDiseasePdf from "@/components/reports/CommonDiseasePdf";
import FitnessTopicsPdf from "@/components/reports/FitnessTopicsPdf";

// Import data from JSON files
import heartData from "./heartData.json";
import commonDiseasesData from "./commonDiseases.json";
import fitnessTopicsData from "./fitnessTopics.json";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Health Reports
          </h1>
          <p className="text-lg text-gray-600">
            Generate and download your comprehensive health PDF reports
          </p>
        </div>

        {/* Heart Biomarkers Report Section */}
        <div className="mb-12">
          <HeartReportPdf reportData={heartData} />
        </div>

        {/* Common Diseases Report Section */}
        <div className="mb-12">
          <CommonDiseasePdf diseaseData={commonDiseasesData} />
        </div>

        {/* Fitness & Performance Guide Section */}
        <div className="mb-12">
          <FitnessTopicsPdf topicsData={fitnessTopicsData} />
        </div>
      </div>
    </div>
  );
}