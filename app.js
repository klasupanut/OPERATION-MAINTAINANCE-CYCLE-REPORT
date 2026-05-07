const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DUE_SOON_DAYS = 30;
const STORAGE_KEY = "warehouse-operation-dashboard-rows-v9";
const RENOVATION_STORAGE_KEY = "warehouse-operation-dashboard-renovation-views-v1";
const MINI_FITOUT_STORAGE_KEY = "warehouse-operation-dashboard-mini-fitout-v2";
const MEGA_FITOUT_STORAGE_KEY = "warehouse-operation-dashboard-mega-fitout-v1";
const ANNUAL_SUMMARY_STORAGE_KEY = "warehouse-operation-dashboard-annual-summary-v1";
const THEME_STORAGE_KEY = "warehouse-operation-dashboard-theme";
const FITOUT_DASHBOARD_TYPES = ["MINI FIT-OUT", "MEGA FIT-OUT"];
const OLD_OVERALL_RENOVATION_LABEL = "Warehouse Asset Renovation Cycle (overall)";
const OVERALL_RENOVATION_LABEL = "Warehouse Asset Renovation Cycle";
const RENOVATION_SHEET_OPTIONS = [
  { label: OVERALL_RENOVATION_LABEL, sheetName: "Operation Plan" },
  { label: "CHODBIZ CHAENGWATTANA", sheetName: "CHODBIZ CHAENGWATTANA" },
  { label: "CHOD BIZ BANGNA KM.8", sheetName: "CHOD BIZ BANGNA KM.8" },
  { label: "CHODBIZ PUTTHAMONTHON SAI 4", sheetName: "CHODBIZ PUTTHAMONTHON SAI 4" },
  { label: "F&W CHODTHANAWAT 1", sheetName: "F&W CHODTHANAWAT 1" },
  { label: "F&W CHODTHANAWAT 2", sheetName: "F&W CHODTHANAWAT 2" },
  { label: "F&W CHODTHANAWAT 3", sheetName: "F&W CHODTHANAWAT 3" },
  { label: "F&W CHODTHANAWAT 5", sheetName: "F&W CHODTHANAWAT 5" }
];
const fitoutPalettes = {
  "MINI FIT-OUT": {
    capex: "#35d8ff",
    revenue: "#20e3a2",
    profit: "#ffd166"
  },
  "MEGA FIT-OUT": {
    capex: "#7c3aed",
    revenue: "#00a8e8",
    profit: "#ff3d8b"
  }
};
const projectOptions = [
  "F&WH CHODTHANAWAT 1",
  "F&WH CHODTHANAWAT 2",
  "F&WH CHODTHANAWAT 3",
  "F&WH CHODTHANAWAT 5",
  "CHODBIZ CHAENGWATTANA",
  "CHODBIZ BANGNA KM.8",
  "CHODBIZ PUTTHAMONTHON SAI 4"
];

const columnAliases = {
  project: ["project", "project name", "site", "warehouse project"],
  block: ["block", "building block", "zone block"],
  unit: ["unit", "unit no", "unit number", "warehouse unit"],
  category: ["category", "discipline", "type", "work category"],
  asset: ["asset", "equipment", "item", "component", "asset name"],
  area: ["location", "area", "zone", "position"],
  cycle: ["cycle", "cycle (months)", "improvement cycle", "improvement cycle months", "frequency", "interval"],
  lastDate: ["last update", "last maintenance", "last date"],
  dueDate: ["due date", "next due", "next update"],
  priority: ["priority", "criticality", "importance"],
  status: ["status"],
  contractor: ["contractor", "vendor", "supplier"],
  owner: ["owner", "responsible", "pic", "person in charge"],
  budget: ["budget", "cost", "amount"]
};

const miniFitoutAliases = {
  project: ["project", "project name", "site", "warehouse project"],
  block: ["block", "building block", "zone block"],
  unit: ["unit", "unit no", "unit number", "warehouse unit"],
  startDate: ["start date", "start"],
  finishDate: ["finish date", "target date", "end date"],
  actualCapex: ["actual capital expenditure", "actual capex", "capex"],
  realizedRevenue: ["realized revenue", "revenue"],
  netOperatingProfit: ["net operating profit", "net profit", "nop"]
};

const sampleRows = [
  ["F&WH CHODTHANAWAT 1", "A", "A-01", "Structural", "Warehouse Floor Expansion Joint", "Zone A - Loading Bay", 12, "2025-03-15", "2026-03-15", "High", "", "Civil Partner A", "Civil Team", 180000],
  ["F&WH CHODTHANAWAT 1", "A", "A-02", "Structural", "Dock Slab Settlement Survey", "Dock 01-03", 6, "2026-01-12", "2026-07-12", "Critical", "", "Geo Scan Co.", "Warehouse Engineer", 135000],
  ["F&WH CHODTHANAWAT 1", "A", "A-03", "Architectural", "Fire Exit Door Replacement", "Exit Stair 1", 24, "2024-06-01", "2026-06-01", "High", "", "Door Service B", "Facility", 82000],
  ["F&WH CHODTHANAWAT 1", "A", "A-04", "Electrical", "MDB Main Panel Thermoscan", "Electrical Room", 3, "2026-04-10", "2026-07-10", "High", "", "Electrical Partner C", "Electrical", 120000],
  ["F&WH CHODTHANAWAT 2", "B", "B-01", "Structural", "Rack Anchorage Inspection", "Rack Row B", 6, "2026-02-01", "2026-08-01", "High", "", "Structural Audit F", "Warehouse Engineer", 95000],
  ["F&WH CHODTHANAWAT 2", "B", "B-02", "Architectural", "Dock Door Roller Shutter", "Dock 04", 6, "2025-12-20", "2026-06-20", "Medium", "", "Door Service B", "Facility", 65000],
  ["F&WH CHODTHANAWAT 2", "B", "B-03", "Electrical", "Emergency Light Battery Test", "Aisle 2-6", 1, "2026-04-18", "2026-05-18", "Critical", "", "Safety Vendor D", "Safety", 22000],
  ["F&WH CHODTHANAWAT 2", "B", "B-04", "Electrical", "Generator Load Test", "Generator Room", 12, "2025-10-15", "2026-10-15", "High", "", "Power Gen Service", "Electrical", 160000],
  ["F&WH CHODTHANAWAT 3", "C", "C-01", "Structural", "Concrete Floor Crack Injection", "Zone C - Heavy Storage", 24, "2025-11-20", "2027-11-20", "Medium", "", "Civil Partner A", "Civil Team", 240000],
  ["F&WH CHODTHANAWAT 3", "C", "C-02", "Architectural", "Impact Wall and Corner Guard", "Picking Area", 12, "2026-01-05", "2027-01-05", "Low", "", "Facility Vendor E", "Facility", 45000],
  ["F&WH CHODTHANAWAT 3", "C", "C-03", "Electrical", "Sub Panel Thermoscan", "All Sub Panels", 6, "2026-01-25", "2026-07-25", "Medium", "", "Electrical Partner C", "Electrical", 85000],
  ["F&WH CHODTHANAWAT 3", "C", "C-04", "Electrical", "UPS Battery Replacement", "IT / Control Room", 36, "2025-05-10", "2028-05-10", "High", "", "UPS Specialist", "IT + Electrical", 210000],
  ["F&WH CHODTHANAWAT 5", "D", "D-01", "Structural", "Roof Truss Bolt Retorque", "Roof Bay 2", 12, "2025-04-20", "2026-04-20", "High", "", "Steel Works Ltd.", "Civil Team", 145000],
  ["F&WH CHODTHANAWAT 5", "D", "D-02", "Architectural", "Warehouse Traffic Line Repainting", "Traffic Lane", 24, "2024-05-01", "2026-05-01", "Low", "completed", "Floor Marking Pro", "Facility", 75000],
  ["F&WH CHODTHANAWAT 5", "D", "D-03", "Electrical", "Lightning Protection Test", "Roof Area", 12, "2025-09-30", "2026-09-30", "Medium", "", "Lightning Safe Co.", "Electrical", 55000],
  ["F&WH CHODTHANAWAT 5", "D", "D-04", "Architectural", "Office Ceiling Tile Replacement", "Admin Office", 60, "2023-08-01", "2028-08-01", "Low", "", "Interior Care", "Facility", 98000],
  ["CHODBIZ CHAENGWATTANA", "CW", "CW-01", "Structural", "Retaining Wall Visual Inspection", "Back Fence", 12, "2025-02-18", "2026-02-18", "Critical", "", "Structural Audit F", "Civil Team", 110000],
  ["CHODBIZ CHAENGWATTANA", "CW", "CW-02", "Architectural", "Warehouse Roof Waterproofing", "Roof Area 1", 60, "2024-09-01", "2029-09-01", "High", "", "Roof Shield Co.", "Facility", 420000],
  ["CHODBIZ CHAENGWATTANA", "CW", "CW-03", "Electrical", "Main Cable Megger Test", "Electrical Room", 12, "2025-12-05", "2026-12-05", "High", "", "Electrical Partner C", "Electrical", 130000],
  ["CHODBIZ CHAENGWATTANA", "CW", "CW-04", "Architectural", "Toilet Exhaust Fan Replacement", "Amenity Block", 36, "2026-03-01", "2029-03-01", "Low", "", "MEP Service", "Facility", 38000],
  ["CHODBIZ BANGNA KM.8", "BN", "BN-01", "Structural", "Dock Bumper Replacement", "Dock 07-10", 12, "2025-06-15", "2026-06-15", "Medium", "", "Dock System Co.", "Facility", 115000],
  ["CHODBIZ BANGNA KM.8", "BN", "BN-02", "Architectural", "Facade Panel Sealant Renewal", "Front Elevation", 36, "2024-12-10", "2027-12-10", "Medium", "", "Facade Care", "Facility", 175000],
  ["CHODBIZ BANGNA KM.8", "BN", "BN-03", "Electrical", "Fire Alarm Panel Inspection", "Fire Control Room", 6, "2026-01-12", "2026-07-12", "Critical", "", "Safety Vendor D", "Safety", 98000],
  ["CHODBIZ BANGNA KM.8", "BN", "BN-04", "Electrical", "CCTV NVR Replacement", "Security Room", 60, "2022-07-01", "2027-07-01", "Medium", "", "Security Tech", "IT + Security", 260000],
  ["CHODBIZ PUTTHAMONTHON SAI 4", "PS4", "PS4-01", "Structural", "Warehouse Floor Joint Reseal", "Zone D", 12, "2025-08-01", "2026-08-01", "Medium", "", "Civil Partner A", "Civil Team", 72000],
  ["CHODBIZ PUTTHAMONTHON SAI 4", "PS4", "PS4-02", "Architectural", "Dock Shelter Fabric Replacement", "Dock 02", 24, "2025-01-10", "2027-01-10", "Medium", "", "Dock System Co.", "Facility", 125000],
  ["CHODBIZ PUTTHAMONTHON SAI 4", "PS4", "PS4-03", "Electrical", "Emergency Light Replacement", "Aisle 1-8", 1, "2026-04-18", "2026-05-18", "Critical", "", "Safety Vendor D", "Safety", 22000],
  ["CHODBIZ PUTTHAMONTHON SAI 4", "PS4", "PS4-04", "Electrical", "Transformer Oil Test", "Transformer Yard", 12, "2025-11-01", "2026-11-01", "High", "", "Power Lab", "Electrical", 90000],
  ["F&WH CHODTHANAWAT 1", "A", "A-05", "Architectural", "Office Partition Refurbishment", "Admin Office", 60, "2026-02-01", "2031-02-01", "Low", "", "Interior Care", "Facility", 185000],
  ["CHODBIZ CHAENGWATTANA", "CW", "CW-05", "Electrical", "LED High Bay Replacement", "Storage Hall", 48, "2024-03-20", "2028-03-20", "Medium", "", "Lighting Solution", "Electrical", 360000],
  ["F&WH CHODTHANAWAT 3", "C", "C-05", "Structural", "Column Base Plate Corrosion Repair", "Rack Row H", 36, "2025-07-15", "2028-07-15", "High", "", "Steel Works Ltd.", "Civil Team", 155000],
  ["CHODBIZ BANGNA KM.8", "BN", "BN-05", "Architectural", "External Paint Renewal", "External Wall", 60, "2023-05-01", "2028-05-01", "Low", "", "Paint Master", "Facility", 310000],
  ["F&WH CHODTHANAWAT 1", "A", "A-06", "Ventilation system", "Exhaust Fan Balancing", "Loading Bay Ceiling", 12, "2025-12-01", "2026-12-01", "Medium", "", "Air Flow Service", "MEP", 68000],
  ["F&WH CHODTHANAWAT 3", "C", "C-06", "Ventilation system", "Fresh Air Intake Cleaning", "Warehouse Hall", 6, "2026-02-15", "2026-08-15", "High", "", "Ventilation Care", "MEP", 42000],
  ["CHODBIZ CHAENGWATTANA", "CW", "CW-06", "Ventilation system", "Roof Ventilator Replacement", "Roof Area 2", 36, "2024-11-10", "2027-11-10", "Medium", "", "Air Flow Service", "Facility", 185000],
  ["CHODBIZ BANGNA KM.8", "BN", "BN-06", "Ventilation system", "Smoke Exhaust Fan Test", "Fire Control Zone", 3, "2026-04-05", "2026-07-05", "Critical", "", "Safety Vendor D", "Safety", 56000]
].map(([project, block, unit, category, asset, area, cycle, lastDate, dueDate, priority, explicitStatus, contractor, owner, budget]) => ({
  project,
  block,
  unit,
  category,
  asset,
  area,
  cycle,
  lastDate,
  dueDate,
  priority,
  explicitStatus,
  contractor,
  owner,
  budget
}));

