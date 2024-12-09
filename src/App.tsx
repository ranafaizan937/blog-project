import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import * as yaml from "js-yaml"; // To parse YAML front matter
import { HomePage } from "./pages/HomePage";
import { BinnenschilderwerkPage } from "./pages/BinnenschilderwerkPage";
import { HoutrotSaneringPage } from "./pages/HoutrotSaneringPage";
import { BehangenPage } from "./pages/BehangenPage";
import { LakwerkPage } from "./pages/LakwerkPage";
import { LatexSpuitenPage } from "./pages/LatexSpuitenPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { WaaromOnsPage } from "./pages/WaaromOnsPage";
import { ContactPage } from "./pages/ContactPage";
import { FAQPage } from "./pages/FAQPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { BlogPostDetailPage } from "./pages/BlogPostDetailPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { OverOnsPage } from "./pages/OverOnsPage";
import { ProjectDetailsProvider } from "./contexts/ProjectDetailsContext";
import { BlogPostProvider } from "./contexts/BlogPostContext";

// BlogData type definition
interface BlogData {
  title: string;
  slug: string;
  date: string;
  imageUrl: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
}

function App() {
  // State to store the blog data
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  

  // Extract front matter from markdown file
  const extractFrontMatter = (data: string): BlogData | null => {
    const matter = data.match(/^---\n([\s\S]*?)\n---/); // Match content between '---'
    if (matter) {
      try {
        // Parse YAML front matter to JSON
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
          Authorization: "", // Replace with your actual token
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
  }, []); // Empty dependency array ensures this effect runs only once on mount
console.log({blogs})
  return (
    <ProjectDetailsProvider>
      <BlogPostProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/diensten/binnenschilderwerk"
            element={<BinnenschilderwerkPage />}
          />
          <Route
            path="/diensten/houtrot-sanering"
            element={<HoutrotSaneringPage />}
          />
          <Route path="/diensten/behangen" element={<BehangenPage />} />
          <Route path="/diensten/lakwerk" element={<LakwerkPage />} />
          <Route
            path="/diensten/latex-spuiten"
            element={<LatexSpuitenPage />}
          />
          <Route path="/projecten" element={<ProjectsPage />} />
          <Route path="/projecten/:id" element={<ProjectDetailPage />} />
          <Route path="/waarom-ons" element={<WaaromOnsPage />} />
          <Route path="/over-ons" element={<OverOnsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage  />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/blog/verf/:slug" element={<BlogPostDetailPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/algemene-voorwaarden" element={<TermsPage />} />
        </Routes>
      </BlogPostProvider>
    </ProjectDetailsProvider>
  );
}

export default App;
