interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

interface InvoiceData {
  invoice_number: string;
  date: string;
  due_date: string;
  status: string;
  amount: number;
  currency: string;
  items: InvoiceItem[];
  org_name?: string;
  customer_name?: string;
}

export const generateInvoicePDF = (invoice: InvoiceData): string => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #333;
        }
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .invoice-title {
          font-size: 32px;
          font-weight: bold;
          color: #2563eb;
        }
        .invoice-info {
          text-align: right;
        }
        .invoice-details {
          margin-bottom: 30px;
        }
        .invoice-details p {
          margin: 5px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
        }
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        .total-row {
          font-weight: bold;
          font-size: 18px;
        }
        .status {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        .status-paid {
          background-color: #10b981;
          color: white;
        }
        .status-pending {
          background-color: #f59e0b;
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="invoice-title">INVOICE</div>
          <p><strong>EduMentor+</strong></p>
          ${invoice.org_name ? `<p>${invoice.org_name}</p>` : ''}
        </div>
        <div class="invoice-info">
          <p><strong>Invoice #:</strong> ${invoice.invoice_number}</p>
          <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> ${new Date(invoice.due_date).toLocaleDateString()}</p>
          <p><span class="status status-${invoice.status}">${invoice.status.toUpperCase()}</span></p>
        </div>
      </div>

      <div class="invoice-details">
        <p><strong>Bill To:</strong></p>
        <p>${invoice.customer_name || 'Customer'}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(item => `
            <tr>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>${invoice.currency} ${item.unit_price.toFixed(2)}</td>
              <td>${invoice.currency} ${item.amount.toFixed(2)}</td>
            </tr>
          `).join('')}
          <tr class="total-row">
            <td colspan="3" style="text-align: right;">Total:</td>
            <td>${invoice.currency} ${invoice.amount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 40px; font-size: 12px; color: #666;">
        <p>Thank you for your business!</p>
        <p>For questions about this invoice, please contact support@edumentor.com</p>
      </div>
    </body>
    </html>
  `;

  // Create a Blob and download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice-${invoice.invoice_number}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return htmlContent;
};