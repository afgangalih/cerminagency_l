"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from '@inertiajs/react';
import {
  Bell,
  Send,
  User,
  Settings,
  CreditCard,
  LogOut,
  ChevronRight,
  Shield,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Menu,
} from "lucide-react";
import { ClientPipeline } from "@/types";

interface DashboardHeaderProps {
  role: "admin" | "client";
  activeTabTitle: string;
  selectedClient?: ClientPipeline;
  onOpenSupportWidget?: () => void;
  onOpenAddClient?: () => void;
  onToggleMobileMenu?: () => void;
}

export function DashboardHeader({
  role,
  activeTabTitle,
  selectedClient,
  onOpenSupportWidget,
  onOpenAddClient,
  onToggleMobileMenu,
}: DashboardHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Contextual Data
  const isRoleAdmin = role === "admin";
  const userName = isRoleAdmin
    ? "Dimas Pratama"
    : selectedClient?.name || "Sarah Jenkins";
  const userEmail = isRoleAdmin
    ? "dimas@cerminkreatif.com"
    : selectedClient?.email || "sarah@mavencoffee.com";
  const userSubtitle = isRoleAdmin
    ? "Creative Lead & Director"
    : `${selectedClient?.business || "Brand Owner"} (PIC)`;
  const avatarInitials = isRoleAdmin
    ? "DP"
    : selectedClient?.business?.slice(0, 2).toUpperCase() || "CK";

  const notifications = isRoleAdmin
    ? [
        {
          id: 1,
          title: "dr. Helena menyetujui Konten #03",
          time: "25 menit lalu",
          read: false,
        },
        {
          id: 2,
          title: "Slip transfer DP Termin 1 (Lumen) siap diverifikasi",
          time: "1 jam lalu",
          read: false,
        },
        {
          id: 3,
          title: "Jadwal syuting studio fisik disetujui videografer",
          time: "3 jam lalu",
          read: true,
        },
      ]
    : [
        {
          id: 1,
          title: "Draf video Reels #04 siap direview",
          time: "Baru saja",
          read: false,
        },
        {
          id: 2,
          title: "Jadwal kalender penayangan bulan ini diperbarui",
          time: "Kemarin",
          read: true,
        },
      ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-2xs">
      {/* ── Left: Breadcrumb Context ───────────────────────── */}
      <div className="flex items-center gap-2 text-xs">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 -ml-2 mr-1 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition cursor-pointer"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <span className="font-semibold text-zinc-950 flex items-center gap-1.5">
          {isRoleAdmin ? (
            <>
              <Shield className="w-3.5 h-3.5 text-zinc-900" />
              <span>Cermin Studio Ops</span>
            </>
          ) : (
            <>
              <Building2 className="w-3.5 h-3.5 text-zinc-900" />
              <span>{selectedClient?.business || "Portal Klien"}</span>
            </>
          )}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-500 font-medium font-inter text-[11px]">
          {activeTabTitle}
        </span>
      </div>

      {/* ── Right: Action Buttons & Profile Dropdown ───────── */}
      <div className="flex items-center gap-3">
        {/* Quick Send / Support Button */}
        <button
          onClick={onOpenSupportWidget}
          title={isRoleAdmin ? "Kirim Pesan Cepat" : "Buka Dukungan Cermin"}
          className="w-9 h-9 rounded-xl border border-zinc-200/90 hover:border-zinc-300 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-all shadow-2xs"
        >
          <Send className="w-4 h-4" />
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            title="Pemberitahuan Aktivitas"
            className="w-9 h-9 rounded-xl border border-zinc-200/90 hover:border-zinc-300 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-all shadow-2xs relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-zinc-200 shadow-[0_16px_36px_rgba(0,0,0,0.08)] p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-900">
                  Pemberitahuan
                </span>
                <span className="text-[10px] font-inter text-zinc-400">
                  {unreadCount} Baru
                </span>
              </div>
              <div className="divide-y divide-zinc-100 py-1">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-2.5 hover:bg-zinc-50 rounded-xl transition text-xs space-y-0.5 cursor-pointer"
                  >
                    <p className="font-medium text-zinc-900 leading-snug">
                      {notif.title}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-inter">
                      {notif.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-5 w-px bg-zinc-200 mx-0.5" />

        {/* Profile Avatar & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-zinc-900/10 transition group"
          >
            <div className="w-9 h-9 rounded-full bg-zinc-950 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {avatarInitials}
            </div>
          </button>

          {/* Contextual Dropdown Menu (Exact Reference Design) */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-zinc-200/90 shadow-[0_20px_45px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in zoom-in-95 origin-top-right">
              {/* User Header Profile */}
              <div className="flex items-center gap-3 p-3 border-b border-zinc-100 bg-zinc-50/60 rounded-xl mb-1">
                <div className="w-10 h-10 rounded-full bg-zinc-950 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {avatarInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-950 truncate leading-snug">
                    {userName}
                  </p>
                  <p className="text-[11px] text-zinc-500 truncate font-inter">
                    {userEmail}
                  </p>
                  <span className="inline-block mt-0.5 text-[9px] font-inter px-1.5 py-0.2 rounded bg-zinc-200/70 text-zinc-700 font-semibold">
                    {userSubtitle}
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-0.5 text-xs text-zinc-700 font-medium">
                <Link
                  href={isRoleAdmin ? "/admin" : "/portal"}
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-zinc-950 transition"
                >
                  <User className="w-4 h-4 text-zinc-500" />
                  <span>
                    {isRoleAdmin ? "Profil Akun Studio" : "Profil Brand PIC"}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (onOpenSupportWidget) onOpenSupportWidget();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-zinc-950 transition text-left"
                >
                  <Settings className="w-4 h-4 text-zinc-500" />
                  <span>
                    {isRoleAdmin ? "Pengaturan Agensi" : "Pengaturan Notifikasi"}
                  </span>
                </button>

                <div className="h-px bg-zinc-100 my-1" />

                <Link
                  href={isRoleAdmin ? "/admin" : "/portal"}
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-zinc-100 hover:text-zinc-950 transition"
                >
                  <CreditCard className="w-4 h-4 text-zinc-500" />
                  <span>
                    {isRoleAdmin
                      ? "Paket Retainer & Invoices"
                      : "Paket Kontrak & Tagihan"}
                  </span>
                </Link>

                <div className="h-px bg-zinc-100 my-1" />

                {/* Log out */}
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 hover:text-rose-700 transition cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-semibold">Log out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
