export function selectVideo() {
    // 비디오 원본 크기만큼 캔버스태그를 생성해준다.
    const canvas = document.createElement("canvas");
    const video = document.querySelector("video");
    console.log(video);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // getContext를 이용해서 비디오를 캔버스에 그려준다.
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 캔버스를 이미지 태그로 만든다.
    const dataURI = canvas.toDataURL("image/png");
    console.log(dataURI);
    const newImage = document.createElement("img");
    newImage.src = dataURI;
    newImage.classList.add("img");
    newImage.style.width = `${canvas.width * 0.27}px`;
    newImage.style.height = `${canvas.height * 0.27}px`;
    newImage.style.display = "block";
    newImage.style.position = "relative";

    // 유튜브라면 title 가져오기 
    const title = document.querySelector("#container > h1 > yt-formatted-string")
    const videoTitle = title ? title.textContent : "capture";

    //이미지 소스와 태그를 배열로 반환
    return [newImage.src, newImage.outerHTML, videoTitle];
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

export const saveImage = (selector, videoTitle) => {
    const image = document.querySelector(selector);
    const link = document.createElement("a");
    link.href = image.src;
    link.download = videoTitle
    link.click();
}