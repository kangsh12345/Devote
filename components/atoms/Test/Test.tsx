import * as styles from './test.css';

export default function Test() {
  return (
    <div>
      <div className={styles.variants({ color: 'brand' })}>example</div>
    </div>
  );
}
