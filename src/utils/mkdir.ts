import fs from 'fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

export const createDirectory = ({ email }: { email: string }) => {
  const isExists = fs.existsSync(`${rootDirectory}/${email}`);

  if (!isExists) {
    fs.mkdirSync(`${rootDirectory}/${email}`, { recursive: true });

    return 'create success';
  }
  return 'exist';
};