const sampleMiniFitoutRows = [
  ["F&WH CHODTHANAWAT 1", "A-01", "2026-01-05", "2026-01-25", 95000, 150000],
  ["F&WH CHODTHANAWAT 2", "B-02", "2026-02-01", "2026-02-18", 120000, 180000],
  ["F&WH CHODTHANAWAT 3", "C-01", "2026-03-02", "2026-03-22", 110000, 172000],
  ["F&WH CHODTHANAWAT 5", "D-01", "2026-04-08", "2026-04-30", 150000, 230000],
  ["CHODBIZ CHAENGWATTANA", "CW-02", "2026-05-01", "2026-05-20", 130000, 205000],
  ["CHODBIZ BANGNA KM.8", "BN-03", "2026-06-05", "2026-06-25", 120000, 185000],
  ["CHODBIZ PUTTHAMONTHON SAI 4", "PS4-01", "2026-07-01", "2026-07-18", 95000, 160000],
  ["F&WH CHODTHANAWAT 1", "A-05", "2026-08-01", "2026-08-12", 175000, 260000],
  ["F&WH CHODTHANAWAT 3", "C-04", "2026-09-18", "2026-10-08", 140000, 220000],
  ["CHODBIZ BANGNA KM.8", "BN-06", "2026-11-02", "2026-11-26", 210000, 325000]
].map(([project, unit, startDate, finishDate, actualCapex, realizedRevenue]) => ({
  project,
  block: deriveBlockFromUnit(unit),
  unit,
  startDate,
  finishDate,
  actualCapex,
  realizedRevenue,
  netOperatingProfit: realizedRevenue - actualCapex
}));

const sampleMegaFitoutRows = [
  ["F&WH CHODTHANAWAT 1", "MEGA-A10", "2026-01-08", "2026-02-20", 1850000, 3250000],
  ["CHODBIZ CHAENGWATTANA", "MEGA-CW12", "2026-02-15", "2026-03-30", 2450000, 4300000],
  ["F&WH CHODTHANAWAT 2", "MEGA-B08", "2026-03-10", "2026-04-28", 2150000, 3900000],
  ["CHODBIZ BANGNA KM.8", "MEGA-BN15", "2026-04-05", "2026-05-25", 3050000, 5550000],
  ["F&WH CHODTHANAWAT 5", "MEGA-D11", "2026-05-20", "2026-06-30", 2780000, 4980000],
  ["CHODBIZ PUTTHAMONTHON SAI 4", "MEGA-PS4-09", "2026-06-18", "2026-08-08", 3350000, 6200000],
  ["F&WH CHODTHANAWAT 3", "MEGA-C14", "2026-07-12", "2026-08-29", 2980000, 5400000],
  ["CHODBIZ CHAENGWATTANA", "MEGA-CW18", "2026-08-25", "2026-10-05", 3650000, 7100000],
  ["CHODBIZ BANGNA KM.8", "MEGA-BN22", "2026-09-18", "2026-11-12", 4100000, 7850000],
  ["F&WH CHODTHANAWAT 1", "MEGA-A24", "2026-10-15", "2026-12-18", 4520000, 8800000]
].map(([project, unit, startDate, finishDate, actualCapex, realizedRevenue]) => ({
  project,
  block: deriveBlockFromUnit(unit),
  unit,
  startDate,
  finishDate,
  actualCapex,
  realizedRevenue,
  netOperatingProfit: realizedRevenue - actualCapex
}));

let rawRows = [];
let filteredRows = [];
let renovationRowsByView = {};
let miniFitoutRows = [];
let megaFitoutRows = [];
let annualSummaryRows = [];
let categoryChart;
let statusChart;
let fitoutFinanceChart;
let fitoutQuarterChart;
let annualPerformanceChart;

