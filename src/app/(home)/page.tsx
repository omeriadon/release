import Link from "next/link";

export default function HomePage() {
	return (
		<div className="flex flex-col justify-center text-center flex-1">
			<h1 className="text-4xl font-bold text-fd-primary mb-4">Release</h1>
			<h2 className="text-xl text-fd-primary/50 mb-16">
				By Diobett, Bee, and Adon.
			</h2>
			<p>
				Go to our submission{" "}
				<Link href="/docs" className="font-medium text-fd-primary underline">
					here
				</Link>
				.
			</p>
		</div>
	);
}
