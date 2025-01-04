'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import messages from "@/messages.json"

const Home = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
    <section className="text-center mb-8 md:mb-12">
      <h1 className="text-2xl md:text-5xl font-bold">
        Dive into the world of anonymous conversations
      </h1>
      <p>Explore Mystery Message</p>
    </section>
    {/* Carousel with responsive layout */}
    <Carousel>
      <div className="flex flex-wrap justify-center">
        {messages.map((message, index) => (
          <div
            key={index}
            className="w-1/2 md:w-1/3 p-1"
            style={{ maxWidth: "300px" }}
          >
            <Card>
              <CardHeader>{message.Title}</CardHeader>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-2xl font-semibold">
                  {message.Content}
                </span>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Carousel>
  </main>
);
};
export default Home