const els = {
  file: document.querySelector("#excelFile"),
  loadSampleBtn: document.querySelector("#loadSampleBtn"),
  googleSheetUrl: document.querySelector("#googleSheetUrl"),
  syncSheetBtn: document.querySelector("#syncSheetBtn"),
  sheetStatus: document.querySelector("#sheetStatus"),
  mobileGoogleSheetUrl: document.querySelector("#mobileGoogleSheetUrl"),
  mobileSyncSheetBtn: document.querySelector("#mobileSyncSheetBtn"),
  mobileSheetStatus: document.querySelector("#mobileSheetStatus"),
  themeToggle: document.querySelector("#themeToggle"),
  clearFilterBtn: document.querySelector("#clearFilterBtn"),
  projectFilter: document.querySelector("#projectFilter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  searchBox: document.querySelector("#searchBox"),
  refreshBtn: document.querySelector("#refreshBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  table: document.querySelector("#assetTable"),
  emptyState: document.querySelector("#emptyState"),
  recordCount: document.querySelector("#recordCount"),
  lastUpdated: document.querySelector("#lastUpdated"),
  overdueCount: document.querySelector("#overdueCount"),
  dueSoonCount: document.querySelector("#dueSoonCount"),
  plannedCount: document.querySelector("#plannedCount"),
  completedCount: document.querySelector("#completedCount"),
  budgetTotal: document.querySelector("#budgetTotal"),
  shortBudget: document.querySelector("#shortBudget"),
  midBudget: document.querySelector("#midBudget"),
  longBudget: document.querySelector("#longBudget"),
  annualForecast: document.querySelector("#annualForecast"),
  statusLegend: document.querySelector("#statusLegend"),
  dashboardTitle: document.querySelector("#dashboardTitle"),
  tabButtons: document.querySelectorAll(".tab-button"),
  renovationSelector: document.querySelector("#renovationSelector"),
  renovationType: document.querySelector("#renovationType"),
  fitoutSelector: document.querySelector("#fitoutSelector"),
  fitoutType: document.querySelector("#fitoutType"),
  renovationViews: document.querySelectorAll(".renovation-view"),
  fitoutDashboard: document.querySelector("#fitoutDashboard"),
  fitoutCapexTotal: document.querySelector("#fitoutCapexTotal"),
  fitoutCapexLabel: document.querySelector("#fitoutCapexLabel"),
  fitoutRevenueTotal: document.querySelector("#fitoutRevenueTotal"),
  fitoutRevenueLabel: document.querySelector("#fitoutRevenueLabel"),
  fitoutProfitTotal: document.querySelector("#fitoutProfitTotal"),
  fitoutRecordCount: document.querySelector("#fitoutRecordCount"),
  fitoutQuarterList: document.querySelector("#fitoutQuarterList"),
  annualDashboard: document.querySelector("#annualDashboard"),
  annualRevenueTotal: document.querySelector("#annualRevenueTotal"),
  annualProfitTotal: document.querySelector("#annualProfitTotal"),
  annualCapexTotal: document.querySelector("#annualCapexTotal"),
  annualMarginTotal: document.querySelector("#annualMarginTotal"),
  annualSummaryTable: document.querySelector("#annualSummaryTable")
};

function normalizeHeader(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function normalizeDiscipline(value) {
  const text = normalizeHeader(value);
  if (!text) return "Uncategorized";
  if (text.includes("structural") || text === "structure") return "Structural";
  if (text.includes("architectural") || text === "architecture") return "Architectural";
  if (text.includes("electrical") || text === "electric") return "Electrical";
  if (text.includes("ventilation") || text.includes("hvac") || text.includes("exhaust")) return "Ventilation system";
  return cleanValue(value) || "Uncategorized";
}

function sortDisciplines(items) {
  const order = ["Structural", "Architectural", "Electrical", "Ventilation system", "Uncategorized"];
  return [...items].sort((a, b) => {
    const orderA = order.indexOf(a);
    const orderB = order.indexOf(b);
    if (orderA !== -1 || orderB !== -1) return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
    return a.localeCompare(b, "en");
  });
}

function findColumn(row, aliases) {
  const keys = Object.keys(row);
  return keys.find((key) => aliases.includes(normalizeHeader(key)));
}

function mapWorkbookRows(rows) {
  if (!rows.length) return [];
  const dataRows = rows.filter((row) => Object.values(row).some((value) => cleanValue(value)));
  if (!dataRows.length) return [];
  const first = dataRows[0];
  const map = Object.fromEntries(
    Object.entries(columnAliases).map(([field, aliases]) => [field, findColumn(first, aliases)])
  );

  return dataRows.map((row, index) => {
    const dueDate = parseDate(row[map.dueDate]);
    const lastDate = parseDate(row[map.lastDate]);
    const priorityValue = cleanValue(row[map.priority]);
    return enrichRow({
      id: `${index}-${row[map.asset] || row[map.area] || "item"}`,
      project: cleanValue(row[map.project]) || "Unassigned",
      block: cleanValue(row[map.block]) || "-",
      unit: cleanValue(row[map.unit]) || "-",
      category: normalizeDiscipline(row[map.category]),
      asset: cleanValue(row[map.asset]) || "Unnamed asset",
      area: cleanValue(row[map.area]) || "-",
      cycle: cleanValue(row[map.cycle]) || "-",
      lastDate,
      dueDate,
      priority: normalizePriority(priorityValue),
      explicitStatus: cleanValue(row[map.status]),
      contractor: cleanValue(row[map.contractor]) || "-",
      owner: cleanValue(row[map.owner]) || "-",
      budget: parseBudget(row[map.budget])
    });
  }).filter((row) => row.asset !== "Unnamed asset" || row.area !== "-" || row.dueDate || row.budget);
}

function mapMiniFitoutRows(rows) {
  if (!rows.length) return [];
  const dataRows = rows.filter((row) => Object.values(row).some((value) => cleanValue(value)));
  if (!dataRows.length) return [];
  const first = dataRows[0];
  const map = Object.fromEntries(
    Object.entries(miniFitoutAliases).map(([field, aliases]) => [field, findColumn(first, aliases)])
  );

  return dataRows
    .map((row, index) => {
      const actualCapex = parseBudget(row[map.actualCapex]);
      const realizedRevenue = parseBudget(row[map.realizedRevenue]);
      const explicitProfit = cleanValue(row[map.netOperatingProfit]);
      const netOperatingProfit =
        map.netOperatingProfit !== undefined && explicitProfit
          ? parseBudget(row[map.netOperatingProfit])
          : realizedRevenue - actualCapex;
      return {
        id: `mini-${index}-${cleanValue(row[map.unit]) || "unit"}`,
        project: cleanValue(row[map.project]) || "Unassigned",
        block: cleanValue(row[map.block]) || deriveBlockFromUnit(row[map.unit]),
        unit: cleanValue(row[map.unit]) || "-",
        startDate: parseDate(row[map.startDate]),
        finishDate: parseDate(row[map.finishDate]),
        actualCapex,
        realizedRevenue,
        netOperatingProfit
      };
    })
    .filter((row) => row.project !== "Unassigned" || row.unit !== "-" || row.actualCapex || row.realizedRevenue);
}

function mapAnnualSummaryRows(rows) {
  if (!rows.length) return [];
  const dataRows = rows.filter((row) => Object.values(row).some((value) => cleanValue(value)));
  if (!dataRows.length) return [];
  const first = dataRows[0];
  const map = {
    year: findColumn(first, ["year"]),
    totalJobs: findColumn(first, ["total jobs", "jobs"]),
    miniJobs: findColumn(first, ["mini jobs"]),
    megaJobs: findColumn(first, ["mega jobs"]),
    actualCapex: findColumn(first, ["actual capex", "actual capital expenditure", "capex"]),
    realizedRevenue: findColumn(first, ["realized revenue", "revenue"]),
    netOperatingProfit: findColumn(first, ["net operating profit", "net profit", "profit"]),
    profitMargin: findColumn(first, ["profit margin", "margin"]),
    averageRevenue: findColumn(first, ["avg revenue / job", "average revenue", "avg revenue"])
  };

  return dataRows
    .map((row) => {
      const year = Number(cleanValue(row[map.year]));
      const realizedRevenue = parseBudget(row[map.realizedRevenue]);
      const netOperatingProfit = parseBudget(row[map.netOperatingProfit]);
      return {
        year,
        totalJobs: parseBudget(row[map.totalJobs]),
        miniJobs: parseBudget(row[map.miniJobs]),
        megaJobs: parseBudget(row[map.megaJobs]),
        actualCapex: parseBudget(row[map.actualCapex]),
        realizedRevenue,
        netOperatingProfit,
        profitMargin: parsePercent(row[map.profitMargin], realizedRevenue ? netOperatingProfit / realizedRevenue : 0),
        averageRevenue: parseBudget(row[map.averageRevenue])
      };
    })
    .filter((row) => row.year && (row.totalJobs || row.actualCapex || row.realizedRevenue || row.netOperatingProfit));
}

function deriveBlockFromUnit(value) {
  const text = cleanValue(value);
  if (!text) return "-";
  const prefix = text.match(/^[A-Za-z0-9]+/);
  return prefix ? prefix[0].replace(/\d+$/, "") || prefix[0] : "-";
}

function cleanValue(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}

function applyTheme(theme, shouldRender = true) {
  const lightMode = theme === "light";
  document.body.classList.toggle("light-theme", lightMode);
  els.themeToggle.textContent = lightMode ? "Light" : "Dark";
  els.themeToggle.setAttribute("aria-pressed", String(lightMode));
  els.themeToggle.title = lightMode ? "Switch to dark theme" : "Switch to light theme";
  localStorage.setItem(THEME_STORAGE_KEY, lightMode ? "light" : "dark");
  if (shouldRender) render();
}

function toggleTheme() {
  applyTheme(document.body.classList.contains("light-theme") ? "dark" : "light");
}

function chartTextColor() {
  return document.body.classList.contains("light-theme") ? "#17212b" : "#ffffff";
}

function chartGridColor() {
  return document.body.classList.contains("light-theme") ? "rgba(100, 116, 139, 0.24)" : "rgba(226, 232, 240, 0.32)";
}

function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const googleDate = value.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})\)$/);
    if (googleDate) return new Date(Number(googleDate[1]), Number(googleDate[2]), Number(googleDate[3]));
  }
  if (typeof value === "number" && window.XLSX) {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed) return new Date(parsed.y, parsed.m - 1, parsed.d);
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseBudget(value) {
  if (typeof value === "number") return value;
  const normalized = String(value || "").replace(/[^0-9.-]/g, "");
  return Number(normalized) || 0;
}

function parsePercent(value, fallback = 0) {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value === "number") return value > 1 ? value / 100 : value;
  const text = String(value).trim();
  const number = Number(text.replace(/[^0-9.-]/g, ""));
  if (!Number.isFinite(number)) return fallback;
  return text.includes("%") || number > 1 ? number / 100 : number;
}

function normalizePriority(value) {
  const text = normalizeHeader(value);
  if (["critical", "urgent", "p0"].includes(text)) return "Critical";
  if (["high", "p1"].includes(text)) return "High";
  if (["medium", "med", "p2"].includes(text)) return "Medium";
  if (["low", "p3"].includes(text)) return "Low";
  return "Medium";
}

