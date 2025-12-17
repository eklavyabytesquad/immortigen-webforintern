"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { 
  drawReportHeader, 
  drawReportFooter, 
  statusColors, 
  drawRiskScoreBar 
} from "./common/ReportHeader";

// Sample Heart data - can be passed as props or fetched
const defaultHeartData = {
  Heart: [
    {
      category: "Genetic",
      biomarker: "HDL cholesterol levels",
      description: "HDL helps remove LDL from arteries, preventing blockages and lowering heart attack or stroke risk.",
      status: "H"
    },
    {
      category: "Genetic",
      biomarker: "Hypertension",
      description: "High blood pressure strains the heart and vessels, increasing risk of attack, stroke, and failure.",
      status: "M"
    },
    {
      category: "Genetic",
      biomarker: "Heart failure",
      description: "The heart cannot pump enough blood to meet body demands.",
      status: "M"
    },
    {
      category: "Genetic",
      biomarker: "Coronary artery disease",
      description: "Narrowing or blockage of coronary arteries due to plaque buildup.",
      status: "H"
    },
    {
      category: "Genetic",
      biomarker: "Atrial fibrillation",
      description: "Irregular rapid heartbeat in the upper heart chambers.",
      status: "H"
    },
    {
      category: "Genetic",
      biomarker: "Myocardial infarction",
      description: "Heart attack caused by blocked blood supply leading to tissue damage.",
      status: "L"
    },
    {
      category: "Genetic",
      biomarker: "Omega-6/Omega-3 ratio",
      description: "High omega-6 to omega-3 ratio increases inflammation and heart disease risk.",
      status: "L"
    },
    {
      category: "Genetic",
      biomarker: "Peripheral artery disease",
      description: "Narrowing of peripheral arteries reducing blood flow and increasing heart attack risk.",
      status: "L"
    },
    {
      category: "Genetic",
      biomarker: "Venous thromboembolism",
      description: "Blood clots in veins that may travel to lungs or heart and cause complications.",
      status: "M"
    },
    {
      category: "Blood",
      biomarker: "Cholesterol-Total",
      description: "Total cholesterol circulating in blood.",
      status: "M",
      value: "205 mg/dL"
    },
    {
      category: "Blood",
      biomarker: "CHOL/HDL Ratio",
      description: "Balance between harmful and protective cholesterol.",
      status: "M",
      value: "3.53"
    },
    {
      category: "Blood",
      biomarker: "HDL Cholesterol",
      description: "Good cholesterol that clears vessel plaques.",
      status: "H",
      value: "58 mg/dL"
    },
    {
      category: "Blood",
      biomarker: "LDL Cholesterol",
      description: "Bad cholesterol that builds in artery walls.",
      status: "H",
      value: "130 mg/dL"
    },
    {
      category: "Blood",
      biomarker: "LDL/HDL Ratio",
      description: "Proportion of bad to good cholesterol.",
      status: "L",
      value: "2.24"
    },
    {
      category: "Blood",
      biomarker: "Non-HDL Cholesterol",
      description: "Captures all harmful cholesterol types.",
      status: "M",
      value: "170 mg/dL"
    },
    {
      category: "Blood",
      biomarker: "Triglycerides",
      description: "High levels contribute to artery blockage.",
      status: "M",
      value: "155 mg/dL"
    },
    {
      category: "Blood",
      biomarker: "VLDL",
      description: "Transports triglycerides and contributes to plaque formation.",
      status: "H",
      value: "40 mg/dL"
    },
    {
      category: "Blood",
      biomarker: "Homocysteine",
      description: "High levels damage blood vessels and increase heart disease risk.",
      status: "L",
      value: "12 µmol/L"
    },
    {
      category: "Blood",
      biomarker: "HbA1c",
      description: "Long-term blood sugar control indicator.",
      status: "L",
      value: "5.1%"
    },
    {
      category: "Blood",
      biomarker: "APO A1",
      description: "Protein in HDL that helps remove cholesterol from blood vessels.",
      status: "H",
      value: "95 mg/dL"
    },
    {
      category: "Blood",
      biomarker: "APO B",
      description: "Protein in LDL/VLDL; high levels indicate greater heart disease risk.",
      status: "H",
      value: "180 mg/dL"
    },
    { category: "Protein", biomarker: "ACE2", description: "", status: "M" },
    { category: "Protein", biomarker: "BMP4", description: "", status: "M" },
    { category: "Protein", biomarker: "CTF1", description: "", status: "M" },
    { category: "Protein", biomarker: "ERBB4", description: "", status: "L" },
    { category: "Protein", biomarker: "GALNT10", description: "", status: "L" },
    { category: "Protein", biomarker: "GALNT2", description: "", status: "L" },
    { category: "Protein", biomarker: "GALNT3", description: "", status: "M" },
    { category: "Protein", biomarker: "HDAC5", description: "", status: "M" },
    { category: "Protein", biomarker: "HDAC9", description: "", status: "M" },
    { category: "Protein", biomarker: "MYL11", description: "", status: "L" },
    { category: "Protein", biomarker: "MYL3", description: "", status: "M" },
    { category: "Protein", biomarker: "NPPC", description: "", status: "M" },
    { category: "Protein", biomarker: "NPY", description: "", status: "L" },
    { category: "Protein", biomarker: "PGF", description: "", status: "L" },
    { category: "Protein", biomarker: "SIRT1", description: "", status: "L" },
    { category: "Protein", biomarker: "TAB2", description: "", status: "M" },
    { category: "Protein", biomarker: "TGFB1", description: "", status: "M" }
  ]
};

