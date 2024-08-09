import * as _ from 'lodash'; // lodash để làm việc với mảng và object
import * as FileSystem from 'expo-file-system'; // FileSystem để quản lý file
import SHA1 from 'crypto-js/sha1'; // SHA1 để mã hóa chuỗi thành mã SHA1. Còn đéo biết SHA1 là gì thì search google

const BASE_DIR = `${FileSystem.cacheDirectory}expo-cache/`; // Đường dẫn thư mục cache

// Class CacheEntry để quản lý cache
export class CacheEntry {
  // Constructor nhận vào uri và options để tạo ra một entry mới trong cache manager
  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
  };

  // Hàm này để lấy đường dẫn của file trong cache
  async getPath() {
    // Lấy uri và options từ constructor
    const { uri, options } = this;
    // Tạo biến path, exists, tmpPath để lấy thông tin file trong cache
    const { path, exists, tmpPath } = await getCacheEntry(uri);
    if (exists) {
      return path;
    };
    // Nếu file không tồn tại, tải file từ uri và lưu vào cache
    const result = await FileSystem.createDownloadResumable(
      uri,
      tmpPath,
      options,
    ).downloadAsync();
    // If the image download failed, we don't cache anything
    if (result && result.status !== 200) {
      return undefined;
    }
    // Nếu tải file thành công, di chuyển file từ thư mục tạm sang thư mục cache
    await FileSystem.moveAsync({ from: tmpPath, to: path })
    return path;
  };
};

// Class CacheManager để quản lý các entry trong cache
// entry là một file trong cache được quản lý bởi CacheEntry
export default class CacheManager {
  // sử dụng static để có thể truy cập vào entries mà không cần tạo instance của CacheManager
  static entries = {};

  // Hàm get nhận vào uri và options để tạo ra một entry mới trong cache
  static get(uri, options) {
    if (!CacheManager.entries[uri]) {
      CacheManager.entries[uri] = new CacheEntry(uri, options);
    }
    return CacheManager.entries[uri];
  }

  // Hàm clearCache để xóa toàn bộ cache
  static async clearCache() {
    await FileSystem.deleteAsync(BASE_DIR, { idempotent: true });
    await FileSystem.makeDirectoryAsync(BASE_DIR);
  }

  // Hàm getCacheSize để lấy kích thước của cache
  static async getCacheSize() {
    const result = await FileSystem.getInfoAsync(BASE_DIR);
    if (!result.exists) {
      throw new Error(`${BASE_DIR} not found`);
    }
    return result.size;
  }
}

// Hàm getCacheEntry nhận vào uri để lấy thông tin file trong cache
const getCacheEntry = async uri => {
  // Lấy tên file từ uri
  // Ví dụ: uri = 'https://example.com/image.jpg?size=large'
  // filename = '/image.jpg'
  const filename = uri.substring(
    uri.lastIndexOf('/'),
    uri.indexOf('?') === -1 ? uri.length : uri.indexOf('?'),
  );
  // ext = '.jpg'
  const ext =
    filename.indexOf('.') === -1
      ? '.jpg'
      : filename.substring(filename.lastIndexOf('.'));

  const path = `${BASE_DIR}${SHA1(uri)}${ext}`;
  // path = '/expo-cache/SHA1(image.jpg)?size=large'
  const tmpPath = `${BASE_DIR}${SHA1(uri)}-${_.uniqueId()}${ext}`;
  // _.uniqueId() để tạo một id duy nhất
  // tmpPath = '/expo-cache/SHA1(image.jpg)-1?size=large'
  // SHA1(uri) để mã hóa uri thành mã SHA1
  // TODO: maybe we don't have to do this every time
  try {
    await FileSystem.makeDirectoryAsync(BASE_DIR);
  } catch (e) {
    // do nothing
  }
  const info = await FileSystem.getInfoAsync(path);
  // FileSystem.getInfoAsync(path) để lấy thông tin file trong cache
  const { exists } = info;
  return { exists, path, tmpPath };
}

export const loadCachedItem = async ({ uri, options = {} }) => {
  if (uri) {
    try {
      const path = await CacheManager.get(uri, options).getPath();

      if (path) {
        return path;
      } else {
        return uri;
      }
    } catch (error) {
      return uri;
    };
  };
};
