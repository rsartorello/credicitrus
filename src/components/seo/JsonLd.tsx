type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Serializa JSON-LD de forma segura para o HTML. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
