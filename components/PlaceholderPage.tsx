interface PlaceholderPageProps {
  section: string;
  title: string;
}

export default function PlaceholderPage({ section, title }: PlaceholderPageProps) {
  return (
    <div className="min-h-[60vh] flex flex-col">
      <div className="bg-gray-50 border-b border-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">{section}</p>
          <h1 className="text-2xl md:text-3xl font-light text-gray-900">{title}</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="text-center">
          <div className="w-12 h-px bg-gray-200 mx-auto mb-6" />
          <p className="text-sm text-gray-400">콘텐츠 준비 중입니다.</p>
          <p className="text-xs text-gray-300 mt-2">Content coming soon.</p>
        </div>
      </div>
    </div>
  );
}
