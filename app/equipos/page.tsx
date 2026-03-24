import { Navbar } from "@/components/navbar";
import { BroadcastTeamsRoster } from "@/components/broadcast-teams-roster";

export default function EquiposBroadcastPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <BroadcastTeamsRoster />
    </main>
  );
}
