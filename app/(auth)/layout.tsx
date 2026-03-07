export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background grid min-h-screen w-full grid-cols-1 gap-5 p-5 lg:grid-cols-[4fr_3fr]">
      {/* Form Section */}
      <div className="mx-auto w-full lg:px-28">{children}</div>

      {/* Image Section */}
      <div className="hidden lg:relative lg:block lg:flex-1">
        <img
          className="absolute inset-0 h-full w-full rounded-4xl object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Authentication background"
          // fill
          // priority
          sizes="50vw"
        />
      </div>
    </div>
  );
}
