var button = document.getElementById("videoCatch");
const save_button = document.querySelector("#save");

button.addEventListener(
  "click",
  async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let hey = await chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: selectVideo,
      },
      (injectionResults) => {
        const inserted = document.querySelector(".inserted");
        //selectvideo에서 반환된 값을 extension의 HTML에 추가해준다.
        inserted.innerHTML = injectionResults[0].result;
      }
    );
    save_button.classList.remove("none");
  },
  { once: false }
);

save_button.addEventListener("click", () => {
  const image = document.querySelector(".img");
  const link = document.createElement("a");
  link.href = image.src;
  link.download = "capture";
  link.click();
});
function selectVideo() {
  const b = () => {
    // 비디오 원본 크기만큼 캔버스태그를 생성해준다.
    var canvas = document.createElement("canvas");
    var video = document.querySelector("video");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // getContext를 이용해서 비디오를 캔버스에 그려준다
    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 캔버스를 이미지 URL로 만들어서 이미지태그 소스에 넣어준다.
    var dataURI = canvas.toDataURL("image/png");
    var newImage = document.createElement("img");
    newImage.src = dataURI;
    newImage.classList.add("img");
    newImage.style.width = `${canvas.width * 0.27}px`;
    newImage.style.height = `${canvas.height * 0.27}px`;
    newImage.style.display = "block";
    newImage.style.position = "relative";
    //이미지 태그를 반환
    return newImage.outerHTML;
  };
  return b();
}
