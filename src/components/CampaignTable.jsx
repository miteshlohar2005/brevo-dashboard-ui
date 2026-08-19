import { useState } from 'react';
import ActionMenu from './ActionMenu';

export default function CampaignTable({ campaigns, onEdit, onDuplicate, onDelete, onView, onCreate }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  function handleToggleMenu(id) {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }

  function handleCloseMenu() {
    setOpenMenuId(null);
  }

  return (
    <div className="table-section">
      <div className="table-header">
        <h3 className="table-title">Previous Campaigns</h3>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Recipients</th>
              <th scope="col">Openers</th>
              <th scope="col">Clickers</th>
              <th scope="col">Unsubscribers</th>
              <th scope="col">Sent date</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan="8">
                  <div className="empty-state">
                    <div className="empty-state-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <h4 className="empty-state-title">No campaigns yet</h4>
                    <p className="empty-state-text">Create your first campaign to get started.</p>
                    <button className="btn btn-primary btn-sm" onClick={onCreate}>Create a campaign</button>
                  </div>
                </td>
              </tr>
            ) : (
              campaigns.map((c) => (
                <tr key={c.id} data-campaign-id={c.id}>
                  <td><span className="table-id">#{c.id}</span></td>
                  <td><span className="table-campaign-name">{c.name}</span></td>
                  <td>
                    <div className="table-metric">
                      <span className="table-metric-value">{c.recipients}</span>
                      <span className="table-metric-percent">100%</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-metric">
                      <span className="table-metric-value">{c.openers}</span>
                      <span className="table-metric-percent">{c.openPct}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-metric">
                      <span className="table-metric-value">{c.clickers}</span>
                      <span className="table-metric-percent">{c.clickPct}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-metric">
                      <span className="table-metric-value">{c.unsubscribers}</span>
                      <span className="table-metric-percent">{c.unsubPct}%</span>
                    </div>
                  </td>
                  <td><span className="table-date">{c.date}</span></td>
                  <td className="table-action">
                    <button
                      className="action-menu-btn"
                      aria-label={`Actions for campaign #${c.id}`}
                      aria-haspopup="true"
                      aria-expanded={openMenuId === c.id}
                      onClick={() => handleToggleMenu(c.id)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </button>
                    <ActionMenu
                      isOpen={openMenuId === c.id}
                      onClose={handleCloseMenu}
                      onView={() => { handleCloseMenu(); onView(c); }}
                      onEdit={() => { handleCloseMenu(); onEdit(c); }}
                      onDuplicate={() => { handleCloseMenu(); onDuplicate(c); }}
                      onDelete={() => { handleCloseMenu(); onDelete(c); }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
