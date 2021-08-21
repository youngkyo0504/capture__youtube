const FIRST_FUNC = 0;

export function captureVideo() {
    const captureCanvas = drawCaptureInCanvas();
    const captureImageHTML = convertCanvasToImageHTML(captureCanvas);
    const videoTitle = getYoutubeVideoTitle();

    return {
        src: captureImageHTML.src,
        html: captureImageHTML.outerHTML,
        title: videoTitle
    }
}

export function insertCaptureHTML(videoCapture) {
    const inserted = document.querySelector(".inserted");
    inserted.innerHTML = videoCapture.html;
}

export function drawCaptureInCanvas() {
    console.log("draw")
    const canvas = document.createElement("canvas");
    const video = document.querySelector("video");
    console.log(video);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // getContext를 이용해서 비디오를 캔버스에 그려준다.
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas
}

export function getYoutubeVideoTitle() {
    const title = document.querySelector("#container > h1 > yt-formatted-string")
    const videoTitle = title ? title.textContent : "capture";
    return videoTitle
}

export function convertCanvasToImageHTML(canvas) {
    const dataURI = canvas.toDataURL("image/png");
    const newImage = document.createElement("img");
    newImage.src = dataURI;
    newImage.classList.add("img");
    newImage.style.width = `${canvas.width * 0.27}px`;
    newImage.style.height = `${canvas.height * 0.27}px`;
    newImage.style.display = "block";
    newImage.style.position = "relative";
    return newImage
}
//클립보드에 복사
export async function writeClipImg(imgSource) {
    try {
        const data = await fetch(imgSource);
        console.log(data);
        const blob = await data.blob();
        console.log(blob);
        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob,
            }),
        ]);
        console.log("Fetched image copied.");
    } catch (err) {
        console.error(err.name, err.message);
    }
}

export const saveImageWithTitle = (selector, videoTitle) => {
    const image = document.querySelector(selector);
    const link = document.createElement("a");
    link.href = image.src;
    link.download = videoTitle
    link.click();
}


export const getChromeScript = async (func) => {
    console.log(func)
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const injectionResults = await chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: captureVideo,
        })
    return injectionResults[FIRST_FUNC].result;
}