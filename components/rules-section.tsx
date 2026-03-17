import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Users, Trophy, AlertCircle, Gamepad2 } from "lucide-react";

const rules = [
  {
    icon: Users,
    title: "Team Requirements",
    description:
      "Each team must have 5 active players and up to 2 substitutes. All players must be registered before the tournament starts.",
  },
  {
    icon: Gamepad2,
    title: "Match Format",
    description:
      "All matches are Best of 3 (Bo3) except for the Grand Finals which is Best of 5 (Bo5). Captain's Mode is the only game mode allowed.",
  },
  {
    icon: Clock,
    title: "Scheduling",
    description:
      "Teams must be ready 15 minutes before their scheduled match. Failure to show up within 15 minutes results in a forfeit.",
  },
  {
    icon: Shield,
    title: "Fair Play",
    description:
      "Any form of cheating, exploits, or unsportsmanlike conduct will result in immediate disqualification and prize forfeiture.",
  },
  {
    icon: Trophy,
    title: "Prize Distribution",
    description:
      "1st Place: $1,000,000 | 2nd Place: $500,000 | 3rd-4th: $150,000 each | 5th-8th: $50,000 each.",
  },
  {
    icon: AlertCircle,
    title: "Disputes",
    description:
      "All disputes must be submitted within 10 minutes of match completion. Admin decisions are final.",
  },
];

export function RulesSection() {
  return (
    <section
      id="rules"
      className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background"
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#00D4FF] mb-2">
            Guidelines
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
            Tournament Rules
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Fair competition is our priority. Please review all rules before participating.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-[#00D4FF]/30 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/30">
                    <rule.icon className="h-5 w-5 text-[#00D4FF]" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{rule.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rule.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