function serializeRows(rows) {
  return rows.map((row) => ({
    ...row,
    lastDate: row.lastDate ? row.lastDate.toISOString() : null,
    dueDate: row.dueDate ? row.dueDate.toISOString() : null
  }));
}

function deserializeRows(rows) {
  return rows.map((row) => ({
    ...row,
    lastDate: parseDate(row.lastDate),
    dueDate: parseDate(row.dueDate)
  }));
}

function serializeMiniFitoutRows(rows) {
  return rows.map((row) => ({
    ...row,
    startDate: row.startDate ? row.startDate.toISOString() : null,
    finishDate: row.finishDate ? row.finishDate.toISOString() : null
  }));
}

function serializeAnnualSummaryRows(rows) {
  return rows.map((row) => ({
    year: row.year,
    totalJobs: row.totalJobs,
    miniJobs: row.miniJobs,
    megaJobs: row.megaJobs,
    actualCapex: row.actualCapex,
    realizedRevenue: row.realizedRevenue,
    netOperatingProfit: row.netOperatingProfit,
    profitMargin: row.profitMargin,
    averageRevenue: row.averageRevenue
  }));
}

function deserializeMiniFitoutRows(rows) {
  return rows.map((row) => ({
    ...row,
    startDate: parseDate(row.startDate),
    finishDate: parseDate(row.finishDate),
    block: row.block || deriveBlockFromUnit(row.unit),
    actualCapex: parseBudget(row.actualCapex),
    realizedRevenue: parseBudget(row.realizedRevenue),
    netOperatingProfit:
      row.netOperatingProfit === undefined
        ? parseBudget(row.realizedRevenue) - parseBudget(row.actualCapex)
        : parseBudget(row.netOperatingProfit)
  }));
}

function deserializeAnnualSummaryRows(rows) {
  return rows.map((row) => ({
    year: Number(row.year) || 0,
    totalJobs: parseBudget(row.totalJobs),
    miniJobs: parseBudget(row.miniJobs),
    megaJobs: parseBudget(row.megaJobs),
    actualCapex: parseBudget(row.actualCapex),
    realizedRevenue: parseBudget(row.realizedRevenue),
    netOperatingProfit: parseBudget(row.netOperatingProfit),
    profitMargin: parsePercent(row.profitMargin),
    averageRevenue: parseBudget(row.averageRevenue)
  }));
}

function enrichRow(row) {
  const today = startOfDay(new Date());
  const due = row.dueDate ? startOfDay(row.dueDate) : null;
  const daysLeft = due ? Math.ceil((due - today) / MS_PER_DAY) : null;
  const status = resolveStatus(row.explicitStatus, daysLeft);
  return {
    ...row,
    project: row.project || "Unassigned",
    category: normalizeDiscipline(row.category),
    priority: normalizePriority(row.priority),
    contractor: row.contractor || "-",
    daysLeft,
    status,
    cycleMonths: parseCycleMonths(row.cycle)
  };
}

function parseCycleMonths(cycle) {
  const text = normalizeHeader(cycle);
  if (!text || text === "-") return null;

  const number = Number((text.match(/(\d+(?:\.\d+)?)/) || [])[1] || 1);
  if (text.includes("year") || text.includes("yr")) return number * 12;
  if (text.includes("quarter")) return number * 3;
  if (text.includes("week")) return Math.max(number / 4.345, 0.25);
  if (text.includes("day")) return Math.max(number / 30.4375, 0.1);
  if (text.includes("month") || text.includes("mo")) return number;
  if (text.includes("annual") || text.includes("yearly")) return 12;
  if (text.includes("monthly")) return 1;
  if (text.includes("quarterly")) return 3;
  return number > 0 ? number : null;
}

function resolveStatus(statusText, daysLeft) {
  const text = normalizeHeader(statusText);
  if (["done", "complete", "completed"].includes(text)) return "done";
  if (daysLeft === null) return "planned";
  if (daysLeft < 0) return "overdue";
  if (daysLeft <= DUE_SOON_DAYS) return "dueSoon";
  return "planned";
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(date) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function formatBudget(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(value || 0);
}

function formatPercent(value) {
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 }).format(value || 0);
}

function statusLabel(status) {
  return {
    overdue: "Overdue",
    dueSoon: "Due Soon",
    planned: "Planned",
    done: "Completed"
  }[status] || "Unidentified";
}

function daysLabel(daysLeft) {
  if (daysLeft === null) return "-";
  if (daysLeft < 0) return `${Math.abs(daysLeft)} days late`;
  if (daysLeft === 0) return "Today";
  return `${daysLeft} days`;
}

function applyFilters() {
  const project = els.projectFilter.value;
  const category = els.categoryFilter.value;
  const status = els.statusFilter.value;
  const keyword = normalizeHeader(els.searchBox.value);

  filteredRows = rawRows.filter((row) => {
    const matchesProject = project === "all" || row.project === project;
    const matchesCategory = category === "all" || row.category === category;
    const matchesStatus = status === "all" || row.status === status;
    const haystack = normalizeHeader(`${row.project} ${row.block} ${row.unit} ${row.category} ${row.asset} ${row.area} ${row.owner} ${row.contractor} ${row.priority}`);
    return matchesProject && matchesCategory && matchesStatus && haystack.includes(keyword);
  });

  render();
}

function resetRenovationFilters() {
  els.projectFilter.value = "all";
  els.categoryFilter.value = "all";
  els.statusFilter.value = "all";
  els.searchBox.value = "";
}

function clearRenovationFilters() {
  resetRenovationFilters();
  updateCategoryOptions();
  applyFilters();
}

function render() {
  renderDashboardMode();
  renderKpis();
  renderAnnualForecast();
  renderTable();
  renderCharts();
  renderFitoutDashboard();
  renderAnnualPerformanceDashboard();
  els.recordCount.textContent = `${filteredRows.length} records`;
  els.emptyState.style.display = filteredRows.length ? "none" : "grid";
  updateLiveClock();
}

function activeTabName() {
  return [...els.tabButtons].find((tab) => tab.classList.contains("active"))?.dataset.tab || "renovation";
}

function activeRenovationLabel() {
  return els.renovationType?.value || RENOVATION_SHEET_OPTIONS[0].label;
}

function activeRenovationSheetName() {
  return RENOVATION_SHEET_OPTIONS.find((option) => option.label === activeRenovationLabel())?.sheetName || "Operation Plan";
}

function isRenovationView() {
  return activeTabName() === "renovation";
}

function isFitoutDashboardView() {
  return activeTabName() === "fitout" && FITOUT_DASHBOARD_TYPES.includes(els.fitoutType.value);
}

function isAnnualPerformanceView() {
  return activeTabName() === "fitout" && els.fitoutType.value === "Annual Performance Summary";
}

function activeGoogleSheetName() {
  if (activeTabName() !== "fitout") return activeRenovationSheetName();
  if (els.fitoutType.value === "MINI FIT-OUT") return "MINI FIT-OUT";
  if (els.fitoutType.value === "MEGA FIT-OUT") return "MEGA FIT-OUT";
  return "Annual Performance Summary";
}

function renderDashboardMode() {
  const showFitoutPage = activeTabName() === "fitout";
  const showFitoutDashboard = isFitoutDashboardView();
  const showAnnualDashboard = isAnnualPerformanceView();
  els.renovationViews.forEach((section) => {
    section.hidden = showFitoutPage;
  });
  els.fitoutDashboard.hidden = !showFitoutDashboard;
  els.annualDashboard.hidden = !showAnnualDashboard;
}

function updateLiveClock() {
  els.lastUpdated.textContent = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());
}

function renderKpis() {
  const counts = countBy(filteredRows, "status");
  const horizonBudget = calculateHorizonBudget(filteredRows);
  const totalRows = filteredRows.length;
  els.overdueCount.innerHTML = formatKpiRatio(counts.overdue || 0, totalRows);
  els.dueSoonCount.innerHTML = formatKpiRatio(counts.dueSoon || 0, totalRows);
  els.plannedCount.innerHTML = formatKpiRatio(counts.planned || 0, totalRows);
  els.completedCount.innerHTML = formatKpiRatio(counts.done || 0, totalRows);
  els.budgetTotal.textContent = formatBudget(filteredRows.reduce((sum, row) => sum + row.budget, 0));
  els.shortBudget.textContent = formatBudget(horizonBudget.short);
  els.midBudget.textContent = formatBudget(horizonBudget.medium);
  els.longBudget.textContent = formatBudget(horizonBudget.long);
}

function formatKpiRatio(value, total) {
  return `${value}<span class="kpi-total">/${total}</span>`;
}

function calculateHorizonBudget(rows) {
  return rows.reduce(
    (total, row) => {
      total.short += row.budget * countOccurrences(row, 2);
      total.medium += row.budget * countOccurrences(row, 5);
      total.long += row.budget * countOccurrences(row, 10);
      return total;
    },
    { short: 0, medium: 0, long: 0 }
  );
}

function countOccurrences(row, years) {
  if (!row.budget) return 0;

  const today = startOfDay(new Date());
  const horizonEnd = addMonths(today, years * 12);
  const cycleMonths = row.cycleMonths;
  let due = row.dueDate ? startOfDay(row.dueDate) : today;
  let count = 0;

  if (!cycleMonths) {
    return due <= horizonEnd ? 1 : 0;
  }

  if (due < today) {
    count += 1;
    due = addMonths(today, cycleMonths);
  }

  while (due <= horizonEnd) {
    count += 1;
    due = addMonths(due, cycleMonths);
  }

  return count;
}

