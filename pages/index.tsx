import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Button from '@material-ui/core/Button';
import Table from '../components/table';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BB Prop</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <Table />
    </div>
  );
}
