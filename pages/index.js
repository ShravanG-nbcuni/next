import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Menu} from '../components/menu'
import { useRouter } from 'next/router';

export const Home = ({ articles }) => {
  const router = useRouter();
  return (
    <div className="page-contaner">
      <Head>
        <title>Home | NBCUniversal</title>
        <meta name="description" content="NBCUniversal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <Menu />
      <div className={styles.main}>
		  {articles.map((article, index) => (
			<div key={index} className={styles.post}>
				<h1 onClick={() => router.push(article.view_node)}>{article.title}</h1>
				<div>{article.field_date}</div>
				<div dangerouslySetInnerHTML={{ __html: article.field_description }} />
			</div>
		  ))}
	  </div>

    </div>
  );
};
export async function getStaticProps(context) {
  const apiResponse = await fetch('https://vac73lz5s4.execute-api.us-west-2.amazonaws.com/NBCUni-Stage', );
  const apiJson = await apiResponse.json();
  return {
	  props: {
		  articles: apiJson
	  }
  }
};

export default Home;
