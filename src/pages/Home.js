import React from 'react';
import Layout from '../components/Layout';
import styles from './About.module.css';
import { Link } from 'react-router-dom';

const AboutView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
        <h2>Már nem a miénk: eltették a közvagyont</h2>
        <p>Sokak figyelmét elkerülhette, hogy <b>a járvány leple alatt ezer milliárd forint értékű állami vagyon került át ingyenesen a kormánypárthoz kötődő alapítványokhoz</b>. A kuratóriumok élére többek közt olyan személyek kerültek, mint <a href="https://adatbazis.k-monitor.hu/adatbazis/cimkek/csanyi-sandor" target="new">Csányi Sándor</a>, <a href="https://adatbazis.k-monitor.hu/adatbazis/cimkek/lazar-janos" target="new">Lázár János</a>, <a href="https://adatbazis.k-monitor.hu/adatbazis/cimkek/varga-judit" target="new">Varga Judit</a>, <a href="https://adatbazis.k-monitor.hu/adatbazis/cimkek/demeter-szilard" target="new">Demeter Szilárd</a>, <a href="https://adatbazis.k-monitor.hu/adatbazis/cimkek/varga-mihaly" target="new">Varga Mihály</a> vagy <a href="https://adatbazis.k-monitor.hu/adatbazis/cimkek/orban-balazs" target="new">Orbán Balázs</a>. Egyetemek, földek, kastélyok, üdülők, kollégiumok, sportpályák, irodaházak váltak köztulajdonból egy magánjogi szereplő tulajdonává a Parlament kétharmados döntései nyomán.</p>
        <p>Az alapítványok vezetőit a jelenlegi kormány nevezte ki, de a kurátorokat egy későbbi kormány már nem tudja leváltani. A puccsszerű vagyonkiszervezés valódi célja nem a kulturális-oktatási javak hatékonyabb kezelése, az intézmények függetlensége és stabilitása volt, hanem a jelenlegi politikai elit bebetonozása egy esetleges választási vereség esetére.</p>
        <p>Interaktív térképen mutatjuk be az alapítványi tulajdonba került ingatlanvagyont.</p>
        <p><i>Az oldal publikálására 2022. márciusban került sor. Az itt szereplő információk idővel elavulhatnak. </i></p>
        <br />
        <Link to="/terkep" className={styles.link}>Tovább a térképhez</Link>
        <br />
      </div>
    </Layout>
  );
};

export default AboutView;
