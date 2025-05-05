
import { 
  Home,
  PlusSquare,
  History,
  CreditCard,
  FileText,
  Calendar,
  Clock,
  Kanban,
  UserCog,
  BarChart3,
  Settings
} from 'lucide-react';
import { UserRole } from '../../types/auth';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

export const navItems: NavItem[] = [
  // Client routes
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: ['client'],
  },
  {
    title: "New Request",
    href: "/dashboard/requests/new",
    icon: PlusSquare,
    roles: ['client'],
  },
  {
    title: "Request History",
    href: "/dashboard/requests/history",
    icon: History,
    roles: ['client'],
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    roles: ['client'],
  },
  
  // Designer routes
  {
    title: "Dashboard",
    href: "/dashboard/designer",
    icon: Home,
    roles: ['designer'],
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: FileText,
    roles: ['designer'],
  },
  {
    title: "Schedule",
    href: "/dashboard/schedule",
    icon: Calendar,
    roles: ['designer'],
  },
  {
    title: "Time Tracking",
    href: "/dashboard/time-tracking",
    icon: Clock,
    roles: ['designer'],
  },
  
  // Admin routes
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: Home,
    roles: ['admin'],
  },
  {
    title: "Project Management",
    href: "/dashboard/projects",
    icon: Kanban,
    roles: ['admin'],
  },
  {
    title: "User Management",
    href: "/dashboard/users",
    icon: UserCog,
    roles: ['admin'],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: ['admin'],
  },
  {
    title: "Billing Admin",
    href: "/dashboard/billing-admin",
    icon: CreditCard,
    roles: ['admin'],
  },
  
  // Common routes
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ['client', 'designer', 'admin'],
  },
];
