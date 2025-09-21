import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Waves, Fish, Dna, Droplets } from "lucide-react";

export default function Index() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_10%_-20%,rgba(14,165,233,0.15),transparent),radial-gradient(400px_160px_at_90%_120%,rgba(20,184,166,0.15),transparent)]" />
        <div className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sky-700 font-semibold">
              <Waves className="h-5 w-5" /> Marine Data Platform
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
              AI-powered Unified Platform for Ocean, Fisheries, and Biodiversity Data
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Explore integrated marine datasets, visualize trends, and upload your own research data with ease.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/data-explorer">Explore Data</Link></Button>
              <Button asChild size="lg" variant="secondary"><Link to="/upload">Upload Data</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="sr-only">Overview</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-sky-100 text-sky-600">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Ocean Data</div>
                <p className="text-sm text-muted-foreground">Satellites, buoys, and in-situ observations</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-teal-100 text-teal-600">
                <Fish className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Fisheries</div>
                <p className="text-sm text-muted-foreground">Catch reports and species distribution</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-indigo-100 text-indigo-600">
                <Dna className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Biodiversity</div>
                <p className="text-sm text-muted-foreground">Genomics, surveys, and conservation status</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-6 md:p-8 bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Get started</h3>
            <p className="text-muted-foreground">Jump into the dashboard or explore data now.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline"><Link to="/dashboard">Open Dashboard</Link></Button>
            <Button asChild><Link to="/ai-insights">See AI Insights</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
