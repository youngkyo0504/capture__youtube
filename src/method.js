// import html2canvas from "html2canvas";
export function getVideoSource() {
  function canvasToImgElement(dataURI) {
    const newImage = document.createElement("img");
    newImage.src = dataURI;
    newImage.classList.add("img");
    newImage.style.width = "100%";
    newImage.style.height = "auto";
    newImage.style.display = "block";
    newImage.style.position = "relative";
    return newImage;
  }
  function getVideoTitle() {
    const title = document.querySelector(
      "#container > h1 > yt-formatted-string"
    );
    const videoTitle = title ? title.textContent : "capture";
    return videoTitle;
  }
  function getCanvasWithVideo() {
    // 비디오 원본 크기만큼 캔버스태그를 생성해준다.
    const canvas = document.createElement("canvas");
    const video = document.querySelector("video");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // getContext를 이용해서 비디오를 캔버스에 그려준다.
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  const canvas = getCanvasWithVideo();
  const dataURI = canvas.toDataURL("image/png");
  const newImage = canvasToImgElement(dataURI);
  const videoTitle = getVideoTitle();
  // 이미지 소스와 태그를 배열로 반환
  return [newImage.src, newImage.outerHTML, videoTitle];
}

// 클립보드에 복사
export async function writeClipImg(imgSource) {
  try {
    const data = await fetch(imgSource);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new window.ClipboardItem({
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
  link.download = videoTitle;
  link.click();
};

// export async function getIframeScreenshotSource() {
//   function canvasToImgElement(dataURI) {
//     const newImage = document.createElement("img");
//     newImage.src = dataURI;
//     newImage.classList.add("img");
//     newImage.style.width = "100%";
//     newImage.style.height = `auto`;
//     newImage.style.display = "block";
//     newImage.style.position = "relative";
//     return newImage;
//   }
//   function getVideoTitle() {
//     const title = document.querySelector(
//       "#container > h1 > yt-formatted-string"
//     );
//     const videoTitle = title ? title.textContent : "capture";
//     return videoTitle;
//   }
//   function getCanvasWithVideo() {
//     // 비디오 원본 크기만큼 캔버스태그를 생성해준다.
//     const canvas = document.createElement("canvas");
//     const video = document.querySelector("video");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     // getContext를 이용해서 비디오를 캔버스에 그려준다.
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     return canvas;
//   }
//   // const iframe = document.querySelector("iframe");
//   const div = document.querySelector("div");
//   // div.append(iframe);
//   const canvas = await html2canvas(div);
//   console.log({ div });
//   console.log(canvas);
//   const dataURI = canvas.toDataURL("image/png");
//   const newImage = canvasToImgElement(dataURI);
//   const videoTitle = getVideoTitle();
//   newImage.style.background = "red";
//   div.append(newImage);

//   return [newImage.src, newImage.outerHTML, videoTitle];
// }
