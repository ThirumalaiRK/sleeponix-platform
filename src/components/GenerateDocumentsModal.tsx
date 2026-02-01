// @ts-nocheck
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceGenerator from '../admin/components/pdf/InvoiceGenerator';
import ShippingLabelPDF from '../admin/components/pdf/ShippingLabelPDF';
import PackingSlipPDF from '../admin/components/pdf/PackingSlipPDF';
import CustomerCopyPDF from '../admin/components/pdf/CustomerCopyPDF';

const GenerateDocumentsModal = ({ order, onClose }) => {
  if (!order) return null;

  const documents = [
    { name: 'Invoice', component: <InvoiceGenerator order={order} />, isGenerator: true },
    { name: 'Shipping Label', component: <ShippingLabelPDF order={order} /> },
    { name: 'Packing Slip', component: <PackingSlipPDF order={order} /> },
    { name: 'Customer Copy', component: <CustomerCopyPDF order={order} /> },
  ];

  const [selectedDoc, setSelectedDoc] = React.useState(documents[0]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[90vw] h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Generate Documents for Order #{order.id}</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <div className="flex flex-1">
          <div className="w-1/4 border-r p-4">
            <h3 className="font-bold mb-4">Select Document</h3>
            <ul>
              {documents.map(doc => (
                <li key={doc.name}
                  className={`p-2 cursor-pointer rounded ${selectedDoc.name === doc.name ? 'bg-gray-200' : ''}`}
                  onClick={() => setSelectedDoc(doc)}>
                  {doc.name}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              {!selectedDoc.isGenerator && (
                <PDFDownloadLink
                  document={selectedDoc.component}
                  fileName={`${selectedDoc.name.replace(' ', '_')}_${order.id}.pdf`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full text-center inline-block"
                >
                  {({ loading }) =>
                    loading ? 'Loading document...' : `Download ${selectedDoc.name}`
                  }
                </PDFDownloadLink>
              )}
            </div>
          </div>
          <div className="w-3/4">
            {selectedDoc.isGenerator ? (
              selectedDoc.component
            ) : (
              <PDFViewer width="100%" height="100%">
                {selectedDoc.component}
              </PDFViewer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateDocumentsModal;