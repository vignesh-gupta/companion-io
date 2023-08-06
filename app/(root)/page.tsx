import Categories from "@/components/Categories";
import Companions from "@/components/Companions";
import SearchInput from "@/components/SearchInput";
import prisma from "@/lib/prisma";

type HomeProps = {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {

  const data = await prisma.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {messages: true}
      }
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <main className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories categories={categories} />
      <Companions companions={data} />
    </main>
  );
}
