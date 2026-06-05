import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full flex min-h-screen bg-black">
      {/* Left Image Side */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zinc-900 border-r border-solid-faint">
        <div className="absolute inset-0 vintage-image-filter opacity-40 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h2 className="font-serif text-5xl mb-4 leading-tight">Join the conversation.</h2>
          <p className="font-sans text-gray-400 max-w-md">
            Sign in to access exclusive content, newsletters, and a community of thinkers building the future.
          </p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <LoginForm />
      </div>
    </div>
  );
}
