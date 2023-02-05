export class Utils {
    static async generateArrayBuffer(url: string): Promise<string> {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const arrayBuffer = xhr.response;
                console.log(arrayBuffer.byteLength);
                const blob = new Blob([arrayBuffer]);
                const imgUrl = URL.createObjectURL(blob);
                resolve(imgUrl);
            }
            xhr.open('GET', url);
            xhr.responseType = "arraybuffer";
            xhr.send();
        });
    }
}

export enum ChangeFrameEnum {
    LEFT,
    RIGHT
}
