import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../home/ProjectCard";
import { useProjectContext } from "../../contexts/ProjectContext";
import axios from "axios";
import * as yaml from "js-yaml";
import { Project } from "../../App";

// const projects = [
//   {
//     id: 1,
//     title: "Villa Renovatie",
//     location: "Eindhoven Centrum",
//     type: "Buitenschilderwerk",
//     imageUrl:
//       "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 2,
//     title: "Modern Appartement",
//     location: "Strijp-S",
//     type: "Binnenschilderwerk",
//     imageUrl:
//       "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 3,
//     title: "Kantoorpand",
//     location: "High Tech Campus",
//     type: "Totaalproject",
//     imageUrl:
//       "https://images.unsplash.com/photo-1575379774013-9707f2115d5d?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1575379774013-9707f2115d5d?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1575379774013-9707f2115d5d?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 4,
//     title: "Monumentaal Pand",
//     location: "Gestel",
//     type: "Houtrot Sanering",
//     imageUrl:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 5,
//     title: "Woonkamer Renovatie",
//     location: "Woensel",
//     type: "Behangwerk",
//     imageUrl:
//       "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 6,
//     title: "Nieuwbouwproject",
//     location: "Meerhoven",
//     type: "Lakwerk",
//     imageUrl:
//       "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 7,
//     title: "Herenhuis",
//     location: "Tongelre",
//     type: "Buitenschilderwerk",
//     imageUrl:
//       "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 8,
//     title: "Bedrijfspand",
//     location: "Flight Forum",
//     type: "Lakwerk",
//     imageUrl:
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 9,
//     title: "Jaren 30 Woning",
//     location: "Stratum",
//     type: "Houtrot Sanering",
//     imageUrl:
//       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
//   },
//   {
//     id: 10,
//     title: "Modern Kantoor",
//     location: "Flight Forum",
//     type: "Lakwerk",
//     imageUrl:
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
//     beforeImage:
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
//     afterImage:
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
//   },
// ];

export function ProjectGrid() {
  const { activeCategory } = useProjectContext();  // Assuming activeCategory is a string
  const [project, setProject] = useState<Project[]>([]);

  // Extract front matter from markdown file
  const extractFrontMatter = (data: string): Project | null => {
    const matter = data.match(/^---\n([\s\S]*?)\n---/);
    if (matter) {
      try {
        const yamlData = yaml.load(matter[1]) as Project;
        return yamlData;
      } catch (error) {
        console.error("Error parsing YAML:", error);
      }
    }
    return null;
  };

  useEffect(() => {
    const apiUrl =
      "https://api.github.com/repos/ranafaizan937/blog-project/contents/content/projects";

    axios
      .get(apiUrl, {
        headers: {
          Authorization: "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",
        },
      })
      .then((response) => {
        const blogFiles = response.data;
        const blogPromises = blogFiles.map((file: any) => {
          return axios
            .get(file.download_url) 
            .then((fileResponse) => {
              const frontMatter = extractFrontMatter(fileResponse.data);
              if (frontMatter) {
                return {
                  ...frontMatter,
                  slug: file.name.replace(".md", ""),
                };
              }
              return null;
            });
        });

        Promise.all(blogPromises)
          .then((blogs) => {
            const filteredProjects = (
              blogs.filter(
                (blog): blog is Project => blog !== null
              ) as Project[]
            ).filter((project) => {
              if (activeCategory === "Alle Projecten") {
                return true; 
              }
              return project.type === activeCategory; 
            });

            setProject(filteredProjects); 
          })
          .catch((error) => {
            console.log({ error });
          });
      })
      .catch((error) => {
        console.log({ error });
      });
  }, [activeCategory]);

  return (
    <section className="py-20">
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {project.map((project, index) => (
            <Link key={index} to={`/projecten/${project.slug}`}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
