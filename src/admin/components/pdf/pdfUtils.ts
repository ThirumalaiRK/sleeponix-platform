import { Font, StyleSheet } from '@react-pdf/renderer';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order } from '../../../types';
import { toDataURL } from 'qrcode';

// --- 1. BRAND COLORS ---
export const colors = {
  forestGreenDark: '#0d2418',
  forestGreen: '#102c21',
  forestGreenLight: '#15382a',
  naturalBeige: '#f6efe6',
  offWhiteCard: '#fff9f1',
  goldAccent: '#caa362',
  textBrown: '#5f4b3b',
  borderBeige: '#eadfcc',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#555555',
};

// --- 2. FONT REGISTRATION ---
// Note: You must have these font files available in your project.
// For this example, I'm assuming they are in a public/fonts directory.
// Update the src paths if they are located elsewhere.
Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/playfairdisplay/v22/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWMI.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/playfairdisplay/v22/nuFuD-vYSZviVYUb_rj3ij__anPXJzD5b_Bq_g.ttf', fontWeight: 'bold' },
  ],
});

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwApi_-w.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwApi_-w.ttf', fontStyle: 'italic' },
    { src: 'https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwApi_-w.ttf', fontWeight: 'bold' },
  ],
});


// --- 3. STYLESHEET ---
export const S = StyleSheet.create({
  // Page and Layout
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    padding: 40,
    backgroundColor: colors.naturalBeige,
    color: colors.textBrown,
  },
  pageWhite: {
    fontFamily: 'Inter',
    fontSize: 10,
    padding: 40,
    backgroundColor: colors.white,
    color: colors.black,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },

  // Typography
  h1: { fontFamily: 'Playfair Display', fontSize: 24, color: colors.forestGreenDark, fontWeight: 'bold' },
  h2: { fontFamily: 'Playfair Display', fontSize: 18, color: colors.forestGreen, fontWeight: 'bold' },
  h3: { fontFamily: 'Playfair Display', fontSize: 14, color: colors.forestGreenLight, fontWeight: 'bold' },
  body: { fontSize: 10, lineHeight: 1.5 },
  bold: { fontWeight: 'bold' },
  textRight: { textAlign: 'right' },
  textCenter: { textAlign: 'center' },

  // Spacing
  mb2: { marginBottom: 2 },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb20: { marginBottom: 20 },
  mb40: { marginBottom: 40 },

  // Elements
  logo: {
    fontSize: 28,
    fontFamily: 'Playfair Display',
    color: colors.forestGreenDark,
    letterSpacing: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: colors.gray,
    borderTop: `1px solid ${colors.borderBeige}`,
    paddingTop: 10,
  },
  card: {
    backgroundColor: colors.offWhiteCard,
    padding: 20,
    borderRadius: 16,
    border: `1px solid ${colors.borderBeige}`,
  },
  hr: {
    height: 1,
    backgroundColor: colors.goldAccent,
    border: 'none',
    marginVertical: 20,
  },

  // Table
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: colors.borderBeige,
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 24,
  },
  tableHeader: {
    backgroundColor: colors.forestGreenLight,
    color: colors.white,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 9,
    padding: 8,
    border: 'none',
    borderRadius: 8,
  },
  tableColHeader: {
    padding: 8,
    color: colors.white,
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 8,
  },
});

// --- 4. UTILITY FUNCTIONS ---
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};

export const generateInvoiceNumber = (orderId: string): string => {
  const date = new Date();
  const year = date.getFullYear();
  return `INV-${year}-${orderId.slice(-4)}`;
};

