import { teams } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function StandingsSection() {
  // Sort teams by points
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <section id="standings" className="py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#00D4FF] mb-2">
            Leaderboard
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
            Current Standings
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Live standings based on tournament performance.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="w-12 text-center text-muted-foreground">#</TableHead>
                <TableHead className="text-muted-foreground">Team</TableHead>
                <TableHead className="text-center text-muted-foreground">Played</TableHead>
                <TableHead className="text-center text-muted-foreground">Wins</TableHead>
                <TableHead className="text-center text-muted-foreground">Losses</TableHead>
                <TableHead className="text-center text-muted-foreground">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTeams.map((team, index) => (
                <TableRow
                  key={team.id}
                  className={`hover:bg-secondary/30 transition-colors ${
                    index < 4 ? "bg-[#00D4FF]/5" : ""
                  }`}
                >
                  <TableCell className="text-center font-bold">
                    <span
                      className={`${
                        index === 0
                          ? "text-[#00D4FF]"
                          : index < 4
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-sm font-bold text-[#00D4FF]">
                        {team.logo}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{team.name}</div>
                        <div className="text-xs text-muted-foreground">{team.region}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-foreground">
                    {team.wins + team.losses}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-live">
                    {team.wins}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-destructive">
                    {team.losses}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold text-[#00D4FF]">{team.points}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#00D4FF]/20 border border-[#00D4FF]/30" />
            <span>Playoff Qualified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
