import { GraphQLClient, gql } from "graphql-request"
import { NextRequest, NextResponse } from "next/server"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

const graphcmsToken = process.env.GRAPHCMS_TOKEN

export const POST = async (request : NextRequest) => {
  console.log('route hit')
  const { name, email, slug, comment} = await request.json()
  console.log('name', name)
  console.log('email', email)
  console.log('slug', slug)
  console.log('comment', comment)
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers:{
      authorization: `Bearer ${graphcmsToken}`
    }
  })

  const query = gql`
  mutation CreatedComment($name: String!, $email: String!, $comment: String!, $slug: String!){
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {id}

  }
  `

  try {
    const result = await graphQLClient.request(query, {name, email, comment, slug});
    if (!result.data) {
      return NextResponse.json({ status: 500, message: 'Failed to create comment' });
    }

    return NextResponse.json({ status: 200, data: result.data });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ status: 500, message: 'Failed to create comment' });
  }
}