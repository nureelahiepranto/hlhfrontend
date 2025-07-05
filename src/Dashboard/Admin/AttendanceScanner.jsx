import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const AttendanceScanner = () => {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      console.log('Scanned QR Code:', data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scan Student QR Code for Attendance</h1>

      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />

      {scanResult && (
        <div>
          <p>Student ID: {scanResult}</p>
          {/* You can process the student ID and mark attendance */}
        </div>
      )}
    </div>
  );
};

export default AttendanceScanner;
