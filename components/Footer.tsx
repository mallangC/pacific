export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">태평양투자그룹</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              © {new Date().getFullYear()} 태평양투자그룹. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">사업자 정보</h3>
            <ul className="text-xs text-gray-500 space-y-1.5">
              <li>상호명: 태평양투자그룹</li>
              <li>사업자등록번호: 000-00-00000</li>
              <li>대표자: (대표자 성함)</li>
              <li>사업장 주소: (사업장 주소)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">고객센터</h3>
            <ul className="text-xs text-gray-500 space-y-1.5">
              <li>전화: 000-0000-0000</li>
              <li>이메일: contact@pacific-invest.kr</li>
              <li>운영시간: 평일 09:00 ~ 18:00</li>
              <li>점심시간: 12:00 ~ 13:00</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
