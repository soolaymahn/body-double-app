import { cn } from "@/lib/utils";

type OptionCardProps = {
  selected: boolean;
  title: string;
  description?: string;
  onClick: () => void;
  className?: string;
};

export function OptionCard({
  selected,
  title,
  description,
  onClick,
  className,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-3 text-left transition-colors",
        selected
          ? "border-primary bg-primary/8 ring-1 ring-primary/30"
          : "border-border bg-card hover:border-primary/40",
        className,
      )}
    >
      <div className="text-sm font-medium">{title}</div>
      {description ? (
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      ) : null}
    </button>
  );
}
