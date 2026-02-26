import { InfoListItem } from "@/shared/ui/AppListCard/types";
import { FaInstagramSquare, FaWhatsappSquare, FaYoutubeSquare } from "react-icons/fa";

export const appData: InfoListItem[] = [
  {
    id: "1",
    title: "WhatsApp",
    subtitle: "Social Media",
    value: "1hr 20min",
    icon: FaWhatsappSquare,
  },
  {
    id: "2",
    title: "Instagram",
    subtitle: "Social Media",
    value: "45min",
    icon: FaInstagramSquare,
  },
  {
    id: "3",
    title: "YouTube",
    subtitle: "Entertainment",
    value: "30min",
    icon: FaYoutubeSquare,
  },
];
