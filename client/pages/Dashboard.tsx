import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sstSeries, fishCatchBySpecies, sampleTypeDistribution, sightingsPoints } from "@/lib/demoData";
import MapView from "@/components/MapView";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0ea5e9", "#14b8a6", "#6366f1", "#f59e0b", "#ef4444", "#10b981"];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Demo metrics and geospatial sightings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sea Surface Temperature</CardTitle>
            <CardDescription>Monthly average (°C)</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sstSeries} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[24, 30]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fish Catch by Species</CardTitle>
            <CardDescription>Demo counts</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fishCatchBySpecies} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="species" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sample Type Distribution</CardTitle>
            <CardDescription>Proportion of sample types</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sampleTypeDistribution} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={90}>
                  {sampleTypeDistribution.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Species Sightings Map</CardTitle>
            <CardDescription>Demo locations</CardDescription>
          </CardHeader>
          <CardContent>
            <MapView points={sightingsPoints} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
