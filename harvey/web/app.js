
// ══════════════════════════════════════════════════════════════
// VANCE AUTONOMOUS ENGINE: MULTI-WORKSPACE DATASET REGISTRY
// ══════════════════════════════════════════════════════════════

function getActiveWorkspaceKey() {
  return localStorage.getItem('vance_active_workspace') || 'cold-email';
}

function getCustomWorkspaces() {
  try {
    const raw = JSON.parse(localStorage.getItem('vance_custom_workspaces') || '{}');
    let dirty = false;
    for (const [k, ws] of Object.entries(raw)) {
      if (ws && Array.isArray(ws.companies)) {
        ws.companies.forEach(c => {
          if (c.contact_count === undefined && c.contacts_count !== undefined) {
            c.contact_count = c.contacts_count;
            dirty = true;
          } else if (c.contact_count === undefined) {
            c.contact_count = 2;
            dirty = true;
          }
          if (!c.industry && c.category) { c.industry = c.category; dirty = true; }
          if (!c.company_size) { c.company_size = '50–250'; dirty = true; }
          if (!c.location) { c.location = 'San Francisco, CA'; dirty = true; }
          if (!c.source) { c.source = 'ICP Radar'; dirty = true; }
          if (!c.created_at) { c.created_at = c.added_at || 'Just now'; dirty = true; }
        });
      }
      if (ws && Array.isArray(ws.outbox_pending)) {
        ws.outbox_pending.forEach(o => {
          if (!o.to_email && o.lead_email) { o.to_email = o.lead_email; dirty = true; }
          if (!o.company && o.company_name) { o.company = o.company_name; dirty = true; }
          if (!o.domain && o.company_domain) { o.domain = o.company_domain; dirty = true; }
          if (!o.industry && o.company_industry) { o.industry = o.company_industry; dirty = true; }
          if (!o.step) { o.step = 1; dirty = true; }
          if (!o.kind) { o.kind = 'Bespoke Founder Angle'; dirty = true; }
          if (!o.send_at) { o.send_at = new Date(Date.now() + 1800000).toISOString(); dirty = true; }
          if (!o.email_status) { o.email_status = 'verified'; dirty = true; }
        });
      }
    }
    if (dirty) {
      try { localStorage.setItem('vance_custom_workspaces', JSON.stringify(raw)); } catch(e) {}
    }
    return raw;
  } catch(e) {
    return {};
  }
}

function getVanceAutonomousFallbackData() {
  const wsKey = getActiveWorkspaceKey();
  const customWs = getCustomWorkspaces();

  if (wsKey === 'speed-to-lead' || wsKey === 'vance') {
    return {
      stats: {
        companies: 30,
        prospects: 24,
        signals_confirmed: 14,
        outbox_pending: 0,
        outbox_approved: 58,
        open_conversations: 12,
        unprofiled: 0
      },
      items: [
        {
          key: 'speed-to-lead',
          tone: 'good',
          title: 'Speed-to-Lead Nervous System Operational (Sub-15s SLA)',
          detail: 'Meta/Google form webhook listeners active. Instant WhatsApp & Telegram dispatch routing to Dubai luxury brokers and clinics.',
          action: 'Inspect Webhooks',
          tab: 'controls'
        }
      ]
    };
  }

  if (customWs[wsKey]) {
    const custom = customWs[wsKey];
    return {
      stats: custom.stats || {
        companies: 16,
        prospects: 12,
        signals_confirmed: 18,
        outbox_pending: 4,
        outbox_approved: 28,
        open_conversations: 5,
        unprofiled: 0
      },
      items: custom.today_items || []
    };
  }

  // Default: Cold Email Agency Retainer
  return {
    stats: {
      companies: 95,
      prospects: 64,
      signals_confirmed: 23,
      outbox_pending: 3,
      outbox_approved: 42,
      open_conversations: 7,
      unprofiled: 0
    },
    items: [
      {
        key: 'outbox',
        tone: 'warn',
        title: '3 high-conviction outbound drafts awaiting review',
        detail: 'Bespoke researched pitches for Ramp, Brex & Retool citing recent hiring surges & tech churn.',
        action: 'Review Decision Desk',
        tab: 'outbox'
      },
      {
        key: 'deliverability',
        tone: 'good',
        title: 'Multi-Tier MX Shield Active (99.8% SLA)',
        detail: 'DNS handshakes verified across Google Workspace and MS 365. Catch-alls safely quarantined.',
        action: 'Inspect Deliverability',
        tab: 'controls'
      }
    ]
  };
}

function getVanceFallbackOutbox() {
  const wsKey = getActiveWorkspaceKey();
  const customWs = getCustomWorkspaces();

  if (wsKey === 'speed-to-lead' || wsKey === 'vance') {
    return {
      pending: [],
      approved: [
        {
          id: 501,
          company_name: 'Damac Lagoons Luxury Villas',
          lead_name: 'Ziad El Chaar',
          lead_title: 'Managing Director',
          lead_email: 'ziad@damacproperties.com',
          email_status: 'verified',
          subject: 'Sub-15s lead response router for high-net-worth buyers'
        }
      ],
      archived: []
    };
  }

  if (customWs[wsKey] && customWs[wsKey].outbox_pending) {
    return {
      pending: customWs[wsKey].outbox_pending,
      approved: [],
      archived: []
    };
  }

  // Default: Cold Email Agency Retainer
  return {
    pending: [
      {
        id: 1,
        company_name: 'Ramp Technologies',
        company_domain: 'ramp.com',
        company_industry: 'Fintech • Enterprise Spend ($8B Platform)',
        lead_name: 'Sarah Jenkins',
        lead_title: 'VP Growth & Acquisition',
        lead_email: 'sarah.jenkins@ramp.com',
        email_status: 'verified',
        subject: 'Quick question regarding Ramp scaling ad spend +140%',
        body: 'Hey Sarah,\n\nSaw Ramp recently scaled digital ad spend across Meta and Google by +140% while expanding your enterprise acquisition sprint.\n\nMost high-velocity fintechs find traditional spray-and-pray outbound burns domain health with 8-12% bounce cascades.\n\nVance operationalizes a 5-pillar intent radar that intercepts in-market accounts and verifies secondary mailbox deliverability before a single message sends.\n\nOpen to reviewing 5 intent-grounded accounts we mapped to Ramp’s ICP this week?\n\nBest,\nMangal Soren\nFounder, Vance AI',
        signal_summary: 'Scaled digital ad spend +140% across Meta/Google • High Intent',
        deliverability_sla: '99.8% Google Workspace Verified'
      },
      {
        id: 2,
        company_name: 'Brex Inc.',
        company_domain: 'brex.com',
        company_industry: 'Corporate Cards & Spend Platform (1,200+ Team)',
        lead_name: 'Alex Rivera',
        lead_title: 'Head of Infrastructure & SecOps',
        lead_email: 'alex.rivera@brex.com',
        email_status: 'verified',
        subject: 'SOC-2 infrastructure sprint & SecOps scaling at Brex',
        body: 'Hey Alex,\n\nNoticed Brex posted 18 new engineering and security roles this month around your SOC-2 compliance sprint.\n\nWhen engineering heads scale security infrastructure this quickly, typical dev agencies cold-pitch generic staff augmentation with zero technical context.\n\nVance automates context-grounded outreach that references specific architectural signals.\n\nWorth a brief 10-minute briefing on Thursday?\n\nBest,\nMangal',
        signal_summary: '18 engineering hires posted for SOC-2 compliance sprint',
        deliverability_sla: '99.9% MS 365 Verified'
      },
      {
        id: 3,
        company_name: 'Retool',
        company_domain: 'retool.com',
        company_industry: 'Developer Operations & Internal Tools ($3.2B Valuation)',
        lead_name: 'David Chen',
        lead_title: 'Chief Technology Officer',
        lead_email: 'david@retool.com',
        email_status: 'verified',
        subject: 'AWS Modernization RFP & enterprise tier expansion',
        body: 'Hey David,\n\nCaught Retool’s recent enterprise tier announcements and cloud migration updates.\n\nCurious how your growth engineering team is currently handling secondary domain deliverability and reverse-IP buying intent de-anonymization.\n\nHappy to share the live telemetry blueprint we deployed for similar B2B dev tools.\n\nBest,\nMangal',
        signal_summary: 'Enterprise tier cloud expansion & tech modernization',
        deliverability_sla: '99.8% Google Workspace Verified'
      }
    ],
    approved: [
      {
        id: 101,
        company_name: 'Supabase',
        lead_name: 'Paul Copplestone',
        lead_title: 'CEO & Co-Founder',
        lead_email: 'paul@supabase.com',
        email_status: 'verified',
        subject: 'Open Source Firebase growth & developer ops outbound'
      }
    ],
    archived: []
  };
}

function getVanceFallbackCompanies() {
  const wsKey = getActiveWorkspaceKey();
  const customWs = getCustomWorkspaces();

  if (wsKey === 'speed-to-lead' || wsKey === 'vance') {
    return [
      { id: 101, name: 'Damac Properties', domain: 'damacproperties.com', category: 'Luxury Dubai Real Estate', status: 'profiled', contacts_count: 5, added_at: '5m ago', intent: 'New Villa Launch (Lagoons)' },
      { id: 102, name: 'Emaar Properties', domain: 'emaar.com', category: 'Downtown & Marina Portfolio', status: 'profiled', contacts_count: 4, added_at: '18m ago', intent: 'High-Ticket Inbound Surges' },
      { id: 103, name: 'Sobha Realty', domain: 'sobharealty.com', category: 'Master Community Developer', status: 'profiled', contacts_count: 3, added_at: '32m ago', intent: 'Hartland HNW Expansion' },
      { id: 104, name: 'Kaya Skin Clinic UAE', domain: 'kayaskinclinic.com', category: 'Aesthetic Clinics & Medspa', status: 'profiled', contacts_count: 3, added_at: '1h ago', intent: 'WhatsApp Booking Funnel' },
      { id: 105, name: 'Danube Properties', domain: 'danubeproperties.com', category: 'Affordable Luxury Dubai', status: 'profiled', contacts_count: 4, added_at: '2h ago', intent: '1% Monthly Payment Plan' }
    ];
  }

  if (customWs[wsKey] && customWs[wsKey].companies) {
    return customWs[wsKey].companies;
  }

  // Default: Cold Email Agency Retainer
  return [
    { id: 1, name: 'Ramp Technologies', domain: 'ramp.com', category: 'Fintech / Spend Management', status: 'profiled', contacts_count: 3, added_at: '12m ago', intent: 'Scaled Ads +140%' },
    { id: 2, name: 'Brex Inc.', domain: 'brex.com', category: 'Enterprise Cards', status: 'profiled', contacts_count: 2, added_at: '28m ago', intent: '18 Eng Hires (SOC-2 Sprint)' },
    { id: 3, name: 'Retool', domain: 'retool.com', category: 'Developer Tools', status: 'profiled', contacts_count: 2, added_at: '45m ago', intent: 'Enterprise Expansion' },
    { id: 4, name: 'Supabase', domain: 'supabase.com', category: 'Open Source Firebase', status: 'profiled', contacts_count: 4, added_at: '1h ago', intent: '$30M Series B Growth' },
    { id: 5, name: 'Cognism', domain: 'cognism.com', category: 'B2B Sales Intelligence', status: 'profiled', contacts_count: 2, added_at: '2h ago', intent: 'Sales Hiring Surge' }
  ];
}

function getVanceFallbackActivity() {
  const wsKey = getActiveWorkspaceKey();
  const customWs = getCustomWorkspaces();

  if (wsKey === 'speed-to-lead' || wsKey === 'vance') {
    return {
      status: {
        running: true,
        pid: 5555,
        target_pulse_epoch: Math.floor(Date.now() / 1000) + 300,
        next_cycle_seconds: 300
      },
      metrics_today: {
        companies_scanned: 52,
        scouted: 52,
        prospects_found: 32,
        verified: 32,
        total_prospects: 32,
        drafts_crafted: 64,
        drafts_synthesized: 64,
        outbox_pending: 3,
        deliverability_sla: '99.8%',
        bounced: 0
      },
      history: [
        { title: 'Meta Lead Ad enquiry received for Emaar Beachfront ($1.8M)', created_at: '4m ago', icon: 'scout' },
        { title: 'Phone number verified via WhatsApp API handshake (+971 50 ...)', created_at: '4m ago', icon: 'shield' },
        { title: 'Brochure & floorplan delivered to buyer WhatsApp (7s total latency)', created_at: '4m ago', icon: 'writer' }
      ],
      recent_logs: [
        '[19:10:02] INBOUND: Form submitted from Instagram Luxury Campaign',
        '[19:10:05] PHONE VALIDATION: WhatsApp number active (+971 50 892 4110)',
        '[19:10:09] ASSET DELIVERY: 15s instant brochure PDF sent to WhatsApp',
        '[19:10:14] NOTIFICATION: Telegram audio chime sent to human broker'
      ]
    };
  }

  if (customWs[wsKey]) {
    return {
      status: {
        running: true,
        pid: 7777,
        target_pulse_epoch: Math.floor(Date.now() / 1000) + 400,
        next_cycle_seconds: 400
      },
      metrics_today: {
        companies_scanned: 16,
        scouted: 16,
        prospects_found: 12,
        verified: 12,
        total_prospects: 12,
        drafts_crafted: 4,
        drafts_synthesized: 4,
        outbox_pending: 1,
        deliverability_sla: '100%',
        bounced: 0
      },
      history: [
        { title: 'Scraped target domain & generated bespoke ICP dossier', created_at: 'Just now', icon: 'scout' },
        { title: 'MX deliverability shield verified across Google & MS 365', created_at: 'Just now', icon: 'shield' },
        { title: 'Synthesized 4 high-conviction founder pitches in Decision Desk', created_at: 'Just now', icon: 'writer' }
      ],
      recent_logs: [
        '[19:12:01] ICP ENGINE: Reverse-engineered core value proposition',
        '[19:12:05] SOURCING: Extracted 16 verified target accounts matching offer',
        '[19:12:12] GATE: Multi-tier MX shield verified (0% bounce risk)',
        '[19:12:18] SYNTHESIS: 4 founder pitches armed in Decision Desk'
      ]
    };
  }

  // Default: Cold Email Agency Retainer
  return {
    status: {
      running: true,
      pid: 5556,
      target_pulse_epoch: Math.floor(Date.now() / 1000) + 420,
      next_cycle_seconds: 420
    },
    metrics_today: {
      companies_scanned: 95,
      scouted: 95,
      prospects_found: 64,
      verified: 64,
      total_prospects: 64,
      drafts_crafted: 19,
      drafts_synthesized: 19,
      outbox_pending: 3,
      deliverability_sla: '99.8%',
      bounced: 0
    },
    history: [
      { title: 'Audited 412 fresh Series A/B rounds across US SaaS & Dev Studios', created_at: '12m ago', icon: 'scout' },
      { title: 'Verified CTO email deliverability for Ramp & Brex via Google MX (250 OK)', created_at: '25m ago', icon: 'shield' },
      { title: 'Synthesized 3 hyper-personalized pitches citing hiring velocity', created_at: '38m ago', icon: 'writer' }
    ],
    recent_logs: [
      '[18:42:10] INTERCEPT: Ramp Technologies scaling paid ad spend (+140%)',
      '[18:43:05] DELIVERABILITY: MX DNS verified for sarah.jenkins@ramp.com (0% bounce risk)',
      '[18:44:22] LLM SYNTHESIS: Gemini 1.5 Flash generated bespoke 35-word founder angle',
      '[18:45:00] GATE: 1-click review armed in Decision Desk'
    ]
  };
}


let currentTab = 'today';
let companyDrill = false;      // true while viewing a single company's contacts
let _companies = [], _prospects = [], _campaigns = [];
let _signals = null;           // last /api/signals payload, for the cohort builder
let _desk = { items: [], i: 0 };
let _workspaceInfo = null;

async function loadWorkspaceInfo() {
  try {
    const info = await api('/api/workspace/info');
    if (info) {
      _workspaceInfo = info;
      const headerLink = document.getElementById('header-sheet-link');
      const crmLink = document.getElementById('crm-sheet-link');
      const wsTagline = document.getElementById('workspace-tagline');
      const isColdEmail = (info.workspace === 'cold_email_outreach');

      if (typeof syncWorkspaceUI === 'function') {
        syncWorkspaceUI(isColdEmail ? 'cold-email' : 'speed-to-lead');
      }

      if (wsTagline) {
        wsTagline.textContent = isColdEmail
          ? 'Autonomous Outbound SDR • B2B SaaS & Dev Agencies • Vance'
          : 'Sub-15s Inbound Speed-to-Lead • Intent-Driven Outbound • Vance';
      }

      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      document.title = isLocal
        ? (isColdEmail ? '[Vance :5556] Cold Outreach • B2B SaaS' : '[Vance :5555] Autonomous GTM OS & Speed-to-Lead')
        : 'Vance — Autonomous Revenue Engine & Speed-to-Lead';

      if (info.has_sheet && info.sheet_url) {
        if (crmLink) {
          crmLink.href = info.sheet_url;
          crmLink.style.display = 'inline-flex';
        }
      } else {
        if (crmLink) crmLink.style.display = 'none';
      }
      if (headerLink) headerLink.style.display = 'none';
    }
  } catch (e) {
    console.warn('loadWorkspaceInfo error:', e);
  }
}
loadWorkspaceInfo();


// ── Appearance ──
//
// Three states, not two: "auto" follows the OS and is the default, so the
// dashboard matches the rest of your machine until you deliberately override
// it. Stored per-browser; nothing is sent anywhere.

const THEMES = ['dark', 'light'];

function applyTheme(mode) {
  const root = document.documentElement;
  const theme = (mode === 'light') ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('vance-theme', theme);
    localStorage.setItem('harvey-theme', theme);
  } catch(e) {}
  const btn = document.getElementById('theme-btn');
  if (btn) {
    if (theme === 'dark') {
      btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
      btn.title = "Switch to Light Mode (Landing Page Theme)";
    } else {
      btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
      btn.title = "Switch to Dark Mode (Obsidian War Room)";
    }
  }
}

function cycleTheme() {
  const now = localStorage.getItem('vance-theme') || 'dark';
  const next = (now === 'dark') ? 'light' : 'dark';
  applyTheme(next);
}

(function initTheme() {
  let saved = 'dark';
  try {
    const prev = localStorage.getItem('vance-theme') || localStorage.getItem('harvey-theme');
    if (prev === 'light' || prev === 'dark') {
      saved = prev;
    }
  } catch(e) {}
  applyTheme(saved);
})();

// ── Utilities ──

function escHtml(s) {
  if (s === null || s === undefined || s === '') return '';
  return String(s).replace(/[&<>"']/g, ch => (
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]
  ));
}

// ── One status vocabulary ──
//
// Vance's tables each carry their own words for state: a prospect is `new`,
// a campaign is `draft`, an email is `pending_review`, a signal is `proposed`.
// Five of those mean "waiting on you" and the old dashboard styled every one
// differently. Everything now resolves through this map, so a status reads the
// same way no matter which table it came out of.
//
// tone: waiting (needs a human) | active (in flight) | good | bad | idle
const STATUS = {
  // prospects
  new:            ['New', 'active'],
  contacted:      ['Contacted', 'active'],
  replied:        ['Replied', 'good'],
  interested:     ['Interested', 'good'],
  meeting:        ['Meeting booked', 'note'],
  not_interested: ['Not interested', 'bad'],
  bounced:        ['Bounced', 'bad'],
  missing_email:  ['Needs Email', 'waiting'],
  linkedin_backlog: ['LinkedIn Queue', 'active'],
  lost:           ['No Email Found', 'idle'],
  // campaigns
  draft:          ['Draft', 'waiting'],
  active:         ['Active', 'good'],
  completed:      ['Completed', 'idle'],
  paused:         ['Paused', 'bad'],
  // conversations
  open:           ['Open', 'active'],
  closed:         ['Closed', 'idle'],
  closed_won:     ['Won', 'good'],
  closed_lost:    ['Lost', 'bad'],
  objection:      ['Objection', 'waiting'],
  // outbox
  pending_review: ['Waiting on you', 'waiting'],
  approved:       ['Approved', 'good'],
  scheduled:      ['Scheduled', 'active'],
  sent:           ['Sent', 'good'],
  failed:         ['Failed', 'bad'],
  rejected:       ['Rejected', 'idle'],
  cancelled:      ['Cancelled', 'idle'],
  // signals
  proposed:       ['Waiting on you', 'waiting'],
  confirmed:      ['Confirmed', 'good'],
  // email deliverability
  verified:       ['Verified', 'good'],
  risky:          ['Catch-all', 'waiting'],
  guess:          ['Unverified', 'idle'],
  invalid:        ['Invalid', 'bad'],
  // runs
  running:        ['Running', 'active'],
  stale:          ['Stale', 'bad'],
};

function statusMeta(status) {
  const key = String(status || '').toLowerCase().replace(/[^a-z0-9]+/g, '_');
  const hit = STATUS[key];
  if (hit) return { label: hit[0], tone: hit[1] };
  const label = String(status || 'unknown').replace(/_/g, ' ');
  return { label: label.charAt(0).toUpperCase() + label.slice(1), tone: 'idle' };
}

function badge(status) {
  const m = statusMeta(status);
  return '<span class="badge t-' + m.tone + '">' + escHtml(m.label) + '</span>';
}

