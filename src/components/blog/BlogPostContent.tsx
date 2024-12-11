import axios from "axios";
import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogData } from "../../App";
import * as yaml from "js-yaml";
// import { marked } from "marked";
import { Helmet } from "react-helmet";

interface BlogPostContentProps {
  postId?: string;
}
// const cleanContent = (content: string) => {
//   return content
//     .replace(/[\uFEFF\u200B]/g, "")
//     .replace(/ï»¿/g, "")
//     .replace(/\u00A0/g, " ")
//     .replace(/Â/g, "");
// };

export function BlogPostContent({ postId }: BlogPostContentProps) {
  const [data, setData] = useState<BlogData>();
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
    if (postId) {
      const fetchSpecificBlog = (slug: string) => {
        const apiUrl = `https://api.github.com/repos/ranafaizan937/blog-project/contents/content/blog/${slug}.md`; 

        axios
          .get(apiUrl, {
            headers: {
              Authorization: "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", 
            },
          })
          .then((response) => {
            // The content is Base64 encoded, so decode it
            const content = atob(response.data.content);
            const frontMatter = extractFrontMatter(content);
            const cleanedContent = frontMatter!.content.replace(
              /[\uFEFF\u200B]/g,
              ""
            ); // Clean conten
            if (frontMatter) {
              const blog = {
                ...frontMatter,
                content: cleanedContent,
              };
              setData(blog);
            } else {
              console.error("Invalid front matter");
            }
          })
          .catch((error) => {
            console.error("Error fetching specific blog:", error);
          });
      };

      fetchSpecificBlog(postId);
    }
  }, []);

  if (!data) {
    return (
      <div className="h-[400px] flex justify-center items-center">
        Loading.....
      </div>
    );
  }
  console.log({data})
  // const cleanedContent = cleanContent(data.content);
  return (
    <article className="py-20">
      <Helmet>
        <title>{data.metatitle}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content="React, Helmet, SEO" />
      </Helmet>
      <article className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-6">Schildersbedrijf Eindhoven</h1>
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                <span>Eindhoven</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                <span>15 maart 2024</span>
              </div>
            </div>
          </header>

          <div className="prose max-w-none">
            <p className="lead">
              Op zoek naar een professioneel schildersbedrijf in Eindhoven? Met onze jarenlange 
              ervaring en lokale expertise zijn wij uw ideale partner voor elk schilderproject.
            </p>

            <h2>Lokale Expertise in Eindhoven</h2>
            <p>
              Als Eindhovens schildersbedrijf kennen we de lokale architectuur en specifieke 
              uitdagingen van de regio als geen ander. Van moderne appartementen in Strijp-S 
              tot karakteristieke herenhuizen in het centrum - wij hebben ervaring met alle 
              type woningen en gebouwen.
            </p>

            <h2>Onze Diensten in Eindhoven</h2>
            <ul>
              <li>Binnenschilderwerk voor woningen en bedrijfspanden</li>
              <li>Professioneel buitenschilderwerk</li>
              <li>Specialistische houtreparatie en -sanering</li>
              <li>Modern behangwerk en wandafwerking</li>
              <li>Kleuradvies op maat</li>
            </ul>

            <h2>Waarom Kiezen voor Ons?</h2>
            <p>
              Als lokaal schildersbedrijf bieden we niet alleen vakmanschap, maar ook:
            </p>
            <ul>
              <li>Snelle responstijd en flexibele planning</li>
              <li>Persoonlijk contact en advies</li>
              <li>Kennis van lokale regelgeving en vergunningen</li>
              <li>Netwerk van lokale partners voor totaaloplossingen</li>
            </ul>

            <h2>Werkgebied in Eindhoven</h2>
            <p>
              We zijn actief in alle wijken van Eindhoven, waaronder:
            </p>
            <ul>
              <li>Centrum</li>
              <li>Strijp</li>
              <li>Woensel</li>
              <li>Tongelre</li>
              <li>Gestel</li>
              <li>Stratum</li>
            </ul>

            <h2>Contact Opnemen</h2>
            <p>
              Bent u geïnteresseerd in onze diensten in Eindhoven? Neem vrijblijvend contact 
              met ons op voor een offerte of adviesgesprek. We denken graag met u mee over 
              de beste oplossing voor uw schilderproject.
            </p>
          </div>
        </div>
      </div>
    </article>
    </article>
  );
}
