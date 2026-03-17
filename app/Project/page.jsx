import Image from "next/image"
import { project } from "@/lib/project"

const Project = () => {
  return (
    <>
      {project.map((pro, index) => (
        <article style={{ "--index": index }} key={index}>
          <section className="image">
            <Image
              src={pro.src}
              alt={pro.name}
              width={1920}
              height={919}
              loading="eager"
            />
          </section>
          <section className="info">
            <h1>{pro.name}</h1>
            <p>
              {pro.tag.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </p>
          </section>
          <section className="introduction">
            <p>{pro.introduction}</p>
          </section>
          <section className="link">
            <a href={pro.href} target="_blank">Visit Site</a>
          </section>
        </article>
      ))}
    </>
  )
}

export default Project
