import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbkydmsglinbrkafejeb.supabase.co';
const supabaseAnonKey = 'sb_publishable_0obh2TRzsD9G4l6lGfmBUQ_uW9i1DEP';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
