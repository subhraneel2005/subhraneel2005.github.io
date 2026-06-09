import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Music,
  Play,
  Pause,
  Clock,
  RefreshCw,
  Coffee,
  Headphones,
  LogOut,
  Disc3,
  Radio,
  Settings,
  Plus,
  Minus,
} from 'lucide-react';

const CLIENT_ID = 'a98267df6a1b44049b3f83b70528c18f';
const REDIRECT_URI = 'https://subhraneel2005.github.io/callback.html';
const SCOPES = [
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-read-currently-playing',
];

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => ('0' + b.toString(16)).slice(-2)).join('');
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(verifier));
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Cafe() {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [nowPlaying, setNowPlaying] = useState<any>(null);
  const [isSpotifyPlaying, setIsSpotifyPlaying] = useState(false);
  const [spotifyProgress, setSpotifyProgress] = useState(0);
  const [spotifyDuration, setSpotifyDuration] = useState(0);

  const [focusSec, setFocusSec] = useState(() => {
    const saved = localStorage.getItem('cafe_focus_sec');
    return saved ? Number(saved) : 25 * 60;
  });
  const [breakSec, setBreakSec] = useState(() => {
    const saved = localStorage.getItem('cafe_break_sec');
    return saved ? Number(saved) : 5 * 60;
  });
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [timerSeconds, setTimerSeconds] = useState(focusSec);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessions, setSessions] = useState(() => Number(localStorage.getItem('cafe_sessions') || 0));
  const [showTimerSettings, setShowTimerSettings] = useState(false);

  useEffect(() => {
    const savedError = localStorage.getItem('spotify_error');
    if (savedError) {
      setAuthError(savedError);
      localStorage.removeItem('spotify_error');
    }
    const savedToken = localStorage.getItem('spotify_access_token');
    if (savedToken) {
      initToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimerComplete();
            return timerMode === 'focus' ? breakSec : focusSec;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning, timerMode, focusSec, breakSec]);

  useEffect(() => {
    if (!token) return;
    pollCurrentTrack();
    const interval = setInterval(pollCurrentTrack, 3000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (!isSpotifyPlaying || !nowPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }
    progressIntervalRef.current = setInterval(() => {
      setSpotifyProgress((prev) => prev + 1000);
    }, 1000);
    return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); };
  }, [isSpotifyPlaying, nowPlaying]);

  async function initToken(accessToken: string) {
    const valid = await refreshIfNeeded(accessToken);
    if (valid) {
      setToken(valid);
      fetchUser(valid);
    }
  }

  async function refreshIfNeeded(accessToken: string): Promise<string | null> {
    const expires = Number(localStorage.getItem('spotify_token_expires') || 0);
    const refresh = localStorage.getItem('spotify_refresh_token');
    if (Date.now() > expires - 60000 && refresh) {
      try {
        const res = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh,
            client_id: CLIENT_ID,
          }),
        });
        const data = await res.json();
        if (data.access_token) {
          localStorage.setItem('spotify_access_token', data.access_token);
          localStorage.setItem('spotify_token_expires', String(Date.now() + data.expires_in * 1000));
          if (data.refresh_token) localStorage.setItem('spotify_refresh_token', data.refresh_token);
          return data.access_token;
        }
        return null;
      } catch { return null; }
    }
    return accessToken;
  }

  async function fetchUser(accessToken: string) {
    try {
      const res = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      setUserName(data.display_name || '');
      pollCurrentTrack();
    } catch {}
  }

  async function pollCurrentTrack() {
    const t = token || localStorage.getItem('spotify_access_token');
    if (!t) return;
    try {
      const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.status === 200) {
        const data = await res.json();
        setNowPlaying(data.item);
        setIsSpotifyPlaying(data.is_playing);
        setSpotifyProgress(data.progress_ms);
        setSpotifyDuration(data.item?.duration_ms || 0);
      } else if (res.status === 204) {
        setNowPlaying(null);
        setIsSpotifyPlaying(false);
      }
    } catch {}
  }

  function handleTimerComplete() {
    setSessions((prev) => {
      const next = prev + 1;
      localStorage.setItem('cafe_sessions', String(next));
      return next;
    });
    setTimerRunning(false);
    if (timerMode === 'focus') {
      setTimerMode('break');
      setTimerSeconds(breakSec);
    } else {
      setTimerMode('focus');
      setTimerSeconds(focusSec);
    }
  }

  async function handleConnect() {
    const verifier = generateCodeVerifier();
    localStorage.setItem('spotify_code_verifier', verifier);
    const challenge = await generateCodeChallenge(verifier);
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: challenge,
      scope: SCOPES.join(' '),
    });
    window.location.href = `https://accounts.spotify.com/authorize?${params}`;
  }

  function handleDisconnect() {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expires');
    setToken(null); setUserName('');
    setNowPlaying(null); setIsSpotifyPlaying(false);
    setSpotifyProgress(0); setSpotifyDuration(0);
  }

  function handleTimerToggle() {
    if (timerSeconds === 0) {
      setTimerSeconds(timerMode === 'focus' ? focusSec : breakSec);
    }
    setTimerRunning(!timerRunning);
  }

  function handleTimerReset() {
    setTimerRunning(false);
    setTimerSeconds(timerMode === 'focus' ? focusSec : breakSec);
  }

  function switchTimerMode(mode: 'focus' | 'break') {
    setTimerRunning(false);
    setTimerMode(mode);
    setTimerSeconds(mode === 'focus' ? focusSec : breakSec);
  }

  function updateDuration(type: 'focus' | 'break', delta: number) {
    const current = type === 'focus' ? focusSec : breakSec;
    const currentMin = Math.round(current / 60);
    const newMin = Math.max(1, Math.min(180, currentMin + delta));
    const newSec = newMin * 60;
    if (type === 'focus') {
      setFocusSec(newSec);
      localStorage.setItem('cafe_focus_sec', String(newSec));
      if (timerMode === 'focus') setTimerSeconds(newSec);
    } else {
      setBreakSec(newSec);
      localStorage.setItem('cafe_break_sec', String(newSec));
      if (timerMode === 'break') setTimerSeconds(newSec);
    }
  }

  const progressPercent = spotifyDuration > 0 ? (spotifyProgress / spotifyDuration) * 100 : 0;
  const targetSeconds = timerMode === 'focus' ? focusSec : breakSec;
  const timerProgress = timerSeconds / targetSeconds;
  const circumference = 2 * Math.PI * 58;
  const timerOffset = circumference * (1 - timerProgress);

  return (
    <div className="h-screen w-screen bg-[#0f0b09] text-[#f0ebe3] flex flex-col overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,163,115,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,160,180,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-900/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-2 right-4 ghibli-peek opacity-80 hidden sm:block">
          <div className="w-20 h-20 ghibli-frame rounded-2xl p-1 overflow-hidden shadow-xl">
            <img src="/black-cute-cat-peeking.jpg" alt="Cat" className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="absolute bottom-16 left-2 ghibli-float-reverse opacity-60 hidden lg:block">
          <div className="w-24 h-24 ghibli-frame rounded-2xl p-1 overflow-hidden shadow-xl">
            <img src="/no-face.jpg" alt="No-Face" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <header className="relative z-10 flex items-center justify-between px-4 py-3 shrink-0 border-b border-[#2a1f18] bg-[#0f0b09]/80 backdrop-blur-sm">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-bold text-[#b8a99a] hover:text-[#f0ebe3] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg">🏮</span>
          <span className="font-bold text-sm tracking-wider text-[#d4a373]">喫茶</span>
          <div className="sm:hidden w-7 h-7 ghibli-frame rounded-lg p-0.5 overflow-hidden ml-2">
            <img src="/black-cute-cat-peeking.jpg" alt="Cat" className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="w-16" />
      </header>

      <div className="flex-1 overflow-y-auto spotify-scroll px-4 py-6 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto space-y-8 pb-20">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black tracking-tighter mb-2"
            >
              virtual cafe
            </motion.h1>
            <p className="text-[#b8a99a] text-sm font-medium">music · focus · calm</p>
          </motion.div>

          {!token ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <button
                onClick={handleConnect}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a373] text-[#0f0b09] font-bold rounded-xl hover:bg-[#c49463] active:scale-[0.97] transition-all"
              >
                <Music className="w-5 h-5" />
                Connect Spotify
              </button>
              {authError && (
                <p className="mt-3 text-xs text-[#e8a0b4] max-w-md mx-auto">
                  {authError.length > 100 ? 'Authentication failed. Please try again.' : authError}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between bg-[#1a1410] border border-[#2a1f18] rounded-2xl px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d4a373]/20 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-[#d4a373]" />
                </div>
                <div>
                  <p className="text-sm font-bold">{userName || 'Connected'}</p>
                  <p className="text-[11px] text-[#b8a99a]">
                    {isSpotifyPlaying ? '🎵 Now Playing' : '⏸ Paused'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="p-2 hover:bg-[#2a1f18] rounded-lg transition-colors text-[#b8a99a] hover:text-[#e8a0b4]"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {token && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-4 h-4 text-[#d4a373]" />
                <h2 className="font-bold text-sm tracking-wider text-[#d4a373] uppercase">Now Playing</h2>
              </div>

              <motion.div
                layout
                className="bg-[#1a1410] border border-[#2a1f18] rounded-2xl p-5 md:p-6 text-center"
              >
                {nowPlaying ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-[#2a1f18] shadow-xl">
                        {nowPlaying.album?.images?.[0]?.url ? (
                          <img
                            src={nowPlaying.album.images[0].url}
                            alt={nowPlaying.album.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Disc3 className="w-16 h-16 text-[#3d3229]" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-black tracking-tight">{nowPlaying.name}</h3>
                      <p className="text-sm text-[#b8a99a] font-medium">
                        {nowPlaying.artists?.map((a: any) => a.name).join(', ')}
                      </p>
                      {nowPlaying.album?.name && (
                        <p className="text-xs text-[#7ba05b] font-medium">{nowPlaying.album.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5 max-w-sm mx-auto">
                      <div className="h-1.5 bg-[#2a1f18] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#d4a373] rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-[#b8a99a] font-medium">
                        <span>{formatTime(spotifyProgress)}</span>
                        <span>{formatTime(spotifyDuration)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-[#7ba05b] font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#7ba05b] animate-pulse" />
                      {isSpotifyPlaying ? 'Listening on Spotify' : 'Paused'}
                    </div>

                    <div className="pt-2">
                      <iframe
                        src={`https://open.spotify.com/embed/track/${nowPlaying.id}`}
                        width="100%"
                        height="80"
                        allow="encrypted-media"
                        className="rounded-xl"
                        style={{ border: 'none' }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="py-10 space-y-4">
                    <div className="flex justify-center">
                      <div className="w-24 h-24 rounded-full bg-[#2a1f18] flex items-center justify-center">
                        <Music className="w-10 h-10 text-[#3d3229]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-base font-bold">Nothing playing</p>
                      <p className="text-sm text-[#b8a99a] mt-1">
                        Open Spotify and play something — it'll show up here
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.section>
          )}

          <div className="flex justify-center sm:justify-end sm:-mr-8">
            <div className="ghibli-float">
              <div className="w-28 h-28 sm:w-36 sm:h-36 ghibli-frame rounded-2xl sm:rounded-3xl p-1.5 overflow-hidden shadow-2xl rotate-1">
                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <img src="/totoro-character.jpg" alt="Totoro" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4a373]" />
                <h2 className="font-bold text-sm tracking-wider text-[#d4a373] uppercase">Focus Timer</h2>
              </div>
              <button
                onClick={() => setShowTimerSettings(!showTimerSettings)}
                className={`p-1.5 rounded-lg transition-all ${showTimerSettings ? 'bg-[#d4a373]/20 text-[#d4a373]' : 'text-[#b8a99a] hover:text-[#f0ebe3]'}`}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1410] border border-[#2a1f18] rounded-2xl p-6 md:p-8 flex flex-col items-center relative"
            >
              <div className="absolute -top-3 -right-3 ghibli-bounce hidden sm:block">
                <div className="w-14 h-14 ghibli-frame rounded-xl p-0.5 overflow-hidden shadow-lg rotate-6">
                  <img src="/fire-smiling-character.jpg" alt="Calcifer" className="w-full h-full object-contain" />
                </div>
              </div>

              {showTimerSettings ? (
                <div className="w-full max-w-xs space-y-4 py-4">
                  <p className="text-xs text-[#b8a99a] text-center font-medium">Customize session durations</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">集中 Focus</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateDuration('focus', -5)} className="w-8 h-8 rounded-full bg-[#2a1f18] flex items-center justify-center hover:bg-[#3d3229] transition-all active:scale-90">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-lg font-black tabular-nums w-16 text-center">{Math.round(focusSec / 60)}</span>
                        <button onClick={() => updateDuration('focus', 5)} className="w-8 h-8 rounded-full bg-[#2a1f18] flex items-center justify-center hover:bg-[#3d3229] transition-all active:scale-90">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">休憩 Break</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateDuration('break', -1)} className="w-8 h-8 rounded-full bg-[#2a1f18] flex items-center justify-center hover:bg-[#3d3229] transition-all active:scale-90">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-lg font-black tabular-nums w-16 text-center">{Math.round(breakSec / 60)}</span>
                        <button onClick={() => updateDuration('break', 1)} className="w-8 h-8 rounded-full bg-[#2a1f18] flex items-center justify-center hover:bg-[#3d3229] transition-all active:scale-90">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => { setFocusSec(25 * 60); setBreakSec(5 * 60); localStorage.setItem('cafe_focus_sec', String(25 * 60)); localStorage.setItem('cafe_break_sec', String(5 * 60)); if (timerMode === 'focus') setTimerSeconds(25 * 60); else setTimerSeconds(5 * 60); }}
                      className="px-3 py-1.5 text-[10px] font-bold bg-[#2a1f18] rounded-lg hover:bg-[#3d3229] transition-colors"
                    >
                      Reset Defaults
                    </button>
                    <button onClick={() => setShowTimerSettings(false)} className="px-3 py-1.5 text-[10px] font-bold bg-[#d4a373] text-[#0f0b09] rounded-lg hover:bg-[#c49463] transition-colors">
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => switchTimerMode('focus')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        timerMode === 'focus'
                          ? 'bg-[#d4a373] text-[#0f0b09]'
                          : 'bg-[#2a1f18] text-[#b8a99a] hover:text-[#f0ebe3]'
                      }`}
                    >
                      集中 · Focus
                    </button>
                    <button
                      onClick={() => switchTimerMode('break')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        timerMode === 'break'
                          ? 'bg-[#7ba05b] text-[#0f0b09]'
                          : 'bg-[#2a1f18] text-[#b8a99a] hover:text-[#f0ebe3]'
                      }`}
                    >
                      休憩 · Break
                    </button>
                  </div>

                  <div className="relative mb-6">
                    <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
                      <circle cx="70" cy="70" r="58" fill="none" stroke="#2a1f18" strokeWidth="4" />
                      <circle
                        cx="70" cy="70" r="58"
                        fill="none"
                        stroke={timerMode === 'focus' ? '#d4a373' : '#7ba05b'}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={timerOffset}
                        className="transition-all duration-700 ease-linear"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-black tracking-wider">{formatTime(timerSeconds * 1000)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTimerToggle}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${
                        timerRunning
                          ? 'bg-[#b8a99a] text-[#0f0b09] hover:bg-[#a8998a]'
                          : 'bg-[#d4a373] text-[#0f0b09] hover:bg-[#c49463]'
                      }`}
                    >
                      {timerRunning ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
                    </button>
                    <button
                      onClick={handleTimerReset}
                      className="w-10 h-10 rounded-full bg-[#2a1f18] flex items-center justify-center hover:bg-[#3d3229] transition-all active:scale-90"
                    >
                      <RefreshCw className="w-4 h-4 text-[#b8a99a]" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-[#d4a373]" />
                    <span className="text-xs text-[#b8a99a]">{sessions} session{sessions !== 1 ? 's' : ''} today</span>
                  </div>
                </>
              )}
            </motion.div>
          </section>

          <div className="flex items-center justify-center gap-4 pb-8">
            <p className="text-xs text-[#3d3229]">🏮 喫茶 · virtual cafe · make yourself at home</p>
            <div className="lg:hidden ghibli-float-reverse">
              <div className="w-12 h-12 ghibli-frame rounded-xl p-0.5 overflow-hidden opacity-60">
                <img src="/no-face.jpg" alt="No-Face" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
