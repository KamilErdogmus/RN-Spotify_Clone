import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

export const selectArea: string[] = ["All", "Music", "Podcasts"];
export const librarySelectedArea: string[] = ["Playlist", "Artist"];

type IconName = {
  AntDesign: keyof typeof AntDesign.glyphMap;
  MaterialCommunityIcons: keyof typeof MaterialCommunityIcons.glyphMap;
  MaterialIcons: keyof typeof MaterialIcons.glyphMap;
  Feather: keyof typeof Feather.glyphMap;
};

type IconComponent =
  | typeof AntDesign
  | typeof MaterialCommunityIcons
  | typeof MaterialIcons
  | typeof Feather;

interface DrawerOption {
  id: number;
  title: string;
  icon: {
    name: string;
    component: IconComponent;
    color?: string;
    size?: number;
  };
  onPress?: () => void;
}

export const drawerOpt: DrawerOption[] = [
  {
    id: 1,
    title: "Add account",
    icon: {
      name: "plus",
      component: AntDesign,
      color: "white",
      size: 24,
    },
    onPress: () => {},
  },
  {
    id: 2,
    title: "What's new",
    icon: {
      name: "lightning-bolt-outline",
      component: MaterialCommunityIcons,
      color: "white",
      size: 24,
    },
    onPress: () => {},
  },
  {
    id: 3,
    title: "Listening history",
    icon: {
      name: "history-toggle-off",
      component: MaterialIcons,
      color: "white",
      size: 24,
    },
    onPress: () => {},
  },
  {
    id: 4,
    title: "Settings and privacy",
    icon: {
      name: "settings",
      component: Feather,
      color: "white",
      size: 24,
    },
    onPress: () => {},
  },
];

export const premiumPlansDetails = [
  {
    id: "individual",
    themeColor: "#ac8f93",
    name: "Individual",
    price: "$7.99",
    priceDetails: "Free for 1 month",
    extras: ["1 Premium account", "Cancel Anytime"],
    trial: true,
    description:
      "Free for month, then $7.99 per month after. Offer only available if you haven't tried Premium before and you subscribe via Spotify. Offers via Google Play may differ.",
  },
  {
    id: "student",
    themeColor: "#C5B1D4",
    name: "Student",
    price: "$4.99",
    priceDetails: "Special discount",
    extras: [
      "1 Verified premium account",
      "Discount for eligible students",
      "Cancel Anytime",
    ],
    trial: true,
    description:
      "Free for month, then $4.99 per month after. Offer only available only students at an accredited higher education institution and if you haven't tried Premium before.",
  },
  {
    id: "duo",
    themeColor: "#FFC863",
    name: "Duo",
    price: "$12.99",
    priceDetails: "Free for 1 month",
    extras: ["2 Premium accounts", "Cancel Anytime"],
    trial: false,
    description: "For couples who resides at same address.",
  },
  {
    id: "family",
    themeColor: "#A5BBD2",
    name: "Family",
    price: "$15.99",
    priceDetails: "Free for 1 month",
    extras: [
      "Up to 6 Premium accounts",
      "Control content marked as explict",
      "Cancel Anytime",
    ],
    trial: false,
    description: "For up to 6 family members residing at the same address.",
  },
];