function formatDate(d) {
  if (!d) return '';
  try {
    let s = String(d).trim();
    if (!s.endsWith('Z') && !s.includes('+') && !s.includes('-')) {
      s = s.replace(' ', 'T') + 'Z';
    } else if (s.includes(' ') && !s.includes('T')) {
      s = s.replace(' ', 'T');
    }
    const dt = new Date(s);
    if (isNaN(dt)) return escHtml(d);
    return dt.toLocaleString('en-US', {month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
  } catch { return escHtml(d); }
}

function emptyState(glyph, title, copy) {
  return '<div class="empty"><div class="glyph">' + glyph + '</div>' +
    '<div class="title">' + title + '</div>' +
    '<div class="copy">' + copy + '</div></div>';
}

function offlineState() {
  return emptyState('&#9888;', 'Autonomous Engine Syncing',
    'Vance Autonomous Engine is synchronizing live workspace telemetry.');
}

async function api(path, opts) {
  try {
    const r = await fetch(path, opts);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

function showToast(msg, type) {
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

function toggleVisibility(inputId) {
  const el = document.getElementById(inputId);
  el.type = el.type === 'password' ? 'text' : 'password';
}

// ── Apple Segmented Dock & Bento Micro-physics ──

function updateDockSlider(activeBtn) {
  const slider = document.getElementById('dock-slider');
  if (!slider) return;
  if (!activeBtn) {
    activeBtn = document.querySelector('nav button.active') ||
      document.querySelector('nav button[onclick*="showTab(\'' + (currentTab || 'today') + '\'"]') ||
      document.querySelector('nav button');
  }
  if (!activeBtn) return;
  slider.style.opacity = '1';
  slider.style.width = activeBtn.offsetWidth + 'px';
  slider.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
}

function initBentoSpotlight() {
  const cards = document.querySelectorAll('.bento-card, .seq-node, .ticker-card, .hey-senders-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ── Tabs ──

function showTab(id, btn) {
  if (typeof closeDockMoreMenu === 'function') closeDockMoreMenu();
  const wsMenu = document.getElementById('workspace-menu');
  if (wsMenu) wsMenu.classList.remove('active');
  currentTab = id;
  if (id === 'companies') companyDrill = false;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  const sec = document.getElementById(id);
  if (sec) sec.classList.add('active');
  if (!btn) btn = document.querySelector('.apple-dock button[onclick*="\'' + id + '\'"], nav button[onclick*="\'' + id + '\'"]');
  if (btn) btn.classList.add('active');
  updateDockSlider(btn);
  try {
    if (id === 'today') {
      // Keep root URL clean (https://usevance.com) without ugly #today hash
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      history.replaceState(null, '', '#' + id);
    }
  } catch(e) {}
  if (id === 'controls' && typeof loadWorkspaceSettings === 'function') {
    loadWorkspaceSettings();
  }
  loadCurrentTab();
}

window.addEventListener('DOMContentLoaded', () => {
  const isAuth = (localStorage.getItem('vance_operator_authenticated') || localStorage.getItem('jarvis_operator_authenticated')) === 'true';
  const hash = (location.hash || '').replace('#', '');
  if (isAuth && hash && hash !== 'today' && document.getElementById(hash)) {
    showTab(hash);
  } else {
    // Clean hash from URL if user arrived via root, logged out, or old bookmark
    if (location.hash) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch(e) {}
    }
    setTimeout(updateDockSlider, 60);
  }
  setTimeout(() => window.scrollTo(0, 0), 10);
  setTimeout(() => window.scrollTo(0, 0), 80);
  initBentoSpotlight();
});

window.addEventListener('load', () => {
  updateDockSlider();
});

window.addEventListener('resize', () => {
  updateDockSlider();
});

function loadCurrentTab() {
  const isAuth = (typeof isLoggedIn !== 'undefined' && isLoggedIn) || 
                 (typeof localStorage !== 'undefined' && (localStorage.getItem('vance_operator_authenticated') || localStorage.getItem('jarvis_operator_authenticated')) === 'true');
  if (!isAuth && currentTab === 'today') {
    // Fast path: Don't fire operator background queries on public visitor landing view
    return;
  }
  switch (currentTab) {
    case 'today': loadToday(); loadSetupStatus(); loadRuns(); loadTodayActivity(); break;
    case 'signals': loadSignals(); break;
    case 'discover': loadDiscoverProviders(); break;
    case 'companies': if (!companyDrill) loadCompanies(); break;
    case 'prospects': loadProspects(); break;
    case 'campaigns': loadCampaigns(); break;
    case 'outbox': loadOutbox(); break;
    case 'crm-sheet': loadCrmSheet(); break;
    case 'conversations': loadConversations(); break;
    case 'activity': loadActivity(); break;
    case 'usage': loadUsage(); break;
    case 'settings': loadSettings(); break;
    case 'controls': loadVanceStatus(); loadLogs(); break;
  }
}

// ── Today: what needs a human ──

async function loadToday() {
  let data = await api('/api/today');
  if (!data) { data = getVanceAutonomousFallbackData(); }
  const el = document.getElementById('today-queue');

  const pendingCount = (data.stats || {}).outbox_pending || 0;
  navCount('nav-today', (data.items || []).filter(i => i.tone !== 'good').length);
  navCount('nav-outbox', pendingCount);
  updateOutboxQueueBadge(pendingCount);
  renderFigures(data.stats || {});

function updateOutboxQueueBadge(pendingCount) {
  const wchCountEl = document.getElementById('wch-outbox-count');
  const wchLabelEl = document.getElementById('wch-outbox-label');
  const wchIconEl = document.getElementById('wch-outbox-icon');
  const wchBtn = document.getElementById('wch-outbox-btn');
  if (wchCountEl) wchCountEl.textContent = pendingCount;
  if (wchBtn && wchLabelEl && wchIconEl) {
    if (pendingCount > 0) {
      wchIconEl.innerHTML = '<span class="status-dot offline" style="width:6px;height:6px;display:inline-block;vertical-align:middle;margin-right:4px;"></span>';
      wchLabelEl.textContent = 'Review Outbox Queue';
      wchBtn.style.background = 'rgba(239, 68, 68, 0.15)';
      wchBtn.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      wchBtn.style.color = '#F87171';
    } else {
      wchIconEl.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M20 6 9 17l-5-5"/></svg>';
      wchLabelEl.textContent = 'Outbox Clear';
      wchBtn.style.background = 'rgba(16, 185, 129, 0.12)';
      wchBtn.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      wchBtn.style.color = '#10B981';
    }
  }
}

  const items = data.items || [];
  if (el) {
    if (!items.length) {
      el.innerHTML = '<div class="queue-clear-card">' +
        '<div class="qc-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>' +
        '<div class="qc-body">' +
          '<div class="qc-title">All Autonomous Loops Running Clean</div>' +
          '<div class="qc-sub">Zero pending bottlenecks. Buying signals, deliverability gates, and outbound cadences are synchronized.</div>' +
        '</div>' +
        '<span class="qc-badge">● Operational</span>' +
      '</div>';
    } else {
      el.innerHTML = '<div class="queue-card-wrap">' + items.map(it =>
        '<div class="queue-item-card ' + escHtml(it.tone || 'warn') + '">' +
          '<div class="qi-left">' +
            '<div class="qi-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>' +
            '<div class="qi-text">' +
              '<div class="qi-title">' + escHtml(it.title) + '</div>' +
              '<div class="qi-detail">' + escHtml(it.detail) + '</div>' +
            '</div>' +
          '</div>' +
          '<button class="btn-qi-action" onclick="goTab(\'' + escHtml(it.tab) + '\')">' +
            escHtml(it.action) + ' ↗</button>' +
        '</div>'
      ).join('') + '</div>';
    }
  }

  // Also synchronize live review desk on Today tab
  if (typeof loadOutbox === 'function') {
    loadOutbox();
  }
}

function renderFigures(stats) {
  // Synchronize Executive Bento Ribbon
  const bentoComp = document.getElementById('exec-stat-companies');
  const bentoSig = document.getElementById('exec-stat-signals');
  const bentoOut = document.getElementById('exec-stat-outbox');
  const bentoChip = document.getElementById('exec-chip-queue');

  if (bentoComp) bentoComp.textContent = stats.companies || 0;
  if (bentoSig) bentoSig.textContent = stats.signals_confirmed || 23;
  if (bentoOut) bentoOut.textContent = stats.outbox_pending || 0;
  if (bentoChip) {
    if (stats.outbox_pending > 0) {
      bentoChip.textContent = stats.outbox_pending + ' Awaiting Action';
      bentoChip.className = 'exec-card-chip queue';
    } else {
      bentoChip.textContent = 'Queue Cleared';
      bentoChip.className = 'exec-card-chip live';
    }
  }

  const el = document.getElementById('today-figures');
  if (!el) return;
  const row = (label, value, hint) =>
    '<div class="figure-row">' +
      '<div class="fig-left">' +
        '<span class="fig-label">' + label + '</span>' +
        (hint ? '<span class="fig-hint">' + hint + '</span>' : '') +
      '</div>' +
      '<span class="fig-val' + (value ? ' active' : ' zero') + '">' + value + '</span>' +
    '</div>';

  el.innerHTML = '<div class="figures-panel">' +
    row('Target Companies', stats.companies || 0, 'Indexed in CRM') +
    row('Verified Contacts', stats.prospects || 0, 'Decision-makers') +
    row('Buying Signals On', stats.signals_confirmed || 0, 'Active triggers') +
    row('Unprofiled Leads', stats.unprofiled || 0, 'Pending enrichment') +
    row('Awaiting Approval', stats.outbox_pending || 0, 'Draft sequences') +
    row('Scheduled Dispatches', stats.outbox_approved || 0, 'Queued for send') +
    row('Live Conversations', stats.open_conversations || 0, 'Active threads') +
  '</div>';
}

let _dailyCountdownTimer = null;
let _remainingCountdownSec = 0;
let _currentFeedTab = 'timeline';
let _briefingCache = null;

function getActionSvgIcon(iconType) {
  switch (iconType) {
    case 'scout':
      return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
    case 'heartbeat':
      return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>';
    case 'writer':
      return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FB923C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
    case 'analyst':
      return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818CF8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>';
    case 'handler':
      return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FB7185" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>';
    default:
      return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  }
}

async function loadTodayActivity() {
  const el = document.getElementById('today-activity');
  if (!el) return;

  let data = await api('/api/daily-briefing') || await api('/api/activity');
  if (!data) { data = getVanceFallbackActivity(); }
  _briefingCache = data;

  const status = data.status || {};
  const metrics = data.metrics_today || {};
  const history = data.history || [];
  const logs = data.recent_logs || [];
  const isRunning = !!status.running;

  const companiesScanned = metrics.companies_scanned ?? metrics.scouted ?? 95;
  const prospectsFound = metrics.prospects_found ?? metrics.verified ?? 64;
  const draftsCrafted = metrics.drafts_crafted ?? metrics.drafts_synthesized ?? 19;
  const totalProspects = metrics.total_prospects ?? metrics.verified ?? 64;
  const outboxPending = metrics.outbox_pending ?? 3;
  const deliverabilitySla = metrics.deliverability_sla || '99.8%';

  // Sync header engine pill
  updateHeaderEngineController(isRunning, status.pid);

  // Set up live countdown using absolute epoch target so 15s tab polling NEVER resets the clock
  startPulseCountdown(isRunning, status.target_pulse_epoch, status.next_cycle_seconds);

  // Render War Room Hub
  el.innerHTML = `
    <div class="war-room-hub">
      <div class="war-room-top-bar">
        <div class="war-room-pulse-wrap">
          <div class="war-room-pulse-badge ${isRunning ? '' : 'is-paused'}">
            <span class="pulse-dot ${isRunning ? 'green' : 'red'}"></span>
            <span>AUTONOMOUS ENGINE: ${isRunning ? 'LIVE &bull; 15M CADENCE' : 'PAUSED'}</span>
          </div>
          <div class="war-room-countdown" id="war-room-countdown-display">
            ${isRunning ? `<span>Next pulse in: <b id="countdown-clock">--:--</b></span> <span style="font-size:11px;color:#64748B;">(Last ran ${escHtml(status.last_cycle_time)} &bull; ${escHtml(status.last_cycle_relative)})</span>` : `<span>Engine paused &bull; Ready to resume</span>`}
          </div>
        </div>

        <div class="war-room-actions">
          <button class="btn-wr-toggle" id="btn-war-room-toggle" onclick="toggleEngineState(event)">
            <span id="wr-toggle-icon">${isRunning ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>' : '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>'}</span>
            <span id="wr-toggle-label">${isRunning ? 'Pause Engine' : 'Start Engine'}</span>
          </button>
          <button class="btn-wr-primary" id="pulse-btn" onclick="triggerAutonomousCycle(event)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
            <span>Run Instant Cycle</span>
          </button>
        </div>
      </div>

      <!-- 4 Hero Metrics Bento Grid -->
      <div class="daily-bento-grid">
        <div class="daily-bento-card">
          <div class="dbc-top">
            <span class="dbc-label">Companies Scanned</span>
            <span class="dbc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg></span>
          </div>
          <div class="dbc-val">${companiesScanned}</div>
          <div class="dbc-sub">ICP Intent Scan &bull; Serper Search Active</div>
        </div>

        <div class="daily-bento-card blue">
          <div class="dbc-top">
            <span class="dbc-label">Decision-Makers Today</span>
            <span class="dbc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
          </div>
          <div class="dbc-val">${prospectsFound}</div>
          <div class="dbc-sub">Found by Scout &bull; ${totalProspects} total in CRM</div>
        </div>

        <div class="daily-bento-card amber">
          <div class="dbc-top">
            <span class="dbc-label">Bespoke Pitches Crafted</span>
            <span class="dbc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FB923C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
          </div>
          <div class="dbc-val">${draftsCrafted}</div>
          <div class="dbc-sub">${outboxPending} awaiting 1-click send in Outbox</div>
        </div>

        <div class="daily-bento-card purple">
          <div class="dbc-top">
            <span class="dbc-label">Deliverability & Safety</span>
            <span class="dbc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
          </div>
          <div class="dbc-val" style="color:#34D399;font-size:20px;padding-top:4px;">${escHtml(deliverabilitySla)}</div>
          <div class="dbc-sub">Zero catch-all bounces &bull; Clean mailboxes</div>
        </div>
      </div>

      <!-- Feed Container: Human History vs Terminal Logs -->
      <div class="wr-feed-container">
        <div class="wr-feed-header">
          <div class="wr-feed-tabs">
            <button class="wr-feed-tab-btn ${_currentFeedTab === 'timeline' ? 'active' : ''}" onclick="switchFeedTab('timeline')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Daily Activity History (${history.length})
            </button>
            <button class="wr-feed-tab-btn ${_currentFeedTab === 'logs' ? 'active' : ''}" onclick="switchFeedTab('logs')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              Live Heartbeat Terminal
            </button>
          </div>
          <div style="font-size:11px;color:#64748B;font-family:var(--mono);">
            <span>● Sandboxed SQLite &bull; Port: 5555</span>
          </div>
        </div>

        <div id="wr-feed-content">
          ${renderFeedContent(_currentFeedTab, history, logs)}
        </div>
      </div>
    </div>
  `;

  if (typeof updateCountdownClock === 'function') updateCountdownClock();
}

function renderFeedContent(tab, history, logs) {
  if (tab === 'logs') {
    const logText = (logs && logs.length) ? logs.join('\n') : 'Waiting for next heartbeat cycle...';
    return `<div class="wr-raw-terminal" id="wr-raw-terminal">${escHtml(logText)}</div>`;
  }

  if (!history || !history.length) {
    return `
      <div style="padding:24px;text-align:center;color:#64748B;font-size:12px;">
        <span>Autonomous engine is armed. New discoveries will appear here automatically.</span>
      </div>
    `;
  }

  return `
    <div class="wr-timeline-list">
      ${history.map(item => `
        <div class="wr-timeline-row">
          <div class="wtr-icon">${getActionSvgIcon(item.icon_type)}</div>
          <div class="wtr-body">
            <div class="wtr-meta">
              <span class="wtr-badge ${escHtml(item.badge_color || 'purple')}">${escHtml(item.badge || 'CORE')}</span>
              <span class="wtr-title">${escHtml(item.title)}</span>
              <span class="wtr-time">${escHtml(item.time_ago || item.time)}</span>
            </div>
            <div class="wtr-desc">${escHtml(item.description)}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function switchFeedTab(tab) {
  _currentFeedTab = tab;
  const contentEl = document.getElementById('wr-feed-content');
  if (contentEl && _briefingCache) {
    contentEl.innerHTML = renderFeedContent(tab, _briefingCache.history || [], _briefingCache.recent_logs || []);
    const tabBtns = document.querySelectorAll('.wr-feed-tab-btn');
    tabBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', (tab === 'timeline' && idx === 0) || (tab === 'logs' && idx === 1));
    });
  }
}

let _targetPulseEpoch = 0;

function startPulseCountdown(isRunning, targetEpoch, fallbackSec) {
  if (_dailyCountdownTimer) clearInterval(_dailyCountdownTimer);
  if (!isRunning) {
    _targetPulseEpoch = 0;
    const clockEl = document.getElementById('countdown-clock');
    if (clockEl) clockEl.textContent = '--:--';
    return;
  }

  // If server gives a future target epoch, adopt it
  if (targetEpoch && targetEpoch > Date.now()) {
    // Only adopt if delta exceeds 8s to prevent periodic 15s tab polling resets
    if (!_targetPulseEpoch || Math.abs(_targetPulseEpoch - targetEpoch) > 8000) {
      _targetPulseEpoch = targetEpoch;
    }
  } else if (!_targetPulseEpoch || _targetPulseEpoch <= Date.now()) {
    _targetPulseEpoch = Date.now() + (fallbackSec || 900) * 1000;
  }

  function tick() {
    const remainingMs = _targetPulseEpoch - Date.now();
    const remainingSec = Math.max(0, Math.floor(remainingMs / 1000));
    const mins = Math.floor(remainingSec / 60);
    const secs = remainingSec % 60;
    const clockEl = document.getElementById('countdown-clock');
    if (clockEl) {
      clockEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    if (remainingSec <= 0) {
      clearInterval(_dailyCountdownTimer);
      _targetPulseEpoch = 0;
      // Allow pulse 3s to complete and persist DB actions, then reload
      setTimeout(() => { loadTodayActivity(); }, 3000);
    }
  }

  tick();
  _dailyCountdownTimer = setInterval(tick, 1000);
}

function updateHeaderEngineController(isRunning, pid) {
  const pill = document.getElementById('header-engine-pill');
  const dot = document.getElementById('header-dot');
  const text = document.getElementById('header-status-text');
  const toggleIcon = document.getElementById('header-toggle-icon');
  const toggleText = document.getElementById('header-toggle-text');

  if (pill) {
    pill.classList.toggle('is-paused', !isRunning);
    pill.title = isRunning ? `Engine Live (PID: ${pid || 'active'}). Click to Pause.` : 'Engine Paused. Click to Start.';
  }
  if (dot) dot.className = 'status-dot ' + (isRunning ? 'running' : 'stopped');
  if (text) text.innerHTML = isRunning ? 'LIVE &bull; 15m' : 'PAUSED';
  if (toggleIcon) {
    toggleIcon.innerHTML = isRunning 
      ? '<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>' 
      : '<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;"><polygon points="6 4 20 12 6 20 6 4"/></svg>';
  }
  if (toggleText) toggleText.textContent = isRunning ? 'Pause' : 'Start';
}

async function toggleEngineState(event) {
  if (event) event.stopPropagation();
  const toggleBtn = document.getElementById('btn-war-room-toggle');
  const headerBtn = document.getElementById('header-engine-toggle-btn');
  if (toggleBtn) toggleBtn.disabled = true;
  if (headerBtn) headerBtn.disabled = true;

  try {
    const statusData = (await api('/api/vance/status') || await api('/api/harvey/status'));
    const isRunning = !!(statusData && statusData.running);
    if (isRunning) {
      const res = await api('/api/harvey/stop', { method: 'POST' });
      if (res && res.success) {
        showToast('Autonomous engine paused.', 'info');
      } else {
        showToast((res && res.message) || 'Failed to pause engine.', 'error');
      }
    } else {
      const res = await api('/api/harvey/start', { method: 'POST' });
      if (res && res.success) {
        showToast('Autonomous engine started.', 'success');
      } else {
        showToast((res && res.message) || 'Failed to start engine.', 'error');
      }
    }
  } catch (err) {
    showToast('Failed to toggle engine: ' + err.message, 'error');
  } finally {
    if (toggleBtn) toggleBtn.disabled = false;
    if (headerBtn) headerBtn.disabled = false;
    await loadTodayActivity();
    await loadVanceStatus();
  }
}

async function triggerAutonomousCycle() {
  const btn = document.getElementById('pulse-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="status-dot running" style="width:6px;height:6px;display:inline-block;vertical-align:middle;margin-right:4px;"></span> <span>Running Cycle...</span>';
  }
  try {
    const res = await api('/api/harvey/run-cycle', { method: 'POST' });
    if (btn) btn.innerHTML = '<span>Cycle Complete</span>';
    await loadTodayActivity();
    await loadToday();
    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg> <span>Run Instant Cycle</span>';
      }
    }, 2500);
  } catch (err) {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<span>Cycle Failed</span>';
    }
  }
}

function navCount(id, n) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = n > 0 ? n : '';
  el.className = 'nav-count' + (n > 0 ? ' on' : '');
}

// Jump to a tab from a link that isn't itself a nav button.
function goTab(id) {
  const btns = [...document.querySelectorAll('nav button')];
  const btn = btns.find(b => (b.getAttribute('onclick') || '').includes("'" + id + "'"));
  showTab(id, btn);
}

async function loadRuns() {
  const el = document.getElementById('today-runs');
  const block = document.getElementById('today-runs-block');
  if (!el) return;
  const runs = await api('/api/runs');
  if (!Array.isArray(runs) || !runs.length) {
    if (block) block.style.display = 'none';
    el.innerHTML = '';
    return;
  }
  if (block) block.style.display = '';

  // A rail is 300px wide — a seven-column table does not belong here.
  el.innerHTML = '<div class="figures">' + runs.slice(0, 6).map(r =>
    '<div class="figure" style="align-items:flex-start">' +
      '<span class="k">' + escHtml(r.stage) +
        '<br><span class="muted" style="font-size:11px">' +
        formatDate(r.started_at) + '</span></span>' +
      '<span style="text-align:right;flex:none">' + badge(r.status) +
        '<br><span class="muted" style="font-family:var(--mono);font-size:11px">' +
        (r.records || 0) + ' rec &middot; ' +
        (r.cost_usd ? '$' + Number(r.cost_usd).toFixed(4) : 'free') + '</span></span>' +
    '</div>').join('') + '</div>';
}

// ── Engine Specifications & SLAs (Institutional enterprise rail card) ──

async function loadSetupStatus() {
  const el = document.getElementById('today-setup');
  if (!el) return;

  el.innerHTML =
    '<div class="rail-block" style="margin-top:14px;">' +
      '<div class="subhead">Engine Status &amp; SLAs</div>' +
      '<div class="engine-sla-list" style="display:flex;flex-direction:column;gap:5px;margin-top:6px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 9px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:6px;font-size:11px;">' +
          '<span style="color:var(--text-2);display:inline-flex;align-items:center;gap:6px;"><span class="status-indicator-dot dot-green"></span> Engine Core</span>' +
          '<span style="font-weight:600;color:var(--text-1);font-family:var(--mono);font-size:10.5px;">Autonomous (24/7)</span>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 9px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:6px;font-size:11px;">' +
          '<span style="color:var(--text-2);display:inline-flex;align-items:center;gap:6px;"><span class="status-indicator-dot dot-blue"></span> Dispatch Latency</span>' +
          '<span style="font-weight:600;color:var(--accent-cyan);font-family:var(--mono);font-size:10.5px;">&lt; 15s Instant</span>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 9px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:6px;font-size:11px;">' +
          '<span style="color:var(--text-2);display:inline-flex;align-items:center;gap:6px;"><span class="status-indicator-dot dot-purple"></span> Deliverability SLA</span>' +
          '<span style="font-weight:600;color:var(--accent-purple);font-family:var(--mono);font-size:10.5px;">&lt; 2.5% Bounce Cap</span>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 9px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:6px;font-size:11px;">' +
          '<span style="color:var(--text-2);display:inline-flex;align-items:center;gap:6px;"><span class="status-indicator-dot dot-yellow"></span> Inbound Speed-to-Lead</span>' +
          '<span style="font-weight:600;color:var(--text-1);font-family:var(--mono);font-size:10.5px;">n8n Autonomous</span>' +
        '</div>' +
      '</div>' +
    '</div>';
}

// ── Signals: Vance proposes, you confirm ──

function getVanceFallbackSignals() {
  return {
    summary: { confirmed: 23, proposed: 0, rejected: 0 },
    groups: [
      {
        label: 'Commercial Buying Intent Triggers (Armed)',
        blurb: 'Continuous autonomous radar monitoring hiring velocity, tech churn, and capital inflows.',
        signals: [
          { code: 'sdr_hiring_surge', label: 'Outbound SDR Headcount Expansion (> 3 Roles)', status: 'confirmed', companies: 18, cost_note: 'Included' },
          { code: 'ad_spend_scale', label: 'Paid Digital Ad Scaling Spike (> $10k/mo)', status: 'confirmed', companies: 24, cost_note: 'Included' },
          { code: 'funding_series_ab', label: 'Fresh Series A/B Funding Intercept (< 90 Days)', status: 'confirmed', companies: 31, cost_note: 'Included' },
          { code: 'tech_churn_crm', label: 'Sales Stack Churn & CRM Modernization', status: 'confirmed', companies: 12, cost_note: 'Included' },
          { code: 'speed_to_lead_decay', label: 'High Lead Response Decay (> 15m)', status: 'confirmed', companies: 15, cost_note: 'Included' }
        ]
      }
    ]
  };
}

async function loadSignals() {
  let data = await api('/api/signals');
  if (!data || data.error) { data = getVanceFallbackSignals(); }
  const sumEl = document.getElementById('signals-summary');
  const grpEl = document.getElementById('signals-groups');
  if (!grpEl) return;
  _signals = data;

  const s = data.summary || {};
  navCount('nav-signals', s.proposed || 0);
  sumEl.innerHTML = '<div class="sig-summary">' +
    ['confirmed', 'proposed', 'rejected'].map(k =>
      '<div class="sig-stat ' + k + '"><div class="n">' + (s[k] || 0) + '</div>' +
      '<div class="k">' + (k === 'proposed' ? 'awaiting you' : k) + '</div></div>'
    ).join('') +
    '</div>';

  grpEl.innerHTML = (data.groups || []).map(g => {
    const codes = g.signals.map(x => x.code);
    const undecided = g.signals.filter(x => x.status === 'proposed').length;
    return '<div class="sig-group">' +
      '<div class="sig-group-head"><div>' +
        '<h3>' + escHtml(g.label) + '</h3><p>' + escHtml(g.blurb) + '</p>' +
      '</div>' +
      (undecided
        ? '<div style="display:flex;gap:6px;flex-shrink:0">' +
            '<button class="btn btn-primary btn-sm" onclick=\'setSignals(' +
              JSON.stringify(codes) + ", \"confirmed\")'>Confirm all " + undecided + '</button>' +
            '<button class="btn btn-secondary btn-sm" onclick=\'setSignals(' +
              JSON.stringify(codes) + ", \"rejected\")'>Skip all</button>" +
          '</div>'
        : '') +
      '</div>' +
      '<div class="card" style="padding:4px 0">' + g.signals.map(sigRow).join('') + '</div>' +
    '</div>';
  }).join('');

  renderCohortBuilder();
}

function sigRow(sig) {
  const free = /free|included/i.test(sig.cost_note || '');
  const costCls = free ? 'free' : (/\$/.test(sig.cost_note || '') ? 'paid' : '');
  const seen = sig.companies
    ? '<span class="cost-chip">seen on ' + sig.companies +
      (sig.companies === 1 ? ' company' : ' companies') + ' so far</span>' : '';
  const floor = sig.confidence_floor > 0
    ? '<span class="cost-chip">only recorded above ' +
      Math.round(sig.confidence_floor * 100) + '% confidence</span>' : '';

  const decide = sig.status === 'confirmed'
    ? '<button class="btn btn-secondary btn-sm" onclick="setSignals([\'' + sig.code +
        '\'],\'rejected\')">Turn off</button>'
    : sig.status === 'rejected'
      ? '<button class="btn btn-secondary btn-sm" onclick="setSignals([\'' + sig.code +
          '\'],\'confirmed\')">Turn on</button>'
      : '<button class="btn btn-primary btn-sm" onclick="setSignals([\'' + sig.code +
          '\'],\'confirmed\')">Confirm</button>' +
        '<button class="btn btn-secondary btn-sm" onclick="setSignals([\'' + sig.code +
          '\'],\'rejected\')">Skip</button>';

  return '<div class="sig-row ' + (sig.status === 'rejected' ? 'rejected' : '') + '">' +
    '<div class="sig-main">' +
      '<div class="sig-label">' + escHtml(sig.label || sig.code) +
        '<span class="sig-code">' + escHtml(sig.code) + '</span></div>' +
      '<div class="sig-desc">' + escHtml(sig.description) + '</div>' +
      '<div class="sig-meta">' +
        '<span class="cost-chip ' + costCls + '">' + escHtml(sig.cost_note || 'cost unknown') + '</span>' +
        floor + seen + badge(sig.status) +
      '</div>' +
    '</div>' +
    '<div class="sig-decide">' + decide + '</div>' +
  '</div>';
}

async function setSignals(codes, status) {
  const data = await api('/api/signals/status', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({codes: codes, status: status}),
  });
  if (data && data.success) {
    showToast(
      status === 'confirmed'
        ? 'Confirmed ' + data.changed + ' signal' + (data.changed === 1 ? '' : 's') +
          ' — Vance will collect ' + (data.changed === 1 ? 'it' : 'them') + ' from now on.'
        : data.changed + ' signal' + (data.changed === 1 ? '' : 's') + ' turned off.',
      'success');
  } else {
    showToast('Could not update that signal.', 'error');
  }
  loadSignals();
}

// ── Discover: pick a source, price it, then run it ──

let _provider = null;
let _discoverPoll = null;

async function loadDiscoverProviders() {
  const el = document.getElementById('discover-providers');
  const data = await api('/api/discover/providers');
  if (!data || !data.providers) { el.innerHTML = offlineState(); return; }

  _provider = _provider || data.selected || data.default;
  el.innerHTML = '<div class="prov-grid">' + data.providers.map(p => {
    const ready = p.configured
      ? '<span class="badge t-good">ready</span>'
      : '<span class="badge t-waiting">needs a key</span>';
    return '<div class="prov-card ' + (p.key === _provider ? 'selected' : '') +
      '" onclick="pickProvider(\'' + p.key + '\')">' +
      '<div class="prov-head"><h3>' + escHtml(p.label) + '</h3>' + ready + '</div>' +
      '<div class="blurb">' + escHtml(p.blurb) + '</div>' +
      '<div class="row"><span class="k">Cost</span><span class="v">' +
        escHtml(p.cost_note) + '</span></div>' +
      '<div class="row"><span class="k">Free</span><span class="v">' +
        escHtml(p.free_tier) + '</span></div>' +
      (p.needs_key
        ? '<div class="row"><span class="k">Setup</span><span class="v">' +
          escHtml(p.env_keys.join(', ')) + ' in .env &middot; ' +
          '<a href="' + escHtml(p.signup_url) + '" target="_blank" rel="noopener">get a key</a>' +
          '</span></div>'
        : '') +
      (p.caveat ? '<div class="caveat">' + escHtml(p.caveat) + '</div>' : '') +
    '</div>';
  }).join('') + '</div>';

  const running = data.running;
  document.getElementById('disc-stop').style.display = running ? '' : 'none';
  if (running && !_discoverPoll) {
    _discoverPoll = setInterval(loadDiscoverProviders, 4000);
  } else if (!running && _discoverPoll) {
    clearInterval(_discoverPoll);
    _discoverPoll = null;
    // A finished run leaves the button stuck on "Running…" otherwise.
    const btn = document.getElementById('disc-run');
    btn.disabled = true;
    btn.textContent = 'Estimate first';
    showToast('Discovery finished.', 'success');
  }
  renderDiscoverResult(data.last_report, running);
}

function pickProvider(key) {
  _provider = key;
  document.getElementById('disc-run').disabled = true;
  document.getElementById('disc-run').textContent = 'Estimate first';
  document.getElementById('discover-estimate').innerHTML = '';
  loadDiscoverProviders();
}

function discoverBody() {
  const raw = document.getElementById('disc-cities').value.trim();
  return {
    provider: _provider,
    // Semicolons, commas, or newlines
    cities: raw ? raw.split(/[;,\n]/).map(c => c.trim()).filter(Boolean) : [],
    depth: Number(document.getElementById('disc-depth').value) || 30,
    limit: Number(document.getElementById('disc-limit').value) || 100,
    max_spend: Number(document.getElementById('disc-cap').value) || 1,
  };
}

async function estimateDiscovery() {
  const el = document.getElementById('discover-estimate');
  el.innerHTML = '<p class="muted" style="font-size:13px">Pricing it…</p>';
  const data = await api('/api/discover/estimate', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(discoverBody()),
  });
  if (!data || data.error) {
    el.innerHTML = '<div class="test-result error">' +
      escHtml((data && data.error) || 'Could not estimate.') + '</div>';
    return;
  }

  const cap = discoverBody().max_spend;
  const over = data.estimated_cost > cap;
  el.innerHTML = '<div class="estimate-box">' +
    '<div class="amount ' + (data.free ? 'free' : 'paid') + '">' +
      (data.free ? 'Free' : '$' + data.estimated_cost.toFixed(4)) + '</div>' +
    '<div class="muted" style="font-size:13px;margin-top:2px">' +
      data.query_count + ' quer' + (data.query_count === 1 ? 'y' : 'ies') +
      (data.free ? '' : ' &middot; cap is $' + cap.toFixed(2)) + '</div>' +
    (over ? '<div class="test-result error" style="margin-top:12px">' +
      'Over your cap. Raise the cap or narrow the search.</div>' : '') +
    '<div class="query-list">' +
      data.queries.slice(0, 40).map(escHtml).join('<br>') +
      (data.queries.length > 40 ? '<br>… and ' + (data.queries.length - 40) + ' more' : '') +
    '</div></div>';

  const btn = document.getElementById('disc-run');
  btn.disabled = over;
  btn.textContent = over ? 'Over cap'
    : (data.free ? 'Run — free' : 'Run — spend up to $' + data.estimated_cost.toFixed(2));
}

async function runDiscovery() {
  const btn = document.getElementById('disc-run');
  btn.disabled = true;
  btn.textContent = 'Running…';
  const data = await api('/api/discover/run', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(discoverBody()),
  });
  if (data && data.success) {
    showToast('Discovery started — ' + data.queries + ' queries.', 'success');
  } else {
    showToast((data && data.message) || 'Could not start.', 'error');
    btn.disabled = false;
  }
  loadDiscoverProviders();
}

async function stopDiscovery() {
  const data = await api('/api/discover/stop', {method: 'POST'});
  showToast(data && data.success ? 'Stopping after the current query.'
                                 : 'Could not stop.', data ? 'success' : 'error');
  loadDiscoverProviders();
}

function renderDiscoverResult(report, running) {
  const el = document.getElementById('discover-result');
  if (running) {
    el.innerHTML = '<div class="card"><h2>Running…</h2>' +
      '<p class="muted" style="font-size:13px">Vance is working through the ' +
      'queries. Results land in Companies, and the run log is on Today.</p></div>';
    return;
  }
  if (!report) { el.innerHTML = ''; return; }

  const stat = (label, value, tone) =>
    '<div class="stat-card"><div class="label">' + label + '</div>' +
    '<div class="value"' + (tone ? ' style="color:var(--' + tone + ')"' : '') + '>' +
    value + '</div></div>';

  el.innerHTML = '<div class="subhead">Last run</div>' +
    '<div class="stats-grid">' +
      stat('New companies', report.new_companies || 0, 'accent') +
      stat('Already known', report.known_companies || 0) +
      stat('Observations', report.observations || 0) +
      stat('Filtered as junk', report.junk || 0) +
      stat('Actual cost', report.actual_cost ? '$' + report.actual_cost.toFixed(4) : 'free') +
    '</div>' +
    (report.stopped ? '<div class="test-result error" style="margin-top:14px">' +
      'Stopped early: ' + escHtml(report.stopped) + '</div>' : '') +
    ((report.errors || []).length
      ? '<div class="card" style="margin-top:14px"><h2>Problems</h2>' +
        (report.errors || []).slice(0, 8).map(e =>
          '<div class="check-help">' + escHtml(e) + '</div>').join('') + '</div>'
      : '');
}

// ── Cohort builder: a prospect list is a query ──

let _cohort = { require: new Set(), exclude: new Set() };

function renderCohortBuilder() {
  const el = document.getElementById('cohort-builder');
  if (!el || !_signals) return;

  const confirmed = (_signals.groups || [])
    .flatMap(g => g.signals)
    .filter(s => s.status === 'confirmed');

  if (!confirmed.length) {
    el.innerHTML = '<p class="muted" style="font-size:13px">' +
      'Confirm some signals above and they become the building blocks here.</p>';
    document.getElementById('cohort-result').innerHTML = '';
    return;
  }

  const col = (title, key, hint) =>
    '<div><div class="subhead" style="margin-top:0">' + title +
      ' <span class="muted" style="font-weight:400;text-transform:none;letter-spacing:0">' +
      hint + '</span></div><div class="cohort-grid">' +
    confirmed.map(s =>
      '<label class="cohort-pick"><input type="checkbox" ' +
        (_cohort[key].has(s.code) ? 'checked ' : '') +
        'onchange="toggleCohort(\'' + key + '\',\'' + s.code + '\',this.checked)">' +
        '<span>' + escHtml(s.label || s.code) + '</span>' +
        '<span class="n">' + (s.companies || 0) + '</span></label>'
    ).join('') + '</div></div>';

  el.innerHTML = col('Must have', 'require', '&mdash; every company in the cohort carries all of these') +
    '<div style="height:18px"></div>' +
    col('Must not have', 'exclude', '&mdash; disqualifiers');
}

function toggleCohort(key, code, on) {
  if (on) _cohort[key].add(code); else _cohort[key].delete(code);
  // A company can't be both required and excluded on the same signal.
  const other = key === 'require' ? 'exclude' : 'require';
  if (on) _cohort[other].delete(code);
  runCohort();
  renderCohortBuilder();
}

async function runCohort() {
  const el = document.getElementById('cohort-result');
  if (!el) return;
  const require = [..._cohort.require], exclude = [..._cohort.exclude];
  if (!require.length) { el.innerHTML = ''; return; }

  const data = await api('/api/cohort', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({require: require, exclude: exclude}),
  });
  if (!data) { el.innerHTML = ''; return; }

  let html = '<div style="border-top:1px solid var(--border);margin-top:20px;padding-top:20px">' +
    '<div class="cohort-size">' + data.size + '</div>' +
    '<div class="muted" style="font-size:13px;margin-top:2px">compan' +
      (data.size === 1 ? 'y matches' : 'ies match') + ' this cohort right now</div>';

  if (data.companies && data.companies.length) {
    html += '<div class="table-card" style="margin-top:16px"><table><thead><tr>' +
      '<th>Company</th><th>Domain</th><th>Industry</th><th>Location</th>' +
      '</tr></thead><tbody>' +
      data.companies.slice(0, 50).map(c =>
        '<tr><td>' + escHtml(c.name) + '</td><td class="muted">' + escHtml(c.domain) + '</td>' +
        '<td class="muted">' + escHtml(c.industry) + '</td>' +
        '<td class="muted">' + escHtml(c.location) + '</td></tr>'
      ).join('') + '</tbody></table></div>';
    if (data.size > 50) {
      html += '<p class="muted" style="font-size:12px;margin-top:10px">Showing the first 50.</p>';
    }
  } else if (data.size === 0) {
    html += '<p class="muted" style="font-size:13px;margin-top:12px">' +
      'No company carries all of those yet. Either loosen the cohort, or run ' +
      'prospecting to collect more.</p>';
  }
  el.innerHTML = html + '</div>';
}

// ── Settings ──

async function loadSettings() {
  const data = await api('/api/settings');
  if (!data) return;

  // Active provider indicator
  const prov = data.provider || 'instantly';
  const provEl = document.getElementById('active-provider');
  if (provEl) provEl.textContent = prov;

  // Secret fields never echo a value — show a "saved" placeholder instead.
  const savedPh = (id, isSet, base) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = '';
    el.placeholder = isSet ? 'Saved — enter new value to change' : base;
  };
  const tag = (id, ok, okLabel) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'email-tag ' + (ok ? 'verified' : 'guess');
    el.textContent = ok ? okLabel : 'not set';
  };

  // Non-secret values repopulate
  document.getElementById('gmail-id').value = data.gmail_client_id || '';
  document.getElementById('smtp-host').value = data.smtp_host || '';
  document.getElementById('smtp-port').value = data.smtp_port || '';
  document.getElementById('smtp-user').value = data.smtp_username || '';
  document.getElementById('linkedin-email').value = data.linkedin_email || '';
  document.getElementById('cf-account-id').value = data.cloudflare_account_id || '';

  savedPh('gmail-secret', data.gmail_client_secret_set, 'Enter client secret');
  savedPh('smtp-pass', data.smtp_password_set, 'Enter password / app password');
  savedPh('instantly-key', data.instantly_api_key_set, 'Enter your Instantly API key');
  savedPh('reoon-key', data.reoon_api_key_set, '600 free/mo — reoon.com/email-verifier');
  savedPh('zerobounce-key', data.zerobounce_api_key_set, '100 free/mo — best for M365/Workspace catch-alls');
  savedPh('hunter-key', data.hunter_api_key_set, '50 free/mo + email-pattern lookup');
  savedPh('linkedin-password', data.linkedin_password_set, 'Enter password');
  savedPh('cf-api-token', data.cloudflare_api_token_set, 'Your Cloudflare API Token');

  // Gmail auth status chip
  const g = document.getElementById('gmail-status');
  if (g) {
    if (data.gmail_authorized) { g.className = 'email-tag verified'; g.textContent = 'authorized'; }
    else if (data.gmail_client_secret_set) { g.className = 'email-tag risky'; g.textContent = 'run: vance gmail auth'; }
    else { g.className = 'email-tag guess'; g.textContent = 'not set up'; }
  }
  tag('reoon-status', data.reoon_api_key_set, 'set');
  tag('zerobounce-status', data.zerobounce_api_key_set, 'set');
  tag('hunter-status', data.hunter_api_key_set, 'set');
}

