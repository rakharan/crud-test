import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import axios from 'axios'

export default function Details({ post }: { post: any }) {
    const { title, body, id, userId } = post

    return (
        <Box mt={10}>
            <Heading textAlign='center'>
                Post Detail
            </Heading>
            <Flex justifyContent='center' minH={'100vh'} alignItems={'center'} flexDirection='column' >
                <Flex flexDirection='column' textAlign='left'>
                    <Text>Post Id: {id}</Text>
                    <Text>User Id: {userId}</Text>
                </Flex>
                <Flex justifyContent="center" flexDirection='column' textAlign='center' w={640} rowGap={10}>
                    <Heading>{title}</Heading>
                    <Text>{body}</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export async function getStaticPaths() {
    // generate all possible paths for this dynamic route
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.data
    const paths = posts.map(post => ({ params: { id: post.id.toString() } }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    // fetch the post by id and pass it as props to the component
    const { id } = params
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = res.data
    return { props: { post } }
}
