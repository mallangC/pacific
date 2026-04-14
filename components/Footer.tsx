import { createClient } from "@/lib/supabase/server";

const defaultConfig = {
  company_name: "태평양투자그룹",
  registration_number: "",
  representative: "",
  address: "",
  phone: "",
  email: "",
  hours: "평일 09:00 ~ 18:00",
  lunch_hours: "12:00 ~ 13:00",
};

export default async function Footer() {
  const supabase = await createClient();
  const { data } = await supabase.from("footer_config").select("*").single();
  const config = { ...defaultConfig, ...data };

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{config.company_name}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              © {new Date().getFullYear()} {config.company_name}. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">사업자 정보</h3>
            <ul className="text-xs text-gray-500 space-y-1.5">
              <li>상호명: {config.company_name}</li>
              {config.registration_number && <li>사업자등록번호: {config.registration_number}</li>}
              {config.representative && <li>대표자: {config.representative}</li>}
              {config.address && <li>사업장 주소: {config.address}</li>}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">고객센터</h3>
            <ul className="text-xs text-gray-500 space-y-1.5">
              {config.phone && <li>전화: {config.phone}</li>}
              {config.email && <li>이메일: {config.email}</li>}
              {config.hours && <li>운영시간: {config.hours}</li>}
              {config.lunch_hours && <li>점심시간: {config.lunch_hours}</li>}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
