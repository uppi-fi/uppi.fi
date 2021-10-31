import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

interface EncryptResult {
  iv: string;
  encryptedData: string;
}

interface SeedFile {
  iv: {
    type: 'Buffer';
    data: number[];
  };
  key: {
    type: 'Buffer';
    data: number[];
  };
}

const SEED_FILE = path.resolve(__dirname, '../../../.crypto_seed');
const ALGORITHM = 'aes-256-cbc';

/** Writes new seed file with random bytes */
function writeNewSeedFile() {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const content = JSON.stringify({
    key,
    iv,
  });
  fs.writeFileSync(SEED_FILE, content);
  console.log(`Saved new encryption seed file to "${SEED_FILE}""`);
  return { key, iv };
}

function getSeed() {
  if (!fs.existsSync(SEED_FILE)) {
    return writeNewSeedFile();
  }

  // Read existing seed file
  const text = fs.readFileSync(SEED_FILE, 'utf8');

  try {
    const { iv, key }: SeedFile = JSON.parse(text);

    return {
      iv: Buffer.from(iv.data),
      key: Buffer.from(key.data),
    };
  } catch (e) {
    console.log(e);
    return writeNewSeedFile();
  }
}

export function encrypt(text: string): EncryptResult {
  const { key, iv } = getSeed();
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export function decrypt(encrypted: EncryptResult) {
  const { key } = getSeed();
  const iv = Buffer.from(encrypted.iv, 'hex');
  const encryptedText = Buffer.from(encrypted.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  try {
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch {
    return; // Decryption failed
  }
}
