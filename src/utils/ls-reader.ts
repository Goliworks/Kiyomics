export class LsReader {

    static async parse(url: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const lsFile = new XMLHttpRequest();
            lsFile.open("GET", url, false);
            try {
                lsFile.send();
            } catch (e) {
                reject();
            }

            const lsDoc = lsFile.responseXML;
            const images = lsDoc?.getElementsByTagName("image");

            const pathExtract = url.split('/');
            pathExtract.pop();
            const pathFiles = pathExtract.join('/') + "/";
            const imgUrls = [];

            if (images !== undefined) {
                for (let i = 0; i < images.length; i++) {
                    imgUrls.push(pathFiles + lsDoc?.getElementsByTagName("image")[i].childNodes[0].nodeValue);
                }
            }

            resolve(imgUrls);
        });
    }
}
