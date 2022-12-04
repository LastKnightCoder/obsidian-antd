// @ts-nocheck
const OSS = require('ali-oss');

export default class AliOSS {
  constructor(region: string, accessKeyId: string, accessKeySecret: string, bucket: string) {
    if (!region || !accessKeyId || !accessKeySecret || !bucket) {
      this.client = null;
      return;
    }
    this.client = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      bucket
    });
  }

  createFile = async (filePath: string, fileContent = '') => {
    const headers = {
      'x-oss-storage-class': 'Standard',
      'x-oss-object-acl': 'private',
      'x-oss-forbid-overwrite': 'true',
    };
    return this.client.put(filePath, Buffer.from(fileContent), {
      headers
    });
  }
  
  updateFile = async (filePath: string, fileContent = '') => {
    const headers = {
      'x-oss-storage-class': 'Standard',
      'x-oss-object-acl': 'private',
      'x-oss-forbid-overwrite': 'false',
    };
    return this.client.put(filePath, Buffer.from(fileContent), {
      headers
    });
  }
  
  getFileContent = async (filePath: string) => {
    return this.client.get(filePath);
  }

  isExistObject = async (filePath: string, options = {}) => {
    try {
        await this.client.head(filePath, options);
        return true;
     }  catch (error) {
        return false;
     }
  }
}