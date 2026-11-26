"use client";

import React, { useState, useRef, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import {
  Bell,
  Search,
  ChevronDown,
  ArrowRight,
  User,
  Shield,
  Users,
  LogOut,
  Menu,
} from "lucide-react";
import { ClientPipeline, AgencyNotificationItem } from "@/types";
import { AdminTabKey } from "./AdminSidebar";

export interface BreadcrumbItem {
  label: string;
  nav?: AdminTabKey | null;
}

interface DashboardHeaderProps {
  role: "admin" | "client";
  activeTabTitle?: string;
  breadcrumbItems?: BreadcrumbItem[];
  onNavigateBreadcrumb?: (tab: AdminTabKey) => void;
  globalSearch?: string;
  setGlobalSearch?: (val: string) => void;
  notifications?: AgencyNotificationItem[];
  onMarkAllNotifRead?: () => void;
  onNotificationAction?: (notif: AgencyNotificationItem) => void;
  onOpenNotificationsPage?: () => void;
  onOpenProfileTab?: (subtab: "profil" | "keamanan" | "tim") => void;
  isNotificationsActive?: boolean;
  isProfileActive?: boolean;
  selectedClient?: ClientPipeline;
  onOpenSupportWidget?: () => void;
  onOpenAddClient?: () => void;
  onToggleMobileMenu?: () => void;
  onNavigateTab?: (tab: "profile" | "account_settings" | "retainer_plans") => void;
}

export function DashboardHeader({
  role,
  activeTabTitle = "Dashboard",
  breadcrumbItems,
  onNavigateBreadcrumb,
  globalSearch = "",
  setGlobalSearch,
  notifications = [],
  onMarkAllNotifRead,
  onNotificationAction,
  onOpenNotificationsPage,
  onOpenProfileTab,
  isNotificationsActive = false,
  isProfileActive = false,
  selectedClient,
  onToggleMobileMenu,
  onNavigateTab,
}: DashboardHeaderProps) {
  const page = usePage();
  const authUser = (page.props as any)?.auth?.user;

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isRoleAdmin = role === "admin";
  const userName = authUser?.name || (isRoleAdmin ? "Dimas Pratama" : selectedClient?.name || "Klien Cermin");
  const userEmail = authUser?.email || (isRoleAdmin ? "admin@cerminkreatif.com" : selectedClient?.email || "klien@brand.com");
  const userRoleLabel = isRoleAdmin
    ? "Creative Director & Admin"
    : `${selectedClient?.business || "Brand Owner"}`;
  const avatarInitials = userName
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase() || "CK";

  const effectiveNotifications: AgencyNotificationItem[] =
    notifications.length > 0
      ? notifications
      : isRoleAdmin
      ? []
      : [
          {
            id: "cl-n1",
            title: "Portal Brand Siap Dipantau",
            description: "Pantau progres produksi dan draf konten terbaru di sini.",
            category: "Sistem",
            time: "Baru saja",
            group: "Hari Ini",
            unread: false,
            actionLabel: "Lihat Ringkasan",
            actionType: "overview",
          },
        ];

  const unreadNotifCount = effectiveNotifications.filter((n) => n.unread).length;

  const effectiveBreadcrumbs: BreadcrumbItem[] =
    breadcrumbItems && breadcrumbItems.length > 0
      ? breadcrumbItems
      : [
          { label: isRoleAdmin ? "Cermin OS" : selectedClient?.business || "Portal Klien", nav: "mission_control" },
          { label: activeTabTitle, nav: null },
        ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#F1F5F9] px-5 lg:px-7 py-3.5 sm:py-4 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Toggle + Minimalist Text Breadcrumb + Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        {onToggleMobileMenu && (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-[#F4F6F9] text-slate-600 hover:text-[#3B9BF8] transition-colors cursor-pointer"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="min-w-0">
          {/* Interactive Minimalist Text Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[12px] text-slate-400 overflow-x-auto whitespace-nowrap"
          >
            {effectiveBreadcrumbs.map((bc, idx) => (
              <React.Fragment key={`${bc.label}-${idx}`}>
                {idx > 0 && <span className="text-slate-300 select-none">/</span>}
                {bc.nav && onNavigateBreadcrumb ? (
                  <button
                    type="button"
                    onClick={() => onNavigateBreadcrumb(bc.nav!)}
                    className="hover:text-[#3B9BF8] transition-colors font-medium cursor-pointer"
                  >
                    {bc.label}
                  </button>
                ) : (
                  <span className={idx === effectiveBreadcrumbs.length - 1 ? "font-semibold text-[#3B9BF8]" : "font-medium"}>
                    {bc.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Right: Global Search, Notification Popover, Profile Mega Menu */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Global Search (Admin) */}
        {isRoleAdmin && setGlobalSearch && (
          <div className="relative hidden md:block w-56 lg:w-64">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Cari brand, faktur, brief..."
              className="w-full bg-[#F4F6F9] border border-transparent text-[12.5px] text-slate-700 placeholder:text-[#94A3B8] pl-10 pr-4 py-2 rounded-xl focus:bg-white focus:border-[#3B9BF8] focus:outline-none focus:ring-2 focus:ring-[#3B9BF8]/25 transition-all"
            />
          </div>
        )}

        {/* Notification Bell + Interactive Popover */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setProfileMenuOpen(false);
              setNotifDropdownOpen((o) => !o);
            }}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              notifDropdownOpen || isNotificationsActive
                ? "bg-[#3B9BF8] text-white"
                : "bg-[#F4F6F9] hover:bg-[#EAF4FF] text-[#475569] hover:text-[#3B9BF8]"
            }`}
            aria-label="Notifikasi"
          >
            <Bell className="w-[17px] h-[17px]" strokeWidth={2} />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#EF4444] text-white text-[9.5px] font-bold flex items-center justify-center ring-2 ring-white tabular-nums">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white rounded-2xl border border-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.12)] z-40 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900">Notifikasi</h3>
                  {unreadNotifCount > 0 && (
                    <span className="text-[10px] font-bold bg-[#EFF7FF] text-[#3B9BF8] px-2 py-0.5 rounded-md tabular-nums">
                      {unreadNotifCount} Baru
                    </span>
                  )}
                </div>
                {unreadNotifCount > 0 && onMarkAllNotifRead && (
                  <button
                    type="button"
                    onClick={onMarkAllNotifRead}
                    className="text-[11px] font-semibold text-[#3B9BF8] hover:underline cursor-pointer"
                  >
                    Tandai dibaca
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {effectiveNotifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-xs text-slate-400">
                    Belum ada notifikasi terbaru.
                  </div>
                ) : (
                  effectiveNotifications.slice(0, 4).map((notif) => (
                    <button
                      key={notif.id}
                      type="button"
                      onClick={() => {
                        setNotifDropdownOpen(false);
                        onNotificationAction?.(notif);
                      }}
                      className={`w-full text-left px-4 py-3 transition-colors flex items-start gap-3 cursor-pointer ${
                        notif.unread
                          ? "bg-[#F6FAFF] hover:bg-[#EDF5FF]"
                          : "bg-white hover:bg-slate-50/80"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          notif.unread ? "bg-[#3B9BF8]" : "bg-slate-200"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-semibold text-slate-800 leading-snug line-clamp-1">
                          {notif.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                          {notif.description}
                        </p>
                        <div className="flex items-center justify-between gap-2 mt-1.5">
                          <span className="text-[10px] font-medium text-[#3B9BF8]">
                            {notif.actionLabel} →
                          </span>
                          <span className="text-[10px] text-slate-400">{notif.time}</span>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {onOpenNotificationsPage && (
                <div className="p-2.5 border-t border-slate-100 bg-[#FAFCFF]">
                  <button
                    type="button"
                    onClick={() => {
                      setNotifDropdownOpen(false);
                      onOpenNotificationsPage();
                    }}
                    className="w-full py-2 rounded-xl bg-[#EFF7FF] hover:bg-[#3B9BF8] text-[#3B9BF8] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Lihat Semua Detail Notifikasi
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile Chip + Mega Menu */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setNotifDropdownOpen(false);
              setProfileMenuOpen((o) => !o);
            }}
            className={`flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-xl transition-colors cursor-pointer ${
              profileMenuOpen || isProfileActive
                ? "bg-[#EFF7FF] ring-1 ring-[#DCEEFF]"
                : "hover:bg-[#F4F8FD]"
            }`}
          >
            {authUser?.avatar_url ? (
              <img
                src={authUser.avatar_url}
                alt={userName}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#EFF6FF]"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#3B9BF8] text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#EFF6FF]">
                {avatarInitials}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-[12.5px] font-bold text-[#1E293B] leading-tight">
                {userName}
              </p>
              <p className="text-[11px] text-[#94A3B8] leading-tight mt-0.5">
                {userRoleLabel}
              </p>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#94A3B8] hidden sm:block ml-0.5 transition-transform ${
                profileMenuOpen ? "rotate-180 text-[#3B9BF8]" : ""
              }`}
            />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2.5 w-80 bg-white rounded-2xl border border-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.12)] z-40 overflow-hidden">
              {/* Mega Menu Account Summary */}
              <div className="p-4 bg-[#FAFCFF] border-b border-slate-100 flex items-center gap-3">
                <div className="relative shrink-0">
                  {authUser?.avatar_url ? (
                    <img
                      src={authUser.avatar_url}
                      alt={userName}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-white shadow-sm"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-[#3B9BF8] text-white flex items-center justify-center text-sm font-bold ring-2 ring-white shadow-sm">
                      {avatarInitials}
                    </div>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{userEmail}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold bg-[#EFF7FF] text-[#3B9BF8] px-2 py-0.5 rounded-md">
                    {userRoleLabel}
                  </span>
                </div>
              </div>

              {/* Mega Menu Quick Links Grid */}
              <div className="p-2.5 grid grid-cols-1 gap-1">
                {isRoleAdmin ? (
                  [
                    {
                      title: "Profil Saya",
                      desc: "Informasi pribadi, kontak & bio",
                      icon: User,
                      onClick: () => {
                        onOpenProfileTab?.("profil");
                        setProfileMenuOpen(false);
                      },
                    },
                    {
                      title: "Keamanan & Sesi",
                      desc: "Kata sandi, 2FA & perangkat aktif",
                      icon: Shield,
                      onClick: () => {
                        onOpenProfileTab?.("keamanan");
                        setProfileMenuOpen(false);
                      },
                    },
                    {
                      title: "Tim Cermin Studio",
                      desc: "Daftar PIC & status kru studio",
                      icon: Users,
                      onClick: () => {
                        onOpenProfileTab?.("tim");
                        setProfileMenuOpen(false);
                      },
                    },
                    {
                      title: "Pusat Notifikasi",
                      desc: `${unreadNotifCount} belum dibaca & preferensi`,
                      icon: Bell,
                      onClick: () => {
                        onOpenNotificationsPage?.();
                        setProfileMenuOpen(false);
                      },
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={item.onClick}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8FD] transition-colors text-left group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#EFF7FF] text-[#3B9BF8] group-hover:bg-[#3B9BF8] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 leading-tight">
                            {item.title}
                          </p>
                          <p className="text-[10.5px] text-slate-400 truncate mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateTab?.("profile");
                      setProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8FD] transition-colors text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EFF7FF] text-[#3B9BF8] group-hover:bg-[#3B9BF8] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 leading-tight">
                        Profil Brand
                      </p>
                      <p className="text-[10.5px] text-slate-400 truncate mt-0.5">
                        Pengaturan akun klien
                      </p>
                    </div>
                  </button>
                )}
              </div>

              {/* Mega Menu Footer */}
              <div className="p-2.5 border-t border-slate-100 bg-[#FAFCFF]">
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    router.post("/logout");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Keluar dari Akun
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
