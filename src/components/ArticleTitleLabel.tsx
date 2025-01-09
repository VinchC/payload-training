'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { Article } from '@/payload-types'

const ArticleTitleLabel: React.FC = () => {
  const articleID = useFormFields(([fields]) => fields?.article?.value)
  const [article, setArticle] = React.useState<Article>()

  React.useEffect(() => {
    if (article?.id !== articleID) {
      const fetchArticle = async () => {
        try {
          const articleResult: Article = await fetch(`/api/articles/${articleID}?depth=0`).then(
            (res) => res.json(),
          )

          if (articleResult) {
            setArticle(articleResult)
          }
        } catch (e) {
          console.error(e)
        }
      }
      fetchArticle()
    }
  }, [article, articleID])

  if (articleID && typeof article === 'undefined') {
    return <span>Loading...</span>
  }

  if (!articleID || !article) {
    return <span>No article selected</span>
  }

  return <span>{article.title}</span>
}

export default ArticleTitleLabel
