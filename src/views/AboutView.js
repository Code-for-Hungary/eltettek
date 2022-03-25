import React from 'react';
import Layout from './Layout';
import styles from '../css/about.module.css';

const AboutView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
         <section>
          <h2>Nem kérték, nem indokolták, csak eltették.</h2>
          <p>2022-ben a 2010 óta kétharmados többséggel kormányzó Fidesz-KDNP váratlan választási kihívással szembesült: az ellenzéki pártok összefogtak, hogy közösen induljanak ellene a választási rendszer sajátosságai miatt, így hosszú évek után először lett valós esélye annak, hogy Magyarország miniszterelnökét ne Orbán Viktornak hívják. </p>
          <p>A rezsim a fenyegetés hatására érdekes metamorfózison, egy perverz privatizációs hullámon ment keresztül. Miközben a 2010 utáni Orbán-kormányok visszaállamosításokkal, erőteljes központosításokkal az “erős állam” és a kormányzati hatalom maximalizálása mellett törtek pálcát, mint ami képes megoldani a társadalmi problémákat. 2020-ban azonban fordult a kocka, és a laikus szemlélő számára úgy tűnhetett: az állam és a kormány talán mégsem mindenható, nem biztos, hogy jó gazdája a közös vagyonunknak.</p>
          <p>A mindenkori kormánytól függetlenített intézmények, hatóságok sora jött létre, miközben magáncégek számára készítettek elő több évtizedes koncessziókat, tovább csökkentve a választott kabinetek mozgásterét. Az állami vagyon kiszervezésének központi eleme pedig a 2021. évi IX. törvény a közfeladatot ellátó közérdekű vagyonkezelő alapítványokról. A sorra létrehozott alapítványok (“KEKVÁ-k”) magánjogi szereplőként névleg a mindenkori kormánytól függetlenül látnak el kulturális-oktatási közfeladatokat, ehhez pedig pénzbeli vagyonjuttatást, részvénycsomagot és összesen sok ezer milliárd forint értékű ingatlanvagyont is kaptak ingyenesen a magyar államtól. A törvény ráadásul azt is előírja, hogy a mindenkori költségvetés tervezésekor előresorolt tényező kell legyen az alapítványok finanszírozása.</p>
          <p>Az új alapítványok között van olyan, amely kifejezetten a Fidesz szellemi holdudvarát és utánpótlását hivatott finanszírozni (Batthyány Alapítvány, Mathias Corvinus Collegium), de alapítványi kiszervezésre került szinte a teljes magyar felsőoktatás is: csak a fővárosban maradtak állami egyetemek.</p>
          <p>Az átszervezés indokaként megnevezett függetlenség és hosszú távú stabilitás a valóságban politikai bebetonozást takar, felfedve a hirtelen jött kormányzati szemléletváltás valódi célját. Az alapítványok kuratóriumába tucatszám ültetett be az alapító magyar állami kormánytagokat és képviselőket, akik innentől a mindenkori kormányok számára leválthatatlanul irányítják a rájuk bízott intézményeket és gazdálkodnak jelentős szabadsággal a kapott vagyonnal. Ez nemcsak biztonságos, jól fizető pozíciókat jelent egy esetleges ellenzéki időszakra ezen kádereknek, de politikai ellensúlyszerepet is, hiszen a megkerülhetetlen egyetemfenntartó kuratóriumokkal (és a politikailag őket összekapcsoló Fidesszel) egy más színű kormánynak is együtt kell működnie. Figyelemre méltó az is, hogy a KEKVÁ-k tisztségviselői esetében gyakorlatilag semmilyen összeférhetetlenségi szabály nem érvényesül, ezzel pedig sérül hatalommegosztás Alaptörvényben rögzített elve. Amióta a gyakorlatban is működnek az alapítványok, a bennük vezető pozíciót betöltő képviselők dokumentáltan megszavazták az állami támogatást a saját alapítványaiknak. Az ellenzék az egyetemi autonómia súlyos megsértésének látja az intézkedést, amit egy esetleges győzelem esetén visszacsinálna - ehhez azonban kétharmados többséget kellene szereznie.</p>
          <p>Az <i>Eltették</i> oldalon térképen mutatjuk meg a vagyonkezelő alapítványoknak kijátszott ingatlanvagyont. Mivel az ingatlanok átadásáról a Parlament akkor döntött, amikor mindenki a járvánnyal volt elfoglalva, a magyar lakosság nagy része valószínűleg nem is tudja, hogy az, ami korábban a közös vagyonunk volt, ma már egy magánjogi szereplő által tulajdonolt épület, föld, kastély, múzeum. Azaz formálisan már nem a miénk. Az ingatlanokat a vagyonjuttatásról rendelkező jogszabályokból gyűjtöttük össze, helyrajzi szám alapján.</p>
          </section>
          <section>
          <h2>Az adatok számokban</h2>  
          <p></p>
          </section>
          <section>
          <h2>Köszönet</h2>  
          <p></p>
          </section>
      </div>
    </Layout>
  );
};

export default AboutView;
