import {Suspense} from 'react';
import AboutHeroContent from '@/components/about/AboutHeroContent';
import AboutWorkExperienceSection from '@/components/about/AboutWorkExperienceSection';
import AboutEducationSection from '@/components/about/AboutEducationSection';
import AboutProjectsSection from '@/components/about/AboutProjectsSection';

export default function AboutRightColumnWrapper() {
	return (
		<div className="about-right-column">
			<Suspense fallback={
				<div className="about-section">
					<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
					<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
					<div className="flex gap-4 mt-4">
						<div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
						<div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
						<div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
					</div>
					<div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mt-4 animate-pulse"></div>
				</div>
			}>
				<AboutHeroContent/>
			</Suspense>

			<Suspense fallback={
				<div className="about-section">
					<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
					{[...Array(3)].map((_, index) => (
						<div key={index} className="mb-6">
							<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
						</div>
					))}
				</div>
			}>
				<AboutWorkExperienceSection/>
			</Suspense>

			<Suspense fallback={
				<div className="about-section">
					<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
					{[...Array(2)].map((_, index) => (
						<div key={index} className="mb-6">
							<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
						</div>
					))}
				</div>
			}>
				<AboutEducationSection/>
			</Suspense>

			<Suspense fallback={
				<div className="about-section">
					<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[...Array(2)].map((_, index) => (
							<div key={index} className="border rounded-lg p-4 bg-gray-200 dark:bg-gray-700 animate-pulse">
								<div className="w-full h-40 rounded-md mb-4 bg-gray-300 dark:bg-gray-600"></div>
								<div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
								<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
								<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mt-2"></div>
							</div>
						))}
					</div>
				</div>
			}>
				<AboutProjectsSection/>
			</Suspense>
		</div>
	);
}
