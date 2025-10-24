import HomePage from "@/components/template/HomePage";
import api from "@/lib/api/config";

async function getInitialTours() {
  try {
    const response = await api.get(`/tour`);
    return response.data;
  } catch (error) {
    console.error("خطا در گرفتن داده‌های اولیه:", error);
    return [];
  }
}

export const revalidate = 900;

export default async function Home() {
  const initialTours = await getInitialTours();

  return (
    <>
      <HomePage initialTours={initialTours} />
    </>
  );
}
