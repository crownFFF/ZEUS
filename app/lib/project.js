import robot from "@/assets/project/robot.png"
import zeus from "@/assets/project/zeus.png"
import universe from "@/assets/project/universe.png"
import pokemon from "@/assets/project/pokemon.png"

export const project = [
  {
    src: robot,
    href:"https://robot-sweeper.vercel.app/",
    name: "Robot",
    tag: ["Next.js", "React", "Scss", "Three.js"],
    introduction: "運用3D場景,打造出個人履歷",
  },
  {
    src: zeus,
    name: "ZEUS",
    href:"",
    tag: ["Next.js", "React", "Scss", "Three.js", "GLSL", "API", "SWR"],
    introduction: "使用天氣及定位API,製作氣象的網站",
  },
  {
    src: universe,
    name: "Universe",
    href:"https://newuniverse-rho.vercel.app/",
    tag: ["Next.js", "React", "Scss", "Three.js"],
    introduction: "練習運用3D場景及SVG的網站",
  },
  {
    src: pokemon,
    name: "Pokemon-Guide",
    href:"http://crownfff.github.io/pokemon-guide/",
    tag: ["React", "Scss", "API"],
    introduction: "利用Pokemon API,所形成的簡易Pokemon圖鑑",
  },
]
