import React from 'react'
import getWiki from '@/lib/getWiki'
// import type { Metadata } from 'next'
import Item from './components/Item'

type Props = {
  params : {
    searchTerm : string
  }
}

export async function generateMetadata ({params: {searchTerm}}:Props) {
  const wikiData : Promise<SearchResult> = getWiki(searchTerm)
  const data = await wikiData

  const display = searchTerm.replaceAll('%20', ' ')

  if(!data?.query?.pages){
    return {
      title : `${display} Not Found`
    }
  }

  return {
    title : display,
    description : `Search Results for ${display}`
  }

}

export default async function page({params : {searchTerm}}: Props) {
  const wikiData : Promise<SearchResult> = getWiki(searchTerm)
  const data = await wikiData
  const results : Result[] | undefined = data?.query?.pages

  const content = (
    <main className='bg-slate-200 mx-auto max-w-lg py-1 min-h-screen'>
      {
        results ?
        Object.values(results).map(result => {
          return (
          <>
          <Item result={result} key={result.pageid}/>
          <br/>
          </>
          )
        })
        :
        <h2 className='p-2 text-xl'>{`${searchTerm} Not Found`}</h2>
      } 

    </main>
  )
  return content
}