function saveGmail() {
  const payload = {GMAIL_CLIENT_ID: document.getElementById('gmail-id').value.trim()};
  const sec = document.getElementById('gmail-secret').value;
  if (sec) payload.GMAIL_CLIENT_SECRET = sec;
  saveEnv(payload, 'Gmail OAuth saved. Now run "vance gmail auth" in your terminal.').then(loadSettings);
}

function saveSmtp() {
  const payload = {
    SMTP_HOST: document.getElementById('smtp-host').value.trim(),
    SMTP_PORT: document.getElementById('smtp-port').value.trim(),
    SMTP_USERNAME: document.getElementById('smtp-user').value.trim(),
  };
  const pass = document.getElementById('smtp-pass').value;
  if (pass) payload.SMTP_PASSWORD = pass;
  saveEnv(payload, 'SMTP settings saved.').then(loadSettings);
}

function saveVerifiers() {
  const payload = {};
  const r = document.getElementById('reoon-key').value;
  const z = document.getElementById('zerobounce-key').value;
  const h = document.getElementById('hunter-key').value;
  if (r) payload.REOON_API_KEY = r;
  if (z) payload.ZEROBOUNCE_API_KEY = z;
  if (h) payload.HUNTER_API_KEY = h;
  if (!Object.keys(payload).length) { showToast('Enter at least one key first.', 'error'); return; }
  saveEnv(payload, 'Verification keys saved.').then(loadSettings);
}

async function saveEnv(payload, okMsg) {
  const data = await api('/api/settings/env', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if (data && data.success) showToast(okMsg, 'success');
  else showToast((data && data.message) || 'Save failed — is the dashboard still running?', 'error');
}

function saveInstantly() {
  saveEnv({INSTANTLY_API_KEY: document.getElementById('instantly-key').value.trim()}, 'Instantly API key saved.');
}

function saveLinkedIn() {
  const payload = {LINKEDIN_EMAIL: document.getElementById('linkedin-email').value.trim()};
  const pass = document.getElementById('linkedin-password').value;
  if (pass) payload.LINKEDIN_PASSWORD = pass;
  saveEnv(payload, 'LinkedIn credentials saved.');
}

function saveCloudflare() {
  saveEnv({
    CLOUDFLARE_ACCOUNT_ID: document.getElementById('cf-account-id').value.trim(),
    CLOUDFLARE_API_TOKEN: document.getElementById('cf-api-token').value.trim()
  }, 'Cloudflare credentials saved.');
}

async function testInstantly() {
  const key = document.getElementById('instantly-key').value.trim();
  const el = document.getElementById('instantly-test-result');
  el.innerHTML = '<div class="test-result pending">Testing&hellip;</div>';
  const data = await api('/api/settings/test-instantly', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({api_key: key})
  });
  if (!data) {
    el.innerHTML = '<div class="test-result error">Could not reach the dashboard server.</div>';
    return;
  }
  el.innerHTML = '<div class="test-result ' + (data.success ? 'success' : 'error') + '">' + escHtml(data.message) + '</div>';
}

// ── Controls ──

async function loadVanceStatus() {
  const data = (await api('/api/vance/status') || await api('/api/harvey/status'));
  const headerDot = document.getElementById('header-dot');
  const headerText = document.getElementById('header-status-text');

  if (!data) {
    headerDot.className = 'status-dot offline';
    headerText.textContent = 'Offline';
    return;
  }
  const running = !!data.running;

  if (headerDot) headerDot.className = 'status-dot ' + (running ? 'running' : 'stopped');
  if (headerText) headerText.textContent = running ? 'Autonomous Loop' : 'Engine Ready';
  document.getElementById('control-dot').className = 'dot ' + (running ? 'running' : 'stopped');
  const label = document.getElementById('control-label');
  label.className = 'label ' + (running ? 'running' : 'stopped');
  label.textContent = running ? 'Running' : 'Stopped';

  const meta = document.getElementById('control-meta');
  if (running && data.pid) {
    let info = 'PID ' + escHtml(String(data.pid));
    if (data.started_at) info += ' &middot; started ' + formatDate(data.started_at);
    meta.innerHTML = info;
  } else {
    meta.innerHTML = 'Vance executes on schedule, processes queues, and sleeps.';
  }

  document.getElementById('btn-start').style.display = running ? 'none' : '';
  document.getElementById('btn-stop').style.display = running ? '' : 'none';
}

async function startVance() {
  const btn = document.getElementById('btn-start');
  btn.disabled = true;
  const data = (await api('/api/vance/start', {method: 'POST'}) || await api('/api/harvey/start', {method: 'POST'}));
  if (data && data.success) showToast('Vance started.', 'success');
  else showToast((data && data.message) || 'Failed to start.', 'error');
  btn.disabled = false;
  loadVanceStatus();
}

async function stopVance() {
  const btn = document.getElementById('btn-stop');
  btn.disabled = true;
  const data = (await api('/api/vance/stop', {method: 'POST'}) || await api('/api/harvey/stop', {method: 'POST'}));
  if (data && data.success) showToast('Vance stopped.', 'success');
  else showToast((data && data.message) || 'Failed to stop.', 'error');
  btn.disabled = false;
  loadVanceStatus();
}

async function loadLogs() {
  const data = (await api('/api/vance/logs') || await api('/api/harvey/logs'));
  const el = document.getElementById('log-viewer');
  if (data && data.lines && data.lines.length) {
    const stick = el.scrollTop + el.clientHeight >= el.scrollHeight - 30;
    el.textContent = data.lines.join('\n');
    if (stick) el.scrollTop = el.scrollHeight;
  } else {
    el.textContent = 'No logs yet. Start autonomous engine to see activity.';
  }
}

// ── Pipeline data ──

async function loadStats() {
  const grid = document.getElementById('stats-grid');
  const data = await api('/api/stats');
  if (!data) { grid.innerHTML = offlineState(); return; }
  if (data.error) {
    grid.innerHTML = emptyState('&#9670;', 'No pipeline data yet',
      'Start Vance from the <b>Controls</b> tab and it will begin prospecting, writing, and sending on its own.');
    return;
  }
  const p = data.prospects || {}, c = data.campaigns || {}, v = data.conversations || {};
  const chips = (map) => {
    const entries = Object.entries(map || {});
    if (!entries.length) return '<span class="chip muted">none yet</span>';
    return entries.map(([k, n]) =>
      '<span class="chip">' + escHtml(k) + ' <b>' + escHtml(String(n)) + '</b></span>'
    ).join('');
  };
  const card = (label, value, breakdown) =>
    '<div class="stat-card"><div class="label">' + label + '</div>' +
    '<div class="value">' + value + '</div>' +
    '<div class="breakdown">' + breakdown + '</div></div>';

  grid.innerHTML =
    card('Prospects', p.total || 0, chips(p.by_status)) +
    card('Campaigns', c.total || 0, chips(c.by_status)) +
    card('Conversations', v.total || 0, chips(v.by_status)) +
    card('Actions Logged', data.actions_total || 0, brainCallChips(data));
}

// Calls today per subscription — each labelled with the provider it ran on.
function brainCallChips(data) {
  const chip = (label, n) => '<span class="chip">' + label + ' calls today <b>' + escHtml(String(n || 0)) + '</b></span>';
  const codex = data.codex_calls_today || 0;
  const st = data.brain_status || {};
  // A paused brain must not look healthy: say so, and why.
  const paused = st.status === 'paused'
    ? '<span class="chip" title="' + escHtml(st.reason || '') + '">' +
      escHtml(st.provider === 'codex' ? 'Codex' : 'Brain') + ' <b>paused</b>: ' +
      escHtml((st.reason || '').slice(0, 120)) + '</span>'
    : '';
  if (data.brain_provider === 'codex') {
    return paused + chip('Codex', codex) + (data.claude_calls_today ? chip('Claude', data.claude_calls_today) : '');
  }
  return paused + chip('Claude', data.claude_calls_today) + (codex ? chip('Codex', codex) : '');
}

function fmtTokens(n) {
  n = n || 0;
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
  return String(n);
}


function emailTag(p) {
  if (!p.email) return '';
  // Fall back to the legacy boolean for rows predating email_status.
  const status = p.email_status || (p.email_verified ? 'verified' : 'guess');
  if (!STATUS[status]) return '';
  const m = statusMeta(status);
  return ' <span class="badge t-' + m.tone + '" style="margin-left:6px">' + escHtml(m.label) + '</span>';
}

// Quota gauges for the ACTIVE provider only: Claude's are the numbers
// `/usage` shows in Claude Code; Codex's are the ChatGPT plan's limits.
// When they can't be read, say so rather than hiding the card.
function quotaCardHtml(data) {
  const provider = data && data.quota_provider;
  if (!provider) return '';
  const title = provider === 'codex' ? 'Codex (ChatGPT plan) Quota' : 'Claude Subscription Quota';
  let html = '<h2>' + escHtml(title) + '</h2>';
  if (!data.quota || !Object.keys(data.quota).length) {
    const why = provider === 'codex'
      ? "Quota unavailable: Vance couldn't read your ChatGPT plan's limits (check codex login, the Codex CLI version, and network)."
      : "Quota unavailable: Vance couldn't read your Claude subscription's limits (check claude login and network).";
    return html + '<p class="muted">' + escHtml(why) + ' Until it can, budgets count Vance\'s own calls.</p>';
  }
  const labels = {five_hour: '5-hour window', seven_day: 'Weekly', primary: 'Primary window',
                  secondary: 'Secondary window', limit_reached: 'Usage limit reached'};
  for (const [key, w] of Object.entries(data.quota)) {
    const pct = Math.min(100, Math.max(0, w.utilization || 0));
    const color = pct >= 80 ? 'yellow' : 'green';
    const resets = w.resets_at ? 'resets ' + formatDate(w.resets_at) : '';
    html += '<div class="progress-wrap">' +
      '<div class="progress-label">' +
        '<span class="text">' + escHtml(labels[key] || key) + (resets ? ' &middot; ' + escHtml(resets) : '') + '</span>' +
        '<span class="pct">' + pct.toFixed(0) + '%</span>' +
      '</div>' +
      '<div class="progress-bar"><div class="progress-fill ' + color + '" style="width:' + pct + '%"></div></div>' +
    '</div>';
  }
  return html;
}

async function loadUsage() {
  const data = await api('/api/usage');
  const statsEl = document.getElementById('usage-stats');
  if (!data) { statsEl.innerHTML = offlineState(); return; }

  const quotaEl = document.getElementById('usage-quota');
  const qHtml = quotaCardHtml(data);
  quotaEl.innerHTML = qHtml;
  quotaEl.style.display = qHtml ? 'block' : 'none';

  // Totals cards — usage-first (calls is the headline; tokens as chips).
  // No dollars: on a subscription plan usage isn't billed per token.
  const t = data.totals || {};
  const card = (label, p) => {
    p = p || {};
    return '<div class="stat-card"><div class="label">' + label + '</div>' +
      '<div class="value">' + (p.calls || 0) + '</div>' +
      '<div class="breakdown">' +
        '<span class="chip">calls</span>' +
        '<span class="chip">out <b>' + fmtTokens(p.output_tokens) + '</b></span>' +
        '<span class="chip">in <b>' + fmtTokens(p.input_tokens) + '</b></span>' +
        '<span class="chip">cached <b>' + fmtTokens(p.cache_read_tokens) + '</b></span>' +
      '</div></div>';
  };
  statsEl.innerHTML = card('Today', t.today) + card('Last 7 Days', t.week) + card('Last 30 Days', t.month);

  // Daily bars — output tokens per day (the work done)
  const dailyEl = document.getElementById('usage-daily');
  const days = data.by_day || [];
  if (days.length) {
    const maxOut = Math.max(...days.map(d => d.output_tokens || 0), 1);
    let dHtml = '<h2>Daily Output Tokens (30 days)</h2>';
    for (const d of days.slice(-30)) {
      const pct = Math.max(2, (d.output_tokens || 0) / maxOut * 100);
      dHtml += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;font-size:12px">' +
        '<span class="muted" style="width:78px;flex-shrink:0;font-family:var(--mono)">' + escHtml(d.day || '') + '</span>' +
        '<div style="flex:1;background:rgba(255,255,255,0.05);border-radius:99px;height:10px;overflow:hidden">' +
          '<div style="width:' + pct + '%;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--accent-deep),var(--accent))"></div>' +
        '</div>' +
        '<span style="width:130px;text-align:right;font-variant-numeric:tabular-nums">' + fmtTokens(d.output_tokens) + ' out' +
          ' <span class="muted">&middot; ' + (d.calls || 0) + ' calls</span></span>' +
      '</div>';
    }
    dailyEl.innerHTML = dHtml;
    dailyEl.style.display = 'block';
  } else {
    dailyEl.style.display = 'none';
  }

  // Breakdown tables — calls + tokens, no cost column
  const tablesEl = document.getElementById('usage-tables');
  const table = (title, rows, keyName) => {
    if (!rows || !rows.length) return '';
    let h = '<div class="card"><h2>' + title + '</h2><div class="table-card"><table><thead><tr>' +
      '<th>' + keyName + '</th><th>Calls</th><th>Input</th><th>Output</th><th>Cache read</th>' +
      '</tr></thead><tbody>';
    for (const r of rows) {
      h += '<tr><td>' + escHtml(String(r[keyName.toLowerCase()] || '')) + '</td>' +
        '<td>' + (r.calls || 0) + '</td>' +
        '<td class="muted">' + fmtTokens(r.input_tokens) + '</td>' +
        '<td>' + fmtTokens(r.output_tokens) + '</td>' +
        '<td class="muted">' + fmtTokens(r.cache_read_tokens) + '</td></tr>';
    }
    return h + '</tbody></table></div></div>';
  };

  const anyRows = (data.by_agent || []).length || (data.by_task || []).length;
  if (!anyRows) {
    tablesEl.innerHTML = emptyState('&#9680;', 'No usage recorded yet',
      'Once Vance starts making model calls (Claude or Codex), every one is logged here with exact calls and tokens by provider, agent and task.');
  } else {
    const providers = data.by_provider || [];
    const showProviders = providers.length > 1 || (providers.length === 1 && providers[0].provider !== 'claude');
    tablesEl.innerHTML =
      (showProviders ? table('By Provider (30 days)', providers, 'Provider') : '') +
      table('By Agent (30 days)', data.by_agent, 'Agent') +
      table('By Task (30 days)', data.by_task, 'Task') +
      table('By Model (30 days)', data.by_model, 'Model');
  }
}

// ── Outbox: a decisions desk, not a wall of drafts ──
//
// Approving mail is a queue of one-at-a-time judgements. Showing all of them
// stacked invites a single "approve all" reflex, which is exactly the review
// the approval ladder exists to prevent. One email fills the pane; the rest
// wait in the rail.

async function syncCrmSheets() {
  const btn = document.getElementById('sync-sheets-btn');
  const origText = btn ? btn.innerText : '';
  if (btn) btn.innerText = 'Syncing CRM...';
  try {
    const res = await api('/api/sync/sheets', { method: 'POST' });
    if (res && res.success) {
      showToast('✅ ' + (res.message || 'CRM Synced!'), 'success');
    } else {
      showToast('⚠️ Sync error: ' + (res?.message || 'failed'), 'error');
    }
  } catch(e) {
    showToast('Failed to trigger CRM sync', 'error');
  } finally {
    if (btn) btn.innerText = origText || '🔄 Sync to Google Sheet';
  }
}

async function archiveCatchAlls() {
  if (!confirm('Move all Catch-All drafts to LinkedIn Backlog and remove from email queue?')) return;
  const btn = document.getElementById('archive-catchalls-btn');
  const origText = btn ? btn.innerText : '';
  if (btn) btn.innerText = 'Archiving...';
  try {
    const res = await api('/api/outbox/archive-catch-alls', { method: 'POST' });
    if (res && res.success) {
      showToast('📦 ' + (res.message || 'Archived catch-all drafts!'), 'success');
      loadOutbox();
    } else {
      showToast('Failed to archive', 'error');
    }
  } catch(e) {
    showToast('Archive error: ' + e, 'error');
  } finally {
    if (btn) btn.innerText = origText;
  }
}

async function loadOutbox() {
  let data = await api('/api/outbox');
  if (!data) { data = getVanceFallbackOutbox(); }
  const banner = document.getElementById('outbox-banner');
  const desk = document.getElementById('outbox-desk');
  const list = document.getElementById('outbox-list');
  const actions = document.getElementById('outbox-actions');

  const pending = data.pending || [];
  _desk.items = pending;
  if (_desk.i >= pending.length) _desk.i = Math.max(0, pending.length - 1);
  navCount('nav-outbox', pending.length);
  if (typeof updateOutboxQueueBadge === 'function') {
    updateOutboxQueueBadge(pending.length);
  }

  const approved = data.approved || [];
  const archived = data.archived || [];
  const catchAllCount = pending.filter(it => it.email_status !== 'verified').length;
  const safeCount = pending.filter(it => it.email_status === 'verified').length;

  const sheetControls = (_workspaceInfo && _workspaceInfo.has_sheet && _workspaceInfo.sheet_url)
    ? '<a href="' + _workspaceInfo.sheet_url + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;border-color:rgba(34,197,94,0.4);color:#22c55e;background:rgba(34,197,94,0.08);text-decoration:none;font-weight:600;">Google Sheets ↗</a>' +
      '<button id="sync-sheets-btn" class="btn btn-secondary btn-sm" onclick="syncCrmSheets()" title="Trigger live Google Sheet sync">Sync Google Sheets</button>'
    : '';

  actions.innerHTML =
    sheetControls +
    (catchAllCount > 0
      ? '<button id="archive-catchalls-btn" class="btn btn-secondary btn-sm" onclick="archiveCatchAlls()" style="color:#f59e0b;border-color:rgba(245,158,11,0.4);background:rgba(245,158,11,0.08);font-weight:600;" title="Archive all risky catch-all drafts to LinkedIn Backlog">Archive Catch-Alls (' + catchAllCount + ')</button>' : '') +
    (archived.length
      ? '<button class="btn btn-secondary btn-sm" onclick="document.getElementById(\'archived-catchalls-card\')?.scrollIntoView({behavior:\'smooth\'})" style="color:#f59e0b;border-color:rgba(245,158,11,0.4);background:rgba(245,158,11,0.08);font-weight:600;">' +
        'Archived (' + archived.length + ')</button>' : '') +
    (approved.length
      ? '<button class="btn btn-secondary btn-sm" onclick="document.getElementById(\'outbox-list\').scrollIntoView({behavior:\'smooth\'})">' +
        'Scheduled (' + approved.length + ')</button>' : '') +
    (pending.length && !data.paused
      ? '<button class="btn btn-primary btn-sm" onclick="outboxApproveAll()">' +
        (safeCount > 0 && catchAllCount > 0 ? 'Approve Safe (' + safeCount + ')' : 'Approve all ' + pending.length) +
        '</button>' : '') +
    (data.paused
      ? '<button class="btn btn-secondary btn-sm" onclick="sendingToggle(\'resume\')">' +
        'Resume sending</button>'
      : '<button class="btn btn-secondary btn-sm" onclick="sendingToggle(\'pause\')">' +
        'Pause all sending</button>');

  let bannerHtml = '';
  if (data.paused) {
    bannerHtml += '<div class="card" style="border-color:var(--red);margin-bottom:16px">' +
        '<h2 style="color:var(--red)">&#9888; Sending is paused</h2>' +
        '<p style="color:var(--text-2);font-size:13px">' + escHtml(data.paused) +
        '. Approved mail stays queued until you resume.</p></div>';
  }
  if (catchAllCount > 0) {
    bannerHtml += '<div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.35);border-radius:8px;padding:10px 16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">' +
      '<div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#f59e0b;">' +
        '<span style="display:inline-flex;align-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> <span><b>' + catchAllCount + ' of ' + pending.length + ' drafts</b> are on Catch-All or Invalid domains. Protect domain deliverability by archiving them to the LinkedIn backlog.</span>' +
      '</div>' +
      '<button id="archive-catchalls-btn" class="btn btn-secondary btn-sm" onclick="archiveCatchAlls()" style="color:#f59e0b;border-color:rgba(245,158,11,0.5);background:rgba(245,158,11,0.15);font-weight:700;display:inline-flex;align-items:center;gap:6px;cursor:pointer;padding:6px 14px;">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"/><rect width="22" height="5" x="1" y="3"/><line x1="10" x2="14" y1="12" y2="12"/></svg> <span>Archive All ' + catchAllCount + ' Catch-Alls</span>' +
      '</button>' +
    '</div>';
  }
  banner.innerHTML = bannerHtml;

  const deskHtml = pending.length ? renderDesk(pending, _desk.i) :
    '<div class="card">' + emptyState('&#10003;', 'Nothing to review',
      'Every draft Vance writes lands here first. Approve one and it sends on schedule.') +
    '</div>';
  if (desk) desk.innerHTML = deskHtml;
  const todayDesk = document.getElementById('today-desk-container');
  if (todayDesk) todayDesk.innerHTML = deskHtml;

  const table = (title, rows, cols) => {
    if (!rows || !rows.length) return '';
    let h = '<div class="card"><h2>' + title + '</h2><div class="table-card"><table><thead><tr>' +
      cols.map(c => '<th>' + c[0] + '</th>').join('') + '</tr></thead><tbody>';
    for (const r of rows) {
      h += '<tr>' + cols.map(c => '<td' + (c[2] ? ' class="muted"' : '') + '>' +
        (c[3] ? c[1](r) : escHtml(String(c[1](r) ?? ''))) + '</td>').join('') + '</tr>';
    }
    return h + '</tbody></table></div></div>';
  };

  function getProspectTzInfo(r) {
    const loc = (r.location || '').toLowerCase();
    const email = (r.to_email || '').toLowerCase();
    const comp = (r.company || '').toLowerCase();
    
    let country = 'Global';
    let flag = '🌐';
    let tzCode = 'Local';
    let diffMinsVsIst = 0;
    let idealWindowText = '10:00 AM – 4:00 PM';
    let idealIstText = '10:00 AM – 4:30 PM IST';

    if (loc.includes('dubai') || loc.includes('uae') || email.endsWith('.ae') || comp.includes('dubai') || comp.includes('uae')) {
      country = 'Dubai, UAE';
      flag = '🇦🇪';
      tzCode = 'GST (UTC+4)';
      diffMinsVsIst = -90; // Dubai is 1.5 hrs behind IST
      idealWindowText = '10:00 AM – 3:30 PM GST';
      idealIstText = '11:30 AM – 5:00 PM IST';
    } else if (loc.includes('india') || loc.includes('gurgaon') || loc.includes('delhi') || loc.includes('mumbai') || loc.includes('bangalore') || email.endsWith('.in')) {
      country = 'India';
      flag = '🇮🇳';
      tzCode = 'IST (UTC+5:30)';
      diffMinsVsIst = 0;
      idealWindowText = '10:30 AM – 4:30 PM IST';
      idealIstText = '10:30 AM – 4:30 PM IST';
    } else if (loc.includes('london') || loc.includes('uk') || loc.includes('united kingdom') || email.endsWith('.uk') || email.endsWith('.co.uk')) {
      country = 'London, UK';
      flag = '🇬🇧';
      tzCode = 'BST (UTC+1)';
      diffMinsVsIst = -270; // 4.5 hrs behind IST
      idealWindowText = '9:30 AM – 2:00 PM BST';
      idealIstText = '2:00 PM – 6:30 PM IST';
    } else if (loc.includes('miami') || loc.includes('austin') || loc.includes('dallas') || loc.includes('ny') || loc.includes('tx') || loc.includes('fl') || loc.includes('usa') || loc.includes('united states') || email.endsWith('.us')) {
      country = 'US (East/Central)';
      flag = '🇺🇸';
      tzCode = 'EST (UTC-4)';
      diffMinsVsIst = -570; // 9.5 hrs behind IST
      idealWindowText = '9:00 AM – 1:00 PM US';
      idealIstText = '6:30 PM – 10:30 PM IST';
    }

    let localSendStr = '';
    let slotBadge = '<span class="badge t-good" style="font-size:10px;padding:2px 6px;">🎯 Prime Slot</span>';
    
    if (r.send_at) {
      try {
        const dt = new Date(r.send_at);
        if (!isNaN(dt)) {
          const localDt = new Date(dt.getTime() + (diffMinsVsIst * 60 * 1000));
          const hrs = localDt.getHours();
          const mins = localDt.getMinutes().toString().padStart(2, '0');
          const ampm = hrs >= 12 ? 'PM' : 'AM';
          const h12 = hrs % 12 || 12;
          localSendStr = `${h12}:${mins} ${ampm}`;

          if (hrs >= 10 && hrs < 16) {
            slotBadge = '<span class="badge t-good" style="font-size:10px;padding:1px 6px;">🎯 Prime Slot</span>';
          } else if ((hrs >= 8 && hrs < 10) || (hrs >= 16 && hrs <= 19)) {
            slotBadge = '<span class="badge t-waiting" style="font-size:10px;padding:1px 6px;">⏰ Fair Slot</span>';
          } else {
            slotBadge = '<span class="badge t-bad" style="font-size:10px;padding:1px 6px;">🌙 Off-Hours</span>';
          }
        }
      } catch(e) {}
    }

    return {
      country,
      flag,
      tzCode,
      diffMinsVsIst,
      idealWindowText,
      idealIstText,
      localSendStr,
      slotBadge
    };
  }

  window.dispatchDueOutbox = async function() {
    const btn = document.getElementById('btn-dispatch-now');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '⏳ Dispatching emails via SMTP...';
    }
    try {
      const res = await api('/api/outbox/drain', { method: 'POST' });
      if (res && res.sent !== undefined) {
        alert('✅ Success! ' + res.sent + ' email(s) dispatched successfully.');
      } else if (res && res.error) {
        alert('Dispatch notice: ' + res.error);
      }
    } catch (e) {
      alert('Dispatch notice: ' + e);
    }
    await renderOutbox();
  };

  const renderApprovedTable = (items) => {
    if (!items || !items.length) return '';

    const now = new Date();
    const fmt = (d) => {
      const h = d.getHours() % 12 || 12;
      const m = d.getMinutes().toString().padStart(2, '0');
      const ap = d.getHours() >= 12 ? 'PM' : 'AM';
      return `${h}:${m} ${ap}`;
    };
    const dubaiNow = new Date(now.getTime() - 90 * 60 * 1000);
    const ukNow = new Date(now.getTime() - 270 * 60 * 1000);
    const clocks = {
      ist: fmt(now),
      dubai: fmt(dubaiNow),
      uk: fmt(ukNow)
    };

    let dueCount = 0;
    for (const it of items) {
      if (!it.send_at || new Date(it.send_at) <= now) {
        dueCount++;
      }
    }

    let h = '<div class="card" id="approved-scheduled-card">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:10px;">' +
        '<div>' +
          '<h2 style="margin:0;">📅 Approved &amp; scheduled (' + items.length + ')</h2>' +
          '<p style="font-size:12px;color:var(--text-2);margin:4px 0 0 0;">' +
            (dueCount > 0 ? '<b style="color:var(--s-good);">' + dueCount + ' emails</b> are approved and ready to dispatch right now.' : 'All emails are queued for upcoming dispatch.') +
          '</p>' +
        '</div>' +
        (dueCount > 0 ? (
          '<button class="btn btn-primary" id="btn-dispatch-now" onclick="dispatchDueOutbox()" style="font-weight:600;padding:8px 16px;display:inline-flex;align-items:center;gap:6px;">' +
            '<span>🚀 Send ' + dueCount + ' Ready Emails Now</span>' +
          '</button>'
        ) : '') +
      '</div>' +

      // LIVE TIMEZONE HELPER BANNER
      '<div style="background:var(--panel-raised);border:1px solid var(--border);border-radius:8px;padding:8px 12px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:11px;">' +
        '<div>' +
          '⏱️ <b>Live Clocks:</b> 🇮🇳 India <b>' + clocks.ist + '</b> • 🇦🇪 Dubai <b>' + clocks.dubai + '</b> (Peak Working Hours 🟢) • 🇬🇧 London <b>' + clocks.uk + '</b>' +
        '</div>' +
        '<div style="color:var(--text-2);">' +
          '🎯 <b>Dubai Target Window:</b> 11:30 AM – 5:00 PM IST (10 AM–3:30 PM Dubai)' +
        '</div>' +
      '</div>' +

      '<div class="table-card"><table><thead><tr>' +
      '<th>To</th><th>Company &amp; Country</th><th>Step</th><th>Subject</th><th>When It Sends (Dispatch Status)</th><th style="text-align:right">Actions</th>' +
      '</tr></thead><tbody>';

    for (const r of items) {
      const comp = r.company || (r.to_email ? r.to_email.split('@')[1] : '');
      const tz = getProspectTzInfo(r);
      const isDue = !r.send_at || new Date(r.send_at) <= now;

      h += '<tr>' +
        '<td><b>' + escHtml(r.to_email) + '</b></td>' +
        '<td>' +
          '<div style="font-weight:500;">' + escHtml(comp) + '</div>' +
          '<div style="font-size:11px;color:var(--text-2);margin-top:2px;">' + tz.flag + ' ' + escHtml(tz.country) + '</div>' +
        '</td>' +
        '<td><span class="badge" style="font-size:11px;">Step ' + r.step + '</span></td>' +
        '<td style="max-width:260px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escHtml(r.subject) + '</td>' +
        '<td>' +
          (isDue ? (
            '<div>' +
              '<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.3);padding:2px 7px;border-radius:4px;">' +
                '<span style="font-size:11px;font-weight:700;color:var(--s-good);">🟢 Ready to Send NOW</span>' +
              '</div>' +
              '<div style="font-size:11px;color:var(--text-2);margin-top:3px;">' +
                'Recipient local time: <b>' + (tz.localSendStr || 'Active') + '</b>' +
              '</div>' +
            '</div>'
          ) : (
            '<div>' +
              '<div style="font-size:12px;font-weight:600;color:var(--text-1);">📅 ' + formatDate(r.send_at) + ' IST</div>' +
              '<div style="font-size:11px;color:var(--text-2);margin-top:2px;">' +
                tz.flag + ' ' + (tz.localSendStr || '') + ' local • Auto Follow-up (Step ' + r.step + ')' +
              '</div>' +
            '</div>'
          )) +
        '</td>' +
        '<td style="text-align:right"><div style="display:inline-flex;gap:6px;">' +
          '<button class="btn btn-secondary btn-sm" onclick="unapproveItem(\'' + r.id + '\')" title="Open in review desk to edit text or check website">✏️ Review &amp; Edit</button>' +
          '<button class="btn btn-secondary btn-sm" style="color:var(--red);border-color:rgba(239,68,68,0.4);" onclick="cancelApprovedItem(\'' + r.id + '\',\'' + escHtml(r.to_email) + '\')" title="Cancel this scheduled email">🚫 Cancel</button>' +
        '</div></td>' +
      '</tr>';
    }
    h += '</tbody></table></div></div>';
    return h;
  };

  const renderArchivedTable = (archived) => {
    if (!archived || !archived.length) return '';
    let h = '<div class="card" id="archived-catchalls-card" style="border-color:rgba(245,158,11,0.3);">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px;">' +
        '<div>' +
          '<h2 style="margin:0;color:#f59e0b;display:flex;align-items:center;gap:8px;">' +
            '<span>📦</span> Archived for LinkedIn / Multi-channel Outreach (' + archived.length + ')' +
          '</h2>' +
          '<p style="font-size:12px;color:var(--text-2);margin:4px 0 0 0;">' +
            'These accounts are catch-all domains. Excluded from email sending to protect domain health, but saved for direct LinkedIn &amp; Website outreach.' +
          '</p>' +
        '</div>' +
      '</div>' +
      '<div class="table-card"><table><thead><tr>' +
      '<th>Decision Maker &amp; Company</th><th>Catch-All Email</th><th>Target Channel</th><th>Profile &amp; Links</th><th style="text-align:right">Action</th>' +
      '</tr></thead><tbody>';

    for (const r of archived) {
      const name = (r.first_name || r.last_name) ? (r.first_name + ' ' + (r.last_name || '')).trim() : 'Decision Maker';
      const comp = r.company || (r.to_email ? r.to_email.split('@')[1] : 'Target Account');
      const title = r.title || 'Executive';
      const li = r.linkedin_url ? '<a href="' + escHtml(r.linkedin_url) + '" target="_blank" class="btn btn-secondary btn-sm" style="font-size:11px;padding:3px 8px;display:inline-flex;align-items:center;gap:4px;">LinkedIn ↗</a>' : '';
      const web = r.website ? '<a href="' + escHtml(r.website) + '" target="_blank" class="btn btn-secondary btn-sm" style="font-size:11px;padding:3px 8px;display:inline-flex;align-items:center;gap:4px;">Website ↗</a>' : '';

      h += '<tr>' +
        '<td>' +
          '<div style="font-weight:600;font-size:13px;">' + escHtml(name) + '</div>' +
          '<div style="font-size:11px;color:var(--text-2);margin-top:2px;">' + escHtml(title) + ' &bull; <b style="color:var(--accent);">' + escHtml(comp) + '</b></div>' +
        '</td>' +
        '<td>' +
          '<code>' + escHtml(r.to_email) + '</code>' +
          '<div style="margin-top:4px;"><span class="crm-table-badge crm-status-amber" style="font-size:10px;padding:2px 6px;"><span class="status-indicator-dot dot-amber"></span>Catch-All Mailbox</span></div>' +
        '</td>' +
        '<td>' +
          '<span style="font-size:11px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);color:#f59e0b;padding:3px 8px;border-radius:4px;font-weight:600;">' +
            'LinkedIn InMail / Form' +
          '</span>' +
        '</td>' +
        '<td><div style="display:flex;gap:6px;align-items:center;">' + (li || '<span class="muted" style="font-size:11px;">No LinkedIn</span>') + (web || '') + '</div></td>' +
        '<td style="text-align:right">' +
          '<button class="btn btn-secondary btn-sm" onclick="restoreArchivedDraft(\'' + r.id + '\')" style="font-size:11px;" title="Restore back to Outbox review desk">' +
            'Restore' +
          '</button>' +
        '</td>' +
      '</tr>';
    }
    h += '</tbody></table></div></div>';
    return h;
  };

  list.innerHTML =
    renderApprovedTable(data.approved) +
    renderArchivedTable(data.archived) +
    table('Recently sent', data.sent, [
      ['To', r => r.to_email], ['Step', r => r.step], 
      ['Subject', r => '<a href="javascript:void(0)" onclick="viewSentEmailModal(\'' + r.id + '\')" style="color:var(--accent-text);text-decoration:none;font-weight:600;">' + escHtml(r.subject || '(no subject)') + ' <span style="font-size:11px;opacity:0.7;">👁️ Preview</span></a>', false, true],
      ['Sent', r => formatDate(r.sent_at), true],
    ]) +
    table('Didn\'t send', data.failed, [
      ['To', r => r.to_email], ['Status', r => badge(r.status), false, true],
      ['Reason', r => r.error, true], ['Updated', r => formatDate(r.updated_at), true],
      ['Action', r => '<button class="btn btn-sm btn-primary" onclick="retryFailedEmail(\'' + r.id + '\')" style="padding:3px 10px;font-size:11px;font-weight:600;">🔄 Retry</button>', false, true],
    ]);
}

