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
        hideLabel={false}
        label="Label"
        description="description"
        autoFocus={false}
        name="name"
        disabled={false}
        placeholder="place holder"
        rightIcon={<FileSearch />}
        value={state}
        uppercase={false}
        error="error"
        onChange={event => setState(event.target.value)}
      />
    </div>
  );
}
