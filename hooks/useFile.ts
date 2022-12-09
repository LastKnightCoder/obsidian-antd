import { useState } from "react";

const fs = require('fs');
const path = require('path');

const createFolder = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    const folders = filePath.split(path.sep).filter(item => item);
    let currentPath = folders[0];
    // 最后一个是文件名
    for (let i = 1; i < folders.length - 1; i++) {
      currentPath = path.join(currentPath, folders[i]);
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath);
      }
    }
  }
}

const useFile = (filePath: string, initValue: string) => {
  createFolder(filePath);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, initValue);
  }	

  const [content, setContent] = useState(fs.readFileSync(filePath, 'utf-8'));
  const setContentToFile = (data: string) => {
    fs.writeFileSync(filePath, data);
    setContent(data);
  }

  return [content, setContentToFile];
}

export default useFile;