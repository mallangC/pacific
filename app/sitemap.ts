import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE = "https://thepacificinvest.com";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${BASE}`,                          changeFrequency: "monthly",  priority: 1.0  },
  { url: `${BASE}/company/overview`,         changeFrequency: "monthly",  priority: 0.9  },
  { url: `${BASE}/company/greeting`,         changeFrequency: "yearly",   priority: 0.7  },
  { url: `${BASE}/company/values`,           changeFrequency: "yearly",   priority: 0.7  },
  { url: `${BASE}/company/history`,          changeFrequency: "yearly",   priority: 0.6  },
  { url: `${BASE}/company/team`,             changeFrequency: "yearly",   priority: 0.6  },
  { url: `${BASE}/investment/domestic`,      changeFrequency: "monthly",  priority: 0.8  },
  { url: `${BASE}/investment/us`,            changeFrequency: "monthly",  priority: 0.8  },
  { url: `${BASE}/investment/index-trading`, changeFrequency: "monthly",  priority: 0.8  },
  { url: `${BASE}/portfolio/domestic`,       changeFrequency: "weekly",   priority: 0.8  },
  { url: `${BASE}/portfolio/index`,          changeFrequency: "weekly",   priority: 0.8  },
  { url: `${BASE}/partners/cme`,             changeFrequency: "yearly",   priority: 0.5  },
  { url: `${BASE}/partners/icsd`,            changeFrequency: "yearly",   priority: 0.5  },
  { url: `${BASE}/partners/oneday`,          changeFrequency: "yearly",   priority: 0.5  },
  { url: `${BASE}/contact/notices`,          changeFrequency: "weekly",   priority: 0.7  },
  { url: `${BASE}/contact/faq`,              changeFrequency: "monthly",  priority: 0.6  },
  { url: `${BASE}/contact/inquiry`,          changeFrequency: "yearly",   priority: 0.5  },
  { url: `${BASE}/contact/directions`,       changeFrequency: "yearly",   priority: 0.5  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: notices } = await supabase
    .from("notices")
    .select("id, created_at")
    .order("created_at", { ascending: false });

  const noticeRoutes: MetadataRoute.Sitemap = (notices ?? []).map((n) => ({
    url: `${BASE}/contact/notices/${n.id}`,
    lastModified: new Date(n.created_at),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...STATIC_ROUTES, ...noticeRoutes];
}
