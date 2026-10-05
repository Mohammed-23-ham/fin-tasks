import AuthForm from '@/components/componants/AuthForm';
import Dashboard from '@/components/componants/Dashboard';
import { createClient } from '@/lib/supabase/server';

export default async function Home({ searchParams }: PageProps<'/'>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return <Dashboard />;

  const { error, notice } = await searchParams;

  return (
    <AuthForm
      error={typeof error === 'string' ? error : undefined}
      notice={typeof notice === 'string' ? notice : undefined}
    />
  );
}
