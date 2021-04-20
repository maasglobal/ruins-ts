

import sys; sys.stdout.write(('/*' + '\n' + '/*'.join(
  '*/'.join(sys.stdin.read().split('```typescript')).split('```')
) + '*/').replace("from 'ruins-ts'", "from './ruins'"))
