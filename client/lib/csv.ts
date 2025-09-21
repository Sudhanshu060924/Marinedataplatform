export type Row = {
  "Species Name": string;
  "Scientific Name": string;
  Zone: string;
  Location: string;
  "Sample Type": string;
  Date: string; // ISO date
};

export function parseCsv(text: string): Row[] {
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0].split(",");
  const rows: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const cells = splitCsvLine(line);
    const obj: any = {};
    header.forEach((h, idx) => {
      obj[h.trim()] = (cells[idx] ?? "").replace(/^\"|\"$/g, "");
    });
    rows.push(obj as Row);
  }
  return rows;
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { // escaped quote
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

export function downloadCsv(rows: Row[], filename = "data.csv") {
  const header = ["Species Name","Scientific Name","Zone","Location","Sample Type","Date"];
  const csv = [header.join(",")]
    .concat(
      rows.map(r =>
        [r["Species Name"], r["Scientific Name"], r.Zone, r.Location, r["Sample Type"], r.Date]
          .map((v) => (/,|\"/.test(String(v)) ? `"${String(v).replace(/\"/g, '""')}"` : String(v)))
          .join(",")
      )
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
