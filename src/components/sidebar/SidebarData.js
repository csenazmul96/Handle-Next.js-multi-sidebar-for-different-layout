import {LayoutDashboard, LayoutList, Monitor, Package, Phone, Users} from "lucide-react";

export const menuItems = [
    {
        id: "1",
        label: "대시보드",
        icon: <LayoutDashboard size={16} />,
        slug:'/'
    },
    {
        id: "11",
        label: "회원 및 메시지 관리",
        icon: <Users size={16} />,
        slug:'/members-and-message-management',
        dropdown: [
            { id: "12", label: "회원관리", slug: '/membership-management',
                dropdown: [
                    { id: "13", label: "전체회원관리", slug: '/total-member-management' },
                    { id: "14", label: "관리자 관리", slug: '/administrator-management' },
                    { id: "132", label: "조직 그룹 관리", slug: '/organizational-group-management' },
                    { id: "133", label: "탈퇴회원 관리", slug: '/withdrawal-member-management' },

                    { id: "17", label: "활동로그", slug: '/administration-logs/signin-logs' },
                    { id: "15", label: "회원가입 항목 설정", slug: '/member-registration-settings' },
                    // { id: "16", label: "마케팅정보수신동의관리", slug: '/administration-logs/activity-logs' },
                ]
            },

            // { id: "19", label: "활동로그", slug: '/activity-log' },
            // { id: "20", label: "회원가입항목설정", slug:'/membership-registration-item-settings' },
            // { id: "21", label: "회원가입 항목 설정", slug:'/membership-registration-item-settings1' },
        ],
    },
    {
        id: "22",
        label: "콘텐츠관리",
        slug: "/content-management",
        icon: <Package size={16} />,
        dropdown: [
            {id: "23", label: "동영상관리", slug:"video-management"},
            {id: "24", label: "자료관리", slug:"document-management"},
        ]
    },
    {
        id: "25",
        label: "커리큘럼 관리",
        slug: "/curriculum",
        icon: <LayoutList size={16} />,
        dropdown: [
            {id: "26", label: "과정관리", slug:"course"},
            {id: "27", label: "평가관리", slug:"evaluations"},
        ]
    },
    // {
    //     id: "23",
    //     label: "커리큘럼관리",
    //     slug: "/curriculum-management",
    //     icon: <Curriculum/>
    // },
    // {
    //     id: "24",
    //     label: "주문결제관리",
    //     slug: "/order-payment-management",
    //     icon: <Orders/>,
    // },
    {
        id: "28",
        label: "홈페이지관리",
        slug: "/homepage-management",
        icon: <Monitor size={16} />,
        dropdown: [
            {id: "29", label: "기본정보 등록", slug:"basic-settings"}
        ]
    },
    // {
    //     id: "26",
    //     label: "통계관리",
    //     slug: "/statistics-management",
    //     icon: <Statistic/>
    // },
    {
        id: "30",
        label: "고객센터",
        slug: '/customer-service-center',
        icon: <Phone size={16} />,
        dropdown: [
            {id: "32", label: "공지사항", slug:"notice"},
            {id: "29", label: "1:1 문의", slug:"inquiry"},
            {id: "31", label: "자주묻는 질문", slug:"faqs"}
        ]
    },

];
