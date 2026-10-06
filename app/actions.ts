'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function value(formData: FormData, name: string) {
  const field = formData.get(name);
  return typeof field === 'string' ? field.trim() : '';
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
}

export async function signIn(formData: FormData) {
  const email = value(formData, 'email');
  const password = value(formData, 'password');

  if (!email || !password) redirect('/?error=signin');

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect('/?error=signin');
  redirect('/');
}

export async function signUp(formData: FormData) {
  const email = value(formData, 'email');
  const password = value(formData, 'password');
  const confirmPassword = value(formData, 'confirmPassword');

  if (!email || password.length < 8) redirect('/?error=signup');
  if (password !== confirmPassword) redirect('/?error=password_mismatch');

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback`,
    },
  });

  if (error) {
    console.error('Supabase sign-up failed:', {
      message: error.message,
      status: error.status,
      code: error.code,
    });

    const message = error.message.toLowerCase();
    if (message.includes('error sending confirmation email')) {
      redirect('/?error=email_delivery');
    }
    if (message.includes('email address not authorized')) {
      redirect('/?error=email_not_authorized');
    }
    if (message.includes('rate limit')) {
      redirect('/?error=email_rate_limit');
    }
    redirect('/?error=signup');
  }
  if (!data.session) redirect('/?notice=confirm');
  redirect('/');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export async function deleteAccount() {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) redirect('/');

  const { error } = await supabase.rpc('delete_current_user');
  if (error) {
    console.error('Supabase account deletion failed:', {
      code: error.code,
      message: error.message,
      hint: error.hint,
    });
    return false;
  }

  await supabase.auth.signOut();
  revalidatePath('/');
  redirect('/?notice=account_deleted');
}

export async function addTask(formData: FormData) {
  const title = value(formData, 'title');
  if (!title || title.length > 120) redirect('/?error=task');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/');

  const { error } = await supabase.from('tasks').insert({
    title,
    user_id: user.id,
  });

  if (error) redirect('/?error=task');
  revalidatePath('/');
}

export async function updateTask(formData: FormData) {
  const id = value(formData, 'id');
  const title = value(formData, 'title');
  if (!id || !title || title.length > 120) redirect('/?error=task');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/');

  const { error } = await supabase
    .from('tasks')
    .update({ title })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) redirect('/?error=task');
  revalidatePath('/');
}

export async function toggleTask(formData: FormData) {
  const id = value(formData, 'id');
  const completed = value(formData, 'completed') === 'true';
  if (!id) redirect('/?error=task');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/');

  const { error } = await supabase
    .from('tasks')
    .update({ completed: !completed })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) redirect('/?error=task');
  revalidatePath('/');
}

export async function deleteTask(formData: FormData) {
  const id = value(formData, 'id');
  if (!id) redirect('/?error=task');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/');

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) redirect('/?error=task');
  revalidatePath('/');
}