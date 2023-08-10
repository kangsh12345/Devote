import { useState } from 'react';
import { FileSearch } from '@phosphor-icons/react';

import { Input } from '../Input';
import * as styles from './test.css';

export function Test() {
  const [state, setState] = useState('');

  return (
    <div>
      <div className={styles.variants({ color: 'brand' })}>example</div>
      <Input
        label="Label"
        hideLabel
        placeholder="Placeholder"
        leftIcon={<FileSearch />}
        value={state}
        error="error"
        size="lg"
        variant="filled"
        onChange={event => setState(event.target.value)}
      />
    </div>
  );
}