function addMonths(date, months) {
  const wholeMonths = Math.floor(months);
  const fractionalDays = Math.round((months - wholeMonths) * 30.4375);
  const next = new Date(date);
  next.setMonth(next.getMonth() + wholeMonths);
  next.setDate(next.getDate() + fractionalDays);
  return startOfDay(next);
}

function calculateAnnualForecast(rows) {
  const startYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => startYear + index);
  const totals = Object.fromEntries(years.map((year) => [year, 0]));

  rows.forEach((row) => {
    if (!row.budget) return;
    const cycleMonths = row.cycleMonths;
    let due = row.dueDate ? startOfDay(row.dueDate) : startOfDay(new Date());
    const end = new Date(startYear + 4, 11, 31);

    if (!cycleMonths) {
      if (totals[due.getFullYear()] !== undefined) totals[due.getFullYear()] += row.budget;
      return;
    }

    if (due < startOfDay(new Date())) due = startOfDay(new Date());
    while (due <= end) {
      if (totals[due.getFullYear()] !== undefined) totals[due.getFullYear()] += row.budget;
      due = addMonths(due, cycleMonths);
    }
  });

  return years.map((year) => ({ year, budget: totals[year] }));
}

function renderAnnualForecast() {
  const forecast = calculateAnnualForecast(filteredRows);
  const max = Math.max(...forecast.map((item) => item.budget), 1);
  els.annualForecast.innerHTML = forecast
    .map(
      (item) => `
        <div class="forecast-row">
          <span>${item.year}</span>
          <div><i style="width:${Math.max((item.budget / max) * 100, 2)}%"></i></div>
          <strong>${formatCompactBudget(item.budget)}</strong>
        </div>
      `
    )
    .join("");
}

function formatCompactBudget(value) {
  const sign = value < 0 ? "-" : "";
  const amount = Math.abs(value);
  if (amount >= 1000000) return `${sign}THB ${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${sign}THB ${Math.round(amount / 1000)}K`;
  return formatBudget(value);
}

function sortedRegisterRows() {
  return [...filteredRows].sort(compareRegisterRows);
}

function compareRegisterRows(a, b) {
  const priorityRank = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  const priorityDiff = (priorityRank[a.priority] ?? 99) - (priorityRank[b.priority] ?? 99);
  if (priorityDiff) return priorityDiff;

  const blockDiff = String(a.block || "").localeCompare(String(b.block || ""), "en", { sensitivity: "base" });
  if (blockDiff) return blockDiff;

  const unitDiff = getLastNumber(a.unit) - getLastNumber(b.unit);
  if (unitDiff) return unitDiff;

  return String(a.unit || "").localeCompare(String(b.unit || ""), "en", { numeric: true, sensitivity: "base" });
}

function getLastNumber(value) {
  const matches = String(value || "").match(/\d+/g);
  if (!matches) return Number.POSITIVE_INFINITY;
  return Number(matches[matches.length - 1]);
}

function renderTable() {
  els.table.innerHTML = sortedRegisterRows()
    .map(
      (row) => `
        <tr>
          <td><span class="priority-pill priority-${row.priority.toLowerCase()}">${escapeHtml(row.priority)}</span></td>
          <td><span class="status-pill status-${row.status}">${statusLabel(row.status)}</span></td>
          <td>${escapeHtml(row.contractor)}</td>
          <td>${escapeHtml(row.project)}</td>
          <td>${escapeHtml(row.block)}</td>
          <td>${escapeHtml(row.unit)}</td>
          <td>${escapeHtml(row.category)}</td>
          <td><strong>${escapeHtml(row.asset)}</strong><br><small>${escapeHtml(row.area)}</small></td>
          <td>${escapeHtml(row.cycle)}</td>
          <td>${formatDate(row.lastDate)}</td>
          <td>${formatDate(row.dueDate)}</td>
          <td>${daysLabel(row.daysLeft)}</td>
          <td>${escapeHtml(row.owner)}</td>
          <td>${formatBudget(row.budget)}</td>
        </tr>
      `
    )
    .join("");
}

function renderCharts() {
  if (!window.Chart) return;

  const disciplineCounts = countBy(filteredRows, "category");
  const categories = sortDisciplines(Object.keys(disciplineCounts));
  const categoryData = categories.map((category) => disciplineCounts[category] || 0);
  const statusItems = [
    { key: "overdue", label: "Overdue", color: "#bd3f32" },
    { key: "dueSoon", label: "Due Soon", color: "#d69028" },
    { key: "planned", label: "Planned", color: "#1f7a59" },
    { key: "done", label: "Completed", color: "#7897b3" }
  ];
  const statusCounts = countBy(filteredRows, "status");
  const statusColors = statusItems.map((item) => item.color);

  categoryChart?.destroy();
  statusChart?.destroy();

  categoryChart = new Chart(document.querySelector("#categoryChart"), {
    type: "bar",
    data: {
      labels: categories,
      datasets: [
        {
          label: "Records",
          data: categoryData,
          backgroundColor: createHoverAwareColor("#2f6f9f", "discipline"),
          borderRadius: 6
        }
      ]
    },
    options: {
      ...chartOptions("y"),
      onHover: handleHoverFade
    }
  });

  statusChart = new Chart(document.querySelector("#statusChart"), {
    type: "doughnut",
    data: {
      labels: statusItems.map((item) => item.label),
      datasets: [
        {
          data: statusItems.map((item) => statusCounts[item.key] || 0),
          backgroundColor: createHoverAwareIndexedColors(statusColors, "status"),
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      cutout: "62%",
      onHover: handleHoverFade
    }
  });
  renderStatusLegend(statusItems, statusCounts);
}

function renderStatusLegend(statusItems, statusCounts) {
  els.statusLegend.innerHTML = statusItems
    .map(
      (item) => `
        <span class="status-legend-item">
          <i style="background:${item.color}"></i>
          <b>${escapeHtml(item.label)}</b>
          <em>${statusCounts[item.key] || 0}</em>
        </span>
      `
    )
    .join("");
}

function activeFitoutRows() {
  return els.fitoutType.value === "MEGA FIT-OUT" ? megaFitoutRows : miniFitoutRows;
}

function buildAnnualSummaryRows(miniRows = miniFitoutRows, megaRows = megaFitoutRows) {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, index) => currentYear + index).map((year) => {
    const miniYearRows = miniRows.filter((row) => row.finishDate?.getFullYear() === year);
    const megaYearRows = megaRows.filter((row) => row.finishDate?.getFullYear() === year);
    const combinedRows = [...miniYearRows, ...megaYearRows];
    const realizedRevenue = combinedRows.reduce((sum, row) => sum + row.realizedRevenue, 0);
    const netOperatingProfit = combinedRows.reduce((sum, row) => sum + row.netOperatingProfit, 0);
    return {
      year,
      totalJobs: combinedRows.length,
      miniJobs: miniYearRows.length,
      megaJobs: megaYearRows.length,
      actualCapex: combinedRows.reduce((sum, row) => sum + row.actualCapex, 0),
      realizedRevenue,
      netOperatingProfit,
      profitMargin: realizedRevenue ? netOperatingProfit / realizedRevenue : 0,
      averageRevenue: combinedRows.length ? realizedRevenue / combinedRows.length : 0
    };
  });
}

function renderFitoutDashboard() {
  const rows = isFitoutDashboardView() ? activeFitoutRows() : [];
  const fitoutType = els.fitoutType.value;
  const palette = fitoutPalettes[fitoutType] || fitoutPalettes["MINI FIT-OUT"];
  const capex = rows.reduce((sum, row) => sum + row.actualCapex, 0);
  const revenue = rows.reduce((sum, row) => sum + row.realizedRevenue, 0);
  const profit = rows.reduce((sum, row) => sum + row.netOperatingProfit, 0);
  els.fitoutDashboard.classList.toggle("mega-fitout", fitoutType === "MEGA FIT-OUT");
  els.fitoutCapexTotal.textContent = formatBudget(capex);
  els.fitoutCapexLabel.textContent = fitoutType;
  els.fitoutRevenueTotal.textContent = formatBudget(revenue);
  els.fitoutRevenueLabel.textContent = fitoutType;
  els.fitoutProfitTotal.textContent = formatBudget(profit);
  els.fitoutRecordCount.textContent = `${rows.length} records`;
  const quarterly = calculateFitoutQuarterly(rows);
  renderFitoutQuarterList(quarterly);

  if (!window.Chart) return;
  fitoutFinanceChart?.destroy();
  fitoutFinanceChart = new Chart(document.querySelector("#fitoutFinanceChart"), {
    type: "pie",
    data: {
      labels: ["Actual CapEx", "Realized Revenue"],
      datasets: [
        {
          data: [capex, revenue],
          backgroundColor: [palette.capex, palette.revenue],
          borderColor: [palette.capex, palette.revenue],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: chartTextColor()
          }
        }
      }
    }
  });

  fitoutQuarterChart?.destroy();
  fitoutQuarterChart = new Chart(document.querySelector("#fitoutQuarterChart"), {
    type: "bar",
    data: {
      labels: quarterly.map((item) => item.quarter),
      datasets: [
        {
          label: "Actual CapEx",
          data: quarterly.map((item) => item.actualCapex),
          backgroundColor: createHoverAwareColor(palette.capex, "capex"),
          legendColor: palette.capex,
          borderRadius: 6
        },
        {
          label: "Realized Revenue",
          data: quarterly.map((item) => item.realizedRevenue),
          backgroundColor: createHoverAwareColor(palette.revenue, "revenue"),
          legendColor: palette.revenue,
          borderRadius: 6
        },
        {
          label: "Net Operating Profit",
          data: quarterly.map((item) => item.netOperatingProfit),
          backgroundColor: createHoverAwareColor(palette.profit, "profit"),
          legendColor: palette.profit,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 26
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: chartTextColor() }
        },
        y: {
          grid: { color: chartGridColor() },
          ticks: { color: chartTextColor(), callback: (value) => formatCompactBudget(value) }
        }
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: chartTextColor(),
            generateLabels(chart) {
              return Chart.defaults.plugins.legend.labels.generateLabels(chart).map((label) => {
                const dataset = chart.data.datasets[label.datasetIndex];
                return {
                  ...label,
                  fillStyle: dataset.legendColor,
                  strokeStyle: dataset.legendColor,
                  lineWidth: 0
                };
              });
            }
          }
        }
      },
      onHover: (event, activeElements, chart) => {
        handleHoverFade(event, activeElements, chart);
      }
    },
    plugins: [barValueLabelPlugin]
  });
}

