import Image from "next/image";
import Hero from "../components/Hero";
import About from "../components/About";
import Project from "../components/Project";
import Contact from "../components/Contact";


export default function Home() {
    return (
 <>
 <main className="max-w-7xl mx-auto px-6 lg:px-8">

<Hero />
 <About />
 <Project />
 <Contact />


 </main>

 </>
    )
}
