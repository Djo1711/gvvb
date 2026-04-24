interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <section className="bg-gvvb-navy py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <span className="font-heading text-xs uppercase tracking-widest text-gvvb-red">
          {label}
        </span>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mt-2">
          {title}
        </h1>
        {description && (
          <p className="text-gray-300 mt-4 max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
