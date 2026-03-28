export interface LocationHistoryItem {
  id: string;
  name: string;
  duration: string;
  date: string;
}

export interface LocationHistoryCardProps {
  items: LocationHistoryItem[];
  className?: string;
  onSeeMore?: () => void;
}

export interface CurrentLocationCardProps {
  address: string;
  updatedAt: string;
  className?: string;
}
