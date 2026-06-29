import Landing from "@/views/Landing";

export default function RootPage() {

  console.log('API URL: ', process.env.NEXT_PUBLIC_API_URL)
  return <Landing />;
}
