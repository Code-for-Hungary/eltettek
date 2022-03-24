import React from 'react';
import Layout from './Layout';
import styles from '../css/about.module.css';
import { Link } from 'react-router-dom';

const AboutView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
          ez itt kb. két bekezdésnyi szöveg arról, hogy mi az a kekva és miért készült ez az oldal
          <br />
          <Link to="/map">Tovább a térképhez</Link>
      </div>
    </Layout>
  );
};

export default AboutView;
