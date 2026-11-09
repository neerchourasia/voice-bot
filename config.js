// Public settings for sign-in. Fill these in after creating a free Supabase project (see README).
// The anon key is meant to be public: your data is protected by the row-level security rules in supabase/schema.sql.
// Leave both empty and the robot works exactly as before, with no login.
window.APP_CONFIG = {
  SUPABASE_URL: "",       // e.g. "https://abcdefgh.supabase.co"
  SUPABASE_ANON_KEY: "",  // the "anon public" key from Project Settings > API
  REQUIRE_LOGIN: true,    // true: the robot is locked until someone signs in. false: login is optional.
};
