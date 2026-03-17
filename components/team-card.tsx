import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Team } from "@/lib/mock-data";
import { Users } from "lucide-react";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="group relative bg-card border-border hover:border-[#00D4FF]/50 transition-all duration-300 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00D4FF]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-px bg-gradient-to-b from-[#00D4FF]/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur" />
      
      <CardHeader className="relative pb-0">
        <div className="flex items-start justify-between">
          {/* Team Logo */}
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-2xl font-bold text-[#00D4FF]">
              {team.logo}
            </div>
            <div className="absolute inset-0 rounded-lg bg-[#00D4FF]/18 blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
          </div>
          
          {/* Region Badge */}
          <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground border-border">
            {team.region}
          </Badge>
        </div>
        
        {/* Team Name */}
        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-[#00D4FF] transition-colors">
          {team.name}
        </h3>
      </CardHeader>
      
      <CardContent className="relative pt-4">
        {/* Players Header */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Users className="h-4 w-4" />
          <span>Roster</span>
        </div>
        
        {/* Players List */}
        <ul className="space-y-2">
          {team.players.map((player) => (
            <li
              key={player.id}
              className="flex items-center justify-between text-sm py-1.5 px-2 rounded bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <span className="text-foreground font-medium">{player.name}</span>
              <span className="text-muted-foreground text-xs">{player.role}</span>
            </li>
          ))}
        </ul>
        
        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-live font-semibold">{team.wins}W</span>
            <span className="text-destructive font-semibold">{team.losses}L</span>
          </div>
          <span className="text-[#00D4FF] font-bold">{team.points} pts</span>
        </div>
      </CardContent>
    </Card>
  );
}
