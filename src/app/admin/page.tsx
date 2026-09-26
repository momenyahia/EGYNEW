"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Layers,
  Settings as SettingsIcon,
  LayoutDashboard,
  ArrowUpRight,
  MessageCircle,
  Plus,
  Trash2,
  Edit,
  Save,
  Search,
  ExternalLink,
  ChevronRight,
  Film,
  Download,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Copy,
  Check,
  Shield,
  Eye,
  Globe,
  X
} from "lucide-react";
import { HeroMediaItem, Lead, LeadStatus, Project, ServiceItem, SiteSettings, StatItem } from "@/types";
import AdminSectionGuide from "@/components/AdminSectionGuide";

type AdminTab = "dashboard" | "leads" | "projects" | "media_library" | "hero_media" | "services" | "content" | "users" | "settings";

interface MediaAsset {
  id: string;
  name: string;
  type: "image" | "video" | "logo";
  url: string;
  size: string;
  uploadedAt: string;
}

interface TeamUser {
  id: string;
  name: string;
  email: string;
  role: "Owner / Super Admin" | "Content Editor" | "Leads Specialist";
  status: "Active" | "Pending";
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Data states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [heroMedia, setHeroMedia] = useState<HeroMediaItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [stats, setStats] = useState<StatItem[]>([]);

  // Media Library state (Roadmap Section 20)
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([
    {
      id: "med-1",
      name: "Remas Land Hero Showcase",
      type: "image",
      url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=85",
      size: "1.4 MB",
      uploadedAt: "2026-09-20"
    },
    {
      id: "med-2",
      name: "Sultan Al Mandy Culinary Reel",
      type: "image",
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85",
      size: "2.1 MB",
      uploadedAt: "2026-09-22"
    },
    {
      id: "med-3",
      name: "Nile Luxury River Suite",
      type: "image",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
      size: "1.8 MB",
      uploadedAt: "2026-09-24"
    },
    {
      id: "med-4",
      name: "Capital Horizon 3D Tower",
      type: "image",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      size: "3.2 MB",
      uploadedAt: "2026-09-25"
    }
  ]);
  const [newAssetUrl, setNewAssetUrl] = useState("");
  const [newAssetName, setNewAssetName] = useState("");

  // Team Users & Permissions (Roadmap Section 20)
  const [teamUsers, setTeamUsers] = useState<TeamUser[]>([
    {
      id: "usr-1",
      name: "Managing Director",
      email: "director@egyptcreative.com",
      role: "Owner / Super Admin",
      status: "Active"
    },
    {
      id: "usr-2",
      name: "Creative Strategist",
      email: "strategy@egyptcreative.com",
      role: "Content Editor",
      status: "Active"
    },
    {
      id: "usr-3",
      name: "Growth & Business Development",
      email: "growth@egyptcreative.com",
      role: "Leads Specialist",
      status: "Active"
    }
  ]);

