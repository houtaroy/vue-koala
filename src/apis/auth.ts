import { Permission } from '@/types';

export const permissions = (): Promise<Permission[]> => {
  return new Promise((resolve, reject) => {
    resolve([
      {
        code: 'test',
      },
    ]);
  });
};
