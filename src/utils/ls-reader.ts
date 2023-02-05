export class LsReader {

    static async parse(url: string): Promise<string[]> {
        const lsFile = new XMLHttpRequest();
        lsFile.open("GET", url, false);
        lsFile.send();
        const lsDoc = lsFile.responseXML;
        const images = lsDoc?.getElementsByTagName("image");
        const pathFiles = url.replace('lemonslide.xml', '');
        const imgUrls = [];

        if (images !== undefined) {
            for (let i = 0; i < images.length; i++) {
                imgUrls.push(pathFiles + lsDoc?.getElementsByTagName("image")[i].childNodes[0].nodeValue);
            }
        }

        return imgUrls;
    }
}
