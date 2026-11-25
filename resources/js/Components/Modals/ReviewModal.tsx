'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ContentItem } from '@/types';
import { useAgency } from '@/context/AgencyContext';
import { 
  X, CheckCircle2, AlertCircle, Send, Clock, Video, Sparkles, 
  Copy, Check, ExternalLink, Play, Pause, Layers, Film, 
  Image as ImageIcon, Music, Tag, RotateCcw, MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewModalProps {
  item: ContentItem;
  onClose: () => void;
}

export function ReviewModal({ item, onClose }: ReviewModalProps) {
  const { approveContent, requestRevision, selectedClient } = useAgency();
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [revisionText, setRevisionText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // Version switcher state: 'current' (latest draft) vs 'v1' (initial archive)
  const [activeVersionTab, setActiveVersionTab] = useState<'current' | 'v1'>('current');

  // Media format detection
  const isFormatVideo = item.type.toLowerCase().includes('reel') || 
                        item.type.toLowerCase().includes('video') || 
                        item.type.toLowerCase().includes('tiktok') ||
                        item.mediaUrl.endsWith('.mp4');

  const isFormatCarousel = item.type.toLowerCase().includes('carousel') || 
                           item.type.toLowerCase().includes('korsel');

  // Video playback & timestamp state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [videoDuration, setVideoDuration] = useState(30);

  // Carousel slide state (simulated 1-4 slides)
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Video timer simulation if static mockup image is used
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !item.mediaUrl.endsWith('.mp4')) {
      timer = setInterval(() => {
        setCurrentSeconds((prev) => (prev >= videoDuration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, videoDuration, item.mediaUrl]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentSeconds(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setVideoDuration(videoRef.current.duration);
      }
    }
  };

  // Insert timestamp into revision notes
  const handleInsertTimestamp = () => {
    setShowRevisionInput(true);
    const tag = `[Detik ${formatTime(currentSeconds)}] `;
    if (!revisionText.includes(tag)) {
      setRevisionText((prev) => `${tag}${prev}`);
    }
  };

  // Insert slide into revision notes
  const handleInsertSlideTag = () => {
    setShowRevisionInput(true);
    const tag = `[Slide ${currentSlide}] `;
    if (!revisionText.includes(tag)) {
      setRevisionText((prev) => `${tag}${prev}`);
    }
  };

  // Insert category pill
  const handleInsertCategory = (category: string) => {
    setShowRevisionInput(true);
    const tag = `[${category}] `;
    if (!revisionText.includes(tag)) {
      setRevisionText((prev) => `${tag}${prev}`);
    }
  };

  // Copy caption & hashtags to clipboard
  const handleCopyCaption = () => {
    const hashtagsText = item.hashtags && item.hashtags.length > 0
      ? item.hashtags.map((h) => (h.startsWith('#') ? h : `#${h}`)).join(' ')
      : '';
    const fullText = `${item.caption}${hashtagsText ? `\n\n${hashtagsText}` : ''}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleApprove = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
    approveContent(item.id);
  };

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionText.trim()) return;

    const result = requestRevision(item.id, revisionText.trim());
    if (result.success) {
      setShowRevisionInput(false);
      setRevisionText('');
    } else {
      setErrorMsg(result.message);
    }
  };

  const hasMultipleVersions = item.revisionCount > 0 || item.version.includes('V2') || item.version.includes('Final');
  const isSlaMaxReached = item.revisionCount >= 2;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-zinc-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/70">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-inter px-2.5 py-1 rounded bg-zinc-200 text-zinc-800 font-medium">
              {item.day} ({item.weekday})
            </span>
            <span className="text-xs font-inter font-bold text-zinc-900 bg-white border border-zinc-300 px-2 py-0.5 rounded shadow-2xs">
              {item.version}
            </span>
            <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded ${
              item.status === 'Disetujui' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              item.status === 'Perlu Revisi' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
              'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {item.status}
            </span>

            {/* SLA Badge */}
            <span className="text-[11px] font-inter text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded">
              SLA Revisi: <strong>{item.revisionCount}/2</strong> Putaran
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Visual Asset Preview */}
          <div className="md:col-span-5 flex flex-col items-center">
            
            {/* Version Switcher Tabs (If multiple versions exist) */}
            {hasMultipleVersions && (
              <div className="w-full max-w-[280px] mb-3 flex items-center p-1 bg-zinc-100 rounded-xl border border-zinc-200 text-xs font-inter">
                <button
                  type="button"
                  onClick={() => setActiveVersionTab('current')}
                  className={`flex-1 py-1 px-2 rounded-lg text-center font-medium transition cursor-pointer ${
                    activeVersionTab === 'current'
                      ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {item.version} (Aktif)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVersionTab('v1')}
                  className={`flex-1 py-1 px-2 rounded-lg text-center font-medium transition cursor-pointer ${
                    activeVersionTab === 'v1'
                      ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Versi 1 (Awal)
                </button>
              </div>
            )}

            {/* Preview Canvas */}
            <div className="w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-950 shadow-lg relative border border-zinc-200 flex flex-col justify-between group">
              
              {/* Media Player / Simulator */}
              {item.mediaUrl.endsWith('.mp4') ? (
                <video
                  ref={videoRef}
                  src={item.mediaUrl}
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover"
                  playsInline
                />
              ) : (
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Version Watermark if viewing historical version */}
              {activeVersionTab === 'v1' && (
                <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[1px] flex items-center justify-center p-4">
                  <div className="bg-zinc-900/90 text-amber-300 border border-amber-500/40 text-[11px] font-inter px-3 py-1.5 rounded-xl shadow-lg text-center">
                    <p className="font-semibold">Arsip Draf Versi 1</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Sebelum perbaikan catatan revisi</p>
                  </div>
                </div>
              )}

              {/* Top Header Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                <div className="bg-zinc-900/80 backdrop-blur text-white text-[10px] font-inter px-2 py-0.5 rounded-md flex items-center gap-1.5">
                  {isFormatVideo ? <Film className="w-3 h-3 text-amber-400" /> : <ImageIcon className="w-3 h-3 text-cyan-400" />}
                  <span>{isFormatVideo ? 'Video Vertikal 9:16' : isFormatCarousel ? 'Korsel Multi-slide' : 'Gambar Resolusi Tinggi'}</span>
                </div>

                {isFormatVideo && (
                  <div className="bg-zinc-900/80 backdrop-blur text-zinc-200 text-[10px] font-mono px-2 py-0.5 rounded-md">
                    {formatTime(currentSeconds)} / {formatTime(videoDuration)}
                  </div>
                )}
              </div>

              {/* Carousel Controls (If format is carousel) */}
              {isFormatCarousel && (
                <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between z-10">
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
                    disabled={currentSlide === 1}
                    className="w-7 h-7 rounded-full bg-zinc-900/80 text-white flex items-center justify-center text-xs disabled:opacity-30 cursor-pointer shadow"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(prev => Math.min(totalSlides, prev + 1))}
                    disabled={currentSlide === totalSlides}
                    className="w-7 h-7 rounded-full bg-zinc-900/80 text-white flex items-center justify-center text-xs disabled:opacity-30 cursor-pointer shadow"
                  >
                    ›
                  </button>
                </div>
              )}

              {/* Bottom Video Progress & Controls */}
              {isFormatVideo && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-10 space-y-2">
                  <div className="w-full bg-zinc-800/80 h-1.5 rounded-full overflow-hidden cursor-pointer">
                    <div 
                      className="bg-amber-400 h-full transition-all duration-200" 
                      style={{ width: `${(currentSeconds / videoDuration) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1 rounded bg-white/20 text-white hover:bg-white/30 transition cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleInsertTimestamp}
                      className="px-2.5 py-1 rounded-md bg-zinc-900/90 hover:bg-zinc-950 text-white text-[10px] font-medium flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      title="Klik untuk memasukkan detik saat ini ke catatan revisi"
                    >
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Tandai Detik {formatTime(currentSeconds)}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Carousel Indicator */}
              {isFormatCarousel && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 bg-zinc-950/80 backdrop-blur p-2 rounded-lg">
                  <span className="text-[10px] font-inter text-zinc-300">
                    Slide {currentSlide} dari {totalSlides}
                  </span>
                  <button
                    type="button"
                    onClick={handleInsertSlideTag}
                    className="px-2.5 py-1 rounded-md bg-zinc-900/90 hover:bg-zinc-950 text-white text-[10px] font-medium flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Layers className="w-3 h-3 text-cyan-400" />
                    <span>Tandai Slide {currentSlide}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Helper below media */}
            <p className="mt-2.5 text-[11px] font-inter text-zinc-400 text-center">
              {isFormatVideo 
                ? 'Jeda video pada detik yang ingin dikoreksi, lalu klik tombol pasang detik.' 
                : isFormatCarousel
                ? 'Gunakan navigasi panah untuk berpindah slide.'
                : 'Pratinjau visual resolusi tinggi.'}
            </p>
          </div>

          {/* Right Column: Copywriting, SLA, Feedback & Actions */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-inter text-zinc-500">{item.platforms.join(' • ')}</span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-[11px] font-inter text-zinc-500">Format: {item.type}</span>
                  </div>
                </div>
              </div>

              {/* Draf Copywriting, Hook & Caption */}
              <div className="mt-3.5 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-inter text-zinc-500 uppercase tracking-wide font-semibold">
                    Draf Naskah, Hook & Kapsion:
                  </span>
                  {item.status === 'Disetujui' && (
                    <button
                      type="button"
                      onClick={handleCopyCaption}
                      className="inline-flex items-center gap-1 text-[11px] font-inter text-zinc-700 hover:text-zinc-950 bg-white border border-zinc-300 px-2 py-0.5 rounded-md shadow-2xs transition cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Tersalin!' : 'Salin Kapsion'}</span>
                    </button>
                  )}
                </div>
                
                <p className="text-xs text-zinc-700 leading-relaxed font-light whitespace-pre-line max-h-36 overflow-y-auto pr-1">
                  {item.caption}
                </p>

                {item.hashtags && item.hashtags.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-200/60 flex flex-wrap gap-1">
                    {item.hashtags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-inter text-zinc-500 bg-white border border-zinc-200 px-1.5 py-0.5 rounded">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Audit Trail Feedback History */}
              <div className="mt-3.5">
                <span className="text-[11px] font-inter text-zinc-500 uppercase tracking-wide block mb-2 font-semibold">
                  Riwayat Audit Catatan ({item.feedbackHistory.length}):
                </span>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                  {item.feedbackHistory.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-lg text-xs ${
                        log.sender === 'Klien' 
                          ? 'bg-zinc-100/90 text-zinc-800 border-l-2 border-zinc-800' 
                          : 'bg-emerald-50/70 text-emerald-900 border-l-2 border-emerald-500'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-inter text-zinc-500 mb-0.5">
                        <span className="font-semibold text-zinc-800">{log.sender}</span>
                        <span>{log.time}</span>
                      </div>
                      <p className="font-light leading-relaxed">{log.text}</p>
                    </div>
                  ))}

                  {item.feedbackHistory.length === 0 && (
                    <div className="text-xs text-zinc-400 font-inter italic py-1">
                      Belum ada catatan revisi. Draf siap ditinjau.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions / Interactive Footer */}
            <div className="pt-3 border-t border-zinc-200 space-y-3">
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STATE 1: KONTEN TELAH DISETUJUI -> CONTENT HANDOVER KIT */}
              {item.status === 'Disetujui' ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kit Siap Tayang: Konten Disetujui Final & Bebas Antrean</span>
                  </div>

                  <p className="text-xs text-emerald-800 font-light leading-relaxed">
                    Naskah dan file video telah dikunci. Anda dapat menyalin teks takarir atau mengunduh video master 4K langsung di bawah ini:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyCaption}
                      className="flex-1 py-2 px-3.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Takarir & Tagar Tersalin!' : 'Salin Takarir & Tagar'}</span>
                    </button>

                    <a
                      href={item.driveRawUrl || 'https://drive.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3.5 rounded-lg bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-900 font-medium text-xs flex items-center justify-center gap-2 transition shadow-2xs"
                    >
                      <span>Buka File Master (Google Drive)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                    </a>
                  </div>
                </div>
              ) : showRevisionInput ? (
                /* STATE 2: FORM REVISI TERBUKA (DENGAN KATEGORI PILLS & TIMESTAMP) */
                <form onSubmit={handleRevisionSubmit} className="space-y-3 animate-in fade-in">
                  
                  {/* Category Pills Header */}
                  <div>
                    <span className="text-[11px] font-inter text-zinc-500 font-medium block mb-1.5">
                      Fokus Perbaikan (Opsional):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {isFormatVideo && (
                        <button
                          type="button"
                          onClick={handleInsertTimestamp}
                          className="px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-[11px] font-inter font-medium flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Clock className="w-3 h-3 text-zinc-600" />
                          <span>Detik {formatTime(currentSeconds)}</span>
                        </button>
                      )}
                      {isFormatCarousel && (
                        <button
                          type="button"
                          onClick={handleInsertSlideTag}
                          className="px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-[11px] font-inter font-medium flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Layers className="w-3 h-3 text-zinc-600" />
                          <span>Slide {currentSlide}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleInsertCategory('Naskah & Typo')}
                        className="px-2.5 py-1 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-[11px] font-inter font-medium transition cursor-pointer shadow-2xs"
                      >
                        Naskah & Typo
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertCategory('Visual & Warna')}
                        className="px-2.5 py-1 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-[11px] font-inter font-medium transition cursor-pointer shadow-2xs"
                      >
                        Visual & Warna
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertCategory('Harga & Promo')}
                        className="px-2.5 py-1 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-[11px] font-inter font-medium transition cursor-pointer shadow-2xs"
                      >
                        Harga & Promo
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertCategory('Audio & Musik')}
                        className="px-2.5 py-1 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-[11px] font-inter font-medium transition cursor-pointer shadow-2xs"
                      >
                        Audio & Musik
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertCategory('Tempo & Potongan')}
                        className="px-2.5 py-1 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-[11px] font-inter font-medium transition cursor-pointer shadow-2xs"
                      >
                        Tempo & Potongan
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    required
                    placeholder="Tuliskan catatan revisi spesifik untuk editor tim Cermin..."
                    value={revisionText}
                    onChange={(e) => setRevisionText(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
                  />

                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowRevisionInput(false)}
                      className="px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 text-xs hover:bg-zinc-50 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#01A0CA] text-white text-xs font-semibold hover:bg-[#008db3] flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Masukan Revisi</span>
                    </button>
                  </div>
                </form>
              ) : isSlaMaxReached ? (
                /* STATE 3: SLA 2X REVISI SUDAH MAKSIMAL */
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Batas 2 Putaran Revisi Minor Gratis Terpenuhi</span>
                  </div>
                  <p className="text-xs text-amber-800 font-light leading-relaxed">
                    Dua putaran revisi minor gratis untuk konten ini telah terserap. Jika ada perombakan konsep besar di luar brief, silakan hubungi tim agensi untuk penyesuaian slot.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <a
                      href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                        `Halo Tim Cermin Kreatif, kami ingin konsultasi revisi lanjutan untuk konten "${item.title}".`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition"
                    >
                      <span>Konsultasi via WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={handleApprove}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Setujui Versi Ini</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* STATE 4: NORMAL BUTTONS (REQUEST REVISION OR APPROVE) */
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => setShowRevisionInput(true)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-medium text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Minta Revisi Minor ({2 - item.revisionCount}x Tersisa)</span>
                  </button>
                  <button
                    onClick={handleApprove}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Setujui Konten (Siap Tayang)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
