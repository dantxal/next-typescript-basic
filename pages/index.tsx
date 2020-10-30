import { GetStaticProps } from "next";
import Link from 'next/link'

export default function Home({org, members}) {
  return (
    <div>
      <h1>{org.login}</h1>
      <h3>{org.description}</h3>

      <p>Site: <a href={org.blog}>rocketseat</a></p>

      <h3>Members</h3>

      {members && members.map(member => (
        <div key={member.login}>
          <Link href={`/members/${member.login}`} >{member.login}</Link>
        </div>
      ))}

    </div>
    )
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://api.github.com/orgs/rocketseat')
  const data = await response.json()

  const membersResponse = await fetch('https://api.github.com/orgs/rocketseat/members') 
  const members = await membersResponse.json()
  
  return {
    props: {
      org: data,
      members
    },
  }
};