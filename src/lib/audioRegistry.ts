/**
 * Module-level registry of stop callbacks, one per mounted audio player.
 * When any player starts playback it should call stopAllExcept(ownStop)
 * so all other players go silent.
 */
type StopFn = () => void;

const registry = new Set<StopFn>();

export function registerAudioPlayer(stopFn: StopFn): () => void {
	registry.add(stopFn);
	return () => registry.delete(stopFn);
}

/** Stop every registered player except the caller. */
export function stopAllExcept(ownFn: StopFn) {
	registry.forEach((fn) => {
		if (fn !== ownFn) fn();
	});
}
