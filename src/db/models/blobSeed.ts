import { readFileSync } from 'fs';
import { join } from 'path';
import { Blob } from './blob';

export const blobSeed: Array<Blob> = [
  {
    id: '10000000-0000-1000-8000-000000000000',
    data: readSeedFile('manu.png'),
  },
  {
    id: '10000000-0000-1000-8000-000000000001',
    data: readSeedFile('nhu.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000000002',
    data: readSeedFile('jonas.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000000003',
    data: readSeedFile('khang.png'),
  },
  {
    id: '10000000-0000-1000-8000-000000000004',
    data: readSeedFile('sTUMatch_logo.png'),
  },
  {
    id: '10000000-0000-1000-8000-000000000555',
    data: readSeedFile('bmw.png'),
  },
  {
    id: '10000000-0000-1000-8000-000000000556',
    data: readSeedFile('mercedes.png'),
  },
  {
    id: '10000000-0000-1000-8000-000000000557',
    data: readSeedFile('googleLens.png'),
  },
  {
    id: '10000000-0000-1000-8000-000000001000',
    data: readSeedFile('test.jpg'),
  },
];

function readSeedFile(name: string) {
  // Super dirty, yes. But works just fine enough for our simple dev workflow.
  // No need for anything fancier.
  return readFileSync(join(__dirname, `../../../assets/seed/${name}`));
}
