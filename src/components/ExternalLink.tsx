import { ComponentPropsWithRef, forwardRef } from "react"

export const ExternalLink = forwardRef<
  HTMLAnchorElement,
  Omit<ComponentPropsWithRef<"a">, "className" | "rel" | "target">
>(function ExternalLink({ children, ...props }, ref) {
  return (
    <a
      {...props}
      ref={ref}
      className="external-link underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <svg
        className="h-5 w-5 ml-1 inline"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeWidth="2"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  )
})
