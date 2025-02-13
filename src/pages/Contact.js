import React from 'react';
import Layout from '../components/Layout';
import styles from './About.module.css';

const ContactView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
        <section>
          <h1>K-Monitor</h1>
          <p>A K-Monitor Iroda 2007 óta küzd a közpénzek átlátható felhasználásáért és a korrupció visszaszorításáért.
            Civil szervezetünk olyan politikai, gazdasági és társadalmi környezetet megteremtéséért dolgozik, ahol
            az állampolgárok elutasítják, a hatóságok pedig hatékonyan feltárják és szankcionálják a korrupciót.</p>
        </section>
        <section>
          <h2>Elérhetőség</h2>
          <p><strong>K-Monitor Közhasznú Egyesület</strong></p>
          <p>Levelezési cím: 1062 Budapest, Bajza u. 23.</p>
          <p><a href="mailto:info@k-monitor.hu">info@k-monitor.hu</a></p>
          <p><a href="https://k-monitor.hu" target="new">k-monitor.hu</a></p>
        </section>
      </div>
    </Layout>
  );
}

export default ContactView;