export default function HeartReportPdf({ reportData = defaultHeartData }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    // Group data by category
    const geneticData = reportData.Heart.filter(item => item.category === "Genetic");
    const bloodData = reportData.Heart.filter(item => item.category === "Blood");
    const proteinData = reportData.Heart.filter(item => item.category === "Protein");
    
    let currentPage = 1;
    
    // ============ PAGE 1: GENETIC MARKERS ============
    drawReportHeader(doc);
    
    // Section title
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(55, 65, 81);
    doc.text("Genetic Markers for Heart", 15, 38);
    
    // Table header
    let yPos = 48;
    doc.setFillColor(248, 250, 252);
    doc.rect(15, yPos, 180, 10, "F");
    
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.setTextColor(71, 85, 105);
    doc.text("PGS", 20, yPos + 7);
    doc.text("Risk Score", 130, yPos + 7);
    
    yPos += 15;
    
    // Genetic markers rows
    geneticData.forEach((item, index) => {
      if (yPos > pageHeight - 30) {
        // Add new page
        doc.addPage();
        currentPage++;
        drawReportHeader(doc);
        yPos = 35;
      }
      
      // Alternating row background
      if (index % 2 === 0) {
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setFillColor(249, 250, 251);
      }
      doc.rect(15, yPos - 5, 180, 22, "F");
      
      // Left border accent
      doc.setFillColor(251, 191, 36);
      doc.rect(15, yPos - 5, 3, 22, "F");
      
      // Biomarker name
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.setTextColor(31, 41, 55);
      doc.text(item.biomarker, 22, yPos + 2);
      
      // Description
      doc.setFontSize(8);
      doc.setFont(undefined, "normal");
      doc.setTextColor(107, 114, 128);
      const descLines = doc.splitTextToSize(item.description || "No description available.", 85);
      doc.text(descLines, 22, yPos + 9);
      
      // Risk score bar
      drawRiskScoreBar(doc, 110, yPos, item.status);
      
      yPos += 25;
    });
    
    // ============ PAGE 2: BLOOD BIOMARKERS ============
    doc.addPage();
    currentPage++;
    drawReportHeader(doc);
    
    // Section title
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(55, 65, 81);
    doc.text("Blood Biomarker for Heart", 15, 38);
    
    // Table header
    yPos = 48;
    doc.setFillColor(248, 250, 252);
    doc.rect(15, yPos, 180, 10, "F");
    
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.setTextColor(71, 85, 105);
    doc.text("Marker", 20, yPos + 7);
    doc.text("Risk / Value", 160, yPos + 7);
    
    yPos += 15;
    
    // Blood markers rows
    bloodData.forEach((item, index) => {
      if (yPos > pageHeight - 30) {
        // Add new page
        doc.addPage();
        currentPage++;
        drawReportHeader(doc);
        
        // Repeat table header
        yPos = 35;
        doc.setFillColor(248, 250, 252);
        doc.rect(15, yPos, 180, 10, "F");
        doc.setFontSize(9);
        doc.setFont(undefined, "bold");
        doc.setTextColor(71, 85, 105);
        doc.text("Marker", 20, yPos + 7);
        doc.text("Risk / Value", 160, yPos + 7);
        yPos += 15;
      }
      
      // Alternating row background
      if (index % 2 === 0) {
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setFillColor(249, 250, 251);
      }
      doc.rect(15, yPos - 5, 180, 22, "F");
      
      // Left border accent
      doc.setFillColor(251, 191, 36);
      doc.rect(15, yPos - 5, 3, 22, "F");
      
      // Biomarker name
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.setTextColor(31, 41, 55);
      doc.text(item.biomarker, 22, yPos + 2);
      
      // Description
      doc.setFontSize(8);
      doc.setFont(undefined, "normal");
      doc.setTextColor(107, 114, 128);
      const descLines = doc.splitTextToSize(item.description || "No description available.", 110);
      doc.text(descLines, 22, yPos + 9);
      
      // Value with colored background
      if (item.value) {
        const valueConfig = statusColors[item.status];
        // Draw value background
        doc.setFillColor(
          Math.min(255, valueConfig.bg.r + 100),
          Math.min(255, valueConfig.bg.g + 100),
          Math.min(255, valueConfig.bg.b + 100)
        );
        doc.roundedRect(155, yPos - 2, 35, 12, 2, 2, "F");
        
        // Value text
        doc.setFontSize(9);
        doc.setFont(undefined, "bold");
        doc.setTextColor(valueConfig.bg.r, valueConfig.bg.g, valueConfig.bg.b);
        doc.text(item.value, 172, yPos + 5, { align: "center" });
      }
      
      yPos += 25;
    });
    
    // ============ PAGE 3: PROTEIN MARKERS ============
    doc.addPage();
    currentPage++;
    drawReportHeader(doc);
    
    // Section title
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(55, 65, 81);
    doc.text("Protein markers for Heart", 15, 38);
    
    // Table header
    yPos = 48;
    doc.setFillColor(248, 250, 252);
    doc.rect(15, yPos, 180, 10, "F");
    
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.setTextColor(71, 85, 105);
    doc.text("Protein", 20, yPos + 7);
    doc.text("Risk / Value", 130, yPos + 7);
    
    yPos += 15;
    
    // Protein markers rows
    proteinData.forEach((item, index) => {
      if (yPos > pageHeight - 30) {
        // Add new page
        doc.addPage();
        currentPage++;
        drawReportHeader(doc);
        
        // Repeat table header
        yPos = 35;
        doc.setFillColor(248, 250, 252);
        doc.rect(15, yPos, 180, 10, "F");
        doc.setFontSize(9);
        doc.setFont(undefined, "bold");
        doc.setTextColor(71, 85, 105);
        doc.text("Protein", 20, yPos + 7);
        doc.text("Risk / Value", 130, yPos + 7);
        yPos += 15;
      }
      
      // Alternating row background
      if (index % 2 === 0) {
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setFillColor(249, 250, 251);
      }
      doc.rect(15, yPos - 5, 180, 22, "F");
      
      // Left border accent
      doc.setFillColor(251, 191, 36);
      doc.rect(15, yPos - 5, 3, 22, "F");
      
      // Protein name
      doc.setFontSize(11);
      doc.setFont(undefined, "bold");
      doc.setTextColor(31, 41, 55);
      doc.text(item.biomarker, 22, yPos + 5);
      
      // Risk score bar
      drawRiskScoreBar(doc, 110, yPos, item.status);
      
      yPos += 25;
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
      link.download = "Heart_Biomarkers_Report.pdf";
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

  return (
    <div className="space-y-6">
      {/* Generate Button */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Heart Biomarkers Report</h2>
        <p className="text-gray-600 mb-6">
          Generate a comprehensive PDF report containing Genetic, Blood, and Protein markers for heart health assessment.
        </p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800">Genetic Markers</h3>
            <p className="text-2xl font-bold text-red-600">{reportData.Heart.filter(i => i.category === "Genetic").length}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800">Blood Biomarkers</h3>
            <p className="text-2xl font-bold text-blue-600">{reportData.Heart.filter(i => i.category === "Blood").length}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800">Protein Markers</h3>
            <p className="text-2xl font-bold text-purple-600">{reportData.Heart.filter(i => i.category === "Protein").length}</p>
          </div>
        </div>
        
        {/* Risk Legend */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Risk Legend:</span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-red-500"></span>
            <span className="text-sm text-gray-600">High Risk</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-orange-400"></span>
            <span className="text-sm text-gray-600">Moderate Risk</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-green-500"></span>
            <span className="text-sm text-gray-600">Low Risk</span>
          </span>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={generatePDF}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Generate Heart Report PDF
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Heart Report Preview</h3>
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
                title="Heart Report Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
