/*
 * @Author: Pan Jingyi
 * @Date: 2022-11-02 22:08:23
 * @LastEditTime: 2022-11-02 22:30:38
 */
export type Article = {
  title: string
  href: string
  des: string
}

export type ArticleInfo = {
  article_list: Article[]
}
