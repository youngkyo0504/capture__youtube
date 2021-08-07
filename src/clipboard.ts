export const writeClipImg = async (imgSource: string) => {
  try {
    const data = await fetch(imgSource);
    const blob = await data.blob();
    const b = new ClipboardItem({ [blob.type]: blob });
    // let anyNavigator:any;
    // anyNavigator = window.navigator
    // await anyNavigator.clipboard.write()
    await window.navigator.clipboard.write([b]);
    console.log('Fetched image copied.');
  } catch (err) {
    console.error(err.name, err.message);
  }
};
