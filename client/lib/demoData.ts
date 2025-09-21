export const sstSeries = [
  { month: "Jan", value: 26.1 },
  { month: "Feb", value: 26.4 },
  { month: "Mar", value: 27.2 },
  { month: "Apr", value: 28.0 },
  { month: "May", value: 28.7 },
  { month: "Jun", value: 28.2 },
  { month: "Jul", value: 27.6 },
  { month: "Aug", value: 27.1 },
  { month: "Sep", value: 27.4 },
  { month: "Oct", value: 27.9 },
  { month: "Nov", value: 27.2 },
  { month: "Dec", value: 26.6 },
];

export const fishCatchBySpecies = [
  { species: "Tuna", count: 120 },
  { species: "Sardine", count: 180 },
  { species: "Mackerel", count: 95 },
  { species: "Shark", count: 40 },
  { species: "Lobster", count: 30 },
  { species: "Squid", count: 140 },
];

export const sampleTypeDistribution = [
  { type: "DNA", value: 22 },
  { type: "Water", value: 30 },
  { type: "Fish Catch", value: 28 },
  { type: "Plankton", value: 15 },
  { type: "Sediment", value: 5 },
];

export interface MapPoint {
  lat: number;
  lng: number;
  label: string;
  zone: string;
}

export const sightingsPoints: MapPoint[] = [
  { lat: 16.1037, lng: 84.4794, label: "Coral Fish", zone: "Andaman Sea" },
  { lat: 15.5135, lng: 81.4461, label: "Shark", zone: "Laccadive Sea" },
  { lat: 17.3989, lng: 85.4798, label: "Tuna", zone: "Andaman Sea" },
  { lat: 14.8945, lng: 70.8471, label: "Coral Fish", zone: "Bay of Bengal" },
  { lat: 9.7017, lng: 79.7906, label: "Octopus", zone: "Indian Ocean" },
  { lat: 14.0251, lng: 71.3945, label: "Coral Fish", zone: "Arabian Sea" },
  { lat: 7.6859, lng: 76.0922, label: "Anchovy", zone: "Arabian Sea" },
  { lat: 6.4343, lng: 83.889, label: "Sardine", zone: "Andaman Sea" },
  { lat: 17.5407, lng: 87.6722, label: "Squid", zone: "Indian Ocean" },
  { lat: 17.8779, lng: 78.8817, label: "Crab", zone: "Laccadive Sea" },
];

