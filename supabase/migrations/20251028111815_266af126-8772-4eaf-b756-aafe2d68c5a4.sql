-- Drop existing INSERT policy for assessment_results
DROP POLICY IF EXISTS "Users can create their own results" ON assessment_results;

-- Create new INSERT policy that allows both authenticated users and service role
CREATE POLICY "Users can create their own results"
ON assessment_results
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Add service role policy for edge functions
CREATE POLICY "Service role can insert results"
ON assessment_results
FOR INSERT
TO service_role
WITH CHECK (true);

-- Ensure the table has the correct structure with all fields
COMMENT ON TABLE assessment_results IS 'Stores user assessment results with RIASEC scores and track recommendations';