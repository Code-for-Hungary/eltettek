import React from 'react';
import Layout from '../components/Layout';
import styles from './DataExport.module.css';
import {config} from '../config.js';

const DataExportView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles['data-export']}>
        <section>
          <h1>Adat export</h1>
          <p>A transzparencia jegyében és az adatok könnyű elemezhetőségéért itt van a NER Hotel teljes adatbázisa CSV formátumban.</p>
          <p><a href={config.csvDownloadUrl}>Letöltés</a></p>
        </section>
      </div>
    </Layout>
  );
};

export default DataExportView;

