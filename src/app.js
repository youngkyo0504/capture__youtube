/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { getVideoSource, saveImage, writeClipImg } from "./method";
import "./asset/css/style.css";
import icon from "./asset/img/youtube.png";
import dot from "./asset/img/dot.png";
import manifest from "./manifest.json";

const selectButton = document.querySelector("#select-btn");
const saveButton = document.querySelector("#save-btn");
const toast = document.querySelector(".toast");
toast.addEventListener("animationend", (e) => {
  e.currentTarget.classList.remove("active");
});
let title; // title변수 선언

selectButton.addEventListener("click", async () => {
  toast.classList.remove("active");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const injectionResults = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getVideoSource,
  });

  // selectvideo()에서 반환된 값을 extension의 HTML에 추가해준다.
  const inserted = document.querySelector(".inserted");

  // 반환값은 배열의 형태 result[0]은    result[1]은 Html 텍스트 형태 ,
  const [imgSource, innerHTML, videoTitle] = injectionResults[0].result;
  inserted.innerHTML = innerHTML;
  title = videoTitle;

  // 클립보드에 복사
  writeClipImg(imgSource);
  // toasts animation

  toast.classList.add("active");
  saveButton.classList.remove("none");
});

// 사진다운로드 버튼
saveButton.addEventListener("click", () => {
  saveImage(".img", title);
});
