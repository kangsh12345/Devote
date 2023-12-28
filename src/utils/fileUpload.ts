import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../firebaseApp';

const fileUpload = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// const fileUpload = (file: File) => {
//   const imageURL = URL.createObjectURL(file);

//   return imageURL;
// };

export default fileUpload;
