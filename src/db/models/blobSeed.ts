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
    data: readSeedFile('post00.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001001',
    data: readSeedFile('post01.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001002',
    data: readSeedFile('post02.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001003',
    data: readSeedFile('post03.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001004',
    data: readSeedFile('post04.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001005',
    data: readSeedFile('post05.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001006',
    data: readSeedFile('post06.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001007',
    data: readSeedFile('post07.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001008',
    data: readSeedFile('post08.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001009',
    data: readSeedFile('post09.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001010',
    data: readSeedFile('post10.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001011',
    data: readSeedFile('post11.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001012',
    data: readSeedFile('post12.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001013',
    data: readSeedFile('post13.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001014',
    data: readSeedFile('post14.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001015',
    data: readSeedFile('post15.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001016',
    data: readSeedFile('post16.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001017',
    data: readSeedFile('post17.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001018',
    data: readSeedFile('post18.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001019',
    data: readSeedFile('post19.jpg'),
  },
  {
    id: '10000000-0000-1000-8000-000000001020',
    data: readSeedFile('post20.jpg'),
  },
];

function readSeedFile(name: string) {
  // Super dirty, yes. But works just fine enough for our simple dev workflow.
  // No need for anything fancier.
  return readFileSync(join(__dirname, `../../../assets/seed/${name}`));
}
