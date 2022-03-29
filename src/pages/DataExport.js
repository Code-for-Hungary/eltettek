import React from 'react';
import Layout from '../components/Layout';
import styles from './About.module.css';
import {config} from '../config.js';

const DataExportView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
        <section>
          <h1>Adat export</h1>
          <p>Az adatok könnyű elemezhetőségéért innen elérhető a térképen szereplő helyek teljes adatbázisa CSV formátumban.</p>
          <p><a href={config.csvDownloadUrl}>Letöltés</a></p>
        </section>
      </div>
    </Layout>
  );
};

export default DataExportView;

