'use client';

import { useState, useEffect, useRef } from 'react';
import { Challenge } from '@/lib/types';
import { JHARKHAND_DISTRICTS, districts, universities } from '@/lib/mock-data';
import { 
  MapPin, Layers, Filter, Eye, AlertTriangle, ArrowRight, 
  ShieldAlert, Globe, Sparkles, Building2, CheckCircle2,
  Maximize2, RefreshCw, Sliders, Sun, Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { categoryConfig } from '@/lib/utils-config';
import Link from 'next/link';
import { useTheme } from 'next-themes';

// Import Leaflet dynamically client-side
import 'leaflet/dist/leaflet.css';

interface JharkhandMapProps {
  challenges: Challenge[];
  selectedCategory?: string;
  onDistrictSelect?: (districtName: string) => void;
  className?: string;
}

export function JharkhandMap({ 
  challenges, 
  selectedCategory = 'all',
  onDistrictSelect,
  className 
}: JharkhandMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const circlesGroupRef = useRef<any>(null);

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState<string | null>('Ranchi');
  const [tileMode, setTileMode] = useState<'dark' | 'satellite' | 'light'>('dark');
  const [viewLayer, setViewLayer] = useState<'all' | 'critical' | 'universities'>('all');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === 'dark' : true;

  // Sync tile mode automatically with active global theme (Light / Dark)
  useEffect(() => {
    if (!mounted) return;
    if (theme === 'light') {
      setTileMode('light');
    } else if (theme === 'dark') {
      setTileMode('dark');
    }
  }, [theme, mounted]);

  const filteredChallenges = challenges.filter(c => 
    selectedCategory === 'all' ? true : c.category === selectedCategory
  );

  const selectedDistrictData = JHARKHAND_DISTRICTS.find(d => d.name === activeDistrict) || JHARKHAND_DISTRICTS[0];
  const districtStats = districts.find(d => d.name.toLowerCase() === activeDistrict?.toLowerCase()) || districts[0];
  const districtChallenges = filteredChallenges.filter(c => c.district === activeDistrict);

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      if (mapInstanceRef.current) return; // Already initialized

      // Fix default Leaflet marker assets path
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Create Leaflet Map Instance centered at Jharkhand (23.5000° N, 85.3000° E)
      const map = L.map(mapContainerRef.current as HTMLElement, {
        center: [23.5000, 85.3000],
        zoom: 8,
        minZoom: 7,
        maxZoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom Control to Top Right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Create Layer Groups
      const markersGroup = L.layerGroup().addTo(map);
      const circlesGroup = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      markersGroupRef.current = markersGroup;
      circlesGroupRef.current = circlesGroup;

      setIsMapLoaded(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Base Tile Layer based on tileMode
  useEffect(() => {
    if (!mapInstanceRef.current || typeof window === 'undefined') return;

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      
      // Remove existing tile layers
      map.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });

      let tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
      if (tileMode === 'satellite') {
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      } else if (tileMode === 'light') {
        tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      }

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        attribution: '&copy; Esri &mdash; GIS Map'
      }).addTo(map);
    });
  }, [tileMode, isMapLoaded]);

  // Update Markers & Overlay Elements on Map
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current || typeof window === 'undefined') return;

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      const markersGroup = markersGroupRef.current;
      const circlesGroup = circlesGroupRef.current;

      markersGroup.clearLayers();
      circlesGroup.clearLayers();

      // 1. Render District Density Circles / Heatmap
      districts.forEach((d) => {
        if (!d.lat || !d.lng) return;

        const isSelected = activeDistrict?.toLowerCase() === d.name.toLowerCase();
        const dCount = filteredChallenges.filter(c => c.district.toLowerCase() === d.name.toLowerCase()).length;
        const radius = Math.max(12000, dCount * 2500);

        let circleColor = '#00BFA6';
        if (d.highPriority > 25) circleColor = '#ef4444';
        else if (d.highPriority > 15) circleColor = '#f97316';

        if (showHeatmap || isSelected) {
          const circle = L.circle([d.lat, d.lng], {
            color: isSelected ? '#00BFA6' : circleColor,
            fillColor: circleColor,
            fillOpacity: isSelected ? 0.35 : (showHeatmap ? 0.25 : 0.08),
            weight: isSelected ? 3 : 1.5,
            radius: radius
          });

          circle.on('click', () => {
            setActiveDistrict(d.name);
            if (onDistrictSelect) onDistrictSelect(d.name);
          });

          circlesGroup.addLayer(circle);
        }

        // District Label Marker
        const districtHtml = `
          <div class="px-2 py-0.5 rounded-lg ${isDark ? 'bg-slate-900/90 text-white border-slate-700/80 shadow-slate-950/50' : 'bg-white/95 text-slate-900 border-slate-300 shadow-slate-300/50'} border ${isSelected ? 'border-teal-500 ring-2 ring-teal-400/40 scale-110' : ''} text-[9px] font-extrabold shadow-md cursor-pointer transition-all flex items-center space-x-1 whitespace-nowrap">
            <span class="w-2 h-2 rounded-full ${d.highPriority > 25 ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}"></span>
            <span>${d.name}</span>
            <span class="px-1.5 py-0.2 rounded text-[8px] font-black ${isDark ? 'bg-teal-500/25 text-teal-300' : 'bg-teal-100 text-teal-800'}">${dCount}</span>
          </div>
        `;
        
        const districtIcon = L.divIcon({
          html: districtHtml,
          className: 'custom-district-marker',
          iconSize: [90, 26],
          iconAnchor: [45, 13]
        });

        const distMarker = L.marker([d.lat, d.lng], { icon: districtIcon });
        distMarker.on('click', () => {
          setActiveDistrict(d.name);
          if (onDistrictSelect) onDistrictSelect(d.name);
          map.flyTo([d.lat, d.lng], 9.5, { duration: 1 });
        });

        markersGroup.addLayer(distMarker);
      });

      // 2. Render Individual Challenge Pins
      if (viewLayer === 'all' || viewLayer === 'critical') {
        filteredChallenges.forEach((c, idx) => {
          const dObj = districts.find(d => d.name.toLowerCase() === c.district.toLowerCase());
          if (!dObj) return;

          if (viewLayer === 'critical' && c.priorityScore < 70) return;

          // Add slight coordinate dispersion around district center
          const latOffset = (Math.sin(idx * 7) * 0.12);
          const lngOffset = (Math.cos(idx * 7) * 0.14);
          const cLat = dObj.lat + latOffset;
          const cLng = dObj.lng + lngOffset;

          const isCritical = c.priorityScore > 75;
          const pinColor = isCritical ? '#ef4444' : c.priorityScore > 50 ? '#f59e0b' : '#10b981';

          const pinHtml = `
            <div class="relative group cursor-pointer">
              <div class="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white transition-all transform hover:scale-125"
                style="background-color: ${pinColor}">
                <span class="text-[8px] font-extrabold">${c.priorityScore}</span>
              </div>
              ${isCritical ? `<div class="absolute -inset-1 rounded-full bg-red-500/50 animate-ping pointer-events-none"></div>` : ''}
            </div>
          `;

          const pinIcon = L.divIcon({
            html: pinHtml,
            className: 'custom-challenge-pin',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
          });

          const popupHtml = `
            <div class="p-3 max-w-[240px] font-sans">
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800">
                  ${c.category}
                </span>
                <span class="text-xs font-bold ${isCritical ? 'text-red-600' : 'text-slate-700'}">
                  Priority: ${c.priorityScore}/100
                </span>
              </div>
              <h5 class="text-xs font-bold text-slate-900 line-clamp-2 leading-tight mb-1">${c.title}</h5>
              <p class="text-[11px] text-slate-500 mb-2">${c.locationAddress}</p>
              <a href="/citizen/challenges/${c.id}" class="block text-center py-1.5 px-3 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-teal-600 transition-colors">
                Inspect Challenge &rarr;
              </a>
            </div>
          `;

          const pinMarker = L.marker([cLat, cLng], { icon: pinIcon });
          pinMarker.bindPopup(popupHtml, { maxWidth: 260 });
          markersGroup.addLayer(pinMarker);
        });
      }

      // 3. Render University R&D Labs Markers if toggled
      if (viewLayer === 'universities') {
        universities.forEach((uni) => {
          const uDist = uni.district || 'Ranchi';
          const dObj = districts.find(d => d.name.toLowerCase() === uDist.toLowerCase());
          if (!dObj) return;

          const uniLat = dObj.lat + 0.05;
          const uniLng = dObj.lng - 0.05;

          const uniHtml = `
            <div class="p-2 rounded-xl bg-indigo-600 text-white border-2 border-white shadow-xl flex items-center space-x-1.5 hover:scale-110 transition-transform">
              <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              <span class="text-[10px] font-bold whitespace-nowrap">${uni.shortName}</span>
            </div>
          `;

          const uniIcon = L.divIcon({
            html: uniHtml,
            className: 'custom-uni-marker',
            iconSize: [110, 32],
            iconAnchor: [55, 16]
          });

          const uniMarker = L.marker([uniLat, uniLng], { icon: uniIcon });
          uniMarker.bindPopup(`
            <div class="p-3 max-w-[220px]">
              <span class="text-[10px] font-bold text-indigo-600 uppercase">R&D Institution</span>
              <h5 class="text-xs font-bold text-slate-900 mt-0.5">${uni.name}</h5>
              <p class="text-[11px] text-slate-500 mt-1">${uni.activeProjects} Active R&D Projects</p>
            </div>
          `);
          markersGroup.addLayer(uniMarker);
        });
      }
    });
  }, [activeDistrict, filteredChallenges, viewLayer, showHeatmap, isMapLoaded, isDark]);

  return (
    <div className={cn("rounded-[1.55rem] overflow-hidden flex flex-col lg:flex-row min-h-[440px] border transition-all duration-300", className)}
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
      
      {/* ── Interactive Leaflet GIS Canvas ────────────────────────────── */}
      <div className={cn(
        "flex-1 relative flex flex-col justify-between overflow-hidden min-h-[360px] lg:min-h-0 transition-colors duration-300",
        isDark ? "bg-slate-950" : "bg-slate-100"
      )}>
        
        {/* Real Leaflet Map Container */}
        <div ref={mapContainerRef} className="absolute inset-0 z-0 w-full h-full" />

        {/* Top Control Header HUD */}
        <div className={cn(
          "absolute right-3 top-3 z-10 flex items-center rounded-xl border p-1.5 shadow-lg backdrop-blur-md transition-colors duration-300 sm:right-4 sm:top-4",
          isDark 
            ? "bg-slate-950/85 text-white border-slate-800/80" 
            : "bg-white/90 text-slate-900 border-slate-200/80 shadow-xs"
        )}>
          {/* Map Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Tile Mode Toggle */}
            <div className={cn(
              "hidden items-center p-1 rounded-xl border backdrop-blur-md xl:flex",
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-100/90 border-slate-200"
            )}>
              <button 
                onClick={() => setTileMode('dark')}
                className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold transition-all",
                  tileMode === 'dark' 
                    ? "bg-teal-500 text-white shadow-sm" 
                    : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                Dark GIS
              </button>
              <button 
                onClick={() => setTileMode('satellite')}
                className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold transition-all",
                  tileMode === 'satellite' 
                    ? "bg-amber-500 text-white shadow-sm" 
                    : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                Satellite
              </button>
              <button 
                onClick={() => setTileMode('light')}
                className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold transition-all",
                  tileMode === 'light' 
                    ? "bg-cyan-500 text-white shadow-sm" 
                    : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                Vector Light
              </button>
            </div>

            {/* Filter Layers */}
            <div className={cn(
              "flex items-center p-1 rounded-xl border backdrop-blur-md",
              isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-100/90 border-slate-200"
            )}>
              <button
                onClick={() => setViewLayer(viewLayer === 'all' ? 'critical' : 'all')}
                className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 sm:px-2.5",
                  viewLayer === 'critical' 
                    ? "bg-red-600 text-white" 
                    : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                <AlertTriangle className="w-3 h-3" />
                <span className="hidden sm:inline">Critical</span>
              </button>
              <button
                onClick={() => setViewLayer(viewLayer === 'universities' ? 'all' : 'universities')}
                className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 sm:px-2.5",
                  viewLayer === 'universities' 
                    ? "bg-indigo-600 text-white" 
                    : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                <Building2 className="w-3 h-3" />
                <span className="hidden sm:inline">R&D</span>
              </button>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1 sm:px-2.5",
                  showHeatmap 
                    ? "bg-orange-500 text-white" 
                    : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                <Layers className="w-3 h-3" />
                <span className="hidden sm:inline">Heatmap</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── District Spotlight Sidebar ────────────────────────────── */}
      <div className="w-full lg:w-[20rem] p-4 border-t lg:border-t-0 lg:border-l flex flex-col justify-between"
        style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
        {selectedDistrictData ? (
          <div className="space-y-3">
            <div className="border-b pb-2.5" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 dark:text-teal-400 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>District Spotlight</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                  Pop: {(selectedDistrictData.population / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mt-1 flex items-center justify-between">
                <span>{selectedDistrictData.name}</span>
                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                  HQ: {selectedDistrictData.headquarters}
                </span>
              </h4>
            </div>

            {/* Quick District Metrics */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl border shadow-2xs transition-all hover:scale-[1.02]" 
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">Total Reported</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{districtChallenges.length}</p>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold mt-1 block">Active Geo-pins</span>
              </div>
              <div className="p-3 rounded-2xl border shadow-2xs transition-all hover:scale-[1.02]" 
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block mb-1">High Urgency</span>
                <p className="text-2xl font-black text-red-600 dark:text-red-400">
                  {districtChallenges.filter(c => c.priorityScore > 70).length}
                </p>
                <span className="text-[10px] text-red-500 font-semibold mt-1 block">Score &gt; 70 Index</span>
              </div>
            </div>

            {/* List of Challenges in this district */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Recent Challenges ({districtChallenges.length})
                </h5>
                <span className="text-[10px] text-slate-400">Click to view</span>
              </div>

              <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1 scrollbar-thin">
                {districtChallenges.length === 0 ? (
                  <div className="p-4 text-center border border-dashed rounded-2xl" style={{ borderColor: 'var(--border)' }}>
                    <MapPin className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                    <p className="text-xs text-slate-500 italic">No challenges reported in this district matching filters.</p>
                  </div>
                ) : (
                  districtChallenges.slice(0, 4).map((c) => {
                    const CatConfig = categoryConfig[c.category];
                    return (
                      <Link 
                        key={c.id} 
                        href={`/citizen/challenges/${c.id}`}
                        className="block p-3 rounded-2xl border hover:border-teal-500 dark:hover:border-teal-400 transition-all shadow-2xs group hover:-translate-y-0.5"
                        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={cn("text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10", CatConfig?.color, CatConfig?.bg)}>
                            {CatConfig?.label}
                          </span>
                          <span className="text-[11px] font-black text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            Index: {c.priorityScore}
                          </span>
                        </div>
                        <h6 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 line-clamp-1">
                          {c.title}
                        </h6>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 flex items-center space-x-1">
                          <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                          <span>{c.locationAddress}</span>
                        </p>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs">Select a district on the map to explore crowdsourced problems.</p>
          </div>
        )}

        <div className="pt-3 border-t mt-3" style={{ borderColor: 'var(--border)' }}>
          <Link
            href="/citizen/map"
            className="w-full py-2.5 px-4 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] shadow-md"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            <span>Open Fullscreen GIS Map Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
