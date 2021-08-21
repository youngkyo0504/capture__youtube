import { insertCaptureHTML, getChromeScript, captureVideo, saveImageWithTitle, writeClipImg } from "./method.js"


const selectButton = document.querySelector("#select-btn");
const saveButton = document.querySelector("#save-btn");
let title; // title변수 선언 

selectButton.addEventListener("click", async () => {
  const videoCapture = await getChromeScript(captureVideo)
  console.log(videoCapture)
  insertCaptureHTML(videoCapture)
  title = videoCapture.title;

  //클립보드에 복사
  writeClipImg(videoCapture.src);

  saveButton.classList.remove("none");
});

//사진다운로드 버튼
saveButton.addEventListener("click", () => {
  saveImageWithTitle(".img", title)
});

