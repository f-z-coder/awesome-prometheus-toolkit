import Image from "next/image"

export const Header = () => {
  return (
    <header className="border-b px-4 py-1">
      <div className="container mx-auto max-w-screen-lg flex items-center justify-between gap-4">
        <div className=" relative flex items-center justify-center w-32 h-16">
          <Image
            src="/logo.svg"
            alt="Awesome Prometheus Toolkit Logo"
            fill
            priority
          />
        </div>
        <div>
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Image src="/github.svg" alt="GitHub" width={20} height={20} />
            <span>{125} stars</span>
          </a>
        </div>
      </div>
    </header>
  )
}
