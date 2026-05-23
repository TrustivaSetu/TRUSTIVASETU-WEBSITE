'use client'

import { useState } from 'react'
import { getMenuMeta } from '@/lib/los-menus'

type Props = {
  menu: string
  hospitals: string[]
  syncing: boolean
  onSyncActivity: (
    activityType: string,
    payload: Record<string, unknown>,
    menu?: string
  ) => Promise<unknown>
}

export function LosTabContent({ menu, hospitals, syncing, onSyncActivity }: Props) {
  const meta = getMenuMeta(menu)
  const [form, setForm] = useState<Record<string, string>>({})
  const [error, setError] = useState('')

  const set = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    for (const f of meta.fields) {
      if (f.required && !form[f.key]?.trim()) {
        setError(`${f.label} is required`)
        return
      }
    }
    const payload: Record<string, unknown> = { ...form, menu }
    if (form.financingRequired) payload.financingRequired = form.financingRequired
    if (form.medicalEstimate) payload.medicalEstimate = form.medicalEstimate
    if (form.collectedAmount) payload.collectedAmount = form.collectedAmount
    if (form.approvedAmount) payload.approvedAmount = form.approvedAmount
    if (form.paymentAmount) payload.paymentAmount = form.paymentAmount

    try {
      await onSyncActivity(meta.activityType, payload, menu)
      setForm({})
    } catch {
      /* banner */
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-lime-300">{meta.title}</h2>
        <p className="text-gray-400 mt-2 text-sm">{meta.description}</p>
        <p className="text-gray-500 mt-1 text-xs">
          Save → LMS database → Reports / Leads / Clinics auto-update
        </p>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
      >
        {meta.fields.map((f) => (
          <div key={f.key}>
            <label className="text-sm text-gray-400 block mb-1">
              {f.label}
              {f.required ? ' *' : ''}
            </label>
            {f.type === 'select' && (f.options || f.key === 'hospitalName') ? (
              <select
                value={form[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/10"
              >
                <option value="" className="text-black">
                  Select
                </option>
                {f.key === 'hospitalName'
                  ? hospitals.map((h) => (
                      <option key={h} value={h} className="text-black">
                        {h}
                      </option>
                    ))
                  : (f.options ?? []).map((o) => (
                      <option key={o} value={o} className="text-black">
                        {o}
                      </option>
                    ))}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                value={form[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10"
              />
            ) : (
              <input
                type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                value={form[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                list={f.key === 'hospitalName' ? 'los-hospitals' : undefined}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10"
              />
            )}
          </div>
        ))}

        {meta.fields.some((f) => f.key === 'hospitalName') && (
          <datalist id="los-hospitals">
            {hospitals.map((h) => (
              <option key={h} value={h} />
            ))}
          </datalist>
        )}

        <button
          type="submit"
          disabled={syncing}
          className="w-full bg-lime-300 text-black py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {syncing ? 'Syncing to LMS…' : 'Save & update LMS reports'}
        </button>
      </form>

      <div className="text-xs text-gray-500 border border-white/10 rounded-xl p-4">
        <strong className="text-gray-400">LMS mein dekho:</strong>{' '}
        {meta.activityType === 'credit' || meta.activityType === 'collection' || meta.activityType === 'lender'
          ? 'Reports → Monthly / Lender Approvals'
          : meta.activityType === 'payment' || meta.activityType === 'hospital'
            ? 'Clinics'
            : 'Leads + Dashboard KPIs'}
      </div>
    </div>
  )
}
