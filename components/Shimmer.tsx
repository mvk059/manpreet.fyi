import {FC} from 'react';

interface ShimmerProps {
	width?: string;
	height?: string;
	className?: string;
}

const Shimmer: FC<ShimmerProps> = ({width = '100%', height = '1em', className = ''}) => {
	return (
		<div
			style={{width, height}}
			className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-md ${className}`}
		>
			<div className="absolute inset-0 shimmer-effect-animation"></div>
		</div>
	);
};

export default Shimmer;
