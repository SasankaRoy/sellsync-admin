import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  <Pagination /> — React Query Compatible
//
//  Props:
//    page          – current page number  (from API response / your state)
//    limit         – records per page     (from API response)
//    total_records – total records        (from API response)
//    total_pages   – total pages          (from API response)
//    onPageChange  – (newPage: number) => void  → call setPage(newPage) here
//    siblingCount  – page buttons either side of active (default: 1)
//
//  How it works with React Query:
//    1. Parent owns `page` state: const [page, setPage] = useState(1)
//    2. page is in useQuery's queryKey:  useQuery({ queryKey: ["items", page], ... })
//    3. onPageChange just calls setPage → queryKey changes → React Query refetches
// ─────────────────────────────────────────────────────────────────────────────

const DOTS = "...";

function getRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function usePaginationRange({ page, total_pages, siblingCount = 1 }) {
  if (total_pages <= 1) return [1];

  const totalSlots = siblingCount * 2 + 5;
  if (totalSlots >= total_pages) return getRange(1, total_pages);

  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, total_pages);
  const showLeft = left > 2;
  const showRight = right < total_pages - 1;

  if (!showLeft && showRight)
    return [...getRange(1, 3 + siblingCount * 2), DOTS, total_pages];

  if (showLeft && !showRight)
    return [1, DOTS, ...getRange(total_pages - (2 + siblingCount * 2), total_pages)];

  return [1, DOTS, ...getRange(left, right), DOTS, total_pages];
}

export default function PaginationTest({
  page,
  limit,
  total_records,
  total_pages,
  onPageChange,
  siblingCount = 1,
}) {
  const pageRange = usePaginationRange({ page, total_pages, siblingCount });

  if (!total_pages || total_pages <= 1) return null;

  const firstRecord = (page - 1) * limit + 1;
  const lastRecord = Math.min(page * limit, total_records);

  const go = (p) => {
    if (p === page || p < 1 || p > total_pages) return;
    onPageChange(p);
  };

  return (
    <div style={s.wrapper}>
      <span style={s.info}>
        Showing <strong style={s.bold}>{firstRecord}–{lastRecord}</strong> of{" "}
        <strong style={s.bold}>{total_records.toLocaleString()}</strong> records
      </span>

      <div style={s.controls}>
        <PageBtn onClick={() => go(1)} disabled={page === 1} title="First">«</PageBtn>
        <PageBtn onClick={() => go(page - 1)} disabled={page === 1} title="Previous">‹</PageBtn>

        {pageRange.map((p, i) =>
          p === DOTS ? (
            <span key={`dots-${i}`} style={s.dots}>{DOTS}</span>
          ) : (
            <button
              key={p}
              onClick={() => go(p)}
              style={{ ...s.btn, ...(p === page ? s.active : {}) }}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}

        <PageBtn onClick={() => go(page + 1)} disabled={page === total_pages} title="Next">›</PageBtn>
        <PageBtn onClick={() => go(total_pages)} disabled={page === total_pages} title="Last">»</PageBtn>
      </div>

      <JumpToPage page={page} total_pages={total_pages} onGo={go} />
    </div>
  );
}

function PageBtn({ onClick, disabled, title, children }) {
  return (
    <button onClick={onClick} disabled={disabled} title={title}
      style={{ ...s.btn, ...(disabled ? s.disabled : {}) }}>
      {children}
    </button>
  );
}

function JumpToPage({ page, total_pages, onGo }) {
  const [val, setVal] = useState("");
  const handleJump = () => {
    const p = Number(val);
    if (!isNaN(p) && p >= 1 && p <= total_pages) { onGo(p); setVal(""); }
  };
  return (
    <div style={s.jump}>
      <span style={s.info}>Go to</span>
      <input type="number" min={1} max={total_pages} value={val} placeholder={page}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleJump()}
        style={s.jumpInput} />
      <button onClick={handleJump} style={s.jumpBtn}>Go</button>
    </div>
  );
}

const s = {
  wrapper: {
    display: "flex", alignItems: "center", flexWrap: "wrap", gap: "12px",
    padding: "12px 0", userSelect: "none",
    fontFamily: "'DM Mono','Fira Code','Courier New',monospace", fontSize: "13px",
  },
  info:     { color: "#6b7280", whiteSpace: "nowrap" },
  bold:     { color: "#111827", fontWeight: 600 },
  controls: { display: "flex", alignItems: "center", gap: "4px" },
  btn: {
    minWidth: "34px", height: "34px", padding: "0 8px",
    border: "1px solid #e5e7eb", borderRadius: "6px",
    background: "#fff", color: "#374151", cursor: "pointer",
    fontFamily: "inherit", fontSize: "13px", fontWeight: 500,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.15s, border-color 0.15s",
  },
  active:   { background: "#111827", borderColor: "#111827", color: "#fff", fontWeight: 700 },
  disabled: { opacity: 0.35, cursor: "not-allowed", pointerEvents: "none" },
  dots:     { padding: "0 4px", color: "#9ca3af" },
  jump:     { display: "flex", alignItems: "center", gap: "6px", marginLeft: "auto" },
  jumpInput: {
    width: "52px", height: "34px", padding: "0 8px",
    border: "1px solid #e5e7eb", borderRadius: "6px",
    fontFamily: "inherit", fontSize: "13px", textAlign: "center", color: "#111827", outline: "none",
  },
  jumpBtn: {
    height: "34px", padding: "0 12px", border: "1px solid #e5e7eb", borderRadius: "6px",
    background: "#f9fafb", color: "#374151", cursor: "pointer", fontFamily: "inherit", fontSize: "13px",
  },
};