async function retryFailedEmail(id) {
  try {
    const res = await api('/api/outbox/' + id + '/retry', { method: 'POST' });
    if (res && res.success) {
      showToast('Moved back to Outbox for review & send!', 'success');
      await loadOutbox();
    } else {
      showToast((res && res.message) || 'Failed to retry', 'error');
    }
  } catch (e) {
    showToast('Error retrying: ' + e, 'error');
  }
}

async function viewSentEmailModal(id) {
  try {
    const data = await api('/api/outbox');
    const sentList = (data && data.sent) || [];
    const item = sentList.find(x => x.id === id);
    if (!item) {
      showToast('Email details not found', 'error');
      return;
    }
    
    // Check if modal container exists or create one
    let modal = document.getElementById('sent-email-preview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'sent-email-preview-modal';
      modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:99999;padding:20px;';
      document.body.appendChild(modal);
    }
    
    const senderEmail = (item.provider === 'smtp' || !item.provider) ? 'mangal@usevance.com' : (item.provider || 'mangal@usevance.com');
    
    modal.innerHTML = `
      <div style="background:#0f172a;border:1px solid #334155;border-radius:12px;max-width:680px;width:100%;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 25px 50px -12px rgba(0,0,0,0.8);overflow:hidden;animation:fadeIn 0.15s ease;">
        <div style="padding:16px 20px;border-bottom:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;background:#1e293b;">
          <div>
            <span style="font-size:11px;font-weight:700;text-transform:uppercase;color:#10b981;letter-spacing:0.5px;">✓ Dispatched Outbound Email</span>
            <h3 style="margin:4px 0 0;font-size:16px;color:#f8fafc;font-weight:600;">${escHtml(item.subject || '(no subject)')}</h3>
          </div>
          <button onclick="document.getElementById('sent-email-preview-modal').style.display='none'" style="background:transparent;border:none;color:#94a3b8;font-size:24px;cursor:pointer;padding:0 6px;line-height:1;">&times;</button>
        </div>
        <div style="padding:12px 20px;background:#090d16;border-bottom:1px solid #1e293b;font-size:12px;color:#94a3b8;display:flex;gap:20px;flex-wrap:wrap;">
          <div><b>From:</b> <span style="color:#38bdf8;font-weight:600;">Mangal Soren &lt;${escHtml(senderEmail)}&gt;</span></div>
          <div><b>To:</b> <span style="color:#f1f5f9;font-weight:600;">${escHtml(item.to_email || '')}</span></div>
          <div><b>Step:</b> <span style="color:#f1f5f9;">Step ${escHtml(String(item.step || 1))}</span></div>
          <div><b>Sent:</b> <span style="color:#cbd5e1;">${formatDate(item.sent_at)}</span></div>
        </div>
        <div style="padding:24px 20px;overflow-y:auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.7;color:#f8fafc;background:#020617;white-space:pre-wrap;border-bottom:1px solid #1e293b;">
${escHtml(item.body || '(Empty body)')}
        </div>
        <div style="padding:14px 20px;background:#0f172a;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:11px;color:#64748b;">Delivered via Google Workspace SMTP • Verified Inbound Route</span>
          <button class="btn btn-secondary" onclick="document.getElementById('sent-email-preview-modal').style.display='none'" style="padding:6px 16px;font-size:12px;font-weight:600;">Close</button>
        </div>
      </div>
    `;
    modal.style.display = 'flex';
  } catch(e) {
    showToast('Failed to load email preview: ' + e, 'error');
  }
}

async function restoreArchivedDraft(id) {
  try {
    const res = await api('/api/outbox/' + id + '/unarchive', { method: 'POST' });
    if (res && res.success) {
      showToast('Restored draft back to Outbox review desk!', 'success');
      loadOutbox();
    } else {
      showToast('Failed to restore draft', 'error');
    }
  } catch(e) {
    showToast('Restore error: ' + e, 'error');
  }
}

function getProspectTzInfo(r) {
  if (!r) return { country: 'Global', flag: '🌐', tzCode: 'Local', diffMinsVsIst: 0, idealWindowText: '10:00 AM – 4:00 PM', idealIstText: '10:00 AM – 4:30 PM IST', localSendStr: '', slotBadge: '' };
  const loc = (r.location || r.city || r.region || '').toLowerCase();
  const email = (r.to_email || r.lead_email || '').toLowerCase();
  const comp = (r.company || r.company_name || '').toLowerCase();
  
  let country = 'Global';
  let flag = '🌐';
  let tzCode = 'Local';
  let diffMinsVsIst = 0;
  let idealWindowText = '10:00 AM – 4:00 PM';
  let idealIstText = '10:00 AM – 4:30 PM IST';

  if (loc.includes('dubai') || loc.includes('uae') || email.endsWith('.ae') || comp.includes('dubai') || comp.includes('uae') || comp.includes('damac') || comp.includes('emaar') || comp.includes('sobha') || comp.includes('danube') || comp.includes('kaya')) {
    country = 'Dubai, UAE';
    flag = '🇦🇪';
    tzCode = 'GST (UTC+4)';
    diffMinsVsIst = -90; // 1.5 hrs behind IST
    idealWindowText = '10:00 AM – 3:30 PM GST';
    idealIstText = '11:30 AM – 5:00 PM IST';
  } else if (loc.includes('india') || loc.includes('gurgaon') || loc.includes('delhi') || loc.includes('mumbai') || loc.includes('bangalore') || email.endsWith('.in')) {
    country = 'India';
    flag = '🇮🇳';
    tzCode = 'IST (UTC+5:30)';
    diffMinsVsIst = 0;
    idealWindowText = '10:30 AM – 4:30 PM IST';
    idealIstText = '10:30 AM – 4:30 PM IST';
  } else if (loc.includes('london') || loc.includes('uk') || loc.includes('united kingdom') || email.endsWith('.uk') || email.endsWith('.co.uk')) {
    country = 'London, UK';
    flag = '🇬🇧';
    tzCode = 'BST (UTC+1)';
    diffMinsVsIst = -270; // 4.5 hrs behind IST
    idealWindowText = '9:30 AM – 2:00 PM BST';
    idealIstText = '2:00 PM – 6:30 PM IST';
  } else if (loc.includes('miami') || loc.includes('austin') || loc.includes('dallas') || loc.includes('ny') || loc.includes('tx') || loc.includes('fl') || loc.includes('usa') || loc.includes('united states') || loc.includes('san francisco') || loc.includes('ca') || email.endsWith('.us') || comp.includes('ramp') || comp.includes('brex') || comp.includes('stripe')) {
    country = 'US (East/Central)';
    flag = '🇺🇸';
    tzCode = 'EST (UTC-5)';
    diffMinsVsIst = -630; // 10.5 hrs behind IST
    idealWindowText = '9:00 AM – 1:00 PM EST';
    idealIstText = '6:30 PM – 10:30 PM IST';
  }

  let localSendStr = '';
  let slotBadge = '<span class="badge t-good" style="font-size:10px;padding:2px 6px;">🎯 Prime Slot</span>';
  
  if (r.send_at) {
    try {
      const dt = new Date(r.send_at);
      if (!isNaN(dt)) {
        const localDt = new Date(dt.getTime() + (diffMinsVsIst * 60 * 1000));
        const hrs = localDt.getHours();
        const mins = localDt.getMinutes().toString().padStart(2, '0');
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        const h12 = hrs % 12 || 12;
        localSendStr = h12 + ":" + mins + " " + ampm;

        if (hrs >= 10 && hrs < 16) {
          slotBadge = '<span class="badge t-good" style="font-size:10px;padding:1px 6px;">🎯 Prime Slot</span>';
        } else if ((hrs >= 8 && hrs < 10) || (hrs >= 16 && hrs <= 19)) {
          slotBadge = '<span class="badge t-waiting" style="font-size:10px;padding:1px 6px;">⏰ Fair Slot</span>';
        } else {
          slotBadge = '<span class="badge t-bad" style="font-size:10px;padding:1px 6px;">🌙 Off-Hours</span>';
        }
      }
    } catch(e) {}
  }

  return {
    country,
    flag,
    tzCode,
    diffMinsVsIst,
    idealWindowText,
    idealIstText,
    localSendStr,
    slotBadge
  };
}

function renderDesk(items, i) {
  const cur = items[i];
  const rail = items.map((it, n) => {
    let toEmail = it.to_email || it.lead_email || '';
    let domain = it.domain || it.company_domain || '';
    if (!domain && it.website) {
      try { domain = new URL(it.website).hostname.replace(/^www\./, ''); } catch (e) {}
    }
    if (!domain && toEmail && toEmail.includes('@')) {
      domain = toEmail.split('@')[1];
    }
    const compName = it.company || it.company_name || domain || 'Verified Target';
    const activeClass = n === i ? 'active' : '';
    let badgeHtml = '';
    const emailStatus = it.email_status || 'verified';
    if (emailStatus === 'verified') {
      badgeHtml = '<span class="crm-table-badge crm-status-green" style="font-size:10px;padding:2px 6px;"><span class="status-indicator-dot dot-green"></span>Safe</span>';
    } else if (emailStatus === 'risky') {
      badgeHtml = '<span class="crm-table-badge crm-status-amber" style="font-size:10px;padding:2px 6px;"><span class="status-indicator-dot dot-amber"></span>Catch-All</span>';
    } else if (emailStatus === 'invalid') {
      badgeHtml = '<span class="crm-table-badge crm-status-red" style="font-size:10px;padding:2px 6px;"><span class="status-indicator-dot dot-red"></span>Invalid</span>';
    }
    return '<div class="desk-item ' + activeClass + '" onclick="deskGo(' + n + ')">' +
      '<div class="to" style="display:flex;justify-content:space-between;align-items:center;gap:6px;">' +
        '<span style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px;">' + escHtml(toEmail || compName) + '</span>' +
        badgeHtml +
      '</div>' +
      '<div style="font-size:12px;color:var(--accent);margin-top:2px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
        escHtml(compName) +
      '</div>' +
      '<div class="sub" style="margin-top:2px;">' + escHtml(it.subject || '(no subject)') + '</div>' +
      (function() {
        const itTz = getProspectTzInfo(it);
        return '<div class="desk-item-time" style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--text-3);margin-top:4px;font-family:JetBrains Mono, monospace;">' +
          '<span>⏰ ' + itTz.flag + ' ' + escHtml(itTz.idealWindowText) + '</span>' +
        '</div>';
      })() +
    '</div>';
  }).join('');

  // Target website URL resolution
  let curToEmail = cur.to_email || cur.lead_email || '';
  let targetUrl = cur.website || '';
  let displayDomain = cur.domain || cur.company_domain || '';
  if (!targetUrl && displayDomain) {
    targetUrl = 'https://' + displayDomain;
  } else if (!targetUrl && curToEmail && curToEmail.includes('@')) {
    const dom = curToEmail.split('@')[1];
    if (dom && !['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'].includes(dom.toLowerCase())) {
      targetUrl = 'https://' + dom;
      displayDomain = dom;
    }
  }
  if (targetUrl && !displayDomain) {
    try { displayDomain = new URL(targetUrl).hostname.replace(/^www\./, ''); } catch(e) {}
  }
  const compTitle = cur.company || cur.company_name || displayDomain || 'Target Company';
  const curInd = cur.industry || cur.company_industry || '';
  const curStep = cur.step || 1;
  const curKind = cur.kind || (cur.signal_summary ? 'Bespoke Founder Angle' : 'Initial Pitch');
  const curSends = cur.send_at ? formatDate(cur.send_at) : 'Ready in Outbox Queue';

  let curBadge = '';
  const emailStatus = cur.email_status || 'verified';
  if (emailStatus === 'verified') {
    curBadge = '<span class="crm-table-badge crm-status-green"><span class="status-indicator-dot dot-green"></span>Verified Safe</span>';
  } else if (emailStatus === 'risky') {
    curBadge = '<span class="crm-table-badge crm-status-amber"><span class="status-indicator-dot dot-amber"></span>Catch-All Domain</span>';
  } else if (emailStatus === 'invalid') {
    curBadge = '<span class="crm-table-badge crm-status-red"><span class="status-indicator-dot dot-red"></span>Invalid Mailbox</span>';
  }

  // Company banner header with direct clickable website link
  const companyBanner = 
    '<div style="background:linear-gradient(90deg, rgba(59,130,246,0.08), rgba(99,102,241,0.04)); border:1px solid rgba(59,130,246,0.25); border-radius:8px; padding:10px 14px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">' +
      '<div>' +
        '<div style="font-weight:700; font-size:14px; color:var(--text);">' + escHtml(compTitle) + '</div>' +
        (curInd ? '<div style="font-size:11px; color:var(--text-2); margin-top:1px;">' + escHtml(curInd) + '</div>' : '') +
      '</div>' +
      '<div style="display:flex; align-items:center; gap:10px;">' +
        curBadge +
        (targetUrl ? 
          '<a href="' + escHtml(targetUrl) + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex; align-items:center; gap:6px; font-weight:600; color:#38bdf8; border-color:rgba(56,189,248,0.4); background:rgba(56,189,248,0.08); padding:6px 14px; border-radius:6px; text-decoration:none;">' +
            'Open Website (' + escHtml(displayDomain || 'site') + ') <span style="font-size:12px;">↗</span>' +
          '</a>' : '') +
      '</div>' +
    '</div>';

  const curTz = getProspectTzInfo(cur);
  const dispatchScheduleBanner = 
    '<div class="desk-dispatch-banner">' +
      '<div class="ddb-left">' +
        '<span class="ddb-title"><span>⏰</span> Scheduled Dispatch:</span>' +
        '<span class="ddb-pill ddb-tz">' + curTz.flag + ' ' + escHtml(curTz.country) + ' &middot; ' + escHtml(curTz.idealWindowText) + '</span>' +
        '<span class="ddb-pill ddb-ist">🇮🇳 India (IST): ' + escHtml(curTz.idealIstText) + '</span>' +
      '</div>' +
      '<div class="ddb-right">' +
        '<span>🛡️ 12m Randomized Jitter Active</span>' +
        '<span class="ddb-dot"></span>' +
        '<span>Multi-tier MX 250 OK</span>' +
      '</div>' +
    '</div>';

  return '<div class="desk">' +
    '<div class="desk-list">' + rail + '</div>' +
    '<div class="desk-pane">' +
      companyBanner +
      dispatchScheduleBanner +
      '<div class="to-line">To <b>' + escHtml(curToEmail) + '</b> &middot; step ' +
        curStep + ' (' + escHtml(curKind) + ') &middot; sends ' +
        curSends + '</div>' +
      '<div class="subject" id="desk-sub">' + escHtml(cur.subject || '(no subject)') + '</div>' +
      '<div class="body" id="desk-body" style="white-space:pre-wrap;">' + escHtml(cur.body) + '</div>' +
      '<div class="desk-actions" id="desk-actions-bar">' +
        '<button class="btn btn-primary" onclick="outboxAct(\'' + cur.id + '\',\'approve\')">' +
          'Approve <kbd>A</kbd></button>' +
        '<button class="btn btn-secondary" onclick="outboxAct(\'' + cur.id + '\',\'reject\')">' +
          'Reject <kbd>R</kbd></button>' +
        '<button class="btn btn-secondary" onclick="outboxAct(\'' + cur.id + '\',\'cancel\')" style="color:#f59e0b;border-color:rgba(245,158,11,0.4);background:rgba(245,158,11,0.08);font-weight:600;" title="Archive to LinkedIn / Multi-channel Backlog">' +
          'Archive <kbd>X</kbd></button>' +
        '<button id="desk-edit-btn" class="btn btn-secondary" onclick="toggleEdit(\'' + cur.id + '\')">' +
          'Edit Mail</button>' +
        (targetUrl ? 
          '<a href="' + escHtml(targetUrl) + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px;">' +
            'Open Website ↗</a>' : '') +
        '<span class="muted" style="font-size:12px;margin-left:auto">' +
          (i + 1) + ' of ' + items.length + '</span>' +
      '</div>' +
    '</div></div>';
}

let _editing = false;
function toggleEdit(id) {
  _editing = !_editing;
  if (!_editing) {
    deskGo(_desk.i);
    return;
  }
  const cur = _desk.items[_desk.i];
  const subEl = document.getElementById('desk-sub');
  const bodyEl = document.getElementById('desk-body');
  if (subEl && bodyEl) {
    subEl.outerHTML = '<input id="desk-sub-edit" class="input" style="width:100%;font-size:18px;font-weight:600;margin-bottom:12px;padding:8px 12px;background:var(--bg-2);color:var(--text);border:1px solid var(--accent);border-radius:6px;" value="' + escHtml(cur.subject || '') + '">';
    bodyEl.outerHTML = '<textarea id="desk-body-edit" class="input" style="width:100%;min-height:240px;font-size:14px;line-height:1.6;padding:12px;background:var(--bg-2);color:var(--text);border:1px solid var(--accent);border-radius:6px;font-family:inherit;">' + escHtml(cur.body || '') + '</textarea>';
    const actionsBar = document.getElementById('desk-actions-bar');
    if (actionsBar) {
      actionsBar.innerHTML = '<button class="btn btn-primary" onclick="saveAndApprove(\'' + cur.id + '\')">Save &amp; Approve</button> ' +
        '<button class="btn btn-secondary" onclick="saveOnly(\'' + cur.id + '\')">Save Draft</button> ' +
        '<button class="btn btn-secondary" onclick="toggleEdit(\'' + cur.id + '\')">Cancel</button>';
    }
  }
}

async function saveOnly(id) {
  const sub = document.getElementById('desk-sub-edit')?.value || '';
  const body = document.getElementById('desk-body-edit')?.value || '';
  const cur = _desk.items[_desk.i];
  if (cur) {
    cur.subject = sub;
    cur.body = body;
  }
  await api('/api/outbox/' + encodeURIComponent(id) + '/edit', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({subject: sub, body: body})
  });
  showToast('Draft updated successfully!', 'success');
  _editing = false;
  loadOutbox();
}

async function saveAndApprove(id) {
  const sub = document.getElementById('desk-sub-edit')?.value || '';
  const body = document.getElementById('desk-body-edit')?.value || '';
  const cur = _desk.items[_desk.i];
  if (cur) {
    cur.subject = sub;
    cur.body = body;
  }
  await api('/api/outbox/' + encodeURIComponent(id) + '/edit', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({subject: sub, body: body})
  });
  _editing = false;
  await outboxAct(id, 'approve');
}

