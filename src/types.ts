type SectionStyle = 'condensed' | 'multiline';

type SchemaSection = {
  title: string;
  style: SectionStyle;
  from: string;
  to?: string;
};

export type Config = {
  sections: SchemaSection[];
  ignore_containing: string[];
};

export type ParsedPr = { title: string; [key: string]: string | null };
export type RawPr = { title: string; body: string | null };