function renderAnnualPerformanceDashboard() {
  if (!isAnnualPerformanceView()) {
    annualPerformanceChart?.destroy();
    annualPerformanceChart = null;
    return;
  }

  const rows = annualSummaryRows.length ? annualSummaryRows : buildAnnualSummaryRows();
  const currentYear = new Date().getFullYear();
  const reportRow = rows.find((row) => row.year === currentYear) || rows.find((row) => row.realizedRevenue) || rows[0];

  els.annualRevenueTotal.textContent = formatBudget(reportRow?.realizedRevenue || 0);
  els.annualProfitTotal.textContent = formatBudget(reportRow?.netOperatingProfit || 0);
  els.annualCapexTotal.textContent = formatBudget(reportRow?.actualCapex || 0);
  els.annualMarginTotal.textContent = formatPercent(reportRow?.profitMargin || 0);

  els.annualSummaryTable.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${row.year}</td>
          <td>${row.totalJobs}</td>
          <td>${row.miniJobs}</td>
          <td>${row.megaJobs}</td>
          <td>${formatBudget(row.actualCapex)}</td>
          <td>${formatBudget(row.realizedRevenue)}</td>
          <td class="profit-cell">${formatBudget(row.netOperatingProfit)}</td>
          <td>${formatPercent(row.profitMargin)}</td>
        </tr>
      `
    )
    .join("");

  if (!window.Chart) return;
  annualPerformanceChart?.destroy();
  annualPerformanceChart = new Chart(document.querySelector("#annualPerformanceChart"), {
    type: "bar",
    data: {
      labels: rows.map((row) => row.year),
      datasets: [
        {
          label: "Actual CapEx",
          data: rows.map((row) => row.actualCapex),
          backgroundColor: createHoverAwareColor("#35d8ff", "annual-capex"),
          legendColor: "#35d8ff",
          borderRadius: 6
        },
        {
          label: "Realized Revenue",
          data: rows.map((row) => row.realizedRevenue),
          backgroundColor: createHoverAwareColor("#20e3a2", "annual-revenue"),
          legendColor: "#20e3a2",
          borderRadius: 6
        },
        {
          label: "Net Operating Profit",
          data: rows.map((row) => row.netOperatingProfit),
          backgroundColor: createHoverAwareColor("#ffd166", "annual-profit"),
          legendColor: "#ffd166",
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 26
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: chartTextColor() }
        },
        y: {
          grid: { color: chartGridColor() },
          ticks: { color: chartTextColor(), callback: (value) => formatCompactBudget(value) }
        }
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: chartTextColor(),
            generateLabels(chart) {
              return Chart.defaults.plugins.legend.labels.generateLabels(chart).map((label) => {
                const dataset = chart.data.datasets[label.datasetIndex];
                return {
                  ...label,
                  fillStyle: dataset.legendColor,
                  strokeStyle: dataset.legendColor,
                  lineWidth: 0
                };
              });
            }
          }
        }
      },
      onHover: handleHoverFade
    },
    plugins: [barValueLabelPlugin]
  });
}

function calculateFitoutQuarterly(rows) {
  const quarters = ["Q1", "Q2", "Q3", "Q4"].map((quarter) => ({
    quarter,
    actualCapex: 0,
    realizedRevenue: 0,
    netOperatingProfit: 0,
    items: []
  }));

  rows.forEach((row) => {
    if (!row.finishDate) return;
    const quarterIndex = Math.floor(row.finishDate.getMonth() / 3);
    quarters[quarterIndex].actualCapex += row.actualCapex;
    quarters[quarterIndex].realizedRevenue += row.realizedRevenue;
    quarters[quarterIndex].netOperatingProfit += row.netOperatingProfit;
    quarters[quarterIndex].items.push(row);
  });

  return quarters;
}

function renderFitoutQuarterList(quarters) {
  els.fitoutQuarterList.innerHTML = quarters
    .map((quarter) => {
      const items = quarter.items.length
        ? quarter.items
            .map(
              (row) => `
                <li>
                  <div class="quarter-item-title">${escapeHtml(row.project)} UNIT ${escapeHtml(row.unit)}</div>
                  <div class="quarter-item-metrics">
                    <span class="capex-metric">Actual CapEx<strong>${formatBudget(row.actualCapex)}</strong></span>
                    <span class="revenue-metric">Realized Revenue<strong>${formatBudget(row.realizedRevenue)}</strong></span>
                    <span class="profit-metric">Net Operating Profit<strong>${formatBudget(row.netOperatingProfit)}</strong></span>
                  </div>
                </li>
              `
            )
            .join("")
        : `<li><div class="quarter-item-title">No jobs</div></li>`;

      return `
        <section class="quarter-card">
          <h4>${quarter.quarter}</h4>
          <ul>${items}</ul>
        </section>
      `;
    })
    .join("");
}

const barValueLabelPlugin = {
  id: "barValueLabelPlugin",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    ctx.save();
    ctx.font = "700 11px Segoe UI, Arial, sans-serif";
    ctx.fillStyle = chartTextColor();
    ctx.shadowColor = document.body.classList.contains("light-theme") ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.45)";
    ctx.shadowBlur = document.body.classList.contains("light-theme") ? 2 : 4;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((bar, index) => {
        const value = Number(dataset.data[index] || 0);
        if (!value) return;
        const position = bar.tooltipPosition();
        ctx.fillText(formatCompactBudget(value), position.x, position.y - 5);
      });
    });

    ctx.restore();
  }
};

function createHoverAwareColor(color, key) {
  return (context) => {
    if (context.dataIndex === undefined) return color;
    const active = context.chart.$activeBar;
    if (!active) return color;
    const isActive = active.datasetIndex === context.datasetIndex && active.index === context.dataIndex;
    const targetOpacity = isActive ? 1 : 0.2;
    context.chart.$barFadeState ||= {};
    const stateKey = `${key}-${context.dataIndex}`;
    const currentOpacity = context.chart.$barFadeState[stateKey] ?? 1;
    const nextOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.35;
    context.chart.$barFadeState[stateKey] = Math.abs(nextOpacity - targetOpacity) < 0.02 ? targetOpacity : nextOpacity;
    return hexToRgba(color, context.chart.$barFadeState[stateKey]);
  };
}

function createHoverAwareIndexedColors(colors, keyPrefix) {
  return (context) => {
    const color = colors[context.dataIndex] || colors[0];
    if (context.dataIndex === undefined) return color;
    const active = context.chart.$activeBar;
    if (!active) return color;
    const isActive = active.datasetIndex === context.datasetIndex && active.index === context.dataIndex;
    const targetOpacity = isActive ? 1 : 0.2;
    context.chart.$barFadeState ||= {};
    const stateKey = `${keyPrefix}-${context.dataIndex}`;
    const currentOpacity = context.chart.$barFadeState[stateKey] ?? 1;
    const nextOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.35;
    context.chart.$barFadeState[stateKey] = Math.abs(nextOpacity - targetOpacity) < 0.02 ? targetOpacity : nextOpacity;
    return hexToRgba(color, context.chart.$barFadeState[stateKey]);
  };
}

function handleHoverFade(event, activeElements, chart) {
  chart.$activeBar = activeElements[0] || null;
  if (!activeElements.length) chart.$barFadeState = {};
  chart.update();
}

function hexToRgba(hex, opacity) {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function chartOptions(indexAxis) {
  const horizontalLabels = indexAxis === "y";
  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis,
    scales: {
      x: { grid: { display: false }, ticks: { color: chartTextColor(), precision: 0 } },
      y: {
        grid: { color: chartGridColor() },
        ticks: {
          autoSkip: !horizontalLabels,
          color: chartTextColor(),
          font: { size: horizontalLabels ? 11 : 12 },
          precision: 0
        }
      }
    },
    plugins: { legend: { display: false } }
  };
}

function countBy(rows, key) {
  return rows.reduce((result, row) => {
    result[row[key]] = (result[row[key]] || 0) + 1;
    return result;
  }, {});
}

function updateCategoryOptions() {
  const current = els.categoryFilter.value;
  const categories = sortDisciplines(new Set(rawRows.map((row) => normalizeDiscipline(row.category))));
  els.categoryFilter.innerHTML = `<option value="all">All</option>${categories
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    .join("")}`;
  els.categoryFilter.value = categories.includes(current) ? current : "all";
}

function setActiveDashboardTab(button) {
  els.tabButtons.forEach((tab) => tab.classList.toggle("active", tab === button));
  const isFitout = button.dataset.tab === "fitout";
  els.renovationSelector.hidden = isFitout;
  els.fitoutSelector.hidden = !isFitout;
  els.dashboardTitle.textContent = isFitout ? els.fitoutType.value : activeRenovationLabel();
  if (isFitout) {
    render();
  } else {
    applyActiveRenovationRows();
  }
}

function updateRenovationTitle() {
  if (isRenovationView()) {
    els.dashboardTitle.textContent = activeRenovationLabel();
    resetRenovationFilters();
    applyActiveRenovationRows();
  }
}

function updateFitoutTitle() {
  const activeTab = [...els.tabButtons].find((tab) => tab.classList.contains("active"));
  if (activeTab?.dataset.tab === "fitout") {
    els.dashboardTitle.textContent = els.fitoutType.value;
  }
  render();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
  });
}

function setRows(rows) {
  const label = activeRenovationLabel();
  renovationRowsByView[label] = rows.map((row) => enrichRow(row));
  rawRows = renovationRowsByView[label];
  saveRenovationRows();
  if (label === RENOVATION_SHEET_OPTIONS[0].label) saveRows(rawRows);
  updateCategoryOptions();
  applyFilters();
}

function applyActiveRenovationRows() {
  rawRows = renovationRowsByView[activeRenovationLabel()] || [];
  updateCategoryOptions();
  applyFilters();
}

function setMiniFitoutRows(rows) {
  miniFitoutRows = rows;
  localStorage.setItem(MINI_FITOUT_STORAGE_KEY, JSON.stringify(serializeMiniFitoutRows(rows)));
  render();
}

function setMegaFitoutRows(rows) {
  megaFitoutRows = rows;
  localStorage.setItem(MEGA_FITOUT_STORAGE_KEY, JSON.stringify(serializeMiniFitoutRows(rows)));
  render();
}

function setAnnualSummaryRows(rows) {
  annualSummaryRows = rows;
  localStorage.setItem(ANNUAL_SUMMARY_STORAGE_KEY, JSON.stringify(serializeAnnualSummaryRows(rows)));
  render();
}

function setAllDashboardRows({ renovationRows, operationRows, annualRows, miniRows, megaRows }) {
  renovationRowsByView = Object.fromEntries(
    Object.entries(renovationRows || { [RENOVATION_SHEET_OPTIONS[0].label]: operationRows || [] }).map(([label, rows]) => [
      label,
      rows.map((row) => enrichRow(row))
    ])
  );
  rawRows = renovationRowsByView[activeRenovationLabel()] || renovationRowsByView[RENOVATION_SHEET_OPTIONS[0].label] || [];
  miniFitoutRows = miniRows;
  megaFitoutRows = megaRows;
  annualSummaryRows = annualRows;
  saveRenovationRows();
  saveRows(renovationRowsByView[RENOVATION_SHEET_OPTIONS[0].label] || rawRows);
  localStorage.setItem(MINI_FITOUT_STORAGE_KEY, JSON.stringify(serializeMiniFitoutRows(miniFitoutRows)));
  localStorage.setItem(MEGA_FITOUT_STORAGE_KEY, JSON.stringify(serializeMiniFitoutRows(megaFitoutRows)));
  localStorage.setItem(ANNUAL_SUMMARY_STORAGE_KEY, JSON.stringify(serializeAnnualSummaryRows(annualSummaryRows)));
  if (isRenovationView()) resetRenovationFilters();
  updateCategoryOptions();
  applyFilters();
}

function setActiveFitoutRows(rows) {
  if (els.fitoutType.value === "MEGA FIT-OUT") {
    setMegaFitoutRows(rows);
  } else {
    setMiniFitoutRows(rows);
  }
}

function saveRows(rows) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeRows(rows)));
}

function saveRenovationRows() {
  const serialized = Object.fromEntries(
    Object.entries(renovationRowsByView).map(([label, rows]) => [label, serializeRows(rows)])
  );
  localStorage.setItem(RENOVATION_STORAGE_KEY, JSON.stringify(serialized));
}

function loadStoredRows() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const rows = deserializeRows(JSON.parse(saved));
    return Array.isArray(rows) && rows.length ? rows : null;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function loadStoredRenovationRows() {
  try {
    const saved = localStorage.getItem(RENOVATION_STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (parsed[OLD_OVERALL_RENOVATION_LABEL] && !parsed[OVERALL_RENOVATION_LABEL]) {
      parsed[OVERALL_RENOVATION_LABEL] = parsed[OLD_OVERALL_RENOVATION_LABEL];
      delete parsed[OLD_OVERALL_RENOVATION_LABEL];
    }
    const rowsByView = Object.fromEntries(
      Object.entries(parsed).map(([label, rows]) => [label, deserializeRows(rows).map((row) => enrichRow(row))])
    );
    return Object.values(rowsByView).some((rows) => rows.length) ? rowsByView : null;
  } catch (error) {
    localStorage.removeItem(RENOVATION_STORAGE_KEY);
    return null;
  }
}

function loadStoredMiniFitoutRows() {
  try {
    const saved = localStorage.getItem(MINI_FITOUT_STORAGE_KEY);
    if (!saved) return null;
    const rows = deserializeMiniFitoutRows(JSON.parse(saved));
    return Array.isArray(rows) && rows.length ? rows : null;
  } catch (error) {
    localStorage.removeItem(MINI_FITOUT_STORAGE_KEY);
    return null;
  }
}

function loadStoredMegaFitoutRows() {
  try {
    const saved = localStorage.getItem(MEGA_FITOUT_STORAGE_KEY);
    if (!saved) return null;
    const rows = deserializeMiniFitoutRows(JSON.parse(saved));
    return Array.isArray(rows) && rows.length ? rows : null;
  } catch (error) {
    localStorage.removeItem(MEGA_FITOUT_STORAGE_KEY);
    return null;
  }
}

function loadStoredAnnualSummaryRows() {
  try {
    const saved = localStorage.getItem(ANNUAL_SUMMARY_STORAGE_KEY);
    if (!saved) return null;
    const rows = deserializeAnnualSummaryRows(JSON.parse(saved));
    return Array.isArray(rows) && rows.length ? rows : null;
  } catch (error) {
    localStorage.removeItem(ANNUAL_SUMMARY_STORAGE_KEY);
    return null;
  }
}

function loadSample() {
  setRows(sampleRows);
}

function exportCsv() {
  const header = ["Priority", "Status", "Contractor", "Project", "Block", "Unit", "Discipline", "Asset", "Area", "Cycle (Months)", "Last Update", "Due Date", "Remaining", "Owner", "Budget"];
  const body = sortedRegisterRows().map((row) => [
    row.priority,
    statusLabel(row.status),
    row.contractor,
    row.project,
    row.block,
    row.unit,
    row.category,
    row.asset,
    row.area,
    row.cycle,
    formatDate(row.lastDate),
    formatDate(row.dueDate),
    daysLabel(row.daysLeft),
    row.owner,
    row.budget
  ]);
  const csv = [header, ...body].map((line) => line.map(csvCell).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `warehouse-operation-dashboard-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function readExcel(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    if (file.name.toLowerCase().endsWith(".csv")) {
      const parsedRows = parseCsv(event.target.result);
      if (isFitoutDashboardView()) {
        setActiveFitoutRows(mapMiniFitoutRows(parsedRows));
      } else if (isAnnualPerformanceView()) {
        setAnnualSummaryRows(mapAnnualSummaryRows(parsedRows));
      } else if (isRenovationView()) {
        setRows(mapWorkbookRows(parsedRows));
      } else {
        setSheetStatus("This Fit-Out view is not connected yet. Renovation data remains locked to Operation Plan.", true);
      }
      return;
    }

    if (!window.XLSX) {
      alert("Unable to load the Excel reader library. Please connect to the internet and try again.");
      return;
    }

    const workbook = XLSX.read(event.target.result, { type: "array", cellDates: true });
    const activeRenovationSheet = workbook.Sheets[activeRenovationSheetName()];
    const operationPlanSheet = workbook.Sheets["Operation Plan"];
    const sheet = isRenovationView() && (activeRenovationSheet || operationPlanSheet)
      ? activeRenovationSheet || operationPlanSheet
      : workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    if (isFitoutDashboardView()) {
      setActiveFitoutRows(mapMiniFitoutRows(rows));
    } else if (isAnnualPerformanceView()) {
      setAnnualSummaryRows(mapAnnualSummaryRows(rows));
    } else if (isRenovationView()) {
      if (!activeRenovationSheet && !operationPlanSheet && workbook.SheetNames.length > 1) {
        setSheetStatus(`${activeRenovationSheetName()} sheet was not found. Renovation data was not updated.`, true);
        return;
      }
      setRows(mapWorkbookRows(rows));
    } else {
      setSheetStatus("This Fit-Out view is not connected yet. Renovation data remains locked to Operation Plan.", true);
    }
  };
  if (file.name.toLowerCase().endsWith(".csv")) {
    reader.readAsText(file, "utf-8");
  } else {
    reader.readAsArrayBuffer(file);
  }
}

