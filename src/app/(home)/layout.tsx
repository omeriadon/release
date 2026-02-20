import { HomeLayout } from "fumadocs-ui/layouts/home";
import { BaseLayoutProps } from "fumadocs-ui/layouts/links";
import { BookText } from "lucide-react";


export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: (
				<>
					<BookText
						className="size-8 stroke-[2.4]"
						stroke="var(--color-fd-primary)"
					/>
					<span className="font-bold text-2xl text-fd-primary">Release</span>
				</>
			),
		},
	};
}

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<HomeLayout
			{...baseOptions()}
			links={[
				{
					text: "Our submission →",
					url: "/docs",
				},
			]}
		>
			{children}
		</HomeLayout>
	);
}
