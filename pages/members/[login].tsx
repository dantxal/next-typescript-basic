import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from 'next/router'

export default function Member({user}) {
  const {isFallback} = useRouter()

  if (isFallback) {
    return <div>Carregando...</div>
  }

  console.log(user)
  return (
    <div>
      <img src={user.avatar_url} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch(`https://api.github.com/orgs/rocketseat/members?per_page=2`)
  const data = await response.json()

  const members = data.map((member:any) => ({ params: { login: member.login }}))


  return {
    paths: [
      ...members
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {login} = context.params;

  const response = await fetch(`https://api.github.com/users/${login}`)
  const data = await response.json()
console.log(response)
  return {
    props: {
      user: data,
    },
    revalidate: 600
  } 
}