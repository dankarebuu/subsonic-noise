const SESSION_STORAGE_KEY = "subsonic_demo_session_v1";

function createFallbackSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `sub_${crypto.randomUUID().slice(0, 12)}`;
  }
  const randomSuffix = Math.random().toString(36).slice(2, 10);
  return `sub_${Date.now().toString(36)}_${randomSuffix}`;
}

export interface DemoSessionContext {
  sessionId: string;
  isUrlOverride: boolean;
}

export function getDemoSession(): DemoSessionContext {
  if (typeof window === "undefined") {
    return { sessionId: "sub_ssr_default", isUrlOverride: false };
  }

  const params = new URLSearchParams(window.location.search);
  const urlSession = params.get("session")?.trim();
  if (urlSession) {
    return { sessionId: urlSession, isUrlOverride: true };
  }

  try {
    const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (existing && existing.trim().length > 0) {
      return { sessionId: existing.trim(), isUrlOverride: false };
    }
    const generated = createFallbackSessionId();
    window.localStorage.setItem(SESSION_STORAGE_KEY, generated);
    return { sessionId: generated, isUrlOverride: false };
  } catch {
    return { sessionId: createFallbackSessionId(), isUrlOverride: false };
  }
}
