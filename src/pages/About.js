import React from 'react';
import Layout from '../components/Layout';
import styles from './About.module.css';

const AboutView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
          <section>
           <h2>Nem kérték, nem indokolták, csak eltették.</h2>
            <p>2022-ben a 2010 óta kétharmados többséggel kormányzó Fidesz-KDNP váratlan választási kihívással szembesült: az ellenzéki pártok összefogtak, hogy közösen induljanak ellene a választási rendszer sajátosságai miatt, így hosszú évek után először lett valós esélye annak, hogy Magyarország miniszterelnökét ne Orbán Viktornak hívják. </p>
            <p>A rezsim a fenyegetés hatására érdekes metamorfózison, egy perverz privatizációs hullámon ment keresztül. Miközben a 2010 utáni Orbán-kormányok visszaállamosításokkal, erőteljes központosításokkal az “erős állam” és a kormányzati hatalom maximalizálása mellett törtek pálcát, mint ami képes megoldani a társadalmi problémákat. 2020-ban azonban fordult a kocka, és a laikus szemlélő számára úgy tűnhetett: az állam és a kormány talán mégsem mindenható, nem biztos, hogy jó gazdája a közös vagyonunknak.</p>
            <p>A mindenkori kormánytól függetlenített intézmények, hatóságok sora jött létre, miközben magáncégek számára készítettek elő több évtizedes koncessziókat, tovább csökkentve a választott kabinetek mozgásterét. Az állami vagyon kiszervezésének központi eleme pedig a 2021. évi IX. törvény a közfeladatot ellátó közérdekű vagyonkezelő alapítványokról. A sorra létrehozott alapítványok (“KEKVÁ-k”) magánjogi szereplőként névleg a mindenkori kormánytól függetlenül látnak el kulturális-oktatási közfeladatokat, ehhez pedig pénzbeli vagyonjuttatást, részvénycsomagot és összesen sok ezer milliárd forint értékű ingatlanvagyont is kaptak ingyenesen a magyar államtól. A törvény ráadásul azt is előírja, hogy a mindenkori költségvetés tervezésekor előresorolt tényező kell legyen az alapítványok finanszírozása.</p>
            <p>Újonnan létrehozott alapítványokba szervezték ki szinte a teljes magyar felsőoktatást, és számos kulturális, szociális, műemlékvédelmi illetve mezőgazdasági közfeladatot ellátó állami vállalkozást. Ezen felül KEKVA-státuszt nyert két olyan nagyobb múltra visszatekintő alapítvány is, amely már korábban is kifejezetten a Fidesz szellemi holdudvarát és utánpótlását volt hivatott finanszírozni (Batthyány Alapítvány, Mathias Corvinus Collegium).</p>
            <p>Az átszervezés indokaként megnevezett függetlenség és hosszú távú stabilitás a valóságban politikai bebetonozást takar, felfedve a hirtelen jött kormányzati szemléletváltás valódi célját. Az alapítványok kuratóriumába tucatszám ültetett be az alapító magyar állami kormánytagokat és képviselőket, akik innentől a mindenkori kormányok számára leválthatatlanul irányítják a rájuk bízott intézményeket és gazdálkodnak jelentős szabadsággal a kapott vagyonnal. Ez nemcsak biztonságos, jól fizető pozíciókat jelent egy esetleges ellenzéki időszakra ezen kádereknek, de politikai ellensúlyszerepet is, hiszen a megkerülhetetlen egyetemfenntartó kuratóriumokkal (és a politikailag őket összekapcsoló Fidesszel) egy más színű kormánynak is együtt kell működnie. Figyelemre méltó az is, hogy a KEKVÁ-k tisztségviselői esetében gyakorlatilag semmilyen összeférhetetlenségi szabály nem érvényesül, ezzel pedig sérül hatalommegosztás Alaptörvényben rögzített elve. Amióta a gyakorlatban is működnek az alapítványok, a bennük vezető pozíciót betöltő képviselők dokumentáltan megszavazták az állami támogatást a saját alapítványaiknak. Az ellenzék az egyetemi autonómia súlyos megsértésének látja az intézkedést, amit egy esetleges győzelem esetén visszacsinálna - ehhez azonban kétharmados többséget kellene szereznie.</p>
            <p>Az <i>Eltették</i> oldalon térképen mutatjuk meg a vagyonkezelő alapítványoknak kijátszott ingatlanvagyont. Mivel az ingatlanok átadásáról a Parlament akkor döntött, amikor mindenki a járvánnyal volt elfoglalva, a magyar lakosság nagy része valószínűleg nem is tudja, hogy az, ami korábban a közös vagyonunk volt, ma már egy magánjogi szereplő által tulajdonolt épület, föld, kastély, múzeum. Azaz formálisan már nem a miénk. Az ingatlanokat a vagyonjuttatásról rendelkező jogszabályokból gyűjtöttük össze, helyrajzi szám alapján.</p>
          </section>
          <section>
           <h2>A témáról megjelent írásaink</h2>
           <ul>
            <li><a href="https://k.blog.hu/2021/07/17/kekva" target="new">Már nem a miénk: A NER-alapítványok vagyona</a> - <i>2021.07.17.</i></li>
            <li><a href="https://k.blog.hu/2021/11/15/osszeferhetetlen_kekva-arisztokratak" target="new">Összeférhetetlen KEKVA-arisztokraták?</a> - <i>2021.11.15.</i></li>
            <li><a href="https://k.blog.hu/2021/11/24/kekva_830" target="new">Mi történik az alapítványoknak kiszervezett közvagyonnal?</a> - <i>2021.11.24.</i></li>
            </ul>
          </section>
          <section>
           <h2>Az adatokról</h2>  
            <p>Az ingatlanok és a hozzájuk tartozó adatok elsődleges forrása a KEKVÁkat létrehozó törvények, amelyek mellékletei tartalmazzák az átadásra kerülő állami tulajdonú ingatlanok felsorolását. A legtöbb esetben helyrajziszámot tartalmazó felsorolást a <a href="https://mepar.mvh.allamkincstar.gov.hu/" target="new">MePAR</a> segítségével alakítottuk földrajzi koordinátákká. Az adatbázist kiegészítettük továbbá az alapítványok kuratóriumi tagságával. Az ingatlanok közértetőbbé tétele érdekében - ahol arra lehetőség volt - hétköznapi elnevezéssel, képpel illetve kapcsolódó sajtócikkekkel láttuk el.</p>
            <p>A térképen megjelenített teljes adatbázis <b>23 közérdekű vagyonkezelő alapítvány, több mint 1400 inaglanját tartalmazza</b>. * A felsőoktatási épületeken túl ezek között akad számos beépítetlen terület, gazdasági épület, de sok esetben nemzetgazdaságilag és társadalmilag értékes kutatóközpont, műemlék, lakóház, üdülő is.</p>
            <p>* <i>A mezőhegyesi ménesbirtokot működtető Jövő Nemzedék Földje Alapítvány 776, többségében mezőgazdasági művelés alatt álló ingatlanját mennyiségi korlátok miatt nem szerepeltetjük a térképen. Ezek mindegyike Mezőhegyes (Békés megye) területén fekszik.</i></p>
          </section>
          <section>
           <h2>Köszönet</h2>  
            <p>Az oldal fejlesztésében részt vevő <a href="http://code4.hu" target="new">Code for Hungary</a> önkénteseknek, <a href="http://feren.cz/" target="new">Ferencz Miklósnak</a> (grafika).</p>
            <p><a href="http://vercel.com/" target="new">Hosted on Vercel.</a></p>
          </section>
      </div>
    </Layout>
  );
};

export default AboutView;