export const generateTrackingId = () => {
  return `SLP${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
};

export const generateInvoice = async (order: Partial<Order> = {}) => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
  });

  // --- DESTRUCTURING ORDER DATA ---
  const {
    order_id = 'N/A',
    created_at,
    payment_method = 'N/A',
    customer_details,
    order_items = [],
    discount_amount = 0,
    shipping_cost = 0,
    tax_amount = 0,
  } = order as Order & { 
    payment_method?: string; 
    discount_amount?: number; 
    shipping_cost?: number; 
    tax_amount?: number 
  };

  const branding = {
    primaryColor: '#143d29',
    accentGold: '#c9a86a',
    textColor: '#1a1a1a',
    lightGray: '#e5e5e5',
    white: '#ffffff',
    font: 'Helvetica',
  };

  // --- Set Fonts and Colors ---
  doc.setFont(branding.font);
  doc.setTextColor(branding.textColor);

  // --- Draw Header (UPDATED) ---
  const drawHeader = async () => {
    try {
      // Add Logo
      const logoResponse = await fetch('/images/og logo.png');
      if (!logoResponse.ok) {
        throw new Error(`Failed to fetch logo: ${logoResponse.statusText}`);
      }
      const logoBlob = await logoResponse.blob();

      // Use FileReader to get base64 Data URL
      const reader = new FileReader();
      const logoDataUrl = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(logoBlob);
      });

      if (logoDataUrl && logoDataUrl.startsWith('data:image')) {
        doc.addImage(logoDataUrl, 'PNG', 40, 40, 120, 40);
      } else {
        console.error("Could not convert logo to base64");
      }
    } catch (error) {
      console.error("Could not load logo", error);
    }

    // Add "INVOICE" title
    doc.setFontSize(28);
    doc.setFont(branding.font, 'bold');
    doc.setTextColor(branding.primaryColor);
    doc.text('INVOICE', doc.internal.pageSize.getWidth() - 40, 65, { align: 'right' });
  };

  // --- Draw Footer ---
  const drawFooter = () => {
    const pageCount = doc.internal.pages.length;
    doc.setFontSize(8);
    doc.setTextColor(branding.lightGray);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `SleepOnix - Luxury Mattresses & Bedding | www.sleeponix.com | Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 30,
        { align: 'center' }
      );
    }
  };

  // --- Draw Invoice Details ---
  const drawInvoiceDetails = () => {
    doc.setFontSize(10);
    doc.setTextColor(branding.textColor);
    doc.setFont(branding.font, 'normal');

    // Uses destructured variables
    const details = [
      ['Invoice ID:', order_id],
      ['Invoice Date:', created_at ? new Date(created_at).toLocaleDateString('en-GB') : 'N/A'],
      ['Order ID:', order_id],
      ['Payment Mode:', payment_method],
    ];

    let yPos = 120;
    details.forEach(([label, value]) => {
      doc.text(label, 40, yPos);
      doc.text(value, 120, yPos);
      yPos += 15;
    });
  };

  // --- Draw Addresses (UPDATED) ---
  const drawAddresses = () => {
    doc.setFontSize(12);
    doc.setFont(branding.font, 'bold');
    doc.setTextColor(branding.primaryColor);
    doc.text('Billing Address', 40, 200);
    doc.text('Shipping Address', doc.internal.pageSize.getWidth() / 2, 200);

    doc.setFontSize(10);
    doc.setFont(branding.font, 'normal');
    doc.setTextColor(branding.textColor);

    // Uses destructured variables (customer_details)
    const billingAddress = customer_details ? [
      customer_details.name || 'N/A',
      customer_details.address || 'N/A',
      `${customer_details.city || ''}, ${customer_details.state || ''} ${customer_details.postalCode || ''}`.trim(),
      'India'
    ].filter(Boolean).join('\n') : 'N/A';

    // Assuming shipping address is the same as billing address for this component
    const shippingAddress = billingAddress;

    doc.text(billingAddress, 40, 220);
    doc.text(shippingAddress, doc.internal.pageSize.getWidth() / 2, 220);
  };

  // --- Draw Items Table (UPDATED) ---
  const drawItemsTable = () => {
    const head = [['#', 'Item', 'Qty', 'Rate', 'Amount']];
    // Uses destructured variable (order_items)
    const body = order_items.map((item, index) => [
      index + 1,
      item.name,
      item.quantity,
      `₹${item.price.toFixed(2)}`,
      `₹${(item.quantity * item.price).toFixed(2)}`,
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 300,
      theme: 'striped',
      headStyles: {
        fillColor: branding.primaryColor,
        textColor: branding.white,
        fontStyle: 'bold',
      },
      styles: {
        font: branding.font,
        fontSize: 10,
        cellPadding: 5,
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 245 },
        2: { cellWidth: 40, halign: 'center' },
        3: { cellWidth: 80, halign: 'right' },
        4: { cellWidth: 80, halign: 'right' },
      },
    });
  };

  // --- Draw Totals (UPDATED) ---
  const drawTotals = () => {
    const tableEndY = (doc as any).lastAutoTable.finalY;
    let yPos = tableEndY + 20;

    const subtotal = order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotal = subtotal - discount_amount + shipping_cost + tax_amount;

    // Uses destructured variables
    const totals = [
        ['Subtotal:', `₹${subtotal.toFixed(2)}`],
        ['Discount:', `₹${discount_amount.toFixed(2)}`],
        ['Shipping:', `₹${shipping_cost.toFixed(2)}`],
        ['Tax (IGST):', `₹${tax_amount.toFixed(2)}`],
    ];

    doc.setFontSize(10);
    totals.forEach(([label, value]) => {
      doc.text(label, doc.internal.pageSize.getWidth() - 140, yPos);
      doc.text(value, doc.internal.pageSize.getWidth() - 40, yPos, { align: 'right' });
      yPos += 15;
    });

    doc.setDrawColor(branding.lightGray);
    doc.line(doc.internal.pageSize.getWidth() - 160, yPos, doc.internal.pageSize.getWidth() - 40, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.setFont(branding.font, 'bold');
    doc.text('Total:', doc.internal.pageSize.getWidth() - 140, yPos);
    // Uses destructured variable
    doc.text(`₹${grandTotal.toFixed(2)}`, doc.internal.pageSize.getWidth() - 40, yPos, { align: 'right' });
  };

  // --- Draw Notes and QR Code ---
  const drawNotesAndQRCode = async () => {
    // Uses destructured variables
    // Note: Using the calculated grandTotal here instead of total_amount from destructured properties for consistency
    const subtotal = order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotal = subtotal - discount_amount + shipping_cost + tax_amount;
    
    const qrCodeUrl = await toDataURL(JSON.stringify({ orderId: order_id, total: grandTotal }));
    if (qrCodeUrl) {
      doc.addImage(qrCodeUrl, 'PNG', 40, doc.internal.pageSize.getHeight() - 120, 80, 80);
    }

    doc.setFontSize(9);
    doc.setTextColor(branding.textColor);
    doc.text(
      'Thank you for your business!\nFor any queries, contact support@sleeponix.com.',
      140,
      doc.internal.pageSize.getHeight() - 100
    );
  };

  // --- Generate PDF ---
  await drawHeader();
  drawInvoiceDetails();
  drawAddresses();
  drawItemsTable();
  drawTotals();
  await drawNotesAndQRCode();
  drawFooter();

  // Uses destructured variable
  doc.save(`Invoice_${order_id}.pdf`);
};

