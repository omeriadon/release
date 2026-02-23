import Link from "next/link";

export default function HomePage() {
	return (
		<div className="relative flex flex-col justify-center text-center flex-1 overflow-hidden">
			{/* Background image with blur */}
			<div
				className="absolute inset-0 scale-105 blur-xs"
				style={{
					backgroundImage: "url('/images/background/background.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			{/* Dark red tint overlay */}
			<div className="absolute inset-0 bg-[#1a0000]/70" />
			{/* Content */}
			<div className="relative z-10">
				<h1 className="text-8xl font-bold text-fd-primary italic mb-4 new-york">Release</h1>
				<h2 className="text-xl text-fd-primary/50 mb-16">
					By Diobett, Bee, and Adon.
				</h2>
				<p className="text-white/80">
					Go to our submission{" "}
					<Link href="/docs" className="font-medium text-fd-primary underline">
						here
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
