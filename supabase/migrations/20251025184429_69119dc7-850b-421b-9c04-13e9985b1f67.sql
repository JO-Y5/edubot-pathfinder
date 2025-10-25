-- Phase 8: Groups, Enrollments, Permissions, Invoices

-- Groups/Classes table
CREATE TABLE public.groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can view groups"
  ON public.groups FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.org_memberships
      WHERE org_id = groups.org_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Org owners can manage groups"
  ON public.groups FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE id = groups.org_id
      AND owner_id = auth.uid()
    )
  );

-- Class enrollments
CREATE TABLE public.class_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

ALTER TABLE public.class_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their enrollments"
  ON public.class_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Group managers can manage enrollments"
  ON public.class_enrollments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.groups g
      JOIN public.organizations o ON g.org_id = o.id
      WHERE g.id = class_enrollments.group_id
      AND o.owner_id = auth.uid()
    )
  );

-- Permissions table
CREATE TABLE public.permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  permission TEXT NOT NULL,
  granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  granted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  UNIQUE(user_id, org_id, permission)
);

ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their permissions"
  ON public.permissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Org owners can manage permissions"
  ON public.permissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE id = permissions.org_id
      AND owner_id = auth.uid()
    )
  );

-- Invoices table
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending',
  due_date TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  items JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CHECK ((user_id IS NOT NULL AND org_id IS NULL) OR (user_id IS NULL AND org_id IS NOT NULL))
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their invoices"
  ON public.invoices FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE id = invoices.org_id
      AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Org owners can manage invoices"
  ON public.invoices FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE id = invoices.org_id
      AND owner_id = auth.uid()
    )
  );

-- Triggers for updated_at
CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON public.groups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();