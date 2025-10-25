import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrg } from "@/contexts/OrgContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Trash2, BarChart3, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Group {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface UsageReport {
  users: number;
  last30d: {
    assessments: number;
    clicks: number;
    saves: number;
    completes: number;
  };
}

export default function AdminAdvanced() {
  const { user } = useAuth();
  const { currentOrg } = useOrg();
  const { toast } = useToast();
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageReport, setUsageReport] = useState<UsageReport | null>(null);

  useEffect(() => {
    if (currentOrg) {
      fetchGroups();
      fetchUsageReport();
    }
  }, [currentOrg]);

  const fetchGroups = async () => {
    if (!currentOrg) return;

    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("org_id", currentOrg.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching groups:", error);
      return;
    }

    setGroups(data || []);
  };

  const fetchUsageReport = async () => {
    if (!currentOrg) return;

    try {
      const { data, error } = await supabase.functions.invoke('usage-report', {
        body: { org_id: currentOrg.id },
      });

      if (error) throw error;
      setUsageReport(data);
    } catch (error) {
      console.error("Error fetching usage report:", error);
    }
  };

  const handleCreateGroup = async () => {
    if (!currentOrg || !newGroupName || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("groups")
        .insert({
          org_id: currentOrg.id,
          name: newGroupName,
          description: newGroupDesc,
          created_by: user.id,
        });

      if (error) throw error;

      toast({
        title: "Group created",
        description: "New group has been created successfully.",
      });

      setNewGroupName("");
      setNewGroupDesc("");
      fetchGroups();
    } catch (error) {
      console.error("Error creating group:", error);
      toast({
        title: "Error",
        description: "Failed to create group.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm("Are you sure you want to delete this group?")) return;

    const { error } = await supabase
      .from("groups")
      .delete()
      .eq("id", groupId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete group.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Group deleted",
      description: "Group has been deleted successfully.",
    });

    fetchGroups();
  };

  if (!currentOrg) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>No Organization Selected</CardTitle>
            <CardDescription>Please select or create an organization first.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Advanced Admin</h1>
        <p className="text-muted-foreground">Groups, usage reports, and analytics</p>
      </div>

      {/* Usage Report */}
      {usageReport && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageReport.users}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Assessments (30d)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageReport.last30d.assessments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageReport.last30d.saves}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageReport.last30d.completes}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Group */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Group/Class
          </CardTitle>
          <CardDescription>Organize users into groups for better management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <Input
              placeholder="Description (optional)"
              value={newGroupDesc}
              onChange={(e) => setNewGroupDesc(e.target.value)}
            />
            <Button onClick={handleCreateGroup} disabled={loading || !newGroupName}>
              Create Group
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Groups List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.description || '-'}</TableCell>
                  <TableCell>
                    {new Date(group.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}