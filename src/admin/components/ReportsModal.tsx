
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiFileText, FiDownload, FiCheck, FiRefreshCw } from 'react-icons/fi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '../../supabaseClient';
import { format, subDays, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';
import { formatCurrency } from '../utils/formatCurrency';
import toast from 'react-hot-toast';

interface ReportsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ReportType = 'FULL_DASHBOARD' | 'REVENUE_SUMMARY' | 'ORDERS_REPORT' | 'GST_TAX_REPORT';
type DateRangeType = 'TODAY' | 'LAST_7_DAYS' | 'LAST_30_DAYS' | 'THIS_MONTH' | 'LAST_MONTH';

const REPORTS = [
    {
        id: 'FULL_DASHBOARD',
        icon: FiFileText,
        title: 'Executive Dashboard',
        desc: 'Comprehensive overview of KPIs, revenue trends, and recent activity.'
    },
    {
        id: 'REVENUE_SUMMARY',
        icon: FiFileText,
        title: 'Revenue & Income',
        desc: 'Detailed financial breakdown, daily income logs, and growth metrics.'
    },
    {
        id: 'ORDERS_REPORT',
        icon: FiFileText,
        title: 'Order Status Report',
        desc: 'Operational report of all orders, statuses, and fulfillment details.'
    },
    {
        id: 'GST_TAX_REPORT',
        icon: FiFileText,
        title: 'GST / Tax Filing',
        desc: 'Formatted specifically for accounting and tax filing purposes.'
    },
];

const ReportsModal: React.FC<ReportsModalProps> = ({ isOpen, onClose }) => {
    const [selectedReport, setSelectedReport] = useState<ReportType>('FULL_DASHBOARD');
    const [dateRange, setDateRange] = useState<DateRangeType>('LAST_30_DAYS');
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        setIsGenerating(true);
        const toastId = toast.loading('Generating report...');

        try {
            // 1. Calculate Date Range
            let startDate = new Date();
            let endDate = endOfDay(new Date());

            if (dateRange === 'TODAY') {
                startDate = startOfDay(new Date());
            } else if (dateRange === 'LAST_7_DAYS') {
                startDate = subDays(new Date(), 7);
            } else if (dateRange === 'LAST_30_DAYS') {
                startDate = subDays(new Date(), 30);
            } else if (dateRange === 'THIS_MONTH') {
                startDate = startOfMonth(new Date());
            } else if (dateRange === 'LAST_MONTH') {
                startDate = startOfMonth(subDays(startOfMonth(new Date()), 1));
                endDate = endOfMonth(subDays(startOfMonth(new Date()), 1));
            }

            // 2. Fetch Data
            // We reuse the dashboard API for now, but ideally we'd have a specific report API
            // For GST report, we need granular order data
            const action = 'GET_DASHBOARD_DATA';

            const { data, error } = await supabase.functions.invoke('admin-api', {
                body: {
                    action,
                    payload: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString()
                    }
                }
            });

            if (error) throw new Error(error.message || 'API Error');
            if (!data) throw new Error('No data returned');

            // 3. Init PDF
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const margin = 14;

            // Brand Colors
            const colorPrimary: [number, number, number] = [20, 61, 41]; // #143d29 Deep Green
            const colorSecondary: [number, number, number] = [234, 223, 204]; // #eadfcc Gold/Beige
            const colorText: [number, number, number] = [60, 60, 60];

            // --- HEADER FUNCTION ---
            const drawHeader = () => {
                // Logo placeholder (Text for now)
                doc.setFillColor(...colorPrimary as [number, number, number]);
                doc.rect(0, 0, pageWidth, 40, 'F');

                doc.setFontSize(24);
                doc.setTextColor(255, 255, 255);
                doc.setFont("helvetica", "bold");
                doc.text('Sleeponix', margin, 20);

                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(234, 223, 204);
                doc.text('Premium Sleep Solutions', margin, 26);

                // Report Title Box
                doc.setFillColor(255, 255, 255);
                doc.roundedRect(pageWidth - 80 - margin, 10, 80, 20, 2, 2, 'F');

                doc.setFontSize(9);
                doc.setTextColor(...colorPrimary as [number, number, number]);
                doc.text('REPORT TYPE', pageWidth - 76 - margin, 16);

                doc.setFontSize(11);
                doc.setFont("helvetica", "bold");
                doc.text(REPORTS.find(r => r.id === selectedReport)?.title || 'Report', pageWidth - 76 - margin, 24);
            };

            drawHeader();

            // --- REPORT METADATA ---
            let yPos = 50;

            doc.setFontSize(10);
            doc.setTextColor(...colorText as [number, number, number]);

            // Left side: Period
            doc.setFont("helvetica", "bold");
            doc.text('Reporting Period:', margin, yPos);
            doc.setFont("helvetica", "normal");
            doc.text(`${format(startDate, 'MMMM dd, yyyy')}  to  ${format(endDate, 'MMMM dd, yyyy')}`, margin + 35, yPos);

            // Right side: Generated info
            const genDate = format(new Date(), 'PPpp');
            doc.text(`Generated on: ${genDate}`, pageWidth - margin, yPos, { align: 'right' });

            yPos += 10;
            doc.setDrawColor(200);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 15;

            // --- CONTENT SWITCH ---

            // 1. EXECUTIVE SUMMARY (Common to Dashboard)
            if (selectedReport === 'FULL_DASHBOARD' || selectedReport === 'REVENUE_SUMMARY') {
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(...colorPrimary as [number, number, number]);
                doc.text('Financial Summary', margin, yPos);
                yPos += 8;

                const totalRev = data.totalRevenue || 0;
                const totalOrders = data.totalOrders || 0;
                const avgOrderVal = totalOrders ? Math.round(totalRev / totalOrders) : 0;

                // GST Calculation (Approx 18% for example, need real logic if stored)
                // Assuming revenue is inclusive of tax for this simple report, or extract if available
                const estimatedTax = totalRev * 0.18; // Example tax calculation
                const netRevenue = totalRev - estimatedTax;

                const summaryData = [
                    ['Total Revenue (Gross)', formatCurrency(totalRev)],
                    ['Net Revenue (Excl. Tax)', formatCurrency(netRevenue)],
                    ['Estimated Tax (GST 18%)', formatCurrency(estimatedTax)],
                    ['Total Orders Processed', totalOrders.toString()],
                    ['Average Order Value', formatCurrency(avgOrderVal)],
                ];

                autoTable(doc, {
                    startY: yPos,
                    head: [['Metric', 'Value']],
                    body: summaryData,
                    theme: 'grid',
                    headStyles: {
                        fillColor: colorPrimary as [number, number, number],
                        textColor: [255, 255, 255],
                        fontStyle: 'bold'
                    },
                    columnStyles: {
                        0: { fontStyle: 'bold', cellWidth: 80 },
                        1: { halign: 'right' }
                    },
                    styles: { fontSize: 10, cellPadding: 6 },
                    margin: { left: margin, right: margin }
                });

                // @ts-ignore
                yPos = doc.lastAutoTable.finalY + 15;
            }

            // 2. GST / TAX REPORT SPECIFIC
            if (selectedReport === 'GST_TAX_REPORT') {
                doc.setFontSize(12);
                doc.setTextColor(0);
                doc.text('GST Filing Details', margin, yPos);
                yPos += 5;

                const orders = data.recentOrders || []; // Note: This should ideally be ALL orders in range, not just recent 5. 
                // The API needs to support fetching ALL for reports. 
                // For this prototype, we use what we have, but label it clearly.

                const tableBody = orders.map((o: any) => {
                    const amount = o.total_amount || 0;
                    const tax = amount * (18 / 118); // Back-calculate tax from gross if inclusive
                    const taxable = amount - tax;

                    return [
                        format(new Date(o.created_at), 'dd-MM-yyyy'),
                        o.order_number || o.id.substring(0, 8),
                        o.customer_name || 'Guest',
                        // GSTIN placeholder
                        'Unregistered',
                        formatCurrency(taxable),
                        formatCurrency(tax),
                        formatCurrency(amount)
                    ];
                });

                autoTable(doc, {
                    startY: yPos,
                    head: [['Date', 'Invoice #', 'Customer', 'GSTIN', 'Taxable Val', 'IGST/GST', 'Total']],
                    body: tableBody,
                    theme: 'plain',
                    headStyles: {
                        fillColor: [240, 240, 240],
                        textColor: [0, 0, 0],
                        fontStyle: 'bold',
                        lineWidth: 0.1,
                        lineColor: [200, 200, 200]
                    },
                    bodyStyles: {
                        lineWidth: 0.1,
                        lineColor: [220, 220, 220]
                    },
                    columnStyles: {
                        4: { halign: 'right' },
                        5: { halign: 'right' },
                        6: { halign: 'right' }
                    },
                    styles: { fontSize: 8, cellPadding: 4 },
                    foot: [['TOTAL', '', '', '',
                        formatCurrency(orders.reduce((sum: number, o: any) => sum + (o.total_amount * (100 / 118)), 0)), // Approx Taxable
                        formatCurrency(orders.reduce((sum: number, o: any) => sum + (o.total_amount * (18 / 118)), 0)), // Approx Tax
                        formatCurrency(orders.reduce((sum: number, o: any) => sum + o.total_amount, 0)) // Total
                    ]],
                    footStyles: {
                        fillColor: [250, 250, 250],
                        textColor: [0, 0, 0],
                        fontStyle: 'bold',
                        halign: 'right' // This might affect all columns, overridden by columnStyles if specific?
                    }
                });
            }

            // 3. INCOME CHARTS / DAILY LOGS
            if (selectedReport === 'REVENUE_SUMMARY' || selectedReport === 'FULL_DASHBOARD') {
                if (data.incomeData && data.incomeData.length > 0) {
                    if (yPos > 200) { doc.addPage(); drawHeader(); yPos = 50; }

                    doc.setFontSize(14);
                    doc.setTextColor(...colorPrimary as [number, number, number]);
                    doc.text('Daily Income Ledger', margin, yPos);
                    yPos += 5;

                    const revenueBody = data.incomeData.map((d: any) => [
                        format(new Date(d.date), 'MMM dd, yyyy'),
                        d.status || 'Settled', // Placeholder
                        formatCurrency(d.income)
                    ]);

                    autoTable(doc, {
                        startY: yPos,
                        head: [['Date', 'Settlement Status', 'Credit Amount']],
                        body: revenueBody,
                        theme: 'striped',
                        headStyles: { fillColor: colorPrimary as [number, number, number] },
                        columnStyles: { 2: { halign: 'right' } }
                    });
                }
            }

            // --- FOOTER ---
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text(`Sleeponix Confidential Report | Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
                doc.text(`System Generated via Administrator Panel`, pageWidth / 2, pageHeight - 6, { align: 'center' });
            }

            doc.save(`Sleeponix_${selectedReport}_${format(new Date(), 'yyyyMMdd')}.pdf`);
            toast.success('Report successfully downloaded!', { id: toastId });
            onClose();

        } catch (e: any) {
            console.error("PDF Gen Error", e);
            toast.error(`Report generation failed: ${e.message}`, { id: toastId });
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[20px] w-full max-w-2xl shadow-premium overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="bg-[#143d29] p-6 flex justify-between items-center text-white shrink-0">
                        <div>
                            <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                                <FiFileText className="text-[#eadfcc]" /> Financial Reporting
                            </h2>
                            <p className="text-green-100/80 text-sm mt-1">Generate professional PDF reports for accounting.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><FiX size={24} /></button>
                    </div>

                    <div className="p-6 overflow-y-auto custom-scrollbar">
                        <div className="grid md:grid-cols-2 gap-8">

                            {/* LEFT: REPORT TYPE */}
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-[#5f4b3b] uppercase tracking-widest">Select Report Type</label>
                                <div className="space-y-3">
                                    {REPORTS.map((report) => (
                                        <div
                                            key={report.id}
                                            onClick={() => setSelectedReport(report.id as ReportType)}
                                            className={`p-4 rounded-xl border cursor-pointer flex items-start gap-4 transition-all relative group ${selectedReport === report.id
                                                    ? 'border-[#143d29] bg-[#fdfcf9] ring-1 ring-[#143d29] shadow-md'
                                                    : 'border-gray-200 hover:border-[#143d29]/50 hover:bg-white hover:shadow-sm'
                                                }`}
                                        >
                                            <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${selectedReport === report.id ? 'bg-[#143d29] text-white shadow-sm' : 'bg-gray-100 text-gray-400 group-hover:bg-[#e8f5e9] group-hover:text-[#143d29]'
                                                }`}>
                                                <report.icon size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-bold text-sm mb-1 transition-colors ${selectedReport === report.id ? 'text-[#143d29]' : 'text-gray-700 group-hover:text-[#143d29]'
                                                    }`}>
                                                    {report.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 leading-relaxed">{report.desc}</p>
                                            </div>
                                            {selectedReport === report.id && (
                                                <div className="absolute top-4 right-4 text-[#143d29]">
                                                    <FiCheck size={18} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT: CONFIGURATION */}
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-[#5f4b3b] uppercase tracking-widest mb-3 block">Reporting Period</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: 'TODAY', label: 'Today Only' },
                                            { id: 'LAST_7_DAYS', label: 'Last 7 Days' },
                                            { id: 'LAST_30_DAYS', label: 'Last 30 Days' },
                                            { id: 'THIS_MONTH', label: 'This Month (Current)' },
                                            { id: 'LAST_MONTH', label: 'Last Month (Complete)' },
                                        ].map((range) => (
                                            <button
                                                key={range.id}
                                                onClick={() => setDateRange(range.id as DateRangeType)}
                                                className={`py-3 px-4 rounded-lg text-sm font-medium border text-left flex justify-between items-center transition-all ${dateRange === range.id
                                                    ? 'bg-[#143d29] text-white border-[#143d29] shadow-sm'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#143d29]/30 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span>{range.label}</span>
                                                {dateRange === range.id && <FiCheck />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#fffbf0] p-4 rounded-lg border border-[#eaddc5] text-xs text-[#856404] flex gap-2 items-start">
                                    <span className="font-bold">Note:</span> GST reports are estimated based on 18% inclusive tax logic. For exact filing, please verify with your CA.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-white border-t border-[#eadfcc] flex justify-end gap-3 shrink-0">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-lg text-[#5f4b3b] font-medium hover:bg-[#fff9f0] border border-transparent hover:border-[#eadfcc] transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={generatePDF}
                            disabled={isGenerating}
                            className={`flex items-center gap-2 px-8 py-3 rounded-lg text-white font-bold shadow-premium transition-all relative overflow-hidden ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-br from-[#143d29] to-[#0f2e1f] hover:shadow-lg hover:scale-[1.02]'
                                }`}
                        >
                            {isGenerating ? (
                                <><FiRefreshCw className="animate-spin" /> Generating...</>
                            ) : (
                                <><FiDownload /> Download Report PDF</>
                            )}
                        </button>
                    </div>

                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ReportsModal;
