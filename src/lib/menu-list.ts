import {
    User,
    List,
    Book,
    FileText,
    BadgeInfo,
    FolderGit2,
    LayoutGrid,
    GraduationCap,
    ClipboardCheck,
    TerminalSquare,
    LucideIcon
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
    onlyTitle?: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: '',
            menus: [
                {
                    href: '/admin',
                    label: 'Dashboard',
                    active: pathname.includes('/admin'),
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Informations',
            menus: [
                {
                    href: '/admin/about',
                    label: 'About',
                    active: pathname.includes('/admin/about'),
                    icon: BadgeInfo,
                    submenus: []
                },
                {
                    href: '/admin/miscellaneous',
                    label: 'Miscellaneous',
                    active: pathname.includes('/admin/miscellaneous'),
                    icon: List,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Skills',
            menus: [
                {
                    href: '/admin/experience',
                    label: 'Experience',
                    active: pathname.includes('/admin/experience'),
                    icon: Book,
                    submenus: []
                },
                {
                    href: '/admin/expertise',
                    label: 'Expertise',
                    active: pathname.includes('/admin/expertise'),
                    icon: ClipboardCheck,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Career',
            menus: [
                {
                    href: '',
                    label: 'Portfolio',
                    active: pathname.includes('/admin/portfolio'),
                    icon: FolderGit2,
                    submenus: [
                        {
                            href: '/admin/portfolio',
                            label: 'All Projects',
                            active: pathname === '/admin/portfolio'
                        },
                        {
                            href: '/admin/portfolio/create',
                            label: 'New Project',
                            active: pathname === '/admin/portfolio/create'
                        },
                        {
                            href: '',
                            label: 'Edit Project',
                            active: new RegExp('^/admin/portfolio/.+/edit$').test(pathname),
                            onlyTitle: true
                        }
                    ]
                },
                {
                    href: '/admin/qualification',
                    label: 'Qualification',
                    active: pathname.includes('/admin/qualification'),
                    icon: GraduationCap,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Resources',
            menus: [
                {
                    href: '/admin/resume',
                    label: 'Resume',
                    active: pathname.includes('/admin/resume'),
                    icon: FileText,
                    submenus: []
                },
                {
                    href: '/admin/tool',
                    label: 'Tool & Apps',
                    active: pathname.includes('/admin/tool'),
                    icon: TerminalSquare,
                    submenus: [
                        {
                            href: '/admin/tool',
                            label: 'All Tools',
                            active: pathname === '/admin/tool'
                        },
                        {
                            href: '/admin/tool/add',
                            label: 'New Tool',
                            active: pathname === '/admin/tool/add'
                        },
                        {
                            href: '',
                            label: 'Edit Tool',
                            active: new RegExp('^/admin/tool/.+/edit$').test(pathname),
                            onlyTitle: true
                        }
                    ]
                }
            ]
        },
        {
            groupLabel: 'Settings',
            menus: [
                {
                    href: '/admin/account',
                    label: 'Account',
                    active: pathname.includes('/admin/account'),
                    icon: User,
                    submenus: []
                }
            ]
        }
    ];
};
