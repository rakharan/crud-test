import React from 'react'
import Navbar from './Navbar'
import Head from 'next/head'

export default function Layout({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}
