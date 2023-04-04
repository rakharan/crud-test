import { Alert, AlertIcon, Box, Button, Flex, Heading, Input, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import axios from "axios"
import Layout from '@/components/Layout';
import Swal from 'sweetalert2';

export default function Create() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {
        console.log("this is data", data)
        console.log("this is register before being submitted", data)
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data)
                .then((res) => {
                    console.log("create res", res)
                    console.log(res.data)
                    Swal.fire(
                        {
                            icon: 'success',
                            title: 'New post has been added',
                            showConfirmButton: false,
                            timer: 1000
                        }
                    )
                })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                timer: 1000
            })
        }

    };
    console.log("empty input", errors);
    return (
        <Layout title='Create New Post | Rakha'>
            <Flex minH='100vh' alignItems='center' justifyContent='center'>
                <Flex justifyContent='center' p={4} rounded='xl' boxShadow={'xl'} flexDirection={'column'}>
                    <Heading textAlign='center'>
                        New Post
                    </Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex w={500} flexDirection='column' rowGap={5}>
                            <FormControl >
                                <FormLabel htmlFor='title'>Post title</FormLabel>
                                <Input id='title' type="text" placeholder="title" {...register("title", { required: true })} />
                                <FormHelperText>Make engaging post title!</FormHelperText>
                                {errors.title && <Text p={2} rounded={'lg'} mt={2} background='red.300'>Title is required!</Text>}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='body'>Post body</FormLabel>
                                <Textarea id='body' {...register("body", { required: true })} />
                                <FormHelperText>Write meaningful post content!</FormHelperText>
                                {errors.body && <Text p={2} rounded={'lg'} mt={2} background='red.300'>Bodyis required!</Text>}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='userId'>User Id</FormLabel>
                                <Input type="number" placeholder="User Id" {...register("userId", { required: true, min: 0, maxLength: 2 })} />
                                {errors.userId && <Text p={2} rounded={'lg'} mt={2} background='red.300'>User Id is required!</Text>}
                            </FormControl>
                            <Button type='submit'>Submit</Button>
                        </Flex>

                    </form>
                </Flex>
            </Flex>
        </Layout>

    )
}
