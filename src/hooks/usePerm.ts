import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useOrg } from "@/contexts/OrgContext";

export const usePerm = (permission: string) => {
  const { user } = useAuth();
  const { currentOrg } = useOrg();
  const [hasPerm, setHasPerm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      if (!user) {
        setHasPerm(false);
        setLoading(false);
        return;
      }

      // Check if user is org owner
      if (currentOrg?.owner_id === user.id) {
        setHasPerm(true);
        setLoading(false);
        return;
      }

      // Check explicit permission
      const { data } = await supabase
        .from("permissions")
        .select("*")
        .eq("user_id", user.id)
        .eq("org_id", currentOrg?.id || null)
        .eq("permission", permission)
        .single();

      setHasPerm(!!data);
      setLoading(false);
    };

    checkPermission();
  }, [user, currentOrg, permission]);

  return { hasPerm, loading };
};