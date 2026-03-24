import Icon from "@/components/ui/icon";

const events = [
  {
    date: "06.03",
    label: "Установочная встреча",
    items: [
      {
        type: "requirement",
        text: "С 01.03.2026 отели переходят на единые целевые структуры служб планирования",
      },
      {
        type: "decision",
        text: "Реализация «Службы» как нового справочника — предварительное решение, может быть пересмотрено",
      },
    ],
  },
  {
    date: "11.03",
    label: "Рабочая встреча",
    items: [
      {
        type: "rejection",
        text: "Предварительное решение от 06.03 ОТМЕНЕНО — отказ от нового справочника «Службы»",
      },
      {
        type: "constraint",
        text: "Все процессы планирования завязаны на справочник «Подразделения»",
      },
      {
        type: "constraint",
        text: "Встреча без ключевого держателя требований — окончательное решение не зафиксировано",
      },
      {
        type: "risk",
        text: "Реализация на «Подразделениях» + «Направлениях» → вынужденный отказ от части требований ТЗ",
      },
    ],
  },
  {
    date: "16.03",
    label: "Обсуждение аналитик",
    items: [
      {
        type: "requirement",
        text: "Система планирования должна вписываться в существующую бюджетную модель",
      },
      {
        type: "decision",
        text: "Использовать справочник «Подразделения организации» + ограничить видимость для планировщиков",
      },
      {
        type: "risk",
        text: "Вынужденный отказ от части требований ТЗ из-за негибкости справочника",
      },
      {
        type: "risk",
        text: "Риск роста трудозатрат на этапе согласования макетов и опытной эксплуатации",
      },
    ],
  },
  {
    date: "17.03",
    label: "Встреча с архитекторами",
    items: [
      {
        type: "rejection",
        text: "ПЕРЕСМОТРЕНО решение от 16.03 — добавить «Направление деятельности» как сквозную аналитику",
      },
      {
        type: "decision",
        text: "«Подразделения организации» + «Направление деятельности» как доп. аналитика",
      },
      {
        type: "constraint",
        text: "Выбор аналитики для «Службы» выносится на встречу с бизнес-заказчиком",
      },
      {
        type: "risk",
        text: "Техническая реализация ПРИОСТАНОВЛЕНА до подтверждения бизнес-решения",
      },
    ],
  },
  {
    date: "19.03",
    label: "Встреча с Бизнесом",
    items: [
      {
        type: "rejection",
        text: "ОТКАЗ от решения 17.03 — не использовать «Направление деятельности» как аналог служб",
      },
      {
        type: "constraint",
        text: "Исполнитель моделирует 2 варианта: разные виды отчётов ИЛИ один отчёт с разными бланками",
      },
      {
        type: "risk",
        text: "Техническая реализация ПРИОСТАНОВЛЕНА до подтверждения бизнес-решения",
      },
    ],
  },
  {
    date: "20.03",
    label: "Встреча с Бизнесом",
    items: [
      {
        type: "constraint",
        text: "Вопрос не был заявлен к обсуждению — тайминг встречи 30 мин. Вопрос НЕ закрыт.",
      },
    ],
  },
];

const typeConfig: Record<string, { color: string; bg: string; border: string; label: string; icon: string }> = {
  decision: {
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#86efac",
    label: "Решение",
    icon: "CheckCircle2",
  },
  constraint: {
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fcd34d",
    label: "Ограничение",
    icon: "AlertTriangle",
  },
  risk: {
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fca5a5",
    label: "Риск",
    icon: "ShieldAlert",
  },
  rejection: {
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#93c5fd",
    label: "Отказ / Пересмотр",
    icon: "XCircle",
  },
  requirement: {
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#c4b5fd",
    label: "Новое требование",
    icon: "Lightbulb",
  },
};

const risks = [
  { id: "R1", name: "Отказ от части требований ТЗ", probability: 3, impact: 4, date: "11.03" },
  { id: "R2", name: "Рост трудозатрат", probability: 3, impact: 3, date: "16.03" },
  { id: "R3", name: "Сдвиг сроков", probability: 4, impact: 4, date: "17.03" },
  { id: "R4", name: "Реализация без финального решения", probability: 4, impact: 5, date: "19.03" },
];

