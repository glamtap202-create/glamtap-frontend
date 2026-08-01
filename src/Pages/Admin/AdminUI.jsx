export const statusStyle = {
  confirmed: "bg-[#E9F3EA] text-[#2E7D4F]",
  pending: "bg-[#FDF2E1] text-[#B4791A]",
  completed: "bg-[#E9F3EA] text-[#2E7D4F]",
  cancelled: "bg-[#FBEAE7] text-[#B23A2A]",
  ongoing: "bg-[#EFE9F7] text-[#5E4B8B]",
  active: "bg-[#E9F3EA] text-[#2E7D4F]",
  suspended: "bg-[#FBEAE7] text-[#B23A2A]",
  rejected: "bg-[#FBEAE7] text-[#B23A2A]",
};

export function StatusBadge({ status }) {
  const key = status?.toLowerCase() || "pending";
  return (
    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusStyle[key] || statusStyle.pending}`}>
      {status}
    </span>
  );
}

export function MetricCard({ label, value, tint }) {
  return (
    <div className={`rounded-2xl px-5 py-4 ${tint}`}>
      <p className="text-xs font-medium text-[#5c4a52]/70 tracking-wide">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#2A1B26]" style={{ fontFamily: "Georgia, serif" }}>
        {value}
      </p>
    </div>
  );
}

export function Panel({ title, action, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#EEE3E7] p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-[15px] font-semibold text-[#2A1B26]" style={{ fontFamily: "Georgia, serif" }}>
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function AdminPageShell({ title, subtitle, children }) {
  return (
    <main className="flex-1 min-w-0 p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-[#2A1B26]" style={{ fontFamily: "Georgia, serif" }}>
          {title}
        </h1>
        {subtitle && <p className="text-sm text-[#5c4a52]/70 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </main>
  );
}

export function NotConnectedNotice({ what }) {
  return (
    <Panel>
      <p className="text-sm text-[#8a7580]">
        {what} API abhi connect nahi hai. Jaise hi backend endpoint ready hoga, yahan real data dikhne lagega.
      </p>
    </Panel>
  );
}