async function syncGoogleSheet() {
  const mobileActive = window.matchMedia("(max-width: 760px)").matches && els.mobileGoogleSheetUrl;
  const url = (mobileActive ? els.mobileGoogleSheetUrl.value : els.googleSheetUrl.value).trim();
  els.googleSheetUrl.value = url;
  if (els.mobileGoogleSheetUrl) els.mobileGoogleSheetUrl.value = url;
  if (!url) {
    setSheetStatus("Paste a Google Sheet URL first.", true);
    return;
  }

  try {
    setSheetStatus("Syncing Google Sheet...");
    if (isGoogleSheetUrl(url)) {
      await syncAllGoogleSheets(url);
      return;
    }

    const sheetName = activeGoogleSheetName();
    const sourceRows = await loadCsvRows(url);
    if (isFitoutDashboardView()) {
      const rows = mapMiniFitoutRows(sourceRows);
      if (!rows.length) throw new Error("No rows found");
      setActiveFitoutRows(rows);
      setSheetStatus(`Synced ${rows.length} ${sheetName} records from CSV.`);
    } else if (isAnnualPerformanceView()) {
      const rows = mapAnnualSummaryRows(sourceRows);
      if (!rows.length) throw new Error("No annual summary rows found");
      setAnnualSummaryRows(rows);
      setSheetStatus(`Synced ${rows.length} annual performance rows from CSV.`);
    } else if (isRenovationView()) {
      const rows = mapWorkbookRows(sourceRows);
      if (!rows.length) throw new Error("No rows found");
      setRows(rows);
      setSheetStatus(`Synced ${rows.length} ${sheetName} records from CSV.`);
    } else {
      setSheetStatus("This Fit-Out view is not connected yet. Renovation data remains locked to Operation Plan.", true);
    }
  } catch (error) {
    console.error(error);
    setSheetStatus("Unable to sync. Share the sheet as Anyone with the link: Viewer, then paste the normal Google Sheet URL.", true);
  }
}

