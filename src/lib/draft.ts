export type Draft = { name?: string; gender?: string; birthDate?: string; birthTime?: string; birthTimeAccuracy?: string; birthPlace?: string; focusArea?: string; lifeContext?: string; question?: string };
const key = "minh-kinh-reading";
export function getDraft(): Draft { if (typeof window === "undefined") return {}; try { return JSON.parse(localStorage.getItem(key) ?? "{}"); } catch { return {}; } }
export function saveDraft(values: Draft) { localStorage.setItem(key, JSON.stringify({ ...getDraft(), ...values })); }
export function clearDraft() { localStorage.removeItem(key); }
