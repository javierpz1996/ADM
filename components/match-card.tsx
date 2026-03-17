import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Match } from "@/lib/mock-data";
import { Calendar, Clock } from "lucide-react";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <Card className="group relative bg-card border-border hover:border-[#00D4FF]/50 transition-all duration-300 overflow-hidden">
      {/* Live Glow Effect */}
      {match.isLive && (
        <div className="absolute inset-0 bg-gradient-to-r from-live/5 via-live/10 to-live/5 animate-pulse" />
      )}
      
      <CardContent className="relative p-6">
        {/* Header with Date/Time and Live Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{match.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{match.time}</span>
            </div>
          </div>
          
          {match.isLive && (
            <Badge className="bg-live text-white animate-pulse">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-current inline-block" />
              LIVE
            </Badge>
          )}
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between gap-4">
          {/* Team A */}
          <div className="flex-1 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-xl font-bold text-[#00D4FF]">
              {match.teamA.logo}
            </div>
            <h4 className="font-bold text-foreground truncate">{match.teamA.name}</h4>
            <p className="text-xs text-muted-foreground">{match.teamA.region}</p>
          </div>

          {/* VS / Score */}
          <div className="flex flex-col items-center gap-1">
            {match.isLive && match.scoreA !== undefined ? (
              <div className="flex items-center gap-2 text-2xl font-bold">
                <span className="text-foreground">{match.scoreA}</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">{match.scoreB}</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-muted-foreground">VS</div>
            )}
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Team B */}
          <div className="flex-1 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-xl font-bold text-[#00D4FF]">
              {match.teamB.logo}
            </div>
            <h4 className="font-bold text-foreground truncate">{match.teamB.name}</h4>
            <p className="text-xs text-muted-foreground">{match.teamB.region}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
