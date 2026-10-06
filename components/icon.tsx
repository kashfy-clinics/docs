import {
  Apple, AppWindow, Banknote, Bell, Book, Bot, Boxes, Building2, Calculator, Calendar,
  CalendarDays, CalendarPlus, CalendarSync, CalendarX, ChartBar, ChartLine, CircleCheck,
  CircleDollarSign, CircleSlash, CircleX, ClipboardList, ClipboardPlus, Clock, Code,
  CreditCard, EyeOff, FileHeart, FileSpreadsheet, FileText, FlaskConical, FolderLock,
  HandCoins, Headset, History, House, Image, Key, Layers, LifeBuoy, List, ListChecks, Lock,
  Mail, Map, MapPin, Megaphone, MessageCircle, MessagesSquare, Newspaper, Package, Phone,
  PhoneIncoming, Puzzle, QrCode, Radiation, Receipt, Repeat, Rocket, Scan, Send, Settings,
  Shield, SlidersHorizontal, Smartphone, Star, Stethoscope, Tags, TrendingUp, Upload, User,
  UserCheck, UserPlus, Users, UserX, Wallet,
  type LucideIcon,
} from 'lucide-react';

function Tooth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7.5 3C5 3 3.5 5 3.5 7.6c0 2.2.9 3.6 1.6 5.2.7 1.7.9 3.5 1.2 5.4.3 1.6.8 2.8 1.9 2.8 1.3 0 1.6-1.6 1.9-3.4.3-1.6.6-3 1.9-3s1.6 1.4 1.9 3c.3 1.8.6 3.4 1.9 3.4 1.1 0 1.6-1.2 1.9-2.8.3-1.9.5-3.7 1.2-5.4.7-1.6 1.6-3 1.6-5.2C20.5 5 19 3 16.5 3c-1.9 0-2.8 1.1-4.5 1.1S9.4 3 7.5 3Z" />
    </svg>
  );
}

// Icon names used in the MDX content (Font Awesome + lucide names from the Mintlify days).
const ICONS: Record<string, LucideIcon | typeof Tooth> = {
  android: Smartphone,
  apple: Apple,
  'arrow-trend-up': TrendingUp,
  bell: Bell,
  book: Book,
  'boxes-stacked': Boxes,
  browser: AppWindow,
  building: Building2,
  calculator: Calculator,
  calendar: Calendar,
  'calendar-days': CalendarDays,
  'calendar-plus': CalendarPlus,
  'calendar-sync': CalendarSync,
  'calendar-x': CalendarX,
  'calendar-xmark': CalendarX,
  'chart-bar': ChartBar,
  'chart-line': ChartLine,
  'circle-check': CircleCheck,
  'circle-dollar-sign': CircleDollarSign,
  'circle-slash': CircleSlash,
  'circle-xmark': CircleX,
  'clipboard-list': ClipboardList,
  clock: Clock,
  'clock-rotate-left': History,
  code: Code,
  comments: MessagesSquare,
  'credit-card': CreditCard,
  'eye-off': EyeOff,
  'file-invoice': FileText,
  'file-medical': FileHeart,
  'file-spreadsheet': FileSpreadsheet,
  flask: FlaskConical,
  'flask-conical': FlaskConical,
  'folder-lock': FolderLock,
  gear: Settings,
  'hand-holding-dollar': HandCoins,
  headset: Headset,
  house: House,
  image: Image,
  key: Key,
  'layer-group': Layers,
  layers: Layers,
  'life-ring': LifeBuoy,
  list: List,
  'list-check': ListChecks,
  'list-checks': ListChecks,
  lock: Lock,
  mail: Mail,
  map: Map,
  'map-pin': MapPin,
  megaphone: Megaphone,
  message: MessageCircle,
  messages: MessagesSquare,
  'messages-square': MessagesSquare,
  'money-bill': Banknote,
  newspaper: Newspaper,
  'notes-medical': ClipboardPlus,
  package: Package,
  phone: Phone,
  'phone-incoming': PhoneIncoming,
  'puzzle-piece': Puzzle,
  qrcode: QrCode,
  radiation: Radiation,
  receipt: Receipt,
  repeat: Repeat,
  robot: Bot,
  rocket: Rocket,
  send: Send,
  shield: Shield,
  sliders: SlidersHorizontal,
  smartphone: Smartphone,
  star: Star,
  stethoscope: Stethoscope,
  tags: Tags,
  tooth: Tooth,
  upload: Upload,
  user: User,
  'user-check': UserCheck,
  'user-plus': UserPlus,
  users: Users,
  'user-xmark': UserX,
  wallet: Wallet,
  'x-circle': CircleX,
  'x-ray': Scan,
};

/** Renders an icon by name, or an image when given a path like "/images/icons/x.svg". */
export function Icon({ name, className = 'size-4' }: { name?: string; className?: string }) {
  if (!name) return null;
  if (name.startsWith('/') || name.startsWith('http')) {
    return <img src={name} alt="" aria-hidden className={className} />;
  }
  const Cmp = ICONS[name];
  return Cmp ? <Cmp className={className} /> : null;
}