export const generateShippingLabel = async (order: Partial<Order> = {}) => {
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'pt',
    format: [288, 432], // 4x6 inches (72 dpi)
  });

  const {
    order_id = 'N/A',
    customer_details,
  } = order as Order;

  const branding = {
    primaryColor: '#143d29',
    textColor: '#1a1a1a',
    font: 'Helvetica',
  };

  doc.setFont(branding.font);
  doc.setTextColor(branding.textColor);

  // --- Draw Header ---
  const drawHeader = () => {
    doc.setFontSize(18);
    doc.setFont(branding.font, 'bold');
    doc.text('SHIPPING LABEL', 216, 40, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Order ID: ${order_id}`, 216, 60, { align: 'center' });
  };

  // --- Draw Addresses (UPDATED) ---
  const drawAddresses = () => {
    doc.setFontSize(10);
    doc.setFont(branding.font, 'bold');
    doc.text('FROM:', 40, 100);
    doc.setFont(branding.font, 'normal');
    const fromAddress = [
      'SleepOnix',
      '123 Luxury Lane',
      'Comfort City, ST 12345',
      'India',
    ].join('\n');
    doc.text(fromAddress, 40, 115);

    doc.setFont(branding.font, 'bold');
    doc.text('TO:', 40, 180);
    doc.setFont(branding.font, 'normal');
    
    const shippingAddr = customer_details ? [
      customer_details.name || 'N/A',
      customer_details.address || 'N/A',
      `${customer_details.city || ''}, ${customer_details.state || ''} ${customer_details.postalCode || ''}`.trim(),
      'India',
    ].filter(Boolean).join('\n') : 'N/A';
    
    doc.text(shippingAddr, 40, 195);
  };

  // --- Draw Barcode/QR Code ---
  const drawBarcode = async () => {
    const trackingId = generateTrackingId();
    doc.setFontSize(10);
    doc.text('Tracking #:', 40, 280);
    doc.setFont(branding.font, 'bold');
    doc.text(trackingId, 90, 280);

    try {
      const qrCodeUrl = await generateQrCode(JSON.stringify({ orderId: order_id, trackingId }));
      if (qrCodeUrl) {
        doc.addImage(qrCodeUrl, 'PNG', 300, 180, 100, 100);
      }
    } catch (error) {
      console.error("Failed to generate QR code", error);
    }
  };

  // --- Generate PDF ---
  drawHeader();
  drawAddresses();
  await drawBarcode();

  doc.save(`ShippingLabel_${order_id}.pdf`);
};

export const generatePackingSlip = (order: Order) => {
  console.log('Generating packing slip for order:', order.id);
  // PDF generation logic will go here
};

export const generateCustomerCopy = (order: Order) => {
  console.log('Generating customer copy for order:', order.id);
  // PDF generation logic will go here
};

export const generateQrCode = async (text: string): Promise<string | null> => {
  try {
    return await toDataURL(text, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      margin: 2,
      scale: 4,
      color: {
        dark: '#0d2418', // forestGreenDark
        light: '#0000', // transparent
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};