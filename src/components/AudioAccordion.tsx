"use client";

import * as Primitive from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useRef, useState, useEffect, type ReactNode } from "react";

interface AudioAccordionsProps {
	type?: "single" | "multiple";
	defaultValue?: string | string[];
	className?: string;
	children?: ReactNode;
}

export function AudioAccordions({
	type = "single",
	defaultValue,
	className,
	children,
}: AudioAccordionsProps) {
	const [value, setValue] = useState<string | string[]>(() =>
		type === "single" ? (defaultValue ?? "") : (defaultValue ?? [])
	);

	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const id = window.location.hash.substring(1);
		const element = rootRef.current;
		if (!element || id.length === 0) return;
		const selected = document.getElementById(id);
		if (!selected || !element.contains(selected)) return;
		const val = selected.getAttribute("data-accordion-value");
		if (val)
			setValue((prev) =>
				typeof prev === "string" ? val : [val, ...(prev as string[])]
			);
	}, []);

	return (
		<Primitive.Root
			ref={rootRef}
			type={type as "single"}
			value={value as string}
			onValueChange={setValue as (v: string) => void}
			collapsible={type === "single" ? true : undefined}
			className={cn(
				"divide-y divide-fd-border overflow-hidden rounded-lg border bg-fd-card",
				className
			)}
		>
			{children}
		</Primitive.Root>
	);
}

interface AudioAccordionProps {
	title: string;
	value?: string;
	id?: string;
	headerRight?: ReactNode;
	children?: ReactNode;
	className?: string;
}

export function AudioAccordion({
	title,
	value,
	id,
	headerRight,
	children,
	className,
}: AudioAccordionProps) {
	const itemValue = value ?? title;

	return (
		<Primitive.Item
			value={itemValue}
			className={cn("scroll-m-24", className)}
		>
			<Primitive.Header
				id={id}
				data-accordion-value={itemValue}
				className="not-prose flex flex-row items-center my-2 text-fd-card-foreground font-medium has-focus-visible:bg-fd-accent"
			>
				<Primitive.Trigger className="group flex flex-1 items-center gap-2 px-3 py-2.5 text-start focus-visible:outline-none">
					<ChevronRight className="size-4 shrink-0 text-fd-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
					{title}
				</Primitive.Trigger>
				{headerRight && (
					<div
						className="flex items-center pr-3"
						onClick={(e) => e.stopPropagation()}
					>
						{headerRight}
					</div>
				)}
			</Primitive.Header>
			<Primitive.Content className="overflow-hidden data-[state=closed]:animate-fd-accordion-up data-[state=open]:animate-fd-accordion-down">
				<div className="px-4 pb-2 text-[0.9375rem] prose-no-margin">
					{children}
				</div>
			</Primitive.Content>
		</Primitive.Item>
	);
}
