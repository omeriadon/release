import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Annotation } from "./components/Annotation/Annotation";
import { MurgonMap } from "./components/Map/Maps";
import { Title } from "./components/Annotation/Title";
import { Mermaid } from "./components/Annotation/Mermaid";
import { SectionAudioPlayer } from "./components/SectionAudioPlayer";
import { Step, Steps } from "fumadocs-ui/components/steps";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	Tab,
} from "fumadocs-ui/components/tabs";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

// Use <Icon name="AnyLucideIconName" /> in MDX — no need to pre-import icons individually
const Icon = ({ name, ...props }: { name: string } & LucideProps) => {
	const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
	return IconComponent ? <IconComponent {...props} /> : null;
};

const Highlight = (props: React.PropsWithChildren<{ className?: string }>) => (
	<span
		{...props}
		style={{
			backgroundColor: "rgba(16, 179, 171, 0.6)",
			padding: "0.1rem 0.2rem",
			borderRadius: "5px",
		}}
	/>
);


export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		h1: (props) => <h1 {...props} className="text-fd-primary" />,
		h2: (props) => <h2 {...props} className="text-fd-primary" />,
		h3: (props) => <h3 {...props} className="text-fd-primary" />,
		h4: (props) => <h4 {...props} className="text-fd-primary" />,
		Highlight,
		Annotation,
		MurgonMap,
		Mermaid,
		Title,
		Tabs,
		TabsList,
		TabsTrigger,
		Accordion,
		Accordions,
		Step,
		Steps,
		TabsContent,
		Tab,
		Icon,
		SectionAudioPlayer,
		img: (props) => (
			<ImageZoom {...(props as any)} width="400" className="rounded-[10px]" />
		),
		...components,
	};
}
