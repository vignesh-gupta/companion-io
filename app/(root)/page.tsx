import Categories from '@/components/Categories';
import SearchInput from '@/components/SearchInput'
import prisma from '@/lib/prisma'

export default async function Home() {

  const categories = await prisma.category.findMany();

 return(
  <main className='h-full p-4 space-y-2'>
    <SearchInput />
    <Categories categories={categories} />
  </main>
 )
}
