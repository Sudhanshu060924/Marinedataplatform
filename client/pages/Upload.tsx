import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const ZONES = [
  "Andaman Sea",
  "Arabian Sea",
  "Bay of Bengal",
  "Indian Ocean",
  "Laccadive Sea",
];
const SAMPLE_TYPES = [
  "DNA",
  "Water Sample",
  "Fish Catch",
  "Plankton",
  "Sediment",
];

export default function Upload() {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [speciesName, setSpeciesName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [zone, setZone] = useState("");
  const [location, setLocation] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Please login",
        description: "You must be logged in before uploading data.",
      });
      navigate("/login?redirect=/upload");
      return;
    }
    if (!speciesName || !scientificName || !zone || !location || !sampleType) {
      toast({
        title: "Missing fields",
        description: "Please fill all fields before submitting.",
      });
      return;
    }
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please attach a CSV or Excel file.",
      });
      return;
    }
    toast({
      title: "Data uploaded successfully!",
      description: `${speciesName} • ${sampleType}${file ? ` • ${file.name}` : ""}`,
    });
    setSpeciesName("");
    setScientificName("");
    setZone("");
    setLocation("");
    setSampleType("");
    setFile(null);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
        Upload New Data
      </h1>
      <p className="text-muted-foreground mb-6">
        Submit species observations, catches, and samples via CSV/Excel.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">
              Species Name
            </label>
            <Input
              value={speciesName}
              onChange={(e) => setSpeciesName(e.target.value)}
              placeholder="e.g. Tuna"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Scientific Name
            </label>
            <Input
              value={scientificName}
              onChange={(e) => setScientificName(e.target.value)}
              placeholder="e.g. Thunnus albacares"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zone</label>
            <select
              className="h-10 w-full rounded-md border px-3 bg-background"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              required
            >
              <option value="" disabled>
                Select zone
              </option>
              {ZONES.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Location (lat, lng)
            </label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. 14.7883, 75.6216"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Sample Type
            </label>
            <select
              className="h-10 w-full rounded-md border px-3 bg-background"
              value={sampleType}
              onChange={(e) => setSampleType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select type
              </option>
              {SAMPLE_TYPES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              File Upload (CSV/Excel)
            </label>
            <input
              className="block w-full text-sm"
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {file && (
              <div className="mt-1 text-xs text-muted-foreground">
                Selected: {file.name}
              </div>
            )}
          </div>
        </div>
        <div className="pt-2 flex gap-3">
          <Button type="submit">Submit</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSpeciesName("");
              setScientificName("");
              setZone("");
              setLocation("");
              setSampleType("");
              setFile(null);
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
