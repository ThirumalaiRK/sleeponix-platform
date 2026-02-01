import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';
const logo = "/images/og logo.png";

// --- Register Fonts ---
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2' },
    { src: 'https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2', fontWeight: 700 },
  ],
});

// --- Styles ---
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Inter',
  },
  labelContainer: {
    border: '2px solid black',
    padding: 20,
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid black',
    paddingBottom: 10,
    marginBottom: 20,
  },
  logo: {
    width: 80,
  },
  headerText: {
    fontSize: 10,
    textAlign: 'right',
  },
  addressSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addressBlock: {
    width: '50%',
  },
  addressTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addressContent: {
    fontSize: 12,
    lineHeight: 1.4,
  },
  mainContent: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    paddingVertical: 20,
  },
  orderDetails: {
    flexDirection: 'column',
  },
  orderId: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customerPhone: {
    fontSize: 14,
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  footerBadge: {
    border: '1px solid black',
    padding: '4px 8px',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

// --- Types ---
interface ShippingAddress {
  street: string;
  city: string;
  zip: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  customer: string;
  shippingAddress: ShippingAddress;
}

interface ShippingLabelPDFProps {
  order: Order;
}

// --- QR Code Generator ---
const useQRCode = (text: string) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    QRCode.toDataURL(text, { width: 200, margin: 1 })
      .then((url: string) => {
        if (mounted) {
          setQrCodeUrl(url);
        }
      })
      .catch((err: Error) => {
        console.error(err);
      });

    return () => {
      mounted = false;
    };
  }, [text]);

  return qrCodeUrl;
};

// --- PDF Component ---
const ShippingLabelPDF: React.FC<ShippingLabelPDFProps> = ({ order }) => {
  const qrCodeUrl = useQRCode(order.id);

  return (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.labelContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Image src={logo} style={styles.logo} />
            <View>
              <Text style={styles.headerText}>Order Date: {new Date(order.date).toLocaleDateString()}</Text>
              <Text style={styles.headerText}>Payment: {order.total > 0 ? 'Prepaid' : 'COD'}</Text>
            </View>
          </View>

          {/* Address */}
          <View style={styles.addressSection}>
            <View style={styles.addressBlock}>
              <Text style={styles.addressTitle}>SHIP TO:</Text>
              <Text style={styles.addressContent}>{order.customer}</Text>
              <Text style={styles.addressContent}>{order.shippingAddress.street}</Text>
              <Text style={styles.addressContent}>{`${order.shippingAddress.city}, ${order.shippingAddress.zip}`}</Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <View style={styles.orderDetails}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.customerPhone}>Phone: 9876543210</Text>
            </View>
            {qrCodeUrl && <Image src={qrCodeUrl} style={styles.qrCode} />}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerBadge}>FRAGILE - HANDLE WITH CARE</Text>
            <Text style={styles.footerBadge}>NATURAL LATEX PRODUCT</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ShippingLabelPDF;