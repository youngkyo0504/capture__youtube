import { SketchBook } from './canvas/canvas';

const checkNull = (element: any) => {
  if (!element) {
    throw new Error(`not exist`);
  }
};

export const imageSave = (selector: string) => {
  const image = document.querySelector(selector)! as HTMLImageElement;
  checkNull(image);

  const link = document.createElement('a');
  link.href = image.src;
  link.download = image.alt || 'capture';
  link.click();
};

export const selectVideo = () => {
  //비디오 원본 크기만큼 캔버스태그를 생성한다.
  const video = document.querySelector('video')! as HTMLVideoElement;
  checkNull(video);

  const sketch = new SketchBook();
  const dataURI = sketch.toDataURI(video, video.width, video.height);
  const img = sketch.toImgElement(dataURI);
  return img;
};

