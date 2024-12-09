
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight, PiIcon } from 'lucide-react';
import { BlogData } from '../../../App';


interface PropsType{
  data:BlogData
}

export function ServiceCard({ data }: PropsType) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
      <div className="relative h-48">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-center bg-cover transform scale-105 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: `url(${data.imageUrl})`,
              WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' viewBox=\'0 0 400 300\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'%3E%3Cpath d=\'M0,0 C100,20 200,-10 400,30 L400,300 L0,300 Z\' fill=\'black\'/%3E%3C/svg%3E")',
              maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' viewBox=\'0 0 400 300\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'%3E%3Cpath d=\'M0,0 C100,20 200,-10 400,30 L400,300 L0,300 Z\' fill=\'black\'/%3E%3C/svg%3E")',
              WebkitMaskSize: 'cover',
              maskSize: 'cover',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-500 p-2 rounded-full">
              <PiIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">{data.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{data.description}</p>
        <Link 
          to={`/blog/${data.title}`}
          className="inline-flex items-center text-primary-500 font-heading uppercase hover:text-primary-600 transition-colors group"
        >
          <span>Meer Info</span>
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}