async function syncAllGoogleSheets(url) {
  const renovationResults = [];
  for (const option of RENOVATION_SHEET_OPTIONS) {
    const result = await loadMappedGoogleSheet(url, option.sheetName, mapWorkbookRows);
    renovationResults.push({ ...result, label: option.label });
  }
  const sheetRequests = [
    ["Annual Performance Summary", mapAnnualSummaryRows],
    ["MINI FIT-OUT", mapMiniFitoutRows],
    ["MEGA FIT-OUT", mapMiniFitoutRows]
  ];
  const results = [];
  for (const [sheetName, mapper] of sheetRequests) {
    results.push(await loadMappedGoogleSheet(url, sheetName, mapper));
  }
  const [annualResult, miniResult, megaResult] = results;
  const syncedResults = [...renovationResults, ...results].filter((result) => result.rows.length);

  if (!syncedResults.length) {
    throw new Error("No Google Sheet data could be synced");
  }

  const renovationRows = Object.fromEntries(
    renovationResults.map((result) => [
      result.label,
      result.rows
    ])
  );
  const miniRows = miniResult.rows.length ? miniResult.rows : miniFitoutRows;
  const megaRows = megaResult.rows.length ? megaResult.rows : megaFitoutRows;
  const shouldRebuildAnnual = !annualResult.rows.length && (miniResult.rows.length || megaResult.rows.length);
  const annualRows = annualResult.rows.length
    ? annualResult.rows
    : shouldRebuildAnnual
      ? buildAnnualSummaryRows(miniRows, megaRows)
      : annualSummaryRows;

  setAllDashboardRows({ renovationRows, annualRows, miniRows, megaRows });

  setSheetStatus("All dashboards synced.");
}

async function loadMappedGoogleSheet(url, sheetName, mapper) {
  let lastRows = [];
  let lastError = null;
  for (const candidateName of googleSheetNameAliases(sheetName)) {
    try {
      const sourceRows = await loadGoogleSheetRows(url, candidateName);
      const rows = mapper(sourceRows);
      if (rows.length) return { sheetName, rows };
      lastRows = rows;
    } catch (error) {
      lastError = error;
    }
  }
  if (lastError) console.warn(`Unable to sync ${sheetName}`, lastError);
  return { sheetName, rows: lastRows };
}

function googleSheetNameAliases(sheetName) {
  const aliases = {
    "Operation Plan": ["Operation Plan", "operation plan", "OPERATION PLAN"],
    "Annual Performance Summary": [
      "Annual Performance Summary",
      "annual performance summary",
      "ANNUAL PERFORMANCE SUMMARY"
    ],
    "MINI FIT-OUT": ["MINI FIT-OUT", "mini fit-out", "Mini Fit-Out"],
    "MEGA FIT-OUT": ["MEGA FIT-OUT", "mega fit-out", "Mega Fit-Out"],
    "CHODBIZ CHAENGWATTANA": ["CHODBIZ CHAENGWATTANA"],
    "CHOD BIZ BANGNA KM.8": ["CHOD BIZ BANGNA KM.8"],
    "CHODBIZ PUTTHAMONTHON SAI 4": ["CHODBIZ PUTTHAMONTHON SAI 4"],
    "F&W CHODTHANAWAT 1": ["F&W CHODTHANAWAT 1"],
    "F&W CHODTHANAWAT 2": ["F&W CHODTHANAWAT 2"],
    "F&W CHODTHANAWAT 3": ["F&W CHODTHANAWAT 3"],
    "F&W CHODTHANAWAT 5": ["F&W CHODTHANAWAT 5"]
  };
  return aliases[sheetName] || [sheetName];
}

function isGoogleSheetUrl(url) {
  return url.includes("docs.google.com/spreadsheets/");
}

async function loadCsvRows(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return parseCsv(await response.text());
}

function loadGoogleSheetRows(url, sheetName = null) {
  return new Promise((resolve, reject) => {
    const sheetId = (url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/) || [])[1];
    if (!sheetId) {
      reject(new Error("Invalid Google Sheet URL"));
      return;
    }

    const gid = (url.match(/[?&#]gid=([0-9]+)/) || [])[1] || "0";
    const callbackName = `googleSheetCallback_${Date.now()}_${Math.round(Math.random() * 100000)}`;
    const script = document.createElement("script");
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Google Sheet sync timed out"));
    }, 12000);
    const cleanup = () => {
      clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (payload) => {
      try {
        resolve(googleVizToRows(payload));
      } catch (error) {
        reject(error);
      } finally {
        cleanup();
      }
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Google Sheet script load failed"));
    };
    const sheetParam = sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : `&gid=${gid}`;
    script.src = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json;responseHandler:${callbackName}${sheetParam}&cacheBust=${Date.now()}`;
    document.body.appendChild(script);
  });
}

function googleVizToRows(payload) {
  const table = payload?.table;
  if (!table?.cols?.length) return [];
  const headers = table.cols.map((col, index) => cleanValue(col.label || col.id || `Column ${index + 1}`));

  return (table.rows || []).map((row) => {
    return Object.fromEntries(
      headers.map((header, index) => {
        const cell = row.c?.[index];
        return [header, cell?.v ?? cell?.f ?? ""];
      })
    );
  });
}

function setSheetStatus(message, isError = false) {
  els.sheetStatus.textContent = message;
  els.sheetStatus.style.color = isError ? "#ffd0ca" : "#c8d4d8";
  if (els.mobileSheetStatus) {
    els.mobileSheetStatus.textContent = message;
    els.mobileSheetStatus.style.color = isError ? "#ffd0ca" : "#adc5cf";
  }
}

function parseCsv(text) {
  const rows = [];
  let cell = "";
  let row = [];
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      rows.push(row);
      cell = "";
      row = [];
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

const [header = [], ...body] = rows.filter((line) => line.some((value) => value.trim()));
  return body.map((line) => Object.fromEntries(header.map((key, index) => [key.trim(), line[index] || ""])));
}

applyTheme(localStorage.getItem(THEME_STORAGE_KEY) || "dark", false);

els.file.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) readExcel(file);
});
els.themeToggle.addEventListener("click", toggleTheme);
els.tabButtons.forEach((button) => button.addEventListener("click", () => setActiveDashboardTab(button)));
els.renovationType.addEventListener("change", updateRenovationTitle);
els.fitoutType.addEventListener("change", updateFitoutTitle);
els.loadSampleBtn.addEventListener("click", () => els.file.click());
els.syncSheetBtn.addEventListener("click", syncGoogleSheet);
els.mobileSyncSheetBtn?.addEventListener("click", syncGoogleSheet);
els.googleSheetUrl.addEventListener("input", () => {
  if (els.mobileGoogleSheetUrl) els.mobileGoogleSheetUrl.value = els.googleSheetUrl.value;
});
els.mobileGoogleSheetUrl?.addEventListener("input", () => {
  els.googleSheetUrl.value = els.mobileGoogleSheetUrl.value;
});
els.clearFilterBtn.addEventListener("click", clearRenovationFilters);
els.projectFilter.addEventListener("change", applyFilters);
els.categoryFilter.addEventListener("change", applyFilters);
els.statusFilter.addEventListener("change", applyFilters);
els.searchBox.addEventListener("input", applyFilters);
els.refreshBtn.addEventListener("click", () => setRows(rawRows));
els.exportBtn.addEventListener("click", exportCsv);

setInterval(updateLiveClock, 1000);
renovationRowsByView = loadStoredRenovationRows() || {};
if (!renovationRowsByView[RENOVATION_SHEET_OPTIONS[0].label]) {
  renovationRowsByView[RENOVATION_SHEET_OPTIONS[0].label] = (loadStoredRows() || sampleRows).map((row) => enrichRow(row));
}
miniFitoutRows = loadStoredMiniFitoutRows() || deserializeMiniFitoutRows(sampleMiniFitoutRows);
megaFitoutRows = loadStoredMegaFitoutRows() || deserializeMiniFitoutRows(sampleMegaFitoutRows);
annualSummaryRows = loadStoredAnnualSummaryRows() || buildAnnualSummaryRows(miniFitoutRows, megaFitoutRows);
applyActiveRenovationRows();

