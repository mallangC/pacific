interface Props {
  title: string;
  className?: string;
}

export default function PageHeader({ title, className }: Props) {
  return (
    <div className={className ?? "px-6 py-12"}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
      </div>
    </div>
  );
}
