const button = document.querySelector("#videoCatch");
const saveButton = document.querySelector("#save");

button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: selectVideo,
    },
    (injectionResults) => {
      //selectvideo()에서 반환된 값을 extension의 HTML에 추가해준다.
      const inserted = document.querySelector(".inserted");

      //반환값은 배열의 형태 result[0]은    result[1]은 Html 텍스트 형태 ,
      const [imgSource, innerHTML] = injectionResults[0].result;
      inserted.innerHTML = innerHTML;

      //클립보드에 복사
      async function writeClipImg() {
        try {
          const data = await fetch(imgSource);
          const blob = await data.blob();
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
      writeClipImg();
    }
  );
  saveButton.classList.remove("none");
});

//사진다운로드 버튼
saveButton.addEventListener("click", () => {
  const image = document.querySelector(".img");
  const link = document.createElement("a");
  link.href = image.src;
  link.download = "capture";
  link.click();
});

function selectVideo() {
  // 비디오 원본 크기만큼 캔버스태그를 생성해준다.
  const canvas = document.createElement("canvas");
  const video = document.querySelector("video");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // getContext를 이4용해서 비디오를 캔버스에 그려준다.
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 캔버스를 이미지 태그로 만든다.
  const dataURI = canvas.toDataURL("image/png");
  const newImage = document.createElement("img");
  newImage.src = dataURI;
  newImage.classList.add("img");
  newImage.style.width = `${canvas.width * 0.27}px`;
  newImage.style.height = `${canvas.height * 0.27}px`;
  newImage.style.display = "block";
  newImage.style.position = "relative";

  //이미지 소스와 태그를 배열로 반환
  return [newImage.src, newImage.outerHTML];
}
