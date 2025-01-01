import React from "react";
import Hero from "../components/home/hero/Hero";
import Items from "../components/home/items/Items";
import News from "../components/home/news/News"
export default function Home() {
  return (
    <main>
      <Hero />
      <Items />
      <News/>
    </main>
  );
}
