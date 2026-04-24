import Image from "next/image";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  bgImage?: string;
  objectPosition?: string;
}

export default function PageHeader({ label, title, description, bgImage, objectPosition = "center" }: PageHeaderProps) {
  return (
    <section className="relative bg-gvvb-red py-20 md:py-28 px-4 overflow-hidden">
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover opacity-50"
            style={{ objectPosition }}
          />
          <div className="absolute inset-0 bg-gvvb-red/65" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto">
        <span className="font-heading text-xs uppercase tracking-widest text-white/70">
          {label}
        </span>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mt-2">
          {title}
        </h1>
        {description && (
          <p className="text-red-100 mt-4 max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
