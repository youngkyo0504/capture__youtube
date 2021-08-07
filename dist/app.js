var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { imageSave, selectVideo } from './method.js';
import { writeClipImg } from './clipboard.js';
const captureBtn = document.querySelector('#video_capture_btn');
const saveBtn = document.querySelector('#save_btn');
captureBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let [tab] = yield chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    const injectionResults = yield chrome.scripting.executeScript({
        func: selectVideo,
        target: { tabId: tab === null || tab === void 0 ? void 0 : tab.id },
    });
    const [videoResult] = injectionResults;
    if (!videoResult) {
        return;
    }
    const img = videoResult.result;
    writeClipImg(img.src);
    document.body.appendChild(img);
}));
saveBtn.addEventListener('click', () => {
    imageSave('.img');
});
