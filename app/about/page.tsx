import {Suspense} from 'react';
import AboutLeftColumn from '@/components/about/AboutLeftColumn';
import AboutRightColumnWrapper from '@/components/about/AboutRightColumnWrapper';

export default function About() {
  return (
    <main className="about-main">
      <div className="about-container">
        <Suspense fallback={
          <div className="about-left-column">
            <div className="about-left-column-sticky">
              <div className="w-48 h-48 rounded-full mx-auto overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="text-center">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mt-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mt-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        }>
          <AboutLeftColumn />
        </Suspense>
        <AboutRightColumnWrapper />
      </div>
    </main>
  );
}
