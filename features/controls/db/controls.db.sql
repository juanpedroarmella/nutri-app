-- Controls table for storing patient consultation notes
CREATE TABLE controls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id_auth UUID NOT NULL,
  consultation_date DATE NOT NULL,
  notes TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add RLS policies
ALTER TABLE controls ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to see their own controls
CREATE POLICY "Users can view their own controls" ON controls
FOR SELECT USING (auth.uid() = id_auth);

-- Policy for admins to see all controls
CREATE POLICY "Admins can view all controls" ON controls
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id_auth = auth.uid() 
    AND users.role = 'admin'
  )
);

-- Policy for admins to insert controls
CREATE POLICY "Admins can insert controls" ON controls
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id_auth = auth.uid() 
    AND users.role = 'admin'
  )
);

-- Policy for admins to update controls
CREATE POLICY "Admins can update controls" ON controls
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id_auth = auth.uid() 
    AND users.role = 'admin'
  )
);

-- Policy for admins to delete controls
CREATE POLICY "Admins can delete controls" ON controls
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id_auth = auth.uid() 
    AND users.role = 'admin'
  )
);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_controls_updated_at 
BEFORE UPDATE ON controls 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Index for better performance
CREATE INDEX idx_controls_user_id ON controls(user_id);
CREATE INDEX idx_controls_consultation_date ON controls(consultation_date);