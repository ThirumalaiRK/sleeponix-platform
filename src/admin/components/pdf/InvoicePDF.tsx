import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

// =======================================================
// UTILITIES (Merged from pdfUtils.ts and new snippet)
// =======================================================

// 1. Color Palette
const colors = {
  forestGreenDark: '#0B3D2E', // Used for Grand Total value and headings
  primary: '#0B3D2E', // Used for table header BG
  text: '#1A1A1A',
  lightGray: '#E5E5E5',
  white: '#FFFFFF',
  footer: '#6c757d',
  goldAccent: '#FFC300', // Used for Grand Total border (was borderBeige in the snippet)
  borderBeige: '#E5E5E5', // Using lightGray for border
};

// 2. Currency Formatter (Merged from snippet)
const formatCurrency = (amount: number = 0) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

// 3. Styles (S)
const S = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 60,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  h3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  body: {
    fontSize: 10,
    color: colors.text,
  },
  textCenter: {
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    marginBottom: 1,
  },
  tableColHeader: {
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    borderBottom: `1px solid ${colors.lightGray}`,
    backgroundColor: colors.white,
    paddingVertical: 4,
  },
  tableCell: {
    fontSize: 9,
    paddingHorizontal: 8,
    color: colors.text,
  },
  totalValue: { // Added from snippet
    fontFamily: 'Helvetica-Bold', // Using standard PDF font for bold
    fontSize: 14,
    color: colors.forestGreenDark,
  },
  footer: { // Updated footer style (using borderBeige which is same as lightGray)
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    borderTop: `1px solid ${colors.borderBeige}`,
    paddingTop: 10,
  },
});


// =======================================================
// COMPONENT LOGIC (Merged)
// =======================================================

const logo = "/images/og logo.png";

// Helper to validate and return a blank space for empty values
const V = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }
  return String(value);
};

// Address Component
const AddressBlock: React.FC<{ title: string; details: any }> = ({ title, details }) => {
  // Assuming 'details' contains street, city, state, zip as provided by the Order transformation in the parent component
  
  if (!details) {
    return (
      <View style={[S.flexCol, { maxWidth: '45%' }]}>
        <Text style={S.h3}>{title}</Text>
        <Text style={S.body}>N/A</Text>
      </View>
    );
  }

  const name = V(details.name);
  // Updated logic to use detailed address breakdown
  const street = V(details.street);
  const cityStateZip = `${V(details.city)} – ${V(details.zip)} ${V(details.state)}`;

  return (
    <View style={[S.flexCol, { maxWidth: '45%' }]}>
      <Text style={S.h3}>{title}</Text>
      <Text style={S.body}>{name}</Text>
      <Text style={S.body}>{street}</Text>
      <Text style={S.body}>{cityStateZip}</Text>
    </View>
  );
};

interface InvoiceProps {
  order: any; 
  qrCodeImage: string | null;
}

const InvoicePDF: React.FC<InvoiceProps> = ({ order, qrCodeImage }) => {
  if (!order) {
    return (
      <Document>
        <Page style={S.page}>
          <Text>No order data provided.</Text>
        </Page>
      </Document>
    );
  }

  const {
    invoice_id,
    invoice_date,
    payment_mode,
    customer_details,
    shipping_address,
    items,
    subtotal,
    discount,
    grand_total,
  } = order;

  return (
    <Document>
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={[S.flexRow, S.spaceBetween, S.mb40]}>
          <View style={S.flexCol}>
            <Image src={logo} style={{ width: 120, marginBottom: 20 }} />
            <Text style={S.h1}>TAX INVOICE</Text>
          </View>
          <View style={[S.flexCol, { alignItems: 'flex-end' }]}>
            <View style={S.flexRow}>
              <Text style={[S.body, { marginRight: 8 }]}>Invoice ID:</Text>
              <Text style={S.body}>{V(invoice_id)}</Text>
            </View>
            <View style={S.flexRow}>
              <Text style={[S.body, { marginRight: 8 }]}>Invoice Date:</Text>
              <Text style={S.body}>{V(invoice_date)}</Text>
            </View>
            <View style={S.flexRow}>
              <Text style={[S.body, { marginRight: 8 }]}>Payment Mode:</Text>
              <Text style={S.body}>{V(payment_mode)}</Text>
            </View>
          </View>
        </View>

        {/* Billed To & Ship To */}
        <View style={[S.flexRow, S.spaceBetween, S.mb40]}>
          <AddressBlock title="Billing Address" details={customer_details} />
          <AddressBlock title="Shipping Address" details={shipping_address || customer_details} />
        </View>

        {/* Items Table */}
        <View style={S.mb40}>
          <View style={[S.tableHeader, S.flexRow]}>
            <Text style={[S.tableColHeader, { flex: 3 }]}>Product Name</Text>
            <Text style={[S.tableColHeader, { flex: 1, textAlign: 'center' }]}>Qty</Text>
            <Text style={[S.tableColHeader, { flex: 1, textAlign: 'right' }]}>Unit Price (GST Inc.)</Text>
            <Text style={[S.tableColHeader, { flex: 1, textAlign: 'right' }]}>Total</Text>
          </View>
          {items?.map((item: any, i: number) => {
            const unit_price = item.price || 0;
            const qty = item.quantity || 0;
            const total_price = unit_price * qty;
            return (
              <View key={i} style={[S.tableRow, S.flexRow]}>
                <Text style={[S.tableCell, { flex: 3 }]}>{V(item.name)}</Text>
                <Text style={[S.tableCell, { flex: 1, textAlign: 'center' }]}>{qty}</Text>
                <Text style={[S.tableCell, { flex: 1, textAlign: 'right' }]}>{formatCurrency(unit_price)}</Text>
                <Text style={[S.tableCell, { flex: 1, textAlign: 'right' }]}>{formatCurrency(total_price)}</Text>
              </View>
            );
          })}
        </View>

        {/* Totals Section */}
        <View style={[S.flexRow, { justifyContent: 'flex-end' }]}>
          <View style={{ width: '40%' }}>
            <View style={[S.flexRow, S.spaceBetween, S.mb8]}>
              <Text style={S.body}>Subtotal</Text>
              <Text style={S.body}>{formatCurrency(subtotal || 0)}</Text>
            </View>
            <View style={[S.flexRow, S.spaceBetween, S.mb8]}>
              <Text style={S.body}>Discount</Text>
              <Text style={S.body}>{formatCurrency(discount || 0)}</Text>
            </View>
            <View style={[S.flexRow, S.spaceBetween, { borderTop: `1px solid ${colors.goldAccent}`, paddingTop: 12 }]}>
              <Text style={S.totalValue}>Grand Total</Text>
              <Text style={S.totalValue}>{formatCurrency(grand_total || 0)}</Text>
            </View>
            <Text style={[S.body, { textAlign: 'right', marginTop: 8, fontSize: 9, color: colors.footer }]}>
              (All prices are GST-inclusive.)
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View fixed style={[S.footer, S.flexRow, S.spaceBetween]}>
          <View style={[S.flexCol, { alignItems: 'center' }]}>
            {qrCodeImage && <Image src={qrCodeImage} style={{ width: 60, height: 60 }} />}
            <Text style={[S.body, S.textCenter, { fontSize: 8, color: colors.footer }]}>Track Your Order</Text>
          </View>
          <View style={{ maxWidth: '70%' }}>
            <Text style={[S.h3, { marginBottom: 4 }]}>Thank You!</Text>
            <Text style={{ fontSize: 9, color: colors.footer }}>
              For questions, contact us at support@sleeponix.com. All sales are final.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;