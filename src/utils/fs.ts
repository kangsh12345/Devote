import fs from 'fs';
import path from 'path';

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

export const createDirectory = ({
  dirName,
  type,
}: {
  dirName: string;
  type: string;
}) => {
  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;

  if (regex.test(dirName) || dirName.length > 24) {
    return 'name incorrect';
  }

  const isExists = fs.existsSync(`${rootDirectory}/${dirName}`);

  if (!isExists) {
    if (type === 'file') {
      fs.writeFileSync(`${rootDirectory}/${dirName}`, '');
    } else {
      fs.mkdirSync(`${rootDirectory}/${dirName}`, { recursive: true });
    }

    return 'create success';
  }

  return 'exist';
};

export interface TreeProps {
  path: string;
  name: string;
  type: 'file' | 'folder';
  children: TreeProps[];
}

export const findAllDirectory = (path: string) => {
  const stack: TreeProps[] = [];

  let tempStack: TreeProps;

  fs.readdirSync(path, { withFileTypes: true }).forEach(file => {
    const destPath = `${path}/${file.name}`;

    if (file.isDirectory()) {
      tempStack = {
        path: destPath.replace(`${rootDirectory}/`, ''),
        name: file.name,
        type: 'folder',
        children: findAllDirectory(destPath),
      };
    } else {
      tempStack = {
        path: destPath.replace(`${rootDirectory}/`, ''),
        name: file.name,
        type: 'file',
        children: [],
      };
    }
    stack.push(tempStack);
    stack.sort((a, b) => {
      return (a.type === 'file' ? 1 : -1) - (b.type === 'file' ? 1 : -1);
    });
  });
  return stack;
};

export const rootDirectoryCheck = (dirName: string) => {
  const isExists = fs.existsSync(`${rootDirectory}/${dirName}`);

  if (isExists) {
    return false;
  }
  return true;
};
