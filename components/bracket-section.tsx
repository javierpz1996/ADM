"use client";

import { bracketMatches } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import type { BracketMatch } from "@/lib/mock-data";

function BracketMatchCard({ match }: { match: BracketMatch }) {
  const isFinal = match.round === 3;
  const isCompleted = match.winner !== null;

  return (
    <Card
      className={`relative bg-card border-border overflow-hidden ${
        isFinal ? "border-[#00D4FF]/50" : ""
      }`}
    >
      {/* Glow for final */}
      {isFinal && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/10 via-[#2563EB]/6 to-[#00D4FF]/10" />
      )}

      <div className="relative p-3">
        {/* Team A */}
        <div
          className={`flex items-center justify-between p-2 rounded transition-colors ${
            match.winner?.id === match.teamA?.id
              ? "bg-live/20 border border-live/30"
              : "bg-secondary/30"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-xs font-bold text-[#00D4FF]">
              {match.teamA?.logo || "TBD"}
            </div>
            <span className="text-sm font-medium text-foreground truncate max-w-[80px] sm:max-w-[120px]">
              {match.teamA?.name || "TBD"}
            </span>
          </div>
          {isCompleted && (
            <span
              className={`text-sm font-bold ${
                match.winner?.id === match.teamA?.id
                  ? "text-live"
                  : "text-muted-foreground"
              }`}
            >
              {match.scoreA}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-1.5" />

        {/* Team B */}
        <div
          className={`flex items-center justify-between p-2 rounded transition-colors ${
            match.winner?.id === match.teamB?.id
              ? "bg-live/20 border border-live/30"
              : "bg-secondary/30"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-xs font-bold text-[#00D4FF]">
              {match.teamB?.logo || "TBD"}
            </div>
            <span className="text-sm font-medium text-foreground truncate max-w-[80px] sm:max-w-[120px]">
              {match.teamB?.name || "TBD"}
            </span>
          </div>
          {isCompleted && (
            <span
              className={`text-sm font-bold ${
                match.winner?.id === match.teamB?.id
                  ? "text-live"
                  : "text-muted-foreground"
              }`}
            >
              {match.scoreB}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

export function BracketSection() {
  const quarterFinals = bracketMatches.filter((m) => m.round === 1);
  const semiFinals = bracketMatches.filter((m) => m.round === 2);
  const finals = bracketMatches.filter((m) => m.round === 3);

  return (
    <section
      id="bracket"
      className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background"
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#00D4FF] mb-2">
            Tournament
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
            Championship Bracket
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Single elimination bracket. Win or go home.
          </p>
        </div>

        {/* Bracket Container */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[900px] flex items-center justify-center gap-8">
            {/* Quarter Finals */}
            <div className="flex flex-col gap-6">
              <div className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Quarter Finals
              </div>
              <div className="flex flex-col gap-8">
                {quarterFinals.map((match) => (
                  <BracketMatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>

            {/* Connector Lines */}
            <div className="flex flex-col gap-[120px] py-8">
              <div className="w-12 h-px bg-border" />
              <div className="w-12 h-px bg-border" />
              <div className="w-12 h-px bg-border" />
              <div className="w-12 h-px bg-border" />
            </div>

            {/* Semi Finals */}
            <div className="flex flex-col gap-6">
              <div className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Semi Finals
              </div>
              <div className="flex flex-col gap-[140px]">
                {semiFinals.map((match) => (
                  <BracketMatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>

            {/* Connector Lines */}
            <div className="flex flex-col gap-[200px] py-8">
              <div className="w-12 h-px bg-border" />
              <div className="w-12 h-px bg-border" />
            </div>

            {/* Finals */}
            <div className="flex flex-col gap-6">
              <div className="text-center text-sm font-semibold text-[#00D4FF] uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
                <Trophy className="h-4 w-4" />
                Grand Finals
              </div>
              <div className="relative">
                {/* Trophy glow */}
                <div className="absolute -inset-4 bg-[#00D4FF]/10 rounded-xl blur-xl" />
                <div className="relative">
                  {finals.map((match) => (
                    <BracketMatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Note */}
        <p className="text-center text-xs text-muted-foreground mt-4 lg:hidden">
          Scroll horizontally to view full bracket
        </p>
      </div>
    </section>
  );
}
