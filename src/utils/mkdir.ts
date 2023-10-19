import fs from 'fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

export const createDirectory = ({ dirName }: { dirName: string }) => {
  const isExists = fs.existsSync(`${rootDirectory}/${dirName}`);

  if (!isExists) {
    fs.mkdirSync(`${rootDirectory}/${dirName}`, { recursive: true });

    return 'create success';
  }
  return 'exist';
};
