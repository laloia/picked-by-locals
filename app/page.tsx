import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/martin-county/dog-friendly');
  return null;
}