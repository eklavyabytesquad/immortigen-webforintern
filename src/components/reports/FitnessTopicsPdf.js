"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { drawReportHeader } from "./common/ReportHeader";

// Primary color
const primaryColor = { r: 85, g: 92, b: 245 };

// Helper to parse rgba color string to RGB values
const parseRgbaColor = (rgbaString) => {
  const match = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
  }
  return primaryColor; // fallback
};

export default function FitnessTopicsPdf({ topicsData = { topics: [] } }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    topicsData.topics.forEach((topic, topicIndex) => {
      // Add new page for each topic (except first)
      if (topicIndex > 0) {
        doc.addPage();
      }
      
      // Draw header
      drawReportHeader(doc);
      
      let yPos = 45;
      
      // Parse topic color
      const topicColor = parseRgbaColor(topic.color);
      
      // Topic title section - left aligned
      doc.setFontSize(24);
      doc.setFont(undefined, "bold");
      doc.setTextColor(31, 41, 55);
      
      // Split topic title if it has "&" for multi-line
      const titleParts = topic.topic.split(" & ");
      if (titleParts.length > 1) {
        doc.text(titleParts[0] + " &", 15, yPos);
        yPos += 12;
        doc.text(titleParts[1], 15, yPos);
      } else {
        doc.text(topic.topic, 15, yPos);
      }
      
      yPos += 10;
      
      // Subtitle
      doc.setFontSize(11);
      doc.setFont(undefined, "normal");
      doc.setTextColor(107, 114, 128);
      doc.text("Sleep well, recover better, live stronger.", 15, yPos);
      
      // Draw circular image placeholder on the right with border
      const circleX = 170;
      const circleY = 55;
      const circleRadius = 22;
      
      // Outer ring (topic color)
      doc.setDrawColor(topicColor.r, topicColor.g, topicColor.b);
      doc.setLineWidth(3);
      doc.circle(circleX, circleY, circleRadius + 2, "S");
      
      // Inner circle with gray fill
      doc.setFillColor(229, 231, 235);
      doc.circle(circleX, circleY, circleRadius, "F");
      
      // Person icon placeholder
      doc.setFillColor(180, 180, 180);
      doc.circle(circleX, circleY - 6, 5, "F"); // head
      doc.ellipse(circleX, circleY + 6, 9, 10, "F"); // body
      
      yPos += 25;
      
      // Subtopics
      topic.subtopics.forEach((subtopic, subIndex) => {
        // Check if we need a new page
        if (yPos > pageHeight - 80) {
          doc.addPage();
          drawReportHeader(doc);
          yPos = 40;
        }
        
        // Subtopic header bar - rounded corners
        doc.setFillColor(topicColor.r, topicColor.g, topicColor.b);
        doc.roundedRect(15, yPos, 180, 12, 3, 3, "F");
        
        doc.setFontSize(11);
        doc.setFont(undefined, "bold");
        doc.setTextColor(255, 255, 255);
        doc.text(subtopic.title, 22, yPos + 8);
        
        yPos += 22;
        
        // Points in two columns
        const points = subtopic.points;
        const leftPoints = points.filter((_, i) => i % 2 === 0);
        const rightPoints = points.filter((_, i) => i % 2 === 1);
        
        const maxRows = Math.max(leftPoints.length, rightPoints.length);
        const colWidth = 85;
        const leftColX = 15;
        const rightColX = 105;
        
        for (let row = 0; row < maxRows; row++) {
          // Check if we need a new page
          if (yPos > pageHeight - 25) {
            doc.addPage();
            drawReportHeader(doc);
            yPos = 40;
          }
          
          // Left column point
          if (leftPoints[row]) {
            // Checkmark circle with topic color
            doc.setFillColor(
              topicColor.r + Math.floor((255 - topicColor.r) * 0.7),
              topicColor.g + Math.floor((255 - topicColor.g) * 0.7),
              topicColor.b + Math.floor((255 - topicColor.b) * 0.7)
            );
            doc.circle(leftColX + 5, yPos + 2, 5, "F");
            
            // Checkmark icon
            doc.setDrawColor(topicColor.r, topicColor.g, topicColor.b);
            doc.setLineWidth(1);
            doc.line(leftColX + 2.5, yPos + 2, leftColX + 4.5, yPos + 4);
            doc.line(leftColX + 4.5, yPos + 4, leftColX + 7.5, yPos);
            
            // Text - wrap properly
            doc.setFontSize(9);
            doc.setFont(undefined, "normal");
            doc.setTextColor(55, 65, 81);
            const leftText = doc.splitTextToSize(leftPoints[row], colWidth - 18);
            doc.text(leftText, leftColX + 14, yPos + 4);
          }
          
          // Right column point
          if (rightPoints[row]) {
            // Checkmark circle with topic color
            doc.setFillColor(
              topicColor.r + Math.floor((255 - topicColor.r) * 0.7),
              topicColor.g + Math.floor((255 - topicColor.g) * 0.7),
              topicColor.b + Math.floor((255 - topicColor.b) * 0.7)
            );
            doc.circle(rightColX + 5, yPos + 2, 5, "F");
            
            // Checkmark icon
            doc.setDrawColor(topicColor.r, topicColor.g, topicColor.b);
            doc.setLineWidth(1);
            doc.line(rightColX + 2.5, yPos + 2, rightColX + 4.5, yPos + 4);
            doc.line(rightColX + 4.5, yPos + 4, rightColX + 7.5, yPos);
            
            // Text - wrap properly
            doc.setFontSize(9);
            doc.setFont(undefined, "normal");
            doc.setTextColor(55, 65, 81);
            const rightText = doc.splitTextToSize(rightPoints[row], colWidth - 18);
            doc.text(rightText, rightColX + 14, yPos + 4);
          }
          
          yPos += 22;
        }
        
        yPos += 10; // Space between subtopics
      });
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
      link.download = "Fitness_Performance_Guide.pdf";
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

  const topicCount = topicsData.topics?.length || 0;

  return (
    <div className="space-y-6">
      {/* Generate Button */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Fitness & Performance Guide</h2>
        <p className="text-gray-600 mb-6">
          Generate a comprehensive PDF guide with fitness, wellness, and performance recommendations.
        </p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {topicsData.topics?.slice(0, 3).map((topic, index) => {
            const color = parseRgbaColor(topic.color);
            return (
              <div 
                key={index}
                className="p-4 rounded-lg border"
                style={{ 
                  backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`,
                  borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`
                }}
              >
                <h3 className="font-semibold" style={{ color: `rgb(${color.r}, ${color.g}, ${color.b})` }}>
                  {topic.topic}
                </h3>
                <p className="text-2xl font-bold" style={{ color: `rgb(${color.r}, ${color.g}, ${color.b})` }}>
                  {topic.subtopics?.length || 0} sections
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={generatePDF}
            className="text-white font-semibold py-3 px-10 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ backgroundColor: "rgba(85, 92, 245, 1)" }}
          >
            Generate Fitness Guide PDF
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Fitness Guide Preview</h3>
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
                title="Fitness Guide Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
