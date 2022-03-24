import React from 'react';
import Layout from './Layout';
import styles from '../css/about.module.css';

const AboutView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
      </div>
    </Layout>
  );
};

export default AboutView;
