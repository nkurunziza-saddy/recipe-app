import clsx from "clsx";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl bg-foreground border border-gray-200 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
