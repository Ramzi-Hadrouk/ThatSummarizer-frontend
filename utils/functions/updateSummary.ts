import { getCurrentDate } from "./get-current-date";

interface SummaryData {
  summary: string;
  date?: string;
}

interface ApiResponse {
  isValid: boolean;
  data: any;
  error: string | null;
  token?: string;
}

export async function updateSummary(summaryId: number, summary: string) {
  const apiBase = process.env.BASE_URL || "http://localhost:1337";
  const endpoint = `${apiBase}/api/summaries/${summaryId}`;

  const authRes = await fetch("/api/auth/check");

  if (!authRes.ok) {
    throw new Error(`Auth check failed with status ${authRes.status}`);
  }

  const authData: ApiResponse = await authRes.json();

  if (!authData?.isValid || !authData?.token) {
    throw new Error("User is not authenticated or token is missing.");
  }

  const payload = {
    data: {
      summary,
      date: getCurrentDate(),
    },
  };

  try {
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Failed to update summary. Status: ${res.status}`);
    }

    return res;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Summary update failed:", message);
    throw new Error(message);
  }
}
