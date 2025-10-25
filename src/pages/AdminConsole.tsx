import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrg } from "@/contexts/OrgContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Trash2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Member {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

export default function AdminConsole() {
  const { user } = useAuth();
  const { currentOrg } = useOrg();
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentOrg) {
      fetchMembers();
    }
  }, [currentOrg]);

  const fetchMembers = async () => {
    if (!currentOrg) return;

    const { data, error } = await supabase
      .from("org_memberships")
      .select("*")
      .eq("org_id", currentOrg.id);

    if (error) {
      console.error("Error fetching members:", error);
      return;
    }

    // Fetch profile data separately for each member
    const membersWithProfiles = await Promise.all(
      (data || []).map(async (membership) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, email")
          .eq("user_id", membership.user_id)
          .single();

        return {
          ...membership,
          profiles: profile || { full_name: '', email: '' }
        };
      })
    );

    setMembers(membersWithProfiles);
  };

  const handleAddMember = async () => {
    if (!currentOrg || !newMemberEmail) return;

    setLoading(true);
    try {
      // Find user by email
      const { data: profile } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", newMemberEmail)
        .single();

      if (!profile) {
        toast({
          title: "User not found",
          description: "No user with this email exists.",
          variant: "destructive",
        });
        return;
      }

      // Add to organization
      const { error } = await supabase
        .from("org_memberships")
        .insert({
          org_id: currentOrg.id,
          user_id: profile.user_id,
          role: "member",
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already a member",
            description: "This user is already in the organization.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Member added",
        description: "User has been added to the organization.",
      });

      setNewMemberEmail("");
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
      toast({
        title: "Error",
        description: "Failed to add member.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (membershipId: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return;

    const { error } = await supabase
      .from("org_memberships")
      .delete()
      .eq("id", membershipId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove member.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Member removed",
      description: "User has been removed from the organization.",
    });

    fetchMembers();
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
        <h1 className="text-4xl font-bold mb-2">Admin Console</h1>
        <p className="text-muted-foreground">Manage your organization: {currentOrg.name}</p>
      </div>

      {/* Organization Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Organization Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Plan:</span>
              <Badge className="ml-2">{currentOrg.plan.toUpperCase()}</Badge>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Members:</span>
              <span className="ml-2 font-semibold">{members.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Member */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add Member
          </CardTitle>
          <CardDescription>Invite users to your organization by email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="user@example.com"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
            />
            <Button onClick={handleAddMember} disabled={loading || !newMemberEmail}>
              Add Member
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.profiles.full_name}</TableCell>
                  <TableCell>{member.profiles.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.role}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(member.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {member.user_id !== user?.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
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