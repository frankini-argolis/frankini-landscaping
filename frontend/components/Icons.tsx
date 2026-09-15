import React from 'react';
import { Leaf, Hammer, Snowflake, Flower2, Phone, MapPin, Mail, CheckCircle, Menu, X, ChevronRight, Star } from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const icons: Record<string, React.ElementType> = {
    Leaf,
    Hammer,
    Snowflake,
    Flower2,
    Phone,
    MapPin,
    Mail,
    CheckCircle,
    Menu,
    X,
    ChevronRight,
    Star
  };

  const LucideIcon = icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} />;
};