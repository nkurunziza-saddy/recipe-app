import clsx from "clsx";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors border",
        {
          "bg-primary text-primary-foreground border-transparent":
            variant === "default",
          "border-border text-foreground bg-background": variant === "outline",
          "bg-secondary text-secondary-foreground border-transparent":
            variant === "secondary",
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
