import { useState, useEffect, useRef } from 'react';

const emptyForm = { name: '', subject: '', recipients: '', message: '' };

export default function CampaignModal({ isOpen, onClose, onSave, editCampaign }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (editCampaign) {
        setForm({
          name: editCampaign.name || '',
          subject: editCampaign.subject || '',
          recipients: String(editCampaign.recipients || ''),
          message: editCampaign.message || '',
        });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
      setSaving(false);
      setTimeout(() => {
        if (nameRef.current) nameRef.current.focus();
      }, 100);
    }
  }, [isOpen, editCampaign]);

  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Campaign name is required.';
    if (!form.subject.trim()) errs.subject = 'Subject line is required.';
    if (!form.recipients.trim() || isNaN(Number(form.recipients)) || Number(form.recipients) < 1) errs.recipients = 'Enter a valid number of recipients.';
    if (!form.message.trim()) errs.message = 'Message content is required.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSaving(true);
    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const recCount = parseInt(form.recipients, 10);

      if (editCampaign) {
        onSave({
          ...editCampaign,
          name: form.name.trim(),
          subject: form.subject.trim(),
          recipients: recCount,
          message: form.message.trim(),
        });
      } else {
        onSave({
          id: Date.now(),
          name: form.name.trim(),
          subject: form.subject.trim(),
          recipients: recCount,
          openers: 0,
          clickers: 0,
          unsubscribers: 0,
          date: dateStr,
          openPct: 0,
          clickPct: 0,
          unsubPct: 0,
        });
      }
      setSaving(false);
    }, 300);
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campaignModalTitle"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title" id="campaignModalTitle">
            {editCampaign ? 'Edit campaign' : 'Create a campaign'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="campaignName">
                Campaign name <span aria-hidden="true">*</span>
              </label>
              <input
                ref={nameRef}
                type="text"
                className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                id="campaignName"
                placeholder="e.g. Summer Newsletter 2023"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                aria-required="true"
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="campaignSubject">
                Subject line <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.subject ? 'form-input-error' : ''}`}
                id="campaignSubject"
                placeholder="e.g. Exclusive summer deals inside"
                value={form.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                required
                aria-required="true"
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <span className="form-error" role="alert">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="campaignRecipients">
                Recipients <span aria-hidden="true">*</span>
              </label>
              <input
                type="number"
                className={`form-input ${errors.recipients ? 'form-input-error' : ''}`}
                id="campaignRecipients"
                placeholder="Number of recipients"
                min="1"
                value={form.recipients}
                onChange={(e) => handleChange('recipients', e.target.value)}
                required
                aria-required="true"
                aria-invalid={!!errors.recipients}
              />
              {errors.recipients && <span className="form-error" role="alert">{errors.recipients}</span>}
            </div>

            <div className="form-group mb-0">
              <label className="form-label" htmlFor="campaignMessage">
                Message / Content <span aria-hidden="true">*</span>
              </label>
              <textarea
                className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
                id="campaignMessage"
                placeholder="Write your campaign content here..."
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                required
                aria-required="true"
                aria-invalid={!!errors.message}
              />
              {errors.message && <span className="form-error" role="alert">{errors.message}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : (editCampaign ? 'Save Changes' : 'Save Campaign')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