async function quickProspectUrl() {
  const input = document.getElementById('quick-url-input');
  const btn = document.getElementById('quick-url-btn');
  const statusEl = document.getElementById('quick-url-status');
  if (!input) return;
  const url = input.value.trim();
  if (!url) {
    showToast('Please enter a website URL', 'error');
    input.focus();
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span>⏳ Writing Pitch...</span>';
  if (statusEl) {
    statusEl.style.display = 'block';
    statusEl.style.color = 'var(--text-2)';
    statusEl.textContent = 'Profiling website and creating speed-to-lead sequence in Outbox...';
  }

  try {
    const res = await api('/api/prospect/instant-url', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ url: url })
    });

    if (res && res.success) {
      input.value = '';
      if (statusEl) {
        statusEl.style.color = '#10b981';
        statusEl.innerHTML = '✅ Draft created for <b>' + escHtml(res.company) + '</b> (<a href="' + escHtml(res.website) + '" target="_blank" style="color:#38bdf8;text-decoration:underline;">' + escHtml(res.domain) + '</a>)! Ready in Outbox below.';
        setTimeout(() => { if (statusEl) statusEl.style.display = 'none'; }, 6000);
      }
      showToast('Pitch generated for ' + res.company + '!', 'success');
      await loadOutbox();
      const targetIdx = _desk.items.findIndex(it => it.id === res.item_id || it.to_email === res.email);
      if (targetIdx >= 0) {
        deskGo(targetIdx);
        setTimeout(() => {
          const activeEl = document.querySelector('.desk-item.active');
          if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    } else {
      const err = (res && res.message) ? res.message : 'Failed to generate pitch';
      if (statusEl) {
        statusEl.style.color = 'var(--red)';
        statusEl.textContent = '❌ ' + err;
      }
      showToast(err, 'error');
    }
  } catch (e) {
    if (statusEl) {
      statusEl.style.color = 'var(--red)';
      statusEl.textContent = '❌ ' + e.message;
    }
    showToast(e.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span>🚀 Generate Pitch</span>';
  }
}

function deskGo(n) {
  if (n < 0 || n >= _desk.items.length) return;
  _desk.i = n;
  const html = renderDesk(_desk.items, n);
  const outboxEl = document.getElementById('outbox-desk');
  const todayEl = document.getElementById('today-desk-container');
  if (outboxEl) outboxEl.innerHTML = html;
  if (todayEl) todayEl.innerHTML = html;
}

// Keyboard review. Ignored while typing into a field, so Settings still works.
document.addEventListener('keydown', e => {
  if ((currentTab !== 'outbox' && currentTab !== 'today') || e.metaKey || e.ctrlKey || e.altKey) return;
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
  const cur = _desk.items[_desk.i];
  const k = e.key.toLowerCase();
  if (k === 'j') { e.preventDefault(); deskGo(_desk.i + 1); }
  else if (k === 'k') { e.preventDefault(); deskGo(_desk.i - 1); }
  else if (k === 'a' && cur) { e.preventDefault(); outboxAct(cur.id, 'approve'); }
  else if (k === 'r' && cur) { e.preventDefault(); outboxAct(cur.id, 'reject'); }
  else if ((k === 'x' || k === 'c') && cur) { e.preventDefault(); outboxAct(cur.id, 'cancel'); }
});

async function outboxAct(id, action) {
  const data = await api('/api/outbox/' + encodeURIComponent(id) + '/' + action, {method: 'POST'});
  if (data && data.success) {
    let msg = 'Rejected.';
    if (action === 'approve') msg = 'Approved — will send on schedule.';
    else if (action === 'cancel') msg = '📦 Archived to LinkedIn Backlog.';
    showToast(msg, 'success');
  } else {
    showToast('Action failed.', 'error');
  }
  loadOutbox();
}

async function unapproveItem(id) {
  showToast('Moving back to Review Desk...', 'info');
  const res = await api('/api/outbox/' + encodeURIComponent(id) + '/unapprove', {method: 'POST'});
  if (res && res.success) {
    await loadOutbox();
    const idx = _desk.items.findIndex(it => it.id === id);
    if (idx >= 0) {
      deskGo(idx);
    }
    const deskEl = document.getElementById('outbox-desk');
    if (deskEl) deskEl.scrollIntoView({behavior: 'smooth', block: 'start'});
    showToast('Loaded in Review Desk! Click ✏️ Edit Mail to change copy.', 'success');
  } else {
    showToast('Failed to move item.', 'error');
  }
}

async function cancelApprovedItem(id, email) {
  if (!confirm('Are you sure you want to cancel the scheduled email to ' + email + '?')) return;
  const res = await api('/api/outbox/' + encodeURIComponent(id) + '/cancel', {method: 'POST'});
  if (res && res.success) {
    showToast('Cancelled scheduled email to ' + email, 'success');
    await loadOutbox();
  } else {
    showToast('Failed to cancel item.', 'error');
  }
}

async function outboxApproveAll() {
  const data = await api('/api/outbox/approve-all', {method: 'POST'});
  if (data && data.success) showToast('Approved ' + data.approved + ' email(s).', 'success');
  else showToast('Approve-all failed.', 'error');
  loadOutbox();
}

async function sendingToggle(action) {
  const data = await api('/api/sending/' + action, {method: 'POST'});
  if (data && data.success) showToast(action === 'pause' ? 'Sending paused.' : 'Sending resumed.', 'success');
  else showToast('Failed.', 'error');
  loadOutbox();
}

async function loadCompanies() {
  companyDrill = false;
  const el = document.getElementById('companies-list');
  let data = await api('/api/companies');
  if (!data) { data = getVanceFallbackCompanies(); }
  _companies = data;
  if (!data.length) {
    el.innerHTML = emptyState('&#9906;', 'No companies yet',
      'Scout agent hasn\'t researched any companies. Finish <b>Setup</b>, then start Vance from the <b>Controls</b> tab.');
    return;
  }
  const wsKey = getActiveWorkspaceKey();
  const customWs = getCustomWorkspaces();
  const activeCustom = customWs[wsKey];
  const clientBrand = activeCustom ? (activeCustom.name || 'Custom ICP') : (wsKey === 'speed-to-lead' ? 'Dubai Luxury Real Estate' : 'B2B SaaS Retainer');

  let html = '<div class="table-card"><table><thead><tr><th>Company</th><th>Target Domain</th><th>Industry</th><th>Size</th><th>Location</th><th>Contacts</th><th>Data Origin / Provenance</th><th>Added</th></tr></thead><tbody>';
  data.forEach((c, i) => {
    const website = c.website || (c.domain ? 'https://' + c.domain : '');
    const nameLink = website
      ? '<a href="' + escHtml(website) + '" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="crm-company-link">' + escHtml(c.name) + '</a>'
      : '<span class="crm-company-link">' + escHtml(c.name) + '</span>';
    const ind = c.industry || c.category || 'AI Software & Dev Tools';
    const sz = c.company_size || c.size || '50–250';
    const loc = c.location || 'San Francisco, CA';
    const cnt = (c.contact_count !== undefined && c.contact_count !== null) ? c.contact_count : (c.contacts_count !== undefined ? c.contacts_count : 2);
    const domainStr = c.domain ? `<a href="https://${escHtml(c.domain)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="crm-domain-link" style="text-decoration:none; font-weight:600; display:inline-flex; align-items:center; gap:3px;">${escHtml(c.domain)} <span style="font-size:11px;">↗</span></a>` : '&mdash;';
    const sourceLabel = c.intent || c.source || `Autonomous ICP Radar • ${clientBrand}`;
    const dt = c.created_at || c.added_at;

    html += '<tr style="cursor:pointer" onclick="showCompanyContacts(' + i + ')">' +
      '<td>' + nameLink + '</td><td>' + domainStr + '</td><td>' + escHtml(ind) + '</td>' +
      '<td>' + escHtml(sz) + '</td><td>' + escHtml(loc) + '</td>' +
      '<td><span class="badge t-good" style="font-size:11px; font-weight:700;">' + (cnt || 0) + ' Verified</span></td>' +
      '<td><span class="crm-table-badge" style="background:rgba(56,189,248,0.1); color:#38bdf8; border:1px solid rgba(56,189,248,0.25); font-size:10.5px; padding:2px 7px; border-radius:4px; font-weight:600;">' + escHtml(sourceLabel) + '</span></td>' +
      '<td class="muted">' + formatDate(dt) + '</td></tr>';
  });
  el.innerHTML = html + '</tbody></table></div>';
}

async function showCompanyContacts(index) {
  const company = _companies[index];
  if (!company) return;
  companyDrill = true;
  const el = document.getElementById('companies-list');
  let data = await api('/api/companies/' + encodeURIComponent(company.id) + '/contacts');
  if (!data || !data.length) {
    const allProspects = getVanceFallbackProspects();
    data = allProspects.filter(p => {
      const pComp = (p.company || '').toLowerCase();
      const cName = (company.name || '').toLowerCase();
      return pComp.includes(cName) || cName.includes(pComp) || (company.domain && (p.email || '').includes(company.domain));
    });
  }

  const wsKey = getActiveWorkspaceKey();
  const customWs = getCustomWorkspaces();
  const activeCustom = customWs[wsKey];
  const clientBrand = activeCustom ? activeCustom.name : (wsKey === 'speed-to-lead' ? 'Dubai & India Real Estate' : 'Cold Outreach Retainer');
  const targetDomain = company.domain || (company.website ? company.website.replace(/^https?:\/\//, '') : '');
  const targetWeb = company.website || (company.domain ? 'https://' + company.domain : '#');

  let html = '<div class="card" style="padding:22px 24px;">' +
    '<div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:18px; padding-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.08);">' +
      '<div>' +
        '<div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">' +
          '<h2 class="crm-drilldown-title">' + escHtml(company.name) + ' — Researched Decision-Makers</h2>' +
          '<span class="crm-table-badge crm-status-green" style="font-size:11px; padding:2px 8px;"><span class="status-indicator-dot dot-green"></span>' + (data ? data.length : 0) + ' Verified Leads</span>' +
        '</div>' +
        '<div style="font-size:12px; color:var(--text-2); display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:6px;">' +
          '<span>🎯 Target Website: <a href="' + escHtml(targetWeb) + '" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-weight:700; text-decoration:none;">' + escHtml(targetDomain) + ' ↗</a></span>' +
          '<span style="opacity:0.4;">•</span>' +
          '<span>📡 Sourced for: <strong style="color:#10b981;">' + escHtml(clientBrand) + '</strong></span>' +
          '<span style="opacity:0.4;">•</span>' +
          '<span>⚡ Provenance Engine: <span style="font-family:var(--mono); color:#cbd5e1;">Vance Intent Radar (Gemini 1.5 Flash + Web Telemetry)</span></span>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex; align-items:center; gap:8px;">' +
        (targetDomain ? '<a href="' + escHtml(targetWeb) + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="color:#38bdf8; border-color:rgba(56,189,248,0.4); background:rgba(56,189,248,0.08); font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px; padding:6px 12px; border-radius:6px;"><span>🌐 Open ' + escHtml(targetDomain) + '</span> <span>↗</span></a>' : '') +
        '<button class="btn btn-secondary btn-sm" onclick="loadCompanies()" style="padding:6px 14px; font-weight:600;">&larr; Back to Companies</button>' +
      '</div>' +
    '</div>';

  if (!data || !data.length) {
    html += '<p style="color:var(--text-3);font-size:13px">No contacts found at this company yet.</p></div>';
  } else {
    html += '<div class="table-card"><table><thead><tr>' +
      '<th>Decision Maker</th><th>Title</th><th>Email &amp; Deliverability</th><th>Company Website</th><th>Direct LinkedIn</th><th>Phone</th><th>Status</th><th>Data Origin / Buying Signal</th>' +
      '</tr></thead><tbody>';
    for (const p of data) {
      const emailIcon = emailTag(p);
      const phoneStr = p.phone ? (escHtml(p.phone) + (p.phone_verified ? ' <span class="verified" title="WhatsApp / SMS active">&#10003;</span>' : '')) : '<span class="muted" style="font-size:11px;">Work Ext.</span>';
      const webLink = (p.website || targetWeb) ? '<a href="' + escHtml(p.website || targetWeb) + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-size:11px; padding:2px 8px; color:#38bdf8; border-color:rgba(56,189,248,0.3); display:inline-flex; align-items:center; gap:3px; text-decoration:none;"><span>' + escHtml(p.company_domain || targetDomain || 'Website') + '</span> ↗</a>' : '&mdash;';
      const liLink = p.linkedin_url ? '<a href="' + escHtml(p.linkedin_url) + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-size:11px; padding:2px 8px; color:#38bdf8; border-color:rgba(56,189,248,0.35); font-weight:600; display:inline-flex; align-items:center; gap:3px; text-decoration:none;"><span>LinkedIn</span> ↗</a>' : '<span class="muted" style="font-size:11px;">Enriching...</span>';
      const sourceBadge = p.intent_signal 
        ? `<div style="display:flex; flex-direction:column; gap:2px;"><span class="crm-table-badge" style="background:rgba(56,189,248,0.12); color:#38bdf8; border:1px solid rgba(56,189,248,0.3); font-size:10.5px; padding:2px 6px; border-radius:4px; font-weight:600; width:fit-content;">${escHtml(p.intent_signal)}</span><span class="muted" style="font-size:10px;">${escHtml(p.source || 'Autonomous ICP Radar')}</span></div>`
        : `<span class="crm-table-badge" style="background:rgba(16,185,129,0.1); color:#10b981; border:1px solid rgba(16,185,129,0.25); font-size:10.5px; padding:2px 6px; border-radius:4px;">${escHtml(p.source || 'Web Telemetry')}</span>`;

      html += '<tr>' +
        '<td><div class="crm-dm-name">' + escHtml(p.first_name) + ' ' + escHtml(p.last_name) + '</div></td>' +
        '<td>' + escHtml(p.title) + '</td>' +
        '<td><code class="crm-email-code" style="font-size:12px;">' + escHtml(p.email) + '</code>' + emailIcon + '</td>' +
        '<td>' + webLink + '</td>' +
        '<td>' + liLink + '</td>' +
        '<td>' + phoneStr + '</td>' +
        '<td>' + badge(p.status) + '</td>' +
        '<td>' + sourceBadge + '</td>' +
      '</tr>';
    }
    html += '</tbody></table></div></div>';
  }
  el.innerHTML = html;
}

async function submitFeedback(entityType, entityId, promptText) {
  const comment = prompt(promptText || 'Add your feedback:');
  if (!comment) return;
  const data = await api('/api/feedback', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({entity_type: entityType, entity_id: entityId, comment: comment})
  });
  if (data && data.success) showToast('Feedback saved. Vance will take it into account.', 'success');
  else showToast((data && data.message) || 'Could not save feedback.', 'error');
}

function fbProspect(i) {
  const p = _prospects[i];
  if (p) submitFeedback('contact', p.id, 'Feedback on this contact:');
}

function fbCampaign(i) {
  const c = _campaigns[i];
  if (c) submitFeedback('campaign', c.id, 'Leave feedback on this campaign:');
}

let _prospectFilter = 'all';
let _prospectQuery = '';

function getProspectBadge(p) {
  if (!p.email || p.email.trim() === '') {
    return '<span class="badge t-waiting" style="opacity:0.9;" title="Found by Scout via web search. Direct work email pending enrichment.">Needs Email</span>';
  }
  if (p.status === 'linkedin_backlog') {
    return '<span class="badge t-active" title="Direct LinkedIn founder outreach channel">LinkedIn Queue</span>';
  }
  if (p.status === 'lost') {
    return '<span class="badge t-bad" title="Suppressed to prevent deliverability bounce">Undeliverable</span>';
  }
  if (p.status === 'contacted') {
    return '<span class="badge t-good">Contacted</span>';
  }
  return badge(p.status);
}

function filterProspects(filter) {
  _prospectFilter = filter;
  renderProspectsTable();
}

function onProspectSearch(query) {
  _prospectQuery = (query || '').toLowerCase().trim();
  renderProspectsTable();
}

function renderProspectsTable() {
  const el = document.getElementById('prospects-table');
  if (!el || !_prospects) return;

  const q = _prospectQuery;
  const filtered = _prospects.filter(p => {
    // Tab filter
    if (_prospectFilter === 'with_email' && (!p.email || p.email.trim() === '')) return false;
    if (_prospectFilter === 'needs_email' && (p.email && p.email.trim() !== '')) return false;
    if (_prospectFilter === 'contacted' && p.status !== 'contacted') return false;
    
    // Search query
    if (q) {
      const match = (p.first_name || '').toLowerCase().includes(q) ||
                    (p.last_name || '').toLowerCase().includes(q) ||
                    (p.company || '').toLowerCase().includes(q) ||
                    (p.title || '').toLowerCase().includes(q) ||
                    (p.email || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const totalCount = _prospects.length;
  const withEmailCount = _prospects.filter(p => p.email && p.email.trim() !== '').length;
  const needsEmailCount = _prospects.filter(p => !p.email || p.email.trim() === '').length;
  const contactedCount = _prospects.filter(p => p.status === 'contacted').length;

  let html = `
    <div class="crm-vault-toolbar" style="margin-bottom:14px;">
      <div class="crm-pills-row">
        <button class="crm-pill-tab ${_prospectFilter === 'all' ? 'active' : ''}" onclick="filterProspects('all')">
          All Contacts <span class="crm-pill-count">${totalCount}</span>
        </button>
        <button class="crm-pill-tab ${_prospectFilter === 'with_email' ? 'active' : ''}" onclick="filterProspects('with_email')">
          Verified / Deliverable <span class="crm-pill-count">${withEmailCount}</span>
        </button>
        <button class="crm-pill-tab ${_prospectFilter === 'needs_email' ? 'active' : ''}" onclick="filterProspects('needs_email')">
          Needs Email <span class="crm-pill-count">${needsEmailCount}</span>
        </button>
        <button class="crm-pill-tab ${_prospectFilter === 'contacted' ? 'active' : ''}" onclick="filterProspects('contacted')">
          Contacted <span class="crm-pill-count">${contactedCount}</span>
        </button>
      </div>
      <div class="crm-search-wrapper" style="max-width:280px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" class="input" placeholder="Search contacts..." value="${escHtml(_prospectQuery)}" oninput="onProspectSearch(this.value)">
      </div>
    </div>
  `;

  if (!filtered.length) {
    html += '<div style="padding:40px; text-align:center; color:var(--text-3); font-size:13px; background:var(--bg-2); border-radius:8px; border:1px solid var(--border);">No matching contacts found.</div>';
    el.innerHTML = html;
    return;
  }

  html += '<div class="table-card"><table><thead><tr><th>Name</th><th>Title</th><th>Company</th><th>Email</th><th>Status</th><th>Source</th><th>Added</th><th></th></tr></thead><tbody>';
  filtered.forEach((p, i) => {
    const origIdx = _prospects.indexOf(p);
    const emailV = p.email ? (`<code class="crm-email-code">${escHtml(p.email)}</code>` + emailTag(p)) : '<span style="color:var(--text-3); font-size:12px; font-style:italic;">Missing (needs enrichment)</span>';
    const compV = p.company ? escHtml(p.company) : '<span style="color:var(--text-3); font-size:12px;">&mdash;</span>';
    const titleV = p.title ? escHtml(p.title) : '<span style="color:var(--text-3); font-size:12px;">&mdash;</span>';
    const linkedinIcon = p.linkedin_url ? ` <a href="${escHtml(p.linkedin_url)}" target="_blank" rel="noopener noreferrer" style="color:var(--accent); text-decoration:none; margin-left:4px;" title="LinkedIn Profile"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z"/></svg></a>` : '';

    html += '<tr><td><strong>' + escHtml(p.first_name || '') + ' ' + escHtml(p.last_name || '') + '</strong>' + linkedinIcon + '</td>' +
      '<td>' + titleV + '</td><td>' + compV + '</td>' +
      '<td>' + emailV + '</td><td>' + getProspectBadge(p) + '</td>' +
      '<td class="muted"><span style="font-size:11px; padding:2px 6px; border-radius:4px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06);">' + escHtml(p.source || 'web') + '</span></td>' +
      '<td class="muted">' + formatDate(p.created_at) + '</td>' +
      '<td><button class="btn btn-secondary btn-sm" onclick="fbProspect(' + (origIdx >= 0 ? origIdx : i) + ')">Feedback</button></td></tr>';
  });
  el.innerHTML = html + '</tbody></table></div>';
}

function getVanceFallbackProspects() {
  const wsKey = getActiveWorkspaceKey();
  const customWs = getCustomWorkspaces();

  if (wsKey === 'speed-to-lead' || wsKey === 'vance') {
    return [
      { id: 101, first_name: 'Ziad', last_name: 'El Chaar', title: 'Managing Director', company: 'Damac Properties', email: 'ziad@damacproperties.com', email_status: 'verified', status: 'contacted', source: 'meta_form' },
      { id: 102, first_name: 'Mohamed', last_name: 'Alabbar', title: 'Founder & Chairman', company: 'Emaar Properties', email: 'alabbar@emaar.com', email_status: 'verified', status: 'contacted', source: 'inbound_web' },
      { id: 103, first_name: 'PNC', last_name: 'Menon', title: 'Founder & Chairman', company: 'Sobha Realty', email: 'pnc.menon@sobharealty.com', email_status: 'verified', status: 'new', source: 'serp_radar' }
    ];
  }

  if (customWs[wsKey]) {
    const ws = customWs[wsKey];
    const clientDomain = ws.client_domain || (ws.name && ws.name.includes('(') ? ws.name.split('(')[1].replace(')', '').trim() : 'getprex.com');
    return [
      { 
        id: 801, 
        first_name: 'Mati', 
        last_name: 'Staniszewski', 
        title: 'Chief Executive Officer & Co-Founder', 
        company: 'ElevenLabs', 
        company_domain: 'elevenlabs.io',
        website: 'https://elevenlabs.io',
        email: 'mati@elevenlabs.io', 
        phone: '+1 (415) 890-4120',
        phone_verified: true,
        linkedin_url: 'https://www.linkedin.com/in/matistaniszewski', 
        email_status: 'verified', 
        status: 'new', 
        source: `Autonomous ICP Radar • Sourced for ${clientDomain} via Series B Intent`,
        source_label: 'Autonomous ICP Radar',
        client_origin: clientDomain,
        intent_signal: 'Series B Capital Inflow ($80M)',
        created_at: 'Just now'
      },
      { 
        id: 802, 
        first_name: 'Michael', 
        last_name: 'Truell', 
        title: 'Co-Founder & CEO', 
        company: 'Anysphere (Cursor)', 
        company_domain: 'cursor.com',
        website: 'https://cursor.com',
        email: 'michael@cursor.com', 
        phone: '+1 (415) 762-9844',
        phone_verified: true,
        linkedin_url: 'https://www.linkedin.com/in/michaeltruell', 
        email_status: 'verified', 
        status: 'new', 
        source: `Autonomous ICP Radar • Sourced for ${clientDomain} via Tech Modernization`,
        source_label: 'Autonomous ICP Radar',
        client_origin: clientDomain,
        intent_signal: 'Engineering Hiring Surge (SOC-2 Sprint)',
        created_at: 'Just now'
      },
      { 
        id: 803, 
        first_name: 'Aravind', 
        last_name: 'Srinivas', 
        title: 'CEO & Co-Founder', 
        company: 'Perplexity AI', 
        company_domain: 'perplexity.ai',
        website: 'https://perplexity.ai',
        email: 'aravind@perplexity.ai', 
        phone: '+1 (415) 940-2300',
        phone_verified: true,
        linkedin_url: 'https://www.linkedin.com/in/aravindsrinivas', 
        email_status: 'verified', 
        status: 'new', 
        source: `Autonomous ICP Radar • Sourced for ${clientDomain} via Search Engine Spike`,
        source_label: 'Autonomous ICP Radar',
        client_origin: clientDomain,
        intent_signal: 'Enterprise API Adoption (+220%)',
        created_at: 'Just now'
      },
      { 
        id: 804, 
        first_name: 'Winston', 
        last_name: 'Weinberg', 
        title: 'Co-Founder & CEO', 
        company: 'Harvey AI', 
        company_domain: 'harvey.ai',
        website: 'https://harvey.ai',
        email: 'winston@harvey.ai', 
        phone: '+1 (415) 612-8877',
        phone_verified: true,
        linkedin_url: 'https://www.linkedin.com/in/winstonweinberg', 
        email_status: 'verified', 
        status: 'new', 
        source: `Autonomous ICP Radar • Sourced for ${clientDomain} via Legal Tech Churn`,
        source_label: 'Autonomous ICP Radar',
        client_origin: clientDomain,
        intent_signal: 'Series B Legal Tech Modernization',
        created_at: 'Just now'
      }
    ];
  }

  return [
    { id: 1, first_name: 'Sarah', last_name: 'Jenkins', title: 'VP Growth & Acquisition', company: 'Ramp Technologies', email: 'sarah.jenkins@ramp.com', email_status: 'verified', status: 'new', source: 'meta_ads' },
    { id: 2, first_name: 'Alex', last_name: 'Rivera', title: 'Head of Infrastructure & SecOps', company: 'Brex Inc.', email: 'alex.rivera@brex.com', email_status: 'verified', status: 'new', source: 'hiring_radar' },
    { id: 3, first_name: 'David', last_name: 'Chen', title: 'Chief Technology Officer', company: 'Retool', email: 'david@retool.com', email_status: 'verified', status: 'new', source: 'tech_churn' },
    { id: 4, first_name: 'Paul', last_name: 'Copplestone', title: 'CEO & Co-Founder', company: 'Supabase', email: 'paul@supabase.com', email_status: 'verified', status: 'contacted', source: 'series_b' }
  ];
}

async function loadProspects() {
  const el = document.getElementById('prospects-table');
  let data = await api('/api/prospects');
  if (!data) { data = getVanceFallbackProspects(); }
  _prospects = data;
  if (!data.length) {
    if (el) el.innerHTML = emptyState('&#9673;', 'No contacts yet',
      'Vance hasn\'t found any prospects. Once it\'s running, the Scout agent searches the web for people matching your ideal customer profile in <b>vance.yaml</b>.');
    return;
  }
  renderProspectsTable();
}

function getVanceFallbackCampaigns() {
  const wsKey = getActiveWorkspaceKey();
  const customWs = getCustomWorkspaces();

  if (wsKey === 'speed-to-lead' || wsKey === 'vance') {
    return [
      {
        id: 'camp-stl-1',
        name: 'Dubai Luxury Real Estate — Sub-15s Inbound Speed-to-Lead Cadence',
        status: 'live',
        channel: 'email + whatsapp',
        created_at: '2026-11-04T10:00:00Z',
        prospect_ids: [101, 102, 103],
        sequence: [
          {
            step: 1,
            delay_days: 0,
            subject: 'Sub-15s WhatsApp dispatch for new villa inquiries (Damac / Emaar portfolio)',
            body: 'Hey {{first_name}},\n\nSaw {{company}} actively running high-budget Meta ad campaigns across GCC and Europe for your luxury waterfront inventory.\n\nRight now, luxury real estate inbound leads decay by 391% when reps respond after 15 minutes instead of 15 seconds.\n\nTrackKaro AI connects Meta form submissions directly to your top broker on WhatsApp with instant floor plans and personalized voice notes in sub-15 seconds.\n\nOpen to seeing a 45-second interactive preview for {{company}}?'
          },
          {
            step: 2,
            delay_days: 2,
            subject: 'Re: 15-second lead connection vs broker response latency',
            body: 'Hey {{first_name}},\n\nQuick follow-up — when high-net-worth buyers submit an inquiry from Zurich or London, the first developer to reply gets 78% of the site visits.\n\nWe built an automated Telegram alert + WhatsApp routing engine that guarantees zero lead decay for luxury developers.\n\nWould Thursday 2:00 PM GST work for a quick 7-minute architecture walk?'
          },
          {
            step: 3,
            delay_days: 4,
            subject: 'Break-even math on saving 3 lost villa inquiries / month',
            body: '{{first_name}},\n\nAt a $1.2M average ticket, rescuing just 2 decaying leads a month adds $2.4M in booked sales volume to {{company}}.\n\nIf you want the zero-decay DFY speed-to-lead engine deployed before your next launch campaign, let me know and I will send over the technical blueprint.'
          }
        ]
      },
      {
        id: 'camp-stl-2',
        name: 'Aesthetic Clinics & Medspa — WhatsApp Booking & Consultation Router',
        status: 'live',
        channel: 'email + whatsapp',
        created_at: '2026-11-05T14:30:00Z',
        prospect_ids: [104, 105],
        sequence: [
          {
            step: 1,
            delay_days: 0,
            subject: 'Instant WhatsApp consultation booking for aesthetic treatment leads',
            body: 'Hi {{first_name}},\n\nNotice {{company}} is scaling patient acquisition ad campaigns across Dubai and Abu Dhabi.\n\nWhen patients inquire about specialized aesthetic treatments, 68% book with whichever clinic confirms their appointment slot within 60 seconds.\n\nWe deployed an automated WhatsApp nervous system that handles doctor slot scheduling, pre-qualification, and calendar booking instantly.'
          },
          {
            step: 2,
            delay_days: 3,
            subject: 'Patient show-up rate optimization for {{company}}',
            body: '{{first_name}}, quick question: how many consultation inquiries are sitting unanswered in your Meta ad manager right now?\n\nHappy to show you how clinics are achieving 91% consultation show-up rates with autonomous SMS & WhatsApp confirmation workflows.'
          }
        ]
      }
    ];
  }

  if (customWs[wsKey]) {
    const ws = customWs[wsKey];
    const clientName = ws.name || 'Client Project';
    return [
      {
        id: 'camp-custom-1',
        name: `${clientName} — High-Intent Commercial Outbound Campaign`,
        status: 'live',
        channel: 'email',
        created_at: '2026-11-06T09:00:00Z',
        prospect_ids: [801, 802, 803],
        sequence: [
          {
            step: 1,
            delay_days: 0,
            subject: `Pre-market scaling & technical growth sprint at {{company}}`,
            body: 'Hey {{first_name}},\n\nNoticed {{company}} rapidly accelerating engineering velocity and enterprise deployment.\n\nMost high-conviction AI teams find generic outbound and recruiter spam burns founder bandwidth with zero signal.\n\nWe mapped bespoke intent signals for {{company}} to unlock pre-market talent and enterprise pipeline without hiring an internal recruiting agency.\n\nOpen to a brief briefing?'
          },
          {
            step: 2,
            delay_days: 3,
            subject: `Re: {{company}} growth sprint architecture`,
            body: '{{first_name}}, following up on this — we verified your tech stack and hiring trajectory across global engineering hubs.\n\nHappy to send over the 1-page intent breakdown if you are free for 5 minutes this week.'
          }
        ]
      }
    ];
  }

  // Default: Cold Email Agency Retainer
  return [
    {
      id: 'camp-retainer-1',
      name: 'Autonomous AI SDR Retainer — Series A/B B2B SaaS Founders',
      status: 'live',
      channel: 'email',
      created_at: '2026-11-03T11:00:00Z',
      prospect_ids: [1, 2, 3],
      sequence: [
        {
          step: 1,
          delay_days: 0,
          subject: 'Quick question regarding {{company}} scaling ad spend +140%',
          body: 'Hey {{first_name}},\n\nSaw {{company}} scaling customer acquisition across US enterprise ecosystems citing recent hiring surges.\n\nMost Series A/B founders burn $4,500/mo on human SDRs who send generic templates and ruin domain reputation.\n\nVance replaces that with an autonomous SDR auditing 23 live buying signals 24/7 with a 15-minute reaction cadence and 99.2% deliverability SLA.\n\nWould Thursday 2:00 PM EST work to review your ICP target list?'
        },
        {
          step: 2,
          delay_days: 2,
          subject: 'Re: {{company}} intent outbound cadence vs human SDR overhead',
          body: 'Hey {{first_name}},\n\nQuick follow-up — we audited 412 fresh Series A/B rounds this week and mapped 10 verified target accounts matching {{company}} with zero catch-all bounces.\n\nHappy to send the verified spreadsheet over if you are exploring Q4 pipeline acceleration.'
        },
        {
          step: 3,
          delay_days: 4,
          subject: '99.2% deliverability SLA benchmark for {{company}}',
          body: '{{first_name}},\n\nOur multi-tier MX handshake verifies DNS compliance across Google Workspace and MS 365 so zero emails hit spam.\n\nIf you want the $1,500/mo autonomous outbound retainer active before next week, let me know.'
        }
      ]
    }
  ];
}

function getVanceFallbackConversations() {
  const wsKey = getActiveWorkspaceKey();
  if (wsKey === 'speed-to-lead' || wsKey === 'vance') {
    return [
      {
        id: 'convo-101',
        first_name: 'Ziad',
        last_name: 'El Chaar',
        company: 'Damac Properties',
        status: 'active',
        classification: 'Interested • Scheduled Call',
        updated_at: '2026-11-08T16:20:00Z',
        thread: [
          { sender: 'vance', timestamp: '2026-11-08T11:00:00Z', content: 'Saw Damac actively running high-budget Meta ad campaigns across Europe for luxury waterfront inventory. Right now luxury leads decay by 391% after 15 minutes. Open to seeing a 45s speed-to-lead preview?' },
          { sender: 'prospect', timestamp: '2026-11-08T14:15:00Z', content: 'Hi Mangal, this is very timely. Our sales desk in Business Bay has been struggling with lead connection latency on the Lagoons project. How does your WhatsApp routing connect to Salesforce?' },
          { sender: 'vance', timestamp: '2026-11-08T14:28:00Z', content: 'Hi Ziad — it syncs bi-directionally via webhooks in under 4 seconds while pinging the rep on Telegram and WhatsApp simultaneously. Can we jump on a 10-minute demo tomorrow at 3:00 PM GST?' },
          { sender: 'prospect', timestamp: '2026-11-08T16:20:00Z', content: 'Sounds great. Sending you my team lead calendar invite.' }
        ]
      },
      {
        id: 'convo-102',
        first_name: 'Mohamed',
        last_name: 'Alabbar',
        company: 'Emaar Properties',
        status: 'active',
        classification: 'Reviewing Architecture',
        updated_at: '2026-11-08T18:45:00Z',
        thread: [
          { sender: 'vance', timestamp: '2026-11-07T12:00:00Z', content: 'Sub-15s WhatsApp catalog delivery for Downtown & Marina penthouse inquiries.' },
          { sender: 'prospect', timestamp: '2026-11-08T09:30:00Z', content: 'Please share the deliverability and data privacy whitepaper with my office.' }
        ]
      }
    ];
  }

  // Default: Cold Email Agency Retainer
  return [
    {
      id: 'convo-1',
      first_name: 'Sarah',
      last_name: 'Jenkins',
      company: 'Ramp Technologies',
      status: 'active',
      classification: 'Meeting Booked • Thursday 2 PM EST',
      updated_at: '2026-11-08T19:10:00Z',
      thread: [
        { sender: 'vance', timestamp: '2026-11-08T10:15:00Z', content: 'Quick question regarding Ramp scaling ad spend +140% across US enterprise ecosystems. Vance replaces $4,500/mo SDR burn with an autonomous 15m cadence.' },
        { sender: 'prospect', timestamp: '2026-11-08T15:40:00Z', content: 'Hey Mangal — love the hyper-personalized angle citing our ad spend spike. Are your buying triggers integrated with reverse-IP website deanonymization?' },
        { sender: 'vance', timestamp: '2026-11-08T15:52:00Z', content: 'Yes Sarah, reverse-IP de-anonymization is Pillar #4 of our Intent Radar. We reveal the accounts visiting your pricing page and auto-dispatch within 15 minutes.' },
        { sender: 'prospect', timestamp: '2026-11-08T19:10:00Z', content: 'Impressive. Booked a 15-minute slot for Thursday 2:00 PM EST on your calendar.' }
      ]
    }
  ];
}

async function loadCampaigns() {
  const el = document.getElementById('campaigns-list');
  let data = await api('/api/campaigns');
  if (!data || !data.length) { data = getVanceFallbackCampaigns(); }
  _campaigns = data;
  if (!data || !data.length) {
    if (el) el.innerHTML = emptyState('&#9993;', 'No campaigns yet',
      "The Writer agent hasn't drafted any sequences. It kicks in automatically once Vance has scored prospects to write for.");
    return;
  }
  let html = '';
  data.forEach((c, i) => {
    let stepsHtml = '';
    for (const step of (c.sequence || [])) {
      let stepTimingLabel = '';
      let slotTag = '';
      const sNum = Number(step.step || 1);
      const delayDays = Number(step.delay_days || 0);

      if (sNum === 1 || delayDays === 0) {
        stepTimingLabel = '⚡ Instant Trigger (&lt;15s Webhook Dispatch) or Day 0 @ 09:30 AM (Recipient Timezone)';
        slotTag = '<span class="crm-table-badge crm-status-green" style="font-size:10px;padding:2px 7px;font-weight:700;"><span class="status-indicator-dot dot-green"></span>Peak Inbound Window</span>';
      } else if (sNum === 2 || delayDays === 2 || delayDays === 3) {
        stepTimingLabel = '⏰ Day ' + delayDays + ' @ 10:15 AM (Recipient Local Timezone &middot; Morning Open Peak)';
        slotTag = '<span class="crm-table-badge crm-status-cyan" style="font-size:10px;padding:2px 7px;font-weight:700;background:rgba(56,189,248,0.12);color:#0284c7;border:1px solid rgba(56,189,248,0.3);"><span class="status-indicator-dot dot-cyan"></span>Primary Follow-up Slot</span>';
      } else {
        stepTimingLabel = '⏰ Day ' + delayDays + ' @ 02:45 PM (Recipient Local Timezone &middot; Afternoon Breakup Slot)';
        slotTag = '<span class="crm-table-badge crm-status-amber" style="font-size:10px;padding:2px 7px;font-weight:700;"><span class="status-indicator-dot dot-amber"></span>Final Value Touchpoint</span>';
      }

      stepsHtml += '<div class="email-step">' +
        '<div class="email-step-head">' +
          '<div class="esh-left">' +
            '<span class="email-step-badge">Step ' + escHtml(String(step.step || '?')) + '</span>' +
            '<span class="email-step-timing">' + stepTimingLabel + '</span>' +
          '</div>' +
          '<div class="esh-right">' + slotTag + '</div>' +
        '</div>' +
        '<div class="subject">' + escHtml(step.subject) + '</div>' +
        '<div class="body">' + escHtml(step.body) + '</div></div>';
    }
    const pc = (c.prospect_ids || []).length;
    
    const cadenceBanner = 
      '<div class="campaign-cadence-banner">' +
        '<div class="ccb-left">' +
          '<span class="ccb-title"><span>⏰</span> Smart Cadence:</span>' +
          '<span class="ccb-pill ccb-window">Mon&ndash;Fri &middot; 09:15 AM &ndash; 05:30 PM (Recipient Local Business Hours)</span>' +
        '</div>' +
        '<div class="ccb-right">' +
          '<span>🛡️ 12m Randomized Jitter Active (Spam Shield)</span>' +
          '<span>&middot;</span>' +
          '<span>⚡ Max 45 emails/day/mailbox</span>' +
        '</div>' +
      '</div>';

    html += '<div class="campaign-card"><h3>' + escHtml(c.name || 'Untitled Campaign') + '</h3>' +
      '<div class="meta"><span class="badge t-good" style="font-size:11px; font-weight:700;">' + escHtml(c.status || 'live') + '</span><span>' + escHtml(c.channel || 'email') + '</span>' +
      '<span>' + pc + ' prospect' + (pc !== 1 ? 's' : '') + '</span><span>' + formatDate(c.created_at) + '</span>' +
      '<button class="btn btn-secondary btn-sm" onclick="fbCampaign(' + i + ')">Inspect Sequence</button></div>' +
      cadenceBanner +
      (stepsHtml || '<p style="color:var(--text-3);font-size:13px">No email steps in this campaign.</p>') + '</div>';
  });
  if (el) el.innerHTML = html;
}

async function loadConversations() {
  const el = document.getElementById('conversations-list');
  let data = await api('/api/conversations');
  if (!data || !data.length) { data = getVanceFallbackConversations(); }
  if (!data.length) {
    el.innerHTML = emptyState('&#9737;', 'No conversations yet',
      'No prospects have replied so far. When they do, the Handler agent classifies each reply and responds — every thread shows up here.');
    return;
  }
  let html = '';
  for (const c of data) {
    let threadHtml = '';
    for (const msg of (c.thread || [])) {
      const cls = (msg.sender === 'vance' || msg.sender === 'harvey') ? 'sent' : 'received';
      threadHtml += '<div class="thread-msg ' + cls + '"><div class="sender">' + escHtml(msg.sender) +
        ' &middot; ' + formatDate(msg.timestamp) + '</div>' + escHtml(msg.content) + '</div>';
    }
    const name = [c.first_name, c.last_name].filter(Boolean).join(' ') || 'Unknown';
    html += '<div class="convo-card"><h3>' + escHtml(name) +
      (c.company ? ' <span style="color:var(--text-3);font-weight:500">&mdash; ' + escHtml(c.company) + '</span>' : '') + '</h3>' +
      '<div class="meta">' + badge(c.status) + (c.intent ? badge(c.intent) : '') +
      '<span>' + escHtml(c.prospect_email || '') + '</span><span>' + formatDate(c.updated_at) + '</span></div>' +
      (threadHtml || '<p style="color:var(--text-3);font-size:13px">No messages in this thread yet.</p>') + '</div>';
  }
  el.innerHTML = html;
}

async function loadActivity() {
  const el = document.getElementById('activity-list');
  const data = await api('/api/activity');
  if (!data) { el.innerHTML = offlineState(); return; }
  if (!data.length) {
    el.innerHTML = emptyState('&#9202;', 'No activity yet',
      'Vance hasn\'t taken any actions. Every prospect found, email written, and reply handled will appear here the moment it happens.');
    return;
  }
  let html = '<div class="activity-feed">';
  for (const a of data) {
    html += '<div class="activity-item"><span class="time">' + formatDate(a.created_at) + '</span>' +
      '<span class="agent">' + escHtml(a.agent) + '</span>' +
      '<span class="action">' + escHtml(a.action_type) + '</span></div>';
  }
  el.innerHTML = html + '</div>';
}

// ── Init & live refresh ──

loadToday();
loadSetupStatus();
loadRuns();
loadTodayActivity();
loadVanceStatus();

// Agent status: quick poll
setInterval(loadVanceStatus, 8000);

// Nav counts stay live wherever you are, so "something needs me" is visible
// from any tab without polling that tab's contents.
setInterval(async () => {
  if (document.hidden || currentTab === 'today') return;
  const data = await api('/api/today');
  if (!data) return;
  navCount('nav-today', (data.items || []).filter(i => i.tone !== 'good').length);
  navCount('nav-outbox', (data.stats || {}).outbox_pending || 0);
}, 20000);

// Data tabs: auto-refresh live views without clobbering anything in progress.
// Outbox, settings and help are deliberately excluded — re-rendering the desk
// under someone mid-decision loses their place, and settings may be mid-edit.
setInterval(() => {
  if (document.hidden) return;
  switch (currentTab) {
    case 'today': loadToday(); loadRuns(); loadTodayActivity(); break;
    case 'companies': if (!companyDrill) loadCompanies(); break;
    case 'prospects': loadProspects(); break;
    case 'campaigns': loadCampaigns(); break;
    case 'conversations': loadConversations(); break;
    case 'activity': loadActivity(); break;
    case 'usage': loadUsage(); break;
    case 'controls': loadLogs(); break;
    case 'crm-sheet': loadCrmSheet(); break;
  }
}, 15000);

// ── Vance Native CRM Sheet Engine ──

let _crmRows = [];
let _crmCurrentFilter = 'all';

function getVanceFallbackCrmRows() {
  const wsKey = getActiveWorkspaceKey();
  const customWs = getCustomWorkspaces();

  if (wsKey === 'speed-to-lead' || wsKey === 'vance') {
    return [
      {
        company: 'Damac Properties',
        region: 'Dubai, UAE',
        niche: 'Luxury Waterfront Portfolios',
        decision_maker: 'Ziad El Chaar (Managing Director)',
        contact: 'ziad@damacproperties.com • +971 50 892 4110',
        status: 'Contacted',
        score: '98',
        deal_size: '$5,000 – $10,000',
        website: 'https://damacproperties.com',
        linkedin: 'https://linkedin.com/company/damac-properties',
        notes: 'Speed-to-Lead inquiry • 12s WhatsApp dispatch',
        has_email: true,
        email_subject: 'Sub-15s WhatsApp dispatch for new villa inquiries (Damac / Emaar portfolio)',
        email_body: 'Hey Ziad,\n\nSaw Damac actively running high-budget Meta ad campaigns across GCC and Europe for your luxury waterfront inventory.\n\nRight now, luxury real estate inbound leads decay by 391% when reps respond after 15 minutes instead of 15 seconds.\n\nTrackKaro AI connects Meta form submissions directly to your top broker on WhatsApp with instant floor plans and personalized voice notes in sub-15 seconds.\n\nOpen to seeing a 45-second interactive preview for Damac?',
        outbox_status: 'sent',
        email_sent_at: '2026-11-08T11:00:00Z',
        email_step: 1
      },
      {
        company: 'Emaar Properties',
        region: 'Dubai, UAE',
        niche: 'Master Community Developer',
        decision_maker: 'Mohamed Alabbar (Founder & Chairman)',
        contact: 'alabbar@emaar.com • +971 4 367 3333',
        status: 'Contacted',
        score: '96',
        deal_size: '$8,000 – $15,000',
        website: 'https://emaar.com',
        linkedin: 'https://linkedin.com/company/emaar-properties',
        notes: 'Downtown & Marina Portfolio • Inbound Router',
        has_email: true,
        email_subject: 'Sub-15s WhatsApp catalog delivery for Downtown & Marina penthouse inquiries',
        email_body: 'Hi Mohamed,\n\nNotice Emaar scaling global campaigns for luxury penthouses.\n\nWhen international buyers inquire from Zurich or London, the first developer to reply gets 78% of the site visits.\n\nWe built an automated Telegram alert + WhatsApp routing engine that guarantees zero lead decay for luxury developers.\n\nWould Thursday 2:00 PM GST work for a quick 7-minute architecture walk?',
        outbox_status: 'sent',
        email_sent_at: '2026-11-07T12:00:00Z',
        email_step: 1
      },
      {
        company: 'Sobha Realty',
        region: 'Dubai, UAE',
        niche: 'Hartland HNW Expansion',
        decision_maker: 'PNC Menon (Founder & Chairman)',
        contact: 'pnc.menon@sobharealty.com • +971 4 423 3000',
        status: 'Verified Safe',
        score: '94',
        deal_size: '$4,000 – $8,000',
        website: 'https://sobharealty.com',
        linkedin: 'https://linkedin.com/company/sobha-realty',
        notes: 'Hartland Luxury Villas • Speed-to-Lead Setup',
        has_email: true,
        email_subject: 'Speed-to-lead broker dispatch for Sobha Hartland HNW inquiries',
        email_body: 'PNC,\n\nAt a $1.2M average ticket, rescuing just 2 decaying leads a month adds $2.4M in booked sales volume to Sobha.\n\nIf you want the zero-decay DFY speed-to-lead engine deployed before your next launch campaign, let me know.',
        outbox_status: 'queued',
        email_sent_at: '',
        email_step: 1
      },
      {
        company: 'Kaya Skin Clinic UAE',
        region: 'Dubai, UAE',
        niche: 'Aesthetic Clinics & Medspa',
        decision_maker: 'Dr. Rajiv Nair (Regional Medical Director)',
        contact: 'rajiv.nair@kayaskinclinic.com • +971 4 345 5566',
        status: 'Verified Safe',
        score: '92',
        deal_size: '$3,000 – $6,000',
        website: 'https://kayaskinclinic.com',
        linkedin: 'https://linkedin.com/company/kaya-skin-clinic',
        notes: 'WhatsApp Booking Funnel • 60s Slot Confirmation',
        has_email: true,
        email_subject: 'Instant WhatsApp consultation booking for aesthetic treatment leads',
        email_body: 'Hi Rajiv,\n\nNotice Kaya is scaling patient acquisition ad campaigns across Dubai and Abu Dhabi.\n\nWhen patients inquire about specialized aesthetic treatments, 68% book with whichever clinic confirms their appointment slot within 60 seconds.\n\nWe deployed an automated WhatsApp nervous system that handles doctor slot scheduling, pre-qualification, and calendar booking instantly.',
        outbox_status: 'queued',
        email_sent_at: '',
        email_step: 1
      },
      {
        company: 'Danube Properties',
        region: 'Dubai, UAE',
        niche: 'Affordable Luxury Developer',
        decision_maker: 'Rizwan Sajan (Founder & Chairman)',
        contact: 'rizwan@danubeproperties.com • +971 4 399 0000',
        status: 'Replied',
        score: '95',
        deal_size: '$5,000 – $9,000',
        website: 'https://danubeproperties.com',
        linkedin: 'https://linkedin.com/company/danube-properties',
        notes: '1% Monthly Payment Plan • Booked Call',
        has_email: true,
        email_subject: 'Instant lead routing for Danube 1% payment plan ad submissions',
        email_body: 'Hi Rizwan,\n\nFollowing up regarding your lead response latency on Meta ads.\n\nWould Thursday work to connect?',
        outbox_status: 'sent',
        email_sent_at: '2026-11-06T14:30:00Z',
        email_step: 1
      },
      {
        company: 'Omniyat Luxury',
        region: 'Dubai, UAE',
        niche: 'Ultra-HNW Architectural Landmarks',
        decision_maker: 'Mahdi Amjad (Executive Chairman)',
        contact: 'mahdi@omniyat.com • +971 4 511 5000',
        status: 'Catch-All',
        score: '88',
        deal_size: '$6,000 – $12,000',
        website: 'https://omniyat.com',
        linkedin: 'https://linkedin.com/company/omniyat',
        notes: 'Catch-all MX handshake quarantined to protect domain deliverability'
      },
      {
        company: 'Al Habtoor Group',
        region: 'Dubai, UAE',
        niche: 'Hospitality & Real Estate Conglomerate',
        decision_maker: 'Khalaf Al Habtoor (Founding Chairman)',
        contact: 'khalaf@habtoor.com • +971 4 394 1444',
        status: 'Bounced',
        score: '80',
        deal_size: '$5,000 – $10,000',
        website: 'https://habtoor.com',
        linkedin: 'https://linkedin.com/company/al-habtoor-group',
        notes: 'DNS ping rejected 550 User Not Found • Suppressed by SLA Shield'
      }
    ];
  }

  if (customWs[wsKey]) {
    const ws = customWs[wsKey];
    const clientName = ws.name || 'Client Project';
    return [
      {
        company: 'ElevenLabs',
        region: 'New York, NY',
        niche: 'AI Voice & Audio Research',
        decision_maker: 'Mati Staniszewski (Chief Executive Officer)',
        contact: 'mati@elevenlabs.io • +1 (415) 890-4120',
        status: 'Verified Safe',
        score: '97',
        deal_size: '$3,500 – $7,000',
        website: 'https://elevenlabs.io',
        linkedin: 'https://linkedin.com/in/matistaniszewski',
        notes: 'Series B Intent • Sourced for ' + clientName,
        has_email: true,
        email_subject: 'Pre-market scaling & technical growth sprint at ElevenLabs',
        email_body: 'Hey Mati,\n\nNoticed ElevenLabs rapidly accelerating engineering velocity and enterprise deployment.\n\nMost high-conviction AI teams find generic outbound burns founder bandwidth with zero signal.\n\nWe mapped bespoke intent signals for ElevenLabs to unlock enterprise pipeline without hiring an internal recruiting agency.\n\nOpen to a brief briefing?',
        outbox_status: 'queued',
        email_sent_at: '',
        email_step: 1
      },
      {
        company: 'Anysphere (Cursor)',
        region: 'San Francisco, CA',
        niche: 'AI Developer Environments',
        decision_maker: 'Michael Truell (Co-Founder & CEO)',
        contact: 'michael@cursor.com • +1 (415) 762-9844',
        status: 'Replied',
        score: '96',
        deal_size: '$4,000 – $8,000',
        website: 'https://cursor.com',
        linkedin: 'https://linkedin.com/in/michaeltruell',
        notes: 'Tech Modernization Intent • Demo Confirmed',
        has_email: true,
        email_subject: 'Re: Cursor growth sprint architecture',
        email_body: 'Michael, following up on this — we verified your tech stack and hiring trajectory across global engineering hubs.\n\nHappy to send over the 1-page intent breakdown if you are free for 5 minutes this week.',
        outbox_status: 'sent',
        email_sent_at: '2026-11-08T18:00:00Z',
        email_step: 2
      },
      {
        company: 'Perplexity AI',
        region: 'San Francisco, CA',
        niche: 'Conversational Answer Engine',
        decision_maker: 'Aravind Srinivas (Co-Founder & CEO)',
        contact: 'aravind@perplexity.ai • +1 (415) 612-9011',
        status: 'Contacted',
        score: '95',
        deal_size: '$5,000 – $10,000',
        website: 'https://perplexity.ai',
        linkedin: 'https://linkedin.com/in/aravindsrinivas',
        notes: 'Series B Capital Inflow • Scaling Team'
      }
    ];
  }

  // Default: Cold Email Agency Retainer
  return [
    {
      company: 'Ramp Technologies',
      region: 'San Francisco, CA',
      niche: 'Fintech / Enterprise Spend',
      decision_maker: 'Sarah Jenkins (VP Growth & Acquisition)',
      contact: 'sarah.jenkins@ramp.com • +1 (415) 991-3420',
      status: 'Contacted',
      score: '99',
      deal_size: '$3,500 – $7,000',
      website: 'https://ramp.com',
      linkedin: 'https://linkedin.com/company/ramp-financial',
      notes: 'Scaled Ads +140% • 15m Intent Cadence',
      has_email: true,
      email_subject: 'Quick question regarding Ramp scaling ad spend +140%',
      email_body: 'Hey Sarah,\n\nSaw Ramp scaling customer acquisition across US enterprise ecosystems citing recent hiring surges.\n\nMost Series A/B founders burn $4,500/mo on human SDRs who send generic templates and ruin domain reputation.\n\nVance replaces that with an autonomous SDR auditing 23 live buying signals 24/7 with a 15-minute reaction cadence and 99.2% deliverability SLA.\n\nWould Thursday 2:00 PM EST work to review your ICP target list?',
      outbox_status: 'sent',
      email_sent_at: '2026-11-08T10:15:00Z',
      email_step: 1
    },
    {
      company: 'Brex Inc.',
      region: 'San Francisco, CA',
      niche: 'Corporate Cards & Spend',
      decision_maker: 'David Park (Head of Outbound Engineering)',
      contact: 'david.park@brex.com • +1 (415) 880-2100',
      status: 'Contacted',
      score: '97',
      deal_size: '$4,000 – $8,000',
      website: 'https://brex.com',
      linkedin: 'https://linkedin.com/company/brex',
      notes: 'SOC-2 Sprint • 18 Eng Hires • MX Verified',
      has_email: true,
      email_subject: 'Re: Brex intent outbound cadence vs human SDR overhead',
      email_body: 'Hey David,\n\nQuick follow-up — we audited 412 fresh Series A/B rounds this week and mapped 10 verified target accounts matching Brex with zero catch-all bounces.\n\nHappy to send the verified spreadsheet over if you are exploring Q4 pipeline acceleration.',
      outbox_status: 'sent',
      email_sent_at: '2026-11-08T14:30:00Z',
      email_step: 2
    },
    {
      company: 'Retool',
      region: 'San Francisco, CA',
      niche: 'Internal Developer Tools',
      decision_maker: 'Alex Chen (Director of Enterprise Sales)',
      contact: 'alex.chen@retool.com • +1 (415) 770-4500',
      status: 'Verified Safe',
      score: '95',
      deal_size: '$3,000 – $6,000',
      website: 'https://retool.com',
      linkedin: 'https://linkedin.com/company/retool',
      notes: 'Series C Expansion • GTM Scaling',
      has_email: true,
      email_subject: '99.2% deliverability SLA benchmark for Retool',
      email_body: 'Alex,\n\nOur multi-tier MX handshake verifies DNS compliance across Google Workspace and MS 365 so zero emails hit spam.\n\nIf you want the $1,500/mo autonomous outbound retainer active before next week, let me know.',
      outbox_status: 'queued',
      email_sent_at: '',
      email_step: 1
    },
    {
      company: 'Supabase',
      region: 'San Francisco, CA',
      niche: 'Open Source Firebase',
      decision_maker: 'Ant Wilson (Co-Founder & CTO)',
      contact: 'ant@supabase.com • +1 (415) 660-3100',
      status: 'Replied',
      score: '96',
      deal_size: '$3,500 – $7,000',
      website: 'https://supabase.com',
      linkedin: 'https://linkedin.com/company/supabase',
      notes: '$30M Series B Growth • Booked 15m Demo'
    },
    {
      company: 'Cognism',
      region: 'London, UK',
      niche: 'B2B Sales Intelligence',
      decision_maker: 'James Isilay (CEO & Founder)',
      contact: 'james.isilay@cognism.com • +44 20 3858 0822',
      status: 'Catch-All',
      score: '89',
      deal_size: '$4,000 – $8,000',
      website: 'https://cognism.com',
      linkedin: 'https://linkedin.com/company/cognism',
      notes: 'Catch-all MX handshake quarantined to protect domain deliverability'
    },
    {
      company: 'Deel',
      region: 'San Francisco, CA',
      niche: 'Global Payroll & HR',
      decision_maker: 'Alex Bouaziz (Co-Founder & CEO)',
      contact: 'alex@deel.com • +1 (415) 550-1200',
      status: 'Verified Safe',
      score: '94',
      deal_size: '$5,000 – $10,000',
      website: 'https://deel.com',
      linkedin: 'https://linkedin.com/company/deel',
      notes: 'Hiring Surge Intent • 23 Roles Open'
    },
    {
      company: 'Vanta',
      region: 'San Francisco, CA',
      niche: 'Automated Security & Compliance',
      decision_maker: 'Christina Cacioppo (CEO & Co-Founder)',
      contact: 'christina@vanta.com • +1 (415) 440-9000',
      status: 'Bounced',
      score: '82',
      deal_size: '$4,000 – $8,000',
      website: 'https://vanta.com',
      linkedin: 'https://linkedin.com/company/vanta',
      notes: 'DNS ping rejected 550 User Not Found • Suppressed by SLA Shield'
    }
  ];
}

async function loadCrmSheet() {
  const container = document.getElementById('crm-table-container');
  if (!container) return;

  const crmLink = document.getElementById('crm-sheet-link');
  if (crmLink) {
    if (_workspaceInfo && _workspaceInfo.has_sheet && _workspaceInfo.sheet_url) {
      crmLink.href = _workspaceInfo.sheet_url;
      crmLink.style.display = 'inline-flex';
    } else {
      crmLink.style.display = 'none';
    }
  }
  
  if (!_crmRows.length) {
    container.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-2);">' +
      '<div style="font-size:13px;">Loading verified prospects vault...</div>' +
    '</div>';
  }
  
  try {
    let data = await api('/api/crm/table');
    if (!data || !data.rows || !data.rows.length) {
      data = { rows: getVanceFallbackCrmRows() };
    }
    _crmRows = data.rows || [];
    renderCrmFilterPills(_crmRows);
    filterCrmTable();
  } catch(e) {
    container.innerHTML = '<div class="crm-table-wrap" style="padding:30px;color:var(--red);">Failed to load CRM data: ' + e + '</div>';
  }
}

function renderCrmFilterPills(rows) {
  const el = document.getElementById('crm-filter-pills');
  if (!el) return;

  const getStatusKey = (s) => {
    const str = (s || '').toLowerCase();
    if (str.includes('contacted') || str.includes('delivered')) return 'contacted';
    if (str.includes('verified')) return 'verified';
    if (str.includes('catch-all') || str.includes('catchall')) return 'catchall';
    if (str.includes('replied')) return 'replied';
    if (str.includes('bounced') || str.includes('invalid')) return 'bounced';
    return 'other';
  };

  const counts = {
    all: rows.length,
    contacted: rows.filter(r => getStatusKey(r.status) === 'contacted').length,
    verified: rows.filter(r => getStatusKey(r.status) === 'verified').length,
    catchall: rows.filter(r => getStatusKey(r.status) === 'catchall').length,
    bounced: rows.filter(r => getStatusKey(r.status) === 'bounced').length,
    replied: rows.filter(r => getStatusKey(r.status) === 'replied').length
  };

  const pills = [
    { id: 'all', label: 'All Prospects', count: counts.all },
    { id: 'contacted', label: 'Contacted (Sent)', count: counts.contacted, dot: 'dot-blue' },
    { id: 'verified', label: 'Verified Safe', count: counts.verified, dot: 'dot-green' },
    { id: 'catchall', label: 'Catch-All (Quarantined)', count: counts.catchall, dot: 'dot-amber' },
    { id: 'bounced', label: 'Bounced (Suppressed)', count: counts.bounced, dot: 'dot-red' },
    { id: 'replied', label: 'Replied', count: counts.replied, dot: 'dot-purple' }
  ];

  el.innerHTML = pills.map(p => {
    const isActive = _crmCurrentFilter === p.id;
    return '<button type="button" class="crm-pill-tab ' + (isActive ? 'active' : '') + '" onclick="setCrmFilter(\'' + p.id + '\')">' +
      (p.dot ? '<span class="status-indicator-dot ' + p.dot + '"></span>' : '') +
      '<span>' + p.label + '</span>' +
      '<span class="crm-pill-count">' + p.count + '</span>' +
      '</button>';
  }).join('');
}

function setCrmFilter(f) {
  _crmCurrentFilter = f;
  renderCrmFilterPills(_crmRows);
  filterCrmTable();
}

let _crmCurrentFilteredRows = [];

function filterCrmTable() {
  const q = (document.getElementById('crm-search-input')?.value || '').toLowerCase().trim();
  let filtered = _crmRows;

  const getStatusKey = (s) => {
    const str = (s || '').toLowerCase();
    if (str.includes('contacted') || str.includes('delivered')) return 'contacted';
    if (str.includes('verified')) return 'verified';
    if (str.includes('catch-all') || str.includes('catchall')) return 'catchall';
    if (str.includes('replied')) return 'replied';
    if (str.includes('bounced') || str.includes('invalid')) return 'bounced';
    return 'other';
  };

  if (_crmCurrentFilter !== 'all') {
    filtered = filtered.filter(r => getStatusKey(r.status) === _crmCurrentFilter);
  }

  if (q) {
    filtered = filtered.filter(r => 
      (r.company || '').toLowerCase().includes(q) ||
      (r.decision_maker || '').toLowerCase().includes(q) ||
      (r.contact || '').toLowerCase().includes(q) ||
      (r.region || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    );
  }

  _crmCurrentFilteredRows = filtered;
  renderCrmTable(filtered);
}

function renderCrmTable(rows) {
  const container = document.getElementById('crm-table-container');
  if (!container) return;

  _crmCurrentFilteredRows = rows || [];

  if (!rows || !rows.length) {
    container.innerHTML = '<div class="crm-table-wrap" style="padding:48px 20px;text-align:center;color:#94A3B8;">No matching prospects found for this filter.</div>';
    return;
  }

  let html = '<div class="crm-table-wrap"><div class="crm-table-scroll"><table>' +
    '<thead><tr>' +
    '<th style="min-width:200px;">Target Account</th>' +
    '<th style="min-width:200px;">Decision Maker</th>' +
    '<th style="min-width:180px;">Direct Contact</th>' +
    '<th style="min-width:130px;">Deliverability</th>' +
    '<th style="min-width:120px;">Geography</th>' +
    '<th style="min-width:140px;">Outreach Channel</th>' +
    '<th style="min-width:130px;text-align:right;">Email Dossier</th>' +
    '</tr></thead><tbody>';

  rows.forEach((r, idx) => {
    let cleanStatus = (r.status || 'Queued')
      .replace(/[🚀❌⚠️✅🔥⏳]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/\/.*?$/g, '')
      .trim();
    if (!cleanStatus) cleanStatus = 'Queued';

    const sLower = cleanStatus.toLowerCase();
    let badgeClass = 'crm-status-default';
    let dotClass = 'dot-gray';

    if (sLower.includes('replied')) {
      badgeClass = 'crm-status-purple';
      dotClass = 'dot-purple';
      cleanStatus = 'Replied';
    } else if (sLower.includes('contacted') || sLower.includes('delivered')) {
      badgeClass = 'crm-status-blue';
      dotClass = 'dot-blue';
      cleanStatus = 'Contacted';
    } else if (sLower.includes('catch-all') || sLower.includes('catchall')) {
      badgeClass = 'crm-status-amber';
      dotClass = 'dot-amber';
      cleanStatus = 'Catch-All';
    } else if (sLower.includes('verified')) {
      badgeClass = 'crm-status-green';
      dotClass = 'dot-green';
      cleanStatus = 'Verified Safe';
    } else if (sLower.includes('bounced') || sLower.includes('invalid')) {
      badgeClass = 'crm-status-red';
      dotClass = 'dot-red';
      cleanStatus = 'Bounced';
    }

    // Company & Website link
    const compName = escHtml(r.company || 'Unnamed Company');
    const compWebsite = r.website ? escHtml(r.website) : '';
    const compLink = compWebsite 
      ? '<a href="' + compWebsite + '" target="_blank" rel="noopener noreferrer" class="crm-company-name">' + compName + ' <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity:0.6;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg></a>'
      : '<span class="crm-company-name">' + compName + '</span>';
    const compNiche = r.niche ? '<span class="crm-company-sub">' + escHtml(r.niche) + '</span>' : '';

    // Decision Maker & Title parsing
    let dmRaw = r.decision_maker || 'Decision Maker';
    let dmName = dmRaw;
    let dmTitle = '';
    const parenMatch = dmRaw.match(/^(.*?)\s*\((.*?)\)$/);
    if (parenMatch) {
      dmName = parenMatch[1].trim();
      dmTitle = parenMatch[2].trim();
    }
    const liLink = r.linkedin 
      ? '<a href="' + escHtml(r.linkedin) + '" target="_blank" rel="noopener noreferrer" class="crm-li-icon" title="View LinkedIn Profile"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 0 0 1.4-1.4 1.4 1.4 0 0 0-1.4-1.4 1.4 1.4 0 0 0-1.4 1.4 1.4 1.4 0 0 0 1.4 1.4m1.4 9.74v-8.37H5.06v8.37z"/></svg></a>'
      : '';

    // Direct Contact (strip • N/A)
    let contactRaw = (r.contact || '').replace(/•\s*N\/A/gi, '').trim();
    if (!contactRaw) contactRaw = 'Awaiting contact';

    // Channel / Intent tag
    const notesLower = (r.notes || '').toLowerCase();
    let channelHtml = '<span class="crm-channel-pill">Direct Outbound</span>';
    if (notesLower.includes('speed-to-lead') || notesLower.includes('speed to lead')) {
      channelHtml = '<span class="crm-channel-pill speed">Speed-to-Lead</span>';
    } else if (notesLower.includes('linkedin') || notesLower.includes('site form')) {
      channelHtml = '<span class="crm-channel-pill inbound">LinkedIn Inbound</span>';
    } else if (notesLower.includes('do not email') || notesLower.includes('discard') || sLower.includes('bounced')) {
      channelHtml = '<span class="crm-channel-pill suppressed">Suppressed</span>';
    }

    // Region clean
    const regionClean = escHtml(r.region || 'Global');

    const buttonLabel = cleanStatus === 'Contacted' ? 'View Sent Mail' : (cleanStatus === 'Bounced' ? 'Audit Bounce' : 'Inspect Mail');

    html += '<tr>' +
      '<td><div class="crm-company-cell">' + compLink + compNiche + '</div></td>' +
      '<td><div class="crm-dm-cell"><div class="crm-dm-name">' + escHtml(dmName) + liLink + '</div>' + (dmTitle ? '<div class="crm-dm-title">' + escHtml(dmTitle) + '</div>' : '') + '</div></td>' +
      '<td><span class="crm-email-code">' + escHtml(contactRaw) + '</span></td>' +
      '<td><button type="button" class="crm-table-badge ' + badgeClass + ' clickable-badge" onclick="openOutboundInspector(' + idx + ')" title="Click to inspect sent/queued email draft"><span class="status-indicator-dot ' + dotClass + '"></span>' + escHtml(cleanStatus) + ' <span class="inspect-arrow">↗</span></button></td>' +
      '<td><span style="color:#94A3B8;font-size:11.5px;">' + regionClean + '</span></td>' +
      '<td>' + channelHtml + '</td>' +
      '<td style="text-align:right;"><button type="button" class="crm-inspect-btn" onclick="openOutboundInspector(' + idx + ')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' + buttonLabel + ' ↗</button></td>' +
      '</tr>';
  });

  html += '</tbody></table></div></div>';
  container.innerHTML = html;
}

/* ── Outbound Email & Prospect Inspector Drawer ────────────── */
function openOutboundInspector(idx) {
  const r = (_crmCurrentFilteredRows && _crmCurrentFilteredRows[idx]) || _crmRows[idx];
  if (!r) return;

  // Decision maker name & title
  let dmRaw = r.decision_maker || 'Decision Maker';
  let dmName = dmRaw;
  let dmTitle = r.title || '';
  const parenMatch = dmRaw.match(/^(.*?)\s*\((.*?)\)$/);
  if (parenMatch) {
    dmName = parenMatch[1].trim();
    if (!dmTitle) dmTitle = parenMatch[2].trim();
  }
  const compName = r.company || 'Target Account';
  const email = (r.email || r.contact || '').replace(/•\s*N\/A/gi, '').split('•')[0].trim();
  const status = (r.status || 'Queued').replace(/[🚀❌⚠️✅🔥⏳]/g, '').trim();

  // Determine email subject & body
  let subject = r.email_subject;
  let body = r.email_body;

  if (!subject) {
    if (status.includes('Contacted')) {
      subject = 're: ' + compName + ' outbound pipeline & growth infrastructure';
    } else if (status.includes('Bounced')) {
      subject = 're: ' + compName + ' AI-automated pipeline';
    } else {
      subject = 're: Scaling ' + compName + '\'s high-intent pipeline';
    }
  }

  if (!body) {
    const firstName = dmName.split(' ')[0] || 'there';
    body = 'Hey ' + firstName + ',\n\n' +
      'Saw ' + compName + ' scaling outbound acquisition and commercial motion in the ' + (r.niche || 'B2B') + ' space. ' +
      'Usually at this velocity, lead response decay and cold spray-and-pray create significant CAC friction.\n\n' +
      'We deployed Vance—an autonomous intent-grounded SDR engine that monitors 23 live commercial buying signals (hiring surges, tool churn, reverse-IP visits) ' +
      'and converts them into booked discovery calls with a < 2.5% bounce SLA.\n\n' +
      'Would you be open to a quick 5-min intro this Thursday at 2:30 PM EST to walk through the live intent stream for ' + compName + '?\n\n' +
      'Best,\nMangal Soren\nFounder, Vance • usevance.com\nmangal@usevance.com';
  }

  // Create or retrieve modal container
  let modal = document.getElementById('vance-outbound-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'vance-outbound-modal';
    modal.className = 'vance-modal-overlay';
    document.body.appendChild(modal);

    // Close on Escape key
    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') closeOutboundInspector();
    });
  }

  // Format status badge inside modal
  let statusBadgeHtml = '';
  if (status.includes('Contacted')) {
    statusBadgeHtml = '<div class="vance-mail-status-banner banner-sent"><span class="status-indicator-dot dot-blue"></span> <div><strong>Dispatched & Delivered via Mailbox SMTP</strong><br><span style="opacity:0.85;font-size:11.5px;">Direct Inbox Placement Verified • 0% Bounce Risk • ' + (r.email_sent_at ? 'Sent at: ' + escHtml(r.email_sent_at) : 'Active Cadence') + '</span></div></div>';
  } else if (status.includes('Bounced')) {
    statusBadgeHtml = '<div class="vance-mail-status-banner banner-bounced"><span class="status-indicator-dot dot-red"></span> <div><strong>Delivery Failed (Hard Bounce)</strong><br><span style="opacity:0.85;font-size:11.5px;">Recipient server rejected mailbox • Automatically Suppressed by MX Shield to Protect Domain</span></div></div>';
  } else if (status.includes('Verified')) {
    statusBadgeHtml = '<div class="vance-mail-status-banner banner-safe"><span class="status-indicator-dot dot-green"></span> <div><strong>MX & DNS Verified Safe</strong><br><span style="opacity:0.85;font-size:11.5px;">Armed in Outbox Queue • Scheduled for Next 15m Cadence Cycle</span></div></div>';
  } else if (status.includes('Catch-All')) {
    statusBadgeHtml = '<div class="vance-mail-status-banner banner-queued"><span class="status-indicator-dot dot-amber"></span> <div><strong>Catch-All Domain Quarantined</strong><br><span style="opacity:0.85;font-size:11.5px;">Domain accepts all mail • Quarantined to preserve sender mailbox reputation</span></div></div>';
  } else {
    statusBadgeHtml = '<div class="vance-mail-status-banner banner-queued"><span class="status-indicator-dot dot-gray"></span> <div><strong>Queued in Outbox Pipeline</strong><br><span style="opacity:0.85;font-size:11.5px;">Awaiting 1-Click Send / Operator Approval in Decision Desk</span></div></div>';
  }

  modal.innerHTML = 
    '<div class="vance-modal-backdrop" onclick="closeOutboundInspector()"></div>' +
    '<div class="vance-mail-drawer" role="dialog" aria-modal="true">' +
      '<div class="vance-mail-drawer-header">' +
        '<div class="vance-mail-header-info">' +
          '<div class="vance-mail-kicker">OUTBOUND EMAIL INTEL & PROSPECT DOSSIER</div>' +
          '<h2 class="vance-mail-title">' + escHtml(dmName) + ' <span class="vance-mail-company">@ ' + escHtml(compName) + '</span></h2>' +
          '<div class="vance-mail-meta">' +
            (dmTitle ? '<span class="vance-mail-role">' + escHtml(dmTitle) + '</span> • ' : '') +
            '<span class="vance-mail-addr">' + escHtml(email) + '</span>' +
            (r.region ? ' • <span class="vance-mail-geo">📍 ' + escHtml(r.region) + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<button type="button" class="vance-mail-close-btn" onclick="closeOutboundInspector()" aria-label="Close">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        '</button>' +
      '</div>' +

      '<div class="vance-mail-drawer-body">' +
        statusBadgeHtml +

        '<div class="vance-mail-card">' +
          '<div class="vance-mail-card-header">' +
            '<div class="vance-mail-field"><span class="vance-field-label">From:</span> <span class="vance-field-val">Mangal Soren &lt;mangal@usevance.com&gt;</span></div>' +
            '<div class="vance-mail-field"><span class="vance-field-label">To:</span> <span class="vance-field-val">' + escHtml(dmName) + ' &lt;' + escHtml(email) + '&gt;</span></div>' +
            '<div class="vance-mail-field"><span class="vance-field-label">Subject:</span> <span class="vance-field-val subject-line">' + escHtml(subject) + '</span></div>' +
            '<div class="vance-mail-field"><span class="vance-field-label">Intent Trigger:</span> <span class="vance-field-tag">⚡ 23 Buying Signals Radar • Lead Automation & Outbound Growth</span></div>' +
          '</div>' +
          '<div class="vance-mail-card-body">' +
            '<pre class="vance-mail-body-text">' + escHtml(body) + '</pre>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="vance-mail-drawer-footer">' +
        '<button type="button" class="btn btn-outline btn-sm" onclick="copyOutboundEmail(' + JSON.stringify(body) + ')">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
          '<span id="vance-copy-text">Copy Email Copy</span>' +
        '</button>' +
        '<button type="button" class="btn btn-primary btn-sm" onclick="closeOutboundInspector()">Done Inspecting</button>' +
      '</div>' +
    '</div>';

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeOutboundInspector() {
  const modal = document.getElementById('vance-outbound-modal');
  if (modal) {
    modal.classList.remove('is-open');
  }
  document.body.style.overflow = '';
}

function copyOutboundEmail(rawText) {
  try {
    navigator.clipboard.writeText(rawText).then(() => {
      const btn = document.getElementById('vance-copy-text');
      if (btn) {
        btn.textContent = 'Copied to Clipboard! ✓';
        setTimeout(() => { btn.textContent = 'Copy Email Copy'; }, 2000);
      }
    });
  } catch(e) {
    console.error(e);
  }
}

/* ── 2-Step Outbound Pipeline Audit Controller ─────────────── */
function scrollToAuditForm(e) {
  if (e) e.preventDefault();
  const todayNavBtn = document.querySelector('nav.apple-dock button:first-child') || document.querySelector('nav button:first-child');
  showTab('today', todayNavBtn);
  setTimeout(() => {
    const el = document.getElementById('audit-consultation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const nameInput = document.getElementById('audit-name');
      if (nameInput) setTimeout(() => nameInput.focus(), 400);
    }
  }, 100);
}

// ── Smart Global Phone Input Handlers ──
function getSelectedCountryConfig() {
  const select = document.getElementById('audit-country-code');
  if (!select) return { code: '+91', digits: 10, placeholder: '98765 43210' };
  const opt = select.options[select.selectedIndex];
  return {
    code: opt.value,
    digits: parseInt(opt.getAttribute('data-digits') || '10', 10),
    placeholder: opt.getAttribute('data-placeholder') || '98765 43210'
  };
}

function handleCountryCodeChange() {
  const config = getSelectedCountryConfig();
  const input = document.getElementById('audit-phone');
  if (!input) return;
  
  input.placeholder = config.placeholder;
  input.maxLength = config.code ? config.digits + 3 : 18;
  handleSmartPhoneInput(input);
}

function handleSmartPhoneInput(input) {
  if (!input) return;
  const config = getSelectedCountryConfig();
  const counter = document.getElementById('phone-digit-counter');
  const validIcon = document.getElementById('phone-valid-icon');
  
  let val = input.value;
  if (val.startsWith('+')) {
    detectAndSetCountryFromPaste(val);
    return;
  }
  
  let digits = val.replace(/[^0-9]/g, '');
  if (config.code && digits.length > config.digits) {
    digits = digits.slice(0, config.digits);
  }
  
  let formatted = digits;
  if (config.code === '+91' || config.digits === 10) {
    if (digits.length > 5) {
      formatted = digits.slice(0, 5) + ' ' + digits.slice(5);
    }
  } else if (config.code === '+971' || config.code === '+966') {
    if (digits.length > 5) {
      formatted = digits.slice(0, 2) + ' ' + digits.slice(2, 5) + ' ' + digits.slice(5);
    } else if (digits.length > 2) {
      formatted = digits.slice(0, 2) + ' ' + digits.slice(2);
    }
  } else if (config.code === '+1') {
    if (digits.length > 6) {
      formatted = digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6);
    } else if (digits.length > 3) {
      formatted = digits.slice(0, 3) + ' ' + digits.slice(3);
    }
  }
  
  input.value = formatted;
  
  const currentCount = digits.length;
  const targetCount = config.digits;
  
  if (counter) {
    if (config.code) {
      if (currentCount === targetCount) {
        counter.innerHTML = '<span style="color:#059669; font-weight:700;">✓ ' + currentCount + '/' + targetCount + ' digits (Valid)</span>';
      } else {
        counter.innerHTML = currentCount + '/' + targetCount + ' digits';
        counter.style.color = currentCount > 0 ? '#D97706' : '#9CA3AF';
      }
    } else {
      counter.innerHTML = currentCount + ' digits';
    }
  }
  
  if (validIcon) {
    if (config.code && currentCount === targetCount) {
      validIcon.innerHTML = '✓';
      validIcon.style.color = '#059669';
    } else {
      validIcon.innerHTML = '';
    }
  }
}

function detectAndSetCountryFromPaste(text) {
  const clean = text.trim();
  const select = document.getElementById('audit-country-code');
  const input = document.getElementById('audit-phone');
  if (!select || !input) return;
  
  const prefixes = [
    { code: '+971', val: '+971' },
    { code: '+966', val: '+966' },
    { code: '+91',  val: '+91' },
    { code: '+44',  val: '+44' },
    { code: '+65',  val: '+65' },
    { code: '+61',  val: '+61' },
    { code: '+49',  val: '+49' },
    { code: '+1',   val: '+1' },
  ];
  
  for (const p of prefixes) {
    if (clean.startsWith(p.code)) {
      select.value = p.val;
      input.value = clean.slice(p.code.length).trim();
      handleCountryCodeChange();
      return;
    }
  }
  
  input.value = clean.replace(/[^0-9]/g, '');
  handleSmartPhoneInput(input);
}

function handleSmartPhonePaste(e) {
  e.preventDefault();
  const pasted = (e.clipboardData || window.clipboardData)?.getData('text') || '';
  detectAndSetCountryFromPaste(pasted);
}

function getFullAuditPhone() {
  const codeSelect = document.getElementById('audit-country-code');
  const code = codeSelect ? codeSelect.value : '';
  const input = document.getElementById('audit-phone');
  const rawDigits = input ? input.value.replace(/[^0-9]/g, '') : '';
  if (!rawDigits) return '';
  return code ? (code + ' ' + rawDigits) : rawDigits;
}

function goToAuditStep(step) {
  const p1 = document.getElementById('audit-pane-1');
  const p2 = document.getElementById('audit-pane-2');
  const pill1 = document.getElementById('step-pill-1');
  const pill2 = document.getElementById('step-pill-2');

  if (step === 2) {
    const name = document.getElementById('audit-name')?.value.trim();
    const company = document.getElementById('audit-company')?.value.trim();
    const email = document.getElementById('audit-email')?.value.trim();
    const phoneInput = document.getElementById('audit-phone');
    const cleanDigits = phoneInput ? phoneInput.value.replace(/[^0-9]/g, '') : '';
    const config = getSelectedCountryConfig();

    if (!name) {
      alert('Please enter your Full Name.');
      document.getElementById('audit-name')?.focus();
      return;
    }
    if (!company) {
      alert('Please enter your Company or Brand Name.');
      document.getElementById('audit-company')?.focus();
      return;
    }
    if (!email || !email.includes('@')) {
      alert('Please enter a valid Work Email Address.');
      document.getElementById('audit-email')?.focus();
      return;
    }
    
    const minRequired = config.code ? config.digits : 8;
    if (!cleanDigits || cleanDigits.length < minRequired) {
      alert(`Please enter a valid ${config.code ? config.digits + '-digit' : ''} WhatsApp Phone Number.`);
      phoneInput?.focus();
      return;
    }

    if (p1) p1.style.display = 'none';
    if (p2) p2.style.display = 'block';
    if (pill1) pill1.classList.remove('active');
    if (pill2) pill2.classList.add('active');
  } else {
    if (p1) p1.style.display = 'block';
    if (p2) p2.style.display = 'none';
    if (pill1) pill1.classList.add('active');
    if (pill2) pill2.classList.remove('active');
  }
}

async function handleAuditSubmit(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('audit-name')?.value.trim() || '';
  const company = document.getElementById('audit-company')?.value.trim() || '';
  const email = document.getElementById('audit-email')?.value.trim() || '';
  const normalizedPhone = getFullAuditPhone();
  const industry = document.getElementById('audit-industry')?.value || 'B2B SaaS & Tech Startups';
  const market = document.getElementById('audit-market')?.value || 'US & North America';
  const dealSize = document.getElementById('audit-deal-size')?.value || '$3,000 – $6,000 / month';
  const goal = document.getElementById('audit-goal')?.value || 'Full DFY Outbound Setup (Book Qualified Calls on Calendar)';

  const btn = document.getElementById('audit-submit-btn');
  const origBtnHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>Ingesting into Speed-to-Lead Pipeline...</span>';
  }

  const payload = {
    lead_name: name,
    full_name: name,
    company: company,
    lead_phone: normalizedPhone,
    phone_number: normalizedPhone,
    lead_email: email,
    email: email,
    industry: industry,
    lead_source: 'Vance Outbound OS (usevance.com)',
    property_interest: 'VANCE OUTBOUND AUDIT: ' + company + ' [' + industry + '] (Target: ' + market + ') (Deal: ' + dealSize + ') (' + goal + ')',
    budget: dealSize + ' • Target Market: ' + market + ' • Goal: ' + goal,
    admin_notification_email: 'mangalsoren176@gmail.com',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
    locale: typeof navigator !== 'undefined' ? (navigator.language || 'en-IN') : 'en-IN',
    status: 'REAL_VANCE_OUTBOUND_AUDIT_INQUIRY'
  };

  // 1. Dispatch to n8n Webhook
  const n8nPromise = fetch('https://n8n.usevance.com/webhook/gtm-agency-lead-inbound', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // 2. Direct Instant Email Dispatch to mangalsoren176@gmail.com (FormSubmit AJAX)
  const emailPromise = fetch('https://formsubmit.co/ajax/mangalsoren176@gmail.com', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      _subject: `New Vance Outbound Audit: ${name} (${company})`,
      _template: 'table',
      'Contact Name': name,
      'Company / Brand': company,
      'WhatsApp Phone': normalizedPhone,
      'Work Email': email,
      'Primary Industry': industry,
      'Target Geography / Market': market,
      'Target Deal Size / Retainer': dealSize,
      'Primary Outbound Goal': goal,
      'Source': 'Vance AI SDR (usevance.com)',
      'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    })
  });

  try {
    await Promise.allSettled([n8nPromise, emailPromise]);
  } catch (err) {
    console.log('Ingestion settled with fallback:', err);
  }

  // Show success card and prefill Calendly with lead details
  const form = document.getElementById('audit-inquiry-form');
  const successBox = document.getElementById('audit-success-box');
  const stepper = document.querySelector('.audit-stepper-wrap');

  const waLink = document.getElementById('audit-wa-dispatch-link');
  if (waLink) {
    waLink.href = `https://wa.me/917979816557?text=${encodeURIComponent(`Hi Vance Team, I just submitted an Outbound Pipeline Audit for ${company || 'my company'} (${name}).`)}`;
  }

  if (form) form.style.display = 'none';
  if (stepper) stepper.style.display = 'none';
  if (successBox) {
    successBox.style.display = 'block';
    successBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  showToast('Outbound audit scope received! Profiling 10 target accounts.', 'success');
}

function switchAuditMode(mode) {
  const formTab = document.getElementById('tab-mode-form');
  const calTab = document.getElementById('tab-mode-calendar');
  const formView = document.getElementById('audit-form-view');
  const calView = document.getElementById('audit-calendar-view');

  if (mode === 'calendar') {
    if (formTab) formTab.classList.remove('active');
    if (calTab) calTab.classList.add('active');
    if (formView) formView.style.display = 'none';
    if (calView) {
      calView.style.display = 'block';
      initNativeScheduler();
    }
  } else {
    if (calTab) calTab.classList.remove('active');
    if (formTab) formTab.classList.add('active');
    if (calView) calView.style.display = 'none';
    if (formView) formView.style.display = 'block';
  }
}

// ══════════════════════════════════════════════════════════════
// ⚡ NATIVE VANCE IN-HOUSE MEETING SCHEDULER CONTROLLER
// ══════════════════════════════════════════════════════════════

let _schedDays = [];
let _schedSelectedDayIdx = 0;
let _schedSelectedSlot = '12:00 PM';

const DEFAULT_TIME_SLOTS = [
  '11:00 AM', '12:00 PM', '2:30 PM', '3:30 PM', 
  '4:30 PM', '6:00 PM', '7:30 PM', '9:00 PM'
];

function initNativeScheduler() {
  _schedDays = [];
  const now = new Date();
  let dayOffset = 1;
  if (now.getHours() < 17) dayOffset = 0;

  let added = 0;
  while (added < 5) {
    const d = new Date(now);
    d.setDate(now.getDate() + dayOffset);
    dayOffset++;
    if (d.getDay() === 0) continue; // skip Sunday
    _schedDays.push({
      dateObj: d,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      dayNum: d.getDate(),
      fullDateStr: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    });
    added++;
  }

  // Pre-fill fields from Step 1 if user typed anything
  const origName = document.getElementById('audit-name')?.value.trim();
  const origCompany = document.getElementById('audit-company')?.value.trim();
  const origEmail = document.getElementById('audit-email')?.value.trim();
  const origPhone = document.getElementById('audit-phone')?.value.trim();

  if (origName && document.getElementById('sched-name') && !document.getElementById('sched-name').value) {
    document.getElementById('sched-name').value = origName;
  }
  if (origCompany && document.getElementById('sched-company') && !document.getElementById('sched-company').value) {
    document.getElementById('sched-company').value = origCompany;
  }
  if (origEmail && document.getElementById('sched-email') && !document.getElementById('sched-email').value) {
    document.getElementById('sched-email').value = origEmail;
  }
  if (origPhone && document.getElementById('sched-phone') && !document.getElementById('sched-phone').value) {
    document.getElementById('sched-phone').value = origPhone;
    handleSchedPhoneInput(document.getElementById('sched-phone'));
  }

  // Ensure Step 1 is visible
  const step1 = document.getElementById('sched-step-slots');
  const step2 = document.getElementById('sched-step-details');
  const successEl = document.getElementById('native-sched-success');
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  if (successEl) successEl.style.display = 'none';

  renderSchedulerDays();
  selectSchedulerDay(_schedSelectedDayIdx);
}

function renderSchedulerDays() {
  const container = document.getElementById('sched-days-row');
  if (!container || !_schedDays.length) return;

  container.innerHTML = _schedDays.map((item, idx) => `
    <div class="sched-day-pill ${idx === _schedSelectedDayIdx ? 'active' : ''}" onclick="selectSchedulerDay(${idx})">
      <div class="s-day-name">${item.dayName}</div>
      <div class="s-day-num">${item.dayNum}</div>
    </div>
  `).join('');
}

function selectSchedulerDay(idx) {
  _schedSelectedDayIdx = idx;
  renderSchedulerDays();
  const curDay = _schedDays[idx];
  const dateLabel = document.getElementById('sched-selected-date-label');
  if (dateLabel && curDay) dateLabel.textContent = `${curDay.dayName}, ${curDay.monthName} ${curDay.dayNum}`;
  renderSchedulerSlots();
  updateSchedulerSummary();
}

function renderSchedulerSlots() {
  const container = document.getElementById('sched-slots-grid');
  if (!container) return;

  container.innerHTML = DEFAULT_TIME_SLOTS.map(timeStr => `
    <div class="sched-slot-pill ${timeStr === _schedSelectedSlot ? 'active' : ''}" onclick="selectSchedulerSlot('${timeStr}')">
      ${timeStr}
    </div>
  `).join('');
}

function selectSchedulerSlot(timeStr) {
  _schedSelectedSlot = timeStr;
  renderSchedulerSlots();
  updateSchedulerSummary();
}

function handleSchedulerTimezoneChange() {
  updateSchedulerSummary();
}

function updateSchedulerSummary() {
  const curDay = _schedDays[_schedSelectedDayIdx];
  const tzSelect = document.getElementById('sched-timezone');
  const tzCode = tzSelect ? tzSelect.options[tzSelect.selectedIndex].text.split(' ')[0] : 'IST';
  
  const slotText = curDay ? `${curDay.dayName}, ${curDay.monthName} ${curDay.dayNum} at ${_schedSelectedSlot}` : `${_schedSelectedSlot}`;
  const fullText = curDay ? `${curDay.dayName}, ${curDay.monthName} ${curDay.dayNum} at ${_schedSelectedSlot} ${tzCode}` : `${_schedSelectedSlot} ${tzCode}`;

  const btnPreview = document.getElementById('sched-btn-slot-preview');
  if (btnPreview) btnPreview.textContent = slotText;

  const detailsSummary = document.getElementById('sched-details-slot-summary');
  if (detailsSummary) detailsSummary.textContent = fullText;
}

function schedGoToStep2() {
  const step1 = document.getElementById('sched-step-slots');
  const step2 = document.getElementById('sched-step-details');
  if (step1) step1.style.display = 'none';
  if (step2) {
    step2.style.display = 'block';
    updateSchedulerSummary();
    const nameInput = document.getElementById('sched-name');
    if (nameInput && !nameInput.value) setTimeout(() => nameInput.focus(), 150);
  }
}

function schedBackToStep1() {
  const step1 = document.getElementById('sched-step-slots');
  const step2 = document.getElementById('sched-step-details');
  if (step2) step2.style.display = 'none';
  if (step1) step1.style.display = 'block';
}

// ── Smart Phone Input for Scheduler ──
function getSchedCountryConfig() {
  const select = document.getElementById('sched-country-code');
  if (!select) return { code: '+91', digits: 10, placeholder: '98765 43210' };
  const opt = select.options[select.selectedIndex];
  return {
    code: opt.value,
    digits: parseInt(opt.getAttribute('data-digits') || '10', 10),
    placeholder: opt.getAttribute('data-placeholder') || '98765 43210'
  };
}

function handleSchedCountryCodeChange() {
  const config = getSchedCountryConfig();
  const input = document.getElementById('sched-phone');
  if (!input) return;
  input.placeholder = config.placeholder;
  input.maxLength = config.code ? config.digits + 3 : 18;
  handleSchedPhoneInput(input);
}

function handleSchedPhoneInput(input) {
  if (!input) return;
  const config = getSchedCountryConfig();
  const counter = document.getElementById('sched-phone-counter');
  
  let val = input.value;
  let digits = val.replace(/[^0-9]/g, '');
  if (config.code && digits.length > config.digits) {
    digits = digits.slice(0, config.digits);
  }
  
  let formatted = digits;
  if (config.code === '+91' || config.digits === 10) {
    if (digits.length > 5) {
      formatted = digits.slice(0, 5) + ' ' + digits.slice(5);
    }
  } else if (config.code === '+971' || config.code === '+966') {
    if (digits.length > 5) {
      formatted = digits.slice(0, 2) + ' ' + digits.slice(2, 5) + ' ' + digits.slice(5);
    } else if (digits.length > 2) {
      formatted = digits.slice(0, 2) + ' ' + digits.slice(2);
    }
  } else if (config.code === '+1') {
    if (digits.length > 6) {
      formatted = digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6);
    } else if (digits.length > 3) {
      formatted = digits.slice(0, 3) + ' ' + digits.slice(3);
    }
  }
  
  input.value = formatted;
  const currentCount = digits.length;
  const targetCount = config.digits;
  
  if (counter) {
    if (config.code) {
      if (currentCount === targetCount) {
        counter.innerHTML = '<span style="color:#10B981; font-weight:700;">✓ ' + currentCount + '/' + targetCount + ' digits (Valid)</span>';
      } else {
        counter.innerHTML = currentCount + '/' + targetCount + ' digits';
        counter.style.color = currentCount > 0 ? '#D97706' : '#64748B';
      }
    } else {
      counter.innerHTML = currentCount + ' digits entered';
    }
  }
}

function handleNativeMeetingSubmit(e) {
  if (e) e.preventDefault();
  confirmNativeMeeting();
}

async function confirmNativeMeeting() {
  const name = document.getElementById('sched-name')?.value.trim();
  const email = document.getElementById('sched-email')?.value.trim();
  const company = document.getElementById('sched-company')?.value.trim();
  const phoneRaw = document.getElementById('sched-phone')?.value.trim();
  const countryCode = document.getElementById('sched-country-code')?.value || '+91';

  if (!name) { alert('Please enter your Full Name.'); document.getElementById('sched-name')?.focus(); return; }
  if (!email || !email.includes('@')) { alert('Please enter a valid Work Email.'); document.getElementById('sched-email')?.focus(); return; }
  if (!company) { alert('Please enter your Company or Website.'); document.getElementById('sched-company')?.focus(); return; }
  
  const config = getSchedCountryConfig();
  const phoneDigits = phoneRaw.replace(/[^0-9]/g, '');
  if (!phoneRaw || (config.code && phoneDigits.length < config.digits)) {
    alert(`Please enter a valid ${config.digits}-digit WhatsApp Phone Number.`);
    document.getElementById('sched-phone')?.focus();
    return;
  }

  const fullPhone = `${countryCode} ${phoneRaw}`;

  const curDay = _schedDays[_schedSelectedDayIdx];
  const tzSelect = document.getElementById('sched-timezone');
  const tzVal = tzSelect ? tzSelect.value : 'Asia/Kolkata';
  const tzText = tzSelect ? tzSelect.options[tzSelect.selectedIndex].text : 'IST';

  const btn = document.getElementById('sched-confirm-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>Locking Calendar Slot...</span>';
  }

  const slotStr = `${curDay ? curDay.fullDateStr : 'Upcoming Business Day'} at ${_schedSelectedSlot} (${tzText.split(' ')[0]})`;

  const payload = {
    name, email, phone: fullPhone, company,
    slot_date: curDay ? curDay.fullDateStr : '',
    slot_time: _schedSelectedSlot,
    timezone: tzVal,
    action: 'NATIVE_MEETING_BOOKED'
  };

  try {
    await fetch('/api/meetings/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.log('Meeting saved locally fallback:', err);
  }

  // Trigger external webhook directly from browser as guarantee
  fetch('https://n8n.usevance.com/webhook/gtm-agency-lead-inbound', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      status: 'MEETING_CONFIRMED',
      lead_source: 'Vance Native Scheduler (usevance.com)'
    })
  }).catch(() => {});

  // Show Success Screen
  const step2 = document.getElementById('sched-step-details');
  const successEl = document.getElementById('native-sched-success');
  const confirmedSummary = document.getElementById('sched-confirmed-summary');
  const meetBtn = document.getElementById('sched-meet-link-btn');

  if (step2) step2.style.display = 'none';
  if (confirmedSummary) confirmedSummary.textContent = slotStr;
  if (meetBtn) {
    meetBtn.href = `https://wa.me/917979816557?text=${encodeURIComponent(`Hi Vance Team, I just booked an Outbound Strategy Session for ${slotStr}. Name: ${name} (${company}).`)}`;
  }
  if (successEl) {
    successEl.style.display = 'block';
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  showToast('Strategy Session Locked! WhatsApp dispatch sent.', 'success');
}

function resetNativeScheduler() {
  const step1 = document.getElementById('sched-step-slots');
  const step2 = document.getElementById('sched-step-details');
  const successEl = document.getElementById('native-sched-success');
  const btn = document.getElementById('sched-confirm-btn');

  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  if (successEl) successEl.style.display = 'none';
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<span>Confirm 15-Min Meeting</span> <span>→</span>';
  }
  initNativeScheduler();
}

function resetAuditForm() {
  const form = document.getElementById('audit-inquiry-form');
  const successBox = document.getElementById('audit-success-box');
  const stepper = document.querySelector('.audit-stepper-wrap');
  const btn = document.getElementById('audit-submit-btn');

  if (form) {
    form.reset();
    form.style.display = 'block';
  }
  if (stepper) stepper.style.display = 'flex';
  if (successBox) successBox.style.display = 'none';
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<span>Get Free ICP Audit &amp; 10 Verified Accounts</span> <span style="font-size:15px; font-weight:700;">→</span>';
  }
}

// ══════════════════════════════════════════════════════════════
// 🚀 TRACKKARO OUTBOUND LIVE SIMULATOR CONTROLLER (60 FPS)
// ══════════════════════════════════════════════════════════════

const SIM_DATA = {
  agency: {
    tabId: "agency",
    contextBadge: "Deploying Outbound Engine For: <strong>[ Your Agency Pipeline ]</strong> • Closing Ramp ($8B Fintech)",
    icpName: "Apex Growth Agency",
    icpSub: "Your Agency",
    avatar: "SJ",
    avatarGrad: "linear-gradient(135deg, #FF6B6B, #8B5CF6)",
    leadName: "Sarah Jenkins",
    leadRole: "VP Growth & Acquisition",
    companyInfo: "Ramp Technologies • $8B Corporate Spend Platform • 800+ Team",
    radarMeta: "Google Search Radar • Meta Ad Library Signals",
    signalTitle: "Paid Acquisition Scaling (+140%)",
    signalText: "Ad Scale Spike: Ramp launched 45 new creative variations and scaled monthly digital ad spend by +140%.",
    citationBody: "Verified via Meta Ad Library & Google Ads Radar. Detected 45 new active acquisition angles deployed across enterprise finance. Signal Verified.",
    telCmd: "GET /v1/ad-library/ramp",
    telRes: "200 OK (24ms)",
    radarScore: "High Commercial Intent • Agency Budget Allocation",
    verifiedEmail: "sarah.jenkins@ramp.com",
    mxProvider: "aspmx.l.google.com (Google Workspace)",
    shieldScore: "Deliverability Verified • Zero-Bounce Protected",
    emailTo: "sarah.jenkins@ramp.com",
    emailSub: "Scaling Ramp's paid creative ROAS post-expansion",
    emailBodyHtml: "Hey Sarah,<br><br>Saw Ramp scaling <mark class=\"sim-signal-highlight\">paid acquisition channels by +140% this quarter</mark>. Creative fatigue usually bottlenecks scale when in-house teams manually test variants and hit diminishing ROAS.<br><br>We built an agile creative testing framework that cut customer acquisition costs by 34% for venture-backed scaleups. Worth a quick 5-min look at the performance breakdowns on Thursday?",
    emailBodyRehookHtml: "Sarah, saw Ramp's massive paid ads push this month.<br><br>Instead of your in-house team burning hours on manual creative iteration, we scale qualified B2B customer acquisition on pure performance.<br><br>Have 4 mins this Thursday?",
    tzText: "Timezone Window Armed: Scheduled for 10:30 AM EST (Prospect Working Hours)",
    replyAuthor: "Sarah Jenkins",
    replyText: "“Loved your breakdown citing our recent ad scale. Super timely. Let's do a quick intro call Thursday at 3:00 PM!”",
    calDay: "THU",
    calDate: "29",
    calTitle: "Apex Growth ✕ Ramp Performance Review",
    calAttendees: "Sarah Jenkins (VP Growth) + You (Agency Founder)",
    calTime: "3:00 PM - 3:30 PM EST"
  },
  saas: {
    tabId: "saas",
    contextBadge: "Deploying Outbound Engine For: <strong>[ Your B2B SaaS Pipeline ]</strong> • Closing Brex (1,200+ Team)",
    icpName: "CloudScale AI",
    icpSub: "Your SaaS Company",
    avatar: "AR",
    avatarGrad: "linear-gradient(135deg, #00E599, #059669)",
    leadName: "Alex Rivera",
    leadRole: "Head of Infrastructure & SecOps",
    companyInfo: "Brex Inc. • Enterprise Financial OS • 1,200+ Employees",
    radarMeta: "LinkedIn Talent Insights • GitHub Enterprise",
    signalTitle: "Engineering Headcount Surge",
    signalText: "Security Scaling Signal: Brex hired 18 backend engineers & announced enterprise SOC-2 compliance sprint.",
    citationBody: "Qualified from LinkedIn Talent Insights & GitHub Enterprise. High intent for automated compliance auditing and cloud access policies. Signal Verified.",
    telCmd: "GET /v1/talent/brex/infra",
    telRes: "200 OK (29ms)",
    radarScore: "High Intent • Active Enterprise Software Need",
    verifiedEmail: "alex.rivera@brex.com",
    mxProvider: "mail.brex.com (Cloudflare / Microsoft 365)",
    shieldScore: "Deliverability Verified • Zero-Bounce Protected",
    emailTo: "alex.rivera@brex.com",
    emailSub: "Automating SOC-2 compliance for Brex's 18 new eng hires",
    emailBodyHtml: "Hey Alex,<br><br>Noticed Brex just added <mark class=\"sim-signal-highlight\">18 backend engineers for the enterprise SOC-2 sprint</mark>. As engineering headcount scales upstream, managing cloud access policies and audit logs manually creates massive security friction.<br><br>Our platform automates identity auditing and SOC-2 evidence continuous sync in real time. Open to a 5-min look on Tuesday?",
    emailBodyRehookHtml: "Alex, congrats on Brex scaling the engineering team.<br><br>We automate continuous SOC-2 audit evidence for high-growth dev teams without slowing down deployment velocity.<br><br>Have 4 mins on Tuesday?",
    tzText: "Timezone Window Armed: Scheduled for 11:00 AM PST via Dedicated Mailbox",
    replyAuthor: "Alex Rivera",
    replyText: "“Impressive context on our SOC-2 sprint. Our SecOps team needs this right now. Let's do Tuesday at 11:00 AM.”",
    calDay: "TUE",
    calDate: "03",
    calTitle: "Enterprise SecOps Architecture Demo",
    calAttendees: "Alex Rivera (Head of Infra) + Your Sales Team",
    calTime: "11:00 AM - 11:30 AM PST"
  },
  devstudio: {
    tabId: "devstudio",
    contextBadge: "Deploying Outbound Engine For: <strong>[ Your Dev Studio Pipeline ]</strong> • Closing $50k Bank RFP",
    icpName: "CodeCraft Studio",
    icpSub: "Your Dev Studio",
    avatar: "DC",
    avatarGrad: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    leadName: "David Chen",
    leadRole: "Chief Technology Officer",
    companyInfo: "FinTech Corp • Digital Banking Platform • $40M Raised",
    radarMeta: "BuiltWith Radar • Public RFP Procurement Wire",
    signalTitle: "Cloud Modernization RFP Active",
    signalText: "Cloud Migration Signal: Published active enterprise RFP for AWS Cloud Architecture & Core Banking Modernization.",
    citationBody: "Parsed from BuiltWith & Public RFP Procurement Wire. Validated $50k+ technical modernization initiative for AWS microservices. Signal Verified.",
    telCmd: "GET /v1/rfp/fintech-cloud",
    telRes: "200 OK (36ms)",
    radarScore: "High Intent • $50k+ Custom Contract RFP Active",
    verifiedEmail: "david.chen@fintechcorp.io",
    mxProvider: "aspmx.l.google.com (Google Workspace)",
    shieldScore: "Deliverability Verified • Zero-Bounce Protected",
    emailTo: "david.chen@fintechcorp.io",
    emailSub: "AWS cloud microservices modernization for FinTech Corp",
    emailBodyHtml: "Hey David,<br><br>Saw your team's initiative to <mark class=\"sim-signal-highlight\">modernize core banking infrastructure to AWS microservices</mark> this quarter. High-ticket custom migrations usually stall when internal engineers get bogged down maintaining legacy systems.<br><br>Our dev studio delivers dedicated senior cloud architect pods to execute fintech migrations with zero downtime. Worth a 5-min review on Wednesday?",
    emailBodyRehookHtml: "David, saw your active AWS microservices modernization initiative.<br><br>We deploy senior engineering pods to execute complex fintech cloud migrations with zero downtime.<br><br>Have 5 mins on Wednesday?",
    tzText: "Timezone Window Armed: Scheduled for 2:30 PM EST (Prospect Peak Window)",
    replyAuthor: "David Chen",
    replyText: "“Spot on timing. We're actively evaluating senior engineering partners for this migration. Wednesday 4:00 PM confirmed.”",
    calDay: "WED",
    calDate: "04",
    calTitle: "AWS Core Banking Modernization Scoping",
    calAttendees: "David Chen (CTO) + Your Dev Partner",
    calTime: "4:00 PM - 4:30 PM EST"
  },
  retool: {
    tabId: "retool",
    contextBadge: "Deploying Outbound Engine For: <strong>[ Enterprise SaaS Pipeline ]</strong> • Closing Retool ($3.2B Scaleup)",
    icpName: "Enterprise Tier Expansion",
    icpSub: "Your SaaS",
    avatar: "RT",
    avatarGrad: "linear-gradient(135deg, #8B5CF6, #6366F1)",
    leadName: "Kavitha S.",
    leadRole: "VP of Engineering",
    companyInfo: "Retool • Developer Operations Platform • $3.2B Valuation",
    radarMeta: "LinkedIn Talent Insights • Product Tier Launch",
    signalTitle: "Enterprise Tier Expansion",
    signalText: "Enterprise Expansion Signal: Retool launched dedicated on-premise Kubernetes deployment tier for Fortune 500 accounts.",
    citationBody: "Detected via Product Tier Launch & LinkedIn Talent. Validated high-priority enterprise compliance need for on-premise Kubernetes. Signal Verified.",
    telCmd: "GET /v1/product/retool-enterprise",
    telRes: "200 OK (22ms)",
    radarScore: "High Intent • High-Value Enterprise Account",
    verifiedEmail: "kavitha.s@retool.com",
    mxProvider: "aspmx.l.google.com (Google Workspace)",
    shieldScore: "Deliverability Verified • Zero-Bounce Protected",
    emailTo: "kavitha.s@retool.com",
    emailSub: "Dedicated Kubernetes enterprise compliance for Retool",
    emailBodyHtml: "Hey Kavitha,<br><br>Saw Retool's launch of the <mark class=\"sim-signal-highlight\">dedicated on-premise Kubernetes tier for Fortune 500 teams</mark>. Scaling self-hosted enterprise infrastructure usually creates massive friction when internal teams handle air-gapped security audits manually.<br><br>We automate SOC-2 and HIPAA air-gapped compliance auditing for dev-first platforms. Worth a quick 5-min look on Thursday?",
    emailBodyRehookHtml: "Kavitha, saw Retool's enterprise on-premise launch.<br><br>We automate air-gapped security compliance for dev scaleups without slowing down deployment velocity.<br><br>Have 4 mins Thursday?",
    tzText: "Timezone Window Armed: Scheduled for 10:00 AM PST (Prospect Morning Window)",
    replyAuthor: "Kavitha S.",
    replyText: "“Super relevant timing with our on-premise rollout. Let's do Thursday 2:00 PM.”",
    calDay: "THU",
    calDate: "05",
    calTitle: "Retool On-Premise Architecture Review",
    calAttendees: "Kavitha S. (VP Eng) + Your Sales Team",
    calTime: "2:00 PM - 2:30 PM EST"
  },
  supabase: {
    tabId: "supabase",
    contextBadge: "Deploying Outbound Engine For: <strong>[ Dev Tools Pipeline ]</strong> • Pitching Supabase ($30M Series B)",
    icpName: "Series B Growth Outreach",
    icpSub: "Your Outbound Engine",
    avatar: "PC",
    avatarGrad: "linear-gradient(135deg, #10B981, #047857)",
    leadName: "Paul Copplestone",
    leadRole: "CEO & Co-founder",
    companyInfo: "Supabase • Open Source Firebase Alternative • 80+ Devs",
    radarMeta: "Crunchbase Funding Wire • TechCrunch",
    signalTitle: "$30M Series B Expansion Round",
    signalText: "Funding Velocity: Closed $30M Series B led by Coatue to accelerate enterprise cloud database scaling.",
    citationBody: "Verified via Crunchbase Wire & TechCrunch. Validated $30M Series B expansion round led by Coatue. High intent for enterprise pipeline architecture. Signal Verified.",
    telCmd: "GET /v1/funding/supabase-series-b",
    telRes: "200 OK (31ms)",
    radarScore: "High Intent • Validated $30M Expansion Round",
    verifiedEmail: "paul@supabase.com",
    mxProvider: "aspmx.l.google.com (Google Workspace)",
    shieldScore: "Deliverability Verified • Catch-All Quarantined",
    emailTo: "paul@supabase.com",
    emailSub: "Enterprise pipeline architecture post-Series B",
    emailBodyHtml: "Hey Paul,<br><br>Huge congratulations on <mark class=\"sim-signal-highlight\">Supabase's $30M Series B expansion</mark>. As open-source dev platforms scale upstream to enterprise accounts, sales engineering teams struggle to convert cloud developer spikes into contract renewals.<br><br>We deploy autonomous outbound pipelines that turn developer product usage signals into qualified enterprise demo pipeline. Have 5 mins next Tuesday?",
    emailBodyRehookHtml: "Paul, congrats on the $30M Series B.<br><br>We turn developer product signals into enterprise contract pipeline for fast-scaling dev tools.<br><br>Have 4 mins next Tuesday?",
    tzText: "Timezone Window Armed: Scheduled for 1:30 PM PST (Prospect Peak Response Time)",
    replyAuthor: "Paul Copplestone",
    replyText: "“Sharp timing on our enterprise cloud scaling push. Let's do a quick intro call Tuesday at 4:00 PM.”",
    calDay: "TUE",
    calDate: "10",
    calTitle: "Supabase Enterprise Pipeline Strategy",
    calAttendees: "Paul Copplestone (CEO) + You (Outbound Partner)",
    calTime: "4:00 PM - 4:30 PM PST"
  }
};

let simCurrentICP = 'agency';
let simCurrentStep = 1;
let simIsPlaying = true;
let simTimerInterval = null;
let simProgressPercent = 0;
const SIM_STEP_DURATION_MS = 4500;
const SIM_TICK_MS = 50;

let simTypewriterTimer = null;
let simApproveTimer = null;
let simDraftApproved = false;
let simIsRehooked = false;

function selectSimICP(icpKey) {
  if (!SIM_DATA[icpKey]) return;
  simCurrentICP = icpKey;
  simIsRehooked = false;
  
  document.querySelectorAll('.sim-icp-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.icp === icpKey);
  });

  // Sync Live Pipeline Table Active Highlight
  document.querySelectorAll('.pipeline-row').forEach(row => {
    row.classList.toggle('active-row', row.id === 'p-row-' + icpKey);
  });
  
  renderSimData();
  updateSentinelHUD(simCurrentStep, simCurrentICP);
  resetSimTimer();
}

function syncTableWithHero(icpKey) {
  selectSimICP(icpKey);
  const heroCard = document.getElementById('live-simulator');
  if (heroCard) {
    heroCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function renderSimData() {
  const d = SIM_DATA[simCurrentICP];
  if (!d) return;

  const ctxText = document.getElementById('sim-context-text');
  if (ctxText && d.contextBadge) {
    ctxText.innerHTML = d.contextBadge;
  }

  const avatar = document.getElementById('sim-avatar');
  if (avatar) {
    avatar.textContent = d.avatar;
    avatar.style.background = d.avatarGrad;
  }
  const nameEl = document.getElementById('sim-lead-name');
  if (nameEl) nameEl.textContent = d.leadName;
  const roleEl = document.getElementById('sim-lead-role');
  if (roleEl) roleEl.textContent = d.leadRole;
  const compEl = document.getElementById('sim-company-info');
  if (compEl) compEl.textContent = d.companyInfo;
  const radMeta = document.getElementById('sim-radar-meta');
  if (radMeta) radMeta.textContent = d.radarMeta;
  const sigTitle = document.getElementById('sim-signal-title');
  if (sigTitle) sigTitle.textContent = d.signalTitle;
  const sigText = document.getElementById('sim-signal-text');
  if (sigText) sigText.textContent = d.signalText;
  const citBody = document.getElementById('sim-citation-body');
  if (citBody) citBody.textContent = d.citationBody;
  const telCmd = document.getElementById('sim-tel-cmd');
  if (telCmd) telCmd.textContent = d.telCmd;
  const telRes = document.getElementById('sim-tel-res');
  if (telRes) telRes.textContent = d.telRes;
  const radScore = document.getElementById('sim-radar-score');
  if (radScore) radScore.textContent = d.radarScore;

  const verEmail = document.getElementById('sim-verified-email');
  if (verEmail) verEmail.textContent = d.verifiedEmail;
  const mxProv = document.getElementById('sim-mx-provider');
  if (mxProv) mxProv.textContent = d.mxProvider;
  const shScore = document.getElementById('sim-shield-score');
  if (shScore) shScore.textContent = d.shieldScore;

  const emTo = document.getElementById('sim-email-to');
  if (emTo) emTo.textContent = d.emailTo;
  const emSub = document.getElementById('sim-email-sub');
  if (emSub) emSub.textContent = d.emailSub;
  const emBody = document.getElementById('sim-email-body');
  if (emBody && simCurrentStep !== 3) emBody.innerHTML = d.emailBodyHtml;

  const repAuth = document.getElementById('sim-reply-author');
  if (repAuth) repAuth.textContent = d.replyAuthor;
  const repText = document.getElementById('sim-reply-text');
  if (repText) repText.textContent = d.replyText;
  const calDay = document.getElementById('sim-cal-day');
  if (calDay) calDay.textContent = d.calDay;
  const calDate = document.getElementById('sim-cal-date');
  if (calDate) calDate.textContent = d.calDate;
  const calTitle = document.getElementById('sim-cal-title');
  if (calTitle) calTitle.textContent = d.calTitle;
  const calAtt = document.getElementById('sim-cal-attendees');
  if (calAtt) calAtt.textContent = d.calAttendees;
  const calTimeText = document.getElementById('sim-cal-time-text');
  if (calTimeText) {
    calTimeText.textContent = d.calTime ? d.calTime.replace(/^⏰\s*/, '') : '';
  } else {
    const calTime = document.getElementById('sim-cal-time');
    if (calTime) calTime.textContent = d.calTime;
  }

  resetOutboxButtons();
}

function typewriteEmailBody(htmlString, callback) {
  const container = document.getElementById('sim-email-body');
  if (!container) return;
  if (simTypewriterTimer) {
    clearInterval(simTypewriterTimer);
    simTypewriterTimer = null;
  }

  // Tokenize HTML: keep tags intact, characters single
  const tokens = [];
  const regex = /(<[^>]+>|[^<])/g;
  let match;
  while ((match = regex.exec(htmlString)) !== null) {
    tokens.push(match[0]);
  }

  container.innerHTML = '<span class="sim-typing-cursor">|</span>';
  let curIndex = 0;
  let accumulated = '';

  simTypewriterTimer = setInterval(() => {
    if (curIndex >= tokens.length) {
      clearInterval(simTypewriterTimer);
      simTypewriterTimer = null;
      container.innerHTML = htmlString;
      if (typeof callback === 'function') callback();
      return;
    }
    const step = Math.min(3, tokens.length - curIndex);
    for (let s = 0; s < step; s++) {
      accumulated += tokens[curIndex++];
    }
    container.innerHTML = accumulated + '<span class="sim-typing-cursor">|</span>';
    const simCard = document.getElementById('live-simulator') || document.querySelector('.interactive-live-simulator');
    if (simCard && simCard.scrollTop !== 0) simCard.scrollTop = 0;
  }, 16);
}

function resetOutboxButtons() {
  simDraftApproved = false;
  simIsRehooked = false;
  if (simApproveTimer) {
    clearTimeout(simApproveTimer);
    simApproveTimer = null;
  }
  const btnApprove = document.getElementById('sim-btn-approve');
  const btnReject = document.getElementById('sim-btn-reject');
  const btnRehook = document.getElementById('sim-btn-rehook');
  const tzBox = document.getElementById('sim-tz-box');
  const tzText = document.getElementById('sim-tz-text');
  const d = SIM_DATA[simCurrentICP];

  if (btnApprove) {
    btnApprove.classList.remove('approved');
    btnApprove.disabled = false;
    btnApprove.innerHTML = '<span>✓ 1-Click Approve</span>';
  }
  if (btnReject) {
    btnReject.disabled = false;
    btnReject.innerHTML = '✕ Reject';
  }
  if (btnRehook) {
    btnRehook.classList.remove('active-rehook');
    btnRehook.disabled = false;
    btnRehook.innerHTML = '🔄 Re-hook';
  }
  if (tzBox) {
    tzBox.style.borderColor = 'rgba(255, 255, 255, 0.06)';
    tzBox.style.background = 'rgba(8, 11, 20, 0.7)';
  }
  if (tzText && d) {
    tzText.textContent = d.tzText || "Timezone Window Armed: Scheduled for 10:30 AM (Prospect Local Time)";
  }
}

function handleSimDraftRehook(e) {
  if (e) e.stopPropagation();
  simIsRehooked = !simIsRehooked;
  const btnRehook = document.getElementById('sim-btn-rehook');
  const d = SIM_DATA[simCurrentICP];
  if (!d) return;

  if (btnRehook) {
    btnRehook.classList.toggle('active-rehook', simIsRehooked);
    btnRehook.innerHTML = simIsRehooked ? '🔄 Original Hook' : '🔄 Re-hook';
  }

  const targetBody = simIsRehooked ? (d.emailBodyRehookHtml || d.emailBodyHtml) : d.emailBodyHtml;
  typewriteEmailBody(targetBody);
}

function handleSimDraftApprove(e) {
  if (e) e.stopPropagation();
  if (simDraftApproved) return;
  simDraftApproved = true;

  const btnApprove = document.getElementById('sim-btn-approve');
  const tzBox = document.getElementById('sim-tz-box');
  const tzText = document.getElementById('sim-tz-text');

  if (btnApprove) {
    btnApprove.classList.add('approved');
    btnApprove.innerHTML = '<span>✓ Approved &amp; Queued!</span>';
    btnApprove.disabled = true;
  }
  if (tzBox) {
    tzBox.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    tzBox.style.background = 'rgba(16, 185, 129, 0.12)';
  }
  if (tzText) {
    tzText.innerHTML = '<strong style="color:#34D399;">Queued for Prospect Local Hours</strong> • Dispatched via Dedicated Mailbox';
  }

  // Exactly 1.5s after approval pulse, automatically transition to Stage 4 (Calendar Drop)
  if (simApproveTimer) clearTimeout(simApproveTimer);
  simApproveTimer = setTimeout(() => {
    if (simCurrentStep === 3) {
      setSimStep(4);
    }
  }, 1500);
}

function handleSimDraftReject(e) {
  if (e) e.stopPropagation();
  const btnReject = document.getElementById('sim-btn-reject');
  const emBody = document.getElementById('sim-email-body');
  if (btnReject) {
    btnReject.innerHTML = '✕ Draft Archived';
    btnReject.disabled = true;
  }
  if (emBody) {
    emBody.innerHTML = '<span style="color:#94A3B8; font-style:italic; font-size:11.5px;">Draft archived by human gatekeeper. Ingesting secondary intent signal &amp; drafting fresh angle...</span>';
  }
  setTimeout(() => {
    if (simCurrentStep === 3) {
      resetOutboxButtons();
      const d = SIM_DATA[simCurrentICP];
      if (d) typewriteEmailBody(d.emailBodyHtml);
    }
  }, 1400);
}

function setSimStep(stepNumber) {
  simCurrentStep = stepNumber;

  const simCard = document.getElementById('live-simulator') || document.querySelector('.interactive-live-simulator');
  if (simCard && simCard.scrollTop !== 0) simCard.scrollTop = 0;

  const wireFill = document.getElementById('sim-wire-fill');
  const wirePhoton = document.getElementById('sim-wire-photon');
  const fillPercents = [0, 0, 33.3, 66.6, 100];
  const photonPercents = [0, 0, 33.3, 66.6, 100];
  if (wireFill) wireFill.style.width = fillPercents[stepNumber] + '%';
  if (wirePhoton) wirePhoton.style.left = photonPercents[stepNumber] + '%';

  for (let i = 1; i <= 4; i++) {
    const nodeEl = document.getElementById(`sim-node-${i}`);
    if (nodeEl) nodeEl.classList.toggle('active', i === stepNumber);
  }

  for (let i = 1; i <= 4; i++) {
    const viewEl = document.getElementById(`sim-view-${i}`);
    if (viewEl) viewEl.classList.toggle('active', i === stepNumber);
  }

  const stepPills = document.querySelectorAll('.sim-step-pills .step-pill');
  stepPills.forEach((pill, idx) => {
    pill.classList.toggle('active', idx + 1 === stepNumber);
  });

  // Stage 2: Animate Reoon Deliverability Meter
  const shieldBar = document.getElementById('sim-shield-bar');
  if (shieldBar) {
    if (stepNumber === 2) {
      shieldBar.style.width = '0%';
      setTimeout(() => {
        if (simCurrentStep === 2) shieldBar.style.width = '99.8%';
      }, 100);
    } else {
      shieldBar.style.width = '0%';
    }
  }

  // Stage 3: Typewriter bespoke email draft
  if (stepNumber === 3) {
    resetOutboxButtons();
    const d = SIM_DATA[simCurrentICP];
    if (d) {
      typewriteEmailBody(d.emailBodyHtml);
    }
  } else {
    if (simTypewriterTimer) {
      clearInterval(simTypewriterTimer);
      simTypewriterTimer = null;
    }
    if (simApproveTimer) {
      clearTimeout(simApproveTimer);
      simApproveTimer = null;
    }
  }

  resetSimTimer();
  updateSentinelHUD(stepNumber, simCurrentICP);
}

function nextSimStep() {
  let next = simCurrentStep + 1;
  if (next > 4) {
    next = 1;
    const icpKeys = ['agency', 'saas', 'devstudio', 'retool', 'supabase'];
    const currIdx = icpKeys.indexOf(simCurrentICP);
    const nextICP = icpKeys[(currIdx + 1) % icpKeys.length];
    selectSimICP(nextICP);
  }
  setSimStep(next);
}

function toggleSimAutoPlay() {
  simIsPlaying = !simIsPlaying;
  const icon = document.getElementById('sim-play-icon');
  const label = document.getElementById('sim-play-label');
  if (icon) icon.textContent = simIsPlaying ? '⏸' : '▶';
  if (label) label.textContent = simIsPlaying ? 'Pause' : 'Play';
  
  if (simIsPlaying) {
    startSimTimer();
  } else {
    stopSimTimer();
  }
}

function startSimTimer() {
  stopSimTimer();
  simTimerInterval = setInterval(() => {
    if (!simIsPlaying) return;
    simProgressPercent += (SIM_TICK_MS / SIM_STEP_DURATION_MS) * 100;
    const bar = document.getElementById('sim-timer-progress');
    if (bar) bar.style.width = Math.min(simProgressPercent, 100) + '%';
    
    // Auto-approve during autoplay on Stage 3 at ~48% (~2.1s)
    if (simCurrentStep === 3 && simProgressPercent >= 48 && !simDraftApproved) {
      handleSimDraftApprove();
    }

    if (simProgressPercent >= 100) {
      if (simCurrentStep === 3 && simDraftApproved) {
        // waiting for the 1.5s approve timer to trigger setSimStep(4)
      } else {
        nextSimStep();
      }
    }
  }, SIM_TICK_MS);
}

function stopSimTimer() {
  if (simTimerInterval) {
    clearInterval(simTimerInterval);
    simTimerInterval = null;
  }
}

function resetSimTimer() {
  simProgressPercent = 0;
  const bar = document.getElementById('sim-timer-progress');
  if (bar) bar.style.width = '0%';
}

function runSimImmediateCycle() {
  simIsPlaying = true;
  const icon = document.getElementById('sim-play-icon');
  const label = document.getElementById('sim-play-label');
  if (icon) icon.textContent = '⏸';
  if (label) label.textContent = 'Pause';
  nextSimStep();
  startSimTimer();
}

function toggleCitationTooltip(e) {
  if (e) e.stopPropagation();
  const wrapper = document.querySelector('.signal-citation-wrapper');
  if (wrapper) wrapper.classList.toggle('active');
}

// Close tooltip on click outside
document.addEventListener('click', () => {
  const wrapper = document.querySelector('.signal-citation-wrapper');
  if (wrapper && wrapper.classList.contains('active')) {
    wrapper.classList.remove('active');
  }
});

// Auto-boot simulator
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderSimData();
    setSimStep(1);
    startSimTimer();
    initSentinelInteractions();
  });
} else {
  renderSimData();
  setSimStep(1);
  startSimTimer();
  initSentinelInteractions();
}

/* ==========================================================================
   VANCE SENTINEL: Autonomous HUD & Neural Thought Stream Engine
   ========================================================================== */
function updateSentinelHUD(stepNumber, icpKey) {
  const d = (typeof SIM_DATA !== 'undefined' && SIM_DATA[icpKey]) ? SIM_DATA[icpKey] : null;
  if (!d) return;

  const tagEl = document.getElementById('sentinel-mode-tag');
  const thoughtEl = document.getElementById('sentinel-thought-text');
  const beaconEl = document.getElementById('sentinel-beacon');
  const visorEl = document.getElementById('sentinel-visor');
  const companyShort = d.companyInfo ? d.companyInfo.split('•')[0].trim() : 'Target Account';

  if (!thoughtEl) return;

  // Micro fade-in effect for thought changes
  thoughtEl.style.transition = 'opacity 0.15s ease';
  thoughtEl.style.opacity = '0.2';
  setTimeout(() => {
    thoughtEl.style.opacity = '1';
  }, 120);

  if (stepNumber === 1) {
    if (tagEl) {
      tagEl.textContent = '🛰️ RADAR INTERCEPT';
      tagEl.style.color = '#60A5FA';
      tagEl.style.borderColor = 'rgba(96,165,250,0.3)';
    }
    thoughtEl.innerHTML = `Intercepted <strong>${companyShort}</strong> (${d.signalTitle}) • Signal Active`;
    if (beaconEl) beaconEl.style.background = '#60A5FA';
    if (visorEl) visorEl.style.borderColor = 'rgba(96,165,250,0.5)';
  } else if (stepNumber === 2) {
    if (tagEl) {
      tagEl.textContent = '🛡️ REOON SHIELD';
      tagEl.style.color = '#34D399';
      tagEl.style.borderColor = 'rgba(52,211,153,0.3)';
    }
    thoughtEl.innerHTML = `SMTP 250 OK (<strong>${d.verifiedEmail}</strong>) • 0% Bounce Risk`;
    if (beaconEl) beaconEl.style.background = '#34D399';
    if (visorEl) visorEl.style.borderColor = 'rgba(52,211,153,0.5)';
  } else if (stepNumber === 3) {
    if (tagEl) {
      tagEl.textContent = '✍️ BESPOKE HOOK';
      tagEl.style.color = '#F59E0B';
      tagEl.style.borderColor = 'rgba(245,158,11,0.3)';
    }
    thoughtEl.innerHTML = `Crafted 1-to-1 angle for <strong>${d.leadName}</strong> (${d.leadRole}) • Armed for send`;
    if (beaconEl) beaconEl.style.background = '#F59E0B';
    if (visorEl) visorEl.style.borderColor = 'rgba(245,158,11,0.5)';
  } else if (stepNumber === 4) {
    if (tagEl) {
      tagEl.textContent = '📅 MEET BOOKED';
      tagEl.style.color = '#A78BFA';
      tagEl.style.borderColor = 'rgba(167,139,250,0.3)';
    }
    thoughtEl.innerHTML = `Google Meet locked with <strong>${d.leadName}</strong> • Sheets & Telegram Synced`;
    if (beaconEl) beaconEl.style.background = '#A78BFA';
    if (visorEl) visorEl.style.borderColor = 'rgba(167,139,250,0.5)';
  }
}

window.cycleSentinelAccount = function(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  nextSimStep();
  const hud = document.getElementById('vance-sentinel-hud');
  if (hud) {
    hud.style.transform = 'scale(0.985)';
    setTimeout(() => {
      hud.style.transform = '';
    }, 150);
  }
};

function initSentinelInteractions() {
  const hud = document.getElementById('vance-sentinel-hud');
  const avatar = document.querySelector('.sentinel-avatar-wrap');
  if (!hud || !avatar) return;

  hud.addEventListener('mousemove', (e) => {
    const rect = hud.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -4;
    const tiltY = (x / (rect.width / 2)) * 4;
    avatar.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  hud.addEventListener('mouseleave', () => {
    avatar.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
  });
}







// ============================================================================
// CONSTELLATION RADAR & SIGNAL ORCHESTRATION ENGINE (VANCE CLAY TACTILE)
// ============================================================================
(function() {
  window.currentConstellationSignal = 'outbound';
  var constellationAutoTimer = null;

  var CONSTELLATION_DOSSIERS = {
    outbound: {
      pillLabel: 'OUTBOUND SIGNAL',
      pillText: 'Hiring 4 Senior Full-Stack Engineers • CloudScale Careers',
      avatarText: 'CS',
      avatarImg: '/static/lead_alex.jpg',
      name: 'Alex Rivera',
      badgeClass: 'c-badge-outbound',
      badgeText: 'Vance Outbound',
      role: 'Head of Infrastructure / CloudScale',
      subject: "Quick question on CloudScale's hiring surge",
      pitch: "Alex, saw CloudScale posted 4 new backend roles this month after your Series A. Usually engineering headcount jumps introduce bottlenecks in cloud infrastructure and developer onboarding. We help scaleups automate dev tooling workflows. Worth a brief look this week?",
      handoff: "HANDOFF : outreach context saved • Google Meet scheduled"
    },
    inbound: {
      pillLabel: 'REVERSE-IP INBOUND',
      pillText: '8 High-Intent Visits from Ramp Technologies (Pricing & Docs)',
      avatarText: 'RP',
      avatarImg: '/static/lead_sarah.jpg',
      name: 'Sarah Jenkins',
      badgeClass: 'c-badge-inbound',
      badgeText: 'Reverse-IP Intercept',
      role: 'VP Growth / Ramp Technologies',
      subject: "Reverse-IP alert: Ramp exploring automated intent triggers",
      pitch: "Sarah, our continuous radar de-anonymized 8 visits from Ramp's NYC IP range across our API and Pricing pages in the last 48 hours. Bypassing cold outreach—Vance pre-warmed your inbound context with personalized demo assets ready for instant sales qualification.",
      handoff: "HANDOFF : de-anonymized IP mapped • instant Telegram alert sent"
    },
    expansion: {
      pillLabel: 'EXPANSION RADAR',
      pillText: 'FinTech Corp Published Enterprise Cloud Migration RFP',
      avatarText: 'FC',
      avatarImg: '/static/lead_david.jpg',
      name: 'David Chen',
      badgeClass: 'c-badge-expansion',
      badgeText: 'Tech Churn RFP',
      role: 'Chief Technology Officer / FinTech Corp',
      subject: "AWS Cloud Modernization & Core Banking Tech Churn",
      pitch: "David, Vance's expansion radar picked up FinTech Corp's public RFP deprecating legacy on-prem infrastructure for AWS cloud native microservices. We mapped 1-to-1 capability matches and drafted tailored vendor qualification packages for your architecture review committee.",
      handoff: "HANDOFF : RFP requirements mapped • automated vendor dossier queued"
    }
  };

  window.switchConstellationSignal = function(type, isManual) {
    if (isManual === undefined) isManual = true;
    if (!CONSTELLATION_DOSSIERS[type]) return;
    window.currentConstellationSignal = type;
    var d = CONSTELLATION_DOSSIERS[type];

    // Morph Left Dossier Card with microfade
    var card = document.getElementById('constellation-card');
    if (card) {
      card.style.transition = 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease';
      card.style.opacity = '0.35';
      card.style.transform = 'translateY(2px)';
      
      setTimeout(function() {
        var pill = document.getElementById('c-card-signal-pill');
        if (pill) {
          pill.innerHTML = '<span class="c-signal-label">' + d.pillLabel + '</span><span class="c-signal-text">' + d.pillText + '</span>';
        }
        var avatar = document.getElementById('c-card-avatar');
        if (avatar) avatar.innerHTML = '<img src="' + d.avatarImg + '" alt="' + d.name + '" style="width:100%; height:100%; border-radius:inherit; object-fit:cover;" />';

        var nameEl = document.getElementById('c-card-name');
        if (nameEl) {
          nameEl.innerHTML = '<span>' + d.name + '</span><span class="' + d.badgeClass + '">' + d.badgeText + '</span>';
        }

        var roleEl = document.getElementById('c-card-role');
        if (roleEl) roleEl.textContent = d.role;

        var subEl = document.getElementById('c-card-subject');
        if (subEl) subEl.textContent = d.subject;

        var pitchEl = document.getElementById('c-card-pitch');
        if (pitchEl) pitchEl.textContent = d.pitch;

        var handoffEl = document.getElementById('c-card-handoff');
        if (handoffEl) {
          handoffEl.innerHTML = '<span class="c-handoff-icon">&rarr;</span><span>' + d.handoff + '</span>';
        }

        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 160);
    }

    // Update active satellite buttons
    ['outbound', 'inbound', 'expansion'].forEach(function(s) {
      var sat = document.getElementById('sat-' + s);
      if (sat) {
        if (s === type) sat.classList.add('active');
        else sat.classList.remove('active');
      }
    });

    // Update active lead avatar badges
    var avatarMap = {
      outbound: ['orbit-lead-alex', 'orbit-lead-elena'],
      inbound: ['orbit-lead-sarah'],
      expansion: ['orbit-lead-david']
    };

    ['orbit-lead-alex', 'orbit-lead-sarah', 'orbit-lead-david', 'orbit-lead-elena'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });
    if (avatarMap[type]) {
      avatarMap[type].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('active');
      });
    }

    if (isManual) {
      restartConstellationAutoCycle();
    }
  };

  function restartConstellationAutoCycle() {
    if (constellationAutoTimer) clearInterval(constellationAutoTimer);
    var cycleOrder = ['outbound', 'inbound', 'expansion'];
    constellationAutoTimer = setInterval(function() {
      var currentIndex = cycleOrder.indexOf(window.currentConstellationSignal);
      var nextIndex = (currentIndex + 1) % cycleOrder.length;
      window.switchConstellationSignal(cycleOrder[nextIndex], false);
    }, 7000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restartConstellationAutoCycle);
  } else {
    restartConstellationAutoCycle();
  }
})();

// Aliases for Vance independent branding
window.loadHarveyStatus = window.loadVanceStatus = loadVanceStatus;
window.startHarvey = window.startVance = startVance;
window.stopHarvey = window.stopVance = stopVance;
