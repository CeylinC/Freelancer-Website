import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BusinessIcon from "@mui/icons-material/Business";
import {
  AccessTime,
  AddBox,
  CollectionsBookmark,
  Create,
  Logout,
  Loupe,
  People,
  PersonOff,
  WorkOff,
} from "@mui/icons-material";

export const CURRENCY = "€";
export const LOGO = "NICE";

export const STEPS = ["Oluşturuldu", "Yapılıyor", "Yapıldı", "Onaylandı"];
export const TAB = [
  { title: "İş Detayları", icon: <Loupe /> },
  { title: "Freelancer Listesi", icon: <People /> },
];

export const LINK = {
  FORGOT: "Şifreni mi Unuttun?",
  SIGNUP: "Hesabın yok mu? Üye ol!",
  LOGIN: "Zaten hesabın var mı? Giriş yap!",
};

export const TITLE = {
  WORK: "İş Oluştur",
  LOGIN: "Giriş Yap",
  SIGNUP: "Üye Ol",
  AVAILABLEWORK: "Bekleyen İşler",
  OPENWORK: "İlanlar",
};

export const PROJECT = {
  DETAILS: "Proje Detayları",
  NAME: "Proje İsmi",
  DESC: "Proje Açıklaması",
  START: "Başlangıç Tarihi",
  FINISH: "Bitiş Tarihi",
  AMOUNT: "Proje Ücreti",
  FREELANCER: "Proje'nin Freelancer",
};

export const BUTTON = {
  WORK_CARD: "Teklif Ver",
  LOGIN: "Giriş Yap",
  SIGNUP: "Üye Ol",
  REMEMBER: "Unutma Beni!",
  CREATE: "İş Oluştur",
  CLIENT: {
    SAVE: "Proje Detaylarını Kaydet",
    CHANGE: "Proje Detaylarını Değiştir",
    CLOSE: "İşi Kapa",
    OPEN: "İşi Aç",
    DELETE: "Freelancer'ı Çıkar",
    CONFIRM: "İşi Onayla",
    SELECT: "Seç",
  },
  FREELANCER: {
    LEAVE: "İşten Ayrıl",
    COMPLETE: "Yapıldı",
  },
};

export const FREELANCER = {
  value: "freelancer",
  header: "Ben Freelancer'ım,",
  description: "iş var mı diye bakmıştım.",
  icon: <BusinessCenterIcon sx={{ color: "primary.dark" }} fontSize="large" />,
};

export const CLIENT = {
  value: "client",
  header: "Ben Müşteri'yim,",
  description: "elimde yapılması gereken proje var.",
  icon: <BusinessIcon sx={{ color: "primary.dark" }} fontSize="large" />,
};

export const USER = {
  EMAIL: "Mail",
  PASSWORD: "Şifre",
  NAME: "İsim",
  SURNAME: "Soyisim",
  LOCATION: "Ülke",
};

export const MENUS = {
  freelancer: [
    {
      name: "İlanlar",
      icon: <CollectionsBookmark />,
      href: "/open-works",
    },
    {
      name: "Bekleyen İşler",
      icon: <AccessTime />,
      href: "/available-works",
    },
  ],
  client: [
    {
      name: "İş Oluştur",
      icon: <AddBox />,
      href: "/create-work",
    },
    {
      name: "Bekleyen İşler",
      icon: <AccessTime />,
      href: "/available-works",
    },
  ],
};
