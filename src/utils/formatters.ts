
export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj);
};

export const formatDateRange = (startDate?: Date | string, endDate?: Date | string): string => {
  if (!startDate && !endDate) return 'Ongoing';
  if (startDate && !endDate) return `Starting ${formatDate(startDate)}`;
  if (!startDate && endDate) return `Until ${formatDate(endDate)}`;
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    education: 'bg-blue-100 text-blue-800',
    health: 'bg-green-100 text-green-800',
    environment: 'bg-emerald-100 text-emerald-800',
    poverty: 'bg-amber-100 text-amber-800',
    crisis: 'bg-red-100 text-red-800',
    community: 'bg-purple-100 text-purple-800',
    arts: 'bg-pink-100 text-pink-800',
    animals: 'bg-cyan-100 text-cyan-800',
    other: 'bg-gray-100 text-gray-800',
  };
  
  return colors[category] || colors.other;
};

export const getUrgencyColor = (urgency: string): string => {
  const colors: Record<string, string> = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };
  
  return colors[urgency] || colors.low;
};

export const getTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    volunteer: '👋',
    donation: '🎁',
  };
  
  return icons[type] || '❓';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
