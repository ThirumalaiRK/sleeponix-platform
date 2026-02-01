import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// -------------------------------------------------------
// BRAND & STYLE GUIDELINES
// -------------------------------------------------------
const BRAND_COLORS = {
  primary: "#0B3D2E", // Rich Green
  text: "#1A1A1A",
  lightGray: "#E5E5E5",
  white: "#FFFFFF",
  footer: "#6c757d",
};

const FONT = "Helvetica"; // Using a premium, clean font
const MARGIN = 14;
const A4 = { width: 210, height: 297 };

// Currency formatter
const currency = (v: number = 0) =>
  `Rs. ${v.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

// -------------------------------------------------------
// PART 1: PREMIUM TAX INVOICE
// -------------------------------------------------------

/**
 * Draws the footer for the Tax Invoice. (UPDATED)
 */
const drawInvoiceFooter = (doc: jsPDF) => {
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const y = A4.height - 30;

    // MERGED: Add computer-generated text just above the line on every page
    doc.setFont(FONT, "normal").setFontSize(8).setTextColor(BRAND_COLORS.footer);
    doc.text("This is a computer-generated invoice.", MARGIN, y - 2); 

    // MERGED: Draw the line
    doc.setDrawColor(BRAND_COLORS.lightGray);
    doc.line(MARGIN, y, A4.width - MARGIN, y);

    // Footer content below the line
    doc.setFont(FONT, "normal").setFontSize(9).setTextColor(BRAND_COLORS.footer);
    doc.text("Thank you for shopping with SleepOnix.", A4.width / 2, y + 8, { align: "center" });
    doc.text("SleepOnix Industries – ISO 9001:2015 Certified", A4.width / 2, y + 12, { align: "center" });
    doc.text("Contact: +91 98943 60080 | Website: www.thesleeponix.com", A4.width / 2, y + 16, { align: "center" });
  }
};

export const generateInvoicePDF = async (order: any = {}) => {
  const {
    order_id = "N/A",
    order_date,
    payment_method = "N/A",
    customer_details = {},
    items = [],
    totals = {},
  } = order;

  const doc = new jsPDF();

  // 1. Header Section
  try {
    const res = await fetch("/images/og logo.png");
    if (!res.ok) {
        throw new Error(`Failed to fetch logo: ${res.statusText}`);
    }
    const logoBlob = await res.blob();
    const reader = new FileReader();
    const logoDataUrl = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(logoBlob);
    });

    if (logoDataUrl && logoDataUrl.startsWith('data:image')) {
        doc.addImage(logoDataUrl, 'PNG', MARGIN, MARGIN, 40, 12);
    } else {
        console.error("Could not convert logo to base64");
    }
  } catch (e) {
    console.error("Could not load logo", e);
  }

  doc.setFont(FONT, "bold").setFontSize(18).setTextColor(BRAND_COLORS.primary);
  doc.text("INVOICE", A4.width / 2, MARGIN + 8, { align: "center" });

  const rightAlignX = A4.width - MARGIN;
  const infoBoxY = MARGIN + 18;
  
  // START MERGED CODE FOR INVOICE DETAILS ALIGNMENT
  const labelRightX = rightAlignX - 45;
  const valueLeftX = labelRightX + 5;

  doc.setFont(FONT, "bold").setFontSize(9).setTextColor(BRAND_COLORS.text);
  doc.text("Invoice ID:", labelRightX, infoBoxY, { align: "right" });
  doc.text("Invoice Date:", labelRightX, infoBoxY + 6, { align: "right" });
  doc.text("Payment Mode:", labelRightX, infoBoxY + 12, { align: "right" });

  doc.setFont(FONT, "normal");
  doc.text(order_id, valueLeftX, infoBoxY, { align: "left" });
  doc.text(
    order_date ? new Date(order_date).toLocaleDateString("en-IN") : "N/A",
    valueLeftX,
    infoBoxY + 6,
    { align: "left" }
  );
  doc.text(payment_method, valueLeftX, infoBoxY + 12, { align: "left" });
  // END MERGED CODE FOR INVOICE DETAILS ALIGNMENT

  // 2. Billing & Shipping Addresses
  let y = MARGIN + 45;
  doc.setFont(FONT, "bold").setFontSize(10).setTextColor(BRAND_COLORS.primary);
  doc.text("Billing Address", MARGIN, y);
  doc.text("Shipping Address", A4.width / 2, y);

  const { name: customerName, billing_address = {}, shipping_address = {} } = customer_details;

  const billingLines = [
    customerName,
    billing_address.street,
    `${billing_address.city || ''} – ${billing_address.zip || ''}`,
    `${billing_address.state || ''}, India`,
  ].filter(line => line && String(line).replace(/ – /g, '').trim() !== '');

  const shippingLines = [
    customerName, // Assuming shipping name is same as customer name
    shipping_address.street,
    `${shipping_address.city || ''} – ${shipping_address.zip || ''}`,
    `${shipping_address.state || ''}, India`,
  ].filter(line => line && String(line).replace(/ – /g, '').trim() !== '');

  doc.setFont(FONT, "normal").setFontSize(10).setTextColor(BRAND_COLORS.text);
  doc.text(billingLines.length > 0 ? billingLines : ["N/A"], MARGIN, y + 6);
  doc.text(shippingLines.length > 0 ? shippingLines : ["N/A"], A4.width / 2, y + 6);

  // 3. Product Table
  autoTable(doc, {
    startY: y + 30,
    theme: "grid",
    headStyles: {
      fillColor: BRAND_COLORS.primary,
      textColor: BRAND_COLORS.white,
      font: FONT,
      fontStyle: "bold",
      fontSize: 10,
      cellPadding: 3,
    },
     styles: {
      font: FONT,
      fontSize: 10,
      textColor: BRAND_COLORS.text,
      lineColor: BRAND_COLORS.lightGray,
      valign: "middle",
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 'auto', halign: "left" },
      1: { cellWidth: 20, halign: "center" },
      2: { cellWidth: 30, halign: "right" },
      3: { cellWidth: 30, halign: "right" },
    },
    head: [["Product Name", "Qty", "Unit Price (GST Inc.)", "Total"]],
    body: items.map((item: any) => [
      item.name || "N/A",
      item.quantity || 0,
      currency(item.price),
      currency((item.price || 0) * (item.quantity || 0)),
    ]),
    didDrawPage: (data) => {
      drawInvoiceFooter(doc);
    },
  });

  // 4. Summary Section
  let summaryY = (doc as any).lastAutoTable.finalY + 10;
  
  const summary = [
    { label: "Grand Total:", value: currency(totals.grand_total) },
  ];

  const labelX = A4.width - MARGIN - 50;
  let currentY = summaryY;

  summary.forEach((item, index) => {
    doc.setFont(FONT, index === summary.length - 1 ? "bold" : "normal")
      .setFontSize(index === summary.length - 1 ? 12 : 10)
      .setTextColor(index === summary.length - 1 ? BRAND_COLORS.primary : BRAND_COLORS.text);
    
    doc.text(item.label, labelX, currentY);
    doc.text(item.value, A4.width - MARGIN, currentY, { align: "right" });
    currentY += 8;
  });
  
  // Add small GST note back, as it's useful
  doc.setFont(FONT, "normal").setFontSize(8).setTextColor(BRAND_COLORS.footer);
  doc.text("(All prices are GST-inclusive.)", A4.width - MARGIN, currentY, { align: "right" });
  currentY += 5;


  // 5. Footer
  drawInvoiceFooter(doc); // Call again for single-page documents

  // Use doc.save() instead of doc.output("blob") to maintain original function behavior
  doc.save(`SleepOnix-Invoice-${order_id}.pdf`);
};

// -------------------------------------------------------
// PART 2: PREMIUM SHIPPING LABEL (Merged and Refined)
// -------------------------------------------------------
export const generateShippingLabelPDF = async (order: any = {}) => {
  const isExample = Object.keys(order).length === 0;

  const {
    order_id = isExample ? "SPX-ORD-000015" : "N/A",
    order_date,
    payment_method = isExample ? "Prepaid" : "N/A",
    customer_details = {},
    items = [],
  } = order;

  // A6 landscape: 148mm x 105mm
  const doc = new jsPDF({ unit: "mm", orientation: "landscape", format: "a6" });
  const PAGE_WIDTH = 148;
  const PAGE_HEIGHT = 105;
  const LABEL_MARGIN = 8; // Local margin for label

  // --- Fonts & Colors ---
  const FONT_NORMAL = "Helvetica";

  // 1. Top Section (Logo + Title)
  try {
    const res = await fetch("/images/og logo.png");
    if (res.ok) {
      const logoBlob = await res.blob();
      const reader = new FileReader();
      const logoDataUrl = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(logoBlob);
      });
      // Use the local margin for the label
      doc.addImage(logoDataUrl, 'PNG', LABEL_MARGIN, LABEL_MARGIN, 35, 10);
    }
  } catch (e) {
    console.error("Could not load logo", e);
  }

  doc.setFont(FONT_NORMAL, "bold").setFontSize(14).setTextColor(BRAND_COLORS.text);
  doc.text("Shipping Label", PAGE_WIDTH - LABEL_MARGIN, LABEL_MARGIN + 7, { align: "right" });

  // Divider
  doc.setDrawColor(BRAND_COLORS.lightGray);
  doc.line(LABEL_MARGIN, LABEL_MARGIN + 15, PAGE_WIDTH - LABEL_MARGIN, LABEL_MARGIN + 15);

  const contentY = LABEL_MARGIN + 25;
  const columnGap = 10;
  const leftColumnWidth = (PAGE_WIDTH - (LABEL_MARGIN * 2) - columnGap) / 2;
  const rightColumnX = LABEL_MARGIN + leftColumnWidth + columnGap;

  // 2. Left Column: Shipping Address
  const { name: customerName, phone, shipping_address = {} } = customer_details;

  const addressLines = isExample
    ? [
      "Spear Digital",
      "Kovai Main Road, Karumathampatti, Coimbatore",
      "Coimbatore – 641014",
      "Tamil Nadu",
      "Phone: +91 98765 43210"
    ]
    : [
      customerName || "N/A",
      shipping_address.street || "N/A",
      `${shipping_address.city || ''} – ${shipping_address.zip || ''}`,
      shipping_address.state || 'India',
      `Phone: ${phone || 'N/A'}`,
    ].filter(line => line && String(line).replace(/ – /g, '').trim() !== '');

  doc.setFillColor(BRAND_COLORS.white);
  doc.setDrawColor(BRAND_COLORS.lightGray);
  doc.roundedRect(LABEL_MARGIN, contentY, leftColumnWidth, 55, 3, 3, "FD");

  doc.setFont(FONT_NORMAL, "bold").setFontSize(11).setTextColor(BRAND_COLORS.primary);
  doc.text("Ship To:", LABEL_MARGIN + 5, contentY + 8);

  doc.setFont(FONT_NORMAL, "normal").setFontSize(10).setTextColor(BRAND_COLORS.text);
  doc.text(addressLines, LABEL_MARGIN + 5, contentY + 16, {
    lineHeightFactor: 1.5,
    maxWidth: leftColumnWidth - 10,
  });

  // 3. Right Column: Order Details
  const totalQuantity = items.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
  const productSummary = items.length > 0 ? `${items[0].name}${items.length > 1 ? ` (+${items.length - 1} more)` : ''}` : 'Shredded Latex Pillow';

  const orderDetails = isExample
    ? [
      { label: "Order ID:", value: "SPX-ORD-000015" },
      { label: "Date:", value: "04/12/2025" },
      { label: "Payment:", value: "Prepaid" },
      { label: "Quantity:", value: "1" },
      { label: "Product:", value: "Shredded Latex Pillow" },
    ]
    : [
      { label: "Order ID:", value: order_id },
      { label: "Date:", value: order_date ? new Date(order_date).toLocaleDateString("en-IN") : "N/A" },
      { label: "Payment:", value: payment_method },
      { label: "Quantity:", value: String(totalQuantity || 1) },
      { label: "Product:", value: productSummary },
    ];

  doc.setFillColor(BRAND_COLORS.white);
  doc.setDrawColor(BRAND_COLORS.lightGray);
  doc.roundedRect(rightColumnX, contentY, leftColumnWidth, 55, 3, 3, "FD");

  let detailY = contentY + 8;
  const labelX = rightColumnX + 5;
  const valueX = labelX + 20;

  orderDetails.forEach(detail => {
    doc.setFont(FONT_NORMAL, "bold").setFontSize(9).setTextColor(BRAND_COLORS.text);
    doc.text(detail.label, labelX, detailY);
    doc.setFont(FONT_NORMAL, "normal").setFontSize(9).setTextColor(BRAND_COLORS.text);
    doc.text(String(detail.value), valueX, detailY, { maxWidth: leftColumnWidth - 30 });
    detailY += (detail.label === "Product:" ? 10 : 6); // More space for product
  });

  // 4. Footer Section
  const footerY = PAGE_HEIGHT - LABEL_MARGIN - 5;
  doc.setFont(FONT_NORMAL, "normal").setFontSize(10).setTextColor(BRAND_COLORS.text);
  doc.text("[Insert QR/Barcode]", PAGE_WIDTH - LABEL_MARGIN, footerY, { align: "right" });

  // Save the PDF
  doc.save(`SleepOnix-ShippingLabel-${order_id}.pdf`);
};