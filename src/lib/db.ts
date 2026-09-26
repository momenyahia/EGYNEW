import fs from "fs";
import path from "path";
import { AppDatabase, Lead, Project, ServiceItem, SiteSettings, StatItem } from "../types";
import { initialData } from "./initialData";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "db.json");

function ensureDbExists(): AppDatabase {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(raw);
    return data;
  } catch (error) {
    console.error("Error reading database file, reinitializing with default data:", error);
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
}

export function getDatabase(): AppDatabase {
  return ensureDbExists();
}

export function saveDatabase(data: AppDatabase): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

export function getSettings(): SiteSettings {
  const db = getDatabase();
  return db.settings;
}

export function updateSettings(newSettings: Partial<SiteSettings>): SiteSettings {
  const db = getDatabase();
  db.settings = { ...db.settings, ...newSettings };
  saveDatabase(db);
  return db.settings;
}

export function getProjects(): Project[] {
  const db = getDatabase();
  return db.projects.sort((a, b) => a.display_order - b.display_order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const db = getDatabase();
  return db.projects.find((p) => p.slug === slug || p.id === slug);
}

export function saveProject(project: Project): Project {
  const db = getDatabase();
  const index = db.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    db.projects[index] = project;
  } else {
    db.projects.push(project);
  }
  saveDatabase(db);
  return project;
}

export function deleteProject(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function getServices(): ServiceItem[] {
  const db = getDatabase();
  return db.services.sort((a, b) => a.display_order - b.display_order);
}

export function updateService(service: ServiceItem): ServiceItem {
  const db = getDatabase();
  const index = db.services.findIndex((s) => s.id === service.id);
  if (index >= 0) {
    db.services[index] = service;
  } else {
    db.services.push(service);
  }
  saveDatabase(db);
  return service;
}

export function getStats(): StatItem[] {
  const db = getDatabase();
  return db.stats;
}

export function updateStats(stats: StatItem[]): StatItem[] {
  const db = getDatabase();
  db.stats = stats;
  saveDatabase(db);
  return db.stats;
}

export function getLeads(): Lead[] {
  const db = getDatabase();
  return db.leads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addLead(
  leadInput: Omit<Lead, "id" | "createdAt" | "updatedAt" | "status">
): Lead {
  const db = getDatabase();
  const newLead: Lead = {
    ...leadInput,
    id: "lead-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.leads.unshift(newLead);
  saveDatabase(db);
  return newLead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const db = getDatabase();
  const index = db.leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  db.leads[index] = {
    ...db.leads[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  saveDatabase(db);
  return db.leads[index];
}

export function deleteLead(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.leads.length;
  db.leads = db.leads.filter((l) => l.id !== id);
  if (db.leads.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function getHeroMedia(): any[] {
  const db = getDatabase();
  return (db.hero_media || []).sort((a, b) => a.display_order - b.display_order);
}

export function saveHeroMedia(items: any[]): any[] {
  const db = getDatabase();
  db.hero_media = items;
  saveDatabase(db);
  return db.hero_media;
}

