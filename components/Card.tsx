import { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon: ReactNode;
}

const Card = ({ title, icon }: CardProps) => {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-md flex flex-col items-center">
      {/* Icon */}
      <div className="mb-4 text-4xl text-gray-500">{icon}</div>

      {/* Title */}
      <div className="text-center text-lg font-semibold text-gray-700">
        {title}
      </div>
    </div>
  );
};

export default Card;
