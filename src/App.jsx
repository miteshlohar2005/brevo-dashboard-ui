import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import CampaignTable from './components/CampaignTable';
import CampaignModal from './components/CampaignModal';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import { defaultCampaigns, stats } from './data/campaigns';

export default function App() {
  const [campaigns, setCampaigns] = useState(defaultCampaigns);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  function handleToggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  function handleCloseSidebar() {
    setSidebarOpen(false);
  }

  function handleOpenCreate() {
    setEditCampaign(null);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setEditCampaign(null);
  }

  function handleSaveCampaign(campaign) {
    if (editCampaign) {
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaign.id ? { ...c, ...campaign } : c))
      );
      addToast(`Campaign #${campaign.id} updated successfully!`, 'success');
    } else {
      setCampaigns((prev) => [campaign, ...prev]);
      addToast(`Campaign "${campaign.name}" created successfully!`, 'success');
    }
    setModalOpen(false);
    setEditCampaign(null);
  }

  function handleViewCampaign(campaign) {
    addToast(`Viewing campaign #${campaign.id} — ${campaign.name}`, 'info');
  }

  function handleEditCampaign(campaign) {
    setEditCampaign(campaign);
    setModalOpen(true);
  }

  function handleDuplicateCampaign(campaign) {
    const newCampaign = {
      ...campaign,
      id: Date.now(),
      name: campaign.name + ' (copy)',
      openers: 0,
      clickers: 0,
      unsubscribers: 0,
      openPct: 0,
      clickPct: 0,
      unsubPct: 0,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    addToast(`Campaign duplicated as #${newCampaign.id}`, 'success');
  }

  function handleDeleteRequest(campaign) {
    setDeleteTarget(campaign);
    setConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    setCampaigns((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    addToast(`Campaign #${deleteTarget.id} deleted.`, 'success');
    setConfirmOpen(false);
    setDeleteTarget(null);
  }

  function handleCloseConfirm() {
    setConfirmOpen(false);
    setDeleteTarget(null);
  }

  return (
    <div className="site-wrapper">
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      <div className="main-app">
        <Header onMenuToggle={handleToggleSidebar} />

        <main className="site-content" role="main" id="main-content">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <button className="btn btn-dark" onClick={handleOpenCreate} aria-label="Create a new campaign">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create a campaign
            </button>
          </div>

          <div className="stats-grid">
            <StatCard
              label="Total contacts"
              value={stats.totalContacts}
              iconType="contacts"
            />
            <StatCard
              label="Opens"
              value={stats.opens}
              percent={stats.openRate}
              percentLabel="open rate"
              iconType="opens"
            />
            <StatCard
              label="Clicks"
              value={stats.clicks}
              percent={stats.clickRate}
              percentLabel="click rate"
              iconType="clicks"
            />
            <StatCard
              label="Blocklists"
              value={stats.blocklists}
              percent={stats.blocklistRate}
              percentLabel="block rate"
              iconType="blocklists"
            />
          </div>

          <CampaignTable
            campaigns={campaigns}
            onEdit={handleEditCampaign}
            onDuplicate={handleDuplicateCampaign}
            onDelete={handleDeleteRequest}
            onView={handleViewCampaign}
            onCreate={handleOpenCreate}
          />
        </main>

        <footer className="site-footer" role="contentinfo">
          <span>&copy; {new Date().getFullYear()} Brevo. All rights reserved.</span>
          <span>WordPress Internship Assignment</span>
        </footer>
      </div>

      <CampaignModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCampaign}
        editCampaign={editCampaign}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
      />

      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
