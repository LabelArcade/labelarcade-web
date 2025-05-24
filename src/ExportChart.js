// src/ExportChart.js
import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function ExportChart({ chartRef }) {
  const handleExportAsImage = () => {
    if (!chartRef?.current) {
      console.error("Chart ref is not defined!");
      return;
    }

    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'submission_chart.png';
      link.click();
    });
  };

  const handleExportAsPDF = () => {
    if (!chartRef?.current) {
      console.error("Chart ref is not defined!");
      return;
    }

    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('submission_chart.pdf');
    });
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button onClick={handleExportAsImage} style={{ marginRight: '1rem' }}>
        📷 Export as Image
      </button>
      <button onClick={handleExportAsPDF}>
        📄 Export as PDF
      </button>
    </div>
  );
}

export default ExportChart;
