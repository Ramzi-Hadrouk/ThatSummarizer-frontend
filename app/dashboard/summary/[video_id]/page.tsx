export default async function Page({params,}: {params: Promise<{ video_id: string }>}) {
  const { video_id } = await params
  return <div>My video: {video_id}</div>
}