const decisions = [
  { date: "06.03", decision: "Новый справочник «Службы»", status: "rejected", replacedBy: "11.03" },
  { date: "11.03", decision: "Отказ от справочника. Ожидание держателя требований", status: "intermediate", replacedBy: "16.03" },
  { date: "16.03", decision: "«Подразделения организации»", status: "rejected", replacedBy: "17.03" },
  { date: "17.03", decision: "«Подразделения» + «Направления деятельности»", status: "rejected", replacedBy: "19.03" },
  { date: "19.03", decision: "Моделирование 2 вариантов отчётности", status: "open", replacedBy: null },
  { date: "20.03", decision: "Вопрос не закрыт — перенесён", status: "open", replacedBy: null },
];

function RiskMatrix() {
  return (
    <div>
      <div style={{ position: "relative", width: 200, height: 200 }}>
        <svg width={200} height={200} style={{ position: "absolute", top: 0, left: 0 }}>
          {[1, 2, 3, 4, 5].map((row) =>
            [1, 2, 3, 4, 5].map((col) => {
              const score = row * col;
              const fill = score >= 16 ? "#fee2e2" : score >= 9 ? "#fef9c3" : "#f0fdf4";
              return (
                <rect
                  key={`${row}-${col}`}
                  x={(col - 1) * 38 + 2}
                  y={(5 - row) * 38 + 2}
                  width={36}
                  height={36}
                  fill={fill}
                  stroke="#e2e8f0"
                  strokeWidth={1}
                  rx={3}
                />
              );
            })
          )}
          {risks.map((r) => (
            <g key={r.id}>
              <circle
                cx={(r.probability - 0.5) * 38 + 2}
                cy={(5 - r.impact + 0.5) * 38 + 2}
                r={13}
                fill="#dc2626"
                fillOpacity={0.85}
              />
              <text
                x={(r.probability - 0.5) * 38 + 2}
                y={(5 - r.impact + 0.5) * 38 + 6}
                textAnchor="middle"
                fontSize={9}
                fill="white"
                fontWeight="700"
                fontFamily="'IBM Plex Mono'"
              >
                {r.id}
              </text>
            </g>
          ))}
          <text x={100} y={198} textAnchor="middle" fontSize={9} fill="#94a3b8" fontFamily="'IBM Plex Sans'">Вероятность →</text>
          <text x={8} y={100} textAnchor="middle" fontSize={9} fill="#94a3b8" fontFamily="'IBM Plex Sans'" transform="rotate(-90,8,100)">Влияние →</text>
        </svg>
      </div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
        {risks.map((r) => (
          <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#dc2626", color: "#fff", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'IBM Plex Mono'" }}>
              {r.id}
            </span>
            <span style={{ fontSize: 10, color: "#475569", lineHeight: 1.3 }}>{r.name}</span>
            <span style={{ fontSize: 9, color: "#94a3b8", marginLeft: "auto", fontFamily: "'IBM Plex Mono'", flexShrink: 0 }}>{r.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DecisionsTable() {
  const statusStyle: Record<string, React.CSSProperties> = {
    rejected: { background: "#eff6ff", color: "#2563eb", border: "1px solid #93c5fd" },
    intermediate: { background: "#fef9c3", color: "#92400e", border: "1px solid #fcd34d" },
    open: { background: "#f0fdf4", color: "#166534", border: "1px solid #86efac" },
  };
  const statusLabel: Record<string, string> = {
    rejected: "Отменено",
    intermediate: "Промежуточное",
    open: "Открыто",
  };
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b", fontWeight: 600, marginBottom: 10 }}>
        Сводная таблица решений
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={{ padding: "5px 8px", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Дата</th>
            <th style={{ padding: "5px 8px", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Решение</th>
            <th style={{ padding: "5px 8px", textAlign: "center", color: "#64748b", fontWeight: 600, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Статус</th>
          </tr>
        </thead>
        <tbody>
          {decisions.map((d, i) => (
            <tr key={i} style={{ borderTop: "1px solid #f1f5f9" }}>
              <td style={{ padding: "5px 8px", fontFamily: "'IBM Plex Mono'", fontSize: 10, color: "#64748b", whiteSpace: "nowrap" }}>{d.date}</td>
              <td style={{ padding: "5px 8px", color: d.status === "rejected" ? "#94a3b8" : "#1e293b", lineHeight: 1.4 }}>
                {d.status === "rejected" ? (
                  <span style={{ textDecoration: "line-through" }}>{d.decision}</span>
                ) : (
                  d.decision
                )}
                {d.replacedBy && (
                  <span style={{ marginLeft: 6, fontSize: 9, color: "#2563eb", fontFamily: "'IBM Plex Mono'" }}>→ {d.replacedBy}</span>
                )}
              </td>
              <td style={{ padding: "5px 8px", textAlign: "center" }}>
                <span style={{ ...statusStyle[d.status], fontSize: 9, padding: "2px 7px", borderRadius: 99, fontWeight: 600, whiteSpace: "nowrap", display: "inline-block" }}>
                  {statusLabel[d.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Index() {
  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", background: "#eef0f3", minHeight: "100vh", padding: "24px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", background: "#fff", borderRadius: 0, boxShadow: "0 2px 24px rgba(0,0,0,0.10)", border: "1px solid #d1d5db" }}>

        {/* Header — dark corporate bar */}
        <div style={{ background: "#1a2332", padding: "18px 28px 16px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderBottom: "3px solid #2563eb" }}>
          <div>
            <div style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6b8aad", fontWeight: 500, marginBottom: 4 }}>
              Ключевая аналитика · Система планирования персонала
            </div>
            <h1 style={{ fontSize: 19, fontWeight: 600, color: "#f0f4f8", margin: 0, letterSpacing: "0", lineHeight: 1.2 }}>
              Дорожная карта: Аналитика «Службы»
            </h1>
            <div style={{ fontSize: 11, color: "#6b8aad", marginTop: 4 }}>06 марта — 20 марта 2026</div>
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 480 }}>
            {Object.entries(typeConfig).map(([key, cfg]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.07)", border: `1px solid rgba(255,255,255,0.12)`, borderLeft: `3px solid ${cfg.color}`, borderRadius: 2, padding: "3px 9px", fontSize: 10, fontWeight: 500, color: "#e2e8f0" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color, flexShrink: 0, display: "inline-block" }} />
                {cfg.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 0 }}>

          {/* Left: Timeline + Decisions */}
          <div style={{ padding: "20px 22px", borderRight: "1px solid #e5e7eb" }}>

            {/* Section label */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 3, height: 14, background: "#2563eb", borderRadius: 2 }} />
              <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#374151", fontWeight: 600 }}>
                Временная шкала
              </span>
            </div>

            {/* Timeline dots row */}
            <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 14 }}>
              {events.map((ev, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                    {i > 0 && <div style={{ flex: 1, height: 1.5, background: "#d1d5db" }} />}
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 2,
                      background: ev.items.some((x) => x.type === "rejection") ? "#2563eb" : ev.items.some((x) => x.type === "risk") ? "#dc2626" : "#15803d",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)", zIndex: 1,
                    }}>
                      <Icon
                        name={ev.items.some((x) => x.type === "rejection") ? "XCircle" : ev.items.some((x) => x.type === "risk") ? "ShieldAlert" : "CheckCircle2"}
                        size={14}
                        style={{ color: "#fff" }}
                      />
                    </div>
                    {i < events.length - 1 && <div style={{ flex: 1, height: 1.5, background: "#d1d5db" }} />}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10.5, fontWeight: 600, color: "#111827", marginTop: 5 }}>{ev.date}</div>
                  <div style={{ fontSize: 9, color: "#6b7280", textAlign: "center", marginTop: 1, lineHeight: 1.3, maxWidth: 78 }}>{ev.label}</div>
                </div>
              ))}
            </div>

            {/* Event cards grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
              {events.map((ev, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {ev.items.map((item, j) => {
                    const cfg = typeConfig[item.type];
                    return (
                      <div key={j} style={{ background: "#fafafa", border: "1px solid #e5e7eb", borderRadius: 2, padding: "5px 7px", borderLeft: `3px solid ${cfg.color}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, flexShrink: 0, display: "inline-block" }} />
                          <span style={{ fontSize: 8, fontWeight: 700, color: cfg.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{cfg.label}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 9.5, color: "#374151", lineHeight: 1.45 }}>{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Decisions table */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 3, height: 14, background: "#2563eb", borderRadius: 2 }} />
                <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#374151", fontWeight: 600 }}>
                  Сводная таблица решений
                </span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#1a2332" }}>
                    <th style={{ padding: "6px 10px", textAlign: "left", color: "#9ca3af", fontWeight: 600, fontSize: 9.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Дата</th>
                    <th style={{ padding: "6px 10px", textAlign: "left", color: "#9ca3af", fontWeight: 600, fontSize: 9.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Решение</th>
                    <th style={{ padding: "6px 10px", textAlign: "center", color: "#9ca3af", fontWeight: 600, fontSize: 9.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {decisions.map((d, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                      <td style={{ padding: "5px 10px", fontFamily: "'IBM Plex Mono'", fontSize: 10, color: "#6b7280", whiteSpace: "nowrap" }}>{d.date}</td>
                      <td style={{ padding: "5px 10px", color: d.status === "rejected" ? "#9ca3af" : "#111827", lineHeight: 1.4 }}>
                        {d.status === "rejected" ? (
                          <span style={{ textDecoration: "line-through" }}>{d.decision}</span>
                        ) : (
                          d.decision
                        )}
                        {d.replacedBy && (
                          <span style={{ marginLeft: 6, fontSize: 9, color: "#2563eb", fontFamily: "'IBM Plex Mono'" }}>→ {d.replacedBy}</span>
                        )}
                      </td>
                      <td style={{ padding: "5px 10px", textAlign: "center" }}>
                        <span style={{
                          fontSize: 9, padding: "2px 8px", borderRadius: 2, fontWeight: 600, whiteSpace: "nowrap", display: "inline-block",
                          ...(d.status === "rejected" ? { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }
                            : d.status === "intermediate" ? { background: "#fefce8", color: "#92400e", border: "1px solid #fde68a" }
                            : { background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" })
                        }}>
                          {d.status === "rejected" ? "Отменено" : d.status === "intermediate" ? "Промежуточное" : "Открыто"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Risk matrix + stats */}
          <div style={{ padding: "20px 18px", display: "flex", flexDirection: "column", gap: 16, background: "#f9fafb" }}>

            {/* Risk matrix */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 3, height: 14, background: "#dc2626", borderRadius: 2 }} />
                <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#374151", fontWeight: 600 }}>
                  Матрица рисков
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 2, padding: "10px" }}>
                <RiskMatrix />
              </div>
            </div>

            {/* Status block */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 3, height: 14, background: "#dc2626", borderRadius: 2 }} />
                <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#374151", fontWeight: 600 }}>
                  Текущий статус
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ background: "#7f1d1d", padding: "8px 12px", display: "flex", gap: 7, alignItems: "flex-start" }}>
                  <Icon name="AlertOctagon" size={13} style={{ color: "#fca5a5", flexShrink: 0, marginTop: 1 }} />
                  <div style={{ fontSize: 10, color: "#fecaca", lineHeight: 1.5 }}>
                    <strong style={{ color: "#fff" }}>Реализация приостановлена.</strong> Финальное бизнес-решение не принято. 4 пересмотра за 2 недели.
                  </div>
                </div>
                <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
                  {[
                    { label: "Встреч проведено", value: "6", color: "#111827" },
                    { label: "Решений отменено", value: "3", color: "#2563eb" },
                    { label: "Активных рисков", value: "4", color: "#dc2626" },
                    { label: "Открытых вопросов", value: "2", color: "#d97706" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f3f4f6", paddingBottom: 6 }}>
                      <span style={{ fontSize: 10, color: "#6b7280" }}>{s.label}</span>
                      <span style={{ fontWeight: 700, color: s.color, fontFamily: "'IBM Plex Mono'", fontSize: 14 }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "8px 22px", borderTop: "1px solid #e5e7eb", background: "#1a2332", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 9.5, color: "#6b8aad" }}>
          <span>Дорожная карта ключевой аналитики — Службы · v1.0</span>
          <span style={{ fontFamily: "'IBM Plex Mono'" }}>Актуально на 20.03.2026</span>
        </div>
      </div>
    </div>
  );
}