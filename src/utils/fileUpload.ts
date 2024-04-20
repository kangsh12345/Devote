import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import { storage } from '../firebaseApp';

const fileUpload = async (file: File): Promise<string> => {
  const fileName = uuid() + '.png';
  const storageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export default fileUpload;
