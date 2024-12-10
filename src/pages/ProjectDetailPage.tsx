import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ProjectDetail } from '../components/projects/ProjectDetail';
import { RelatedProjects } from '../components/projects/RelatedProjects';
import { ProjectCTA } from '../components/projects/ProjectCTA';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { CookieConsent } from '../components/common/CookieConsent';
import { useState } from 'react';

export function ProjectDetailPage() {
const [ProjectType,setProjectType]=useState<string>("")
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ProjectDetail setProjectType={setProjectType}/>
        <RelatedProjects ProjectType={ProjectType}/>
        <ProjectCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}