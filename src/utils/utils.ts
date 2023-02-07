export class Utils {
    static async generateArrayBuffer(url: string): Promise<string> {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const arrayBuffer = xhr.response;
                const blob = new Blob([arrayBuffer]);
                const imgUrl = URL.createObjectURL(blob);
                resolve(imgUrl);
            }
            xhr.open('GET', url);
            xhr.responseType = "arraybuffer";
            xhr.send();
        });
    }

    static isMobileDevice(type = /Android|iPhone|iPad|iPod/i): boolean {
        return type.test(navigator.userAgent);
    }

    static isAppleMobileDevice(): boolean {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
}
