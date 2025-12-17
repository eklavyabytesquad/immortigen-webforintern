"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { drawReportHeader } from "./common/ReportHeader";

// Risk type color configurations matching the design
const riskColors = {
  L: { 
    bg: { r: 21, g: 182, b: 108 }, 
    bgLight: { r: 21, g: 182, b: 108, a: 0.2 },
    text: "Low Risk",
    hex: "#15B66C",
    hexLight: "rgba(21, 182, 108, 0.2)"
  },
  M: { 
    bg: { r: 246, g: 155, b: 27 }, 
    bgLight: { r: 246, g: 155, b: 27, a: 0.2 },
    text: "Moderate Risk",
    hex: "#F69B1B",
    hexLight: "rgba(246, 155, 27, 0.2)"
  },
  H: { 
    bg: { r: 255, g: 79, b: 69 }, 
    bgLight: { r: 255, g: 79, b: 69, a: 0.2 },
    text: "High Risk",
    hex: "#FF4F45",
    hexLight: "rgba(255, 79, 69, 0.2)"
  }
};

// Primary color - rgba(85, 92, 245, 1)
const primaryColor = { r: 85, g: 92, b: 245 };

export default function CommonDiseasePdf({ diseaseData = [] }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    // Draw header on first page
    drawReportHeader(doc);
    
    // Section title
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
    doc.text("Common Diseases", 15, 38);
    
    // Table header
    let yPos = 48;
    doc.setFillColor(248, 250, 252);
    doc.rect(15, yPos, 180, 10, "F");
    
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.setTextColor(71, 85, 105);
    doc.text("Disease", 20, yPos + 7);
    doc.text("Comprehensive Risk", 145, yPos + 7);
    
    yPos += 15;
    
    // Disease rows
    diseaseData.forEach((item, index) => {
      // Check if we need a new page
      if (yPos > pageHeight - 25) {
        doc.addPage();
        drawReportHeader(doc);
        
        // Section title on new page
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
        doc.text("Common Diseases (Continued)", 15, 38);
        
        // Repeat table header
        yPos = 48;
        doc.setFillColor(248, 250, 252);
        doc.rect(15, yPos, 180, 10, "F");
        
        doc.setFontSize(9);
        doc.setFont(undefined, "bold");
        doc.setTextColor(71, 85, 105);
        doc.text("Disease", 20, yPos + 7);
        doc.text("Comprehensive Risk", 145, yPos + 7);
        yPos += 15;
      }
      
      const rowHeight = 12;
      
      // Alternating row background
      if (index % 2 === 0) {
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setFillColor(249, 250, 251);
      }
      doc.rect(15, yPos - 3, 180, rowHeight, "F");
      
      // Disease name
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.setTextColor(31, 41, 55);
      doc.text(item.disease, 20, yPos + 5);
      
      // Risk score with colored background
      const riskConfig = riskColors[item.risk_type];
      const scoreText = item.score.toString();
      const scoreBoxWidth = 35;
      const scoreBoxX = 155;
      
      // Draw colored background for score based on risk type
      doc.setFillColor(
        riskConfig.bg.r + Math.floor((255 - riskConfig.bg.r) * 0.7),
        riskConfig.bg.g + Math.floor((255 - riskConfig.bg.g) * 0.7),
        riskConfig.bg.b + Math.floor((255 - riskConfig.bg.b) * 0.7)
      );
      doc.roundedRect(scoreBoxX, yPos - 1, scoreBoxWidth, 9, 1, 1, "F");
      
      // Score text
      doc.setFontSize(9);
      doc.setFont(undefined, "bold");
      doc.setTextColor(riskConfig.bg.r, riskConfig.bg.g, riskConfig.bg.b);
      doc.text(scoreText, scoreBoxX + scoreBoxWidth / 2, yPos + 5, { align: "center" });
      
      yPos += rowHeight + 2;
    });
    
    // Convert to blob URL for preview
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setShowPreview(true);
  };

  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Common_Diseases_Report.pdf";
      link.click();
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  // Count by risk type
  const highRiskCount = diseaseData.filter(d => d.risk_type === "H").length;
  const moderateRiskCount = diseaseData.filter(d => d.risk_type === "M").length;
  const lowRiskCount = diseaseData.filter(d => d.risk_type === "L").length;

  return (
    <div className="space-y-6">
      {/* Generate Button */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Diseases Report</h2>
        <p className="text-gray-600 mb-6">
          Generate a comprehensive PDF report containing risk assessment for common diseases.
        </p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(255, 79, 69, 0.1)", borderColor: "rgba(255, 79, 69, 0.3)" }}>
            <h3 className="font-semibold" style={{ color: "#FF4F45" }}>High Risk</h3>
            <p className="text-2xl font-bold" style={{ color: "#FF4F45" }}>{highRiskCount}</p>
          </div>
          <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(246, 155, 27, 0.1)", borderColor: "rgba(246, 155, 27, 0.3)" }}>
            <h3 className="font-semibold" style={{ color: "#F69B1B" }}>Moderate Risk</h3>
            <p className="text-2xl font-bold" style={{ color: "#F69B1B" }}>{moderateRiskCount}</p>
          </div>
          <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(21, 182, 108, 0.1)", borderColor: "rgba(21, 182, 108, 0.3)" }}>
            <h3 className="font-semibold" style={{ color: "#15B66C" }}>Low Risk</h3>
            <p className="text-2xl font-bold" style={{ color: "#15B66C" }}>{lowRiskCount}</p>
          </div>
        </div>
        
        {/* Risk Legend */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Risk Legend:</span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: "#FF4F45" }}></span>
            <span className="text-sm text-gray-600">High Risk (70-100)</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: "#F69B1B" }}></span>
            <span className="text-sm text-gray-600">Moderate Risk (40-69)</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: "#15B66C" }}></span>
            <span className="text-sm text-gray-600">Low Risk (0-39)</span>
          </span>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={generatePDF}
            className="text-white font-semibold py-3 px-10 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ backgroundColor: "rgba(85, 92, 245, 1)" }}
          >
            Generate Common Diseases Report PDF
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Common Diseases Report Preview</h3>
              <div className="flex gap-3">
                <button
                  onClick={downloadPDF}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Download PDF
                </button>
                <button
                  onClick={closePreview}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="Common Diseases Report Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
