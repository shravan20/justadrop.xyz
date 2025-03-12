# Supabase Database Seeding Implementation Plan

## Overview

This document outlines the process for seeding the Supabase database with data from the `seed.sql` file.

## Implementation Approach

### Option 1: Supabase Dashboard (Recommended for manual seeding)

1. Log in to the Supabase dashboard at <https://app.supabase.com/>
2. Select your project (with ID: yojklwblzbtrsnlqtrhq)
3. Navigate to the SQL Editor section
4. Create a new query
5. Copy and paste the contents of the seed.sql file
6. Run the query

### Option 2: Create a Seeding Script (For automated/programmatic seeding)

1. Create a Node.js script (`scripts/seed-database.js`) to execute SQL commands:

```javascript
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Access Supabase credentials from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY; // Note: needs service role key for database operations

// Validation
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Initialize client
const supabase = createClient(supabaseUrl, supabaseKey);

// Read SQL file
const seedSQL = fs.readFileSync('./supabase/seed.sql', 'utf8');

// Parse SQL statements - simple version
const statements = seedSQL
  .split(';')
  .map(stmt => stmt.trim())
  .filter(stmt => stmt.length > 0);

async function seedDatabase() {
  console.log(`Executing ${statements.length} SQL statements...`);
  
  for (let i = 0; i < statements.length; i++) {
    try {
      const { data, error } = await supabase.rpc('exec_sql', { 
        sql: statements[i] 
      });
      
      if (error) throw error;
      console.log(`Statement ${i+1}/${statements.length} executed successfully`);
    } catch (err) {
      console.error(`Failed to execute statement ${i+1}:`, err);
    }
  }
}

seedDatabase();
```

2. Add this to your package.json scripts:

```json
"scripts": {
  "seed": "node scripts/seed-database.js"
}
```

3. Install dependencies:

```
npm install dotenv
```

### Prerequisites for Option 2

This approach requires:

1. Setting up a service role key in your Supabase project
2. Adding the key to your .env file:

```
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

3. Creating the `exec_sql` RPC function in your Supabase project

To create this function, run this SQL in the Supabase SQL Editor:

```sql
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;
```

### Option 3: Supabase CLI (If installed)

1. Install the Supabase CLI (you were having issues with this previously)
2. Login to Supabase:

```
supabase login
```

3. Link your project:

```
supabase link --project-ref yojklwblzbtrsnlqtrhq
```

4. Push the seed SQL:

```
supabase db push --seed-file supabase/seed.sql
```

## Verification

After seeding, verify the data by:

1. Querying tables in the Supabase dashboard Table Editor
2. Run test queries to ensure relationships are correctly established:

```sql
-- Test users table
SELECT * FROM users LIMIT 5;

-- Test opportunities table
SELECT * FROM opportunities LIMIT 5;

-- Test relationships
SELECT u.name, o.title 
FROM users u
JOIN opportunities o ON u.id = o.organization_id
LIMIT 5;
```
