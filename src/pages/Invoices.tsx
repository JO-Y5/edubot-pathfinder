import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrg } from "@/contexts/OrgContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { generateInvoicePDF } from "@/services/invoices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: string;
  due_date: string;
  created_at: string;
  items: any;
}

export default function Invoices() {
  const { user } = useAuth();
  const { currentOrg } = useOrg();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, [user, currentOrg]);

  const fetchInvoices = async () => {
    if (!user) return;

    let query = supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (currentOrg) {
      query = query.eq("org_id", currentOrg.id);
    } else {
      query = query.eq("user_id", user.id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching invoices:", error);
    } else {
      setInvoices(data || []);
    }
    setLoading(false);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    const items = Array.isArray(invoice.items) ? invoice.items : [];
    generateInvoicePDF({
      invoice_number: invoice.invoice_number,
      date: invoice.created_at,
      due_date: invoice.due_date,
      status: invoice.status,
      amount: invoice.amount,
      currency: invoice.currency,
      items: items,
      org_name: currentOrg?.name,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      paid: "default",
      pending: "secondary",
      overdue: "destructive",
    };

    return <Badge variant={variants[status] || "secondary"}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Invoices</h1>
        <p className="text-muted-foreground">View and download your invoices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice History
          </CardTitle>
          <CardDescription>All your billing invoices in one place</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading invoices...</p>
          ) : invoices.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No invoices found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoice_number}
                    </TableCell>
                    <TableCell>
                      {invoice.currency} {invoice.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      {new Date(invoice.due_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}