import Link from "next/link";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const COPY =
  "Join one of the fastest growing and engaged communities in esports, where tragedy and triumph are equally impossible to predict.";

interface DiscordCtaBannerProps {
  discordUrl?: string;
  /** `light`: crema y burdeos (página de artículo). `dark`: tema ADM por defecto. */
  variant?: "dark" | "light";
}

export function DiscordCtaBanner({
  discordUrl = "https://discord.com",
  variant = "dark",
}: DiscordCtaBannerProps) {
  const light = variant === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-[10px] p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-8 lg:p-10",
        light
          ? "border border-[#8C2F30] bg-[#F1EFE4] shadow-[0_4px_24px_rgba(140,47,48,0.1)]"
          : "border border-white/15 bg-gradient-to-br from-[#1e1b4b]/95 via-[#1e1b4b]/90 to-[#0f0a2e] shadow-[0_0_40px_rgba(99,102,241,0.12)]",
      )}
    >
      <h3
        className={cn(
          "shrink-0 text-2xl font-black uppercase leading-tight tracking-tight md:text-3xl lg:max-w-[320px] lg:text-4xl",
          light ? "text-[#8C2F30]" : "text-white",
        )}
        style={{ fontFamily: "'Bison Bold', sans-serif" }}
      >
        Join the Discord
      </h3>
      <p
        className={cn(
          "flex-1 text-center text-sm leading-relaxed md:text-left md:text-base",
          light ? "text-[#8C2F30]/95" : "text-white/80",
        )}
      >
        {COPY}
      </p>
      <div className="flex shrink-0 justify-center md:justify-end">
        <Link
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full text-white transition-[transform,box-shadow]",
            light
              ? "bg-[#8C2F30] hover:bg-[#752628]"
              : "bg-gradient-to-br from-[#7c3aed] to-[#6366f1] shadow-[0_0_20px_rgba(99,102,241,0.45)] hover:scale-105 hover:shadow-[0_0_28px_rgba(124,58,237,0.55)]",
          )}
          aria-label="Unirse a Discord"
        >
          <Send className="h-6 w-6" strokeWidth={2.2} />
        </Link>
      </div>
    </div>
  );
}
