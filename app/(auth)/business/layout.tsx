export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-2xl p-5 lg:p-10">{children}</div>;
}
