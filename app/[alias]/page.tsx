import React from 'react'
import { connectToDatabase } from '@/lib/mongodb';
import { redirect } from 'next/navigation';

export default async function Page({params}: {params: Promise<{ alias: string }>}) {
  const alias = (await params).alias
  const client = await connectToDatabase()
  const db = await client.db("picolinks")
  const collection = await db.collection("links")

  const doc = await collection.findOne({alias:alias})
  if (doc){
    redirect(doc.url)
  }
  else{
    redirect(process.env.NEXT_PUBLIC_URL as string)
  }
}
