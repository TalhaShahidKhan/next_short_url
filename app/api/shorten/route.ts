// pages/api/your-api-route.ts
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {

 try {
  const data = await request.json()
  const client = await connectToDatabase()
  const db = await client.db("picolinks")
  const collection = await db.collection("links")
  console.log(await data.alias)
  const alias = await collection.findOne({alias:data.alias})
  if (alias){
    return NextResponse.json({success:false,Error:"This alias name already exist"},{status:402})
  }
  await collection.insertOne(data)
  return NextResponse.json({success:true,result:data},{status:200})
 } catch (error) {
  return NextResponse.json({success:false,Error:error},{status:402})
  
 }
  


}
