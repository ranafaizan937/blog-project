import { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import { Link } from "react-router-dom";
import { BlogData } from "../../App";
import * as yaml from "js-yaml";
import axios from "axios";

export function RelatedPosts() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  const extractFrontMatter = (data: string): BlogData | null => {
    const matter = data.match(/^---\n([\s\S]*?)\n---/);
    if (matter) {
      try {
        const yamlData = yaml.load(matter[1]) as BlogData;
        return yamlData;
      } catch (error) {
        console.error("Error parsing YAML:", error);
      }
    }
    return null;
  };

  useEffect(() => {
    const apiUrl =
      "https://api.github.com/repos/ranafaizan937/blog-project/contents/content/blog";

    axios
      .get(apiUrl, {
        headers: {
          Authorization: "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", // Replace with your actual token
        },
      })
      .then((response) => {
        const blogFiles = response.data;
        const blogPromises = blogFiles.map((file: any) => {
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

        // Once all blog posts are fetched, set the state
        Promise.all(blogPromises)
          .then((blogs) => {
            // Filter out any null results in case front matter extraction fails
            setBlogs(blogs.filter((blog) => blog !== null) as BlogData[]);
          })
          .catch((error) => {
            console.log({ error });
          });
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  // Select 3 random blog posts
  const randomBlogs = blogs
    .sort(() => 0.5 - Math.random()) // Shuffle the blogs
    .slice(0, 3); // Take the first 3 blogs after shuffling

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Ontdek Meer Regio's</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {randomBlogs.map((post, index) => (
            <Link key={index} to={`/blog/${post.slug}`}>
              <BlogCard post={post} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
