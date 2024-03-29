import fileUpload from './fileUpload';
import insertToTextArea from './insertToTextArea';

const onImagePasted = async (
  dataTransfer: DataTransfer,
  setMarkdown: (value: string) => void,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      files.push(file);
    }
  }

  await Promise.all(
    files.map(async file => {
      const url = await fileUpload(file);
      const insertedMarkdown = insertToTextArea(`![${file.name}](${url})`);
      if (!insertedMarkdown) {
        return;
      }
      setMarkdown(insertedMarkdown);
    }),
  );
};

export default onImagePasted;
