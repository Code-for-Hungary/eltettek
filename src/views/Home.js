import React from 'react';
import Layout from './Layout';
import styles from '../css/about.module.css';
import { Link } from 'react-router-dom';

const AboutView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
        <h2>Nem kérték, nem indokolták, csak eltették.</h>
        <p><b>Interaktív térképen mutatjuk be a választási vereség fenyegetésének hatására perverz privatizációs hullám eredményét</b>: a 2021. évi IX. törvényben létrehozott közfeladatot ellátó közérdekű vagyonkezelő alapítványoknak juttatott ingatlanvagyont. A sorra létrehozott alapítványok (“KEKVÁ-k”) magánjogi szereplőként névleg a mindenkori kormánytól függetlenül látnak el kulturális-oktatási közfeladatokat, ehhez pedig pénzbeli vagyonjuttatást, részvénycsomagot és összesen sok ezer milliárd forint értékű ingatlanvagyont is kaptak ingyenesen a magyar államtól.</p>
        <p>Ez a folyamat azért problémás, mert <b>az átszervezés indokaként megnevezett függetlenség és hosszú távú stabilitás a valóságban politikai bebetonozást takar</b>. Az alapítványok kuratóriumába tucatszám ültetett be az alapító magyar állam kormánytagokat és képviselőket, akik innentől a mindenkori kormányok számára leválthatatlanul irányítják a rájuk bízott intézményeket és gazdálkodnak a kapott vagyonnal. Ez jól fizető pozíciók mellett, de politikai ellensúlyszerepet is jelent, hiszen a megkerülhetetlen egyetemfenntartó kuratóriumokkal egy más színű kormánynak is együtt kell működnie. Figyelemre méltó az is, hogy a KEKVÁ-k tisztségviselői esetében gyakorlatilag semmilyen összeférhetetlenségi szabály nem érvényesül, ezzel pedig sérül hatalommegosztás Alaptörvényben rögzített elve. Amióta a gyakorlatban is működnek az alapítványok, a bennük vezető pozíciót betöltő képviselők dokumentáltan megszavazták az állami támogatást a saját alapítványaiknak.</p>
        <p>A következőkben térképen mutatjuk meg a vagyonkezelő alapítványoknak kijátszott ingatlanvagyont.</p>
        <p><br />
          <Link to="/map">Tovább a térképhez!</Link>
      </div>
    </Layout>
  );
};

export default AboutView;
