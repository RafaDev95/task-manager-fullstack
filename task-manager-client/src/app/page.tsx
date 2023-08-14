import { HeroSection } from '@/components'

import { getTasks } from './api/tasks'

type Props = {
  searchParams: { page: string }
}

const page = async ({ searchParams }: Props) => {
  const pageNumber = Number(searchParams.page)
  const tasksData = await getTasks(pageNumber)

  return <HeroSection tasksData={tasksData} />
}
export default page
