import { imageSave, selectVideo } from './method.js';
import { writeClipImg } from './clipboard.js';

const captureBtn = document.querySelector('#video_capture_btn')! as HTMLElement;
const saveBtn = document.querySelector('#save_btn')! as HTMLElement;

captureBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const injectionResults = await chrome.scripting.executeScript({
    func: selectVideo,
    target: { tabId: tab?.id! as number },
  });

  const [videoResult] = injectionResults;
  if (!videoResult) {
    return;
  }
  const img = videoResult.result;
  writeClipImg(img.src);
  document.body.appendChild(img);
});

saveBtn.addEventListener('click', () => {
  imageSave('.img');
});
