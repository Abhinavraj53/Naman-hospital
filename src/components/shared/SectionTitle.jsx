const SectionTitle = ({ eyebrow, title, description, alignment = "center" }) => {
  const alignmentClass = alignment === "left" ? "text-start" : alignment === "right" ? "text-end" : "text-center";

  return (
    <div className={`section-heading ${alignmentClass}`}>
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p className="text-muted mt-3 mb-0">{description}</p>}
    </div>
  );
};

export default SectionTitle;

