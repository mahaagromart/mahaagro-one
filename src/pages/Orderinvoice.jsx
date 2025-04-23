import React, { useRef } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../public/assets/images/img/logo.webp";

const Invoice = () => {
    const invoiceRef = useRef(null);
    const buttonRef = useRef(null);

    const generatePDF = async () => {
        const invoice = invoiceRef.current;
        const button = buttonRef.current;
        if (!invoice) return;

        // Hide button before capture
        if (button) button.style.display = "none";

        // Capture the invoice
        const canvas = await html2canvas(invoice, {
            scale: 3, // Higher scale for better quality
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        // Define A4 page size
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth - 20; // Adjust width to fit within margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Calculate the position to center the image on the page
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        // Ensure content fits within A4 page limits
        if (imgHeight > pageHeight) {
            pdf.addImage(imgData, "PNG", x, 0, imgWidth, pageHeight);
        } else {
            pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        }

        pdf.save("invoice.pdf");

        // Show button after capture
        if (button) button.style.display = "block";
    };

    return (
        <div className="w-full max-w-[210mm] h-[360mm] mx-auto p-10 sm:p-10 bg-white shadow-md border relative">
            {/* Download Button */}
            <div className="flex justify-end mb-4">
                <button
                    ref={buttonRef}
                    onClick={generatePDF}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                    Export & Download PDF
                </button>
            </div>

            <div ref={invoiceRef} className="w-full h-full">
                {/* Invoice Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8"> {/* Added mt-8 for spacing */}
                    <h1 className="text-2xl font-bold mt-2 sm:mb-0">Tax Invoice</h1> {/* Added mb-4 for spacing on small screens */}
                    <div className="w-24 h-24">
                        <Image src={Logo} alt="Logo" className="w-full  mt-2 h-full object-contain" />
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="mt-5 border-b pb-4">
                    <p><strong>Invoice #:</strong> 101098</p>
                    <p><strong>Sold By:</strong> NOGA</p>
                    <p><strong>GST:</strong> 27AAACT1546M1Z5</p>
                    <p><strong>Date:</strong> 28-02-2025 04:17:10 PM</p>
                </div>

                {/* Shipping and Billing Address */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div>
                        <h2 className="text-lg font-semibold">Shipping To</h2>
                        <p>Shubham</p>
                        <p>shubhampatond@yahoo.com</p>
                        <p>8888842337</p>
                        <p>Goregaon, Mumbai</p>
                        <p>Mumbai 400065</p>
                    </div>
                    <div className="ml-auto">
                        <h2 className="text-lg font-semibold">Billing Address</h2>
                        <p>Shubham</p>
                        <p>8888842337</p>
                        <p>Goregaon, Mumbai</p>
                        <p>Mumbai 400065</p>
                    </div>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto mt-5">
                    <table className="w-full border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border p-2">SL</th>
                                <th className="border p-2">Item Details</th>
                                <th className="border p-2">Gross Amount</th>
                                <th className="border p-2">Discount</th>
                                <th className="border p-2">Taxable Amount</th>
                                <th className="border p-2">GST%</th>
                                <th className="border p-2">GST Amount</th>
                                <th className="border p-2">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">1</td>
                                <td className="border p-2">Pineapple Squash 750ml</td>
                                <td className="border p-2">₹165.00</td>
                                <td className="border p-2">₹50.00</td>
                                <td className="border p-2">₹115.00</td>
                                <td className="border p-2">12%</td>
                                <td className="border p-2">₹12.32</td>
                                <td className="border p-2">₹127.32</td>
                            </tr>
                            <tr>
                                <td className="border p-2">2</td>
                                <td className="border p-2">Mango Squash 750ml</td>
                                <td className="border p-2">₹165.00</td>
                                <td className="border p-2">₹50.00</td>
                                <td className="border p-2">₹115.00</td>
                                <td className="border p-2">12%</td>
                                <td className="border p-2">₹12.32</td>
                                <td className="border p-2">₹127.32</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Total Amount */}
                <div className="mt-5">
                    <p><strong>Shipping:</strong> ₹53.00</p>
                    <p><strong>Coupon Discount:</strong> ₹0.00</p>
                    <p className="text-xl font-semibold">Total: ₹283.00</p>
                    <p><strong>Amount in Words:</strong> Rs: Two Hundred Eighty-Three</p>
                </div>

                {/* Footer */}
                <div className="mt-3 border-t pt-4 text-sm">
                    <p>If you require any assistance, contact us:</p>
                    <p><strong>Phone:</strong> 8888842300, 8888842290, 8888842280, 8888842325</p>
                    <p><strong>Email:</strong> support@mahaagromart.com, info@mahaagromart.com</p>
                    <p><a href="https://mahaagromart.com" className="text-blue-600">https://mahaagromart.com</a></p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;