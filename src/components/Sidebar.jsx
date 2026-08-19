const navSections = [
  {
    items: [
      { label: 'Home', icon: 'home' },
      { label: 'E-commerce', icon: 'cart' },
      { label: 'Contacts', icon: 'contacts' },
    ],
  },
  {
    sectionLabel: 'Campaigns',
    items: [
      { label: 'Campaigns', icon: 'campaigns', active: true },
      { label: 'Email', icon: 'email' },
      { label: 'SMS', icon: 'sms' },
      { label: 'WhatsApp', icon: 'whatsapp' },
      { label: 'Web push', icon: 'webpush' },
      { label: 'Facebook Ads', icon: 'facebook' },
    ],
  },
  {
    sectionLabel: 'Tools',
    items: [
      { label: 'Templates', icon: 'templates' },
      { label: 'Statistics', icon: 'statistics' },
      { label: 'Settings', icon: 'settings' },
      { label: 'Automations', icon: 'automations' },
      { label: 'Transactional', icon: 'transactional' },
    ],
  },
];

const iconPaths = {
  home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
  cart: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></>,
  contacts: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  campaigns: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  email: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
  sms: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  whatsapp: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
  webpush: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  templates: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></>,
  statistics: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  automations: <><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></>,
  transactional: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
};

function NavIcon({ name }) {
  return (
    <span className="sidebar-nav-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {iconPaths[name]}
      </svg>
    </span>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} role="complementary" aria-label="Main navigation">
        <div className="sidebar-inner">
          <div className="sidebar-brand">
            <a href="/" className="sidebar-brand-name">Brevo</a>
            <span className="sidebar-brand-sub">Formerly sendinblue</span>
          </div>

          <nav className="sidebar-nav" role="navigation" aria-label="Sidebar navigation">
            {navSections.map((section, sIdx) => (
              <div key={sIdx}>
                {section.sectionLabel && (
                  <div className="sidebar-section-label">{section.sectionLabel}</div>
                )}
                {section.items.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    className={`sidebar-nav-item ${item.active ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); if (onClose) onClose(); }}
                  >
                    <NavIcon name={item.icon} />
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
    </>
  );
}
