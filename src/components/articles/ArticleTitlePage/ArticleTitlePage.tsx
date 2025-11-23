import './ArticleTitlePage.css'

import DefaultIconImage from '../../../assets/images/icons/icone-question-violet.png'

interface ArticleTitlePageProps {
    img: string;
    alt: string;
    name: string;
    description: string;
}

export default function ArticleTitlePage({ img = DefaultIconImage, alt, name, description }: ArticleTitlePageProps) {
  return (
    <article id='page-header'>
        <article id='article-page-img'>
            <img src={img} alt={alt} id='page-img'/>
        </article>
        <div id='div-page-header'>
          <h2 id='nome-page'>{name}</h2>
          <h3 id='description-page'>{description}</h3>
        </div>
      </article>
  );
}