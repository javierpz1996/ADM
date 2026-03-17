import { upcomingMatches } from "@/lib/mock-data";
import { MatchCard } from "@/components/match-card";

export function MatchesSection() {
  return (
    <section id="matches" className="py-24 bg-background">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#00D4FF] mb-2">
            Schedule
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
            Upcoming Matches
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t miss any action. Check out the upcoming matches and mark your calendar.
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
}
