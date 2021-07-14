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
];

function readSeedFile(name: string) {
  // Super dirty, yes. But works just fine enough for our simple dev workflow.
  // No need for anything fancier.
  return readFileSync(join(__dirname, `../../../assets/seed/${name}`))
}
