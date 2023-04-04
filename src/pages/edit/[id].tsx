import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { Button, Flex, Heading, Input, Text, Textarea } from '@chakra-ui/react'
import Layout from '@/components/Layout';
import Swal from 'sweetalert2';

export default function Edit({ post }: { post: any }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        console.log("this is data", data);
        console.log("this is register before being submitted", data);
        try {
            await axios
                .patch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, data)
                .then((res) => {
                    console.log(res)
                    console.log(res.data);
                    console.log("after update", res.data);
                });
            Swal.fire(
                {
                    icon: 'success',
                    title: 'Your post has been updated',
                    showConfirmButton: false,
                    timer: 1000
                })
        }
        catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                timer: 1000
            })
        }
    };

    return (
        <Layout title='Edit Post | Rakha'>
            <Flex minH='100vh' alignItems='center' justifyContent='center'>
                <Flex justifyContent='center' p={4} rounded='xl' boxShadow={'xl'} flexDirection={'column'}>
                    <Heading textAlign='center'>
                        Edit Post
                    </Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex w={500} flexDirection='column' rowGap={5}>
                            <FormControl >
                                <FormLabel htmlFor='title'>Post title</FormLabel>
                                <Input id='title' type="text" placeholder="title" {...register("title")} value={post.title} />
                                <FormHelperText>Make engaging post title!</FormHelperText>
                                {errors.title && <Text p={2} rounded={'lg'} mt={2} background='red.300'>Title is required!</Text>}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='body'>Post body</FormLabel>
                                <Textarea id='body' {...register("body")} value={post.body} />
                                <FormHelperText>Write meaningful post content!</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='userId'>Post body</FormLabel>
                                <Input type="number" placeholder="User Id" {...register("userId", { min: 0, maxLength: 2 })} defaultValue={post.userId} />

                            </FormControl>
                            <Button type='submit'>Submit</Button>
                        </Flex>
                    </form>
                </Flex>
            </Flex>
        </Layout>

    )
}
export async function getStaticPaths() {
    // generate all possible paths for this dynamic route
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.data
    const paths = posts.map((post: { id: { toString: () => any; }; }) => ({ params: { id: post.id.toString() } }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: any }) {
    // fetch the post by id and pass it as props to the component
    const { id } = params
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = res.data
    return { props: { post } }
}