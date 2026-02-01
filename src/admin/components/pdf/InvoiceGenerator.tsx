import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Order } from '../../../types';
// Assuming generateInvoice is imported from a utility file
import { generateInvoicePDF as generateInvoice } from '../../utils/pdfGenerator';


interface InvoiceGeneratorProps {
  order: Order;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ order: initialOrder }) => {
  const [status, setStatus] = useState<'generating' | 'success' | 'error'>('generating');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndGenerateInvoice = async () => {
      if (!initialOrder?.id) {
        setError('No order provided.');
        setStatus('error');
        return;
      }

      try {
        // 1. Fetch the full order details including items
        const { data: fullOrder, error: fetchError } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('id', initialOrder.id)
          .single();

        if (fetchError || !fullOrder) {
          console.error('Error fetching full order:', fetchError);
          setError('Failed to fetch complete order details.');
          setStatus('error');
          return;
        }

        // 2. Format the data into the structure expected by generateInvoice (pdfUtils)
        // The fullOrder object structure should closely align with the Partial<Order> type
        // The pdfUtils file uses properties like order_id, items, total_amount etc.
        const formattedOrderForPDF = {
            ...fullOrder, // Use all properties from fullOrder
            items: fullOrder.order_items.map((item: any) => ({
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: item.price, // Map price to unit_price as used in pdfUtils
            })),
            // Recalculate or ensure total_amount, discount_amount, etc., are correct
            // Assuming fullOrder contains these fields correctly:
            total_amount: fullOrder.total_amount, 
            discount_amount: fullOrder.discount_amount,
            shipping_cost: fullOrder.shipping_cost || 0,
            tax_amount: fullOrder.tax_amount || 0,
            customer: {
                name: fullOrder.customer_name,
                address: fullOrder.customer_address,
                // Add city, state, zip, country if available in fullOrder to match pdfUtils drawing logic
                city: fullOrder.billing_city,
                state: fullOrder.billing_state,
                zip: fullOrder.billing_zip,
                country: fullOrder.billing_country,
            },
            shipping_address: {
                name: fullOrder.customer_name,
                address: fullOrder.shipping_address,
                city: fullOrder.shipping_city,
                state: fullOrder.shipping_state,
                zip: fullOrder.shipping_zip,
                country: fullOrder.shipping_country,
            }
        };

        // 3. Generate the PDF (Removed 'await' as per merge instruction)
        generateInvoice(formattedOrderForPDF);

        setStatus('success');
      } catch (err) {
        console.error('Error during invoice generation:', err);
        setError('An unexpected error occurred while generating the invoice.');
        setStatus('error');
      }
    };

    fetchAndGenerateInvoice();
  }, [initialOrder]);

  // --- Component Render ---
  if (status === 'error') {
    return <div className="p-4 text-red-500">❌ Error: {error || 'Could not generate invoice.'}</div>;
  }

  if (status === 'success') {
    return <div className="p-4 text-green-700">✅ Invoice generated and downloaded successfully!</div>;
  }

  return <div className="p-4">📄 Generating Invoice for Order **{initialOrder.id}**... Please wait.</div>;
};

export default InvoiceGenerator;