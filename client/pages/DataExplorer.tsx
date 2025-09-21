import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadCsv, parseCsv, type Row } from "@/lib/csv";
import { largeCsv } from "@/lib/largeDataset";

function useDataset() {
  return useMemo(() => parseCsv(largeCsv), []);
}

function Filters({ rows, onChange }: { rows: Row[]; onChange: (f: FilterState) => void }) {
  const species = useMemo(() => Array.from(new Set(rows.map(r => r["Species Name"]))).sort(), [rows]);
  const zones = useMemo(() => Array.from(new Set(rows.map(r => r.Zone))).sort(), [rows]);
  const [state, setState] = useState<FilterState>({ species: "", zone: "", from: "", to: "" });

  const update = (patch: Partial<FilterState>) => {
    const next = { ...state, ...patch };
    setState(next);
    onChange(next);
  };

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div>
        <label className="block text-sm font-medium mb-1">Species</label>
        <select className="h-10 w-full rounded-md border px-3 bg-background" value={state.species} onChange={(e)=>update({species:e.target.value})}>
          <option value="">All</option>
          {species.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Zone</label>
        <select className="h-10 w-full rounded-md border px-3 bg-background" value={state.zone} onChange={(e)=>update({zone:e.target.value})}>
          <option value="">All</option>
          {zones.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">From</label>
        <Input type="date" value={state.from} onChange={(e)=>update({from:e.target.value})} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">To</label>
        <Input type="date" value={state.to} onChange={(e)=>update({to:e.target.value})} />
      </div>
      <div className="md:col-span-4">
        <Button variant="ghost" onClick={()=>{setState({species:"",zone:"",from:"",to:""}); onChange({species:"",zone:"",from:"",to:""});}}>Reset</Button>
      </div>
    </div>
  );
}

interface FilterState { species: string; zone: string; from: string; to: string; }

function applyFilters(rows: Row[], f: FilterState) {
  return rows.filter(r => {
    if (f.species && r["Species Name"] !== f.species) return false;
    if (f.zone && r.Zone !== f.zone) return false;
    if (f.from && new Date(r.Date) < new Date(f.from)) return false;
    if (f.to && new Date(r.Date) > new Date(f.to)) return false;
    return true;
  });
}

type SortKey = "Species Name" | "Scientific Name" | "Zone" | "Location" | "Sample Type" | "Date";
interface SortState { key: SortKey; dir: "asc" | "desc"; }

function getLatLng(location: string): { lat: number; lng: number } | null {
  const m = location.match(/(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/);
  if (!m) return null;
  return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
}

function Table({ rows, sort, onSort }: { rows: Row[]; sort: SortState; onSort: (k: SortKey) => void }) {
  return (
    <div className="overflow-auto rounded-md border">
      <table className="min-w-full text-sm">
        <thead className="bg-secondary/50">
          <tr className="text-left">
            {(["Species Name","Scientific Name","Zone","Location","Sample Type","Date"] as SortKey[]).map((k)=> (
              <th key={k} className="px-3 py-2 whitespace-nowrap cursor-pointer select-none" onClick={()=>onSort(k)}>
                <span className="inline-flex items-center gap-1">
                  {k}
                  {sort.key===k && (<span className="text-muted-foreground">{sort.dir === "asc" ? "▲" : "▼"}</span>)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="px-3 py-2">{r["Species Name"]}</td>
              <td className="px-3 py-2">{r["Scientific Name"]}</td>
              <td className="px-3 py-2">{r.Zone}</td>
              <td className="px-3 py-2">{(() => { const ll = getLatLng(r.Location); return ll ? (
                <a className="text-primary hover:underline" href={`https://www.google.com/maps?q=${ll.lat},${ll.lng}`} target="_blank" rel="noreferrer">{r.Location}</a>
              ) : r.Location; })()}</td>
              <td className="px-3 py-2">{r["Sample Type"]}</td>
              <td className="px-3 py-2">{r.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function sortRows(rows: Row[], sort: SortState): Row[] {
  const { key, dir } = sort;
  const mul = dir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const va = key === "Date" ? new Date(a.Date).getTime() : key === "Location" ? (getLatLng(a.Location)?.lat ?? 0) : (a as any)[key];
    const vb = key === "Date" ? new Date(b.Date).getTime() : key === "Location" ? (getLatLng(b.Location)?.lat ?? 0) : (b as any)[key];
    if (typeof va === "number" && typeof vb === "number") return (va - vb) * mul;
    return String(va).localeCompare(String(vb)) * mul;
  });
}

export default function DataExplorer() {
  const all = useDataset();
  const [filters, setFilters] = useState<FilterState>({ species: "", zone: "", from: "", to: "" });
  const [visible, setVisible] = useState(30);

  const [sort, setSort] = useState<SortState>({ key: "Date", dir: "desc" });
  const filtered = useMemo(() => applyFilters(all, filters), [all, filters]);
  const sorted = useMemo(() => sortRows(filtered, sort), [filtered, sort]);
  const pageRows = sorted.slice(0, visible);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Data Explorer</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => downloadCsv(sorted, "marine-data.csv")}>Export CSV</Button>
          <Button asChild><a href="/data-explorer/full">Open full view</a></Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Filters rows={all} onChange={setFilters} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results ({filtered.length.toLocaleString()})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table rows={pageRows} sort={sort} onSort={(k)=> setSort(s => s.key===k ? { key:k, dir: s.dir === "asc" ? "desc" : "asc" } : { key:k, dir:"asc" })} />
          {visible < sorted.length && (
            <div className="pt-4 flex justify-center">
              <Button onClick={() => setVisible(v => v + 30)}>Show more</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function DataExplorerFull() {
  const all = useDataset();
  const [filters, setFilters] = useState<FilterState>({ species: "", zone: "", from: "", to: "" });
  const [sort, setSort] = useState<SortState>({ key: "Date", dir: "desc" });
  const filtered = useMemo(() => applyFilters(all, filters), [all, filters]);
  const sorted = useMemo(() => sortRows(filtered, sort), [filtered, sort]);
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Data Explorer — Full View</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => downloadCsv(filtered, "marine-data-full.csv")}>Download CSV</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Filters rows={all} onChange={setFilters} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>All Results ({filtered.length.toLocaleString()})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[70vh] overflow-auto">
            <Table rows={filtered} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
