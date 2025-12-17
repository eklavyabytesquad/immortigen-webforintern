"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function PdfGenerator() {
  const [formData, setFormData] = useState({
    title: "Health & Wellness Report",
    content: "This comprehensive report provides detailed insights into your health metrics, lifestyle patterns, and personalized recommendations for optimal wellness. Our analysis covers multiple dimensions of health including physical activity, nutrition, sleep quality, and stress management.",
    author: "Dr. Health Professional",
    subtitle: "Comprehensive Health Analysis",
  });

  const [healthMetrics] = useState([
    {
      title: "BMI Analysis",
      description: "Body Mass Index analysis shows you are within the healthy range. Continue maintaining balanced nutrition and regular physical activity.",
      score: "23.5",
      status: "Normal",
      color: { r: 255, g: 193, b: 7 }
    },
    {
      title: "Physical Activity Overview: 33.33%",
      description: "You have been fairly sedentary with just 1 active day. Increase walking or light workouts to stay fit.",
      score: "33%",
      status: "Low",
      color: { r: 220, g: 53, b: 69 }
    },
    {
      title: "Nutritional Pattern Review",
      description: "Your diet includes good variety but could benefit from more vegetables and whole grains for better nutrition.",
      score: "68",
      status: "Good",
      color: { r: 255, g: 193, b: 7 }
    },
    {
      title: "Optimal Hydration Level",
      description: "Great job! You are drinking adequate water daily. Keep up this healthy habit for optimal body function.",
      score: "2.5L",
      status: "Excellent",
      color: { r: 40, g: 167, b: 69 }
    },
    {
      title: "Sleep Regularity Review",
      description: "Sleep patterns are inconsistent. Try to maintain 7-8 hours of quality sleep each night for better recovery.",
      score: "6.2hrs",
      status: "Below Average",
      color: { r: 255, g: 193, b: 7 }
    }
  ]);
  
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const drawGaugeChart = (doc, x, y, percentage, color) => {
    const radius = 15;
    const centerX = x + radius;
    const centerY = y + radius;
    
    // Background arc (gray)
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(4);
    for (let i = 180; i <= 360; i += 2) {
      const startAngle = (i * Math.PI) / 180;
      const endAngle = ((i + 2) * Math.PI) / 180;
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);
      doc.line(x1, y1, x2, y2);
    }
    
    // Colored arc (progress)
    doc.setDrawColor(color.r, color.g, color.b);
    doc.setLineWidth(4);
    const endAngle = 180 + (180 * percentage) / 100;
    for (let i = 180; i <= endAngle; i += 2) {
      const startAngle = (i * Math.PI) / 180;
      const angle2 = ((i + 2) * Math.PI) / 180;
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(angle2);
      const y2 = centerY + radius * Math.sin(angle2);
      doc.line(x1, y1, x2, y2);
    }
    
    // Score text
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(String(Math.round(percentage)), centerX, centerY + 5, { align: "center" });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add logo
    const logo = new Image();
    logo.src = '/downloads/Log.png';
    doc.addImage(logo, 'PNG', 15, 10, 35, 13);
    
    // Contact info on right side
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, "normal");
    
    doc.text("+91 98765 43210", 145, 12);
    doc.text("contact@immortigen.com", 145, 17);
    doc.text("www.immortigen.com", 145, 22);
    
    // Horizontal line below header
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(15, 28, 195, 28);
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "bold");
    doc.text("Report", 15, 40);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, "normal");
    doc.text("Comprehensive Health Report", 15, 46);
    
    let yPos = 60;
    
    // Render each health metric
    healthMetrics.forEach((metric, index) => {
      // Section background (light gray)
      doc.setFillColor(250, 250, 250);
      doc.rect(15, yPos - 5, 180, 35, "F");
      
      // Title
      doc.setFontSize(11);
      doc.setFont(undefined, "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(metric.title, 20, yPos + 2);
      
      // Description
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.setTextColor(80, 80, 80);
      const splitDesc = doc.splitTextToSize(metric.description, 130);
      doc.text(splitDesc, 20, yPos + 9);
      
      // Status badge
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(metric.status, 165, yPos + 25);
      
      // Draw gauge chart
      if (metric.score.includes('%')) {
        const percentage = parseInt(metric.score);
        drawGaugeChart(doc, 165, yPos + 2, percentage, metric.color);
      } else if (metric.title.includes("BMI")) {
        drawGaugeChart(doc, 165, yPos + 2, 65, metric.color);
      } else if (metric.title.includes("Nutritional")) {
        drawGaugeChart(doc, 165, yPos + 2, 68, metric.color);
      } else if (metric.title.includes("Hydration")) {
        drawGaugeChart(doc, 165, yPos + 2, 85, metric.color);
      } else if (metric.title.includes("Sleep")) {
        drawGaugeChart(doc, 165, yPos + 2, 55, metric.color);
      }
      
      yPos += 40;
    });
    
    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated by IMMORTIGEN Health System", 105, pageHeight - 10, { align: "center" });
    
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
      link.download = `${formData.title.replace(/\s+/g, "_")}.pdf`;
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
      {/* Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Report</h2>
        <div className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Report Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter report title"
            />
          </div>

          {/* Subtitle Input */}
          <div>
            <label htmlFor="subtitle" className="block text-sm font-semibold text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter subtitle"
            />
          </div>

          {/* Author Input */}
          <div>
            <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
              Author Name *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter author name"
            />
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
              Report Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
              placeholder="Enter detailed report content"
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={generatePDF}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-10 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Generate PDF Preview
            </button>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">PDF Preview</h3>
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
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
