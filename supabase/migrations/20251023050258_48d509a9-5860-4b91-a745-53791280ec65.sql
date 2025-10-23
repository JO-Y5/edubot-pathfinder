-- Add UPDATE and DELETE policies for assessment_results table
CREATE POLICY "Users can update their own results"
ON assessment_results FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own results"
ON assessment_results FOR DELETE
USING (auth.uid() = user_id);

-- Add UPDATE and DELETE policies for feedback table
CREATE POLICY "Users can update their own feedback"
ON feedback FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own feedback"
ON feedback FOR DELETE
USING (auth.uid() = user_id);