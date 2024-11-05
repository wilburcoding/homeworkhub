import type { NextApiRequest, NextApiResponse } from 'next'
import { HfInference } from "@huggingface/inference";
require('dotenv').config()

type ResponseData = {
  message: string
}
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
  return Response.json({ message: 'Hello from Next.js!' })

}

export async function POST(request: Request) {

  const inference = new HfInference(process.env.API_KEY);

  let re: string = "";
  const json: any = await request.json();
  let ns: string = "";
  for (const item of json.data) {
    ns += item.name + ": this is due on  " + item.due + ",";
  }
  console.log("Person X only has the following assignments;" + ns + ". What assignment should Person X prioritize using reasoning based on both due date and difficulty as the main factors? Output only a list of the exact given assignment names based on priority in the format and no additional text using only assingments that the Person X has. Results should be comma separated with only strings for assignment names and only assignment names with the highest priority in the beginning and the lowest priority in the end.")
  for await (const chunk of inference.chatCompletionStream({
    model: "meta-llama/Llama-3.2-1B-Instruct",
    messages: [{ role: "user", content: "Person X only has the following assignments;" + ns + ". What assignment should Person X prioritize using reasoning based on both due date and difficulty as the main factors? Output only a list of the exact given assignment names based on priority in the format and no additional text using only assingments that the Person X has. Results should be comma separated with only strings for assignment names and only assignment names with the highest priority in the beginning and the lowest priority in the end." }],
    max_tokens: 500,
    temperature: 0.1
  })) {
    re += String(chunk.choices[0]?.delta?.content || "");
  }
  let lis: string[] = re.split(",");


  return Response.json({ response: lis.map(st => st.trim()) })

}
