export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100 p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          System Update
        </h1>
        <p className="text-zinc-400 text-lg">
          We're currently performing some scheduled maintenance. We'll be back
          online shortly.
        </p>
        <div className="h-1 w-full bg-zinc-800 overflow-hidden rounded-full">
          <div className="h-full bg-blue-500 w-1/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
