"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface FooterConfig {
  company_name: string;
  registration_number: string;
  representative: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  lunch_hours: string;
}

const defaultConfig: FooterConfig = {
  company_name: "태평양투자그룹",
  registration_number: "",
  representative: "",
  address: "",
  phone: "",
  email: "",
  hours: "평일 09:00 ~ 18:00",
  lunch_hours: "12:00 ~ 13:00",
};

export default function FooterAdminPage() {
  const [config, setConfig] = useState<FooterConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchConfig() {
      const supabase = createClient();
      const { data } = await supabase
        .from("footer_config")
        .select("*")
        .single();
      if (data) setConfig(data);
      setLoading(false);
    }
    fetchConfig();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    await supabase.from("footer_config").upsert({ id: 1, ...config });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-sm text-gray-400">로딩 중...</div>
    );
  }

  const fields: { key: keyof FooterConfig; label: string; placeholder: string }[] = [
    { key: "company_name", label: "상호명", placeholder: "태평양투자그룹" },
    { key: "registration_number", label: "사업자등록번호", placeholder: "000-00-00000" },
    { key: "representative", label: "대표자", placeholder: "홍길동" },
    { key: "address", label: "사업장 주소", placeholder: "서울특별시 강남구 ..." },
    { key: "phone", label: "전화번호", placeholder: "000-0000-0000" },
    { key: "email", label: "이메일", placeholder: "contact@example.com" },
    { key: "hours", label: "운영시간", placeholder: "평일 09:00 ~ 18:00" },
    { key: "lunch_hours", label: "점심시간", placeholder: "12:00 ~ 13:00" },
  ];

  return (
    <div>
      <h1 className="text-xl font-medium text-gray-900 mb-8">푸터 수정</h1>

      <div className="bg-white border border-gray-100 p-6 max-w-xl">
        <form onSubmit={handleSave} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs text-gray-500 mb-1.5">{field.label}</label>
              <input
                type="text"
                value={config[field.key]}
                onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-primary text-white text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {saving ? "저장 중..." : saved ? "저장완료!" : "저장"}
          </button>
        </form>
      </div>
    </div>
  );
}
