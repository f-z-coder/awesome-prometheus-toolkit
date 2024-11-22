import Image from "next/image"

export const Footer = () => {
  return (
    <footer className="border-t p-4">
      <div className="container mx-auto max-w-screen-lg flex items-center justify-between gap-4 ">
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Contribute on GitHub
        </a>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground "
        >
          <span>Maintained by Last9</span>
          <Image src="/last9.svg" alt="Last9" width={20} height={20} />
        </a>
      </div>
    </footer>
  )
}
