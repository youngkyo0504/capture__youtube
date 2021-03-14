var button = document.getElementById("videoCatch");

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
        inserted.innerHTML = injectionResults[0].result;
      }
    );
  },
  { once: false }
);

function selectVideo() {
  const b = () => {
    var canvas = document.createElement("canvas");
    var video = document.querySelector("video");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var dataURI = canvas.toDataURL("image/png");
    console.log(canvas.height, canvas.width);
    var newImage = document.createElement("img");
    newImage.src = dataURI;
    newImage.classList.add("img");
    newImage.style.width = `${canvas.width * 0.27}px`;
    newImage.style.height = `${canvas.height * 0.27}px`;
    console.log(newImage.style.width, newImage.style.height);
    newImage.style.display = "block";
    newImage.style.position = "relative";
    return newImage.outerHTML;
  };
  return b();
}
