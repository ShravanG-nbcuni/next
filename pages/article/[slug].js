import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import {Menu} from '../../components/menu'
import { useRouter } from 'next/router';


export const Article = ({ article }) => {
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
		  <div className={styles.post}>
			<h1>{article.title}</h1>
			<div>{article.field_date}</div>
			<div dangerouslySetInnerHTML={{ __html: article.field_description }} />
		</div>
	  </div>

    </div>
  );
};


export async function getStaticPaths() {
  const apiResponse = await fetch('https://vac73lz5s4.execute-api.us-west-2.amazonaws.com/NBCUni-Stage')
  const apiJson = await apiResponse.json()

  // Get the paths we want to pre-render based on posts
  const paths = apiJson.map((article) => ({
    params: { slug: article.view_node },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const apiResponse = await fetch('https://vac73lz5s4.execute-api.us-west-2.amazonaws.com/NBCUni-Stage');
  const apiJson = await apiResponse.json();
  const article = apiJson.find(obj=> obj.view_node.indexOf(context.params.slug) >-1);
  return {
	  props: {
		  article: article
	  }
  }
};

export default Article;
