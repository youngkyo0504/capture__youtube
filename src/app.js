import { selectVideo, saveImage, writeClipImg } from "./method.js"


const button = document.querySelector("#select-btn");
const saveButton = document.querySelector("#save-btn");

button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const injectionResults = await chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: selectVideo,
    })

  //selectvideo()에서 반환된 값을 extension의 HTML에 추가해준다.
  const inserted = document.querySelector(".inserted");

  //반환값은 배열의 형태 result[0]은    result[1]은 Html 텍스트 형태 ,
  const [imgSource, innerHTML] = injectionResults[0].result;
  inserted.innerHTML = innerHTML;

  //클립보드에 복사
  writeClipImg(imgSource);

  saveButton.classList.remove("none");
});

//사진다운로드 버튼
saveButton.addEventListener("click", () => {
  saveImage(".image")
});

