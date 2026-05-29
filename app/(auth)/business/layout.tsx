export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (<div className="min-h-screen flex flex-col items-center justify-center">
    <div className="mx-auto max-w-2xl p-5 lg:p-10 w-full">{children}</div>
  </div>)
}
