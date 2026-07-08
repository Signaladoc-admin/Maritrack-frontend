import { InfoListItem } from "@/shared/ui/AppListCard/types";
import { FaInstagramSquare, FaWhatsappSquare, FaYoutubeSquare } from "react-icons/fa";

export const appData: InfoListItem[] = [
  {
    id: "1",
    name: "WhatsApp",
    subtitle: "Social Media",
    value: "1hr 20min",
    icon: FaWhatsappSquare,
  },
  {
    id: "2",
    name: "Instagram",
    subtitle: "Social Media",
    value: "45min",
    icon: FaInstagramSquare,
  },
  {
    id: "3",
    name: "YouTube",
    subtitle: "Entertainment",
    value: "30min",
    icon: FaYoutubeSquare,
  },
];
