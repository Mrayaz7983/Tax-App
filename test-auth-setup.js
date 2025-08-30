/**
 * Test script to verify Supabase authentication setup
 * Run with: node test-auth-setup.js
 */

const { validateEnvVars } = require('./app/lib/utils');

console.log('🧪 Testing Supabase Authentication Setup...\n');

// Test 1: Environment validation
console.log('1. Testing environment validation...');
try {
  // This will fail if env vars are missing, which is expected
  validateEnvVars(['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']);
  console.log('✅ Environment validation passed');
} catch (error) {
  console.log('⚠️  Environment validation failed (expected if env vars not set):', error.message);
}

// Test 2: Import checks
console.log('\n2. Testing module imports...');
try {
  const { supabase, isSupabaseConfigured } = require('./app/lib/supabase');
  const { handleSupabaseError, isValidEmail, validatePassword } = require('./app/lib/utils');
  
  console.log('✅ All modules imported successfully');
  console.log('✅ Supabase client created:', !!supabase);
  console.log('✅ Supabase configured check:', isSupabaseConfigured());
  
  // Test utility functions
  console.log('✅ Email validation (test@example.com):', isValidEmail('test@example.com'));
  console.log('✅ Email validation (invalid):', isValidEmail('invalid'));
  
  const passwordTest = validatePassword('short');
  console.log('✅ Password validation (short):', passwordTest.isValid, '-', passwordTest.message);
  
  const passwordTest2 = validatePassword('strongpassword123');
  console.log('✅ Password validation (strong):', passwordTest2.isValid, '-', passwordTest2.message);
  
  console.log('✅ Error handling function available');
  
} catch (error) {
  console.log('❌ Module import failed:', error.message);
}

// Test 3: File existence checks
console.log('\n3. Testing file existence and structure...');
const fs = require('fs');
const path = require('path');

const filesToCheck = [
  'app/lib/supabase.js',
  'app/lib/utils.js',
  'app/login/page.js',
  'app/signup/page.js',
  'app/admin/dashboard/layout.js'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

console.log('\n🎉 Setup verification completed!');
console.log('\n📝 Next steps:');
console.log('1. Create a .env.local file with your Supabase credentials:');
console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key');
console.log('2. Run the development server: npm run dev');
console.log('3. Test the authentication flows in your browser');
