import { useEffect, useState } from "react";
import { ProjectCard } from "../home/ProjectCard";
import { Project } from "../../App";
import * as yaml from "js-yaml";
import axios from "axios";

interface PropsType {
  ProjectType: string;
}

export function RelatedProjects({ ProjectType }: PropsType) {
  const [projects, setProjects] = useState<Project[]>([]);

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
        const projectFiles = response.data;
        const projectPromises = projectFiles.map((file: any) => {
          return axios
            .get(file.download_url) // Get the content of each markdown file
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

        // Once all projects are fetched, set the state
        Promise.all(projectPromises)
          .then((projects) => {
            const validProjects = projects.filter(
              (project) => project !== null
            ) as Project[];

            // Filter based on ProjectType and set the state
            setProjects(validProjects.filter((p) => p.type === ProjectType));
          })
          .catch((error) => {
            console.log({ error });
          });
      })
      .catch((error) => {
        console.log({ error });
      });
  }, [ProjectType]);

  // Randomly select up to 3 projects
  const randomProjects = projects
    .sort(() => 0.5 - Math.random()) // Shuffle the projects
    .slice(0, 3); // Take the first 3 projects after shuffling

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Vergelijkbare Projecten
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {randomProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
