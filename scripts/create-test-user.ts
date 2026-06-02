import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUser() {
  const testEmail = 'teste@exemplo.com'
  const testPassword = 'Teste123!'

  // Create user using admin API
  const { data, error } = await supabase.auth.admin.createUser({
    email: testEmail,
    password: testPassword,
    email_confirm: true, // Auto-confirm email
  })

  if (error) {
    console.error('Error creating user:', error.message)
    return
  }

  console.log('Test user created successfully!')
  console.log('Email:', testEmail)
  console.log('Password:', testPassword)
  console.log('User ID:', data.user.id)

  // Create profile for the user
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: data.user.id,
      nome: 'Usuário Teste',
      telefone: '(11) 99999-9999'
    })

  if (profileError) {
    console.error('Error creating profile:', profileError.message)
  } else {
    console.log('Profile created successfully!')
  }
}

createTestUser()