export const demoCsv = `Species Name,Scientific Name,Zone,Location,Sample Type,Date
Coral Fish,Chromis viridis,Andaman Sea,"16.1037, 84.4794",Plankton,2023-12-05
Shark,Carcharhinus limbatus,Laccadive Sea,"15.5135, 81.4461",Fish Catch,2023-04-30
Tuna,Thunnus albacares,Andaman Sea,"17.3989, 85.4798",Fish Catch,2023-12-06
Coral Fish,Chromis viridis,Bay of Bengal,"14.8945, 70.8471",DNA,2024-08-12
Octopus,Octopus vulgaris,Indian Ocean,"9.7017, 79.7906",Fish Catch,2024-03-15
Coral Fish,Chromis viridis,Arabian Sea,"14.0251, 71.3945",DNA,2025-01-11
Anchovy,Engraulis encrasicolus,Arabian Sea,"7.6859, 76.0922",Plankton,2023-01-12
Sardine,Sardinella longiceps,Andaman Sea,"6.4343, 83.889",Water Sample,2023-11-07
Squid,Loligo vulgaris,Indian Ocean,"17.5407, 87.6722",Water Sample,2025-02-23
Crab,Portunus pelagicus,Laccadive Sea,"17.8779, 78.8817",Sediment,2023-07-20
Mackerel,Scomber scombrus,Andaman Sea,"5.8076, 77.838",Water Sample,2024-09-29
Sardine,Sardinella longiceps,Bay of Bengal,"5.7854, 72.6895",Sediment,2025-09-21
Squid,Loligo vulgaris,Bay of Bengal,"5.3364, 87.7887",Fish Catch,2025-06-04
Lobster,Homarus gammarus,Indian Ocean,"10.3184, 81.4993",Fish Catch,2023-12-01
Coral Fish,Chromis viridis,Andaman Sea,"14.0474, 84.4331",DNA,2023-06-02
Squid,Loligo vulgaris,Arabian Sea,"6.0872, 80.8179",DNA,2025-05-03
Tuna,Thunnus albacares,Andaman Sea,"18.936, 76.808",Plankton,2024-04-29
Squid,Loligo vulgaris,Andaman Sea,"7.6797, 84.9204",Plankton,2025-01-21
Sardine,Sardinella longiceps,Laccadive Sea,"6.8474, 71.0438",Plankton,2023-01-28
Squid,Loligo vulgaris,Laccadive Sea,"9.833, 86.9932",Fish Catch,2025-09-21
Anchovy,Engraulis encrasicolus,Bay of Bengal,"17.5322, 89.8241",Water Sample,2024-12-11
Octopus,Octopus vulgaris,Bay of Bengal,"5.4309, 76.5811",Sediment,2024-06-25
Shark,Carcharhinus limbatus,Laccadive Sea,"12.2328, 74.9753",Fish Catch,2022-12-28
Tuna,Thunnus albacares,Andaman Sea,"6.9319, 80.9175",Plankton,2025-09-12
Mackerel,Scomber scombrus,Arabian Sea,"14.0136, 80.2139",DNA,2023-01-21
Anchovy,Engraulis encrasicolus,Laccadive Sea,"18.4965, 84.2141",DNA,2025-03-09
Lobster,Homarus gammarus,Arabian Sea,"10.5072, 85.3881",Fish Catch,2025-03-21
Coral Fish,Chromis viridis,Indian Ocean,"17.5658, 70.0246",Plankton,2025-06-16
Lobster,Homarus gammarus,Andaman Sea,"18.8117, 81.9359",Water Sample,2025-08-09
Shark,Carcharhinus limbatus,Indian Ocean,"9.5933, 76.4406",Plankton,2024-12-09
Anchovy,Engraulis encrasicolus,Andaman Sea,"14.8097, 83.7017",Fish Catch,2023-07-06
Lobster,Homarus gammarus,Indian Ocean,"6.8529, 89.8428",Water Sample,2023-02-16
Tuna,Thunnus albacares,Andaman Sea,"14.9447, 79.564",Water Sample,2023-05-25
Coral Fish,Chromis viridis,Laccadive Sea,"18.6077, 70.293",Water Sample,2023-12-23
Anchovy,Engraulis encrasicolus,Laccadive Sea,"15.8291, 89.6076",Sediment,2025-05-27
Coral Fish,Chromis viridis,Laccadive Sea,"12.2445, 82.6237",Sediment,2024-10-08
Shark,Carcharhinus limbatus,Indian Ocean,"10.9959, 71.404",DNA,2024-10-31
Mackerel,Scomber scombrus,Arabian Sea,"7.4989, 75.2168",Sediment,2023-12-11
Sardine,Sardinella longiceps,Indian Ocean,"13.0233, 88.1856",Sediment,2025-02-18
Shark,Carcharhinus limbatus,Andaman Sea,"12.5636, 75.5793",DNA,2024-08-26
Sardine,Sardinella longiceps,Laccadive Sea,"18.4819, 84.5566",Water Sample,2024-01-07
Tuna,Thunnus albacares,Andaman Sea,"12.7635, 73.2061",Sediment,2023-03-11
Squid,Loligo vulgaris,Indian Ocean,"14.7578, 70.1129",Plankton,2023-12-21
Sardine,Sardinella longiceps,Laccadive Sea,"8.6356, 75.5945",DNA,2025-07-26
Mackerel,Scomber scombrus,Arabian Sea,"10.6021, 78.7106",Fish Catch,2023-08-11
Lobster,Homarus gammarus,Arabian Sea,"10.2568, 76.7033",DNA,2023-02-13
Anchovy,Engraulis encrasicolus,Bay of Bengal,"6.0736, 72.8813",Fish Catch,2023-01-20
Mackerel,Scomber scombrus,Andaman Sea,"5.9208, 88.2035",Water Sample,2025-07-03
Coral Fish,Chromis viridis,Indian Ocean,"14.4601, 76.8729",Plankton,2023-05-01
Octopus,Octopus vulgaris,Arabian Sea,"5.5418, 87.6479",Water Sample,2024-07-03`;
