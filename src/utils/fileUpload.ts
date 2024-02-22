import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import { storage } from '../firebaseApp';

const fileUpload = async (file: File): Promise<string> => {
  const fileName = uuid() + '.png';
  const storageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// const fileUpload = (file: File) => {
//   const imageURL = URL.createObjectURL(file);

//   return imageURL;
// };

export default fileUpload;
