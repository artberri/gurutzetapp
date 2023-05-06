import { CancelWatch, NetworkDetector } from "../domain/NetworkDetector"

export class BrowserNetworkDetector implements NetworkDetector {
	private readonly window = window

	public isOnLine(): boolean {
		return this.window.navigator?.onLine ?? true
	}

	public watchOnlineStatus(callback: (isOnLine: boolean) => void): CancelWatch {
		const setOffline = () => callback(false)
		const setOnline = () => callback(true)

		this.window.addEventListener("offline", setOffline)
		this.window.addEventListener("online", setOnline)

		return () => {
			this.window.removeEventListener("offline", setOffline)
			this.window.removeEventListener("online", setOnline)
		}
	}
}