  // Leads filter & search
  const [leadFilter, setLeadFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Project Editor & Filter state
  const [projectFilter, setProjectFilter] = useState<"all" | "published" | "draft" | "archived">("all");
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [newGalleryInput, setNewGalleryInput] = useState("");

  // Service Editor state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Load all initial admin data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, projRes, srvRes, contentRes, heroMediaRes] = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/projects"),
        fetch("/api/services"),
        fetch("/api/content"),
        fetch("/api/hero-media")
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.leads || []);
      }
      if (projRes.ok) {
        const data = await projRes.json();
        setProjects(data.projects || []);
      }
      if (srvRes.ok) {
        const data = await srvRes.json();
        setServices(data.services || []);
      }
      if (contentRes.ok) {
        const data = await contentRes.json();
        setSettings(data.settings);
        setStats(data.stats || []);
      }
      if (heroMediaRes.ok) {
        const data = await heroMediaRes.json();
        setHeroMedia(data.hero_media || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 4000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showNotification("URL copied to clipboard!");
  };

  // Lead status update
  const handleUpdateLeadStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showNotification("Lead status updated.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Lead notes update
  const handleUpdateLeadNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes })
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, notes } : l))
        );
        showNotification("Notes saved.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Lead deletion
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        showNotification("Lead deleted.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Export Leads to CSV with UTF-8 BOM
  const handleExportLeadsCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export.");
      return;
    }
    const headers = ["ID", "Full Name", "Company", "Email", "Phone", "Service", "Budget Tier", "Timeline", "Status", "Source", "Date", "Notes"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.company.replace(/"/g, '""')}"`,
      l.email,
      `"${l.phone}"`,
      `"${l.serviceNeeded}"`,
      `"${l.budgetTier || "N/A"}"`,
      `"${l.timeline || "N/A"}"`,
      l.status,
      `"${l.source}"`,
      new Date(l.createdAt).toLocaleDateString(),
      `"${(l.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `egypt_creative_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Leads CSV exported successfully!");
  };

  // Save Settings
  const handleSaveSettings = async () => {
    if (!settings) return;
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings, stats })
      });
      if (res.ok) {
        showNotification("Content and settings saved successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Project
  const handleSaveProject = async () => {
    if (!editingProject || !editingProject.title_en || !editingProject.company_name_en) {
      alert("Please provide at least a project title and client name.");
      return;
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject)
      });
      const data = await res.json();
      if (data.success) {
        setEditingProject(null);
        fetchData();
        showNotification("Project saved successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Service
  const handleSaveService = async () => {
    if (!editingService) return;
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService)
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? editingService : s))
        );
        setEditingService(null);
        showNotification("Service saved successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Move Project Display Order
  const handleMoveProject = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const reordered = [...projects];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    reordered.forEach((p, idx) => {
      p.display_order = idx + 1;
    });

    setProjects(reordered);
    await Promise.all([
      fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reordered[index])
      }),
      fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reordered[targetIndex])
      })
    ]);
    showNotification("Project display order updated.");
  };

  // Toggle Project Archive status
  const handleToggleArchiveProject = async (p: Project) => {
    const isCurrentlyArchived = p.status === "archived";
    const nextStatus = isCurrentlyArchived ? "published" : "archived";
    const updated: Project = {
      ...p,
      status: nextStatus,
      active: nextStatus === "published"
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setProjects((prev) => prev.map((item) => (item.id === p.id ? updated : item)));
        showNotification(isCurrentlyArchived ? "Project restored to active portfolio." : "Project moved to archive.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Change project order directly
  const handleChangeProjectOrder = async (p: Project, newOrder: number) => {
    const updated: Project = { ...p, display_order: Number(newOrder) };
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setProjects((prev) => {
          const mapped = prev.map((item) => (item.id === p.id ? updated : item));
          return mapped.sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));
        });
        showNotification("Project display order updated.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showNotification("Project deleted.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Hero Media
  const handleSaveHeroMedia = async () => {
    try {
      const res = await fetch("/api/hero-media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero_media: heroMedia })
      });
      if (res.ok) {
        showNotification("Hero media sequencer saved successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Asset to Media Library
  const handleAddMediaAsset = () => {
    if (!newAssetUrl || !newAssetName) {
      alert("Please provide both asset name and image/video URL.");
      return;
    }
    const newAsset: MediaAsset = {
      id: "med-" + Date.now(),
      name: newAssetName,
      type: newAssetUrl.endsWith(".mp4") || newAssetUrl.includes("vimeo") ? "video" : "image",
      url: newAssetUrl,
      size: "2.4 MB",
      uploadedAt: new Date().toISOString().slice(0, 10)
    };
    setMediaAssets([newAsset, ...mediaAssets]);
    setNewAssetName("");
    setNewAssetUrl("");
    showNotification("Asset added to Media Library!");
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesFilter = leadFilter === "all" || l.status === leadFilter;
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // Calculate Metrics
  const totalLeadsCount = leads.length;
  const qualifiedCount = leads.filter((l) => l.status === "qualified" || l.status === "closed").length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const conversionRate = totalLeadsCount > 0 ? Math.round((qualifiedCount / totalLeadsCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#080808] text-[#F4F4F1] flex flex-col lg:flex-row">
      {/* Sidebar Navigation (Roadmap Section 20 Specification) */}
      <aside className="w-full lg:w-64 bg-[#101010] border-r border-white/[0.08] flex flex-col justify-between p-6">
        <div>
          {/* Brand Emblem */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-8">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo-dark.png"
                alt="Egypt Creative Marketing Agency"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#FFD400]/20 text-[#FFD400] border border-[#FFD400]/30">
              CMS V1
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "dashboard"
                  ? "bg-[#FFD400] text-black font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "leads"
                  ? "bg-[#FFD400] text-black font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Leads CRM</span>
              </div>
              {newCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-sans font-bold">
                  {newCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "projects"
                  ? "bg-[#FFD400] text-black font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Work & Projects</span>
            </button>

            <button
              onClick={() => setActiveTab("media_library")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "media_library"
                  ? "bg-[#FFD400] text-black font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => setActiveTab("hero_media")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "hero_media"
                  ? "bg-[#FFD400] text-black font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Hero Media</span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "services"
                  ? "bg-[#FFD400] text-black font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Services CMS</span>
            </button>

            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "content"
                  ? "bg-[#FFD400] text-black font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Edit className="w-4 h-4" />
              <span>Content CMS</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "users"
                  ? "bg-[#FFD400] text-black font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Team & Roles</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "settings"
                  ? "bg-[#FFD400] text-black font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Site & SEO</span>
            </button>
          </nav>
        </div>

        {/* Back to Live Site */}
        <div className="pt-6 border-t border-white/[0.08] mt-6">
          <Link
            href="/"
            className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/50 hover:text-[#FFD400] transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Panel View */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#080808] p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Toast / Notification Banner */}
        {statusMessage && (
          <div className="mb-6 p-4 bg-[#FFD400]/10 border border-[#FFD400]/40 text-[#FFD400] text-xs font-mono uppercase tracking-wider flex items-center justify-between animate-in fade-in">
            <span>{statusMessage}</span>
            <button onClick={() => setStatusMessage("")}>×</button>
          </div>
        )}

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-2">
                // EXECUTIVE OVERVIEW
              </span>
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
                Agency Intelligence & Inbound Pipeline
              </h1>
            </div>

            <AdminSectionGuide
              badge="DASHBOARD // لوحة القيادة"
              titleAr="لوحة القيادة والتحليلات التنفيذية"
              titleEn="Executive Intelligence & Inbound Pipeline"
              purposeAr="شاشة مراقبة مركزية تعرض لك ملخصاً فورياً للعملاء الجدد، ومعدل التحويل (Conversion Rate)، والمشاريع المنشورة، وروابط سريعة لأهم الإجراءات اليومية."
              purposeEn="Central executive command center summarizing real-time website performance, incoming lead metrics, qualified deals, and active showcase projects."
              impactAr="شاشة داخلية للإدارة العليا وفريق القيادة لمتابعة نمو الوكالة وسرعة الاستجابة لطلبات العملاء الجدد دون التأثير على الواجهة الخارجية."
              impactEn="Internal management cockpit to monitor agency growth and lead response times without modifying public site layout."
              tips={[
                { ar: "متابعة العملاء الجدد (New Leads) للرد السريع وتحقيق أعلى نسبة إغلاق صفقات.", en: "Review new inquiries quickly to maintain high conversion rates." },
                { ar: "الانتقال السريع بضغطة زر لأقسام المشاريع والليدز ومكتبة الوسائط.", en: "Use quick action cards below to jump directly to any operational section." },
                { ar: "فحص مؤشر صحة خط المبيعات (Pipeline Health) المباشر.", en: "Check live inbound conversion metrics and qualified deal volume." }
              ]}
            />

            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="p-6 bg-white/[0.02] border border-white/[0.08]">
                <span className="text-xs font-mono uppercase text-white/50 block mb-2">
                  Total Leads Received
                </span>
                <span className="font-heading font-black text-4xl text-white">
                  {totalLeadsCount}
                </span>
                <span className="block text-[11px] font-mono text-[#FFD400] mt-2">
                  {newCount} requiring review
                </span>
              </div>

              <div className="p-6 bg-white/[0.02] border border-white/[0.08]">
                <span className="text-xs font-mono uppercase text-white/50 block mb-2">
                  Qualified Deals
                </span>
                <span className="font-heading font-black text-4xl text-[#FFD400]">
                  {qualifiedCount}
                </span>
                <span className="block text-[11px] font-mono text-white/40 mt-2">
                  High-intent prospects
                </span>
              </div>

              <div className="p-6 bg-white/[0.02] border border-white/[0.08]">
                <span className="text-xs font-mono uppercase text-white/50 block mb-2">
                  Conversion Rate
                </span>
                <span className="font-heading font-black text-4xl text-white">
                  {conversionRate}%
                </span>
                <span className="block text-[11px] font-mono text-emerald-400 mt-2">
                  Inbound pipeline health
                </span>
              </div>

              <div className="p-6 bg-white/[0.02] border border-white/[0.08]">
                <span className="text-xs font-mono uppercase text-white/50 block mb-2">
                  Showcase Projects
                </span>
                <span className="font-heading font-black text-4xl text-white">
                  {projects.length}
                </span>
                <span className="block text-[11px] font-mono text-white/40 mt-2">
                  Active portfolio items
                </span>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <button
                onClick={() => setActiveTab("leads")}
                className="p-5 bg-white/[0.03] border border-white/[0.1] hover:border-[#FFD400] text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-heading font-bold text-base text-white block">Review Inbound Leads</span>
                  <span className="text-xs text-white/50 font-mono">{leads.length} requests in pipeline</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#FFD400]" />
              </button>

              <button
                onClick={() => setActiveTab("projects")}
                className="p-5 bg-white/[0.03] border border-white/[0.1] hover:border-[#FFD400] text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-heading font-bold text-base text-white block">Manage Portfolio</span>
                  <span className="text-xs text-white/50 font-mono">Reorder and publish case studies</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#FFD400]" />
              </button>

              <button
                onClick={() => setActiveTab("media_library")}
                className="p-5 bg-white/[0.03] border border-white/[0.1] hover:border-[#FFD400] text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-heading font-bold text-base text-white block">Media Assets</span>
                  <span className="text-xs text-white/50 font-mono">{mediaAssets.length} assets ready</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#FFD400]" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS CRM */}
        {activeTab === "leads" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-2">
                  // CRM PIPELINE
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Inbound Leads & Conversions
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportLeadsCSV}
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white hover:border-[#FFD400] hover:text-[#FFD400] text-xs font-mono uppercase transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <AdminSectionGuide
              badge="LEADS CRM // إدارة طلبات العملاء"
              titleAr="إدارة ومتابعة طلبات العملاء القادمة من الموقع"
              titleEn="Inbound Inquiries & Conversion Pipeline"
              purposeAr="تستقبل وتدير كافة طلبات المشاريع التي يرسلها العملاء من نافذة (Start a Project) في الموقع فورياً، مع إمكانية تحديث حالة كل عميل وكتابة ملاحظات داخلية سرية."
              purposeEn="Captures and manages all incoming project inquiries submitted via the 'Start a Project' modal on the live site, with lead progression and confidential internal notes."
              impactAr="لا يغير شكل الموقع الخارجي؛ هذا هو محرك المبيعات الداخلي الذي يربط استفسارات الزوار بفريق تطوير الأعمال لديك."
              impactEn="Internal sales pipeline engine connecting incoming website prospects with your business development team."
              tips={[
                { ar: "تغيير حالة الطلب: (New -> Contacted -> Qualified -> Closed) لتنظيم المتابعة.", en: "Update status from New to Contacted, Qualified, or Closed to track pipeline." },
                { ar: "كتابة ملاحظات سرية (Internal Notes) في الصندوق الخاص بكل عميل مع حفظ تلقائي.", en: "Record meeting minutes, estimated budgets, and client requirements in notes." },
                { ar: "تصدير فوري (Export CSV) لبيانات العملاء لإجراء حملات بريدية وتسويقية.", en: "Export all leads to CSV for email marketing and CRM integrations." }
              ]}
            />

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-white/50 uppercase">Filter Status:</span>

                <div className="flex flex-wrap gap-2">
                  {["all", "new", "contacted", "qualified", "closed"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadFilter(st)}
                      className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all ${
                        leadFilter === st
                          ? "bg-[#FFD400] text-black font-bold"
                          : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

            {/* Search Box */}
            <div className="mb-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search leads by name, company, email or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded pl-10 pr-4 py-2.5 text-sm text-white focus:border-[#FFD400] outline-none"
              />
            </div>

            {/* Leads Table */}
            <div className="bg-white/[0.02] border border-white/[0.08] overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-white/[0.04] text-white/60 font-mono uppercase border-b border-white/[0.08]">
                  <tr>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Service Needed</th>
                    <th className="p-4">Budget & Timeline</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-white/40 font-mono">
                        No inquiries match the current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <span className="font-heading font-bold text-white block text-sm">
                            {lead.fullName}
                          </span>
                          <span className="text-white/60 block">{lead.company}</span>
                          <span className="text-white/40 text-[11px] block">{lead.email}</span>
                          <span className="text-white/40 text-[11px] block">{lead.phone}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-[#FFD400] font-mono font-medium block">
                            {lead.serviceNeeded}
                          </span>
                          {lead.message && (
                            <span className="text-white/60 line-clamp-2 mt-1 text-[11px]">
                              {lead.message}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          {lead.budgetTier ? (
                            <span className="inline-block px-2 py-0.5 bg-[#FFD400]/15 text-[#FFD400] font-mono text-[11px] border border-[#FFD400]/30 rounded mb-1">
                              {lead.budgetTier}
                            </span>
                          ) : (
                            <span className="text-white/30 text-[11px] font-mono block">—</span>
                          )}
                          {lead.timeline && (
                            <span className="block text-white/50 text-[10px] font-mono">
                              {lead.timeline}
                            </span>
                          )}
                        </td>
                        <td className="p-4 font-mono text-white/50">{lead.source}</td>
                        <td className="p-4 font-mono text-white/40 whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)
                            }
                            className="bg-black/60 border border-white/20 text-white text-xs font-mono py-1 px-2 rounded outline-none focus:border-[#FFD400]"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hello ${lead.fullName}, thank you for contacting Egypt Creative regarding ${lead.serviceNeeded}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors"
                              title="Start WhatsApp Conversation"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-2 rounded bg-white/[0.06] text-white hover:bg-white/20 transition-colors"
                              title="View & Edit Notes"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-2 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Lead Details & Notes Drawer */}
            {selectedLead && (
              <div className="mt-8 p-6 bg-white/[0.03] border border-white/[0.1] rounded">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                  <h3 className="font-heading font-bold text-lg text-white">
                    Inquiry Notes: {selectedLead.fullName} ({selectedLead.company})
                  </h3>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-white/40 hover:text-white text-xs font-mono"
                  >
                    Close Notes
                  </button>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-mono text-white/50 block mb-1">
                    Client Initial Message:
                  </span>
                  <p className="text-sm text-white/80 p-3 bg-black/40 border border-white/10 rounded">
                    {selectedLead.message || "No initial message provided."}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono text-white/50 block mb-1">
                    Internal Sales / Strategy Notes:
                  </span>
                  <textarea
                    rows={3}
                    defaultValue={selectedLead.notes || ""}
                    onBlur={(e) => handleUpdateLeadNotes(selectedLead.id, e.target.value)}
                    placeholder="Enter confidential meeting notes, follow-up schedule, proposed budget..."
                    className="w-full bg-black/50 border border-white/20 rounded p-3 text-sm text-white outline-none focus:border-[#FFD400]"
                  />
                  <span className="text-[10px] font-mono text-white/40 mt-1 block">
                    * Notes auto-save when clicking outside the box.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === "projects" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-2">
                  // WORK & SHOWCASE CMS
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Portfolio Projects & Case Studies
                </h1>
                <p className="text-xs text-white/50 font-mono mt-1">
                  Manage ordering, archiving, full case studies, original high-res visuals, and all video formats.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingProject({
                    id: "proj-" + Date.now(),
                    slug: "new-case-study",
                    company_name_en: "",
                    company_name_ar: "",
                    title_en: "",
                    title_ar: "",
                    category_en: "Branding & Production",
                    category_ar: "الهوية والإنتاج",
                    tag_en: "Featured Case",
                    tag_ar: "مشروع مميز",
                    desc_en: "",
                    desc_ar: "",
                    year: "2026",
                    hero_image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=85",
                    hero_media_type: "image",
                    gallery: [],
                    video_url: "",
                    featured: true,
                    display_order: projects.length + 1,
                    active: true,
                    status: "published",
                    metrics: [
                      { val: "+200%", lbl_en: "Growth Metric", lbl_ar: "معدل النمو" }
                    ],
                    case_study: {
                      challenge_en: "",
                      challenge_ar: "",
                      strategy_en: "",
                      strategy_ar: "",
                      execution_en: "",
                      execution_ar: "",
                      results_en: "",
                      results_ar: ""
                    }
                  })
                }
                className="flex items-center gap-2 px-5 py-3 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <AdminSectionGuide
              badge="PROJECTS & WORK // معرض الأعمال والمشاريع"
              titleAr="التحكم الكامل في المشاريع ودراسات الحالة وترتيبها وأرشفتها"
              titleEn="Selected Work Portfolio, Reordering, Archiving & Case Studies"
              purposeAr="يتحكم في قسم الأعمال (Selected Work) بالصفحة الرئيسية وصفحات المشاريع المستقلة. يتيح ترتيب المشاريع رقمياً أو بالأسهم، وأرشفة أي مشروع بضغطة زر، وإضافة صور بأبعادها الأصلية الكاملة، وفيديوهات بجميع الصيغ (MP4, MOV, Vimeo, YouTube)."
              purposeEn="Controls the signature Selected Work section and dedicated case study pages. Supports numeric/arrow reordering, instant archiving, uncropped native images, and all video formats."
              impactAr="التعديلات تنعكس فوراً على قسم الأعمال في الصفحة الرئيسية وصفحات المشاريع (/projects/[slug])."
              impactEn="Updates appear immediately in the Selected Work grid on the homepage and dedicated client case study pages."
              tips={[
                { ar: "الترتيب المباشر: اكتب الرقم في خانة ORDER أو اضغط الأسهم ↑ / ↓ لتغيير ترتيب ظهور المشروع فوراً.", en: "Direct numeric reordering: edit the ORDER field or click ↑/↓ arrows to re-index." },
                { ar: "الأرشفة الذكية: زر Archive يخفي المشروع من الموقع مؤقتاً دون حذفه نهائياً.", en: "Smart archiving: Archive button hides a project from the public grid without deleting it." },
                { ar: "الصور بنسبتها الأصلية مع مشغل تكبير (Lightbox) وفيديوهات بكافة الصيغ MP4/MOV/Vimeo.", en: "Native uncropped visuals with high-res Lightbox and multi-format video embeds." }
              ]}
            />

            {/* Status Filter Tabs (Roadmap Section 07 & 20) */}
            <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-white/10">
              <button
                onClick={() => setProjectFilter("all")}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
                  projectFilter === "all"
                    ? "bg-[#FFD400] text-black border-[#FFD400] font-bold"
                    : "border-white/10 text-white/60 hover:text-white"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setProjectFilter("published")}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
                  projectFilter === "published"
                    ? "bg-[#FFD400] text-black border-[#FFD400] font-bold"
                    : "border-white/10 text-white/60 hover:text-white"
                }`}
              >
                Published ({projects.filter((p) => p.status === "published" || (!p.status && p.active)).length})
              </button>
              <button
                onClick={() => setProjectFilter("draft")}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
                  projectFilter === "draft"
                    ? "bg-[#FFD400] text-black border-[#FFD400] font-bold"
                    : "border-white/10 text-white/60 hover:text-white"
                }`}
              >
                Draft ({projects.filter((p) => p.status === "draft").length})
              </button>
              <button
                onClick={() => setProjectFilter("archived")}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
                  projectFilter === "archived"
                    ? "bg-[#FFD400] text-black border-[#FFD400] font-bold"
                    : "border-white/10 text-white/60 hover:text-white"
                }`}
              >
                Archived ({projects.filter((p) => p.status === "archived").length})
              </button>
            </div>

            {/* Filtered Projects Grid */}
            {(() => {
              const filteredList = projects.filter((p) => {
                if (projectFilter === "all") return true;
                if (projectFilter === "published") return p.status === "published" || (!p.status && p.active);
                if (projectFilter === "draft") return p.status === "draft";
                if (projectFilter === "archived") return p.status === "archived";
                return true;
              });

              if (filteredList.length === 0) {
                return (
                  <div className="p-16 border border-white/10 text-center bg-white/[0.02]">
                    <p className="font-mono text-sm text-white/50">
                      No projects found in &quot;{projectFilter}&quot; tab.
                    </p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {filteredList.map((p, idx) => {
                    const isArchived = p.status === "archived";
                    const isDraft = p.status === "draft";
                    const hasVideo = p.hero_media_type === "video" || Boolean(p.video_url);

                    return (
                      <div
                        key={p.id}
                        className={`border p-5 flex flex-col justify-between transition-colors ${
                          isArchived
                            ? "bg-white/[0.01] border-white/10 opacity-70"
                            : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        <div>
                          {/* Visual Preview Container */}
                          <div className="aspect-[16/10] bg-black/60 overflow-hidden mb-4 border border-white/10 relative group">
                            <img
                              src={p.hero_image}
                              alt={p.title_en}
                              className="w-full h-full object-cover"
                            />

                            {/* Status and Order Badges */}
                            <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                              <span className="text-[10px] font-mono px-2 py-0.5 bg-black/85 text-[#FFD400] border border-[#FFD400]/40">
                                #{p.display_order ?? idx + 1}
                              </span>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 uppercase rounded ${
                                  isArchived
                                    ? "bg-gray-800 text-gray-300"
                                    : isDraft
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                }`}
                              >
                                {p.status || (p.active ? "published" : "draft")}
                              </span>
                            </div>

                            {/* Video Indicator */}
                            {hasVideo && (
                              <span className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono bg-[#FFD400] text-black px-2 py-0.5 rounded font-bold">
                                <Film className="w-3 h-3" />
                                <span>VIDEO</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
                            <span>{p.company_name_en}</span>
                            <span>{p.year}</span>
                          </div>

                          <h3 className="font-heading font-bold text-lg text-white mb-2 leading-snug">
                            {p.title_en}
                          </h3>

                          <p className="text-xs text-white/60 line-clamp-2 mb-4">
                            {p.desc_en}
                          </p>
                        </div>

                        {/* Card Controls & Actions */}
                        <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                          {/* Order Change Controls */}
                          <div className="flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-white/40 text-[11px]">ORDER:</span>
                              <input
                                type="number"
                                defaultValue={p.display_order ?? idx + 1}
                                onBlur={(e) => handleChangeProjectOrder(p, Number(e.target.value))}
                                className="w-14 bg-black/60 border border-white/20 px-2 py-1 text-center text-xs text-white outline-none focus:border-[#FFD400]"
                                title="Type order number & click outside to save"
                              />
                            </div>

                            {/* Arrow Up/Down */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleMoveProject(idx, "up")}
                                disabled={idx === 0}
                                className="p-1 rounded text-white/50 hover:text-white disabled:opacity-20 border border-white/10"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleMoveProject(idx, "down")}
                                disabled={idx === projects.length - 1}
                                className="p-1 rounded text-white/50 hover:text-white disabled:opacity-20 border border-white/10"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Action Buttons: Archive, Edit, Preview, Delete */}
                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                            <button
                              onClick={() => handleToggleArchiveProject(p)}
                              className={`text-[11px] font-mono uppercase px-2.5 py-1 border transition-colors cursor-pointer ${
                                isArchived
                                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20"
                                  : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                              }`}
                              title={isArchived ? "Restore to active portfolio" : "Move to archive"}
                            >
                              {isArchived ? "Restore" : "Archive"}
                            </button>

                            <div className="flex items-center gap-1">
                              <Link
                                href={`/projects/${p.slug}`}
                                target="_blank"
                                className="p-2 text-white/50 hover:text-[#FFD400] transition-colors"
                                title="Preview Public Page"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => setEditingProject({ ...p })}
                                className="p-2 text-white/70 hover:text-[#FFD400] transition-colors cursor-pointer"
                                title="Edit Project & Case Study"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(p.id)}
                                className="p-2 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Project Edit / Creation Modal with Original Sizing & Video Support */}
            {editingProject && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md p-4 sm:p-10 flex justify-center">
                <div className="max-w-4xl w-full bg-[#121212] border border-white/20 p-6 sm:p-10 my-auto shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-8">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFD400] block">
                        PROJECT EDITOR
                      </span>
                      <h2 className="font-heading font-black text-2xl text-white">
                        {editingProject.id ? `Edit: ${editingProject.company_name_en || "Project"}` : "Create New Project"}
                      </h2>
                    </div>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="text-white/60 hover:text-white font-mono text-xs px-3 py-1.5 border border-white/20 rounded cursor-pointer"
                    >
                      Close [ESC]
                    </button>
                  </div>

                  {/* Core Meta Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                        Client Name (English) *
                      </label>
                      <input
                        type="text"
                        value={editingProject.company_name_en || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            company_name_en: e.target.value
                          })
                        }
                        className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white outline-none focus:border-[#FFD400]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                        Client Name (Arabic)
                      </label>
                      <input
                        type="text"
                        value={editingProject.company_name_ar || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            company_name_ar: e.target.value
                          })
                        }
                        className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white outline-none focus:border-[#FFD400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                        Project Headline (English) *
                      </label>
                      <input
                        type="text"
                        value={editingProject.title_en || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            title_en: e.target.value
                          })
                        }
                        className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white outline-none focus:border-[#FFD400]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                        Project Headline (Arabic)
                      </label>
                      <input
                        type="text"
                        value={editingProject.title_ar || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            title_ar: e.target.value
                          })
                        }
                        className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white outline-none focus:border-[#FFD400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                        Category (EN)
                      </label>
                      <input
                        type="text"
                        value={editingProject.category_en || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            category_en: e.target.value
                          })
                        }
                        className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        value={editingProject.year || "2026"}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            year: e.target.value
                          })
                        }
                        className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={editingProject.display_order ?? 1}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            display_order: Number(e.target.value)
                          })
                        }
                        className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                        Publish Status
                      </label>
                      <select
                        value={editingProject.status || (editingProject.active ? "published" : "draft")}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            status: e.target.value as "published" | "draft" | "archived",
                            active: e.target.value === "published"
                          })
                        }
                        className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-xs text-white outline-none"
                      >
                        <option value="published" className="bg-black text-white">Published</option>
                        <option value="draft" className="bg-black text-white">Draft</option>
                        <option value="archived" className="bg-black text-white">Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Visual & Universal Video Support */}
                  <div className="border-t border-white/10 pt-6 mb-6">
                    <h3 className="font-heading font-bold text-sm text-[#FFD400] uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Film className="w-4 h-4" />
                      <span>Showcase Media (Original Dimensions & Universal Video)</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                          Showcase Media Type
                        </label>
                        <select
                          value={editingProject.hero_media_type || "image"}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              hero_media_type: e.target.value as "image" | "video"
                            })
                          }
                          className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-xs text-white"
                        >
                          <option value="image" className="bg-black text-white">High-Res Image (Original Ratio)</option>
                          <option value="video" className="bg-black text-white">Cinema Video (All Formats / Reel)</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                          Hero Image URL (or Video Poster)
                        </label>
                        <input
                          type="text"
                          value={editingProject.hero_image || ""}
                          placeholder="https://... image link"
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              hero_image: e.target.value
                            })
                          }
                          className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                        Video URL (MP4, WebM, OGG, MOV, or Vimeo/YouTube Embed)
                      </label>
                      <input
                        type="text"
                        value={editingProject.video_url || ""}
                        placeholder="https://your-domain.com/video.mp4 or YouTube / Vimeo link"
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            video_url: e.target.value
                          })
                        }
                        className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-xs text-white"
                      />
                      <span className="text-[10px] font-mono text-white/40 block mt-1">
                        * Supports all formats: .mp4, .webm, .ogg, .mov direct files as well as YouTube &amp; Vimeo embeds.
                      </span>
                    </div>

                    {/* Live Preview Box */}
                    {editingProject.hero_image && (
                      <div className="mt-4 p-3 bg-black/60 border border-white/10 rounded flex items-center gap-4">
                        <img
                          src={editingProject.hero_image}
                          alt="Preview"
                          className="h-16 w-24 object-contain bg-black border border-white/10"
                        />
                        <div className="text-xs font-mono text-white/60">
                          <span className="text-white block font-bold">Image Preview (Preserves Original Ratio)</span>
                          <span>Clicking on the site opens original dimensions without crop.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gallery Assets Manager (Original Dimensions & Videos) */}
                  <div className="border-t border-white/10 pt-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading font-bold text-sm text-[#FFD400] uppercase tracking-wider">
                        Project Production Gallery ({editingProject.gallery?.length || 0} Assets)
                      </h3>
                      <span className="text-[11px] font-mono text-white/40">
                        Supports high-res images &amp; all video formats
                      </span>
                    </div>

                    {/* Add to Gallery Box */}
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        placeholder="Paste image or video URL (.mp4, .webm, .mov, etc.)"
                        value={newGalleryInput}
                        onChange={(e) => setNewGalleryInput(e.target.value)}
                        className="flex-1 bg-white/[0.04] border border-white/20 p-2 text-xs text-white outline-none focus:border-[#FFD400]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newGalleryInput.trim()) return;
                          const currentGallery = editingProject.gallery || [];
                          setEditingProject({
                            ...editingProject,
                            gallery: [...currentGallery, newGalleryInput.trim()]
                          });
                          setNewGalleryInput("");
                        }}
                        className="px-4 py-2 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase hover:bg-white transition-colors cursor-pointer"
                      >
                        + Add Asset
                      </button>
                    </div>

                    {/* Gallery Items Grid */}
                    {editingProject.gallery && editingProject.gallery.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-56 overflow-y-auto p-2 bg-black/40 border border-white/10">
                        {editingProject.gallery.map((assetUrl, gIdx) => (
                          <div key={gIdx} className="relative group bg-[#161616] border border-white/10 p-1 rounded">
                            {/\.(mp4|webm|ogg|mov)($|\?)/i.test(assetUrl) ? (
                              <div className="aspect-video bg-black flex items-center justify-center text-[10px] font-mono text-[#FFD400]">
                                <Film className="w-5 h-5 mb-1" />
                              </div>
                            ) : (
                              <img
                                src={assetUrl}
                                alt="Gallery item"
                                className="w-full h-20 object-contain bg-black"
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const updatedGallery = (editingProject.gallery || []).filter((_, i) => i !== gIdx);
                                setEditingProject({ ...editingProject, gallery: updatedGallery });
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove item"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs font-mono text-white/40 italic p-3 bg-black/20 border border-white/5">
                        No additional gallery assets yet. Add URLs above to build a multi-asset case study.
                      </p>
                    )}
                  </div>

                  {/* Case Study Details Editor */}
                  <div className="border-t border-white/10 pt-6 mb-6">
                    <h3 className="font-heading font-bold text-sm text-[#FFD400] uppercase tracking-wider mb-4">
                      Case Study Breakdown Narrative
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-white/40 mb-1">
                          The Challenge (EN)
                        </label>
                        <textarea
                          rows={2}
                          value={editingProject.case_study?.challenge_en || ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              case_study: {
                                ...editingProject.case_study!,
                                challenge_en: e.target.value
                              }
                            })
                          }
                          className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-white/40 mb-1">
                          The Challenge (AR)
                        </label>
                        <textarea
                          rows={2}
                          value={editingProject.case_study?.challenge_ar || ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              case_study: {
                                ...editingProject.case_study!,
                                challenge_ar: e.target.value
                              }
                            })
                          }
                          className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-white/40 mb-1">
                          The Strategy (EN)
                        </label>
                        <textarea
                          rows={2}
                          value={editingProject.case_study?.strategy_en || ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              case_study: {
                                ...editingProject.case_study!,
                                strategy_en: e.target.value
                              }
                            })
                          }
                          className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-white/40 mb-1">
                          The Strategy (AR)
                        </label>
                        <textarea
                          rows={2}
                          value={editingProject.case_study?.strategy_ar || ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              case_study: {
                                ...editingProject.case_study!,
                                strategy_ar: e.target.value
                              }
                            })
                          }
                          className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-white/40 mb-1">
                          The Results (EN)
                        </label>
                        <textarea
                          rows={2}
                          value={editingProject.case_study?.results_en || ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              case_study: {
                                ...editingProject.case_study!,
                                results_en: e.target.value
                              }
                            })
                          }
                          className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-white/40 mb-1">
                          The Results (AR)
                        </label>
                        <textarea
                          rows={2}
                          value={editingProject.case_study?.results_ar || ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              case_study: {
                                ...editingProject.case_study!,
                                results_ar: e.target.value
                              }
                            })
                          }
                          className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-6 py-3 border border-white/20 text-white font-mono text-xs uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProject}
                      className="px-8 py-3 bg-[#FFD400] text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:bg-white cursor-pointer transition-colors"
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MEDIA LIBRARY (Roadmap Section 20) */}
        {activeTab === "media_library" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-2">
                  // ASSET REPOSITORY (ROADMAP SECTION 20)
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Media Library & Design Files
                </h1>
              </div>
            </div>

            <AdminSectionGuide
              badge="MEDIA LIBRARY // مكتبة الوسائط"
              titleAr="مكتبة الأصول البصرية والوسائط الرقمية المركزية"
              titleEn="Centralized Digital Asset Management & CDN Library"
              purposeAr="مستودع مركزي لتسجيل وحفظ روابط الصور عالية الدقة، فيديوهات الحملات، لوجوهات العملاء، والتصاميم الفنية لاستخدامها في أي مكان بالموقع."
              purposeEn="Central hub for organizing high-resolution visuals, campaign video reels, client brand marks, and artworks for seamless site-wide reuse."
              impactAr="تمنحك وصولاً سريعاً لنسخ روابط الميديا واستخدامها فوراً في المشاريع أو الهيرو أو الخدمات."
              impactEn="Provides one-click URL copying to populate project showcases, hero slides, and service backgrounds."
              tips={[
                { ar: "اضغط على Copy URL لنسخ الرابط المباشر لأي صورة أو فيديو بنقرة واحدة.", en: "Click 'Copy URL' to instantly copy asset link to your clipboard." },
                { ar: "تسجيل الأصول الجديدة من صندوق Register New Media Asset بالأعلى.", en: "Register new CDN or hosted assets using the quick register box above." },
                { ar: "تنظيم الوسائط يضمن سرعة وسهولة بناء دراسات الحالة ومحتوى الوكالة.", en: "Keeps brand assets structured and ready for future portfolio expansions." }
              ]}
            />

            {/* Quick Add URL Box */}
            <div className="p-6 bg-white/[0.02] border border-white/[0.08] mb-10">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/60 mb-4">
                Register New Media Asset / CDN URL
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <input
                  type="text"
                  placeholder="Asset Name (e.g. Sultan Al Mandy Brand Logo)"
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  className="sm:col-span-4 bg-black/50 border border-white/20 p-2.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Media URL (Image, Video, Poster)"
                  value={newAssetUrl}
                  onChange={(e) => setNewAssetUrl(e.target.value)}
                  className="sm:col-span-6 bg-black/50 border border-white/20 p-2.5 text-xs text-white"
                />
                <button
                  onClick={handleAddMediaAsset}
                  className="sm:col-span-2 px-4 py-2.5 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase hover:bg-white"
                >
                  Add Asset
                </button>
              </div>
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaAssets.map((asset) => (
                <div key={asset.id} className="p-4 bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between group">
                  <div className="aspect-[16/10] bg-black/60 border border-white/10 overflow-hidden mb-3 relative">
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 left-2 text-[10px] font-mono uppercase px-2 py-0.5 bg-black/80 text-[#FFD400]">
                      {asset.type}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-white truncate mb-1">{asset.name}</h4>
                    <span className="text-[11px] font-mono text-white/40 block mb-3">{asset.size} • {asset.uploadedAt}</span>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => copyToClipboard(asset.url, asset.id)}
                      className="flex items-center gap-1.5 text-[11px] font-mono text-[#FFD400] hover:underline"
                    >
                      {copiedId === asset.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === asset.id ? "Copied" : "Copy URL"}</span>
                    </button>
                    <button
                      onClick={() => setMediaAssets(mediaAssets.filter((a) => a.id !== asset.id))}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Remove from Library"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: HERO MEDIA SEQUENCER */}
        {activeTab === "hero_media" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-2">
                  // HERO REEL & SEQUENCER (ROADMAP SECTION 04)
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Dynamic Cinematic Media Sequence
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setHeroMedia([
                      ...heroMedia,
                      {
                        id: "hm-" + Date.now(),
                        title_en: "New Commercial Reel",
                        title_ar: "مقطع فيديو إعلاني جديد",
                        type: "image",
                        url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=85",
                        display_order: heroMedia.length + 1,
                        duration_seconds: 6,
                        active: true
                      }
                    ])
                  }
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.05] border border-white/20 text-white text-xs font-mono uppercase hover:border-[#FFD400] hover:text-[#FFD400]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Reel Slide</span>
                </button>
                <button
                  onClick={handleSaveHeroMedia}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase hover:bg-white"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Sequence</span>
                </button>
              </div>
            </div>

            <AdminSectionGuide
              badge="HERO REEL // شريط الهيرو السينمائي"
              titleAr="التحكم في شريط العرض السينمائي في واجهة الموقع الأولى"
              titleEn="Dynamic Full-Screen Cinematic Media Sequencer (Roadmap Section 04)"
              purposeAr="يتحكم في خلفية شاشة الهيرو السينمائية التي يراها الزائر فور انتهاء شاشة الإنترو. يتيح إضافة شرائح فيديو أو صور متحركة، تحديد مدة عرض كل شريحة بالثواني، وتفعيل أو إيقاف أي شريحة."
              purposeEn="Manages the full-screen dynamic reel displayed behind the Hero section. Set slide durations, add video/image backgrounds, and toggle slide visibility."
              impactAr="يتحكم في أول انطباع بصري يتلقاه العميل بعد دخول الموقع مباشرة ويعكس هوية الوكالة الفاخرة."
              impactEn="Directly controls the hero backdrop visible in the first 3 seconds of user entry."
              tips={[
                { ar: "تحديد مدة العرض (Duration in Seconds) لكل شريحة بشكل مستقل.", en: "Configure duration in seconds per slide for tailored pacing." },
                { ar: "تفعيل (Active) أو تعطيل أي شريحة بنقرة زر لحفظها دون حذفها.", en: "Toggle the Active switch to temporarily disable a slide without deleting it." },
                { ar: "احرص على الضغط على 'Save Sequence' لحفظ التعديلات.", en: "Always click 'Save Sequence' after modifying reel items." }
              ]}
            />

            <div className="divide-y divide-white/[0.08] bg-white/[0.02] border border-white/[0.08]">
              {heroMedia.map((hm, idx) => (
                <div key={hm.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-[#FFD400] font-bold">
                      0{idx + 1}
                    </span>
                    <div className="w-24 h-16 bg-black/60 border border-white/10 overflow-hidden">
                      <img src={hm.url} alt={hm.title_en} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={hm.title_en}
                        onChange={(e) => {
                          const updated = [...heroMedia];
                          updated[idx].title_en = e.target.value;
                          setHeroMedia(updated);
                        }}
                        placeholder="Reel Title (EN)"
                        className="bg-transparent border-b border-white/20 text-sm text-white font-heading font-bold mb-1 w-full outline-none focus:border-[#FFD400]"
                      />
                      <input
                        type="text"
                        value={hm.url}
                        onChange={(e) => {
                          const updated = [...heroMedia];
                          updated[idx].url = e.target.value;
                          setHeroMedia(updated);
                        }}
                        placeholder="Image or Video URL"
                        className="bg-transparent text-xs text-white/50 font-mono w-full outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/50">Duration:</span>
                      <input
                        type="number"
                        value={hm.duration_seconds}
                        onChange={(e) => {
                          const updated = [...heroMedia];
                          updated[idx].duration_seconds = Number(e.target.value);
                          setHeroMedia(updated);
                        }}
                        className="w-16 bg-black/50 border border-white/20 p-1 text-xs text-white text-center"
                      />
                      <span className="text-xs font-mono text-white/40">sec</span>
                    </div>

                    <button
                      onClick={() => setHeroMedia(heroMedia.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 p-2"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SERVICES CMS */}
        {activeTab === "services" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-2">
                  // INTEGRATED DISCIPLINES (ROADMAP SECTION 10)
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Agency Services & Disciplines
                </h1>
              </div>
            </div>

            <AdminSectionGuide
              badge="SERVICES CMS // خدمات الوكالة الثمانية"
              titleAr="إدارة خدمات الوكالة المتكاملة والشارات والوصف"
              titleEn="Agency Disciplines & Capabilities (Roadmap Section 10)"
              purposeAr="يتحكم في قسم الخدمات الثمانية المتكاملة في الصفحة الرئيسية (Strategy, Branding, Social, Production, Media Buying, PR, Web Development, Events) مع النصوص والشارات باللغتين العربية والإنجليزية."
              purposeEn="Controls the 8 core integrated agency disciplines on the homepage, including bilingual titles, descriptions, and interactive hover visuals."
              impactAr="تظهر مباشرة في قسم الخدمات بالصفحة الرئيسية مع تفاعل الـ Push-In الكاميري السينمائي الفاخر عند تمرير الماوس."
              impactEn="Appears in Section 10 on the homepage with cinematic camera push-in hover interactions."
              tips={[
                { ar: "وفقاً للـ Roadmap، لا توجد صفحات مستقلة للخدمات بل تفاعل داخل الصفحة الرئيسية للحفاظ على تدفق التصفح.", en: "Following the roadmap, services live on the homepage without distracting sub-pages." },
                { ar: "اكتب وصفاً جذاباً وموجزاً يبرز قوة وخبرة الوكالة في هذا التخصص.", en: "Keep descriptions punchy, editorial, and client-centric in both EN and AR." },
                { ar: "اضغط على زر Edit بجانب أي خدمة لتعديل نصوصها وحفظها فورياً.", en: "Click Edit on any card to update bilingual copy with instant live updates." }
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="p-6 bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase text-[#FFD400] px-2 py-0.5 border border-[#FFD400]/30">
                        {srv.badge_en}
                      </span>
                      <span className="text-xs font-mono text-white/40">#{srv.display_order}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white mb-1">{srv.name_en}</h3>
                    <h4 className="font-sans text-xs text-white/60 mb-3">{srv.name_ar}</h4>
                    <p className="text-xs text-white/60 line-clamp-3 mb-6 font-light">{srv.desc_en}</p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400">● Active</span>
                    <button
                      onClick={() => setEditingService(srv)}
                      className="text-xs font-mono uppercase tracking-wider text-[#FFD400] hover:underline"
                    >
                      Edit Description →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Edit Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-8 flex justify-center items-center">
                <div className="max-w-2xl w-full bg-[#121212] border border-white/20 p-8">
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                    <h3 className="font-heading font-bold text-xl text-white">Edit Service</h3>
                    <button onClick={() => setEditingService(null)} className="text-white/50 hover:text-white">Close</button>
                  </div>

                  <div className="flex flex-col gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">Name (EN)</label>
                      <input
                        type="text"
                        value={editingService.name_en}
                        onChange={(e) => setEditingService({ ...editingService, name_en: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/20 p-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">Name (AR)</label>
                      <input
                        type="text"
                        value={editingService.name_ar}
                        onChange={(e) => setEditingService({ ...editingService, name_ar: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/20 p-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">Description (EN)</label>
                      <textarea
                        rows={3}
                        value={editingService.desc_en}
                        onChange={(e) => setEditingService({ ...editingService, desc_en: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/50 mb-1">Description (AR)</label>
                      <textarea
                        rows={3}
                        value={editingService.desc_ar}
                        onChange={(e) => setEditingService({ ...editingService, desc_ar: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button onClick={() => setEditingService(null)} className="px-5 py-2.5 border border-white/20 text-xs font-mono">Cancel</button>
                    <button onClick={handleSaveService} className="px-6 py-2.5 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase">Save Changes</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: CONTENT */}
        {activeTab === "content" && settings && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-2">
                  // CONTENT MANAGEMENT
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Headlines, Story & Stats
                </h1>
              </div>

              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-6 py-3 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>

            <AdminSectionGuide
              badge="CONTENT CMS // نصوص ومحتوى الموقع"
              titleAr="إدارة نصوص وعناوين كافة أقسام الموقع العام"
              titleEn="Headlines, Agency Story, Vision/Mission & Numerical Stats (Roadmap Section 19 & 20)"
              purposeAr="المركز الشامل لتحرير كافة النصوص والعناوين والرسائل الترويجية وإحصائيات الوكالة في الصفحة الرئيسية باللغتين الإنجليزية والعربية دون الحاجة للرجوع لمطور برمجيات."
              purposeEn="Central editorial suite controlling all public headlines, brand positioning statements, editorial vision/mission copy, and live numerical statistics."
              impactAr="أي تغيير تحفظه هنا ينعكس فوراً ومباشرة على الموقع الحي للزوار في نسختي العربية والإنجليزية."
              impactEn="Changes are instantly pushed to the production homepage for both English and Arabic audiences."
              tips={[
                { ar: "إدخال النصوص باللغتين (EN & AR) دائماً للحفاظ على توازن الموقع في اللغتين.", en: "Always populate both EN and AR fields for complete bilingual parity." },
                { ar: "تعديل أرقام الإحصائيات (Stats) بالأرقام الحقيقية المحدثة للوكالة.", en: "Update live stats counters with verified client milestones and metrics." },
                { ar: "اضغط على 'Save All Changes' بالأعلى لحفظ جميع التعديلات دفعة واحدة.", en: "Click 'Save All Changes' button at the top to commit all sections together." }
              ]}
            />

            <div className="flex flex-col gap-10">
              {/* Hero Section Copy */}
              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-xl text-white">
                    Hero Section Text
                  </h3>
                  <span className="text-[10px] font-mono text-[#FFD400] uppercase px-2 py-0.5 bg-[#FFD400]/10 border border-[#FFD400]/20 rounded">
                    Roadmap Section 04
                  </span>
                </div>
                <div className="mb-6 p-3.5 bg-black/40 border-l-2 border-[#FFD400] text-xs">
                  <span className="font-bold text-[#FFD400] block mb-0.5">// ماذا يفعل هذا الجزء؟</span>
                  <span className="text-white/80">يحدد العنوان العريض (Hero Headline) والشعار المصاحب (Hero Subheadline) اللذين يظهران في واجهة الموقع الأولى فور انتهاء شاشة الإنترو فوق الميديا السينمائية مباشرة.</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Hero Headline (English)
                    </label>
                    <input
                      type="text"
                      value={settings.hero_headline_en}
                      onChange={(e) =>
                        setSettings({ ...settings, hero_headline_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Hero Headline (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.hero_headline_ar}
                      onChange={(e) =>
                        setSettings({ ...settings, hero_headline_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Hero Subheadline (English)
                    </label>
                    <input
                      type="text"
                      value={settings.hero_subheadline_en}
                      onChange={(e) =>
                        setSettings({ ...settings, hero_subheadline_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Hero Subheadline (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.hero_subheadline_ar}
                      onChange={(e) =>
                        setSettings({ ...settings, hero_subheadline_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Who We Are Section Copy */}
              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-xl text-white">
                    Who We Are & Agency Story
                  </h3>
                  <span className="text-[10px] font-mono text-[#FFD400] uppercase px-2 py-0.5 bg-[#FFD400]/10 border border-[#FFD400]/20 rounded">
                    Roadmap Section 06
                  </span>
                </div>
                <div className="mb-6 p-3.5 bg-black/40 border-l-2 border-[#FFD400] text-xs">
                  <span className="font-bold text-[#FFD400] block mb-0.5">// ماذا يفعل هذا الجزء؟</span>
                  <span className="text-white/80">قسم (01 — WHO WE ARE): يتحكم في عنوان وقصة وهوية الوكالة ونظام التقسيم المتوازن 50/50 للرؤية والرسالة باللغتين الإنجليزية والعربية.</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      About Headline (English)
                    </label>
                    <input
                      type="text"
                      value={settings.about_headline_en}
                      onChange={(e) =>
                        setSettings({ ...settings, about_headline_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      About Headline (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.about_headline_ar}
                      onChange={(e) =>
                        setSettings({ ...settings, about_headline_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      About Description (English)
                    </label>
                    <textarea
                      rows={3}
                      value={settings.about_desc_en}
                      onChange={(e) =>
                        setSettings({ ...settings, about_desc_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      About Description (Arabic)
                    </label>
                    <textarea
                      rows={3}
                      value={settings.about_desc_ar}
                      onChange={(e) =>
                        setSettings({ ...settings, about_desc_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-xl text-white">
                    Live Stats Counters
                  </h3>
                  <span className="text-[10px] font-mono text-[#FFD400] uppercase px-2 py-0.5 bg-[#FFD400]/10 border border-[#FFD400]/20 rounded">
                    Roadmap Section 06
                  </span>
                </div>
                <div className="mb-6 p-3.5 bg-black/40 border-l-2 border-[#FFD400] text-xs">
                  <span className="font-bold text-[#FFD400] block mb-0.5">// ماذا يفعل هذا الجزء؟</span>
                  <span className="text-white/80">عدادات الأرقام والإحصائيات الحية داخل قسم من نحن (سنة التأسيس 2011، عدد المشاريع +1000، سنوات الخبرة +16) وتظهر كأرقام تفاعلية تنبض بالحيوية.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((s, idx) => (
                    <div key={s.id} className="p-4 bg-black/40 border border-white/10">
                      <label className="block text-[11px] font-mono uppercase text-white/40 mb-1">
                        Stat #{idx + 1} Value
                      </label>
                      <input
                        type="text"
                        value={s.val}
                        onChange={(e) => {
                          const updated = [...stats];
                          updated[idx].val = e.target.value;
                          setStats(updated);
                        }}
                        className="w-full bg-white/[0.04] border border-white/20 p-2 text-sm text-white font-heading font-bold mb-3"
                      />
                      <label className="block text-[11px] font-mono uppercase text-white/40 mb-1">
                        Label (EN)
                      </label>
                      <input
                        type="text"
                        value={s.lbl_en}
                        onChange={(e) => {
                          const updated = [...stats];
                          updated[idx].lbl_en = e.target.value;
                          setStats(updated);
                        }}
                        className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white mb-2"
                      />
                      <label className="block text-[11px] font-mono uppercase text-white/40 mb-1">
                        Label (AR)
                      </label>
                      <input
                        type="text"
                        value={s.lbl_ar}
                        onChange={(e) => {
                          const updated = [...stats];
                          updated[idx].lbl_ar = e.target.value;
                          setStats(updated);
                        }}
                        className="w-full bg-white/[0.04] border border-white/20 p-2 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Work Section Copy */}
              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-xl text-white">
                    Selected Work Section Text
                  </h3>
                  <span className="text-[10px] font-mono text-[#FFD400] uppercase px-2 py-0.5 bg-[#FFD400]/10 border border-[#FFD400]/20 rounded">
                    Roadmap Section 07
                  </span>
                </div>
                <div className="mb-6 p-3.5 bg-black/40 border-l-2 border-[#FFD400] text-xs">
                  <span className="font-bold text-[#FFD400] block mb-0.5">// ماذا يفعل هذا الجزء؟</span>
                  <span className="text-white/80">قسم (02 — SELECTED WORK): يتحكم في الشارة الرقمية والعنوان العريض لقسم معرض الأعمال الذي يعرض مشاريع الوكالة السينمائية في الصفحة الرئيسية.</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Section Badge (English)
                    </label>
                    <input
                      type="text"
                      value={settings.work_badge_en || ""}
                      placeholder="02 — SELECTED WORK"
                      onChange={(e) =>
                        setSettings({ ...settings, work_badge_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Section Badge (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.work_badge_ar || ""}
                      placeholder="02 — أعمال مختارة"
                      onChange={(e) =>
                        setSettings({ ...settings, work_badge_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Headline (English)
                    </label>
                    <input
                      type="text"
                      value={settings.work_headline_en || ""}
                      placeholder="CRAFTED FOR ICONIC BRANDS."
                      onChange={(e) =>
                        setSettings({ ...settings, work_headline_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Headline (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.work_headline_ar || ""}
                      placeholder="صُنعت خصيصاً لعلامات تصنع الفارق."
                      onChange={(e) =>
                        setSettings({ ...settings, work_headline_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Services Section Copy */}
              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-xl text-white">
                    Services Section Text
                  </h3>
                  <span className="text-[10px] font-mono text-[#FFD400] uppercase px-2 py-0.5 bg-[#FFD400]/10 border border-[#FFD400]/20 rounded">
                    Roadmap Section 10
                  </span>
                </div>
                <div className="mb-6 p-3.5 bg-black/40 border-l-2 border-[#FFD400] text-xs">
                  <span className="font-bold text-[#FFD400] block mb-0.5">// ماذا يفعل هذا الجزء؟</span>
                  <span className="text-white/80">قسم (03 — DISCIPLINES & SERVICES): يتحكم في شارة وعنوان ونبذة تقديم خدمات الوكالة الثمانية المتكاملة باللغتين العربية والإنجليزية.</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Section Badge (English)
                    </label>
                    <input
                      type="text"
                      value={settings.services_badge_en || ""}
                      placeholder="03 — DISCIPLINES & SERVICES"
                      onChange={(e) =>
                        setSettings({ ...settings, services_badge_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Section Badge (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.services_badge_ar || ""}
                      placeholder="03 — خدمات الوكالة المتكاملة"
                      onChange={(e) =>
                        setSettings({ ...settings, services_badge_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Headline (English)
                    </label>
                    <input
                      type="text"
                      value={settings.services_headline_en || ""}
                      placeholder="EVERYTHING YOUR BRAND NEEDS TO SCALE."
                      onChange={(e) =>
                        setSettings({ ...settings, services_headline_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Headline (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.services_headline_ar || ""}
                      placeholder="كل ما تحتاجه علامتك للريادة والنمو."
                      onChange={(e) =>
                        setSettings({ ...settings, services_headline_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Subheadline (English)
                    </label>
                    <input
                      type="text"
                      value={settings.services_subheadline_en || ""}
                      placeholder="Eight integrated disciplines. One cohesive partner."
                      onChange={(e) =>
                        setSettings({ ...settings, services_subheadline_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Subheadline (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.services_subheadline_ar || ""}
                      placeholder="ثمانية قطاعات إبداعية متكاملة تحت سقف واحد."
                      onChange={(e) =>
                        setSettings({ ...settings, services_subheadline_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Final CTA Section Copy */}
              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-xl text-white">
                    Final CTA & Form Invitation Text
                  </h3>
                  <span className="text-[10px] font-mono text-[#FFD400] uppercase px-2 py-0.5 bg-[#FFD400]/10 border border-[#FFD400]/20 rounded">
                    Roadmap Section 11
                  </span>
                </div>
                <div className="mb-6 p-3.5 bg-black/40 border-l-2 border-[#FFD400] text-xs">
                  <span className="font-bold text-[#FFD400] block mb-0.5">// ماذا يفعل هذا الجزء؟</span>
                  <span className="text-white/80">قسم (04 — FINAL CTA & PROJECT FORM): يتحكم في نصوص الدعوة للتواصل وطلب المشاريع (LET’S BUILD SOMETHING GREAT) والزر الذي يفتح فورم طلب المشروع المنبثق بكامل الشاشة.</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Badge (English)
                    </label>
                    <input
                      type="text"
                      value={settings.cta_badge_en || ""}
                      placeholder="04 — NEXT STEPS"
                      onChange={(e) =>
                        setSettings({ ...settings, cta_badge_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Badge (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.cta_badge_ar || ""}
                      placeholder="04 — الخطوة القادمة"
                      onChange={(e) =>
                        setSettings({ ...settings, cta_badge_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Headline (English)
                    </label>
                    <input
                      type="text"
                      value={settings.cta_headline_en || ""}
                      placeholder="LET’S BUILD SOMETHING GREAT."
                      onChange={(e) =>
                        setSettings({ ...settings, cta_headline_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Headline (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.cta_headline_ar || ""}
                      placeholder="دعنا نبني شيئاً استثنائياً معاً."
                      onChange={(e) =>
                        setSettings({ ...settings, cta_headline_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Subheadline (English)
                    </label>
                    <input
                      type="text"
                      value={settings.cta_subheadline_en || ""}
                      placeholder="Have a project in mind? Tell us what you’re building."
                      onChange={(e) =>
                        setSettings({ ...settings, cta_subheadline_en: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Subheadline (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.cta_subheadline_ar || ""}
                      placeholder="هل لديك مشروع في بالك؟ أخبرنا بما ترغب في بنائه."
                      onChange={(e) =>
                        setSettings({ ...settings, cta_subheadline_ar: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: TEAM & ROLES (Roadmap Section 20) */}
        {activeTab === "users" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-2">
                  // ACCESS CONTROL & ROLES (ROADMAP SECTION 20)
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Team Members & Permissions
                </h1>
              </div>
            </div>

            <AdminSectionGuide
              badge="TEAM & ROLES // الصلاحيات وفريق العمل"
              titleAr="إدارة صلاحيات فريق العمل وأدوار لوحة التحكم"
              titleEn="Team Members, Roles & Permissions Scope (Roadmap Section 20)"
              purposeAr="تطبيق نظام الصلاحيات المتقدم (RBAC) لحماية نظام التصميم والموقع؛ تحديد ما يمكن لكل عضو في الوكالة رؤيته أو تعديله (المدير العام، محرر المحتوى، ومختص المبيعات)."
              purposeEn="Enforces Role-Based Access Control to safeguard the design system and restrict sensitive controls across agency team members."
              impactAr="يتحكم في إمكانية الوصول والتعديل داخل لوحة التحكم لضمان عدم حدوث تعديلات غير مصرح بها في الكود أو الإعدادات أو المحتوى الحساس."
              impactEn="Secures the CMS so editors cannot break the visual system or accidentally overwrite production settings."
              tips={[
                { ar: "Owner / Super Admin: صلاحيات كاملة ومطلقة على كافة عناصر الموقع والمحتوى والإعدادات والأكواد.", en: "Owner / Super Admin: Unrestricted access across content, projects, leads, and settings." },
                { ar: "Content Editor: صلاحية مخصصة لإدارة وتحديث المشاريع ودراسات الحالة ومكتبة الميديا دون تغيير إعدادات السيو أو الكود.", en: "Content Editor: Dedicated rights to publish case studies and media without touching code." },
                { ar: "Leads Specialist: صلاحية حصرية لمتابعة استفسارات العملاء والمبيعات فقط دون التعديل على محتوى الموقع.", en: "Leads Specialist: Restricted to inbound leads CRM and deal tracking." }
              ]}
            />

            <div className="bg-white/[0.02] border border-white/[0.08] overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-white/[0.04] text-white/60 font-mono uppercase border-b border-white/[0.08]">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Assigned Role</th>
                    <th className="p-4">Permissions Scope</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {teamUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02]">
                      <td className="p-4">
                        <span className="font-heading font-bold text-white block text-sm">{u.name}</span>
                        <span className="text-white/40 font-mono text-[11px]">{u.email}</span>
                      </td>
                      <td className="p-4 font-mono text-[#FFD400]">{u.role}</td>
                      <td className="p-4 text-white/60">
                        {u.role === "Owner / Super Admin"
                          ? "Full Unrestricted Access (Content, Projects, Leads, Settings, Code Protection)"
                          : u.role === "Content Editor"
                          ? "Can Edit Projects, Case Studies, and Media Library"
                          : "Can Only View and Manage Inbound Leads"}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400">
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 9: SETTINGS & SEO */}
        {activeTab === "settings" && settings && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-2">
                  // GENERAL SETTINGS & TECHNICAL SEO
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Contact, WhatsApp & SEO Meta
                </h1>
              </div>

              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-6 py-3 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>

            <AdminSectionGuide
              badge="SITE & SEO // إعدادات الموقع والـ SEO"
              titleAr="قنوات الاتصال الرسمية، زر الواتساب العائم، وإعدادات محركات البحث"
              titleEn="Agency Contact Channels, WhatsApp Integration & Technical SEO Meta"
              purposeAr="يتحكم في بيانات الوكالة الرسمية (العنوان بمقر Mall of Arabia, Greek Campus، الهاتف، البريد)، ورقم الواتساب المربوط بالزر العائم والرسالة التلقائية، وعناصر السيو (SEO Meta Tags) لتصدر نتائج بحث Google."
              purposeEn="Manages official agency contacts (Mall of Arabia, Greek Campus), the persistent floating WhatsApp trigger with prefilled messages, and Google indexing metadata."
              impactAr="التعديل هنا يغير فوراً أين تذهب رسائل واتساب الزوار، وتفاصيل الفوتر، وكيف تظهر صفحة الموقع في نتائج بحث Google وعند مشاركة الرابط على مواقع التواصل."
              impactEn="Instantly modifies footer contacts, WhatsApp routing, and search engine snippets across social share cards."
              tips={[
                { ar: "رقم الواتساب: ادخله بالأرقام فقط متضمناً كود الدولة (مثال: 201000000000) ليعمل الزر العائم في كامل الموقع.", en: "WhatsApp Number: Use international digits format (e.g. 2010...) for the floating button." },
                { ar: "الرسالة المجهزة مسبقاً (Prefilled Message): النص التلقائي الذي يظهر للعميل في شات واتساب فور الضغط على الزر.", en: "Prefilled Message: Automated starter text when a visitor clicks WhatsApp on the site." },
                { ar: "بيانات السيو (Meta Title & Description): تضمن فهرسة الموقع في Google بالكلمات المفتاحية الصحيحة للوكالة.", en: "SEO Meta: Crucial for Google ranking and attractive preview cards when sharing the URL." }
              ]}
            />

            <div className="max-w-4xl flex flex-col gap-8">
              {/* Contact Info */}
              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] flex flex-col gap-6">
                <h3 className="font-heading font-bold text-lg text-white">
                  Agency Contact Channels
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      WhatsApp Number (Digits with country code)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                    Inquiry Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Address (English)
                    </label>
                    <input
                      type="text"
                      value={settings.address_en}
                      onChange={(e) => setSettings({ ...settings, address_en: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                      Address (Arabic)
                    </label>
                    <input
                      type="text"
                      value={settings.address_ar}
                      onChange={(e) => setSettings({ ...settings, address_ar: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              {/* SEO & Tracking */}
              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] flex flex-col gap-6">
                <h3 className="font-heading font-bold text-lg text-white">
                  Technical SEO & Conversion Tracking
                </h3>
                <div>
                  <label className="block text-xs font-mono uppercase text-white/50 mb-1">
                    Google Analytics 4 (Measurement ID)
                  </label>
                  <input
                    type="text"
                    placeholder="G-XXXXXXXXXX"
                    value={settings.seo?.ga4_id || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: {
                          ...settings.seo,
                          meta_title: settings.seo?.meta_title || "Egypt Creative",
                          meta_description: settings.seo?.meta_description || "",
                          og_image: settings.seo?.og_image || "",
                          ga4_id: e.target.value
                        }
                      })
                    }
                    className="w-full bg-white/[0.04] border border-white/20 p-2.5 text-sm text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
